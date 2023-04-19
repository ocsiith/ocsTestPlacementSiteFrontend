import React, { useState } from 'react'
import Axios from 'axios'

import { bake_cookie } from 'sfcookies'
import cloneDeep from 'clone-deep'

import {
	placementStaffGetAllCompanies,
	placementStaffMarkAsAbsent,
	placementStaffLoginToCompany,
	placementStaffJobDescriptionFileDownload,
} from '../../index'

import tableIcons from '../../../../constants/tableIcons'
import {
	listingStatusLookup as listingStatusLookupAddress,
	placementcompanyReport,
	placementUpdateVenue,
	placementGetRegisteredStudents,
	placementGetShortlistStudents,
} from '../../../../constants/addresses'

import { copyToClipboard, ManageIndivListingsDialog } from '../../../studentCoodPortal/portal1'

import MaterialTable from 'material-table'
import { Tooltip } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CancelIcon from '@material-ui/icons/Close'
import GetAppIcon from '@material-ui/icons/GetApp'
import EditIcon from '@material-ui/icons/Edit'

import DialogButton from '../../../../components/dialogButton'

import { Route, useHistory } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'

// import EditLists from './editLists'
import { b64toBlob } from '../../../../components/scripts'
import { EditProfiles } from '../../../companyPortal/profiles'
import { EditListing } from '../../../companyPortal/manageListings'

const pdfMake = require('pdfmake/build/pdfmake')
const vfsFonts = require('pdfmake/build/vfs_fonts')
pdfMake.vfs = vfsFonts.pdfMake.vfs

const openLinkInNewTab = (openURL) => {
	window.open(openURL, '_blank')
}

