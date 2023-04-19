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
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import MenuOpenIcon from '@material-ui/icons/MenuOpen'
import { Tooltip } from '@material-ui/core'

import { useConfirm } from 'material-ui-confirm'

// import renderHTML from 'react-render-html'

import ManageIndivListings from './manageIndivListing'
// import SendNotifications from "./SendNotifications"
import {
	studentCoodGetCompanyDetails,
	studentCoodGetContact,
	studentCoodGetRegisteredStudents,
	studentCoodGetShortlistStudents,
	studentCoodDeadline,
	studentCoodUploadRound,
} from './index'

import { placementCoodDeadline, eligibilityLookup } from '../../constants/addresses'

import { LoadingContext } from './index'

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
			.catch(() => { })
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

export const UpdateDeadline = (props) => {
	const [open, setOpen] = React.useState(false)
	const [deadline, setDeadline] = React.useState(props.data.deadline)

	const handleSend = () => {
		Axios.post(
			props.address ? placementCoodDeadline : studentCoodDeadline,
			{ id: props.data.id, deadline },
			props.config
		)
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
			<Tooltip title={props.title}>
				<Button
					variant={!props.data.updatedeadline ? 'outlined' : 'contained'}
					style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
					disabled={!props.data.updatedeadline}
					color="primary"
					fullWidth
					onClick={() => setOpen(true)}
				>
					Update Deadline
				</Button>
			</Tooltip>
			<Dialog open={open} fullWidth>
				<DialogTitle>Update Deadline for: {props.data.Job_Title}</DialogTitle>
				<DialogContent>
					<TextField
						value={deadline}
						onChange={(e) => setDeadline(e.target.value)}
						// label="Deadline"
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
	const [open, setOpen] = React.useState(false)
	return (
		<div>
			<Tooltip title="Listing Options">
				<Button variant="contained" color="primary" onClick={() => setOpen(true)}>
					<MenuOpenIcon fontSize="small" />
				</Button>
			</Tooltip>
			<Dialog open={open} fullWidth maxWidth="xl" disableBackdropClick={false}>
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
	console.log(props)
	const history = useHistory()
	const [tableData, setTableData] = React.useState([])
	const [courses_map, setCourses_map] = React.useState({});
	const currentAddress = props.currentAddress + '/' + props.companyId

	React.useEffect(() => {
		Axios.get(eligibilityLookup)
			.then(({ data }) => {
				setCourses_map(data)
				// if (data.success) setLookupTableData(data.message)
				// else snackFunc.newSnack(data.message, 'warning')
			})
			.catch((error) => {
				// if (error.response.status !== undefined && error.response.status === 304) {
				// 	console.log(error.response)
				// 	setLookupTableData(error.response.data)
				// } else {
				// snackFunc.newSnack('Connection Error', 'error')
				window.alert("Connection Error")
				// }
			})
	}, [])

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
			title: 'Current Status',
			field: 'current_status',
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Skill set required',
			field: 'Job_Description',
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Salary_Details',
			render: (rowData) => (
				<DialogButton title="Salary Details">
					<MaterialTable
						columns={[
							// {
							// 	title: 'ID',
							// 	field: 'id',
							// },
							{
								title: 'Programme',
								render: (rowData2) => props.eligibilityLookupTableData[rowData2.name_of_programme],
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
						]}
						icons={tableIcons}
						title={rowData.Job_Title}
						data={rowData.Salary_Details}
					/>
				</DialogButton>
			),
			//cellStyle: { border: '1px solid' },
		},
		{
			title: 'Eligible Degrees',
			render: (rowData) => (
				<DialogButton title="Eligible Degrees">

					{rowData.Job_Eligibledegrees.map((data) => (<>{props.eligibilityLookupTableData[data]}<br /></>))}

				</DialogButton>
			),
			//cellStyle: { border: '1px solid' },
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
							Registered Roll Numbers
						</Button>
						<Button
							variant="outlined"
							style={{ width: '50%', marginBottom: '10px' }}
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
							style={{ width: '50%', marginBottom: '10px' }}
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
							Shortlisted Roll Numbers
						</Button>
						<Button
							variant="contained"
							style={{ width: '50%', marginBottom: '10px' }}
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
					lookupTable={props.eligibilityLookupTableData}
					listing={rowData}
					updated={1}
					setLoading={() => { }}
					config={props.config}
				/>
			),
			//cellStyle: { border: '1px solid' },
		},
	]

	React.useEffect(() => {
		const data = JSON.parse(JSON.stringify(props.data))
		if (data.length === 0) return
		setTableData(data)
		// eslint-disable-next-line
	}, [props.data])

	return (
		<div>
			<Route path={currentAddress} exact>
				<div style={{ padding: '10px' }}></div>
				<Button
					style={{ marginBottom: '10px' }}
					variant="outlined"
					onClick={() => history.push(props.currentAddress)}
				>
					Back
				</Button>
				<MaterialTable
					title="Listings"
					icons={tableIcons}
					columns={columns}
					data={tableData}
					options={{ filtering: true }}
				/>
			</Route>
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
						history.push(currentAddress + '/' + rowData.profile_id)
					}}
					target="_blank"
					rel="noopener noreferrer"
					href={currentAddress + '/' + rowData.profile_id}
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
			<Route path={currentAddress} exact>
				<div>
					<MaterialTable
						title="Companies"
						icons={tableIcons}
						columns={columns}
						data={tableData}
						options={{ filtering: true }}
					/>
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
				</div>
			</Route>
			<div>
				{tableData.map((companyData, key) => (
					<Route path={currentAddress + '/' + companyData.profile_id} key={key}>
						<DialogTable
							eligibilityLookupTableData={props.eligibilityLookupTableData}
							updateData={updateData}
							newSnack={props.newSnack}
							config={config}
							accessToken={props.accessToken}
							data={companyData.form_2}
							currentAddress={currentAddress}
							companyId={companyData.profile_id}
							companyData={companyData}
						/>
					</Route>
				))}
			</div>
			<div style={{ padding: 10 }} />
		</div>
	)
}

export default Portal
