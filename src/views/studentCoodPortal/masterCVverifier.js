import React, { useContext, useState } from 'react'

import renderHTML from 'react-render-html'

import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Button,
	IconButton,
	List,
	ListItem,
	ListItemSecondaryAction,
	Typography,
} from '@material-ui/core'
import { Check as CheckIcon, Close as CloseIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons'
import { useConfirm } from 'material-ui-confirm'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'
import { LoadingContext, studentCoodVerifyPoint } from '.'

const MasterCVVerifier = ({ studentDetails, allotedStudentsAddress, updateData, ...props }) => {
	const confirm = useConfirm()
	const history = useHistory()
	const Loading = useContext(LoadingContext)
	const masterCV = studentDetails.cv_points
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
			.catch(() => { })
	}
	const handleSave = () => {
		confirm()
			.then(async () => {
				Loading.startLoading()
				const { data } = await Axios.post(
					studentCoodVerifyPoint,
					{
						verified: verifyList,
						flagged: flagList,
					},
					props.config
				).catch((error) => {
					props.newSnack('Connection Error', 'error')
					console.log(error)
				})
				if (data.success) {
					props.newSnack(data.message, 'success')
					updateData()
					setFlagList([])
					setVerifyList([])
					history.push(allotedStudentsAddress)
				} else {
					props.newSnack(data.message, 'warning')
				}
				Loading.stopLoading()
			})
			.catch(() => { })
	}

	return (
		<div>
			<div>
				<Button
					variant="outlined"
					onClick={() => setTimeout(() => history.push(allotedStudentsAddress))}
					startIcon={<ChevronLeftIcon />}
				>
					Back
				</Button>
			</div>
			<div style={{ padding: 8 }} />
			<div style={{ display: 'flex' }}>
				<Typography variant="h6">
					{studentDetails.details.student_name} - {studentDetails.details.email}
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
										point.verified === 1 && <ListItem divider key={`item-${index2}`}>
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

export default MasterCVVerifier
