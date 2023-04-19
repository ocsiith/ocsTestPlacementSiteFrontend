import React, { useState } from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import ReCAPTCHA from 'react-google-recaptcha'

//constants
import { companyRegsiterAddress } from '../../constants/addresses'
import { reCaptchaClientKey } from '../../constants/keys'
import { formFields } from '../../constants/companyRegisterFormFields'
import BackgroundChanger from '../../components/backgroundChanger'
//Mui dependencies
import FormControl from '@material-ui/core/FormControl'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import HelpIcon from '@material-ui/icons/HelpOutline'
import Popover from '@material-ui/core/Popover'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Fade from '@material-ui/core/Fade'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
	textBox: {
		margin: theme.spacing(1),
	},
	formDiv: {
		paddingLeft: 30,
		paddingRight: 30,
		paddingBottom: 8,
		paddingTop: 7,
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	formMain: {
		backgroundColor: '#FAFAFA',
		padding: 0,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'column',
	},
}))

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

const TextBox = (props) => {
	const classes = useStyles()
	return (
		<FormControl style={{ backgroundColor: props.backgroundColor }} fullWidth spacing={1}>
			<Typography></Typography>
			<TextField
				disabled={props.disabled === undefined ? false : props.disabled}
				value={props.value === undefined ? '' : props.value}
				variant={props.variant}
				autoComplete="new-password"
				required={props.required}
				label={props.label}
				placeholder={props.placeholder}
				type={props.type}
				error={props.error}
				id={props.id}
				helperText={props.error ? props.errorText : ''}
				className={classes.textBox}
				onChange={props.onChange}
				InputLabelProps={props.type === 'date' ? { shrink: true } : {}}
			/>
		</FormControl>
	)
}