const CompanyDetails = (props) => {
	const history = useHistory()
	const confirm = useConfirm()
	const currentAddress = props.currentAddress + '/' + props.companyData.id + '/'

	const accessToken = window.localStorage.getItem('PaccessToken')
	const config = { headers: { Authorization: `BEARER ${accessToken}` } }
	const [editOpen, setEditOpen] = useState(false)
	const [editData, setEditData] = useState({})

	const [newVenueId, setNewVenueId] = React.useState('')
	const [newVenue, setNewVenue] = React.useState('')
	const [updateVenueOpen, setUpdateVenueOpen] = React.useState(false)

	const [editListOpen, setEditListOpen] = useState(false)
	const [editListData, setEditListData] = useState({})

	const attrs = [
		'Employer_Registration_Contacts_Contact_Person',
		'Employer_Registration_Contacts_Designation',
		'Employer_Contact_Phone',
		'Employer_Contact_Mobile',
		'Employer_Contact',
		'Employer_Contact_Email',
	]

	const attrs2 = []
	for (var attr in props.companyData) attrs2.push(attr)

	const markAsAbsent = (id) =>
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(placementStaffMarkAsAbsent, { listing_id: id }, props.config).catch(
					(error) => {
						console.error(error)
						props.newSnack('Connection Error', 'error')
					}
				)
				if (data.success) props.updateData()
				props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch(() => {})

	return (
		<div>
			<Dialog
				maxWidth="lg"
				TransitionProps={{ unmountOnExit: true }}
				open={updateVenueOpen}
				onClose={() => setUpdateVenueOpen(false)}
			>
				<DialogTitle>
					<IconButton onClick={() => setUpdateVenueOpen(false)}>
						<CancelIcon />
					</IconButton>
				</DialogTitle>
				<DialogContent>
					<TextField label="Venue" variant="outlined" onChange={(e) => setNewVenue(e.target.value)} />
				</DialogContent>
				<DialogActions>
					<Button
						color="secondary"
						variant="contained"
						onClick={() =>
							confirm()
								.then(async () => {
									const { data } = await Axios.post(
										placementUpdateVenue,
										{ id: newVenueId, venue: newVenue },
										props.config
									).catch((error) => {
										console.error(error)
										props.newSnack('Connection Error', 'error')
									})
									props.newSnack(data.message, data.success ? 'info' : 'error')
									if (data.success) {
										props.updateData()
									}
									setUpdateVenueOpen(false)
								})
								.catch(() => {})
						}
					>
						Submit
					</Button>
				</DialogActions>
			</Dialog>
			<Route path={currentAddress} exact>
				<Button variant="outlined" onClick={() => history.push(props.currentAddress)}>
					Back
				</Button>
				<div style={{ padding: 15 }} />
				<div style={{ padding: 15 }} />
				<Paper style={{ width: '100%', padding: 30 }}>
					<Typography variant="h5" style={{ fontWeight: '500' }}>
						Profile Details
					</Typography>
					<div style={{ padding: 30 }}>
						<Typography variant="button" style={{ fontSize: '110%' }}>
							Employer Details
						</Typography>
						<List dense style={{ maxHeight: 200, overflow: 'auto' }}>
							{attrs.map((attr, key) =>
								typeof props.companyData[attr] === 'object' ? (
									<React.Fragment key={key} />
								) : (
									<ListItem key={key}>
										{attr.replace(/_/g, ' ') + ' : ' + props.companyData[attr]}
									</ListItem>
								)
							)}
						</List>
						<div style={{ padding: 15 }} />
						<Typography variant="button" style={{ fontSize: '110%' }}>
							Other Details
						</Typography>
						<List dense style={{ maxHeight: 200, overflow: 'auto' }}>
							{attrs2.map((attr, key) =>
								typeof props.companyData[attr] === 'object' ? (
									<React.Fragment key={key} />
								) : (
									<ListItem key={key}>{attr + ' : ' + props.companyData[attr]}</ListItem>
								)
							)}
						</List>
						<div style={{ padding: 15 }} />
					</div>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							setEditData(cloneDeep(props.companyData))
							setEditOpen(true)
						}}
					>
						Edit Profile Details
					</Button>
				</Paper>
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
							fetchedData={props.companyData}
							setLoading={props.setLoading}
							updateData={props.updateData}
							address="placement"
							onClose={() => {
								setEditOpen(false)
								setEditData({})
							}}
						/>
					</DialogContent>
				</Dialog>
				<Dialog
					fullWidth
					open={editListOpen}
					maxWidth="lg"
					onClose={() => {
						setEditListOpen(false)
						setEditListData({})
					}}
				>
					<DialogTitle style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
						<span>Edit Listing</span>
					</DialogTitle>
					<DialogContent>
						<EditListing
							newSnack={props.newSnack}
							data={editListData}
							config={config}
							setLoading={props.setLoading}
							updateData={props.updateData}
							accessToken={accessToken}
							parentProps={props.parentProps}
							address="placementCell"
							placement={props.companyData.placement}
							allCompaniesData={props.allCompaniesData}
							companyId={props.companyData.Company_id}
							onClose={() => {
								setEditListOpen(false)
								setEditListData({})
							}}
						/>
					</DialogContent>
				</Dialog>
				<div style={{ padding: 15 }} />
				<div style={{ padding: 15 }} />
				<MaterialTable
					title={props.companyData.Name_of_the_company + ' : ' + props.companyData.id}
					data={props.companyData.form_2}
					// options={{ filtering: true }}
					icons={tableIcons}
					columns={[
						{
							title: 'Listing ID',
							field: 'id',
						},
						{
							title: 'Basic Details',
							render: (rowData) => (
								<DialogButton title="Basic Details">
									<List dense style={{ overflow: 'auto' }}>
										<ListItem divider>Job Title: {rowData.Job_Title}</ListItem>
										<ListItem divider>Job Description: {rowData.Job_Description_Offered}</ListItem>
										{rowData.document ? (
											<ListItem divider>
												<Button
													variant="outlined"
													fullWidth
													color="primary"
													onClick={async () => {
														const { data } = await Axios.get(
															placementStaffJobDescriptionFileDownload + rowData.id,
															props.config
														).catch((error) => {
															console.error(error)
															props.newSnack('Connection Error', 'error')
														})
														if (data.success) {
															const blobPDF = b64toBlob(data.message, 'application/pdf')
															const blobPDFURL = URL.createObjectURL(blobPDF)
															openLinkInNewTab(blobPDFURL)
														}
													}}
												>
													Download
												</Button>
											</ListItem>
										) : (
											<React.Fragment />
										)}
										<ListItem divider>
											Tentative Number of Vacancies: {rowData.Tentative_No_of_Vacancies}
										</ListItem>
										<ListItem divider>
											Current Status: {props.listingStatusLookup[rowData.current_status]}
										</ListItem>
									</List>
								</DialogButton>
							),
						},
						{
							title: 'Listing Data',
							render: (rowData) => (
								<DialogButton title="Listing Data">
									<List dense style={{ overflow: 'auto' }}>
										<ListItem divider>Skill Set : {rowData.Job_Description}</ListItem>
										<ListItem divider>Job Location Code : {rowData.Job_Location_Code}</ListItem>
										<ListItem divider>Job Location Name : {rowData.Job_Location_Name}</ListItem>
										<ListItem divider>Joining : {rowData.Joining}</ListItem>
										<ListItem divider>Remarks : {rowData.Remarks}</ListItem>
									</List>
								</DialogButton>
							),
						},
						{
							title: 'Salary Details',
							render: (rowData) => (
								<DialogButton title="Salary Details" degreeLookup={props.degreeLookup}>
									<MaterialTable
										columns={[
											{
												title: 'ID',
												field: 'id',
											},
											{
												title: 'Programme',
												render: (rowData2) => props.degreeLookup[rowData2.name_of_programme],
											},
											{
												title: props.companyData.placement ? 'CTC' : 'Stipend',
												field: 'CTC',
											},
											{
												title: props.companyData.placement ? 'CTC Breakup' : 'Type',
												field: 'CTC_Breakup',
											},
											{
												title: props.companyData.placement ? 'Gross' : 'Duration',
												field: 'Gross',
											},
											{
												title: props.companyData.placement ? 'Service Type' : 'PPO',
												field: 'Service_Type',
											},
											{
												title: rowData.placement && 'Service Type Remarks',
												field: rowData.placement && 'Service_Type_Remarks',
											},
										]}
										icons={tableIcons}
										title={rowData.Job_Title + ' : ' + rowData.id}
										data={rowData.Salary_Details}
									/>
								</DialogButton>
							),
						},
						{
							title: 'Eligibility Criteria',
							render: (rowData) => (
								<DialogButton title="Eligibility Criteria">
									<Typography variant="button">Minimum CGPA</Typography>
									<List dense style={{ overflow: 'auto' }}>
										{rowData.Salary_Details.map((program, key) => (
											<ListItem
												key={key}
												// style={{ display: 'flex', justifyContent: 'space-between' }}
											>
												<div>
													{props.degreeLookup[program.name_of_programme]} : {program.MinCGPA}
												</div>
												{/* <div>
													<DialogButton name="LOWER CGPA" title="Lower CGPA">
														<DecreaseCGPA
															setLoading={props.setLoading}
															updateData={props.updateData}
															config={props.config}
															newSnack={props.newSnack}
															id={rowData.id}
														/>
													</DialogButton>
												</div> */}
											</ListItem>
										))}
									</List>
									<div style={{ padding: 10 }} />
									<Typography variant="button">Eligible Degrees</Typography>
									<List dense style={{ overflow: 'auto' }}>
										{rowData.Job_Eligibledegrees.map((degree, key) => (
											<ListItem divider key={key}>
												{props.degreeLookup[degree]}
											</ListItem>
										))}
									</List>
									{/* <Typography variant="button">Add Branches</Typography>
									<IncreaseBranches
										setLoading={props.setLoading}
										updateData={props.updateData}
										config={props.config}
										newSnack={props.newSnack}
										existingBranches={rowData.Job_Eligibledegrees}
										id={rowData.id}
									/> */}
								</DialogButton>
							),
						},
						{
							title: 'Selection Process',
							render: (rowData) => {
								const attrs = [
									'Aptitude_Test',
									'Group_Discussion',
									'HR_Interview',
									'Online_Test',
									'Personal_Interview',
									'Shortlist_from_Resumes',
									'Technical_Interview',
									'Technical_Test',
								]
								return (
									<DialogButton title="Selection Process">
										<Typography>Number of rounds : {rowData.No_of_Rounds}</Typography>
										<div style={{ padding: 8 }} />
										<Typography variant="button">Rounds</Typography>
										<List dense style={{ overflow: 'auto' }}>
											{attrs.map((attr, key) =>
												typeof rowData[attr] === 'object' ? (
													<React.Fragment key={key} />
												) : (
													<ListItem divider key={key}>
														{attr.replace(/_/g, ' ') +
															' : ' +
															(rowData[attr] ? 'Yes' : 'No')}
													</ListItem>
												)
											)}
										</List>
									</DialogButton>
								)
							},
						},
						{
							title: 'Copy to clipboard',
							render: (rowData) => (
								<DialogButton title="Copy to clipboard">
									<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
										<Button
											variant="outlined"
											style={{ width: '50%', marginBottom: '10px' }}
											onClick={() => {
												props.newSnack('Loading...', 'info')
												Axios.get(placementGetRegisteredStudents + rowData.id, props.config)
													.then(({ data }) => {
														if (data.success) {
															var str = ''
															data.message.map((item) => (str = str + item + ', '))
															copyToClipboard(str)
															props.newSnack('Copied to clipboard : ' + str, 'info')
														} else
															props.newSnack(
																data.message,
																data.success ? 'info' : 'error'
															)
													})
													.catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
											}}
										>
											Registered Roll Numbers
										</Button>
										<Button
											variant="outlined"
											style={{ width: '50%', marginBottom: '10px' }}
											onClick={() => {
												props.newSnack('Loading...', 'info')
												Axios.get(placementGetRegisteredStudents + rowData.id, props.config)
													.then(({ data }) => {
														if (data.success) {
															var str = ''
															data.message.map(
																(item) => (str = str + item + '@iith.ac.in, ')
															)
															copyToClipboard(str)
															props.newSnack('Copied to clipboard : ' + str, 'info')
														} else
															props.newSnack(
																data.message,
																data.success ? 'info' : 'error'
															)
													})
													.catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
											}}
										>
											Registered Emails
										</Button>
										<Button
											variant="contained"
											style={{ width: '50%', marginBottom: '10px' }}
											onClick={() => {
												props.newSnack('Loading...', 'info')
												Axios.get(placementGetShortlistStudents + rowData.id, props.config)
													.then(({ data }) => {
														if (data.success) {
															var str = ''
															data.message.map((item) => (str = str + item + ', '))
															copyToClipboard(str)
															props.newSnack('Copied to clipboard : ' + str, 'info')
														} else
															props.newSnack(
																data.message,
																data.success ? 'info' : 'error'
															)
													})
													.catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
											}}
										>
											Shortlisted Roll Numbers
										</Button>
										<Button
											variant="contained"
											style={{ width: '50%', marginBottom: '10px' }}
											onClick={() => {
												props.newSnack('Loading...', 'info')
												Axios.get(placementGetShortlistStudents + rowData.id, props.config)
													.then(({ data }) => {
														if (data.success) {
															var str = ''
															data.message.map(
																(item) => (str = str + item + '@iith.ac.in, ')
															)
															copyToClipboard(str)
															props.newSnack('Copied to clipboard : ' + str, 'info')
														} else
															props.newSnack(
																data.message,
																data.success ? 'info' : 'error'
															)
													})
													.catch((error) => {
														console.error(error)
														props.newSnack('Connection Error', 'error')
													})
											}}
										>
											Shortlisted Emails
										</Button>
									</div>
								</DialogButton>
							),
							//cellStyle: { border: '1px solid' },
						},
						{
							title: 'Open listing',
							render: (rowData) => (
								<ManageIndivListingsDialog
									accessToken={props.accessToken}
									newSnack={props.newSnack}
									updateData={props.updateData}
									lookupTable={props.degreeLookup}
									listing={rowData}
									address="placementCell"
									placement={props.companyData.placement}
									updated={1}
									setLoading={() => {}}
								/>
							),
							//cellStyle: { border: '1px solid' },
						},
						{
							title: 'Company report',
							render: (rowData) => (
								<Tooltip title="Download company report">
									<Button
										variant="contained"
										color="primary"
										onClick={async () => {
											const { data } = await Axios.get(
												`${placementcompanyReport}/${rowData.id}`,
												config
											).catch((error) => {
												console.error(error)
												props.newSnack('Connection Error', 'error')
											})
											pdfMake.createPdf(data.message).download(`${rowData.Job_Title}.pdf`)
										}}
									>
										<GetAppIcon fontSize="small" />
									</Button>
								</Tooltip>
							),
						},
						{
							title: 'Edit Listing Details',
							render: (rowData) => (
								<Tooltip title="Edit Listing Details">
									<Button
										variant="contained"
										color="primary"
										// onClick={() => history.push(currentAddress + rowData.id)}
										onClick={() => {
											const listing = props.companyData.form_2.filter(
												(listings) => listings.id === rowData.id
											)
											setEditListOpen(true)
											setEditListData(cloneDeep(listing[0]))
										}}
									>
										<EditIcon fontSize="small" />
									</Button>
								</Tooltip>
							),
						},
						{
							title: 'Mark as absent',
							render: (rowData) => (
								<Button variant="contained" color="secondary" onClick={() => markAsAbsent(rowData.id)}>
									Mark as Absent
								</Button>
							),
						},
					]}
				/>
			</Route>
		</div>
	)
}

