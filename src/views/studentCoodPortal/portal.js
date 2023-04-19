import React, { useContext } from 'react'
import Axios from 'axios'
import { Route, useHistory } from 'react-router-dom'

import MaterialTable from 'material-table'
import tableIcons from '../../constants/tableIcons'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
// import Card from '@material-ui/core/Card'
// import CardContent from '@material-ui/core/CardContent'
// import CardHeader from '@material-ui/core/CardHeader'
// import CardActions from '@material-ui/core/CardActions'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import DialogActions from '@material-ui/core/DialogActions'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import DialogTitle from '@material-ui/core/DialogTitle'

import { useConfirm } from 'material-ui-confirm'

// import renderHTML from 'react-render-html'

import ManageIndivListings from './manageIndivListing'
// import SendNotifications from "./SendNotifications"
import {
	studentCoodGetCompanyDetails,
	// studentCoodGetMyNotifications,
	// studentCoodGetMyNotificationsOfSpecific,
	studentCoodOpenRegistration,
	studentCoodCloseRegistration,
	studentCoodSubmitRegistrations,
	studentCoodUpdateVenue,
	studentCoodGetContact,
	studentCoodGetRegisteredStudents,
	studentCoodGetShortlistStudents,
	// studentCoodMarkAsVerifiedOrRemark,
	studentCoodPutEmptyList,
	studentCoodAlertStudent,
	studentCoodDeadline,
	studentCoodUploadRound,
	studentCoodInterviewState,
} from './index'

import { LoadingContext } from './index'

import LockOpenIcon from '@material-ui/icons/LockOpen'
import LockIcon from '@material-ui/icons/Lock'
import PublishIcon from '@material-ui/icons/Publish'
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined'
import CancelIcon from '@material-ui/icons/Close'
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

import UpdateContact from './updateContact'

import DialogButton from '../../components/dialogButton'

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
					...props.config,
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
				props.updateData()
			})
			.catch(() => {})
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

