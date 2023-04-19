import React, { useState } from 'react'

import Axios from 'axios'

import { b64toBlob } from '../../components/scripts'
import { handleDownloadAllCVs } from '../../components/CVDownloader'
import { UpdateDeadline } from './portal1'

import {
	companyUploadShortlist,
	companyGetRegisteredStudentsExcel,
	companyGetInterviewListExcel,
	companyUploadSelectedExcel,
	companyUploadWailistExcel,
	companyDownloadPlacedExcel,
	companyUploadEmptyWailistExcel,
	companyIsItPlacement,
	studentCoodOpenRegistration,
	studentCoodAlertStudent,
	studentCoodCloseRegistration,
	studentCoodSubmitRegistrations,
	studentCoodInterviewState,
} from './index'

import {
	placementcompanyGetRegisteredStudentsExcel,
	placementcompanyUploadShortlist,
	placementcompanyUploadSelectedExcel,
	placementcompanyUploadWaitlistExcel,
	placementcompanyGetInterviewListExcel,
	placementcompanyDownloadPlacedExcel,
	placementcompanyUploadEmptyWailistExcel,
	registeredStudentsDetails,
	shortlistedStudentsDetails,
	placementOpenRegistration,
	placementCloseRegistration,
	placementSubmitRegistrations,
	placementAlertStudent,
	placementInterviewState,
} from '../../constants/addresses'

import { placementStaffGetSlotsAndCompanies, placementAllotSlot } from '../placementCellPortal/index'

import { useConfirm } from 'material-ui-confirm'

import shortlistTemplateExcel from '../../static/xlsx/shortlistTemplate.xlsx'

import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Container from '@material-ui/core/Container'
import Checkbox from '@material-ui/core/Checkbox'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import ClearIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckIcon from '@material-ui/icons/CheckBox'

const UploadButton = (props) => {
	const [selected, setSelected] = React.useState(false)
	const [selectedFile, setSelectedFile] = React.useState(null)
	const [progress, setProgress] = React.useState(0)
	const confirm = useConfirm()

	const handleChange = (event) => {
		event.preventDefault()
		if (event.target.files.length === 0) {
			setSelectedFile(null)
			setSelected(false)
			return
		}
		const file = event.target.files[0]
		if (file.size > 100000000) {
			props.newSnack('Select file less than 100 MiB', 'error')
		} else {
			//console.log(file)
			setSelectedFile(file)
			setSelected(true)
		}
	}
	const handleUpload = () => {
		confirm()
			.then(async () => {
				if (!selected) {
					return
				}
				const data = new FormData()
				data.append('file', selectedFile)
				const res = await Axios.post(props.uploadAddress, data, {
					headers: { Authorization: `BEARER ${props.accessToken}` },
					onUploadProgress: (progressEvent) => setProgress(progressEvent.loaded / progressEvent.total),
				}).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				var message = ''
				if (res.data.arr) {
					res.data.arr.map((rollno) => {
						message = message + rollno + ', '
						return 0
					})
				}
				props.newSnack(res.data.message + (res.data.arr ? ': ' + message : ''), res.data.arr ? 'error' : 'info')
				props.onClose()
				props.updateData()
			})
			.catch(() => {})
	}

	return (
		<div>
			<Typography>{selected ? selectedFile.name : ' '}</Typography>
			<input style={{ display: 'none' }} onChange={handleChange} id={props.id} accept={props.type} type="file" />
			<label htmlFor={props.id}>
				<Button
					style={{ maxWidth: 300 }}
					disabled={progress === 0 ? false : true}
					variant="contained"
					color="primary"
					component="span"
				>
					{selected ? 'Change Selection' : 'Select file to upload'}
				</Button>
			</label>
			<br />
			<Button variant="contained" color="secondary" onClick={handleUpload} disabled={!selected || progress !== 0}>
				{progress === 0
					? 'Upload'
					: Math.round(progress * 100) === 100
					? '99%'
					: Math.round(progress * 100) + '%'}
			</Button>
		</div>
	)
}