const AllCompanies = (props) => {
	// console.log(props)
	const [allCompaniesData, setAllCompaniesData] = useState([])
	const [listingStatusLookup, setListingStatusLookup] = useState({})
	const history = useHistory()

	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffGetAllCompanies, props.config).then(({ data }) => {
				if (data.success) setAllCompaniesData(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
			}),
			Axios.get(listingStatusLookupAddress).then(({ data }) => setListingStatusLookup(data)),
		])
			.then(() => props.setLoading(false))
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	return (
		<div>
			<Route path={props.currentAddress + '/'} exact>
				<div>
					<MaterialTable
						title="Company details"
						options={{
							actionsColumnIndex: -1,
							filtering: true,
						}}
						// data={allCompaniesData.filter((company) => !!company.placement)}
						data={allCompaniesData}
						icons={tableIcons}
						columns={[
							{
								title: 'Profile ID',
								field: 'id',
							},
							{
								title: 'Name of the Company',
								field: 'Name_of_the_company',
							},
							{
								title: 'Internship/Placement',
								field: 'placement',
								lookup: { 0: 'Internship', 1: 'Placement' },
							},
							{
								title: 'Registration Status',
								field: 'Registration_Status',
								lookup: { 1: 'Not Verified', 2: 'Verified' },
							},
							{
								title: 'Student Cood. ID',
								field: 'student_co_od_id',
							},
							{
								title: 'Listings',
								render: (rowData) => (
									<a
										style={{ color: 'red' }}
										variant="contained"
										onClick={(e) => {
											e.preventDefault()
											// history.push(props.currentAddress + '/' + rowData.id)
											openLinkInNewTab(props.currentAddress + '/' + rowData.id)
										}}
										target="_blank"
										rel="noopener noreferrer"
										href={props.currentAddress + '/' + rowData.id}
									>
										Open
									</a>
								),
							},
							{
								title: 'Login to this company',
								render: (rowData) => (
									<Button
										onClick={() => {
											if (window.confirm('Are you sure?')) {
												Axios.post(
													placementStaffLoginToCompany,
													{ email: rowData.Employer_Contact_Email },
													props.config
												).then(({ data }) => {
													if (data.success) {
														bake_cookie('companyCredentials', data)
														window.localStorage.setItem(
															'companyCredentials',
															JSON.stringify(data)
														)
													}
													props.newSnack(data.message)
												})
											}
										}}
										variant="contained"
										color="secondary"
									>
										Login
									</Button>
								),
							},
						]}
					/>
				</div>
			</Route>
			<div>
				{allCompaniesData.map((companyData, key) => (
					<Route path={props.currentAddress + '/' + companyData.id} key={key}>
						<CompanyDetails
							{...props}
							listingStatusLookup={listingStatusLookup}
							companyData={companyData}
							allCompaniesData={allCompaniesData}
						/>
					</Route>
				))}
			</div>
		</div>
	)
}

export default AllCompanies
