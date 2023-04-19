import React, { useContext, useState } from 'react'
import Axios from 'axios'

import RightIcon from '@material-ui/icons/ChevronRight'
import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'

import MaterialTable from 'material-table'

import tableIcons from '../../constants/tableIcons'
import { LoadingContext, studentCoodGetAllotedStudents, studentCoodMarkAsVerifiedOrRemark } from './index'
import { Route, useHistory } from 'react-router-dom'
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	Divider,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Tooltip,
	Typography,
} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import { useConfirm } from 'material-ui-confirm'
import MasterCVVerifier from './masterCVverifier'
import { ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'

const AllotedStudents = (props) => {
	const currentAddress = `${props.mainPageAddress}mastercvverifier/`
	const Loading = useContext(LoadingContext)
	const history = useHistory()
	const confirm = useConfirm()
	const [updated, setUpdated] = useState(0)
	const [allotedStudents, setAllotedStudents] = useState([])
	const [selectedStudent, setSelectedStudent] = useState({
		details: {},
		cv_points: [],
		acad_details: [],
		prev_details: [],
	})
	const [verifyPersonalDetailsOpen, setVerifyPersonalDetailsOpen] = useState(false)
	const [remarks, setRemarks] = useState('')
	const [remarksOpen, setRemarksOpen] = useState(false)

	React.useEffect(() => {
		Loading.startLoading()
		Axios.get(studentCoodGetAllotedStudents, props.config)
			.then(({ data }) => {
				if (data.success) setAllotedStudents(data.message)
				else props.newSnack(data.message, 'warning')
				Loading.stopLoading()
			})
			.catch((error) => {
				props.newSnack('Connection Error', 'error')
				console.log(error)
				Loading.stopLoading()
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [updated])

	// eslint-disable-next-line
	const updateData = () => {
		setUpdated((prevState) => prevState + 1)
	}

	const handleMarkAsVerified = () => {
		confirm()
			.then(async () => {
				const { data } = await Axios.post(
					studentCoodMarkAsVerifiedOrRemark,
					{
						id: selectedStudent.details.id,
						verified: true,
					},
					props.config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				if (data.success) updateData()
			})
			.catch(() => {})
	}
	const handleMarkAsFlagged = () => {
		confirm()
			.then(async () => {
				const { data } = await Axios.post(
					studentCoodMarkAsVerifiedOrRemark,
					{
						id: selectedStudent.details.id,
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
				if (data.success) updateData()
				setRemarksOpen(false)
			})
			.catch(() => {})
	}

	return (
		<div>
			<Route exact path={currentAddress}>
				<div>
					<Button
						variant="outlined"
						onClick={() => setTimeout(() => history.push(props.mainPageAddress + 'portal'))}
						startIcon={<ChevronLeftIcon />}
					>
						Back
					</Button>
				</div>
				<div style={{ padding: 8 }} />
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
				<Dialog
					open={verifyPersonalDetailsOpen}
					maxWidth="lg"
					fullWidth
					TransitionProps={{ unmountOnExit: true }}
					onClose={() => setVerifyPersonalDetailsOpen(false)}
				>
					<DialogTitle>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<span>
								{selectedStudent.details.student_name} - {selectedStudent.details.email}
							</span>
							<div style={{ flex: 1 }} />
							<span>
								<Tooltip title="Close">
									<IconButton
										onClick={() =>
											setSelectedStudent(
												() =>
													setVerifyPersonalDetailsOpen(false) || {
														details: {},
														cv_points: [],
														acad_details: [],
														prev_details: [],
													}
											)
										}
									>
										<CloseIcon />
									</IconButton>
								</Tooltip>
							</span>
						</div>
					</DialogTitle>
					<DialogContent>
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
										<TableCell>{selectedStudent.details.Passing_Year_XII}</TableCell>
										<TableCell>{selectedStudent.details.School_XII}</TableCell>
										<TableCell>{selectedStudent.details.Board_XII}</TableCell>
										<TableCell>{selectedStudent.details.Marks_XII}</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>X</TableCell>
										<TableCell>{selectedStudent.details.Passing_Year_X}</TableCell>
										<TableCell>{selectedStudent.details.School_X}</TableCell>
										<TableCell>{selectedStudent.details.Board_X}</TableCell>
										<TableCell>{selectedStudent.details.Marks_X}</TableCell>
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
										<TableCell>{selectedStudent.details.JEE_Advanced_Rank}</TableCell>
										<TableCell>{selectedStudent.details.JEE_Advanced_Cat_Rank}</TableCell>
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
									{selectedStudent.acad_details.map((degree, index) => (
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
									{selectedStudent.prev_details.map((degree, index) => (
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
								<style>
									{`span {
                    font-weight: bold;
                  }`}
								</style>
								<div>
									<span>Postal Address:</span> {selectedStudent.details.postal_address}
								</div>
								<div>
									<span>Permanent Address:</span> {selectedStudent.details.permanent_address}
								</div>
								<div>
									<span>Secondary Email:</span> {selectedStudent.details.email_other}
								</div>
								<div>
									<span>Date of Birth:</span> {selectedStudent.details.date_of_birth}
								</div>
								<div>
									<span>Gender:</span> {selectedStudent.details.gender}
								</div>
								<div>
									<span>Category:</span> {selectedStudent.details.category}
								</div>
							</pre>
						</div>
					</DialogContent>
					<DialogActions>
						<Button
							color="primary"
							variant="contained"
							disabled={Loading.loading}
							onClick={handleMarkAsVerified}
						>
							Mark as Verified
						</Button>
						<Button
							color="secondary"
							variant="contained"
							disabled={Loading.loading}
							onClick={() => setRemarksOpen(true)}
						>
							Flag This
						</Button>
					</DialogActions>
				</Dialog>
				<MaterialTable
					icons={tableIcons}
					columns={[
						{
							title: 'Email/Roll No.',
							render: (rowData) => rowData.details.email,
							customFilterAndSearch: (filter, rowData) =>
								rowData.details.email.toLowerCase().includes(filter.toLowerCase()),
						},
						{
							title: 'Name',
							render: (rowData) => rowData.details.student_name,
							customFilterAndSearch: (filter, rowData) =>
								rowData.details.student_name.toLowerCase().includes(filter.toLowerCase()),
						},
						{
							title: 'Placement/Internship',
							render: (rowData) => (rowData.details.placement ? 'Placement' : 'Internship'),
							lookup: { 0: 'Internship', 1: 'Placement' },
							customFilterAndSearch: (filter, rowData) => filter.includes(`${rowData.details.placement}`),
							defaultFilter: ['0', '1'],
						},
						{
							title: 'Proofs Link',
							render: (rowData) =>
								rowData.details.Gdrive === null ? (
									<p>Not Uploaded</p>
								) : (
									<a target="_blank" rel="noopener noreferrer" href={rowData.details.Gdrive} style={{color:'blue'}}>
										Open
									</a>
								),
						},
						{
							title: 'Contact',
							render: (rowData) => rowData.details.contact,
							customFilterAndSearch: (filter, rowData) =>
								rowData.details.contact.toLowerCase().includes(filter.toLowerCase()),
						},
					]}
					actions={[
						(rowData) => ({
							icon: CheckIcon,
							tooltip: 'Academic Details',
							disabled: !(
								rowData.details.Master_CV_status === 2 || rowData.details.Master_CV_status === 5
							),
							onClick: (event, rowData) => {
								setSelectedStudent(rowData)
								setVerifyPersonalDetailsOpen(true)
							},
						}),
						{
							icon: RightIcon,
							tooltip: 'Master CV',
							onClick: (event, rowData) => history.push(currentAddress + rowData.details.id),
						},
					]}
					options={{
						actionsColumnIndex: -1,
						search: false,
						filtering: true,
					}}
					title="Alloted Students"
					data={allotedStudents}
					isLoading={Loading.loading}
				/>
			</Route>
			{allotedStudents.map((student) => (
				<Route exact path={currentAddress + student.details.id} key={student.details.id}>
					<MasterCVVerifier
						studentDetails={student}
						allotedStudentsAddress={currentAddress}
						updateData={updateData}
						config={props.config}
						newSnack={props.newSnack}
					/>
				</Route>
			))}
		</div>
	)
}

export default AllotedStudents