const CompanyRegister = (props) => {
	const history = useHistory()

	const reCaptchaRef = React.createRef()

	const [correspondenceAddressSame, setCorrespondenceAddressSame] = useState(true) //default Corr, Perm Add same
	const [invaildField, setInvalidField] = useState([])
	const [errorInfo, setErrorInfo] = useState('')
	const [serverErrorInfo, setServerErrorInfo] = useState('')
	const [registrationInProgress, setRegistrationInProgress] = useState(false)

	const [formData, setFormData] = useState({
		Name_of_the_company: '',
		Establishment_Date: '',
		Type_of_Organization: '',
		Nature_of_Business: '',
		Employer_Permanent_Address_Line1: '',
		Employer_Permanent_Address_Line2: '',
		PinCode_Permanent: '',
		Country_Permanent: '',
		State_Permanent: '',
		Employer_Contact: '',
		Website: '',
		Employer_Registration_Contacts_Contact_Person: '',
		Employer_Registration_Contacts_Designation: '',
		Employer_Correspondence_Address_Line1: '',
		Employer_Correspondence_Address_Line2: '',
		PinCode_Correspondence: '',
		Country_Correspondence: '',
		State_Correspondence: '',
		Employer_Contact_Phone: '',
		Employer_Contact_Mobile: '',
		Employer_Contact_Email: '',
		Password_new: '',
		Password_new_confirm: '',
		placement: true,
	})
	/*const [formData, setFormData] = useState({
		Name_of_the_company: 'none',
		Establishment_Date: '2000-01-01',
		Type_of_Organization: 'none',
		Nature_of_Business: 'none',
		Employer_Permanent_Address_Line1: 'none',
		Employer_Permanent_Address_Line2: 'none',
		PinCode_Permanent: '500000',
		Country_Permanent: 'none',
		State_Permanent: 'none',
		Employer_Contact: 'none',
		Website: 'none.c',
		Employer_Registration_Contacts_Contact_Person: 'none',
		Employer_Registration_Contacts_Designation: 'none',
		Employer_Correspondence_Address_Line1: 'none',
		Employer_Correspondence_Address_Line2: 'none',
		PinCode_Correspondence: '500000',
		Country_Correspondence: 'none',
		State_Correspondence: 'none',
		Employer_Contact_Phone: '9999',
		Employer_Contact_Mobile: '9999',
		Employer_Contact_Email: '99@g.c',
		Password_new: '99999999',
		Password_new_confirm: '99999999',
		placement: true,
	})*/
	const handleChangesInForm = (event) => {
		const formData2 = Object.assign({}, formData)

		if (event !== undefined) formData2[event.target.id] = event.target.value
		if (correspondenceAddressSame) {
			formData2['Employer_Correspondence_Address_Line1'] = formData2['Employer_Permanent_Address_Line1']
			formData2['Employer_Correspondence_Address_Line2'] = formData2['Employer_Permanent_Address_Line2']
			formData2['PinCode_Correspondence'] = formData2['PinCode_Permanent']
			formData2['Country_Correspondence'] = formData2['Country_Permanent']
			formData2['State_Correspondence'] = formData2['State_Permanent']
		}
		setFormData(formData2)
	}

	const handleChangesInForm2 = (event) => {
		const formData2 = Object.assign({}, formData)

		if (event !== undefined) formData2[event.target.name] = event.target.value
		setFormData(formData2)
	}

	const addDataToFormData = (item, itemProperty) => {
		const formData2 = Object.assign({}, formData)
		formData2[itemProperty] = item
		setFormData(formData2)
	}

	const correspondenceAddressSameSwitch = () => {
		const formData2 = Object.assign({}, formData)
		handleChangesInForm()
		setCorrespondenceAddressSame(!correspondenceAddressSame)
		formData2['Employer_Correspondence_Address_Line1'] = formData2['Employer_Permanent_Address_Line1']
		formData2['Employer_Correspondence_Address_Line2'] = formData2['Employer_Permanent_Address_Line2']
		formData2['PinCode_Correspondence'] = formData2['PinCode_Permanent']
		formData2['Country_Correspondence'] = formData2['Country_Permanent']
		formData2['State_Correspondence'] = formData2['State_Permanent']
		setFormData(formData2)
	}

	const handleRegister = async () => {
		const reset = reCaptchaRef.current
		if (validateForm()) {
			setRegistrationInProgress(true)
			const res = await Axios.post(companyRegsiterAddress, formData).catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
			if (!res.data.success) {
				reset.reset()
			}
			setRegistrationInProgress(false)
			setServerErrorInfo(res.data.message)
			if (res.data.success) {
				props.newSnack(res.data.message, 'info')
				history.push('/login')
			}
		} else {
			props.newSnack('Invalid Form', 'error')
			reCaptchaRef.current.reset()
		}
	}

	function validateForm() {
		setErrorInfo('')
		var invaildField2 = []

		function validateEmail(email) {
			var re = /\S+@\S+\.\S+/
			return re.test(email)
		}

		function validateWebsite(address) {
			var re = /\S+\.+\S+/
			return re.test(address)
		}

		formFields.CompanyInformation.map((field) => {
			if (formData[field.id] === undefined || formData[field.id] === '') {
				invaildField2.push(field.id)
			}
			return 0
		})
		formFields.LoginCredentials.map((field) => {
			if (formData[field.id] === undefined || formData[field.id] === '') {
				invaildField2.push(field.id)
			}
			return 0
		})
		formFields.FirstPointOfContact.map((field) => {
			if (formData[field.id] === undefined || formData[field.id] === '') {
				invaildField2.push(field.id)
			}
			return 0
		})
		formFields.CompanyCorrespondenceAddress.map((field) => {
			if (formData[field.id] === undefined || formData[field.id] === '') {
				invaildField2.push(field.id)
			}
			return 0
		})
		formFields.CompanyPermanentAddress.map((field) => {
			if (formData[field.id] === undefined || formData[field.id] === '') {
				invaildField2.push(field.id)
			}
			return 0
		})
		if (formData.Password_new === undefined ? true : formData.Password_new.length < 8) {
			invaildField2.push('Password_new')
			invaildField2.push('Password_new_confirm')
		} else if (!(formData.Password_new === formData.Password_new_confirm)) {
			invaildField2.push('Password_new')
			invaildField2.push('Password_new_confirm')
		}
		if (!validateEmail(formData.Employer_Contact_Email)) {
			invaildField2.push('Employer_Contact_Email')
		}
		if (!validateWebsite(formData.Website)) {
			invaildField2.push('Website')
		}
		setInvalidField(invaildField2)
		if (invaildField2.length !== 0) {
			setErrorInfo('Some error occured')
			return false
		} else return true
	}

	const classes = useStyles()
	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<Paper elevation={0} className={classes.formMain}>
					<Typography variant="h4">Company Register</Typography>
					<Typography style={{ color: 'red', margin: 10 }}>* are required fields</Typography>
					<form style={{ width: '100%' }}>
						<Paper elevation={3} style={{ marginBottom: 30, width: '100%' }}>
							<Grid
								container
								style={{
									padding: 30,
									display: 'flex',
									justifyContent: 'left',
									alignItems: 'center',
								}}
							>
								<Grid item>
									<Typography variant="h6">Login Credentials</Typography>
								</Grid>
								<Grid item>
									<PopupHelper content="Help Content" />
								</Grid>
							</Grid>

							{formFields.LoginCredentials.map((field) => (
								<div key={field.id} className={classes.formDiv}>
									<TextBox
										variant="outlined"
										value={formData[field.id]}
										required={field.required}
										error={invaildField.includes(field.id)}
										style={field.style}
										type={field.type}
										id={field.id}
										label={field.label}
										errorText={field.errorText}
										helpContent={field.helpContent}
										onChange={handleChangesInForm}
									/>
								</div>
							))}
							<div style={{ padding: 15 }} />
						</Paper>
						<Paper elevation={3} style={{ marginBottom: 30 }}>
							<Grid
								container
								style={{
									padding: 30,
									display: 'flex',
									justifyContent: 'left',
									alignItems: 'center',
								}}
							>
								<Grid item>
									<Typography variant="h6">Company Information</Typography>
								</Grid>
								<Grid item>
									<PopupHelper content="Help Content" />
								</Grid>
							</Grid>

							{formFields.CompanyInformation.map((field) => (
								<div key={field.id} className={classes.formDiv}>
									<TextBox
										variant="outlined"
										value={formData[field.id]}
										defaultValue={field.defaultValue}
										required={field.required}
										error={invaildField.includes(field.id)}
										style={field.style}
										placeholder={field.placeholder}
										type={field.type}
										id={field.id}
										label={field.label}
										errorText={field.errorText}
										helpContent={field.helpContent}
										onChange={handleChangesInForm}
									/>
								</div>
							))}
							<div className={classes.formDiv}>
								<FormControl variant="outlined" fullWidth>
									<InputLabel id="demo-simple-select-outlined-label2">
										Internship or Placement
									</InputLabel>
									<Select
										labelId="demo-simple-select-outlined-label2"
										value={formData.placement}
										onChange={handleChangesInForm2}
										label="Internship or Placement"
										name="placement"
									>
										<MenuItem value={false}>Internship</MenuItem>
										<MenuItem value={true}>Placement</MenuItem>
									</Select>
								</FormControl>
							</div>
							<div style={{ padding: 15 }} />
							<hr />
							<Grid
								container
								style={{
									padding: 30,
									display: 'flex',
									justifyContent: 'left',
									alignItems: 'center',
								}}
							>
								<Grid item>
									<Typography variant="subtitle1">Permanent Address</Typography>
								</Grid>
								<Grid item>
									<PopupHelper content="Help Content" />
								</Grid>
							</Grid>

							{formFields.CompanyPermanentAddress.map((field) => (
								<div key={field.id} className={classes.formDiv}>
									<TextBox
										variant="outlined"
										value={formData[field.id]}
										defaultValue={field.defaultValue}
										required={field.required}
										error={invaildField.includes(field.id)}
										style={field.style}
										type={field.type}
										id={field.id}
										label={field.label}
										errorText={field.errorText}
										helpContent={field.helpContent}
										onChange={handleChangesInForm}
									/>
								</div>
							))}
							<div style={{ padding: 15 }} />
							<hr />
							<Grid
								container
								style={{
									padding: 30,
									display: 'flex',
									justifyContent: 'left',
									alignItems: 'center',
								}}
							>
								<Grid item>
									<Typography variant="subtitle1">Correspondence Address</Typography>
								</Grid>
								<Grid item>
									<PopupHelper content="Help Content" />
								</Grid>
								<Typography style={{ flexGrow: 1 }} />
								<Grid item>
									<FormControlLabel
										control={
											<Switch
												checked={correspondenceAddressSame}
												onChange={correspondenceAddressSameSwitch}
												color="primary"
											/>
										}
										label="Same as Permanent Address"
									/>
								</Grid>
							</Grid>

							{formFields.CompanyCorrespondenceAddress.map((field) => (
								<div key={field.id} className={classes.formDiv}>
									<TextBox
										variant={correspondenceAddressSame ? 'filled' : 'outlined'}
										value={formData[field.id]}
										disabled={correspondenceAddressSame}
										defaultValue={field.defaultValue}
										required={field.required}
										error={invaildField.includes(field.id)}
										style={field.style}
										type={field.type}
										id={field.id}
										label={field.label}
										errorText={field.errorText}
										helpContent={field.helpContent}
										onChange={handleChangesInForm}
									/>
								</div>
							))}
							<div style={{ padding: 15 }} />
						</Paper>
						<Paper elevation={3} style={{ marginBottom: 30 }}>
							<Grid
								container
								style={{
									padding: 30,
									display: 'flex',
									justifyContent: 'left',
									alignItems: 'center',
								}}
							>
								<Grid item>
									<Typography variant="h6">First Point of Contact</Typography>
								</Grid>
								<Grid item>
									<PopupHelper content="Help Content" />
								</Grid>
							</Grid>

							{formFields.FirstPointOfContact.map((field) => (
								<div key={field.id} className={classes.formDiv}>
									<TextBox
										variant="outlined"
										value={formData[field.id]}
										defaultValue={field.defaultValue}
										required={field.required}
										error={invaildField.includes(field.id)}
										style={field.style}
										type={field.type}
										id={field.id}
										label={field.label}
										errorText={field.errorText}
										helpContent={field.helpContent}
										onChange={handleChangesInForm}
									/>
								</div>
							))}
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
							<div style={{ padding: 5 }}>
								<ReCAPTCHA
									ref={reCaptchaRef}
									size="normal"
									sitekey={reCaptchaClientKey}
									onChange={(token) => {
										addDataToFormData(token, 'token')
									}}
								/>
							</div>
							<Typography>{errorInfo}</Typography>
							<Typography>{serverErrorInfo}</Typography>
							<Button
								fullWidth
								disabled={registrationInProgress}
								style={{ maxWidth: 200 }}
								color="primary"
								variant="contained"
								onClick={handleRegister}
							>
								{!registrationInProgress ? 'Register' : <CircularProgress />}
							</Button>
						</Paper>
					</form>
				</Paper>
			</Container>
		</Fade>
	)
}

export default CompanyRegister