const ManageIndivListings = (props) => {
	const [uploadSheetOpen, setUploadSheetOpen] = useState(false)
	const [optionalOptionsVisible, setOptionalOptionsVisible] = useState(false)
	const [uploadSelectedSheetOpen, setUploadSelectedSheetOpen] = useState(false)
	const [uploadWaitListSheetOpen, setUploadWaitListSheetOpen] = useState(false)
	const confirm = useConfirm()
	const config = { headers: { Authorization: `BEARER ${props.accessToken}` } }
	const [registeredExcelOptions, setRegisteredExcelOptions] = useState({
		JEE_Advanced_Rank: false,
		JEE_Advanced_Cat_Rank: false,
		degrees_in_iith: false,
		category: false,
		School_X: false,
		School_XII: false,
	})
	const [allSlots, setAllSlots] = useState([])
	const [slotDialogOpen, setSlotDialogOpen] = useState(false)
	const [selectedSlotId, setSelectedSlotId] = useState(null)
	const [placement, setPlacement] = useState()

	const handleUpload = () => {
		setUploadSheetOpen(true)
	}
	const handleUploadSelectedExcelSheet = () => {
		setUploadSelectedSheetOpen(true)
	}
	// eslint-disable-next-line no-unused-vars
	const handleUploadWaitListExcelSheet = () => {
		setUploadWaitListSheetOpen(true)
	}

	// const handleDownloadAllCVs = async () => {
	// 	props.setLoading(true)
	// 	const res = await Axios.post(pdfCVMakerZipped, { id: props.listing.id }, config).catch((error) =>
	// 		console.error(error)
	// 	)
	// 	if (!res.data.success) {
	// 		props.newSnack(res.data.message, 'warning')
	// 		props.setLoading(false)
	// 		return
	// 	}
	// 	const pre = 'data:application/zip;base64,'
	// 	const zipBlob = b64toBlob(res.data.message, pre)
	// 	const zipURL = URL.createObjectURL(zipBlob)
	// 	var element = document.createElement('a')
	// 	element.setAttribute('href', zipURL)
	// 	element.setAttribute('download', props.listing.Job_Title + ' (CVs).zip')
	// 	element.style.display = 'none'
	// 	document.body.appendChild(element)
	// 	element.click()

	// 	props.setLoading(false)
	// }

	// const handleDownloadShortlistedCVs = async () => {
	// 	props.setLoading(true)
	// 	const res = await Axios.post(studentCoodListingCVs, { id: props.listing.id }, config).catch((error) =>
	// 		console.error(error)
	// 	)
	// 	if (!res.data.success) {
	// 		props.newSnack(res.data.message, 'warning')
	// 		props.setLoading(false)
	// 		return
	// 	}
	// 	const pre = 'data:application/zip;base64,'
	// 	const zipBlob = b64toBlob(res.data.message, pre)
	// 	const zipURL = URL.createObjectURL(zipBlob)
	// 	var element = document.createElement('a')
	// 	element.setAttribute('href', zipURL)
	// 	element.setAttribute('download', props.listing.Job_Title + ' (CVs).zip')
	// 	element.style.display = 'none'
	// 	document.body.appendChild(element)
	// 	element.click()

	// 	props.setLoading(false)
	// }

	const handleDownloadRegisteredExcelSheet = () => {
		Axios.post(
			props.address ? placementcompanyGetRegisteredStudentsExcel : companyGetRegisteredStudentsExcel,
			{ id: props.listing.id, data: registeredExcelOptions },
			config
		)
			.then(({ data }) => {
				if (data.success) {
					const pre = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
					const excelBlob = b64toBlob(data.message, pre)
					const excelURL = URL.createObjectURL(excelBlob)
					var element = document.createElement('a')
					element.setAttribute('href', excelURL)
					element.setAttribute('download', props.listing.Job_Title + '.xlsx')
					element.style.display = 'none'
					document.body.appendChild(element)
					element.click()
				} else props.newSnack(data.message, 'warning')
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
	}

	const downloadFile = (url) => {
		var element = document.createElement('a')
		element.setAttribute('href', url)
		element.setAttribute('download', 'listingSlotsTemplate.xlsx')
		element.style.display = 'none'
		document.body.appendChild(element)
		element.click()
	}

	const handleDownloadInterviewExcelSheet = () => {
		Axios.get(
			props.address
				? placementcompanyGetInterviewListExcel + props.listing.id
				: companyGetInterviewListExcel + props.listing.id,
			config
		)
			.then(({ data }) => {
				if (data.success) {
					const pre = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
					const excelBlob = b64toBlob(data.message, pre)
					const excelURL = URL.createObjectURL(excelBlob)
					var element = document.createElement('a')
					element.setAttribute('href', excelURL)
					element.setAttribute('download', props.listing.Job_Title + '.xlsx')
					element.style.display = 'none'
					document.body.appendChild(element)
					element.click()
				} else props.newSnack(data.message, 'warning')
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
	}

	// eslint-disable-next-line no-unused-vars
	const handleNoWaitList = () => {
		confirm()
			.then(() => {
				props.setLoading(true)
				Axios.post(
					props.address ? placementcompanyUploadEmptyWailistExcel : companyUploadEmptyWailistExcel,
					{ id: props.listing.id },
					config
				)
					.then(({ data }) => {
						if (data.success) {
							props.updateData()
						}
						props.newSnack(data.message, data.success ? 'info' : 'error')
						props.setLoading(false)
					})
					.catch((error) => {
						console.error(error)
						props.newSnack('Connection Error', 'error')
					})
			})
			.catch(() => {})
	}

	const handleDownloadPlacedExcel = () => {
		Axios.get(
			props.address
				? placementcompanyDownloadPlacedExcel + props.listing.id
				: companyDownloadPlacedExcel + props.listing.id,
			config
		)
			.then(({ data }) => {
				if (data.success) {
					const pre = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
					const excelBlob = b64toBlob(data.message, pre)
					const excelURL = URL.createObjectURL(excelBlob)
					var element = document.createElement('a')
					element.setAttribute('href', excelURL)
					element.setAttribute('download', props.listing.Job_Title + '.xlsx')
					element.style.display = 'none'
					document.body.appendChild(element)
					element.click()
				} else props.newSnack(data.message, 'warning')
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
	}

	const toggleOptionalOptions = () => {
		setOptionalOptionsVisible((prevState) => !prevState)
	}

	React.useEffect(() => {
		props.placement === undefined
			? Axios.post(companyIsItPlacement, { id: props.listing.Company_profile_id }, config)
					.then(({ data }) => {
						if (!data.success) {
							setPlacement(undefined)
						}
						setPlacement(data.message === 1 ? true : false)
					})
					.catch((error) => {
						console.error(error)
						props.newSnack('Connection Error', 'error')
					})
			: setPlacement(props.placement)

		Axios.get(placementStaffGetSlotsAndCompanies, config).then(({ data }) => {
			if (data.success) setAllSlots(data.message)
			else props.newSnack(data.message, data.success ? 'info' : 'error')
		})
		// eslint-disable-next-line
	}, [props.listing.Company_profile_id])

	return (
		<Fade in>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Dialog
					fullWidth
					maxWidth="lg"
					disableBackdropClick
					TransitionProps={{ unmountOnExit: true }}
					open={uploadSheetOpen}
					onClose={() => setUploadSheetOpen(false)}
				>
					<DialogTitle>Upload Shortlist</DialogTitle>
					<DialogContent>
						<UploadButton
							uploadAddress={
								props.address
									? placementcompanyUploadShortlist + props.listing.id
									: companyUploadShortlist + props.listing.id
							}
							newSnack={props.newSnack}
							updateData={props.updateData}
							onClose={() => setUploadSheetOpen(false)}
							accessToken={props.accessToken}
							type=".xlsx"
							id="xlsxSheet"
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="secondary" onClick={() => setUploadSheetOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					fullWidth
					maxWidth="lg"
					disableBackdropClick
					TransitionProps={{ unmountOnExit: true }}
					open={uploadSelectedSheetOpen}
					onClose={() => setUploadSelectedSheetOpen(false)}
				>
					<DialogTitle>Upload Selected</DialogTitle>
					<DialogContent>
						<UploadButton
							uploadAddress={
								props.address
									? placementcompanyUploadSelectedExcel + props.listing.id
									: companyUploadSelectedExcel + props.listing.id
							}
							newSnack={props.newSnack}
							updateData={props.updateData}
							onClose={() => setUploadSelectedSheetOpen(false)}
							accessToken={props.accessToken}
							type=".xlsx"
							id="xlsxSelectedSheet"
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="secondary" onClick={() => setUploadSelectedSheetOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					fullWidth
					maxWidth="lg"
					disableBackdropClick
					TransitionProps={{ unmountOnExit: true }}
					open={uploadWaitListSheetOpen}
					onClose={() => setUploadWaitListSheetOpen(false)}
				>
					<DialogTitle>Upload Waitlist</DialogTitle>
					<DialogContent>
						<UploadButton
							uploadAddress={
								props.address
									? placementcompanyUploadWaitlistExcel + props.listing.id
									: companyUploadWailistExcel + props.listing.id
							}
							newSnack={props.newSnack}
							updateData={props.updateData}
							onClose={() => setUploadWaitListSheetOpen(false)}
							accessToken={props.accessToken}
							type=".xlsx"
							id="xlsxWaitlistSheet"
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="secondary" onClick={() => setUploadWaitListSheetOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					fullWidth
					maxWidth="lg"
					disableBackdropClick
					TransitionProps={{ unmountOnExit: true }}
					open={slotDialogOpen}
					onClose={() => setSlotDialogOpen(false)}
				>
					<DialogTitle>Select a slot</DialogTitle>
					<DialogContent>
						<FormControl variant="outlined" fullWidth style={{ margin: 10 }} size="small">
							<InputLabel id={'demo-simple-select-outlined-label6'}>Slots</InputLabel>
							<Select
								labelId={'demo-simple-select-outlined-label6'}
								// value={''}
								onChange={(e) => setSelectedSlotId(e.target.value)}
								label="Choose a slot"
								// name="CTC_Breakup"
							>
								{allSlots.map((slot) => (
									<MenuItem value={slot.id}>
										Date : {slot.slot_date}, Start Time : {slot.slot_time}, End Time :{' '}
										{slot.slot_end_time}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</DialogContent>
					<DialogActions>
						<Button
							variant="contained"
							color="primary"
							onClick={() => {
								confirm()
									.then(() => {
										props.setLoading(true)
										Axios.post(
											placementAllotSlot,
											{ slot_id: selectedSlotId, listing_id: props.listing.id },
											config
										)
											.then(({ data }) => {
												if (data.success) {
													props.updateData()
												}
												props.newSnack(data.message, data.success ? 'info' : 'error')
												props.setLoading(false)
											})
											.catch((error) => {
												console.error(error)
												props.newSnack('Connection Error', 'error')
											})
											setSlotDialogOpen(false)
									})
									.catch(() => {})
							}}
						>
							Ok
						</Button>
						<Button variant="contained" color="secondary" onClick={() => setSlotDialogOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				{props.listing.interview ? (
					<TableContainer style={{ margin: 30, marginTop: 0 }} component={Paper}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Interview Date</TableCell>
									<TableCell>{props.listing.Interview_Date || 'TBA'}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Interview Time</TableCell>
									<TableCell>{props.listing.Interview_Time || 'TBA'}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Interview Venue</TableCell>
									<TableCell>{props.listing.Interview_venue || 'TBA'}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				) : (
					<></>
				)}
				<TableContainer style={{ margin: 30, marginTop: 0, padding: 30 }} component={'div'}>
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip
								title={
									props.listing.open_registration
										? 'Open registrations to listing for all eligible students'
										: 'Not open'
								}
							>
								<span>
									<Button
										variant={!props.listing.open_registration ? 'outlined' : 'contained'}
										style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
										disabled={!props.listing.open_registration}
										fullWidth
										color="primary"
										onClick={() => {
											confirm()
												.then(async () => {
													const { data } = await Axios.post(
														props.address
															? placementOpenRegistration
															: studentCoodOpenRegistration,
														{ id: props.listing.id },
														config
													).catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
													props.newSnack(data.message, data.success ? 'info' : 'error')
													if (data.success) {
														props.updateData()
														// handleClose()
													}
												})
												.catch(() => {})
										}}
									>
										Open Registrations
									</Button>
								</span>
							</Tooltip>
							<div style={{ margin: 15 }} />
							<span>
								<UpdateDeadline
									config={config}
									newSnack={props.newSnack}
									data={props.listing}
									updateData={props.updateData}
									address={props.address}
									// title={
									// 	props.listing.updatedeadline
									// 		? 'Update the deadline to close registration'
									// 		: 'Not open'
									// }
									title="Update the deadline to close registration"
								/>
							</span>
							<div style={{ margin: 15 }} />
							<Tooltip
								title={
									props.listing.alertstudentsaboutdeadline
										? 'Send a notification that registrations will be closing in 24 hrs'
										: 'Not open'
								}
							>
								<span>
									<Button
										variant={!props.listing.alertstudentsaboutdeadline ? 'outlined' : 'contained'}
										style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
										disabled={!props.listing.alertstudentsaboutdeadline}
										fullWidth
										color="primary"
										onClick={() => {
											confirm()
												.then(async () => {
													const { data } = await Axios.post(
														props.address ? placementAlertStudent : studentCoodAlertStudent,
														{ id: props.listing.id },
														config
													).catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
													props.newSnack(data.message, data.success ? 'info' : 'error')
													if (data.success) props.updateData()
												})
												.catch(() => {})
										}}
									>
										Alert Students about deadline
									</Button>
								</span>
							</Tooltip>
							<div style={{ margin: 15 }} />
							<Tooltip
								title={props.listing.closeregistration ? 'Close registration to listing' : 'Not open'}
							>
								<span>
									<Button
										variant={!props.listing.closeregistration ? 'outlined' : 'contained'}
										style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
										disabled={!props.listing.closeregistration}
										fullWidth
										color="primary"
										onClick={() => {
											confirm()
												.then(async () => {
													const { data } = await Axios.post(
														props.address
															? placementCloseRegistration
															: studentCoodCloseRegistration,
														{ id: props.listing.id },
														config
													).catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
													props.newSnack(data.message, data.success ? 'info' : 'error')
													if (data.success) {
														props.updateData()
														// handleClose()
													}
												})
												.catch(() => {})
										}}
									>
										Close Registration
									</Button>
								</span>
							</Tooltip>
							<div style={{ margin: 15 }} />
							<Tooltip
								title={
									props.listing.Submitregistrations
										? 'Send registered student details to company'
										: 'Not open'
								}
							>
								<span>
									<Button
										variant={!props.listing.Submitregistrations ? 'outlined' : 'contained'}
										style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
										disabled={!props.listing.Submitregistrations}
										fullWidth
										color="primary"
										onClick={() => {
											confirm({
												description:
													'This action is permanent, you cannot open/close registrations after this!',
											})
												.then(async () => {
													const { data } = await Axios.post(
														props.address
															? placementSubmitRegistrations
															: studentCoodSubmitRegistrations,
														{ id: props.listing.id },
														config
													).catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
													props.newSnack(data.message, data.success ? 'info' : 'error')
													if (data.success) {
														props.updateData()
														// handleClose()
													}
												})
												.catch(() => {})
										}}
									>
										Submit All Registrations
									</Button>
								</span>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<div style={{ border: '1px solid', borderColor: '#EDEDED', borderRadius: 10 }}>
								<Container>
									<div style={{ padding: 7 }} />
									<Typography
										color={!props.listing.shortlist ? 'textSecondary' : 'textPrimary'}
										variant="button"
									>
										Options for registered students excel sheet
									</Typography>
								</Container>
								<Tooltip title="Options for registered students excel sheet">
									<span
										style={{
											margin: 10,
											display: 'flex',
											justifyContent: 'flex-start',
											flexWrap: 'wrap',
										}}
									>
										<div
											style={{
												display: 'flex',
												justifyContent: 'flex-start',
												flexWrap: 'wrap',
											}}
										>
											<FormControlLabel
												disabled={!props.listing.shortlist}
												control={
													<Checkbox
														checked={registeredExcelOptions.degrees_in_iith}
														onChange={(e) =>
															setRegisteredExcelOptions({
																...registeredExcelOptions,
																degrees_in_iith:
																	!registeredExcelOptions.degrees_in_iith,
															})
														}
														color="primary"
													/>
												}
												label="Degrees at IITH"
											/>
											<FormControlLabel
												disabled={!props.listing.shortlist}
												control={
													<Checkbox
														checked={registeredExcelOptions.School_X}
														onChange={(e) =>
															setRegisteredExcelOptions({
																...registeredExcelOptions,
																School_X: !registeredExcelOptions.School_X,
															})
														}
														color="primary"
													/>
												}
												label="Class X Grade"
											/>
											<FormControlLabel
												disabled={!props.listing.shortlist}
												control={
													<Checkbox
														checked={registeredExcelOptions.School_XII}
														onChange={(e) =>
															setRegisteredExcelOptions({
																...registeredExcelOptions,
																School_XII: !registeredExcelOptions.School_XII,
															})
														}
														color="primary"
													/>
												}
												label="Class XII Grade"
											/>
										</div>
										<Button
											onClick={toggleOptionalOptions}
											style={{ color: 'blue' }}
											variant="text"
										>
											...
										</Button>
										<div
											style={{
												display: 'flex',
												justifyContent: 'flex-start',
												flexWrap: 'wrap',
												visibility: optionalOptionsVisible ? 'visible' : 'collapse',
											}}
										>
											<FormControlLabel
												disabled={!props.listing.shortlist}
												control={
													<Checkbox
														checked={registeredExcelOptions.JEE_Advanced_Rank}
														onChange={(e) =>
															setRegisteredExcelOptions({
																...registeredExcelOptions,
																JEE_Advanced_Rank:
																	!registeredExcelOptions.JEE_Advanced_Rank,
															})
														}
														color="primary"
													/>
												}
												label="JEE Advanced Rank"
											/>
											<FormControlLabel
												disabled={!props.listing.shortlist}
												control={
													<Checkbox
														checked={registeredExcelOptions.JEE_Advanced_Cat_Rank}
														onChange={(e) =>
															setRegisteredExcelOptions({
																...registeredExcelOptions,
																JEE_Advanced_Cat_Rank:
																	!registeredExcelOptions.JEE_Advanced_Cat_Rank,
															})
														}
														color="primary"
													/>
												}
												label="JEE Advanced Category Rank"
											/>
											<FormControlLabel
												disabled={!props.listing.shortlist}
												control={
													<Checkbox
														checked={registeredExcelOptions.category}
														onChange={(e) =>
															setRegisteredExcelOptions({
																...registeredExcelOptions,
																category: !registeredExcelOptions.category,
															})
														}
														color="primary"
													/>
												}
												label="Category"
											/>
										</div>
									</span>
								</Tooltip>
								<Tooltip title={props.listing.shortlist ? '' : 'Not open'}>
									<span>
										<Button
											variant={!props.listing.shortlist ? 'outlined' : 'contained'}
											style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
											disabled={!props.listing.shortlist}
											fullWidth
											color="primary"
											onClick={handleDownloadRegisteredExcelSheet}
										>
											Download Registered Students Excel Sheet
										</Button>
									</span>
								</Tooltip>
							</div>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip title={props.listing.shortlist ? '' : 'Not open'}>
								<span>
									<Button
										variant={!props.listing.shortlist ? 'outlined' : 'contained'}
										disabled={!props.listing.shortlist}
										color="primary"
										fullWidth
										onClick={() => handleDownloadAllCVs(props, registeredStudentsDetails, config)}
									>
										Download All CVs of Registered Students
									</Button>
								</span>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip title={props.listing.shortlist ? 'Template for uploading shortlist' : 'Not open'}>
								<div>
									<Button
										variant={!props.listing.shortlist ? 'outlined' : 'contained'}
										disabled={!props.listing.shortlist}
										style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
										color="default"
										size="small"
										fullWidth
										onClick={() => downloadFile(shortlistTemplateExcel)}
									>
										Download Template
									</Button>
									<Button
										variant={!props.listing.shortlist ? 'outlined' : 'contained'}
										disabled={!props.listing.shortlist}
										color="primary"
										style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
										size="large"
										fullWidth
										onClick={handleUpload}
									>
										Upload Shortlist
									</Button>
								</div>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip title={props.listing.shortlist ? '' : 'Not open'}>
								<span>
									<Button
										variant={!props.listing.shortlist ? 'outlined' : 'contained'}
										disabled={
											!props.listing.interview &&
											!props.listing.interview_sheet &&
											!props.listing.waitlist &&
											!props.listing.selected
										}
										color="primary"
										fullWidth
										onClick={() => handleDownloadAllCVs(props, shortlistedStudentsDetails, config)}
									>
										Download All CVs of Shortlisted Students
									</Button>
								</span>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<div>
								<Tooltip
									title={props.listing.waitlist ? 'Template for uploading Waitlist' : 'Not open'}
								>
									<span>
										<Button
											variant={!props.listing.waitlist ? 'outlined' : 'contained'}
											disabled={!props.listing.waitlist}
											color="default"
											style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
											size="small"
											fullWidth
											onClick={() => downloadFile(shortlistTemplateExcel)}
										>
											Download Template
										</Button>
									</span>
								</Tooltip>
								<div style={{ display: 'flex', alignItems: 'center' }}>
									<Tooltip title={props.listing.waitlist ? 'Upload waitlist' : 'Not open'}>
										<span style={{ flexGrow: 1 }}>
											<Button
												variant={!props.listing.waitlist ? 'outlined' : 'contained'}
												disabled={!props.listing.waitlist}
												color="primary"
												style={{
													borderTopLeftRadius: 0,
													borderTopRightRadius: 0,
													borderBottomRightRadius: 0,
												}}
												size="large"
												fullWidth
												onClick={handleUploadWaitListExcelSheet}
											>
												Upload Waitlist
											</Button>
										</span>
									</Tooltip>
									<Tooltip title={props.listing.waitlist ? 'No waitlist' : 'Not open'}>
										<span>
											<Button
												variant={!props.listing.waitlist ? 'outlined' : 'contained'}
												disabled={!props.listing.waitlist}
												size="large"
												fullWidth
												style={{
													borderTopLeftRadius: 0,
													borderTopRightRadius: 0,
													borderBottomLeftRadius: 0,
													padding: 0,
												}}
												color="primary"
												onClick={handleNoWaitList}
											>
												<span
													role="img"
													aria-label="No waitlist"
													style={{ width: '100%', height: '100%', fontSize: 23 }}
												>
													&times;
												</span>
											</Button>
										</span>
									</Tooltip>
								</div>
							</div>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					{props.address && (
						<Paper>
							<div style={{ padding: 15 }}>
								<Tooltip title={props.listing.allotslot ? '' : 'Not open'}>
									<span style={{ height: '100%' }}>
										<Button
											style={{ height: '100%' }}
											variant={!props.listing.allotslot ? 'outlined' : 'contained'}
											disabled={!props.listing.allotslot}
											color="primary"
											fullWidth
											onClick={() => setSlotDialogOpen(true)}
										>
											Allot Interview Slot
										</Button>
									</span>
								</Tooltip>
							</div>
						</Paper>
					)}
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip
								title={
									props.listing.Unlockinterviewlist
										? 'Create an interview list from shortlist and waitlist excluding placed students'
										: 'Not open'
								}
							>
								<span>
									<Button
										variant={!props.listing.Unlockinterviewlist ? 'outlined' : 'contained'}
										disabled={!props.listing.Unlockinterviewlist}
										style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
										color="primary"
										fullWidth
										onClick={() => {
											confirm({
												description:
													'This should be done immediately right before interviews start',
											}).then(() => {
												Axios.post(
													props.address ? placementInterviewState : studentCoodInterviewState,
													{ id: props.listing.id },
													config
												)
													.then(({ data }) => {
														data.success && props.updateData()
														props.newSnack(data.message, !data.success && 'error')
													})
													.catch(() => props.newSnack('Connection Error!', 'error'))
											})
										}}
									>
										Unlock Interview List
									</Button>
								</span>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip title={props.listing.interview_sheet ? '' : 'Not open'}>
								<span>
									<Button
										variant={!props.listing.interview_sheet ? 'outlined' : 'contained'}
										disabled={!props.listing.interview_sheet}
										style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
										color="primary"
										fullWidth
										onClick={handleDownloadInterviewExcelSheet}
									>
										Download Interview List Excel Sheet
									</Button>
								</span>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip
								title={props.listing.selected ? 'Template for uploading Selected List' : 'Not open'}
							>
								<div>
									<Button
										variant={!props.listing.selected ? 'outlined' : 'contained'}
										disabled={!props.listing.selected}
										size="small"
										style={{ borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}
										color="default"
										fullWidth
										onClick={() => downloadFile(shortlistTemplateExcel)}
									>
										Download Template
									</Button>
									<Button
										variant={!props.listing.selected ? 'outlined' : 'contained'}
										disabled={!props.listing.selected}
										color="primary"
										style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
										size="large"
										fullWidth
										onClick={handleUploadSelectedExcelSheet}
									>
										Upload Selected List
									</Button>
								</div>
							</Tooltip>
						</div>
					</Paper>
					<div style={{ margin: 15 }} />
					<Paper>
						<div style={{ padding: 15 }}>
							<Tooltip title={props.listing.waitlist ? '' : 'Not open'}>
								<span style={{ height: '100%' }}>
									<Button
										style={{ height: '100%' }}
										variant={!props.listing.placed ? 'outlined' : 'contained'}
										disabled={!props.listing.placed}
										color="primary"
										fullWidth
										onClick={handleDownloadPlacedExcel}
									>
										Download Placed Students Excel Sheet
									</Button>
								</span>
							</Tooltip>
						</div>
					</Paper>
				</TableContainer>
				<TableContainer style={{ margin: 30, marginTop: 0 }} component={Paper}>
					<Typography variant="h5" style={{ padding: 30, flexGrow: 1 }}>
						{props.listing.Job_Title}
					</Typography>
					<Table>
						<TableBody>
							<TableRow>
								<TableCell>Title</TableCell>
								<TableCell>{props.listing.Job_Title}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Description</TableCell>
								<TableCell>
									<div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: 200 }}>
										{props.listing.Job_Description_Offered}
									</div>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Tentative No. of Vacancies</TableCell>
								<TableCell>{props.listing.Tentative_No_of_Vacancies}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Skill Set Required</TableCell>
								<TableCell>{props.listing.Job_Description}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Job Location Code</TableCell>
								<TableCell>{props.listing.Job_Location_Code}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Job Location Name</TableCell>
								<TableCell>{props.listing.Job_Location_Name}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Job Joining Date</TableCell>
								<TableCell>{props.listing.Joining}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Remarks</TableCell>
								<TableCell>{props.listing.Remarks}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Aptitude Test</TableCell>
								<TableCell>{props.listing.Aptitude_Test ? <CheckIcon /> : <ClearIcon />}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Group Discussion</TableCell>
								<TableCell>{props.listing.Group_Discussion ? <CheckIcon /> : <ClearIcon />}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>HR Interview</TableCell>
								<TableCell>{props.listing.HR_Interview ? <CheckIcon /> : <ClearIcon />}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Online Test</TableCell>
								<TableCell>{props.listing.Online_Test ? <CheckIcon /> : <ClearIcon />}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Personal Interview</TableCell>
								<TableCell>
									{props.listing.Personal_Interview ? <CheckIcon /> : <ClearIcon />}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Shortlist from Resumes</TableCell>
								<TableCell>
									{props.listing.Shortlist_from_Resumes ? <CheckIcon /> : <ClearIcon />}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Technical Interview</TableCell>
								<TableCell>
									{props.listing.Technical_Interview ? <CheckIcon /> : <ClearIcon />}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Technical Test</TableCell>
								<TableCell>{props.listing.Technical_Test ? <CheckIcon /> : <ClearIcon />}</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				<TableContainer style={{ margin: 30, marginTop: 0 }} component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Programme</TableCell>
								<TableCell>{placement ? 'CTC' : 'Stipend'}</TableCell>
								<TableCell>{placement ? 'Gross' : 'Duration'}</TableCell>
								<TableCell>Min. CGPA</TableCell>
								<TableCell>{placement ? 'CTC Breakup' : ''}</TableCell>
								<TableCell>{placement ? 'Service Type' : 'PPO'}</TableCell>
								{/* {placement && <TableCell>Perks/Bonus</TableCell>} */}
							</TableRow>
						</TableHead>
						<TableBody>
							{props.listing.Salary_Details.map((programme, key) => {
								return (
									<TableRow key={key}>
										<TableCell>{props.lookupTable[programme.name_of_programme]}</TableCell>
										<TableCell>{programme.CTC}</TableCell>
										<TableCell>{programme.Gross}</TableCell>
										<TableCell>{programme.MinCGPA}</TableCell>
										<TableCell>{placement ? programme.CTC_Breakup : ''}</TableCell>
										<TableCell>{programme.Service_Type}</TableCell>
										{placement && <TableCell>{programme.Service_Type_Remarks}</TableCell>}
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Fade>
	)
}

export default ManageIndivListings
