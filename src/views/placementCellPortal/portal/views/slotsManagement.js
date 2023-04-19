import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import {
	placementStaffGetAllCompaniesWithoutInterviewSlot,
	placementStaffGetSlotsAndCompanies,
	placementStaffChangeSlotDetails,
	placementAddSlot,
} from '../../index'

import Axios from 'axios'
import MaterialTable from 'material-table'
import tableIcons from '../../../../constants/tableIcons'
import Button from '@material-ui/core/Button'
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	List,
	ListItem,
	Typography,
	TextField,
	Container,
} from '@material-ui/core'

import { useConfirm } from 'material-ui-confirm'

import DialogButton from '../../../../components/dialogButton'

const currentAddress = '/topsecreturlforplacementstaff/portal/allcompanies/'

const ListingsTable = (props) => {
	const [open, setOpen] = useState(false)

	return (
		<div>
			<Button variant="outlined" onClick={() => setOpen(true)}>
				Open
			</Button>
			<Dialog maxWidth="lg" fullWidth open={open}>
				<DialogContent>
					<MaterialTable
						icons={tableIcons}
						title={'Slot ID: ' + props.data.id}
						columns={[
							{
								title: 'Listing ID',
								field: 'id',
							},
							{
								title: 'Company',
								field: 'Name_of_the_company',
							},
							{
								title: 'Title',
								field: 'Job_Title',
							},
							{
								title: 'Other Details',
								render: (rowData) => {
									const attrs = []
									for (var attr in rowData) if (typeof rowData[attr] !== 'object') attrs.push(attr)
									return (
										<DialogButton title="Other Details">
											<List dense style={{ overflow: 'auto' }}>
												{attrs.map((attr, key) => (
													<ListItem divider key={key}>{attr + ' : ' + rowData[attr]}</ListItem>
												))}
											</List>
										</DialogButton>
									)
								},
							},
						]}
						data={props.data.listings}
					/>
				</DialogContent>
				<DialogActions>
					<Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const EditSlotDetails = (props) => {
	const [open, setOpen] = useState(false)
	const [slotDate, setSlotDate] = useState(props.data.slot_date)
	const [slotStartTime, setSlotStartTime] = useState(props.data.slot_time)
	const [slotEndTime, setSlotEndTime] = useState(props.data.slot_end_time)
	const confirm = useConfirm()

	const handleOk = () => {
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(
					placementStaffChangeSlotDetails,
					{
						slot_id: props.data.id,
						slot_date: slotDate,
						slot_time: slotStartTime,
						slot_end_time: slotEndTime,
					},
					props.config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				props.updateData()
				props.setLoading(false)
			})
			.catch(() => {})
	}

	return (
		<div>
			<Button color="secondary" variant="outlined" onClick={() => setOpen(true)}>
				Edit
			</Button>
			<Dialog maxWidth="lg" fullWidth open={open}>
				<DialogContent>
					<Typography variant="button">Slot: {props.data.id}</Typography>
					<div style={{ margin: 15 }}>
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							helperText="Follow the standard format"
							value={slotDate}
							label="Slot Date"
							onChange={(e) => setSlotDate(e.target.value)}
						/>
					</div>
					<div style={{ margin: 15 }}>
						<TextField
							value={slotStartTime}
							fullWidth
							helperText="Follow the standard format"
							variant="outlined"
							size="small"
							label="Slot Start Time"
							onChange={(e) => setSlotStartTime(e.target.value)}
						/>
					</div>
					<div style={{ margin: 15 }}>
						<TextField
							value={slotEndTime}
							fullWidth
							helperText="Follow the standard format"
							variant="outlined"
							size="small"
							label="Slot End Time"
							onChange={(e) => setSlotEndTime(e.target.value)}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button color="primary" variant="contained" onClick={handleOk}>
						Ok
					</Button>
					<Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const AddInterviewSlot = (props) => {
	const [open, setOpen] = useState(false)
	const [slotDate, setSlotDate] = useState()
	const [slotStartTime, setSlotStartTime] = useState()
	const [slotEndTime, setSlotEndTime] = useState()
	const confirm = useConfirm()

	const handleOk = () => {
		console.log(slotDate, slotStartTime, slotEndTime)
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(
					placementAddSlot,
					{
						Slot_Date: slotDate,
						Slot_Time: slotStartTime,
						Slot_End_Time: slotEndTime,
					},
					props.config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				props.updateData()
				props.setLoading(false)
			})
			.catch(() => {})
	}

	return (
		<div>
			<Button color="primary" variant="contained" onClick={() => setOpen(true)}>
				Add Interview Slot
			</Button>
			<Dialog maxWidth="lg" fullWidth open={open}>
				<DialogTitle>Interview Slot Details</DialogTitle>
				<DialogContent>
					<div style={{ margin: 15 }}>
						<TextField
							fullWidth
							variant="outlined"
							size="small"
							helperText="Slot Date"
							value={slotDate}
							// label="Slot Date"
							type="date"
							onChange={(e) => setSlotDate(e.target.value)}
						/>
					</div>
					<div style={{ margin: 15 }}>
						<TextField
							value={slotStartTime}
							fullWidth
							helperText="Slot Start Time"
							variant="outlined"
							size="small"
							// label="Slot Start Time"
							type="time"
							onChange={(e) => setSlotStartTime(e.target.value)}
						/>
					</div>
					<div style={{ margin: 15 }}>
						<TextField
							value={slotEndTime}
							fullWidth
							helperText="Slot End Time"
							variant="outlined"
							size="small"
							// label="Slot End Time"
							type="time"
							onChange={(e) => setSlotEndTime(e.target.value)}
						/>
					</div>
				</DialogContent>
				<DialogActions>
					<Button color="primary" variant="contained" onClick={handleOk}>
						Ok
					</Button>
					<Button color="secondary" variant="contained" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const ManageSlots = (props) => {
	const [allSlots, setAllSlots] = useState([])
	const [allListingsWithoutSlots, setAllListingsWithoutSlots] = useState([])
	const history = useHistory()

	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffGetAllCompaniesWithoutInterviewSlot, props.config).then(({ data }) => {
				if (data.success) setAllListingsWithoutSlots(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
			}),
			Axios.get(placementStaffGetSlotsAndCompanies, props.config).then(({ data }) => {
				if (data.success) setAllSlots(data.message)
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
			<MaterialTable
				options={{ filtering: true }}
				columns={[
					{
						title: 'Slot ID',
						field: 'id',
					},
					{
						title: 'Slot Date',
						field: 'slot_date',
					},
					{
						title: 'Slot Start Time',
						field: 'slot_time',
					},
					{
						title: 'Slot End Time',
						field: 'slot_end_time',
					},
					{
						title: 'Listings',
						render: (rowData) => <ListingsTable data={rowData} {...props} />,
					},
					{
						title: 'Edit',
						render: (rowData) => <EditSlotDetails data={rowData} {...props} />,
					},
				]}
				icons={tableIcons}
				data={allSlots}
				title="All Interview Slots"
			/>
			<div style={{ padding: 15 }} />
			<Container style={{ minHeight: 32, display: 'flex' }}>
				<div style={{ flex: 1 }} />
				<AddInterviewSlot {...props} />
			</Container>
			<div style={{ padding: 15 }} />
			<MaterialTable
				options={{ filtering: true }}
				columns={[
					{
						title: 'Listing ID',
						render: (rowData) => rowData.form_2.id,
					},
					{
						title: 'Job Title',
						render: (rowData) => rowData.form_2.Job_Title,
					},
					{
						title: 'Company',
						field: 'Name_of_the_company',
					},
					{
						title: 'Open the company details',
						render: (rowData) => (
							<Button onClick={() => setTimeout(() => history.push(currentAddress + rowData.id), 0)}>
								Open
							</Button>
						),
					},
				]}
				icons={tableIcons}
				data={allListingsWithoutSlots}
				title="All Listings Without Interview Slots"
			/>
			<div style={{ padding: 15 }} />
		</div>
	)
}

export default ManageSlots
