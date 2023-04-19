import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import Paper from '@material-ui/core/Paper'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'

import {
	companyCreateNewProfile,
	companyAllProfiles,
	companyEditProfiles,
	companyRemoveProfile,
	placementEditProfiles,
	placementRemoveProfile,
} from '../../constants/addresses'
import Axios from 'axios'
import cloneDeep from 'clone-deep'
import MaterialTable from 'material-table'
import tableIcons from '../../constants/tableIcons'

export const EditProfiles = (props) => {
	console.log(props)
	const data = props.data
	const config = props.config
	const history = useHistory()
	const [sameAsCorrespondence, setSameAsCorrespondence] = useState(false)
	const [sameAsPrevious, setSameAsPrevious] = useState(false)

	const handleDelete = async () => {
		const isConfirmed = window.confirm('Are you sure?')
		if (!isConfirmed) return
		const { data } = await Axios.post(placementRemoveProfile, { id: props.data.profile_id }, config).catch(
			(error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			}
		)
		props.newSnack(data.message)
		if (data.success) {
			props.updateData()
			setTimeout(() => {
				history.push('/topsecreturlforplacementstaff/portal/allcompanies')
			}, 0)
			props.onClose()
		}
	}

	return (
		<div>
			<Paper elevation={0} style={{ marginBottom: 30 }}>
				<Formik
					initialValues={cloneDeep(data)}
					validate={(values) => {
						const errors = {}
						if (!values.Name_of_the_company) {
							errors.Name_of_the_company = 'Required'
						}
						if (values.Name_of_the_company.length > Math.pow(2, 16)) {
							errors.Name_of_the_company = `Must be less than ${Math.pow(2, 16)} characters`
						}

						if (!values.Establishment_Date) {
							errors.Establishment_Date = 'Required'
						}
						if (new Date(values.Establishment_Date).toString() === 'Invalid Date') {
							errors.Establishment_Date = 'Enter a valid date'
						}

						if (!values.Type_of_Organization) {
							errors.Type_of_Organization = 'Required'
						}
						if (values.Type_of_Organization.length > Math.pow(2, 8)) {
							errors.Type_of_Organization = `Must be less than ${Math.pow(2, 8)} characters`
						}

						if (!values.Nature_of_Business) {
							errors.Nature_of_Business = 'Required'
						}
						if (values.Nature_of_Business.length > Math.pow(2, 8)) {
							errors.Nature_of_Business = `Must be less than ${Math.pow(2, 8)} characters`
						}

						if (!values.Website) {
							errors.Website = 'Required'
						}
						if (values.Website.length > Math.pow(2, 8)) {
							errors.Website = `Must be less than ${Math.pow(2, 8)} characters`
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

						if (values.Employer_Contact) {
							if (values.Employer_Contact.length > 15) {
								errors.Employer_Contact = 'Must be less than 15 characters'
							}
						}
						return errors
					}}
					onSubmit={async (values, { setSubmitting }) => {
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
						const { data } = await Axios.post(
							props.address ? placementEditProfiles : companyEditProfiles,
							formData,
							config
						).catch((error) => console.error(error))
						setSubmitting(false)
						props.newSnack(data.message)
						if (data.success) {
							props.updateData()
							props.onClose()
						}
					}}
				>
					{({ submitForm, isSubmitting, values, setValues, setErrors, errors }) => (
						<Form style={{ display: 'flex', flexDirection: 'column' }}>
							{props.address && (
								<div
									style={{
										width: '100%',
										display: 'flex',
										justifyContent: 'flex-end',
										marginBottom: '10px',
									}}
								>
									<Button
										onClick={handleDelete}
										variant="contained"
										color="secondary"
										style={{ background: 'red' }}
									>
										Delete
									</Button>
								</div>
							)}
							<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
										<Typography variant="h4">Company Details</Typography>
									</Grid>
								</Grid>
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Name_of_the_company"
									type="text"
									label="Name of the Company"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Establishment_Date"
									InputLabelProps={{ shrink: true }}
									placeholder="yyyy-mm-dd"
									type="date"
									label="Date of Establishment"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Type_of_Organization"
									type="text"
									label="Type of Organization"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Nature_of_Business"
									type="text"
									label="Nature of Business"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Employer_Contact"
									type="text"
									label="Employer_Contact"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Website"
									type="text"
									label="Website"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<div>
									<FormControl variant="outlined" fullWidth>
										<InputLabel id="demo-simple-select-outlined-label2">
											Internship or Placement
										</InputLabel>
										<Select
											labelId="demo-simple-select-outlined-label2"
											value={values.placement}
											onChange={(e) => setValues({ ...values, placement: e.target.value })}
											label="Internship or Placement"
											name="placement"
										>
											<MenuItem value={'0'}>Internship</MenuItem>
											<MenuItem value={'1'}>Placement</MenuItem>
										</Select>
									</FormControl>
								</div>
							</Paper>
							<div style={{ padding: 10 }} />
							<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
										<Typography variant="h6">Contact Person Details</Typography>
									</Grid>
								</Grid>
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Employer_Registration_Contacts_Contact_Person"
									type="text"
									label="Contact person's name"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Employer_Registration_Contacts_Designation"
									type="text"
									label="Contact person's designation"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Employer_Contact_Phone"
									type="text"
									label="Contact person's phone"
									fullWidth
								/>
								<div style={{ padding: 10 }} />
								<Field
									component={TextField}
									variant="outlined"
									size="small"
									name="Employer_Contact_Mobile"
									type="text"
									label="Contact person's mobile"
									fullWidth
								/>
							</Paper>
							<div style={{ padding: 10 }} />
							<div>
								<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
											<Typography variant="h6">Correspondence Address</Typography>
										</Grid>
										<Grid item>
											<FormControlLabel
												control={
													<Switch
														checked={sameAsPrevious}
														onChange={(e) => {
															setSameAsCorrespondence(false)
															setValues(
																{
																	...values,
																	Employer_Correspondence_Address_Line1:
																		props.fetchedData[
																			'Employer_Correspondence_Address_Line1'
																		],
																	Employer_Correspondence_Address_Line2:
																		props.fetchedData[
																			'Employer_Correspondence_Address_Line2'
																		],
																	PinCode_Correspondence:
																		props.fetchedData['PinCode_Correspondence'],
																	Country_Correspondence:
																		props.fetchedData['Country_Correspondence'],
																	State_Correspondence:
																		props.fetchedData['State_Correspondence'],
																	Employer_Permanent_Address_Line1:
																		props.fetchedData[
																			'Employer_Permanent_Address_Line1'
																		],
																	Employer_Permanent_Address_Line2:
																		props.fetchedData[
																			'Employer_Permanent_Address_Line2'
																		],
																	PinCode_Permanent:
																		props.fetchedData['PinCode_Permanent'],
																	Country_Permanent:
																		props.fetchedData['Country_Permanent'],
																	State_Permanent:
																		props.fetchedData['State_Permanent'],
																},
																false
															)
															setErrors({
																...errors,
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
															})
															setSameAsPrevious(e.target.checked)
														}}
														name="sameAsPrevious"
														color="primary"
													/>
												}
												label="Same as Account"
											/>
										</Grid>
									</Grid>
									<Field
										component={TextField}
										disabled={sameAsPrevious}
										variant={sameAsPrevious ? 'filled' : 'outlined'}
										size="small"
										name="Employer_Correspondence_Address_Line1"
										type="text"
										label="Address line 1"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										disabled={sameAsPrevious}
										variant={sameAsPrevious ? 'filled' : 'outlined'}
										size="small"
										name="Employer_Correspondence_Address_Line2"
										type="text"
										label="Address line 2"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										disabled={sameAsPrevious}
										variant={sameAsPrevious ? 'filled' : 'outlined'}
										size="small"
										name="PinCode_Correspondence"
										type="number"
										label="Pincode"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										disabled={sameAsPrevious}
										variant={sameAsPrevious ? 'filled' : 'outlined'}
										size="small"
										name="State_Correspondence"
										type="text"
										label="State"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										disabled={sameAsPrevious}
										variant={sameAsPrevious ? 'filled' : 'outlined'}
										size="small"
										name="Country_Correspondence"
										type="text"
										label="Country"
										fullWidth
									/>
								</Paper>
								<div style={{ padding: 10 }} />
								<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
												disabled={sameAsPrevious}
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
										variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
										disabled={sameAsCorrespondence || sameAsPrevious}
										size="small"
										name="Employer_Permanent_Address_Line1"
										type="text"
										label="Permanent Address Line 1"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
										disabled={sameAsCorrespondence || sameAsPrevious}
										size="small"
										name="Employer_Permanent_Address_Line2"
										type="text"
										label="Permanent Address Line 2"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
										disabled={sameAsCorrespondence || sameAsPrevious}
										size="small"
										name="PinCode_Permanent"
										type="number"
										label="Pincode"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
										disabled={sameAsCorrespondence || sameAsPrevious}
										size="small"
										name="State_Permanent"
										type="text"
										label="State"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
										disabled={sameAsCorrespondence || sameAsPrevious}
										size="small"
										name="Country_Permanent"
										type="text"
										label="Country"
										fullWidth
									/>
								</Paper>
								<div style={{ padding: 10 }} />
							</div>
							<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
								<Button
									variant="contained"
									color="primary"
									disabled={isSubmitting}
									onClick={submitForm}
								>
									{isSubmitting ? <CircularProgress /> : 'Submit'}
								</Button>
								<Button
									variant="contained"
									color="secondary"
									disabled={isSubmitting}
									onClick={props.onClose}
								>
									{isSubmitting ? <CircularProgress /> : 'Cancel'}
								</Button>
							</div>
						</Form>
					)}
				</Formik>
			</Paper>
		</div>
	)
}

const Profiles = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.parentProps.companyCredentials.accessToken}` } }
	const [profiles, setProfiles] = useState([])
	const [editData, setEditData] = useState({})
	const [sameAsCorrespondence, setSameAsCorrespondence] = useState(false)
	const [editOpen, setEditOpen] = useState(false)
	const [sameAsPrevious, setSameAsPrevious] = useState(false)

	React.useEffect(() => {
		props.setLoading(true)
		Axios.get(companyAllProfiles, config)
			.then(({ data }) => {
				if (data.success) {
					setProfiles(data.message)
				} else {
					//props.newSnack(data.message, 'warning')
				}
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	React.useEffect(() => {
		if (profiles.length) props.setLoading(false)
		// eslint-disable-next-line
	}, [profiles])

	return (
		<Fade in>
			<div>
				<Dialog
					fullWidth
					open={editOpen}
					maxWidth="lg"
					onClose={() => {
						setEditOpen(false)
						setEditData({})
					}}
				>
					<DialogTitle>Edit Profiles</DialogTitle>
					<DialogContent>
						<EditProfiles
							newSnack={props.newSnack}
							data={editData}
							config={config}
							fetchedData={props.fetchedData}
							setLoading={props.setLoading}
							updateData={props.updateData}
							onClose={() => {
								setEditOpen(false)
								setEditData({})
							}}
						/>
					</DialogContent>
				</Dialog>
				<div style={{ marginTop: 30, display: !profiles.length && 'none' }}>
					<MaterialTable
						title="Profiles"
						icons={tableIcons}
						options={{ actionsColumnIndex: -1, search: false }}
						data={profiles}
						columns={[
							{
								title: 'Company',
								field: 'Name_of_the_company',
								render: (rowData) =>
									`${rowData.Name_of_the_company} (${
										rowData.placement ? 'Placement' : 'Internship'
									})`,
							},
							{
								title: 'Website',
								field: 'Website',
							},
							{
								title: 'Student Cood',
								render: (rowData) =>
									rowData.student_co_od_email ? (
										<pre style={{ fontFamily: 'Roboto' }}>
											<div>Name: {rowData.student_co_od_name}</div>
											<div>Email: {rowData.student_co_od_email}</div>
											<div>Contact: {rowData.student_co_od_contact}</div>
										</pre>
									) : (
										<pre>Not assigned yet</pre>
									),
							},
						]}
						actions={[
							{
								icon: EditIcon,
								tooltip: 'Edit',
								onClick: (e, rowData) => {
									console.log(rowData)
									if (!rowData.editable) return props.newSnack('Cannot edit now')
									setEditData(cloneDeep(rowData))
									setEditOpen(true)
								},
							},
							{
								icon: DeleteIcon,
								tooltip: 'Delete',
								onClick: async (e, rowData) => {
									if (!rowData.editable) return props.newSnack('Cannot delete now')
									if (
										!window.confirm(
											'All the listings under this profile will be deleted! Are you sure?'
										)
									)
										return
									const { data } = await Axios.post(
										companyRemoveProfile,
										{ id: rowData.id },
										config
									).catch((error) => {
										console.error(error)
										props.newSnack('Connection error', 'error')
									})
									props.newSnack(data.message, 'warning')
									if (data.success) return props.updateData()
								},
							},
						]}
					/>
				</div>
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
							<Typography variant="h4">Create new Profile</Typography>
							<Typography style={{ color: 'red' }}>All fields are mandatory.</Typography>
						</Grid>
					</Grid>
					<Formik
						initialValues={{
							Name_of_the_company: '',
							Establishment_Date: '',
							Type_of_Organization: '',
							Nature_of_Business: '',
							Employer_Contact: '',
							Website: '',
							Employer_Registration_Contacts_Contact_Person: '',
							Employer_Registration_Contacts_Designation: '',
							Employer_Contact_Phone: '',
							Employer_Contact_Mobile: '',
							placement: '1',

							Employer_Permanent_Address_Line1: '',
							Employer_Permanent_Address_Line2: '',
							PinCode_Permanent: '',
							Country_Permanent: '',
							State_Permanent: '',
							Employer_Correspondence_Address_Line1: '',
							Employer_Correspondence_Address_Line2: '',
							PinCode_Correspondence: '',
							Country_Correspondence: '',
							State_Correspondence: '',
						}}
						validate={(values) => {
							const errors = {}
							if (!values.Name_of_the_company) {
								errors.Name_of_the_company = 'Required'
							}
							if (values.Name_of_the_company.length > Math.pow(2, 16)) {
								errors.Name_of_the_company = `Must be less than ${Math.pow(2, 16)} characters`
							}

							if (!values.Establishment_Date) {
								errors.Establishment_Date = 'Required'
							}
							if (new Date(values.Establishment_Date).toString() === 'Invalid Date') {
								errors.Establishment_Date = 'Enter a valid date'
							}

							if (!values.Type_of_Organization) {
								errors.Type_of_Organization = 'Required'
							}
							if (values.Type_of_Organization.length > Math.pow(2, 8)) {
								errors.Type_of_Organization = `Must be less than ${Math.pow(2, 8)} characters`
							}

							if (!values.Nature_of_Business) {
								errors.Nature_of_Business = 'Required'
							}
							if (values.Nature_of_Business.length > Math.pow(2, 8)) {
								errors.Nature_of_Business = `Must be less than ${Math.pow(2, 8)} characters`
							}

							if (!values.Website) {
								errors.Website = 'Required'
							}
							if (values.Website.length > Math.pow(2, 8)) {
								errors.Website = `Must be less than ${Math.pow(2, 8)} characters`
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
								const re = /^\+{0,1}[0-9]{10,14}$/
								if (values.Employer_Contact_Phone.length < 10 || !re.test(values.Employer_Contact_Phone)) {
									errors.Employer_Contact_Phone = 'Must be a valid number'
								}
								if (values.Employer_Contact_Phone.length > 15) {
									errors.Employer_Contact_Phone = 'Must be less than 15 characters'
								}
							}
							if (values.Employer_Contact_Mobile) {
								const re = /^\+{0,1}[0-9]{10,14}$/
								if (values.Employer_Contact_Mobile.length < 10 || !re.test(values.Employer_Contact_Mobile)) {
									errors.Employer_Contact_Mobile = 'Must be a valid number'
								}
								if (values.Employer_Contact_Mobile.length > 15) {
									errors.Employer_Contact_Mobile = 'Must be less than 15 characters'
								}
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
							return errors
						}}
						onSubmit={async (values, { setSubmitting }) => {
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
							const { data } = await Axios.post(companyCreateNewProfile, formData, config).catch(
								(error) => console.error(error)
							)
							setSubmitting(false)
							props.newSnack(data.message)
							if (data.success) {
								props.updateData()
								window.scrollTo(0, 0)
							}
						}}
					>
						{({ submitForm, isSubmitting, values, setValues, setErrors, errors }) => (
							<Form style={{ display: 'flex', flexDirection: 'column' }}>
								<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
											<Typography variant="h4">Company Details</Typography>
										</Grid>
									</Grid>
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Name_of_the_company"
										type="text"
										label="Name of the Company"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Establishment_Date"
										InputLabelProps={{ shrink: true }}
										type="date"
										placeholder="yyyy-mm-dd"
										label="Date of Establishment"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Type_of_Organization"
										type="text"
										label="Type of Organization"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Nature_of_Business"
										type="text"
										label="Nature of Business"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact"
										type="text"
										label="Contact No."
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Website"
										type="text"
										label="Website"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<div>
										<FormControl variant="outlined" fullWidth>
											<InputLabel id="demo-simple-select-outlined-label2">
												Internship or Placement
											</InputLabel>
											<Select
												labelId="demo-simple-select-outlined-label2"
												value={values.placement}
												onChange={(e) => setValues({ ...values, placement: e.target.value })}
												label="Internship or Placement"
												name="placement"
											>
												<MenuItem value={'0'}>Internship</MenuItem>
												<MenuItem value={'1'}>Placement</MenuItem>
											</Select>
										</FormControl>
									</div>
								</Paper>
								<div style={{ padding: 10 }} />
								<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
											<Typography variant="h6">Contact Person Details</Typography>
										</Grid>
									</Grid>
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Registration_Contacts_Contact_Person"
										type="text"
										label="Contact person's name"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Registration_Contacts_Designation"
										type="text"
										label="Contact person's designation"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact_Phone"
										type="text"
										label="Contact person's phone"
										fullWidth
									/>
									<div style={{ padding: 10 }} />
									<Field
										component={TextField}
										variant="outlined"
										size="small"
										name="Employer_Contact_Mobile"
										type="text"
										label="Contact person's mobile"
										fullWidth
									/>
								</Paper>
								<div style={{ padding: 10 }} />
								<div>
									<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
												<Typography variant="h6">Correspondence Address</Typography>
											</Grid>
											<Grid item>
												<FormControlLabel
													control={
														<Switch
															checked={sameAsPrevious}
															onChange={(e) => {
																setSameAsCorrespondence(false)
																setValues(
																	{
																		...values,
																		Employer_Correspondence_Address_Line1:
																			props.fetchedData[
																				'Employer_Correspondence_Address_Line1'
																			],
																		Employer_Correspondence_Address_Line2:
																			props.fetchedData[
																				'Employer_Correspondence_Address_Line2'
																			],
																		PinCode_Correspondence:
																			props.fetchedData['PinCode_Correspondence'],
																		Country_Correspondence:
																			props.fetchedData['Country_Correspondence'],
																		State_Correspondence:
																			props.fetchedData['State_Correspondence'],
																		Employer_Permanent_Address_Line1:
																			props.fetchedData[
																				'Employer_Permanent_Address_Line1'
																			],
																		Employer_Permanent_Address_Line2:
																			props.fetchedData[
																				'Employer_Permanent_Address_Line2'
																			],
																		PinCode_Permanent:
																			props.fetchedData['PinCode_Permanent'],
																		Country_Permanent:
																			props.fetchedData['Country_Permanent'],
																		State_Permanent:
																			props.fetchedData['State_Permanent'],
																	},
																	false
																)
																setErrors({
																	...errors,
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
																})
																setSameAsPrevious(e.target.checked)
															}}
															name="sameAsPrevious"
															color="primary"
														/>
													}
													label="Same as Account"
												/>
											</Grid>
										</Grid>
										<Field
											component={TextField}
											disabled={sameAsPrevious}
											variant={sameAsPrevious ? 'filled' : 'outlined'}
											size="small"
											name="Employer_Correspondence_Address_Line1"
											type="text"
											label="Address line 1"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											disabled={sameAsPrevious}
											variant={sameAsPrevious ? 'filled' : 'outlined'}
											size="small"
											name="Employer_Correspondence_Address_Line2"
											type="text"
											label="Address line 2"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											disabled={sameAsPrevious}
											variant={sameAsPrevious ? 'filled' : 'outlined'}
											size="small"
											name="PinCode_Correspondence"
											type="number"
											label="Pincode"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											disabled={sameAsPrevious}
											variant={sameAsPrevious ? 'filled' : 'outlined'}
											size="small"
											name="State_Correspondence"
											type="text"
											label="State"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											disabled={sameAsPrevious}
											variant={sameAsPrevious ? 'filled' : 'outlined'}
											size="small"
											name="Country_Correspondence"
											type="text"
											label="Country"
											fullWidth
										/>
									</Paper>
									<div style={{ padding: 10 }} />
									<Paper elevation={0} style={{ padding: 16, border: '1px solid grey' }}>
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
													disabled={sameAsPrevious}
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
											variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence || sameAsPrevious}
											size="small"
											name="Employer_Permanent_Address_Line1"
											type="text"
											label="Permanent Address Line 1"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence || sameAsPrevious}
											size="small"
											name="Employer_Permanent_Address_Line2"
											type="text"
											label="Permanent Address Line 2"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence || sameAsPrevious}
											size="small"
											name="PinCode_Permanent"
											type="number"
											label="Pincode"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence || sameAsPrevious}
											size="small"
											name="State_Permanent"
											type="text"
											label="State"
											fullWidth
										/>
										<div style={{ padding: 10 }} />
										<Field
											component={TextField}
											variant={sameAsCorrespondence || sameAsPrevious ? 'filled' : 'outlined'}
											disabled={sameAsCorrespondence || sameAsPrevious}
											size="small"
											name="Country_Permanent"
											type="text"
											label="Country"
											fullWidth
										/>
									</Paper>
									<div style={{ padding: 10 }} />
									<Typography style={{ color: 'red' }}>
										After you click on the submit button you will be able to create a new listing
										which will be visible to the students.
									</Typography>
									<div style={{ padding: 10 }} />
								</div>
								<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
									<Button
										variant="contained"
										color="primary"
										disabled={isSubmitting}
										onClick={submitForm}
									>
										{isSubmitting ? <CircularProgress /> : 'Submit'}
									</Button>
									{/* <Button
										variant="contained"
										color="secondary"
										disabled={isSubmitting}
									>
										{isSubmitting ? <CircularProgress /> : 'Cancel'}
									</Button> */}
								</div>
							</Form>
						)}
					</Formik>
				</Paper>
			</div>
		</Fade>
	)
}

export default Profiles
