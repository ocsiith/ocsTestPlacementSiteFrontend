import React, { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'

import Fade from '@material-ui/core/Fade'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

import Axios from 'axios'
import cloneDeep from 'clone-deep'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import { companyRegsiterAddress } from '../../constants/addresses'
import { reCaptchaClientKey } from '../../constants/keys'
import ReCAPTCHA from 'react-google-recaptcha'

const AccoutForm = (props) => {
	const reCaptchaRef = React.createRef()
	const history = useHistory()
	const [sameAsCorrespondence, setSameAsCorrespondence] = useState(false)

	const handleSubmit = async (values, { setSubmitting }) => {
		let formData = cloneDeep(values)
		if (sameAsCorrespondence) {
			formData = {
				...formData,
				Employer_Permanent_Address_Line1: formData.Employer_Correspondence_Address_Line1,
				Employer_Permanent_Address_Line2: formData.Employer_Correspondence_Address_Line2,
				PinCode_Permanent: formData.PinCode_Correspondence,
				Country_Permanent: formData.Country_Correspondence,
				State_Permanent: formData.State_Correspondence,
			}
		}
		setSubmitting(true)
		const { data } = await Axios.post(companyRegsiterAddress, formData).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		reCaptchaRef.current.reset()
		setSubmitting(false)
		props.newSnack(data.message)
		if (data.success) {
			props.newSnack(data.message, 'info')
			history.push('/login')
		}
	}

	return (
		<Fade in>
			<div>
				<Paper elevation={3} style={{ marginBottom: 30, marginTop: 30, padding: 28 }}>
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
							<Typography variant="h4">Create new Account</Typography>
							<Typography style={{ color: 'red' }}>All fields are mandatory.</Typography>
						</Grid>
					</Grid>
					<Formik
						initialValues={{
							Employer_Contact: '',
							Employer_Correspondence_Address_Line1: '',
							Employer_Correspondence_Address_Line2: '',
							PinCode_Correspondence: '',
							Country_Correspondence: '',
							State_Correspondence: '',
							Employer_Permanent_Address_Line1: '',
							Employer_Permanent_Address_Line2: '',
							PinCode_Permanent: '',
							Country_Permanent: '',
							State_Permanent: '',
							Employer_Registration_Contacts_Contact_Person: '',
							Employer_Registration_Contacts_Designation: '',
							Employer_Contact_Phone: '',
							Employer_Contact_Mobile: '',
							Employer_Contact_Email: '',
							Employer_Contact_Email_confirm: '',
							Password_new: '',
							Password_new_confirm: '',
							token: '',
						}}
						validate={(values) => {
							const errors = {}
							if (!values.Employer_Contact) {
								errors.Employer_Contact = 'Required'
							}
							if (values.Employer_Contact) {
								const re = /^\+{0,1}[0-9]{10,14}$/
								if (values.Employer_Contact.length < 10 || !re.test(values.Employer_Contact)) {
									errors.Employer_Contact = 'Must be a valid number'
								}
								if (values.Employer_Contact.length > 15) {
									errors.Employer_Contact = 'Must be less than 15 characters'
								}
							}

							if (!values.Employer_Correspondence_Address_Line1) {
								errors.Employer_Correspondence_Address_Line1 = 'Required'
							}
							if (values.Employer_Correspondence_Address_Line1.length > Math.pow(2, 16)) {
								errors.Employer_Correspondence_Address_Line1 = 'Must be less than 65536 characters'
							}

							if (!values.Employer_Correspondence_Address_Line2) {
								errors.Employer_Correspondence_Address_Line2 = 'Required'
							}
							if (values.Employer_Correspondence_Address_Line2.length > Math.pow(2, 16)) {
								errors.Employer_Correspondence_Address_Line2 = 'Must be less than 65536 characters'
							}

							if (!values.PinCode_Correspondence) {
								errors.PinCode_Correspondence = 'Required'
							}
							if (values.PinCode_Correspondence > 16777215) {
								errors.PinCode_Correspondence = 'Must be less than 16777216'
							}
							if (values.PinCode_Correspondence < 0) {
								errors.PinCode_Correspondence = 'Must be greater than 0'
							}

							if (!values.Country_Correspondence) {
								errors.Country_Correspondence = 'Required'
							}
							if (values.Country_Correspondence.length > 75) {
								errors.Country_Correspondence = 'Must be less than 75 characters'
							}

							if (!values.State_Correspondence) {
								errors.State_Correspondence = 'Required'
							}
							if (values.State_Correspondence.length > 85) {
								errors.State_Correspondence = 'Must be less than 85 characters'
							}

							if (!sameAsCorrespondence) {
								if (!values.Employer_Permanent_Address_Line1) {
									errors.Employer_Permanent_Address_Line1 = 'Required'
								}
								if (values.Employer_Permanent_Address_Line1.length > Math.pow(2, 16)) {
									errors.Employer_Permanent_Address_Line1 = 'Must be less than 65536 characters'
								}

								if (!values.Employer_Permanent_Address_Line2) {
									errors.Employer_Permanent_Address_Line2 = 'Required'
								}
								if (values.Employer_Permanent_Address_Line2.length > Math.pow(2, 16)) {
									errors.Employer_Permanent_Address_Line2 = 'Must be less than 65536 characters'
								}

								if (!values.PinCode_Permanent) {
									errors.PinCode_Permanent = 'Required'
								}
								if (values.PinCode_Permanent > 16777215) {
									errors.PinCode_Permanent = 'Must be less than 16777216'
								}
								if (values.PinCode_Permanent < 0) {
									errors.PinCode_Permanent = 'Must be greater than 0'
								}

								if (!values.Country_Permanent) {
									errors.Country_Permanent = 'Required'
								}
								if (values.Country_Permanent.length > 75) {
									errors.Country_Permanent = 'Must be less than 75 characters'
								}

								if (!values.State_Permanent) {
									errors.State_Permanent = 'Required'
								}
								if (values.State_Permanent.length > 85) {
									errors.State_Permanent = 'Must be less than 85 characters'
								}
							}

							if (!values.Employer_Registration_Contacts_Contact_Person) {
								errors.Employer_Registration_Contacts_Contact_Person = 'Required'
							}
							if (values.Employer_Registration_Contacts_Contact_Person.length > Math.pow(2, 8)) {
								errors.Employer_Registration_Contacts_Contact_Person = `Must be less than ${Math.pow(
									2,
									8
								)} characters`
							}

							if (!values.Employer_Registration_Contacts_Designation) {
								errors.Employer_Registration_Contacts_Designation = 'Required'
							}
							if (values.Employer_Registration_Contacts_Designation.length > Math.pow(2, 8)) {
								errors.Employer_Registration_Contacts_Designation = `Must be less than ${Math.pow(
									2,
									8
								)} characters`
							}

							if (!values.Employer_Contact_Phone || !values.Employer_Contact_Mobile) {
								if (!values.Employer_Contact_Phone) errors.Employer_Contact_Phone = 'Required'
								if (!values.Employer_Contact_Mobile) errors.Employer_Contact_Mobile = 'Required'
							}
							if (values.Employer_Contact_Phone) {
								if (values.Employer_Contact_Phone.length > 15) {
									errors.Employer_Contact_Phone = 'Must be less than 15 characters'
								}
							}
							if (values.Employer_Contact_Mobile) {
								if (values.Employer_Contact_Mobile.length > 15) {
									errors.Employer_Contact_Mobile = 'Must be less than 15 characters'
								}
							}

							if (!values.Employer_Contact_Email) {
								errors.Employer_Contact_Email = 'Required'
							}
							if (values.Employer_Contact_Email.length > Math.pow(2, 8)) {
								errors.Employer_Contact_Email = `Must be less than ${Math.pow(2, 8)} characters`
							}
							if (values.Employer_Contact_Email !== values.Employer_Contact_Email_confirm) {
								errors.Employer_Contact_Email_confirm = 'Not matching'
							}

							if (!/\S+@\S+\.\S+/.test(values.Employer_Contact_Email)) {
								errors.Employer_Contact_Email = 'Enter a valid email'
							}

							if (!values.Password_new) {
								errors.Password_new = 'Required'
							}
							if (values.Password_new.length > Math.pow(2, 16)) {
								errors.Password_new = 'Must be less than 65536 characters'
							}
							if (values.Password_new.length < 8) {
								errors.Password_new = 'Minimum 8 characters'
							}

							if (!values.Password_new_confirm) {
								errors.Password_new_confirm = 'Required'
							}
							if (values.Password_new !== values.Password_new_confirm) {
								errors.Password_new_confirm = 'Not matching'
							}
							return errors
						}}
						onSubmit={handleSubmit}
					>
						{({ submitForm, isSubmitting, values, setValues, errors, setErrors }) => (
							<Form style={{ display: 'flex', flexDirection: 'column' }}>
								<Paper elevation={0} style={{ padding: 16, margin: 16, border: '1px solid grey' }}>
									<Grid
										container
										style={{
											padding: 16,
											display: 'flex',
											justifyContent: 'left',
											alignItems: 'center',
										}}
									>
										<Grid item>
											<Typography variant="h6">Credentials</Typography>
										</Grid>
									</Grid>
									<style>
										{`#no-copy{user-select:none}#no-copy::selection{background:none}#no-copy::-moz-selection{background:none}`}
										{`#no-copy2{user-select:none}#no-copy2::selection{background:none}#no-copy2::-moz-selection{background:none}`}
									</style>
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										helperText="You will need to verify it for account creation"
										name="Employer_Contact_Email"
										autoComplete="email"
										type="text"
										label="Email"
										fullWidth
										id="no-copy"
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact_Email_confirm"
										autoComplete="email"
										type="text"
										label="Confirm Email"
										id="no-copy2"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Password_new"
										autoComplete="new-password"
										type="password"
										label="Password"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Password_new_confirm"
										autoComplete="new-password"
										type="password"
										label="Confirm Password"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact"
										type="text"
										label="Office Contact"
										fullWidth
									/>
								</Paper>
								<div style={{ padding: 10 }} />
								<div>
									<Paper elevation={0} style={{ padding: 16, margin: 16, border: '1px solid grey' }}>
										<Grid
											container
											style={{
												padding: 16,
												display: 'flex',
												justifyContent: 'left',
												alignItems: 'center',
											}}
										>
											<Grid item>
												<Typography variant="h6">Correspondence Address</Typography>
											</Grid>
										</Grid>
										<Field
											component={TextField}
											variant="outlined"
											size="small"
											name="Employer_Correspondence_Address_Line1"
											type="text"
											label="Address line 1"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant="outlined"
											size="small"
											name="Employer_Correspondence_Address_Line2"
											type="text"
											label="Address line 2"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant="outlined"
											size="small"
											name="PinCode_Correspondence"
											type="number"
											label="Pincode"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant="outlined"
											size="small"
											name="State_Correspondence"
											type="text"
											label="State"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant="outlined"
											size="small"
											name="Country_Correspondence"
											type="text"
											label="Country"
											fullWidth
										/>
									</Paper>
									<div style={{ padding: 10 }} />
									<Paper elevation={0} style={{ padding: 16, margin: 16, border: '1px solid grey' }}>
										<Grid
											container
											style={{
												padding: 16,
												display: 'flex',
												justifyContent: 'space-between',
												alignItems: 'center',
											}}
										>
											<Grid item>
												<Typography variant="h6">Permanent Address</Typography>
											</Grid>
											<Grid item>
												<FormControlLabel
													control={
														<Switch
															checked={sameAsCorrespondence}
															onChange={(e) => {
																setValues(
																	{
																		...values,
																		Employer_Permanent_Address_Line1: '',
																		Employer_Permanent_Address_Line2: '',
																		PinCode_Permanent: '',
																		Country_Permanent: '',
																		State_Permanent: '',
																	},
																	false
																)
																setErrors({
																	...errors,
																	Employer_Permanent_Address_Line1: '',
																	Employer_Permanent_Address_Line2: '',
																	PinCode_Permanent: '',
																	Country_Permanent: '',
																	State_Permanent: '',
																})
																setSameAsCorrespondence(e.target.checked)
															}}
															name="SameAsCorrespondence"
															color="primary"
														/>
													}
													label="Same as Correspondence"
												/>
											</Grid>
										</Grid>
										<Field
											component={TextField}
											variant={sameAsCorrespondence ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence}
											size="small"
											name="Employer_Permanent_Address_Line1"
											type="text"
											label="Permanent Address Line 1"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence}
											size="small"
											name="Employer_Permanent_Address_Line2"
											type="text"
											label="Permanent Address Line 2"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence}
											size="small"
											name="PinCode_Permanent"
											type="number"
											label="Pincode"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence}
											size="small"
											name="State_Permanent"
											type="text"
											label="State"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence}
											size="small"
											name="Country_Permanent"
											type="text"
											label="Country"
											fullWidth
										/>
									</Paper>
								</div>
								<div style={{ padding: 10 }} />
								<Paper elevation={0} style={{ padding: 16, margin: 16, border: '1px solid grey' }}>
									<Grid
										container
										style={{
											padding: 16,
											display: 'flex',
											justifyContent: 'left',
											alignItems: 'center',
										}}
									>
										<Grid item>
											<Typography variant="h6">Point of contact details</Typography>
										</Grid>
									</Grid>
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Registration_Contacts_Contact_Person"
										type="text"
										label="Name"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Registration_Contacts_Designation"
										type="text"
										label="Designation"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact_Phone"
										type="text"
										label="Phone"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact_Mobile"
										type="text"
										label="Mobile"
										fullWidth
									/>
								</Paper>
								<div style={{ padding: 10 }} />
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<ReCAPTCHA
										ref={reCaptchaRef}
										size="normal"
										sitekey={reCaptchaClientKey}
										onChange={(token) => setValues({ ...values, token })}
									/>
								</div>
								<div style={{ padding: 10 }} />
								<Button
									fullWidth
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
								>
									{isSubmitting ? <CircularProgress /> : 'Submit'}
								</Button>
								<div style={{ padding: 10 }} />
								<Typography align="center" style={{ margin: 'auto' }}>
									By clicking on submit, you agree with the Recruiters'{' '}
									<Link to="/whyrecruit/recruiterspolicy/placements" style={{ color: 'blue' }}>
										Placement
									</Link>{' '}
									and{' '}
									<Link to="/whyrecruit/recruiterspolicy/internships" style={{ color: 'blue' }}>
										Internship
									</Link>{' '}
									policies and would abide by it.
								</Typography>
							</Form>
						)}
					</Formik>
				</Paper>
			</div>
		</Fade>
	)
}

export default AccoutForm
