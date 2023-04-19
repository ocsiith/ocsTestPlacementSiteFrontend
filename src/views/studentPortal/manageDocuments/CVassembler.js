import React, { useState } from 'react'

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

import renderHTML from 'react-render-html'

import { studentGetCV, studentMasterCV, studentUpdateCV } from '../../../constants/addresses'
import { pdfCVMakerFileStudent } from '../../../components/pdfCVMaker'
// import { b64toBlob } from '../../../components/scripts'

import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary'
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails'
import ExpansionPanel from '@material-ui/core/Accordion'
import IconButton from '@material-ui/core/IconButton'
import Container from '@material-ui/core/Container'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import CircularProgress from '@material-ui/core/CircularProgress'
import Chip from '@material-ui/core/Chip'

import { useConfirm } from 'material-ui-confirm'

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import AddIcon from '@material-ui/icons/Add'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import CancelIcon from '@material-ui/icons/Close'

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import '../masterCV/styles.css'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'

const pdfMake = require('pdfmake/build/pdfmake')
const vfsFonts = require('pdfmake/build/vfs_fonts')
pdfMake.vfs = vfsFonts.pdfMake.vfs

const GreenSwitch = withStyles({
	switchBase: {
		color: green[300],
		'&$checked': {
			color: green[500],
		},
		'&$checked + $track': {
			backgroundColor: green[500],
		},
	},
	checked: {},
	track: {},
})(Switch)

const DragHandle = sortableHandle(() => <DragHandleIcon />)

const SortableList = sortableContainer((props) => {
	return <List {...props}></List>
})

const SortableListItem = sortableElement((props) => {
	return <ListItem {...props}></ListItem>
})

const SortableDiv = sortableContainer((props) => <div {...props} />)

const SortableExpansionPanel = sortableElement((props) => (
	<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row' }}>
		<Tooltip title="Drag">
			<IconButton style={{ cursor: 'row-resize' }}>
				<DragHandle />
			</IconButton>
		</Tooltip>
		<div style={{ width: '100%' }}>
			<ExpansionPanel {...props} />
		</div>
	</div>
))

