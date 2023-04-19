import React, { useState, useEffect } from 'react'

import Axios from 'axios'

import {
	studentUpdateBasicData,
	studentUploadFiles,
	studentProfilePicBase64,
	adminEmailAddress,
	studentUploadProofsDrive,
	adminDomainAddress,
} from '../../constants/addresses'

import { b64toBlob } from '../../components/scripts'

import worker from '../../components/downloadWorker'
import WebWorker from '../../components/workerSetup'

import Fade from '@material-ui/core/Fade'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'

import SaveIcon from '@material-ui/icons/Save'
import ResetIcon from '@material-ui/icons/Restore'
import CheckIcon from '@material-ui/icons/Check'

const TableCellTextBox = (props) => {
	const value = () => {
		if (props.value === null || props.value === undefined) return ''
		if (props.value === 'null') return ''
		return props.value
	}

	return (
		<TableCell>
			<TextField
				id={props.id}
				style={{ paddingRight: 10 }}
				type={props.type || 'text'}
				fullWidth
				size="small"
				autoComplete="off"
				margin="none"
				placeholder={props.placeholder}
				name={props.name}
				variant="outlined"
				onChange={props.onChange}
				value={value()}
				inputProps={props.inputProps}
			></TextField>
		</TableCell>
	)
}

const UploadButton = (props) => {
	const [selected, setSelected] = React.useState(false)
	const [selectedFile, setSelectedFile] = React.useState(null)
	const [progress, setProgress] = React.useState(0)

	const handleChange = (event) => {
		event.preventDefault()
		if (event.target.files.length === 0) {
			setSelectedFile(null)
			setSelected(false)
			return
		}
		const file = event.target.files[0]
		if (file.size > 1000000) {
			props.newSnack('Select file less than 1 MiB', 'warning')
		} else {
			//console.log(file)
			setSelectedFile(file)
			setSelected(true)
		}
	}

	const handleUpload = async () => {
		if (!selected) {
			return
		}
		const data = new FormData()
		data.append('file', selectedFile)
		const res = await Axios.post(studentUploadFiles, data, {
			headers: { Authorization: `BEARER ${props.accessToken}` },
			onUploadProgress: (progressEvent) => setProgress(progressEvent.loaded / progressEvent.total),
		}).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (res.data.success) {
			props.newSnack('Image successfully uploaded', 'info')
			props.onClose()
		}
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

const PhotoChangeDialog = (props) => {
	const handleClose = () => {
		props.onOK()
		props.onClose()
	}

	return (
		<Dialog maxWidth="lg" disableBackdropClick fullWidth onClose={handleClose} open={props.open}>
			<DialogTitle>Set profile picture</DialogTitle>
			<DialogContent>
				<UploadButton
					newSnack={props.newSnack}
					onClose={handleClose}
					accessToken={props.accessToken}
					type=".jpg"
					id="propicJPG"
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={() => props.onClose()}>Cancel</Button>
			</DialogActions>
		</Dialog>
	)
}

const PhotoChangeButton = (props) => {
	const [open, setOpen] = React.useState(false)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
			<Button variant="outlined" color="primary" onClick={handleClickOpen}>
				Change Photo
			</Button>
			<PhotoChangeDialog
				newSnack={props.newSnack}
				accessToken={props.accessToken}
				onOK={props.onOK}
				open={open}
				onClose={handleClose}
			/>
		</>
	)
}

const PersonalInfo = (props) => {
	const { gapi } = window
	const [Data, setDataActual] = useState({})
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
	const [savingInProgress, setSavingInProgress] = useState(false)
	const [dataChanged, setDataChanged] = useState(false)
	const [errorMsg, setErrorMsg] = useState('You can edit the information below')
	const [proPicURL, setProPicURL] = useState('')
	const [genderSpecify, setGenderSpecify] = useState('')

	const setData = (newData) => {
		if (!dataChanged) setDataChanged(true)
		setDataActual(newData)
	}

	useEffect(() => {
		setDataActual(JSON.parse(JSON.stringify(props.fetchedData)))
		setGenderSpecify(props.fetchedData.gender)
		Axios.get(studentProfilePicBase64, config)
			.then((res) => {
				const imageBlob = b64toBlob(res.data.message, 'image/jpg')
				const imageBlobURL = URL.createObjectURL(imageBlob)
				setProPicURL(imageBlobURL)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})

		//console.log(props.fetchedData)
		// eslint-disable-next-line
	}, [props.updated, props.fetchedNewData])

	const handleChange = (event) => {
		event.preventDefault()
		const newData = JSON.parse(JSON.stringify(Data))
		newData[event.target.name] = event.target.value
		setData(newData)
	}

	const handleChangeNumber = (event) => {
		const re = /^\+{0,1}[0-9]*$/
		if (!re.test(event.target.value)) {
			alert('Please enter only numbers')
			return
		}
		// const re1 = /^[0-9]{10}$/
		// const numberLengthIdTag = document.getElementById('numberLength')
		// if (!re1.test(event.target.value)) {
		// 	numberLengthIdTag.style.display = 'block'
		// } else if (re1.test(event.target.value)) {
		// 	numberLengthIdTag.style.display = 'none'
		// }
		event.preventDefault()
		const newData = JSON.parse(JSON.stringify(Data))
		newData[event.target.name] = event.target.value
		setData(newData)
	}

	const handleSave = async () => {
		const Data2 = JSON.parse(JSON.stringify(Data))
		console.log(Data2)
		const re1 = /^\+{0,1}[0-9]{10,14}$/
		if (!re1.test(Data2.contact)) {
			alert('Please enter a valid number in the Contact field')
			return
		}
		Data2.token = props.parentProps.studentCredentials.accessToken
		setErrorMsg('Saving.....')
		setSavingInProgress(true)
		const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
		const res = await Axios.post(studentUpdateBasicData, Data2, config).catch((error) => error)
		setSavingInProgress(false)
		if (res.data.success) {
			props.updateData()
		}
		setDataChanged(false)
		setErrorMsg(res.data.message)
	}

	const handleReset = () => {
		setData(JSON.parse(JSON.stringify(props.fetchedData)))
		setDataChanged(false)
		setErrorMsg('Reset done')
	}

	const handleUploadProofs = () => {
		const input = document.createElement('input')
		input.type = 'file'
		// input.accept = '.zip'
		input.onchange = (e) => {
			props.setLoading(true)
			const selFile = e.target.files[0]
			const reader = new FileReader()
			reader.readAsArrayBuffer(selFile)
			reader.onload = async (readerEvent) => {
				const content = readerEvent.target.result

				const fileContent = content
				const file = new Blob([fileContent], { type: 'application/zip' })
				const metadata = {
					name: selFile.name,
					mimeType: 'application/zip',
				}
				const accessToken = gapi.auth.getToken().access_token
				const form = new FormData()
				form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }))
				form.append('file', file)
				await Axios.post(
					'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id',
					form,
					{
						headers: { Authorization: 'Bearer ' + accessToken },
					}
				)
					.then(async ({ data }) => {
						const fileId = data.id
						await gapi.client.drive.permissions
							.create(
								{
									fileId,
									sendNotificationEmail: false,
								},
								{
									emailAddress: adminEmailAddress,
									role: 'reader',
									type: 'user',
									domain: adminDomainAddress,
								}
							)
							.then(async (res) => {
								const { data } = await Axios.post(
									studentUploadProofsDrive,
									{
										fileId,
										fileName: selFile.name,
									},
									config
								).catch((error) => {
									props.newSnack('Connection error', 'error')
									console.log(error)
								})
								if (data.success) {
									props.newSnack('Done!', 'success')
								} else {
									props.newSnack(data.message, 'warning')
								}
								console.log(res)
								props.setLoading(false)
							})
							.catch((error) => {
								props.newSnack('An error occured', 'error')
								console.log(error)
								props.setLoading(false)
							})
					})
					.catch((error) => {
						console.log(error)
						props.newSnack('Some error occured', 'error')
						props.setLoading(false)
					})
			}
		}
		input.click()
	}

	const fetchWebWorker = () => {
		const newWorker = new WebWorker(worker)
		newWorker.postMessage({ setLoading: props })
		newWorker.addEventListener('message', (e) => {
			console.log(e.data.length)
		})
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
				<Backdrop unmountOnExit style={{ color: 'black', zIndex: 10000 }} open={!props.fetchedNewData}>
					<CircularProgress style={{ color: 'white' }} />
				</Backdrop>
				{/* <Button
					variant="contained"
					color="primary"
					onClick={() => fetchWebWorker()}
				>
					WithWebWorker
				</Button> */}
				<ButtonGroup disabled={savingInProgress}>
					<Button
						disabled={!dataChanged}
						startIcon={<SaveIcon />}
						variant="contained"
						color="primary"
						onClick={handleSave}
					>
						Save
					</Button>
					<Button
						disabled={!dataChanged}
						startIcon={<ResetIcon />}
						variant="contained"
						color="secondary"
						onClick={handleReset}
					>
						Reset
					</Button>
				</ButtonGroup>
				<Typography style={{ color: 'red', padding: 10 }}>{errorMsg}</Typography>
				<TableContainer style={{ width: '100%' }} component={Paper}>
					<Table style={{ width: '100%' }}>
						<TableBody>
							<TableRow>
								<TableCell>Name</TableCell>
								<TableCellTextBox value={Data.name} onChange={handleChange} name="name" />
							</TableRow>
							<TableRow>
								<TableCell>Profile picture</TableCell>
								<TableCell align="center">
									{proPicURL === '' ? (
										<CircularProgress />
									) : (
										<img style={{ maxHeight: 100, maxWidth: 100 }} src={proPicURL} alt=" " />
									)}
									<br />
									<PhotoChangeButton
										newSnack={props.newSnack}
										accessToken={props.parentProps.studentCredentials.accessToken}
										onOK={() => {
											props.newSnack('Profile pic Changed', 'info')
											props.updateData()
										}}
									/>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Email ID</TableCell>
								<TableCell>{Data.email}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>CV Deadline</TableCell>
	 							<TableCell>{Data.CV_Deadline}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Academic details verification status</TableCell>
								<TableCell>{Data.CV_Verified}</TableCell>
							</TableRow>
							{/* <TableRow>
								<TableCell>Proofs Link</TableCell>
								<TableCellTextBox value={Data.Gdrive} onChange={handleChange} name="Gdrive" />
							</TableRow> */}
							<TableRow>
								<TableCell>Proofs Upload</TableCell>
								<TableCell>
									<Button variant="contained" color="primary" onClick={handleUploadProofs}>
										Upload
									</Button>
									<Button
										variant="contained"
										color="primary"
										disabled={Data.Gdrive === null}
										style={{ marginLeft: '15px' }}
									>
										<a
											target="_blank"
											rel="noopener noreferrer"
											href={Data.Gdrive}
											style={{ color: 'white' }}
										>
											Uploaded Proofs
										</a>
									</Button>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Internship/Placement/Higher Studies</TableCell>
								<TableCell>
									<FormControl variant="outlined" fullWidth size="small">
										<InputLabel id="demo-simple-select-outlined-label2">
											Internship/Placement/Higher Studies
										</InputLabel>
										<Select
											fullWidth
											labelId="demo-simple-select-outlined-label2"
											value={Data.placement === 0 ? 0 : Data.placement === 1 ? 1 : 2}
											// value={Data.placement}
											onChange={handleChange}
											label="Internship or Placement or Higher Studies"
											name="placement"
										>
											<MenuItem value={0}>Internship</MenuItem>
											<MenuItem value={1}>Placement</MenuItem>
											<MenuItem value={2}>Higher Studies</MenuItem>
										</Select>
									</FormControl>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Alternate Email</TableCell>
								<TableCellTextBox value={Data.email_other} onChange={handleChange} name="email_other" />
							</TableRow>
							<TableRow>
								<TableCell>Postal Address</TableCell>
								<TableCellTextBox
									value={Data.postal_address}
									onChange={handleChange}
									name="postal_address"
								/>
							</TableRow>
							<TableRow>
								<TableCell>Permanent Address</TableCell>
								<TableCellTextBox
									value={Data.permanent_address}
									onChange={handleChange}
									name="permanent_address"
								/>
							</TableRow>
							<TableRow>
								<TableCell>Contact</TableCell>
								<TableCellTextBox value={Data.contact} onChange={handleChangeNumber} name="contact" />
							</TableRow>
							<TableRow>
								<TableCell>Gender</TableCell>
								<TableCell>
									<FormControl variant="outlined" fullWidth size="small">
										<InputLabel id="demo-simple-select-outlined-label">Gender</InputLabel>
										<Select
											fullWidth
											labelId="demo-simple-select-outlined-label"
											value={Data.gender || 'Other'}
											onChange={handleChange}
											label="Gender"
											name="gender"
										>
											<MenuItem value={'Prefer not say'}>Prefer not say</MenuItem>
											<MenuItem value={'Female'}>Female</MenuItem>
											<MenuItem value={'Male'}>Male</MenuItem>
											<MenuItem value={'Other'}>Other</MenuItem>
											<MenuItem value={genderSpecify}>{genderSpecify}</MenuItem>
										</Select>
									</FormControl>
									{Data.gender === 'Other' ? (
										<div>
											<TextField
												variant="outlined"
												name="gender"
												value={genderSpecify}
												onChange={(e) => {
													e.preventDefault()
													setGenderSpecify(e.target.value)
												}}
											/>
											<IconButton
												onClick={() => {
													const newData = JSON.parse(JSON.stringify(Data))
													newData.gender = genderSpecify
													setData(newData)
												}}
											>
												<CheckIcon />
											</IconButton>
										</div>
									) : (
										<React.Fragment></React.Fragment>
									)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Category</TableCell>
								<TableCell>
									<FormControl variant="outlined" fullWidth size="small">
										<InputLabel id="demo-simple-select-outlined-label5">Category</InputLabel>
										<Select
											fullWidth
											labelId="demo-simple-select-outlined-label5"
											value={Data.category || 'General'}
											onChange={handleChange}
											label="Category"
											name="category"
										>
											<MenuItem value="General">General</MenuItem>
											<MenuItem value="OBC">OBC</MenuItem>
											<MenuItem value="SC">SC</MenuItem>
											<MenuItem value="ST">ST</MenuItem>
											<MenuItem value="Physically Challenged">Physically Challenged</MenuItem>
										</Select>
									</FormControl>
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Date of Birth</TableCell>
								<TableCellTextBox
									value={Data.date_of_birth}
									onChange={handleChange}
									name="date_of_birth"
									placeholder="yyyy-mm-dd"
									type="date"
									inputProps={{ pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ }}
								/>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Fade>
	)
}

export default PersonalInfo
