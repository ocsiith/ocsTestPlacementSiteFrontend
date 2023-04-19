import Axios from 'axios'
import {
	Button,
	Container,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Divider,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
	Accordion,
	AccordionDetails,
	AccordionSummary,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	ButtonGroup,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import renderHTML from 'react-render-html'

import { Check as CheckIcon, Close as CloseIcon } from '@material-ui/icons'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import MaterialTable from 'material-table'
import React, { useEffect, useState } from 'react'
import { Route, useHistory } from 'react-router-dom'
import tableIcons from '../../../../constants/tableIcons'

import {
	placementStaffGetStudentsList,
	placementStaffStudentMasterCVstatus,
	placementStaffGetStudentDetails,
	placementStaffVerifyPersonalDetails,
	placementStaffVerifyMasterCVPoint,
} from '../../index'
import { useConfirm } from 'material-ui-confirm'

const currentAddress = '/topsecreturlforplacementstaff/portal/students/'

const MasterCVVerifier = ({ studentDetails, student, updateData, ...props }) => {
	const confirm = useConfirm()
	const history = useHistory()
	const Loading = {
		startLoading: () => props.setLoading(true),
		stopLoading: () => props.setLoading(false),
		loading: false,
	}
	const masterCV = studentDetails.master_cv.message
	const [verifyList, setVerifyList] = useState([])
	const [flagList, setFlagList] = useState([])

	const verifyPoint = (pointId, headingId) => {
		setVerifyList((prevState) =>
			prevState.includes(headingId) ? [...prevState, pointId] : [...prevState, pointId, headingId]
		)
		setFlagList((prevState) => prevState.filter((id) => id !== pointId))
	}
	const flagPoint = (pointId) => {
		setFlagList((prevState) => [...prevState, pointId])
		setVerifyList((prevState) => prevState.filter((id) => id !== pointId))
	}
	const handleReset = () => {
		confirm()
			.then(() => {
				setVerifyList([])
				setFlagList([])
			})
			.catch(() => {})
	}
	const handleSave = () => {
		confirm()
			.then(async () => {
				Loading.startLoading()
				const { data } = await Axios.post(
					placementStaffVerifyMasterCVPoint,
					{
						verified: verifyList,
						flagged: flagList,
					},
					props.config
				).catch((error) => {
					props.newSnack('Connection Error', 'error')
					console.log(error)
					Loading.stopLoading()
				})
				if (data.success) {
					props.newSnack(data.message, 'success')
					updateData()
					setFlagList([])
					setVerifyList([])
					history.push(props.address)
				} else {
					props.newSnack(data.message, 'warning')
				}
				Loading.stopLoading()
			})
			.catch(() => {})
	}

	return (
		<div>
			<div style={{ display: 'flex' }}>
				<Typography variant="h6">
					{student.student_name} - {student.email}
				</Typography>
				<div style={{ flex: 1 }} />
				<Button
					variant="contained"
					color="primary"
					onClick={handleSave}
					disabled={Loading.loading || (!verifyList.length && !flagList.length)}
				>
					Save
				</Button>
				<Button
					variant="contained"
					color="secondary"
					onClick={handleReset}
					disabled={Loading.loading || (!verifyList.length && !flagList.length)}
				>
					Reset
				</Button>
			</div>
			<div style={{ padding: 8 }} />
			<div>
				{masterCV.map((heading, index1) =>
					!heading.fields.length ? (
						<React.Fragment key={`item-${index1}`} />
					) : (
						<Accordion key={`item-${index1}`} TransitionProps={{ unmountOnExit: true }}>
							<AccordionSummary>
								<Typography variant="button">{heading.info}</Typography>
							</AccordionSummary>
							<AccordionDetails>
								<List style={{ width: '100%' }}>
									{heading.fields.map((point, index2) => (
										<ListItem divider key={`item-${index2}`}>
											{renderHTML(point.info)}
											<ListItemSecondaryAction>
												<IconButton
													color="primary"
													disabled={point.verified === 2 || verifyList.includes(point.id)}
													onClick={() => verifyPoint(point.id, heading.id)}
												>
													<CheckIcon />
												</IconButton>
												<IconButton
													color="secondary"
													disabled={point.verified !== 1 || flagList.includes(point.id)}
													onClick={() => flagPoint(point.id)}
												>
													<CloseIcon />
												</IconButton>
											</ListItemSecondaryAction>
										</ListItem>
									))}
								</List>
							</AccordionDetails>
						</Accordion>
					)
				)}
			</div>
		</div>
	)
}

const StudentDetails = (props) => {
	const history = useHistory()
	const confirm = useConfirm()

	const [studentDetails, setStudentDetails] = useState({})
	const [remarks, setRemarks] = useState('')
	const [remarksOpen, setRemarksOpen] = useState(false)

	useEffect(() => {
		props.setLoading(true)
		Axios.post(placementStaffGetStudentDetails, { id: props.student.id }, props.config)
			.then(({ data }) => {
				if (data.success) setStudentDetails(data.message)
				else props.newSnack(data.message)
				props.setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				props.newSnack('Connection Error', 'error')
				props.setLoading(false)
			})
		// eslint-disable-next-line
	}, [props.updated])

	const handleMarkAsVerified = () => {
		confirm()
			.then(async () => {
				const { data } = await Axios.post(
					placementStaffVerifyPersonalDetails,
					{
						id: props.student.id,
						verified: true,
					},
					props.config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				if (data.success) props.updateData()
			})
			.catch(() => {})
	}
	const handleMarkAsFlagged = () => {
		confirm()
			.then(async () => {
				const { data } = await Axios.post(
					placementStaffVerifyPersonalDetails,
					{
						id: props.student.id,
						verified: false,
						remarks,
					},
					props.config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
					setRemarksOpen(false)
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				if (data.success) props.updateData()
				setRemarksOpen(false)
			})
			.catch(() => {})
	}

	if (!studentDetails.personal_details) return <></>

	return (
		<div>
			<Route path={currentAddress + props.student.id} exact>
				<Dialog
					open={remarksOpen}
					maxWidth="lg"
					fullWidth
					TransitionProps={{ unmountOnExit: true }}
					onClose={() => setRemarksOpen(false)}
				>
					<DialogTitle>Remarks</DialogTitle>
					<DialogContent>
						<TextField
							fullWidth
							value={remarks}
							variant="outlined"
							label="Remarks"
							onChange={(e) => {
								e.preventDefault()
								setRemarks(e.target.value)
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={() => handleMarkAsFlagged()}>
							OK
						</Button>
					</DialogActions>
				</Dialog>
				<Button variant="outlined" onClick={() => history.push(currentAddress)}>
					Back
				</Button>
				<div style={{ padding: 6 }} />
				<ButtonGroup>
					<Button
						variant="contained"
						color="primary"
						onClick={() => history.push(currentAddress + props.student.id + '/mastercv')}
						style={{ marginRight: '5px' }}
					>
						Master CV Verifier
					</Button>
					<Button
						variant="contained"
						color="primary"
						href={studentDetails.personal_details && studentDetails.personal_details.Gdrive}
						target="_blank"
						rel="noreferrer"
						disabled={studentDetails.personal_details.Gdrive === null}
					>
						Proofs
					</Button>
				</ButtonGroup>
				<div style={{ padding: 6 }} />
				<div>
					<DialogTitle style={{ minHeight: 32 }}>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span>
								{props.student.student_name} - {props.student.email}
							</span>
							<div style={{ flex: 1 }} />
						</div>
					</DialogTitle>
					<Container>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Class</TableCell>
										<TableCell>Year</TableCell>
										<TableCell>School</TableCell>
										<TableCell>Board</TableCell>
										<TableCell>Marks/CGPA</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>XII</TableCell>
										<TableCell>{studentDetails.personal_details.Passing_Year_XII}</TableCell>
										<TableCell>{studentDetails.personal_details.School_XII}</TableCell>
										<TableCell>{studentDetails.personal_details.Board_XII}</TableCell>
										<TableCell>{studentDetails.personal_details.Marks_XII}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>X</TableCell>
										<TableCell>{studentDetails.personal_details.Passing_Year_X}</TableCell>
										<TableCell>{studentDetails.personal_details.School_X}</TableCell>
										<TableCell>{studentDetails.personal_details.Board_X}</TableCell>
										<TableCell>{studentDetails.personal_details.Marks_X}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						<Divider />
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>JEE Advanced Rank</TableCell>
										<TableCell>JEE Advanced Category Rank</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									<TableRow>
										<TableCell>{studentDetails.personal_details.JEE_Advanced_Rank}</TableCell>
										<TableCell>{studentDetails.personal_details.JEE_Advanced_Cat_Rank}</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
						<Divider />
						<div style={{ padding: 8 }} />
						<Typography variant="h6">Current Degree at IITH</Typography>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Degree</TableCell>
										<TableCell>CGPA</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{studentDetails.degree_at_iith &&
										studentDetails.degree_at_iith.map((degree, index) => (
											<TableRow key={`item-${index}`}>
												<TableCell>{degree.degree}</TableCell>
												<TableCell>{degree.CGPA}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						<Divider />
						<div style={{ padding: 8 }} />
						<Typography variant="h6">Previous Degrees</Typography>
						<TableContainer>
							<Table>
								<TableHead>
									<TableRow>
										<TableCell>Year</TableCell>
										<TableCell>Degree</TableCell>
										<TableCell>Institute</TableCell>
										<TableCell>Marks/CGPA</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{studentDetails.prev_degree &&
										studentDetails.prev_degree.map((degree, index) => (
											<TableRow key={`item-${index}`}>
												<TableCell>{degree.Passing_Year}</TableCell>
												<TableCell>{degree.Degree}</TableCell>
												<TableCell>{degree.INSTITUTE}</TableCell>
												<TableCell>{degree.Marks}</TableCell>
											</TableRow>
										))}
								</TableBody>
							</Table>
						</TableContainer>
						<Divider />
						<div style={{ padding: 8 }} />
						<Typography variant="h6">Other Details</Typography>
						<div>
							<pre style={{ fontFamily: 'Roboto, Helvetica, Arial, sans-serif' }}>
								<div>
									<span>Postal Address:</span> {studentDetails.personal_details.postal_address}
								</div>
								<div>
									<span>Permanent Address:</span> {studentDetails.personal_details.permanent_address}
								</div>
								<div>
									<span>Secondary Email:</span> {studentDetails.personal_details.email_other}
								</div>
								<div>
									<span>Date of Birth:</span> {studentDetails.personal_details.date_of_birth}
								</div>
								<div>
									<span>Gender:</span> {studentDetails.personal_details.gender}
								</div>
								<div>
									<span>Category:</span> {studentDetails.personal_details.category}
								</div>
							</pre>
						</div>
					</Container>
					<Container style={{ minHeight: 32, display: 'flex' }}>
						<div style={{ flex: 1 }} />
						<Button
							color="primary"
							variant="contained"
							onClick={handleMarkAsVerified}
							style={{ marginRight: '5px' }}
							disabled={!(props.student.Master_CV_status === 2 || props.student.Master_CV_status === 5)}
						>
							Mark as Verified
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={() => setRemarksOpen(true)}
							disabled={!(props.student.Master_CV_status === 2 || props.student.Master_CV_status === 5)}
						>
							Flag This
						</Button>
					</Container>
				</div>
			</Route>
			<Route path={currentAddress + props.student.id + '/mastercv'}>
				<Button variant="outlined" onClick={() => history.push(currentAddress + props.student.id)}>
					Back
				</Button>
				<div style={{ padding: 6 }} />
				<MasterCVVerifier
					studentDetails={studentDetails}
					address={currentAddress + props.student.id}
					{...props}
				/>
			</Route>
		</div>
	)
}

const StudentManager = (props) => {
	const history = useHistory()
	const [studentData, setStudentData] = useState([])
	const [masterCVStatuses, setMasterCVStatuses] = useState({})
	useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffGetStudentsList, props.config).then(({ data }) => {
				if (data.success) setStudentData(data.message)
				else props.newSnack(data.message)
			}),
			Axios.get(placementStaffStudentMasterCVstatus, props.config).then(({ data }) => {
				setMasterCVStatuses(data)
			}),
		])
			.then(() => {
				props.setLoading(false)
			})
			.catch((error) => {
				console.log(error)
				props.newSnack('Connection Error', 'error')
				props.setLoading(false)
			})
		// eslint-disable-next-line
	}, [props.updated])
	return (
		<div>
			<Route path={currentAddress} exact>
				<div>
					<MaterialTable
						title="Students Details"
						data={studentData}
						icons={tableIcons}
						columns={[
							{
								title: 'Name',
								field: 'student_name',
							},
							{
								title: 'Email',
								field: 'email',
							},
							{
								title: 'Internship/Placement',
								field: 'placement',
								lookup: { 0: 'Internship', 1: 'Placement' },
							},
							{
								title: 'Placed in',
								field: 'placed_in',
							},
							{
								title: 'Academic details verification status',
								field: 'Master_CV_status',
								lookup: masterCVStatuses,
							},
							{
								title: 'Actions',
								render: (rowData) => (
									<Tooltip title="Open">
										<Button
											href={currentAddress + rowData.id}
											onClick={(e) => e.preventDefault(history.push(currentAddress + rowData.id))}
										>
											<ChevronRightIcon />
										</Button>
									</Tooltip>
								),
							},
						]}
						options={{
							actionsColumnIndex: -1,
							search: false,
							filtering: true,
							pageSizeOptions: [5, 10, 15, 50, 100, studentData.length],
							pageSize: 5,
						}}
					/>
				</div>
			</Route>
			{studentData.map((student) => (
				<Route path={currentAddress + student.id} key={student.id}>
					<StudentDetails student={student} {...props} />
				</Route>
			))}
		</div>
	)
}

export default StudentManager