const useStyles = makeStyles((theme) => ({
	previewEmbed: {
		width: '100%',
		height: 600,
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	previewEmbedButton: {
		display: 'block',
		marginTop: 20,
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
}))

const CVassembler = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.accessToken}` } }
	const history = useHistory()
	const confirm = useConfirm()
	const classes = useStyles()

	const [theCV, setTheCV] = useState([])
	const [masterCV, setMasterCV] = useState([])
	const [CVname, setCVname] = useState(props.CV.name_of_cv)
	const [previewPDFBlobURL, setPreviewPDFBlobURL] = useState('')

	React.useEffect(() => {
		props.setLoading(true)
		Axios.post(studentGetCV, props.CV, config)
			.then(({ data }) => {
				if (data.success) {
					setTheCV(data.message.cv)
					handlePreview(data.message.cv).then(() => props.setLoading(false))
				}
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		Axios.get(studentMasterCV, config)
			.then(({ data }) => {
				if (data.success) {
					setMasterCV(data.message)
				}
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const handleAddPoint = (point, heading) => {
		const newCV = JSON.parse(JSON.stringify(theCV))
		var pointAdded = false
		newCV.map((item) => {
			if (heading.id === item.id) {
				item.fields.map((point2) => {
					if (point2.id === point.id) {
						pointAdded = true
						props.newSnack('Point already in the CV', 'warning')
					}
					return 0
				})
				if (!pointAdded) item.fields.push(point)
				pointAdded = true
			}
			return 0
		})
		if (!pointAdded) {
			newCV.push({
				id: heading.id,
				info: heading.info,
				fields: [point],
			})
			pointAdded = true
		}
		setTheCV(newCV)
	}
	// eslint-disable-next-line
	const handleAddAllPoints = (heading) => {
		const newCV = JSON.parse(JSON.stringify(theCV))
		var pointAdded = false
		var pointIndex = -1
		newCV.map((item, index) => {
			if (heading.id === item.id) {
				item = JSON.parse(JSON.stringify(heading))
				pointAdded = true
				pointIndex = index
			}
			return 0
		})
		if (!pointAdded) newCV.push(JSON.parse(JSON.stringify(heading)))
		else newCV[pointIndex] = JSON.parse(JSON.stringify(heading))
		setTheCV(newCV)
	}

	const handleSave = async () => {
		props.setLoading(true)
		const { data } = await Axios.post(
			studentUpdateCV,
			{
				id: props.CV.id,
				name_of_cv: CVname,
				cv: theCV,
			},
			config
		).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (data.success) {
			props.newSnack(data.message, data.success ? 'info' : 'error')
			props.updateData()
		} else props.newSnack(data.message, data.success ? 'info' : 'error')
		props.setLoading(false)
	}

	const handlePreview = async (CV) => {
		setPreviewPDFBlobURL('')
		const pdfMakeData = JSON.parse(JSON.stringify(CV))
		// const { data } = await Axios.post(pdfCVMaker, { cv: pdfMakeData }, config).catch((error) => {
		// 	console.error(error)
		// 	props.newSnack('Connection Error', 'error')
		// })
		// if (data.success) {
		// 	const blobPDF = b64toBlob(data.message, 'application/pdf')
		// 	const blobPDFURL = URL.createObjectURL(blobPDF)
		// 	setPreviewPDFBlobURL(blobPDFURL)
		// }
		try {
			const dd = pdfCVMakerFileStudent(
				props.fetchedData,
				pdfMakeData,
				props.parentProps.eligibilityLookupTableData
			)
			const pdfDoc = pdfMake.createPdf(dd)
			pdfDoc.getBlob((data) => {
				const blobPDFURL = URL.createObjectURL(data)
				setPreviewPDFBlobURL(blobPDFURL)
			})
		} catch (err) {
			console.log(err)
			props.newSnack(err, 'error')
		}
	}

	const onSortEndDiv = ({ oldIndex, newIndex }) => {
		const newCV = arrayMove(theCV, oldIndex, newIndex)
		setTheCV(newCV)
	}

	const onSortEndList = ({ oldIndex, newIndex, key }) => {
		const newCV = JSON.parse(JSON.stringify(theCV))
		newCV[key].fields = arrayMove(theCV[key].fields, oldIndex, newIndex)
		setTheCV(newCV)
	}

	const removeHeading = (key) => {
		confirm()
			.then(() => {
				const newCV = theCV.filter((heading, index) => key !== index)
				setTheCV(newCV)
				props.newSnack('Removed a heading', 'info')
			})
			.catch(() => {})
	}

	const removePoint = (key, key2) => {
		const newCV = JSON.parse(JSON.stringify(theCV))
		newCV[key].fields = theCV[key].fields.filter((point, index) => key2 !== index)
		setTheCV(newCV)
	}

	const toggleVisibilityPoint = (checked, key, key2) => {
		const newCV = JSON.parse(JSON.stringify(theCV))
		newCV[key].fields[key2].visibility = checked
		setTheCV(newCV)
	}

	const toggleVisibilityHeading = (checked, key) => {
		const newCV = JSON.parse(JSON.stringify(theCV))
		newCV[key].visibility = checked
		setTheCV(newCV)
	}

	return (
		<Fade in>
			<div>
				<Button
					style={{ marginTop: 30, marginBottom: 30 }}
					onClick={() => setTimeout(() => history.push(props.currentLocation), 0)}
					variant="outlined"
					startIcon={<ArrowBackIosIcon />}
				>
					Back
				</Button>
				<Container>
					<TextField
						variant="outlined"
						label="Name of the Resume"
						value={CVname}
						size="small"
						fullWidth
						onChange={(e) => {
							e.preventDefault()
							setCVname(e.target.value)
						}}
					/>
					<div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end', marginTop: 15 }}>
						<Button disabled={props.loading} variant="contained" color="primary" onClick={handleSave}>
							Save
						</Button>
						<Button
							disabled={props.loading}
							variant="contained"
							color="secondary"
							onClick={() => handlePreview(theCV)}
						>
							Preview
						</Button>
					</div>
				</Container>
				<div style={{ padding: 15 }} />
				<hr />
				<div>
					<Typography variant="h5">Master CV</Typography>
					<div style={{ padding: 15 }} />
					{masterCV
						.filter((heading) => heading.verified === 2)
						.map((heading, key) => (
							<ExpansionPanel TransitionProps={{ unmountOnExit: true }} key={key}>
								<ExpansionPanelSummary>
									<Typography style={{ flexGrow: 1 }}>{heading.info}</Typography>
								</ExpansionPanelSummary>
								<ExpansionPanelDetails>
									<div>
										{/* <Tooltip title="Adds all the points to the current CV">
										<Button onClick={() => handleAddAllPoints(heading)} variant="outlined">
											Add all
										</Button>
									</Tooltip> */}
										<List>
											{heading.fields
												.filter((point) => point.verified === 2)
												.map((point, key2) => (
													<ListItem key={key2}>
														<ListItemIcon>
															<Tooltip title="Add this point to the current CV">
																<IconButton
																	onClick={() => handleAddPoint(point, heading)}
																>
																	<AddIcon />
																</IconButton>
															</Tooltip>
														</ListItemIcon>
														<div>
															{renderHTML(point.info)}
															{point.right_ ? <Chip label={point.right_} /> : <></>}
														</div>
														<Typography style={{ flexGrow: 1 }} />
													</ListItem>
												))}
										</List>
									</div>
								</ExpansionPanelDetails>
							</ExpansionPanel>
						))}
				</div>
				<div style={{ padding: 15 }} />
				<hr />

				<div>
					<Typography variant="h5">Resume: {CVname}</Typography>
					<div style={{ padding: 15 }} />
					<SortableDiv onSortEnd={onSortEndDiv} useDragHandle>
						{theCV.map((heading, key) => {
							return (
								<SortableExpansionPanel TransitionProps={{ unmountOnExit: true }} index={key} key={key}>
									<ExpansionPanelSummary>
										<Typography>{heading.info}</Typography>
									</ExpansionPanelSummary>
									<ExpansionPanelDetails>
										<div style={{ width: '100%' }}>
											<div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
												<Tooltip title="Remove this heading and all its points">
													<Button onClick={() => removeHeading(key)} variant="outlined">
														Remove heading
													</Button>
												</Tooltip>
												<Typography style={{ flexGrow: 1 }} />
												<Tooltip title="Toggle Visibility in Preview">
													<FormControlLabel
														control={
															<GreenSwitch
																size="small"
																checked={
																	heading.visibility === undefined
																		? true
																		: heading.visibility
																}
																onChange={(e) =>
																	toggleVisibilityHeading(e.target.checked, key)
																}
															/>
														}
													/>
												</Tooltip>
											</div>
											<SortableList
												style={{ width: '100%' }}
												onSortEnd={({ oldIndex, newIndex }) => {
													return onSortEndList({ oldIndex, newIndex, key })
												}}
												useDragHandle
											>
												{heading.fields.map((point, key2) => {
													return (
														<SortableListItem index={key2} key={key2}>
															<Tooltip title="Drag">
																<ListItemIcon style={{ cursor: 'row-resize' }}>
																	<DragHandle />
																</ListItemIcon>
															</Tooltip>
															<div>
																{renderHTML(point.info)}
																{point.right_ ? <Chip label={point.right_} /> : <></>}
															</div>
															<Typography style={{ flexGrow: 1 }} />
															<ListItemSecondaryAction>
																<Tooltip title="Toggle Visibility in Preview">
																	<FormControlLabel
																		control={
																			<Switch
																				size="small"
																				checked={
																					point.visibility === undefined
																						? true
																						: point.visibility
																				}
																				onChange={(e) =>
																					toggleVisibilityPoint(
																						e.target.checked,
																						key,
																						key2
																					)
																				}
																			/>
																		}
																	/>
																</Tooltip>
																<IconButton onClick={() => removePoint(key, key2)}>
																	<CancelIcon />
																</IconButton>
															</ListItemSecondaryAction>
														</SortableListItem>
													)
												})}
											</SortableList>
										</div>
									</ExpansionPanelDetails>
								</SortableExpansionPanel>
							)
						})}
					</SortableDiv>
				</div>
				<div style={{ padding: 15 }} />
				<hr />
				<div>
					<Typography variant="h5">Preview</Typography>

					<div>
						{previewPDFBlobURL === '' ? (
							<CircularProgress />
						) : (
							<div style={{ width: '100%', height: '100%' }}>
								<div className={classes.previewEmbed}>
									<object data={previewPDFBlobURL} width="100%" height={600}>
										<p>
											Your web browser doesn't have a PDF Plugin. Instead you can
											<a href={previewPDFBlobURL}> Click here to download the PDF</a>
										</p>
									</object>
								</div>
								<a href={previewPDFBlobURL} target="_blank" rel="noopener noreferrer">
									<Button
										variant="contained"
										fullWidth
										color="primary"
										className={classes.previewEmbedButton}
									>
										Download Preview
									</Button>
								</a>
							</div>
						)}
						<div style={{ padding: 15 }} />
					</div>
				</div>
			</div>
		</Fade>
	)
}

export default CVassembler
