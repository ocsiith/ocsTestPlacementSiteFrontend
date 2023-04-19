import React, { useState } from 'react'

import {
	placementStaffCreateStudentCood,
	placementStaffGetStudentCoods,
	placementStaffGetStudentCoodsList,
	placementStaffUnassignCompany,
	placementStaffGetAllCompanies,
	placementStaffAssignCompany,
	placementStaffRemoveStudentCood,
} from '../../index'

import MaterialTable from 'material-table'
import tableIcons from '../../../../constants/tableIcons'
import Axios from 'axios'

import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogButton from '../../../../components/dialogButton'
import DialogActions from '@material-ui/core/DialogActions'
import MenuItem from '@material-ui/core/MenuItem'
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline'
import { useConfirm } from 'material-ui-confirm'

const AllCompanies = (props) => {
	const [allCompaniesData, setAllCompaniesData] = useState([])
	const [rollNo, setRollNo] = useState('')
	const [assignCoodOpen, setAssignCoodOpen] = useState(false)
	const [assignCompanyID, setAssignCompanyID] = useState('')
	const [assignCompanyType, setAssignCompanyType] = useState('')
	const confirm = useConfirm()
	let title = 'Are you sure ?'

	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffGetAllCompanies, props.config).then(({ data }) => {
				if (data.success) setAllCompaniesData(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
			}),
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
			<Dialog maxWidth="lg" fullWidth open={assignCoodOpen} onClose={() => setAssignCoodOpen(false)}>
				<DialogTitle>Assign Student Coordinator to Company ID: {assignCompanyID}</DialogTitle>
				<DialogContent>
					<TextField
						fullWidth
						value={rollNo}
						variant="outlined"
						label="Roll No."
						onChange={(e) => {
							e.preventDefault()
							setRollNo(e.target.value)
						}}
					/>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="primary"
						onClick={() => {
							for (let index = 0; index < props.allCoods.length; index++) {
								if (props.allCoods[index].email === rollNo + '@iith.ac.in') {
									if (props.allCoods[index].placement === 0 && assignCompanyType === 1) {
										title =
											'You are assigning an internship coordinator to a placement profile. Are you sure ?'
									} else if (props.allCoods[index].placement === 1 && assignCompanyType === 0) {
										title =
											'You are assigning a placement coordinator to an internship profile. Are you sure ?'
									}
								}
							}
							confirm({ title })
								.then(async () => {
									props.setLoading(true)
									const { data } = await Axios.post(
										placementStaffAssignCompany,
										{
											id: assignCompanyID,
											rollno: rollNo,
										},
										props.config
									)
									if (data.success) {
										props.updateData()
										setAssignCoodOpen(false)
									}
									props.newSnack(data.message, data.success ? 'info' : 'error')
									props.setLoading(false)
								})
								.catch(() => {})
						}}
					>
						Assign
					</Button>
					<Button variant="contained" color="secondary" onClick={() => setAssignCoodOpen(false)}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
			<MaterialTable
				title="All Companies"
				options={{
					actionsColumnIndex: -1,
					filtering: true,
				}}
				data={allCompaniesData}
				icons={tableIcons}
				columns={[
					{
						title: 'Profile ID',
						field: 'profile_id',
					},
					{
						title: 'Name of the Company',
						field: 'Name_of_the_company',
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
						title: 'Placement/Internship',
						field: 'placement',
						lookup: { 0: 'Internship', 1: 'Placement' },
					},
					{
						title: 'Assign student coordinator',
						render: (rowData) => (
							<Button
								disabled={rowData.student_co_od_id !== null}
								onClick={() => {
									setAssignCoodOpen(true)
									setAssignCompanyID(rowData.profile_id)
									setAssignCompanyType(rowData.placement)
								}}
							>
								{rowData.student_co_od_id !== null ? 'Already assigned' : 'Assign a coordinator'}
							</Button>
						),
					},
				]}
			/>
		</div>
	)
}

const RemoveCood = (props) => {
	const [rollNo, setRollNo] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid', padding: 15 }}>
			<TextField
				variant="outlined"
				fullWidth
				label="Roll No."
				value={rollNo}
				onChange={(e) => {
					e.preventDefault()
					setRollNo(e.target.value)
				}}
			/>
			<Button
				variant="contained"
				color="secondary"
				fullWidth
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(placementStaffRemoveStudentCood, { rollno: rollNo }, props.config).then(
								({ data }) => {
									props.newSnack(data.message, data.success ? 'info' : 'error')
									if (data.success) props.updateData()
								}
							)
						)
						.catch(() => {})
				}
			>
				Remove
			</Button>
		</Container>
	)
}

