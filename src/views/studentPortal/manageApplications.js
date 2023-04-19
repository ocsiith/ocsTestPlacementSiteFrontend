import React, { useState } from 'react'

import { studentGetAllApplications, studentUnregisterListing, applicationStatusLookup } from '../../constants/addresses'
import Axios from 'axios'

import MaterialTable from 'material-table'
import materialTableIcons from '../../constants/tableIcons'

import Fade from '@material-ui/core/Fade'
import { Button, Typography } from '@material-ui/core'
import { useConfirm } from 'material-ui-confirm'
import { Link } from 'react-router-dom'

const AllApplications = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
	const [Data, setData] = useState([])
	const [applicationLookup, setApplicationLookup] = useState({})
	const confirm = useConfirm()

	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(studentGetAllApplications, config)
				.then(({ data }) => {
					if (data.success) {
						const newData = []
						data.message.forEach((app) => {
							newData.push({
								id: app.id,
								listings_id: app.listings_id,
								company: app.form_1.Name_of_the_company,
								job_title: app.form_2.Job_Title,
								status: app.status,
								slot_details: app.slot_details,
								unregister: app.unregister,
							})
						})
						setData(newData)
					} else props.newSnack(data.message, data.success ? 'info' : 'error')
				})
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				}),
			Axios.get(applicationStatusLookup)
				.then(({ data }) => setApplicationLookup(data))
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				}),
		]).finally(() => props.setLoading(false))
		// eslint-disable-next-line
	}, [props.updated])

	const columns = [
		{
			title: 'Company',
			field: 'company',
			render: (rowData) => (
				<Link to={`/login/student/portal/allcompanies/${rowData.listings_id}`}>{rowData.company}</Link>
			),
		},
		{
			title: 'Job Title',
			field: 'job_title',
		},
		{
			title: 'Status',
			field: 'status',
			render: (rowData) => {
				const { text, colour } = applicationLookup[`${rowData.status}`] || { text: 'Invalid', colour: 'white' }
				return <Typography style={{ color: colour }}>{`${text}`}</Typography>
			},
			lookup: {
				0: 'You are Registered',
				1: 'You are not Shortlisted',
				2: 'You are Shortlisted',
				3: 'You are Placed',
			},
		},
		{
			title: 'Slot Details',
			render: (rowData) =>
				rowData.slot_details ? (
					<div style={{ minWidth: 100 }}>
						<p>Date: {rowData.slot_details.slot_date}</p>
						<p>Time: {rowData.slot_details.slot_time}</p>
						<p>To: {rowData.slot_details.slot_end_time}</p>
					</div>
				) : (
					'TBA'
				),
		},
		{
			title: 'Unregister',
			render: (rowData) => (
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => {
						confirm()
							.then(async () => {
								props.setLoading(true)
								const { data } = await Axios.post(
									studentUnregisterListing,
									{ id: rowData.id },
									config
								).catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
								props.newSnack(data.message, data.success ? 'info' : 'error')
								props.setLoading(false)
								if (data.success) props.updateData()
							})
							.catch(() => {})
					}}
					disabled={!rowData.unregister}
				>
					Unregister
				</Button>
			),
		},
	]

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div>
				<div style={{ padding: 20 }} />
				<MaterialTable
					title="Applications"
					icons={materialTableIcons}
					data={Data}
					columns={columns}
					options={{
						filtering: true,
						search: false,
					}}
				/>
			</div>
		</Fade>
	)
}

export default AllApplications
