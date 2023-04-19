import React, { useState } from 'react'
import Axios from 'axios'

import { bake_cookie } from 'sfcookies'

import {
	placementStaffGetAllCompanies,
	// placementStaffAddBranchesToListing,
	placementStaffLowerCGPAForListing,
	placementStaffMarkAsAbsent,
	placementStaffLoginToCompany,
	placementStaffJobDescriptionFileDownload,
} from '../../index'

import tableIcons from '../../../../constants/tableIcons'
import { listingStatusLookup as listingStatusLookupAddress } from '../../../../constants/addresses'

import MaterialTable from 'material-table'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import DialogButton from '../../../../components/dialogButton'
import DegreeSelector from '../../../../components/degreeSelector'

import { Route, useHistory } from 'react-router-dom'
import { useConfirm } from 'material-ui-confirm'

import EditLists from './editLists'
import { b64toBlob } from '../../../../components/scripts'

const IncreaseBranches = (props) => {
	const [branches, setBranches] = React.useState(props.existingBranches)
	// const confirm = useConfirm()

	return (
		<div>
			<DegreeSelector setDepartment={setBranches} Department={branches} properties={props} />
			{/* <Button
				onClick={() =>
					confirm()
						.then(() => {
							props.setLoading(true)
							Axios.post(
								placementStaffAddBranchesToListing,
								{ id: props.id, branches: branches },
								props.config
							)
								.then(({ data }) => {
									if (data.success) props.updateData()
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
				variant="contained"
				color="primary"
			>
				Confirm
			</Button> */}
		</div>
	)
}

