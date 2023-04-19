import React, { useEffect, useState } from 'react'

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

import { studentJobDescriptionFileDownload, studentRegisterForListing } from '../../../constants/addresses'

import { useConfirm } from 'material-ui-confirm'

import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import Select from '@material-ui/core/Select'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Tooltip from '@material-ui/core/Tooltip'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'

import { b64toBlob } from '../../../components/scripts'

const companiesAddress = '/login/student/portal/allcompanies'

const CompanyDetails = (props) => {
	const history = useHistory()
	const confirm = useConfirm()
	const listingDetails = props.data
	const [isEligible, setEligibility] = useState(false)
	const [registerOpen, setRegisterOpen] = useState(false)
	const [CVselected, setCVselected] = useState('')
	const config = { headers: { Authorization: `BEARER ${props.accessToken}` } }

	const handleRegister = () => {
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(
					studentRegisterForListing,
					{ cv_id: CVselected, listings_id: listingDetails.id },
					config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				if (data.success) {
					props.updateData()
					setCVselected('')
					setRegisterOpen(false)
				}
				props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch(() => { })
	}

	const handleChangeCV = (e) => {
		setCVselected(e.target.value)
	}

	const openLinkInNewTab = (openURL) => {
		window.open(openURL, '_blank')
	}

	const handleDownloadJDPDF = async () => {
		const { data } = await Axios.get(studentJobDescriptionFileDownload + listingDetails.id, config).catch(
			(error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			}
		)
		if (data.success) {
			const blobPDF = b64toBlob(data.message, 'application/pdf')
			const blobPDFURL = URL.createObjectURL(blobPDF)
			openLinkInNewTab(blobPDFURL)
		}
	}

	useEffect(() => {
		const eligibleDegrees = props.data.Job_Eligibledegrees
		const studentDegrees = props.studentData
		const studentDegreeIds = studentDegrees.map((degree) =>
			`${degree.degree}`
		)
		const filtered = eligibleDegrees.filter(value => studentDegreeIds.includes(value));
		setEligibility(filtered.length > 0)
	})

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					marginTop: 30,
				}}
			>
				<Dialog
					disableBackdropClick
					fullWidth
					maxWidth="lg"
					TransitionProps={{ unmountOnExit: true }}
					open={registerOpen}
					onClose={() => setRegisterOpen(false)}
				>
					<DialogTitle>Register</DialogTitle>
					<DialogContent>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">Select Resume to be submitted</InputLabel>
							<Select
								fullWidth
								labelId="demo-simple-select-label"
								value={CVselected}
								onChange={handleChangeCV}
							>
								{props.CVs.map((CVname) => (
									<MenuItem key={CVname.id} value={CVname.id}>
										{CVname.name_of_cv}
									</MenuItem>
								))}
							</Select>
						</FormControl>
						<Typography style={{ color: 'red' }}>
							The selected Resume cannot be edited/deleted after confirming.
						</Typography>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={handleRegister}>
							Confirm
						</Button>
						<Button variant="contained" color="secondary" onClick={() => setRegisterOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Container style={{ margin: 30, marginTop: 0 }} component={Paper}>
					<Button
						style={{ margin: 30 }}
						onClick={() => setTimeout(() => history.push(companiesAddress), 0)}
						variant="outlined"
						startIcon={<ArrowBackIosIcon />}
					>
						Back
					</Button>
					<Tooltip title={listingDetails.Registration ? '' : 'Not open'}>
						<span>
							<Button
								disabled={!listingDetails.Registration || listingDetails.registered || !isEligible}
								variant="outlined"
								color="secondary"
								onClick={() => setRegisterOpen(true)}
							>
								Register
							</Button>
						</span>
					</Tooltip>
					<Typography variant="h5" style={{ paddingBottom: 30, paddingLeft: 30 }}>
						{listingDetails.Name_of_the_company}
					</Typography>
					{listingDetails.student_co_od_email && (
						<Container style={{ border: '1px solid black', padding: 16, borderRadius: 6 }}>
							<Typography variant="h6">
								<u>Assigned Coordinator</u>
							</Typography>
							<Typography>
								<Typography component="span">
									<>Name: &nbsp;&nbsp;&nbsp;</>
								</Typography>
								<Typography component="span">{listingDetails.student_co_od_name}</Typography>
								<br />
								<Typography component="span">
									<>Email: &nbsp;&nbsp;</>
								</Typography>
								<Typography component="span">{listingDetails.student_co_od_email}</Typography>
								<br />
								<Typography component="span">
									<>Contact: &nbsp;</>
								</Typography>
								<Typography component="span">{listingDetails.student_co_od_contact}</Typography>
								<br />
							</Typography>
						</Container>
					)}
					<div style={{ padding: 15 }} />
					<TableContainer>
						<Table>
							<TableBody>
								<TableRow>
									<TableCell>Title</TableCell>
									<TableCell>{listingDetails.Job_Title}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Description</TableCell>
									<TableCell>
										<div style={{ whiteSpace: 'pre-wrap', overflow: 'auto', maxHeight: 200 }}>
											{listingDetails.Job_Description_Offered}
										</div>
									</TableCell>
								</TableRow>
								{listingDetails.document && (
									<TableRow>
										<TableCell>Job Description File</TableCell>
										<TableCell>
											<Button
												variant="outlined"
												fullWidth
												color="primary"
												onClick={handleDownloadJDPDF}
											>
												Download Job Description
											</Button>
										</TableCell>
									</TableRow>
								)}
								<TableRow>
									<TableCell>Programmes</TableCell>
									<TableCell>
										<List dense style={{ maxHeight: 200, overflow: 'auto' }}>
											{listingDetails.Job_Eligibledegrees.map((item, key) => (
												<ListItem divider key={key}>
													{props.eligibilityLookupTableData[item]}
												</ListItem>
											))}
										</List>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Skill Set Required</TableCell>
									<TableCell>{listingDetails.Job_Description}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Company</TableCell>
									<TableCell>{listingDetails.Name_of_the_company}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Website</TableCell>
									<TableCell>
										<a
											href={
												listingDetails.Website.includes('://')
													? listingDetails.Website
													: `http://${listingDetails.Website}`
											}
											target="_blank"
											rel="noopener noreferrer"
										>
											{listingDetails.Website}
										</a>
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Nature of Business</TableCell>
									<TableCell>{listingDetails.Nature_of_Business}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Type of Organization</TableCell>
									<TableCell>{listingDetails.Type_of_Organization}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Joining Date</TableCell>
									<TableCell>{listingDetails.Joining}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Job Location</TableCell>
									<TableCell>
										{listingDetails.Job_Location_Name} | {listingDetails.Job_Location_Code}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>Test rounds</TableCell>
									<TableCell>
										{listingDetails.Aptitude_Test ? <Button>Aptitude test</Button> : ''}
										{listingDetails.Group_Discussion ? <Button>Group Discussion</Button> : ''}
										{listingDetails.HR_Interview ? <Button>HR Interview</Button> : ''}
										{listingDetails.Online_Test ? <Button>Online Test</Button> : ''}
										{listingDetails.Personal_Interview ? <Button>Personal Interview</Button> : ''}
										{listingDetails.Shortlist_from_Resumes ? (
											<Button>Shortlist from Resumes</Button>
										) : (
											''
										)}
										{listingDetails.Technical_Interview ? <Button>Technical Interview</Button> : ''}
										{listingDetails.Technical_Test ? <Button>Technical Test</Button> : ''}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell>No. of vacancies</TableCell>
									<TableCell>{listingDetails.Tentative_No_of_Vacancies}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
					<div style={{ padding: 15 }} />
					<Typography variant="h6">Programme wise CTC</Typography>
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Programme</TableCell>
									<TableCell>{props.placement ? 'CTC' : 'Stipend'}</TableCell>
									<TableCell>{props.placement ? 'Gross' : 'Duration'}</TableCell>
									<TableCell>Min CGPA</TableCell>
									<TableCell>{props.placement ? 'CTC Breakup' : 'Type'}</TableCell>
									<TableCell>{props.placement ? 'Service Type' : 'PPO'}</TableCell>
									{props.placement ? <TableCell>Remarks</TableCell> : ''}
								</TableRow>
							</TableHead>
							<TableBody>
								{listingDetails.Salary_Details.map((item, key) => (
									<TableRow key={key}>
										<TableCell>
											{props.eligibilityLookupTableData[item.name_of_programme]}
										</TableCell>
										<TableCell>{item.CTC}</TableCell>
										<TableCell>{item.Gross}</TableCell>
										<TableCell>{item.MinCGPA}</TableCell>
										<TableCell>{item.CTC_Breakup}</TableCell>
										<TableCell>{item.Service_Type}</TableCell>
										{props.placement ? <TableCell>{item.Service_Type_Remarks}</TableCell> : ''}
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</Container>
			</div>
		</Fade>
	)
}

export default CompanyDetails