const UploadExcelDialog = (props) => {
	const [open, setOpen] = React.useState(false)
	return (
		<div>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Upload
			</Button>
			<Dialog maxWidth="lg" open={open} fullWidth>
				<DialogContent>
					<div style={{ padding: 10 }} />
					<Paper>
						<div style={{ padding: 10 }} />
						<Container>
							<Typography variant="h5">Upload Rounds</Typography>
						</Container>
						<div style={{ padding: 10 }} />
						<Container>
							<UploadButton
								newSnack={props.newSnack}
								uploadAddress={studentCoodUploadRound + props.data.id}
								updateData={props.updateData}
								config={props.config}
								id={'UploadXcel' + props.data.id}
								type=".xlsx"
							/>
						</Container>
						<div style={{ padding: 10 }} />
					</Paper>
					<div style={{ padding: 10 }} />
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const UpdateDeadline = (props) => {
	const [open, setOpen] = React.useState(false)
	const [deadline, setDeadline] = React.useState(props.data.deadline)

	const handleSend = () => {
		Axios.post(studentCoodDeadline, { id: props.data.id, deadline }, props.config)
			.then(({ data }) => {
				props.newSnack(data.message, data.success ? 'info' : 'error')
				if (props.success) props.updateData()
				setOpen(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
	}

	return (
		<div>
			<Button variant="contained" onClick={() => setOpen(true)}>
				Update
			</Button>
			<Dialog open={open} fullWidth>
				<DialogTitle>Update Deadline for: {props.data.Job_Title}</DialogTitle>
				<DialogContent>
					<TextField
						value={deadline}
						onChange={(e) => setDeadline(e.target.value)}
						label="Deadline"
						placeholder="yyyy-mm-dd"
						type="datetime-local"
						variant="outlined"
						size="small"
					/>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={handleSend}>
						Send
					</Button>
					<Button variant="contained" color="secondary" onClick={() => setOpen(false)}>
						Cancel
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

export const ManageIndivListingsDialog = (props) => {
	console.log(props.listing)
	const [open, setOpen] = React.useState(false)
	return (
		<div>
			<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
				<MenuOpenIcon fontSize="small" />
			</Button>
			<Dialog open={open} fullWidth maxWidth="xl">
				<DialogContent>
					<ManageIndivListings {...props} />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)}>Close</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const DialogTable = (props) => {
	const history = useHistory()
	const confirm = useConfirm()
	// const [open, setOpen] = React.useState(false)
	const [updateVenueOpen, setUpdateVenueOpen] = React.useState(false)
	const [newVenue, setNewVenue] = React.useState('')
	const [newVenueId, setNewVenueId] = React.useState('')
	const [tableData, setTableData] = React.useState([])

	const columns = [
		{
			title: 'Job Title',
			field: 'Job_Title',
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Job description',
			field: 'Job_Description_Offered',
			render: (rowData) => (
				<div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: 200 }}>
					{rowData.Job_Description_Offered}
				</div>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Skill set required',
			field: 'Job_Description',
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Salary_Details',
			render: (rowData) => <DialogTable2 data={rowData.Salary_Details} />,
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Current Status',
			field: 'current_status',
			//cellStyle: { border: '1px solid' },
		},
		// {
		// 	title: 'Eligible degrees',
		// 	render: (rowData) => (
		// 		<List dense style={{ maxHeight: 200, maxWidth: 200, overflow: 'auto' }}>
		// 			{rowData.Job_Eligibledegrees.map((degree, key) => (
		// 				<ListItem divider key={key}>
		// 					{props.eligibilityLookupTableData[degree]}
		// 				</ListItem>
		// 			))}
		// 		</List>
		// 	),
		// 	//cellStyle: { border: '1px solid' },
		// },
		// {
		// 	title: 'Tests',
		// 	render: (rowData) => (
		// 		<List dense style={{ maxHeight: 200, maxWidth: 200, overflow: 'auto' }}>
		// 			<ListItem divider>{'Aptitude_Test: ' + (rowData.Aptitude_Test ? 'Yes' : 'No')}</ListItem>
		// 			<ListItem divider>{'Group_Discussion: ' + (rowData.Group_Discussion ? 'Yes' : 'No')}</ListItem>
		// 			<ListItem divider>{'HR_Interview: ' + (rowData.HR_Interview ? 'Yes' : 'No')}</ListItem>
		// 			<ListItem divider>{'Online_Test: ' + (rowData.Online_Test ? 'Yes' : 'No')}</ListItem>
		// 			<ListItem divider>{'Personal_Interview: ' + (rowData.Personal_Interview ? 'Yes' : 'No')}</ListItem>
		// 			<ListItem divider>
		// 				{'Shortlist_from_Resumes: ' + (rowData.Shortlist_from_Resumes ? 'Yes' : 'No')}
		// 			</ListItem>
		// 			<ListItem divider>
		// 				{'Technical_Interview: ' + (rowData.Technical_Interview ? 'Yes' : 'No')}
		// 			</ListItem>
		// 			<ListItem divider>{'Technical_Test: ' + (rowData.Technical_Test ? 'Yes' : 'No')}</ListItem>
		// 		</List>
		// 	),
		// 	//cellStyle: { border: '1px solid' },
		// },
		{
			title: 'Copy to clipboard',
			render: (rowData) => (
				<>
					<Button
						variant="outlined"
						onClick={() => {
							props.newSnack('Loading...', 'info')
							Axios.get(studentCoodGetRegisteredStudents + rowData.id, props.config)
								.then(({ data }) => {
									if (data.success) {
										var str = ''
										data.message.map((item) => (str = str + item + ', '))
										copyToClipboard(str)
										props.newSnack('Copied to clipboard : ' + str, 'info')
									} else props.newSnack(data.message, data.success ? 'info' : 'error')
								})
								.catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
						}}
					>
						Registered
					</Button>
					<Button
						variant="outlined"
						onClick={() => {
							props.newSnack('Loading...', 'info')
							Axios.get(studentCoodGetRegisteredStudents + rowData.id, props.config)
								.then(({ data }) => {
									if (data.success) {
										var str = ''
										data.message.map((item) => (str = str + item + '@iith.ac.in, '))
										copyToClipboard(str)
										props.newSnack('Copied to clipboard : ' + str, 'info')
									} else props.newSnack(data.message, data.success ? 'info' : 'error')
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
						onClick={() => {
							props.newSnack('Loading...', 'info')
							Axios.get(studentCoodGetShortlistStudents + rowData.id, props.config)
								.then(({ data }) => {
									if (data.success) {
										var str = ''
										data.message.map((item) => (str = str + item + ', '))
										copyToClipboard(str)
										props.newSnack('Copied to clipboard : ' + str, 'info')
									} else props.newSnack(data.message, data.success ? 'info' : 'error')
								})
								.catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
						}}
					>
						Shortlisted
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							props.newSnack('Loading...', 'info')
							Axios.get(studentCoodGetShortlistStudents + rowData.id, props.config)
								.then(({ data }) => {
									if (data.success) {
										var str = ''
										data.message.map((item) => (str = str + item + '@iith.ac.in, '))
										copyToClipboard(str)
										props.newSnack('Copied to clipboard : ' + str, 'info')
									} else props.newSnack(data.message, data.success ? 'info' : 'error')
								})
								.catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
						}}
					>
						Shortlisted Emails
					</Button>
				</>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'No Selected List',
			render: (rowData) => (
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => {
						confirm()
							.then(async () => {
								const { data } = await Axios.post(
									studentCoodPutEmptyList,
									{ id: rowData.id },
									props.config
								).catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
								props.newSnack(data.message, data.success ? 'info' : 'error')
								if (data.success) props.updateData()
							})
							.catch(() => {})
					}}
				>
					Selected List is not there
				</Button>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Send alert',
			render: (rowData) => (
				<Button
					variant="outlined"
					color="secondary"
					onClick={() => {
						confirm()
							.then(async () => {
								const { data } = await Axios.post(
									studentCoodAlertStudent,
									{ id: rowData.id },
									props.config
								).catch((error) => {
									console.error(error)
									props.newSnack('Connection Error', 'error')
								})
								props.newSnack(data.message, data.success ? 'info' : 'error')
								if (data.success) props.updateData()
							})
							.catch(() => {})
					}}
				>
					Alert students about deadline
				</Button>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Update deadline',
			render: (rowData) => (
				<UpdateDeadline
					config={props.config}
					newSnack={props.newSnack}
					data={rowData}
					updateData={props.updateData}
				/>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Upload Rounds Data',
			render: (rowData) => (
				<UploadExcelDialog
					config={props.config}
					newSnack={props.newSnack}
					data={rowData}
					updateData={props.updateData}
				/>
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
					lookupTable={props.eligibilityLookupTableData}
					listing={rowData}
					updated={1}
					setLoading={() => {}}
				/>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Unlock Interview List',
			render: (rowData) => (
				<Button
					onClick={() =>
						confirm().then(() => {
							Axios.post(studentCoodInterviewState, { id: rowData.id }, props.config)
								.then(({ data }) => props.newSnack(data.message, !data.success && 'error'))
								.catch(() => props.newSnack('Connection Error!', 'error'))

							props.updateData()
						})
					}
					variant="contained"
				>
					Unlock
				</Button>
			),
		},
		// {
		// 	title: 'Remaining Details',
		// 	render: (rowData) => {
		// 		const attrs = []
		// 		for (var attr in rowData) {
		// 			attrs.push(attr)
		// 		}
		// 		return (
		// 			<List dense style={{ maxHeight: 200, maxWidth: 200, overflow: 'auto' }}>
		// 				{attrs.map((attr, key) => (
		// 					<ListItem divider key={key}>
		// 						{attr + ': ' + rowData[attr]}
		// 					</ListItem>
		// 				))}
		// 			</List>
		// 		)
		// 	},
		// 	//cellStyle: { border: '1px solid' },
		// },
	]

	React.useEffect(() => {
		const data = JSON.parse(JSON.stringify(props.data))
		if (data.length === 0) return
		setTableData(data)
		// eslint-disable-next-line
	}, [props.data])

	// const handleOpen = () => {
	// 	setOpen(true)
	// }

	// const handleClose = () => {
	// 	setOpen(false)
	// }

	const handleUpdateVenue = (e, rowData) => {
		setNewVenueId(rowData.id)
		setUpdateVenueOpen(true)
	}

	return (
		<div>
			{/* <Button variant="outlined" onClick={handleOpen}>
				Open
			</Button> */}
			<Dialog
				maxWidth="lg"
				fullScreen
				disableBackdropClick
				TransitionProps={{ unmountOnExit: true }}
				open={true}
				// onClose={handleClose}
			>
				<DialogTitle
					style={{
						margin: 0,
						backgroundColor: '#1976D2',
					}}
				>
					<Button style={{backgroundColor:'white'}} onClick={() => history.push(props.currentAddress)}>
						Back
					</Button>
				</DialogTitle>
				<DialogContent>
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
												studentCoodUpdateVenue,
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
					<MaterialTable
						title="Listings"
						actions={[
							{
								icon: LockOpenIcon,
								tooltip: 'Open Registration',
								onClick: (event, rowData) => {
									confirm()
										.then(async () => {
											const { data } = await Axios.post(
												studentCoodOpenRegistration,
												{ id: rowData.id },
												props.config
											).catch((error) => {
												console.error(error)
												props.newSnack('Connection Error', 'error')
											})
											props.newSnack(data.message, data.success ? 'info' : 'error')
											if (data.success) {
												props.updateData()
												// handleClose()
											}
										})
										.catch(() => {})
								},
							},
							{
								icon: LockIcon,
								tooltip: 'Close Registration',
								onClick: (event, rowData) => {
									confirm()
										.then(async () => {
											const { data } = await Axios.post(
												studentCoodCloseRegistration,
												{ id: rowData.id },
												props.config
											).catch((error) => {
												console.error(error)
												props.newSnack('Connection Error', 'error')
											})
											props.newSnack(data.message, data.success ? 'info' : 'error')
											if (data.success) {
												props.updateData()
												// handleClose()
											}
										})
										.catch(() => {})
								},
							},
							{
								icon: PublishIcon,
								tooltip: 'Submit all registrations',
								onClick: (event, rowData) => {
									confirm({
										description:
											'This action is permanent, you cannot open/close registrations after this!',
									})
										.then(async () => {
											const { data } = await Axios.post(
												studentCoodSubmitRegistrations,
												{ id: rowData.id },
												props.config
											).catch((error) => {
												console.error(error)
												props.newSnack('Connection Error', 'error')
											})
											props.newSnack(data.message, data.success ? 'info' : 'error')
											if (data.success) {
												props.updateData()
												// handleClose()
											}
										})
										.catch(() => {})
								},
							},
							{
								icon: PublishOutlinedIcon,
								tooltip: 'Update venue',
								onClick: handleUpdateVenue,
							},
						]}
						icons={tableIcons}
						columns={columns}
						data={tableData}
						options={{ filtering: true }}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

const DialogTable2 = (props) => {
	const [open, setOpen] = React.useState(false)
	const [columns, setColumns] = React.useState([])
	const [tableData, setTableData] = React.useState([])

	React.useEffect(() => {
		const data = JSON.parse(JSON.stringify(props.data))
		if (data.length === 0) return
		const newColumns = []
		for (var attr in data[0]) {
			newColumns.push({ title: attr, field: attr, cellStyle: { border: '1px solid' } })
		}
		setColumns(newColumns)
		setTableData(data)
		// eslint-disable-next-line
	}, [props.data])

	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button variant="outlined" onClick={handleOpen}>
				Open
			</Button>
			<Dialog maxWidth="lg" fullWidth TransitionProps={{ unmountOnExit: true }} open={open} onClose={handleClose}>
				<DialogContent>
					<MaterialTable
						title=""
						icons={tableIcons}
						columns={columns}
						data={tableData}
						options={{ search: false }}
					/>
				</DialogContent>
			</Dialog>
		</div>
	)
}

function fallbackCopyTextToClipboard(text) {
	var textArea = document.createElement('textarea')
	textArea.value = text

	// Avoid scrolling to bottom
	textArea.style.top = '0'
	textArea.style.left = '0'
	textArea.style.position = 'fixed'

	document.body.appendChild(textArea)
	textArea.focus()
	textArea.select()

	try {
		var successful = document.execCommand('copy')
		var msg = successful ? 'successful' : 'unsuccessful'
		console.log('Fallback: Copying text command was ' + msg)
	} catch (err) {
		console.error('Fallback: Oops, unable to copy', err)
	}

	document.body.removeChild(textArea)
}
export function copyToClipboard(text) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text)
		return
	}
	navigator.clipboard.writeText(text).then(
		function () {
			console.log('Async: Copying to clipboard was successful!')
		},
		function (err) {
			console.error('Async: Could not copy text: ', err)
		}
	)
}

const Portal = (props) => {
	console.log(props)
	const history = useHistory()
	// const confirm = useConfirm()
	const config = { headers: { Authorization: `BEARER ${props.accessToken}` } }
	const [tableData, setTableData] = React.useState([])
	const [updated, setUpdated] = React.useState(0)
	// const [allSentNotifications, setAllSentNotifications] = React.useState([])
	// const [allSentNotificationsToSpecific, setAllSentNotificationsToSpecific] = React.useState([])
	const [studentDetails, setStudentDetails] = React.useState({ student_name: '', email: '', id: '', contact: '' })
	const currentAddress = props.mainPageAddress + 'portal'

	// const [masterCVVerifyRollNo, setMasterCVVerifyRollNo] = React.useState('')
	// const [masterCVVerifyRemarks, setMasterCVVerifyRemarks] = React.useState('')
	// const [masterCVVerify, setMasterCVVerify] = React.useState(true)

	const columns = [
		{
			title: 'Company',
			field: 'Name_of_the_company',
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Listings',
			render: (rowData) => (
				<a
					style={{ color: 'red' }}
					variant="contained"
					onClick={(e) => {
						e.preventDefault()
						history.push(currentAddress + '/' + rowData.id)
					}}
					target="_blank"
					rel="noopener noreferrer"
					href={currentAddress + '/' + rowData.id}
				>
					Open
				</a>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Remaining Details',
			//cellStyle: { border: '1px solid' },
			render: (rowData) => {
				console.log(rowData)
				const attrs = []
				for (var attr in rowData) {
					attrs.push(attr)
				}
				return (
					<DialogButton title="Remaining Details">
						<List dense style={{ overflow: 'auto' }}>
							{attrs.map((attr, key) => (
								<ListItem divider key={key}>
									{attr + ': ' + rowData[attr]}
								</ListItem>
							))}
						</List>
					</DialogButton>
				)
			},
		},
	]

	const updateData = () => {
		setUpdated((prevState) => prevState + 1)
	}

	const setData = (data) => {
		if (data.length === 0) return
		setTableData(data)
	}

	const Loading = useContext(LoadingContext)

	React.useEffect(() => {
		if (props.accessToken === '') {
			history.push(props.mainPageAddress)
			return
		}
		Loading.startLoading()
		Promise.all([
			Axios.get(studentCoodGetCompanyDetails, config)
				.then(({ data }) => {
					//console.log(data)
					if (data.success) setData(data.message)
					else {
						window.sessionStorage.removeItem('studentCoodToken')
						history.push('/topsecreturlforstudentscoods')
					}
				})
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				}),
			// Axios.get(studentCoodGetMyNotifications, config)
			// 	.then(({ data }) => {
			// 		if (data.success) setAllSentNotifications(data.message)
			// 	})
			// 	.catch((error) => {
			// 		console.error(error)
			// 		props.newSnack('Connection Error', 'error')
			// 	}),
			// Axios.get(studentCoodGetMyNotificationsOfSpecific, config)
			// 	.then(({ data }) => {
			// 		if (data.success) setAllSentNotificationsToSpecific(data.message)
			// 	})
			// 	.catch((error) => {
			// 		console.error(error)
			// 		props.newSnack('Connection Error', 'error')
			// 	}),
			Axios.get(studentCoodGetContact, config)
				.then(({ data }) => {
					setStudentDetails(data)
				})
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				}),
		]).then(() => {
			Loading.stopLoading()
		})
		// eslint-disable-next-line
	}, [updated])

	// const handleVerifyMasterCV = () => {
	// 	confirm()
	// 		.then(async () => {
	// 			const { data } = await Axios.post(
	// 				studentCoodMarkAsVerifiedOrRemark,
	// 				{
	// 					rollno: masterCVVerifyRollNo,
	// 					verified: masterCVVerify,
	// 					remarks: masterCVVerify ? undefined : masterCVVerifyRemarks,
	// 				},
	// 				config
	// 			).catch((error) => {
	// 				console.error(error)
	// 				props.newSnack('Connection Error', 'error')
	// 			})
	// 			props.newSnack(data.message, data.success ? 'info' : 'error')
	// 			if (data.success) updateData()
	// 		})
	// 		.catch(() => {})
	// }

	return (
		<div>
			<div>
				<MaterialTable
					title="Companies"
					icons={tableIcons}
					columns={columns}
					data={tableData}
					options={{ filtering: true }}
				/>
				{console.log(tableData)}
				<div style={{ padding: 10 }} />
				<div style={{ padding: 10 }} />
				<UpdateContact
					studentDetails={studentDetails}
					newSnack={props.newSnack}
					config={config}
					updateData={updateData}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={() => history.push(props.mainPageAddress + 'mastercvverifier')}
				>
					Master CV Verifier
				</Button>
				<div>
					{tableData.map((comapanyData, key) => (
						<Route path={currentAddress + '/' + comapanyData.id} key={key}>
							<DialogTable
								eligibilityLookupTableData={props.eligibilityLookupTableData}
								updateData={updateData}
								newSnack={props.newSnack}
								config={config}
								accessToken={props.accessToken}
								data={comapanyData.form_2}
								currentAddress={currentAddress}
							/>
						</Route>
					))}
				</div>
				{/* <SendNotifications newSnack={props.newSnack} config={config} updateData={updateData} />
				<div style={{ padding: 10 }} />
				<Paper>
					<div style={{ padding: 10 }} />
					<Container>
						<Typography variant="h5">Master CV Verification</Typography>
					</Container>
					<div style={{ padding: 10 }} />
					<Container>
						<TextField
							fullWidth
							value={masterCVVerifyRollNo}
							variant="outlined"
							label="Roll No."
							onChange={(e) => setMasterCVVerifyRollNo(e.target.value)}
						/>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={masterCVVerify}
									onChange={(e) => setMasterCVVerify(e.target.checked)}
								/>
							}
							label="All Good"
						/>
						<FormControlLabel
							control={
								<Checkbox
									color="primary"
									checked={!masterCVVerify}
									onChange={(e) => setMasterCVVerify(!e.target.checked)}
								/>
							}
							label="Somethings' not right"
						/>
						<TextField
							value={masterCVVerifyRemarks}
							multiline
							fullWidth
							variant="outlined"
							label="Remarks"
							onChange={(e) => setMasterCVVerifyRemarks(e.target.value)}
						/>
						<Button color="primary" variant="contained" onClick={handleVerifyMasterCV} fullWidth>
							Submit
						</Button>
					</Container>
					<div style={{ padding: 10 }} />
				</Paper>
				<div style={{ padding: 10 }} />
				<div style={{ padding: 10 }} />
				<Container style={{ maxHeight: 500, overflow: 'auto' }}>
					<Typography variant="button">Notifications sent to all</Typography>
					{allSentNotifications.map((notif, key) => (
						<div key={key}>
							<div style={{ padding: 10 }} />
							<Card>
								<CardHeader title={notif.message.title} />
								<CardContent>
									<Typography variant="body2" component="div">
										{renderHTML(notif.message.message)}
									</Typography>
								</CardContent>
								<CardActions>
									<Typography style={{ flexGrow: 1 }} />
									<Typography variant="caption">{notif.date + ' ' + notif.time}</Typography>
								</CardActions>
							</Card>
							<div style={{ padding: 10 }} />
						</div>
					))}
				</Container>
				<div style={{ padding: 10 }} />
				<div style={{ padding: 10 }} />
				<div style={{ padding: 10 }} />
				<Container style={{ maxHeight: 500, overflow: 'auto' }}>
					<Typography variant="button">Specific Notifications</Typography>
					{allSentNotificationsToSpecific.map((notif, key) => {
						return (
							<div key={key}>
								<div style={{ padding: 10 }} />
								<Card>
									<CardHeader title={notif.message.title} />
									<CardContent>
										<Typography variant="body2" component="div">
											{renderHTML(notif.message.message)}
										</Typography>
									</CardContent>
									<CardActions>
										<Typography style={{ flexGrow: 1 }} />
										<Typography variant="caption">{notif.date + ' ' + notif.time}</Typography>
									</CardActions>
								</Card>
								<div style={{ padding: 10 }} />
							</div>
						)
					})}
				</Container> */}
			</div>
			<div style={{ padding: 10 }} />
		</div>
	)
}

export default Portal
