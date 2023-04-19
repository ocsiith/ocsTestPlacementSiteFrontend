import React, { useState } from 'react'

import Axios from 'axios'

import { Route, useHistory } from 'react-router-dom'

import CVassembler from './CVassembler'

import { studentCVName, studentCreateCV, studentDeleteCV } from '../../../constants/addresses'

import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'

import { useConfirm } from 'material-ui-confirm'

import CancelIcon from '@material-ui/icons/Close'
import { Paper, Container, ListItemIcon } from '@material-ui/core'

const currentLocation = '/login/student/portal/documents/'

const ManageDocuments = (props) => {
	const history = useHistory()
	const confirm = useConfirm()
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
	const [allCVs, setAllCVs] = useState([])
	const [newCVName, setNewCVName] = useState('')
	const [newCVOpen, setNewCVOpen] = useState(false)

	React.useEffect(() => {
		props.setLoading(true)
		Axios.get(studentCVName, config)
			.then(({ data }) => {
				setAllCVs(data.message)
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const handleCreateNewCV = () => {
		setNewCVOpen(true)
	}

	const createNewCV = async () => {
		props.setLoading(true)
		await Axios.post(studentCreateCV, { name_of_cv: newCVName, cv: [] }, config).catch((error) =>
			console.error(error)
		)
		//console.log(res.data)
		props.setLoading(false)
		props.updateData()
	}

	const handleClickCV = (CV) => {
		history.push(currentLocation + CV.id)
	}

	const handleDeleteCV = (CV) => {
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(studentDeleteCV, CV, config).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				if (data.success) {
					props.updateData()
				}
				props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch(() => {})
	}

	return (
		<Fade in>
			<>
				<div style={{ padding: 15 }} />
				<Paper>
					<Container>
						<Route path={currentLocation} exact>
							<Fade in>
								<div>
									<Dialog
										maxWidth="lg"
										fullWidth
										open={newCVOpen}
										disableBackdropClick
										TransitionProps={{ unmountOnExit: true }}
									>
										<DialogTitle>Add new Resume</DialogTitle>
										<DialogContent>
											<TextField
												autoFocus
												fullWidth
												variant="outlined"
												value={newCVName}
												onChange={(e) => {
													e.preventDefault()
													setNewCVName(e.target.value)
												}}
											/>
										</DialogContent>
										<DialogActions>
											<Button
												variant="contained"
												color="primary"
												onClick={() => {
													createNewCV()
													setNewCVOpen(false)
												}}
											>
												OK
											</Button>
											<Button
												variant="contained"
												color="secondary"
												onClick={() => setNewCVOpen(false)}
											>
												Cancel
											</Button>
										</DialogActions>
									</Dialog>
									<div style={{ padding: 15 }} />
									<Typography variant="button">Manage Documents</Typography>
									<div style={{ padding: 15 }} />
									<List>
										{allCVs.map((CV, key) => {
											return (
												<ListItem
													divider={key + 1 !== allCVs.length}
													key={key}
													button
													onClick={() => handleClickCV(CV)}
												>
													<ListItemIcon>
														<Typography variant="h6">{key + 1}. </Typography>
													</ListItemIcon>
													<Typography variant="h6">{CV.name_of_cv}</Typography>
													<ListItemSecondaryAction>
														<Tooltip title="Delete this CV (irreversible)">
															<IconButton onClick={() => handleDeleteCV(CV)}>
																<CancelIcon />
															</IconButton>
														</Tooltip>
													</ListItemSecondaryAction>
												</ListItem>
											)
										})}
									</List>
									<div style={{ padding: 15 }} />
									<div style={{ display: 'flex', flexDirection: 'row' }}>
										<Typography style={{ flexGrow: 1 }} />
										<Button variant="contained" color="primary" onClick={handleCreateNewCV}>
											Create New Resume
										</Button>
									</div>
									<div style={{ padding: 15 }} />
								</div>
							</Fade>
						</Route>
						<div>
							{allCVs.map((CV, key) => {
								return (
									<Route key={key} path={currentLocation + CV.id} exact>
										<CVassembler
											currentLocation={currentLocation}
											CV={CV}
											{...props}
											accessToken={props.parentProps.studentCredentials.accessToken}
										/>
									</Route>
								)
							})}
						</div>
					</Container>
				</Paper>
			</>
		</Fade>
	)
}

export default ManageDocuments
