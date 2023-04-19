import React, { useState } from 'react'

import Axios from 'axios'

import { Route, useHistory } from 'react-router-dom'

import { b64toBlob } from '../../components/scripts'
import cloneDeep from 'clone-deep'

import { handleDownloadAllCVs } from '../../components/CVDownloader'
import {
	companyAllListings,
	companyUploadShortlist,
	companyGetRegisteredStudentsExcel,
	companyGetInterviewListExcel,
	companyUploadSelectedExcel,
	companyUploadWailistExcel,
	companyDownloadPlacedExcel,
	companyUploadEmptyWailistExcel,
	companyAllProfiles,
	allEligibilityDegreesCompany,
	allEligibilityDegrees,
	companyEditListing,
	companyRemoveListing,
	companyIsItPlacement,
	companyJobDescriptionFileDownload,
	placementEditListing,
	placementRemoveListing,
	registeredStudentsDetails,
} from '../../constants/addresses'

import { useConfirm } from 'material-ui-confirm'

// eslint-disable-next-line no-unused-vars
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
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ClearIcon from '@material-ui/icons/CheckBoxOutlineBlank'
import CheckIcon from '@material-ui/icons/CheckBox'
import EditIcon from '@material-ui/icons/Edit'

import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const CurrentDegreeSelector = (props) => {
	const [loading, setLoading] = useState(true)
	const [allDegrees, setAllDegrees] = useState(props.Department)
	const [open, setOpen] = useState(false)
	const [checkedState, setCheckedState] = useState([])
	const [expandedState, setExpandedState] = useState([])

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = () => {
		props.setDepartment(checkedState)
		setOpen(false)
	}

	React.useEffect(() => {
		if (props.accessToken === '') return
		setLoading(true)
		Axios.get(allEligibilityDegreesCompany)
			.then((res) => {
				setAllDegrees(
					props.placement
						? res.data
						// ? res.data.filter((degree) => degree.id !== 7)
						: res.data.filter((degree) => degree.id === 1 || degree.id === 4 || degree.id === 7)
				)
				setCheckedState(
					props.placement
						? props.Department
						: props.Department.filter(
							(department) => department.slice(0, 1) === 1 || department.slice(0, 1) === '1' || department.slice(0, 1) === 4 || department.slice(0, 1) === '4' || department.slice(0, 1) === 7 || department.slice(0, 1) === '7'
						)
				)
				// setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})

		Axios.post(allEligibilityDegrees, props.Department)
			.then((res) => {
				const newProgrammeNames = []
				res.data.forEach(({ value }, key) => {
					newProgrammeNames[key] = {
						name_of_programme: value,
						CTC: null,
						Gross: null,
						CTC_Breakup: null,
						MinCGPA: null,
						Service_Type: null,
						Service_Type_Remarks: null,
					}
				})
				props.setSalaryDetails((prevState) => {
					return newProgrammeNames.map((val, i) => {
						const ind = prevState.findIndex(
							(a) => parseInt(a.name_of_programme) === parseInt(val.name_of_programme)
						)
						// console.log(ind, newProgrammeNames, prevState)
						if (ind >= 0) {
							return {
								name_of_programme: parseInt(prevState[ind].name_of_programme || val.name_of_programme),
								CTC: prevState[ind].CTC || val.CTC,
								Gross: prevState[ind].Gross || val.Gross,
								CTC_Breakup: prevState[ind].CTC_Breakup || val.CTC_Breakup,
								MinCGPA: prevState[ind].MinCGPA || val.MinCGPA,
								Service_Type: prevState[ind].Service_Type || val.Service_Type,
								Service_Type_Remarks: prevState[ind].Service_Type_Remarks || val.Service_Type_Remarks,
							}
						}
						return {
							name_of_programme: parseInt(val.name_of_programme),
							CTC: val.CTC,
							Gross: val.Gross,
							CTC_Breakup: val.CTC_Breakup,
							MinCGPA: val.MinCGPA,
							Service_Type: val.Service_Type,
							Service_Type_Remarks: val.Service_Type_Remarks,
						}
					})
				})
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.Department, props.placement])

	React.useEffect(() => {
		if (props.placement === 0) setCheckedState([])
	}, [props.placement])

	if (loading) {
		return (
			<Container
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress />
				<div style={{ width: 12 }} />
				Please wait
			</Container>
		)
	}
	return (
		<Container style={{ marginTop: 10, marginBottom: 10 }}>
			<Button
				color={!(checkedState.length === 0) ? 'primary' : 'secondary'}
				fullWidth
				variant="outlined"
				onClick={handleClickOpen}
				style={
					checkedState.length === 0
						? {
							color: 'red',
							borderColor: 'red',
						}
						: {
							color: 'green',
							borderColor: 'green',
						}
				}
			>
				{checkedState.length === 0
					? 'Eligibility and Compensation'
					: 'Selected ' + checkedState.length + ' Degrees'}
			</Button>

			<Dialog maxWidth="lg" fullWidth open={open} onClose={handleClose}>
				<DialogTitle>Select Here</DialogTitle>
				<DialogContent style={{ minHeight: 300 }}>
					<CheckboxTree
						showExpandAll
						// icons={{
						// 	check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
						// 	uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
						// 	halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="minus-square" />,
						// 	expandClose: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />
						// 	),
						// 	expandOpen: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />
						// 	),
						// 	expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
						// 	collapseAll: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />
						// 	),
						// 	parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
						// 	parentOpen: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />
						// 	),
						// 	leaf: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
						// }}
						iconsClass="fa5"
						expandOnClick
						onClick={() => { }}
						nodes={allDegrees}
						checked={checkedState}
						expanded={expandedState}
						onCheck={(checked) => setCheckedState(checked)}
						onExpand={(expanded) => setExpandedState(expanded)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="primary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

const ProfileSelector = (props) => {
	// console.log(props)
	const [loading, setLoading] = useState(true)
	const [allProfiles, setAllProfiles] = useState([])

	let CompanyProfiles
	if (props.companyId) {
		CompanyProfiles = props.allCompaniesData.filter((company) => company.Company_id === props.companyId)
		// console.log(CompanyProfiles)
	}

	React.useEffect(() => {
		setLoading(true)
		Axios.get(companyAllProfiles, props.config)
			.then((res) => {
				if (res.data.success) {
					setAllProfiles(res.data.message)
					// console.log(res.data.message)
				}
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	if (loading) {
		return (
			<Container
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress />
			</Container>
		)
	}

	return (
		<Container style={{ marginTop: 10, marginBottom: 10 }}>
			<FormControl variant="outlined" fullWidth>
				<InputLabel id="demo-simple-select-outlined-label5">Select Profile</InputLabel>
				{props.companyId ? (
					<Select
						labelId="demo-simple-select-outlined-label5"
						value={props.selectedProfileId}
						onChange={(e) => props.setSelectedProfileId(e.target.value)}
						label="Internship or Placement"
						name="placement"
					>
						{CompanyProfiles.map((profile, i) => (
							<MenuItem key={`item-${i}`} value={profile.id}>{`${profile.Name_of_the_company} (${profile.placement ? 'Placement' : 'Internship'
								})`}</MenuItem>
						))}
					</Select>
				) : (
					<Select
						labelId="demo-simple-select-outlined-label5"
						value={props.selectedProfileId}
						onChange={(e) => props.setSelectedProfileId(e.target.value)}
						label="Internship or Placement"
						name="placement"
					>
						{allProfiles.map((profile, i) => (
							<MenuItem key={`item-${i}`} value={profile.id}>{`${profile.Name_of_the_company} (${profile.placement ? 'Placement' : 'Internship'
								})`}</MenuItem>
						))}
					</Select>
				)}
			</FormControl>
		</Container>
	)
}

const SetSalaryDetails = (props) => {
	const [open, setOpen] = useState(false)
	const [ogSalaryDetails, setOgSalaryDetails] = useState(JSON.stringify(props.SalaryDetails))
	const [formData, setFormData] = useState(props.SalaryDetails)

	React.useEffect(() => {
		setFormData(props.SalaryDetails)
		setOgSalaryDetails(JSON.stringify(props.SalaryDetails))
		// eslint-disable-next-line
	}, [props.SalaryDetails])

	const handleClickOpen = () => {
		if (props.SalaryDetails.length === 0) {
			props.newSnack('Eligibility and Compensation first', 'warning')
			return
		}
		setOpen(true)
	}

	const formValid = () => {
		var result = true
		formData.forEach((programme) => {
			for (var attr in programme) {
				if (attr !== 'Service_Type_Remarks' && (programme[attr] === null || programme[attr] === '')) {
					result = false
					props.newSnack('Mandatory fields are empty', 'error')
					break
				}
			}
			if (programme.MinCGPA > 10 || programme.MinCGPA < 0) {
				props.newSnack('MinCGPA must be less than 10 and greater than 0', 'error')
				result = false
			}
		})
		return result
	}

	const handleClose = () => {
		setOpen(false)
	}

	const handleOK = () => {
		if (!formValid()) {
			//
		} else {
			props.setSalaryDetails(formData)
			handleClose()
			setTimeout(() => setOgSalaryDetails({}), 200)
		}
	}

	//console.log(ogSalaryDetails, JSON.stringify(formData))

	const TextFieldProps = {
		style: { margin: 10 },
		fullWidth: true,
		size: 'small',
		variant: 'outlined',
	}

	const handleChangesinForm = (event, programme, key) => {
		const newFormData = JSON.parse(JSON.stringify(formData))
		newFormData[key][event.target.name] = event.target.value
		setFormData(newFormData)
	}

	return (
		<Container style={{ marginTop: 10, marginBottom: 10 }}>
			<Button
				color={ogSalaryDetails === JSON.stringify(formData) ? 'secondary' : 'primary'}
				fullWidth
				style={
					ogSalaryDetails === JSON.stringify(formData)
						? {
							color: 'red',
							borderColor: 'red',
						}
						: {
							color: 'green',
							borderColor: 'green',
						}
				}
				variant="outlined"
				onClick={handleClickOpen}
			>
				Salary Details
			</Button>
			<Dialog
				TransitionProps={{ unmountOnExit: true }}
				disableBackdropClick
				fullWidth
				maxWidth="lg"
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>Set Programmewise options</DialogTitle>
				<DialogContent style={{ minHeight: 300 }}>
					<Typography variant="body1" color="error" style={{ padding: 12, marginTop: 0, paddingTop: 0 }}>
						MTech [PG internships] internships are subject to department approval, write at
						internships@iith.ac.in for more information
					</Typography>
					<Typography variant="body1" color="error" style={{ padding: 12, marginTop: 0, paddingTop: 0 }}>
						Only 2024 graduating students are eligible for both semester and summer internships.
					</Typography>
					{formData.map((programme, key) => {
						const handleChange = (event) => {
							handleChangesinForm(event, programme, key)
						}
						if (
							props.placement ||
							programme.name_of_programme === 1000000 ||
							programme.name_of_programme === '1000000' ||
							programme.name_of_programme === 4000000 ||
							programme.name_of_programme === '4000000' ||
							programme.name_of_programme === 7000000 ||
							programme.name_of_programme === '7000000'
						) {
							return (
								<Container
									style={{ paddingTop: 20, paddingBottom: 20, marginBottom: 30, border: '1px solid' }}
									component={Paper}
									key={key}
								>
									<Typography variant="button">
										{props.eligibilityLookupTable[programme.name_of_programme]}
									</Typography>
									<Container>
										{!props.placement &&
											(programme.name_of_programme === 1000000 ||
												programme.name_of_programme === '1000000' ? (
												<FormControl
													variant="outlined"
													fullWidth
													style={{ margin: 10 }}
													size="small"
												>
													<InputLabel id={'demo-simple-select-outlined-label5' + key}>
														Type of Internship
													</InputLabel>
													<Select
														labelId={'demo-simple-select-outlined-label5' + key}
														value={programme['CTC_Breakup'] || ''}
														onChange={handleChange}
														label="Type of Internship"
														name="CTC_Breakup"
													>
														<MenuItem value={'Summer Internship'}>
															[Summer] 2 months (8-10 weeks) : May - July
														</MenuItem>
														<MenuItem disabled value={'Semester Internship'}>
															[Semester] 6 months : Jan - June
														</MenuItem>
													</Select>
												</FormControl>
											) : (
												<FormControl
													variant="outlined"
													fullWidth
													style={{ margin: 10 }}
													size="small"
												>
													<InputLabel id={'demo-simple-select-outlined-label6' + key}>
														Type of Internship
													</InputLabel>
													<Select
														labelId={'demo-simple-select-outlined-label6' + key}
														value={programme['CTC_Breakup'] || ''}
														onChange={handleChange}
														label="Type of Internship"
														name="CTC_Breakup"
													>
														<MenuItem value={'Summer Internship'}>
															[Summer] 2 months (8-10 weeks) : May - July
														</MenuItem>
														<MenuItem disabled value={'Semester Internship'}>
															[Semester] 6 months : Jan - June
														</MenuItem>
													</Select>
												</FormControl>
											))}
										{!props.placement && programme['CTC_Breakup'] === 'Semester Internship' && (
											<Typography
												variant="body1"
												color="error"
												style={{ padding: 12, marginTop: 0, paddingTop: 0 }}
											>
												Minimum CPGA for Semester Internship is 8 as decided by institute.
											</Typography>
										)}
										<TextField
											value={programme['MinCGPA'] || ''}
											onChange={handleChange}
											name="MinCGPA"
											type="number"
											label="Min CGPA required to apply"
											{...TextFieldProps}
										/>
										<TextField
											value={programme['CTC'] || ''}
											onChange={handleChange}
											name="CTC"
											label={
												props.placement === false ? 'Stipend' : 'CTC with currency'
											}
											{...TextFieldProps}
										/>
										<TextField
											value={programme['Gross'] || ''}
											onChange={handleChange}
											name="Gross"
											label={
												props.placement === false ? 'Duration' : 'Gross with currency'
											}
											{...TextFieldProps}
										/>
										{props.placement && (
											<TextField
												value={programme['CTC_Breakup'] || ''}
												onChange={handleChange}
												name="CTC_Breakup"
												multiline
												label="CTC Breakup"
												{...TextFieldProps}
											/>
										)}
										{props.placement && (
											<TextField
												value={programme['Service_Type'] || ''}
												onChange={handleChange}
												name="Service_Type"
												label="Service Type"
												{...TextFieldProps}
											/>
										)}
										{!props.placement && (
											<FormControl
												variant="outlined"
												fullWidth
												style={{ margin: 10 }}
												size="small"
											>
												<InputLabel id={'demo-simple-select-outlined-label55'}>
													Pre-placement Offer
												</InputLabel>
												<Select
													labelId={'demo-simple-select-outlined-label55'}
													value={programme['Service_Type'] || ''}
													onChange={handleChange}
													label="Pre-placement Offer"
													name="Service_Type"
												>
													<MenuItem value={'Yes'}>Yes</MenuItem>
													<MenuItem value={'No'}>No</MenuItem>
												</Select>
											</FormControl>
										)}
										{/* {props.placement && (
										<TextField
											value={programme['Service_Type_Remarks'] || ''}
											onChange={handleChange}
											multiline
											name="Service_Type_Remarks"
											label="Perks/Bonus"
											{...TextFieldProps}
										/>
									)} */}
									</Container>
								</Container>
							)
						}
					})}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleOK} variant="contained" color="primary">
						OK
					</Button>
					<Button onClick={handleClose} variant="contained" color="secondary">
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

const openLinkInNewTab = (openURL) => {
	window.open(openURL, '_blank')
}

export const EditListing = (props) => {
	const [formData, setFormData] = useState(cloneDeep(props.data))
	const history = useHistory()
	const [selectedProfileId, setSelectedProfileId] = useState(props.data['Company_profile_id'])
	const config = props.config
	const [registrationInProgress, setRegistrationInProgress] = useState(false)
	const [Department, setDepartment] = useState(props.data['Job_Eligibledegrees'])
	const [SalaryDetails, setSalaryDetails] = useState(cloneDeep(props.data['Salary_Details']))
	const [placement, setPlacement] = useState()
	const [selectedFile, setSelectedFile] = useState(null)

	const handleChange = (event) => {
		event.persist()
		if (event.target.value === 'checkboxBOOL')
			setFormData((prevState) => ({ ...prevState, [event.target.id]: event.target.checked }))
		else setFormData((prevState) => ({ ...prevState, [event.target.id]: event.target.value }))
	}

	const handleRegister = async () => {
		for (var attr in formData) {
			if (formData[attr] === '') {
				props.newSnack('All fields are mandatory')
				return
			}
		}
		if (selectedProfileId === '') {
			props.newSnack('Select a profile')
			return
		}
		formData.Job_Eligibledegrees = Department
		formData.Salary_Details = SalaryDetails
		formData.Company_profile_id = selectedProfileId
		console.log(formData)
		const fileData = new FormData()
		if (formData['document']) fileData.append('file', selectedFile)
		fileData.append('listing', JSON.stringify(formData))
		if (formData.No_of_Rounds > 127) {
			props.newSnack('No. of Rounds must be less than 128', 'error')
			return
		}
		if (formData.No_of_Rounds < 1) {
			props.newSnack('No. of Rounds must be positive', 'error')
			return
		}
		if (formData.Tentative_No_of_Vacancies > 9999) {
			props.newSnack('Tentative No. of Vacancies must be less than 10000', 'error')
			return
		}
		if (formData.Tentative_No_of_Vacancies < 1) {
			props.newSnack('Tentative No. of Vacancies must be positive', 'error')
			return
		}
		if (!formData.Remarks) {
			props.newSnack('Remarks is mandatory', 'error')
			return
		}
		if (!formData.Job_Description_Offered) {
			props.newSnack('Skillset required is mandatory', 'error')
			return
		}
		if (formData.No_of_Rounds > 127) {
			props.newSnack('No. of Rounds must be less than 128', 'error')
			return
		}
		if (formData.Job_Description > 127) {
			props.newSnack('Job Description is mandatory', 'error')
			return
		}
		if (formData.No_of_Rounds < 1) {
			props.newSnack('No. of Rounds must be positive', 'error')
			return
		}
		if (formData.Tentative_No_of_Vacancies > 9999) {
			props.newSnack('Tentative No. of Vacancies must be less than 10000', 'error')
			return
		}
		if (formData.Tentative_No_of_Vacancies < 1) {
			props.newSnack('Tentative No. of Vacancies must be positive', 'error')
			return
		}
		if (formData.Job_Description_Offered.length > 65536) {
			props.newSnack('Job Description must be less than 65536 characters', 'error')
			return
		}
		if (formData.Job_Description.length > 65536) {
			props.newSnack('Skill set must be less than 65536 characters', 'error')
			return
		}
		if (formData.Job_Location_Name.length > 65536) {
			props.newSnack('Location Name must be less than 65536 characters', 'error')
			return
		}
		if (formData.Job_Location_Code.length > 65536) {
			props.newSnack('Location Code must be less than 65536 characters', 'error')
			return
		}
		if (formData.Remarks.length > 65536) {
			props.newSnack('Remarks must be less than 65536 characters', 'error')
			return
		}
		if (formData.Job_Title.length > 255) {
			props.newSnack('Title must be less than 255 characters', 'error')
			return
		}
		setFormData(formData)
		//console.log(formData)
		setRegistrationInProgress(true)
		console.log(fileData)
		const res = await Axios.post(props.address ? placementEditListing : companyEditListing, fileData, config)
			.then((data) => data.data)
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		setRegistrationInProgress(false)
		if (res.success && !props.address) setTimeout(() => history.push('/login/company/portal/managelisitngs'), 0)
		props.newSnack(res.message, res.success ? 'info' : 'error')
		if (res.success === true) {
			props.updateData()
			props.onClose()
		}
	}
	const TextFieldProps = {
		style: { margin: 10 },
		fullWidth: true,
		size: 'small',
		onChange: handleChange,
		variant: selectedProfileId === '' ? 'filled' : 'outlined',
		disabled: selectedProfileId === '',
	}

	React.useEffect(() => {
		props.placement === undefined
			? Axios.post(companyIsItPlacement, { id: selectedProfileId }, config)
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
			: // eslint-disable-next-line
			props.allCompaniesData.map((company) => {
				company.profile_id === selectedProfileId && setPlacement(company.placement === 1 ? true : false)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProfileId])

	React.useEffect(() => {
		if (placement === 0) setDepartment([])
		if (placement === 0) setSalaryDetails([])
		// eslint-disable-next-line
	}, [placement])

	const handleDelete = async () => {
		const isConfirmed = window.confirm('Are you sure?')
		if (!isConfirmed) return
		const { data } = await Axios.post(
			props.address ? placementRemoveListing : companyRemoveListing,
			{ id: formData['id'] },
			config
		).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		props.newSnack(data.message)
		if (data.success) {
			props.updateData()
			props.onClose()
		}
	}

	const handleDownloadJDPDF = async () => {
		const { data } = await Axios.get(companyJobDescriptionFileDownload + formData['id'], config).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (data.success) {
			const blobPDF = b64toBlob(data.message, 'application/pdf')
			const blobPDFURL = URL.createObjectURL(blobPDF)
			openLinkInNewTab(blobPDFURL)
		}
	}

	const handleChangeFile = (event) => {
		event.preventDefault()
		if (event.target.files.length === 0) {
			setSelectedFile(null)
			return
		}
		const file = event.target.files[0]
		if (file.size > 5500000) {
			props.newSnack('Select file less than 5 MiB', 'warning')
		} else {
			//console.log(file)
			setSelectedFile(file)
		}
	}

	return (
		<Fade in>
			<div>
				<Container style={{ paddingTop: 30 }}>
					<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
						<Button
							onClick={handleDelete}
							variant="contained"
							color="secondary"
							style={{ background: 'red' }}
						>
							Delete
						</Button>
					</div>
					<form
						style={{
							paddingLeft: 30,
							paddingRight: 30,
							paddingBottom: 8,
							paddingTop: 7,
							display: 'flex',
							justifyContent: 'left',
							flexDirection: 'row',
							flexWrap: 'wrap',
						}}
						noValidate
						autoComplete="off"
					>
						<ProfileSelector
							selectedProfileId={selectedProfileId}
							setSelectedProfileId={setSelectedProfileId}
							newSnack={props.newSnack}
							updated={props.updated}
							config={config}
							allCompaniesData={props.allCompaniesData}
							companyId={props.companyId}
						/>
						<TextField value={formData['Job_Title']} id="Job_Title" label="Job Title" {...TextFieldProps} />
						<TextField
							value={formData['Job_Description_Offered']}
							id="Job_Description_Offered"
							multiline
							label="Job Description"
							{...TextFieldProps}
						/>
						<div style={{ padding: 8 }} />
						<Tooltip title="Add/Remove Job description attachment">
							<FormControlLabel
								value="checkboxBOOL"
								checked={formData['document']}
								control={<Checkbox onChange={handleChange} id="document" />}
								label="Job Description File"
								labelPlacement="end"
							/>
						</Tooltip>
						{formData['document'] && props.data['document'] && (
							<Button variant="outlined" fullWidth color="primary" onClick={handleDownloadJDPDF}>
								Download Previous Job Description
							</Button>
						)}
						{formData['document'] && (
							<div style={{ width: '100%', display: 'flex' }}>
								<input
									style={{ display: 'none' }}
									onChange={handleChangeFile}
									id="JDEditpdf"
									accept=".pdf"
									type="file"
								/>
								<label htmlFor="JDEditpdf" style={{ flexGrow: 1 }}>
									<Button variant="outlined" color="primary" component="span" fullWidth>
										{selectedFile
											? "Selected '" + selectedFile.name + "'"
											: 'Upload Job Description'}
									</Button>
								</label>
							</div>
						)}
						<div style={{ padding: 8 }} />
						<TextField
							value={formData['Tentative_No_of_Vacancies']}
							id="Tentative_No_of_Vacancies"
							type="number"
							label="Tentative No. of Vacancies"
							{...TextFieldProps}
						/>
						<TextField
							value={formData['No_of_Rounds']}
							id="No_of_Rounds"
							type="number"
							label="No. of Rounds"
							{...TextFieldProps}
						/>
						<Container>
							<Typography variant="button" children="Select applicable" />
						</Container>
						<FormControl disabled={selectedProfileId === ''}>
							<Container style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Aptitude_Test']}
									control={<Checkbox onChange={handleChange} id="Aptitude_Test" />}
									label="Aptitude Test"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Group_Discussion']}
									control={<Checkbox onChange={handleChange} id="Group_Discussion" />}
									label="Group Discussion"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['HR_Interview']}
									control={<Checkbox onChange={handleChange} id="HR_Interview" />}
									label="HR Interview"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Online_Test']}
									control={<Checkbox onChange={handleChange} id="Online_Test" />}
									label="Online Test"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Personal_Interview']}
									control={<Checkbox onChange={handleChange} id="Personal_Interview" />}
									label="Personal Interview"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Shortlist_from_Resumes']}
									control={<Checkbox onChange={handleChange} id="Shortlist_from_Resumes" />}
									label="Shortlist from Resumes"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Technical_Interview']}
									control={<Checkbox onChange={handleChange} id="Technical_Interview" />}
									label="Technical Interview"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									checked={formData['Technical_Test']}
									control={<Checkbox onChange={handleChange} id="Technical_Test" />}
									label="Technical Test"
									labelPlacement="end"
								/>
							</Container>
						</FormControl>
						<TextField
							value={formData['Job_Location_Code']}
							id="Job_Location_Code"
							label="Pincode"
							{...TextFieldProps}
						/>
						<TextField
							value={formData['Job_Location_Name']}
							id="Job_Location_Name"
							label="Job Location"
							{...TextFieldProps}
						/>
						<TextField
							value={formData['Joining']}
							id="Joining"
							label="Date of Joining"
							placeholder="yyyy-mm-dd"
							type="date"
							inputProps={{ pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ }}
							InputLabelProps={{ shrink: true }}
							{...TextFieldProps}
						/>
						<TextField
							value={formData['Job_Description']}
							id="Job_Description"
							multiline
							label="Required Skill Set"
							{...TextFieldProps}
						/>
						<CurrentDegreeSelector
							Department={Department}
							setSalaryDetails={setSalaryDetails}
							setDepartment={setDepartment}
							SalaryDetails={SalaryDetails}
							placement={placement}
							newSnack={props.newSnack}
							accessToken={props.accessToken}
							updateData={props.updateData}
						/>
						<SetSalaryDetails
							eligibilityLookupTable={props.parentProps.eligibilityLookupTableData}
							newSnack={props.newSnack}
							SalaryDetails={SalaryDetails}
							placement={placement}
							updated={props.updated}
							setSalaryDetails={setSalaryDetails}
						/>
						<TextField value={formData['Remarks']} id="Remarks" label="Remarks" {...TextFieldProps} />
					</form>
					<div style={{ padding: 15 }} />
				</Container>
				<Paper
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
					elevation={0}
				>
					<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingBottom: 30 }}>
						<Button
							variant="contained"
							color="primary"
							disabled={registrationInProgress}
							onClick={handleRegister}
						>
							{registrationInProgress ? <CircularProgress /> : 'Submit'}
						</Button>
						<Button
							variant="contained"
							color="secondary"
							disabled={registrationInProgress}
							onClick={props.onClose}
						>
							{registrationInProgress ? <CircularProgress /> : 'Cancel'}
						</Button>
					</div>
				</Paper>
			</div>
		</Fade>
	)
}

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
			.catch(() => { })
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
	const history = useHistory()
	const [uploadSheetOpen, setUploadSheetOpen] = useState(false)
	const [optionalOptionsVisible, setOptionalOptionsVisible] = useState(false)
	const [allProfiles, setAllProfiles] = useState([])
	const [profilesLoading, setProfilesLoading] = useState(false)
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
	const [placement, setPlacement] = useState()
	// eslint-disable-next-line no-unused-vars
	const handleUpload = () => {
		setUploadSheetOpen(true)
	}
	// eslint-disable-next-line no-unused-vars
	const handleUploadSelectedExcelSheet = () => {
		setUploadSelectedSheetOpen(true)
	}
	// eslint-disable-next-line no-unused-vars
	const handleUploadWaitListExcelSheet = () => {
		setUploadWaitListSheetOpen(true)
	}

	// const handleDownloadAllCVs = async () => {
	// 	props.setLoading(true)
	// 	const res = await Axios.post(registeredStudentsDetails, { id: props.listing.id }, config).catch((err) =>
	// 		console.log(err)
	// 	)
	// 	if (!res.data.success) {
	// 		props.newSnack(res.data.message, 'warning')
	// 		props.setLoading(false)
	// 		return
	// 	}
	// 	var response = await res.data.message.map(async (student, key) => {
	// 		return new Promise(async (resolve, reject) => {
	// 			try {
	// 				const dd = pdfCVMakerFileCompany(
	// 					student.details[0],
	// 					student.degrees,
	// 					student.atiith,
	// 					student.cv,
	// 					props.lookupTable
	// 				)
	// 				const pdfDoc = pdfMake.createPdf(dd)
	// 				await pdfDoc.getBase64(async (data) => {
	// 					var fileName = student.details[0].email.slice(0, -11) + '.pdf'
	// 					zip.file(fileName, data, { base64: true })
	// 					resolve(1)
	// 				})
	// 			} catch (err) {
	// 				console.log(err)
	// 				reject(0)
	// 			}
	// 		})
	// 	})
	// 	Promise.all(response).then(async (values) => {
	// 		values.forEach((value) => {
	// 			if (value === 0) {
	// 				props.newSnack('Download failed', 'error')
	// 				props.setLoading(false)
	// 				return
	// 			}
	// 		})
	// 		var content = await zip.generateAsync({ type: 'base64' })
	// 		var zipName = 'download.zip'
	// 		var a = document.createElement('a')
	// 		a.href = 'data:application/zip;base64,' + content
	// 		a.download = zipName
	// 		a.style.display = 'none'
	// 		a.click()
	// 		props.setLoading(false)
	// 	})
	// }

	const handleDownloadRegisteredExcelSheet = () => {
		Axios.post(companyGetRegisteredStudentsExcel, { id: props.listing.id, data: registeredExcelOptions }, config)
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
	const downloadFile = (url) => {
		var element = document.createElement('a')
		element.setAttribute('href', url)
		element.setAttribute('download', 'listingSlotsTemplate.xlsx')
		element.style.display = 'none'
		document.body.appendChild(element)
		element.click()
	}

	const handleDownloadInterviewExcelSheet = () => {
		Axios.get(companyGetInterviewListExcel + props.listing.id, config)
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
				Axios.post(companyUploadEmptyWailistExcel, { id: props.listing.id }, config)
					.then(({ data }) => {
						if (data.success) {
							props.updateData()
						}
						props.newSnack(data.message, data.success ? 'info' : 'error')
						props.setLoading(true)
					})
					.catch((error) => {
						console.error(error)
						props.newSnack('Connection Error', 'error')
					})
			})
			.catch(() => { })
	}

	const handleDownloadPlacedExcel = () => {
		Axios.get(companyDownloadPlacedExcel + props.listing.id, config)
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
		setProfilesLoading(true)
		Axios.get(companyAllProfiles, config).then(({ data }) => {
			if (data.success) setAllProfiles(data.message)
			setProfilesLoading(false)
		})
		// eslint-disable-next-line
	}, [props.updated])

	React.useEffect(() => {
		Axios.post(companyIsItPlacement, { id: props.listing.Company_profile_id }, config)
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
		// eslint-disable-next-line
	}, [props.listing.Company_profile_id])

	const handleDownloadJDPDF = async () => {
		const { data } = await Axios.get(companyJobDescriptionFileDownload + props.listing.id, config).catch(
			(error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			}
		)
		if (data.success) {
			const blobPDF = b64toBlob(data.message, 'application/pdf')
			const blobPDFURL = URL.createObjectURL(blobPDF)
			openLinkInNewTab(blobPDFURL)
		}
	}

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
							uploadAddress={companyUploadShortlist + props.listing.id}
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
							uploadAddress={companyUploadSelectedExcel + props.listing.id}
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
							uploadAddress={companyUploadWailistExcel + props.listing.id}
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
				<TableContainer style={{ display: 'flex', alignItems: 'center', padding: 30 }} component={Paper}>
					<Button
						onClick={() => setTimeout(() => history.push(currentPath), 0)}
						variant="outlined"
						startIcon={<ArrowBackIosIcon />}
					>
						Back
					</Button>
					<Typography style={{ flexGrow: 1 }} />
					<Typography>Status: {props.listing.current_status}</Typography>
				</TableContainer>
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
					{/* 
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
					<div style={{ margin: 15 }} /> */}
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
					{/* <Paper>
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
					<div style={{ margin: 15 }} /> */}
					{/* <Paper>
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
					</Paper> */}
					{/* <div style={{ margin: 15 }} /> */}
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
							{props.listing.document && (
								<TableRow>
									<TableCell>Job Description File</TableCell>
									<TableCell>
										<Button
											variant="outlined"
											fullWidth
											color="primary"
											onClick={handleDownloadJDPDF}
										>
											Download Job Description
										</Button>
									</TableCell>
								</TableRow>
							)}
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
				{profilesLoading ? (
					<CircularProgress />
				) : (
					<TableContainer style={{ margin: 30, marginTop: 0 }} component={Paper}>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Company name</TableCell>
									<TableCell>
										{allProfiles.length
											? allProfiles.find(
												(profile) => profile.id === props.listing.Company_profile_id
											).Name_of_the_company
											: ''}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Internship or Placement</TableCell>
									<TableCell>
										{allProfiles.length
											? allProfiles.find(
												(profile) => profile.id === props.listing.Company_profile_id
											).placement
												? 'Placement'
												: 'Internship'
											: ''}
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
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

const currentPath = '/login/company/portal/managelisitngs/'

const ManageListings = (props) => {
	const history = useHistory()
	const accessToken = props.parentProps.companyCredentials.accessToken
	const [allListings, setAllListings] = useState([])
	const lookupTable = props.parentProps.eligibilityLookupTableData
	const config = { headers: { Authorization: `BEARER ${accessToken}` } }
	const [editOpen, setEditOpen] = useState(false)
	const [editData, setEditData] = useState({})

	React.useEffect(() => {
		if (accessToken === '') return
		props.setLoading(true)
		Axios.get(companyAllListings, config)
			.then((res) => {
				//console.log(res.data)
				if (res.data.success) setAllListings(res.data.message)
				else props.newSnack(res.data.message, 'error')
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const handleClick = (listing) => {
		setTimeout(() => {
			history.push(currentPath + listing.id)
		})
	}

	return (
		<Fade in>
			<div>
				<Typography variant="h4">Manage Listings</Typography>
				<div style={{ padding: 15 }} />

				<Route path={currentPath} exact>
					<Fade in>
						<TableContainer component={Paper}>
							<Dialog
								fullWidth
								open={editOpen}
								maxWidth="lg"
								onClose={() => {
									setEditOpen(false)
									setEditData({})
								}}
							>
								<DialogTitle
									style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
								>
									<span>Edit Listing</span>
								</DialogTitle>
								<DialogContent>
									<EditListing
										newSnack={props.newSnack}
										data={editData}
										config={config}
										setLoading={props.setLoading}
										updateData={props.updateData}
										accessToken={accessToken}
										parentProps={props.parentProps}
										onClose={() => {
											setEditOpen(false)
											setEditData({})
										}}
									/>
								</DialogContent>
							</Dialog>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Title</TableCell>
										<TableCell>Description</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Edit</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{allListings.map((listing, key) => {
										return (
											<TableRow key={key}>
												<TableCell onClick={() => handleClick(listing)}>
													<Button>{listing.Job_Title}</Button>
												</TableCell>
												<TableCell>
													<div
														style={{
															whiteSpace: 'pre-wrap',
															overflow: 'auto',
															maxHeight: 200,
														}}
													>
														{listing.Job_Description_Offered}
													</div>
												</TableCell>
												<TableCell>{listing.current_status}</TableCell>
												<TableCell>
													<IconButton
														onClick={() => {
															setEditOpen(true)
															setEditData(cloneDeep(allListings[key]))
														}}
													>
														<EditIcon />
													</IconButton>
												</TableCell>
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
					</Fade>
				</Route>
				{allListings.map((listing, key) => {
					return (
						<Route path={currentPath + listing.id} key={key} exact>
							<ManageIndivListings
								newSnack={props.newSnack}
								accessToken={props.parentProps.companyCredentials.accessToken}
								lookupTable={lookupTable}
								listing={listing}
								updated={props.updated}
								updateData={props.updateData}
								setLoading={props.setLoading}
							/>
						</Route>
					)
				})}
			</div>
		</Fade>
	)
}

export default ManageListings
