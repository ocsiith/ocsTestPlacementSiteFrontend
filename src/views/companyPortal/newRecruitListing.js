import React, { useState } from 'react'

import Axios from 'axios'

import {
	allEligibilityDegreesCompany,
	allEligibilityDegrees,
	companyCreateNewListing,
	companyAllProfiles,
	companyIsItPlacement,
} from '../../constants/addresses'

import { Link, useHistory } from 'react-router-dom'

import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import IconButton from '@material-ui/core/IconButton'
import Popover from '@material-ui/core/Popover'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'

import HelpIcon from '@material-ui/icons/HelpOutline'

import CheckboxTree from 'react-checkbox-tree'
import 'react-checkbox-tree/lib/react-checkbox-tree.css'
// eslint-disable-next-line
const PopupHelper = (props) => {
	return (
		<PopupState variant="popover">
			{(popupState) => (
				<div>
					<IconButton style={{}} {...bindTrigger(popupState)}>
						<HelpIcon style={{ color: 'black' }} />
					</IconButton>
					<Popover
						{...bindPopover(popupState)}
						anchorOrigin={{
							vertical: 'top',
							horizontal: 'right',
						}}
						transformOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}
					>
						<Box p={2}>
							<Typography>{props.content}</Typography>
						</Box>
					</Popover>
				</div>
			)}
		</PopupState>
	)
}

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
				console.log(res.data)
				setAllDegrees(
					props.placement
						? res.data
						// ? res.data.filter((degree) => degree.id !== 7)
						: res.data.filter((degree) => degree.id === 1 || degree.id === 4 || degree.id === 7)
				)
				setCheckedState(props.Department)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})

		Axios.post(allEligibilityDegrees, props.Department)
			.then((res) => {
				const newProgrammeNames = []
				//console.log(res)
				res.data.map(({ value }, key) => {
					newProgrammeNames[key] = {
						name_of_programme: value,
						CTC: null,
						Gross: null,
						CTC_Breakup: null,
						MinCGPA: null,
						Service_Type: null,
						Service_Type_Remarks: null,
					}
					return 0
				})
				props.setSalaryDetails(newProgrammeNames)
				//setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.Department, props.placement])

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
						nodes={allDegrees}
						checked={checkedState}
						expanded={expandedState}
						onCheck={(checked) => setCheckedState(checked)}
						expandOnClick={true}
						onClick={() => { }}
						onExpand={(expanded) => setExpandedState(expanded)}
					/>
					<Typography style={{ color: 'red' }}>
						For information regarding M.Tech Internships please mail{' '}
						<a href="mailto:internships@iith.ac.in">internships@iith.ac.in</a>
					</Typography>
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
	const [loading, setLoading] = useState(true)
	const [allProfiles, setAllProfiles] = useState([])

	React.useEffect(() => {
		setLoading(true)
		Axios.get(companyAllProfiles, props.config)
			.then((res) => {
				if (res.data.success) setAllProfiles(res.data.message)
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
			{allProfiles.length === 0 && (
				<Typography variant="body1" style={{ color: 'red' }}>
					You need to create atleast one Profile to be able to create a new listing.{' '}
					<Link to="/login/company/portal/profiles" style={{ color: 'blue' }}>
						Click Here
					</Link>{' '}
					to create a new Profile.
				</Typography>
			)}
			<FormControl variant="outlined" fullWidth disabled={allProfiles.length === 0}>
				<InputLabel id="demo-simple-select-outlined-label5">Select Profile</InputLabel>
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
			</FormControl>
		</Container>
	)
}

const SetSalaryDetails = (props) => {
	const [open, setOpen] = useState(false)
	const [buttonColor, setButtonColor] = useState('red')
	const [ogSalaryDetails, setOgSalaryDetails] = useState(JSON.stringify(props.SalaryDetails))
	const [formData, setFormData] = useState(props.SalaryDetails)

	React.useEffect(() => {
		setFormData(props.SalaryDetails)
		setOgSalaryDetails(JSON.stringify(props.SalaryDetails))
		// eslint-disable-next-line
	}, [props.SalaryDetails])
	React.useEffect(() => {
		setButtonColor('red')
	}, [props.Department])

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
		setFormData(JSON.parse(ogSalaryDetails))
	}

	const handleOK = () => {
		if (!formValid()) {
			//
		} else {
			props.setSalaryDetails(formData)
			handleClose()
			setTimeout(() => setOgSalaryDetails(JSON.stringify(formData)), 200)
			setButtonColor('green')
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
				style={{ color: buttonColor, borderColor: buttonColor }}
				variant="outlined"
				onClick={handleClickOpen}
			>
				Set Programmewise options
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
						const copyFromAbove = () => {
							formData[key] = {
								...formData[key - 1],
								name_of_programme: programme.name_of_programme,
							}
							setFormData(JSON.parse(JSON.stringify(formData)))
						}
						return (
							<Container
								style={{ paddingTop: 20, paddingBottom: 20, marginBottom: 30, border: '1px solid' }}
								component={Paper}
								key={key}
							>
								<div style={{ display: 'flex' }}>
									<Typography variant="button">
										{props.eligibilityLookupTable[programme.name_of_programme]}
									</Typography>
									<div style={{ flex: 1 }} />
									{key !== 0 && (
										<Button onClick={copyFromAbove} variant="outlined">
											Copy from above
										</Button>
									)}
								</div>
								<Container>
									{!props.placement &&
										(programme.name_of_programme === 1000000 ? (
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
										label={props.placement === false ? 'Stipend' : 'CTC with currency'}
										{...TextFieldProps}
									/>
									<TextField
										value={programme['Gross'] || ''}
										onChange={handleChange}
										name="Gross"
										label={props.placement === false ? 'Duration' : 'Gross with currency'}
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
										<FormControl variant="outlined" fullWidth style={{ margin: 10 }} size="small">
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
											label="Service Type Remarks"
											{...TextFieldProps}
										/>
									)} */}
								</Container>
							</Container>
						)
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

const NewRecruitListing = (props) => {
	const [formData, setFormData] = useState({
		Job_Description_Offered: '',
		Tentative_No_of_Vacancies: 0,
		No_of_Rounds: 0,
		Job_Description: '',
		Job_Location_Code: '',
		Job_Location_Name: '',
		Aptitude_Test: false,
		Group_Discussion: false,
		HR_Interview: false,
		Online_Test: false,
		Personal_Interview: false,
		Shortlist_from_Resumes: false,
		Technical_Interview: false,
		Technical_Test: false,
		Remarks: '',
		Job_Title: '',
	})
	const history = useHistory()
	const [selectedProfileId, setSelectedProfileId] = useState('')
	const accessToken = props.parentProps.companyCredentials.accessToken
	const config = { headers: { Authorization: `BEARER ${accessToken}` } }
	const [registrationInProgress, setRegistrationInProgress] = useState(false)
	const [Department, setDepartment] = useState([])
	const [SalaryDetails, setSalaryDetails] = useState([])
	const [placement, setPlacement] = useState()
	const [selectedFile, setSelectedFile] = useState(null)

	const handleChange = (event) => {
		if (event.target.value === 'checkboxBOOL') formData[event.target.id] = event.target.checked
		else formData[event.target.id] = event.target.value
		setFormData({ ...formData })
	}

	const handleChangeFile = (event) => {
		event.preventDefault()
		if (event.target.files.length === 0) {
			setSelectedFile(null)
			return
		}
		const file = event.target.files[0]
		if (file.size > 5500000) {
			props.newSnack('Please select file smaller than 5MB size', 'warning')
		} else {
			//console.log(file)
			setSelectedFile(file)
		}
	}

	const handleRegister = async () => {
		for (var attr in formData) {
			if (formData[attr] === '') {
				console.log(formData, attr)
				props.newSnack('All fields are mandatory', 'error')
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
		const fileData = new FormData()
		fileData.append('file', selectedFile)
		fileData.append('listing', JSON.stringify(formData))
		if (!formData.Remarks) {
			props.newSnack('Remarks is mandatory', 'error')
			return
		}
		if (!formData.Job_Description_Offered) {
			props.newSnack('Job Description required is mandatory', 'error')
			return
		}
		if (!formData.Job_Description) {
			props.newSnack('Skillset required is mandatory', 'error')
			return
		}
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
		//console.log(formData)
		const res = await Axios.post(companyCreateNewListing, fileData, config)
			.then((data) => data.data)
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		setRegistrationInProgress(false)
		if (res.success) setTimeout(() => history.push('/login/company/portal/managelisitngs'), 0)
		props.newSnack(res.message, res.success ? 'info' : 'error')
		if (res.success === true) {
			props.updateData()
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
		Axios.post(companyIsItPlacement, { id: selectedProfileId }, config)
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
	}, [selectedProfileId])

	React.useEffect(() => {
		setDepartment([])
		setSalaryDetails([])
		// eslint-disable-next-line
	}, [placement])

	return (
		<Fade in>
			<div>
				<Paper elevation={3} style={{ marginBottom: 30, marginTop: 30 }}>
					<Grid
						container
						style={{
							padding: 30,
							display: 'flex',
							justifyContent: 'space-between',
							alignItems: 'center',
						}}
					>
						<Grid item>
							<Typography variant="h4">Create new Listing</Typography>
							<Typography style={{ color: 'red' }}>All fields are mandatory.</Typography>
						</Grid>
						<Grid item>{/* <PopupHelper content="Help Content" /> */}</Grid>
					</Grid>

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
						/>
						<TextField id="Job_Title" label="Job Title" {...TextFieldProps} value={formData.Job_Title} />
						<TextField
							id="Job_Description_Offered"
							multiline
							label="Job Description"
							{...TextFieldProps}
							value={formData.Job_Description_Offered}
						/>
						<div style={{ width: '100%' }}>
							<input
								style={{ display: 'none' }}
								onChange={handleChangeFile}
								id="JDpdf"
								accept=".pdf"
								type="file"
							/>
							<label htmlFor="JDpdf" style={{ width: '100%' }}>
								<Button variant="outlined" color="primary" component="span" fullWidth>
									{selectedFile ? "Selected '" + selectedFile.name + "'" : 'Upload Job Description'}
								</Button>
							</label>
						</div>
						<TextField
							id="Job_Description"
							multiline
							label="Required Skill Set"
							{...TextFieldProps}
							value={formData.Job_Description}
						/>
						<TextField
							id="Tentative_No_of_Vacancies"
							type="number"
							label="Tentative No. of Vacancies"
							{...TextFieldProps}
							value={formData.Tentative_No_of_Vacancies}
						/>
						<TextField
							id="No_of_Rounds"
							type="number"
							label="No. of Rounds"
							{...TextFieldProps}
							value={formData.No_of_Rounds}
						/>
						<Container>
							<Typography variant="button" children="Select applicable" />
						</Container>
						<FormControl disabled={selectedProfileId === ''}>
							<Container style={{ display: 'flex', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Aptitude_Test" />}
									label="Aptitude Test"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Group_Discussion" />}
									label="Group Discussion"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="HR_Interview" />}
									label="HR Interview"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Online_Test" />}
									label="Online Test"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Personal_Interview" />}
									label="Personal Interview"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Shortlist_from_Resumes" />}
									label="Shortlist from Resumes"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Technical_Interview" />}
									label="Technical Interview"
									labelPlacement="end"
								/>
								<FormControlLabel
									value="checkboxBOOL"
									control={<Checkbox onChange={handleChange} id="Technical_Test" />}
									label="Technical Test"
									labelPlacement="end"
								/>
							</Container>
						</FormControl>
						<TextField
							id="Job_Location_Code"
							label="Pincode"
							{...TextFieldProps}
							value={formData.Job_Location_Code}
						/>
						<TextField
							id="Job_Location_Name"
							label="Job Location"
							{...TextFieldProps}
							value={formData.Job_Location_Name}
						/>
						<TextField
							id="Joining"
							label="Tentative Date of Joining"
							placeholder="yyyy-mm-dd"
							type="date"
							inputProps={{ pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ }}
							InputLabelProps={{ shrink: true }}
							{...TextFieldProps}
							value={formData.Joining}
						/>
						<CurrentDegreeSelector
							Department={Department}
							setSalaryDetails={setSalaryDetails}
							setDepartment={setDepartment}
							newSnack={props.newSnack}
							placement={placement}
							accessToken={accessToken}
							updateData={props.updateData}
						/>
						<SetSalaryDetails
							Department={Department}
							eligibilityLookupTable={props.parentProps.eligibilityLookupTableData}
							newSnack={props.newSnack}
							SalaryDetails={SalaryDetails}
							placement={placement}
							updated={props.updated}
							setSalaryDetails={setSalaryDetails}
						/>
						<TextField id="Remarks" label="Remarks" {...TextFieldProps} value={formData.Remarks} />
					</form>
					<div style={{ padding: 15 }} />
				</Paper>
				<Paper
					style={{
						padding: 30,
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Button
						fullWidth
						disabled={registrationInProgress}
						style={{ maxWidth: 200, minHeight: 50 }}
						color="primary"
						variant="contained"
						onClick={handleRegister}
					>
						{!registrationInProgress ? 'Create' : <CircularProgress />}
					</Button>
				</Paper>
			</div>
		</Fade>
	)
}

export default NewRecruitListing