const DecreaseCGPA = (props) => {
	const [CGPA, setCGPA] = React.useState('')
	const confirm = useConfirm()

	return (
		<div>
			<TextField
				label="New CGPA"
				fullWidth
				type="number"
				value={CGPA}
				onChange={(e) => {
					e.preventDefault()
					setCGPA(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() => {
							props.setLoading(true)
							Axios.post(placementStaffLowerCGPAForListing, { id: props.id, cgpa: CGPA }, props.config)
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
				variant="contained"
				color="primary"
			>
				Confirm
			</Button>
		</div>
	)
}

const openLinkInNewTab = (openURL) => {
	window.open(openURL, '_blank')
}

const CompanyDetails = (props) => {
	const history = useHistory()
	const confirm = useConfirm()
	const currentAddress = props.currentAddress + '/' + props.companyData.id + '/'

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
			{props.companyData.form_2.map((listing, index) => (
				<Route path={currentAddress + listing.id} exact key={index}>
					<EditLists
						updateData={props.updateData}
						updated={props.updated}
						listingData={listing}
						prevAddress={currentAddress}
						setLoading={props.setLoading}
						newSnack={props.newSnack}
						config={props.config}
					/>
				</Route>
			))}
			<Route path={currentAddress} exact>
				<Button variant="outlined" onClick={() => history.push(props.currentAddress)}>
					Back
				</Button>
				<div style={{ padding: 15 }} />
				<div style={{ padding: 15 }} />
				<Typography>Employer Details</Typography>
				<List dense style={{ maxHeight: 200, overflow: 'auto' }}>
					{attrs.map((attr, key) =>
						typeof props.companyData[attr] === 'object' ? (
							<React.Fragment key={key} />
						) : (
							<ListItem divider key={key}>
								{attr.replace(/_/g, ' ') + ' : ' + props.companyData[attr]}
							</ListItem>
						)
					)}
				</List>
				<div style={{ padding: 15 }} />
				<div style={{ padding: 15 }} />
				<Typography>Other Details</Typography>
				<List dense style={{ maxHeight: 200, overflow: 'auto' }}>
					{attrs2.map((attr, key) =>
						typeof props.companyData[attr] === 'object' ? (
							<React.Fragment key={key} />
						) : (
							<ListItem divider key={key}>
								{attr + ' : ' + props.companyData[attr]}
							</ListItem>
						)
					)}
				</List>
				<div style={{ padding: 15 }} />
				<div style={{ padding: 15 }} />
				<MaterialTable
					title={props.companyData.Name_of_the_company + ' : ' + props.companyData.id}
					data={props.companyData.form_2}
					options={{ filtering: true }}
					icons={tableIcons}
					columns={[
						{
							title: 'Listing ID',
							field: 'id',
						},
						{
							title: 'Job Title',
							field: 'Job_Title',
						},
						{
							title: 'Job Description',
							field: 'Job_Description_Offered',
							render: (rowData) => (
								<div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: 200 }}>
									{rowData.Job_Description_Offered}
								</div>
							),
						},
						{
							title: 'Job Description Document',
							field: 'document',
							render: (rowData) => (
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
							),
						},
						{
							title: 'Tentative No of Vacancies',
							field: 'Tentative_No_of_Vacancies',
						},
						{
							title: 'Current Status',
							field: 'current_status',
							lookup: props.listingStatusLookup,
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
												title: 'MinCGPA',
												field: 'MinCGPA',
											},
											{
												title: 'Lower CGPA',
												render: (rowData) => (
													<DialogButton title="Lower CGPA">
														<DecreaseCGPA
															setLoading={props.setLoading}
															updateData={props.updateData}
															config={props.config}
															newSnack={props.newSnack}
															id={rowData.id}
														/>
													</DialogButton>
												),
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
							title: 'Eligible Degrees',
							render: (rowData) => (
								<DialogButton title="Eligible Degrees">
									<List dense style={{ overflow: 'auto' }}>
										{rowData.Job_Eligibledegrees.map((degree, key) => (
											<ListItem divider key={key}>
												{props.degreeLookup[degree]}
											</ListItem>
										))}
									</List>
								</DialogButton>
							),
						},
						{
							title: 'Tests',
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
									<List dense style={{ maxHeight: 200, maxWidth: 300, overflow: 'auto' }}>
										{attrs.map((attr, key) =>
											typeof rowData[attr] === 'object' ? (
												<React.Fragment key={key} />
											) : (
												<ListItem divider key={key}>
													{attr.replace(/_/g, ' ') + ' : ' + (rowData[attr] ? 'Yes' : 'No')}
												</ListItem>
											)
										)}
									</List>
								)
							},
						},
						{
							title: 'Other details',
							render: (rowData) => {
								const attrs = []
								for (var attr in rowData) attrs.push(attr)
								return (
									<List dense style={{ maxHeight: 200, maxWidth: 300, overflow: 'auto' }}>
										{attrs.map((attr, key) =>
											typeof rowData[attr] === 'object' ? (
												<React.Fragment key={key} />
											) : (
												<ListItem divider key={key}>
													{attr + ' : ' + rowData[attr]}
												</ListItem>
											)
										)}
									</List>
								)
							},
						},
						{
							title: 'Add branches',
							render: (rowData) => (
								<div>
									<IncreaseBranches
										setLoading={props.setLoading}
										updateData={props.updateData}
										config={props.config}
										newSnack={props.newSnack}
										existingBranches={rowData.Job_Eligibledegrees}
										id={rowData.id}
									/>
								</div>
							),
						},
						{
							title: 'Edit Lists',
							render: (rowData) => (
								<Button
									variant="contained"
									color="primary"
									onClick={() => history.push(currentAddress + rowData.id)}
								>
									Edit Lists
								</Button>
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
					{console.log(allCompaniesData)}
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
											history.push(props.currentAddress + '/' + rowData.id)
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
				{/* <div style={{ padding: 8 }} />
				<div>
					<MaterialTable
						title="Internships"
						options={{
							actionsColumnIndex: -1,
							filtering: true,
						}}
						data={allCompaniesData.filter((company) => !company.placement)}
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
								title: 'Listings',
								render: (rowData) => (
									<a
										style={{ color: 'red' }}
										variant="contained"
										onClick={(e) => {
											e.preventDefault()
											history.push(props.currentAddress + '/' + rowData.id)
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
								title: 'Registration Status',
								field: 'Registration_Status',
								lookup: { 1: 'Not Verified', 2: 'Verified' },
							},
							{
								title: 'Student Cood. ID',
								field: 'student_co_od_id',
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
				</div> */}
			</Route>
			<div>
				{allCompaniesData.map((companyData, key) => (
					<Route path={props.currentAddress + '/' + companyData.id} key={key}>
						<CompanyDetails
							{...props}
							listingStatusLookup={listingStatusLookup}
							companyData={companyData}
						/>
					</Route>
				))}
			</div>
		</div>
	)
}

export default AllCompanies