const ManageStudentCoods = (props) => {
	const [coodsAndCompanies, setCoodsAndCompanies] = useState([])
	const [allCoods, setAllCoods] = useState([])
	const [rollNo, setRollNo] = useState('')
	const [placement_internship, setPlacement_Internship] = useState('Internship')

	const confirm = useConfirm()

	const Placement_Internship = [
		{
			value: 'Internship',
			label: 'Internship',
		},
		{
			value: 'Placement',
			label: 'Placement',
		},
	]

	const handleChange = (event) => {
		setPlacement_Internship(event.target.value)
	}

	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffGetStudentCoods, props.config).then(({ data }) => {
				if (data.success) setCoodsAndCompanies(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
			}),
			Axios.get(placementStaffGetStudentCoodsList, props.config).then(({ data }) => {
				if (data.success) setAllCoods(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
			}),
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
			<AllCompanies {...props} allCoods={allCoods} />
			<div style={{ padding: 15 }} />
			<MaterialTable
				options={{
					actionsColumnIndex: -1,
					filtering: true,
				}}
				actions={[
					{
						icon: RemoveCircleOutlineIcon,
						tooltip: 'Unassign coordinator from this company',
						onClick: (event, rowData) =>
							confirm()
								.then(async () => {
									props.setLoading(true)
									//console.log(rowData)
									const { data } = await Axios.post(
										placementStaffUnassignCompany,
										{ id: rowData.profile_id },
										props.config
									).catch((error) => {
										console.error(error)
										props.newSnack('Connection Error', 'error')
									})
									if (data.success) props.updateData()
									props.newSnack(data.message, data.success ? 'info' : 'error')
									props.setLoading(false)
								})
								.catch(() => {}),
					},
				]}
				columns={[
					{
						title: 'Profile ID',
						field: 'profile_id',
					},
					{
						title: 'Company',
						field: 'Name_of_the_company',
					},
					{
						title: 'Coordinator Name',
						field: 'co_od_name',
					},
					{
						title: 'Email ID',
						field: 'email',
					},
					{
						title: 'Placement/Internship',
						field: 'placement',
						lookup: { 0: 'Internship', 1: 'Placement' },
					},
					{
						title: 'Coordinator ID',
						field: 'student_co_od_id',
					},
				]}
				icons={tableIcons}
				data={coodsAndCompanies}
				title="Manage Student Coordinators"
			/>
			<div style={{ padding: 15 }} />
			<MaterialTable
				options={{
					actionsColumnIndex: -1,
					filtering: true,
				}}
				columns={[
					{
						title: 'Coordinator ID',
						field: 'id',
					},
					{
						title: 'Coordinator Name',
						field: 'student_name',
					},
					{
						title: 'Email ID',
						field: 'email',
					},
					{
						title: 'Contact',
						field: 'contact',
					},
					{
						title: 'Placement/Internship',
						field: 'placement',
						lookup: { 0: 'Internship', 1: 'Placement' },
					},
				]}
				icons={tableIcons}
				data={allCoods}
				title="All coordinators"
			/>
			<div style={{ padding: 15 }} />
			<Container style={{ width: '100%', border: '1px solid' }}>
				<div style={{ padding: 15 }} />
				<Typography>Create/Remove Coordinator</Typography>
				<div style={{ padding: 15 }} />
				<TextField
					style={{ margin: 10, width: '50%' }}
					// fullWidth
					variant="outlined"
					label="Roll No."
					value={rollNo}
					onChange={(e) => {
						e.preventDefault()
						setRollNo(e.target.value)
					}}
				/>
				<TextField
					id="outlined-select-currency"
					style={{ margin: 10, width: '30%' }}
					select
					label="Placement/Internship"
					value={placement_internship}
					onChange={handleChange}
					// helperText="Please select your currency"
					variant="outlined"
				>
					{Placement_Internship.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<div style={{ padding: 15 }} />
				<Button
					style={{ margin: 10 }}
					variant="contained"
					color="primary"
					fullWidth
					onClick={() =>
						confirm()
							.then(async () => {
								props.setLoading(true)
								const { data } = await Axios.post(
									placementStaffCreateStudentCood,
									{ rollno: rollNo, placement: placement_internship === 'Internship' ? 0 : 1 },
									props.config
								).catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
								props.setLoading(false)
								if (data.success) props.updateData()
								props.newSnack(data.message, data.success ? 'info' : 'error')
							})
							.catch(() => {})
					}
				>
					Create Coordinator
				</Button>
				<div style={{ padding: 15 }} />
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography variant="button" style={{ flexGrow: 1 }}>
						Remove Coordinator
					</Typography>
					<DialogButton title="Remove Coordinator">
						<RemoveCood updateData={props.updateData} config={props.config} newSnack={props.newSnack} />
					</DialogButton>
				</div>
				<div style={{ padding: 15 }} />
			</Container>
		</div>
	)
}

export default ManageStudentCoods
