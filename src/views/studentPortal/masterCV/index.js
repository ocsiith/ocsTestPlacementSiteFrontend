import React, { useState } from 'react'

import RichTextEditor from 'react-rte'

import renderHTML from 'react-render-html'

import { studentMasterCV, studentMasterCVforVerification } from '../../../constants/addresses'

import { pdfCVMakerFileStudent } from '../../../components/pdfCVMaker'

import Axios from 'axios'

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import './styles.css'

import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Menu from '@material-ui/core/Menu'
import Switch from '@material-ui/core/Switch'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import CircularProgress from '@material-ui/core/CircularProgress'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'

import { useConfirm } from 'material-ui-confirm'

import CheckIcon from '@material-ui/icons/Check'
import CrossIcon from '@material-ui/icons/Clear'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import DragHandleIcon from '@material-ui/icons/DragHandle'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import RenameIcon from '@material-ui/icons/TextFormat'
import Chip from '@material-ui/core/Chip'

import { withStyles, makeStyles } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import { Link } from 'react-router-dom'

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

const DragHandle = sortableHandle(() => <DragHandleIcon />)

const SortableItem = sortableElement((props) => (
	<ListItem divider dense>
		<Tooltip title="Drag">
			<ListItemIcon style={{ cursor: 'row-resize' }}>
				<DragHandle />
			</ListItemIcon>
		</Tooltip>
		<div style={{ width: '100%', paddingTop: 20, paddingBottom: 20 }}>
			{props.value.info === undefined ? renderHTML('<code>To be deleted</code>') : renderHTML(props.value.info)}
			<div style={{ display: 'flex', width: '100%', justifyContent: 'flex-end' }}>
				{props.value.padding ? <Chip label={`Padding: ${props.value.padding}`} /> : <></>}
				{props.value.right_ ? <Chip label={props.value.right_} /> : <></>}
			</div>
		</div>
		<Typography style={{ flexGrow: 1 }} />
		{props.value.verified === 2 ? (
			<Tooltip title="Verified">
				<CheckIcon color="primary" />
			</Tooltip>
		) : (
			<></>
		)}
		{props.value.verified === 1 ? (
			<Tooltip title="Verification in progress">
				<MoreHorizIcon color="disabled" />
			</Tooltip>
		) : (
			<></>
		)}
		{props.value.verified === 0 ? (
			<Tooltip title="Unverified">
				<CrossIcon color="error" />
			</Tooltip>
		) : (
			<></>
		)}
		<Tooltip title="Edit">
			<IconButton onClick={props.onEdit} disabled={props.value.verified === 2 || props.value.verified === 1}>
				<EditIcon />
			</IconButton>
		</Tooltip>
		<Tooltip title="Toggle Visibility in Preview">
			<FormControlLabel
				control={
					<Switch
						size="small"
						checked={props.value.visibility === undefined ? true : props.value.visibility}
						onChange={(e) => props.toggleVisibility(e.target.checked)}
					/>
				}
			/>
		</Tooltip>
		<Tooltip title="Remove">
			<IconButton onClick={props.onRemove} disabled={props.value.verified === 2 || props.value.verified === 1}>
				<CrossIcon />
			</IconButton>
		</Tooltip>
	</ListItem>
))

const SortableContainer = sortableContainer((props) => {
	return <List {...props}></List>
})

const SortableItemButton = sortableElement((props) => {
	return <ListItem {...props}></ListItem>
})

const SortableSelect = (props) => {
	const handleClick = (key) => {
		if (props.list[key].info !== undefined) props.setCurrentlySelected(key)
	}

	const onSortEnd = ({ oldIndex, newIndex }) => {
		props.setList(arrayMove(props.list, oldIndex, newIndex))
	}

	return (
		<PopupState variant="popover">
			{(popupState) => (
				<div>
					<Tooltip title="Hold and drag to rearrange">
						<Button
							size="medium"
							style={{ color: 'black' }}
							endIcon={<ArrowDropDownIcon />}
							variant="outlined"
							{...bindTrigger(popupState)}
						>
							{props.list[props.currentlySelected].info}
						</Button>
					</Tooltip>
					<Menu {...bindMenu(popupState)}>
						<SortableContainer pressDelay={200} onSortEnd={onSortEnd}>
							{props.list.map((item, key) => {
								return (
									<SortableItemButton
										index={key}
										button
										dense
										key={key}
										onClick={() => {
											popupState.close()
											handleClick(key)
										}}
									>
										{item.info === undefined ? renderHTML('<code>To be deleted</code>') : item.info}
									</SortableItemButton>
								)
							})}
						</SortableContainer>
					</Menu>
				</div>
			)}
		</PopupState>
	)
}

const MasterCV = (props) => {
	const [rteValue, setRteValue] = useState(RichTextEditor.createEmptyValue())
	const [allOfMasterCV, setAllOfMasterCVActual] = useState([{ info: 'Loading...', fields: [{ info: 'Loading...' }] }])
	const [currentlySelected, setCurrentlySelected] = useState(0)
	const [newHeadingOpen, setNewHeadingOpen] = useState(false)
	const [newHeadingTitle, setNewHeadingTitle] = useState('')
	const [renameHeadingOpen, setRenameHeadingOpen] = useState(false)
	const [renameHeadingTitle, setRenameHeadingTitle] = useState('')
	const [pointRightText, setPointRightText] = useState('')
	const [paddingPerPoint, setPaddingPerPoint] = useState('')
	const [masterCVLength, setMasterCVLength] = useState(0)
	const [previewPDFBlobURL, setPreviewPDFBlobURL] = useState('')
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
	const [savingMasterCV, setSavingMasterCV] = useState(false)
	const confirm = useConfirm()
	const classes = useStyles()

	const setAllOfMasterCV = (value) => {
		//uploadMasterCV(value)
		var j = 0
		value.map((point) => {
			if (point.info !== undefined) j++
			return 0
		})
		setMasterCVLength(j)
		const value2 = JSON.parse(JSON.stringify(value))
		value2.forEach(({ fields }) =>
			fields.forEach((field) =>
				field.info
					? (field.info = field.info
							.replace(/<ul>\s+/g, '<ul>')
							.replace(/<\/ul>\s+/g, '</ul>')
							.replace(/<ol>\s+/g, '<ol>')
							.replace(/<\/ol>\s+/g, '</ol>')
							.replace(/<li>\s+/g, '<li>')
							.replace(/<\/li>\s+/g, '</li>')
							.replace(/\s+<ul>/g, '<ul>')
							.replace(/\s+<ol>/g, '<ol>'))
					: ''
			)
		)
		setAllOfMasterCVActual(value2)
		//props.updateData()
	}

	React.useEffect(() => {
		props.setLoading(true)
		Axios.get(studentMasterCV, config)
			.then((res) => {
				//console.log(res.data.message)
				if (!res.data.success) {
					props.setLoading(false)
					props.newSnack(res.data.message)
					return
				}
				setAllOfMasterCV(res.data.message)
				handlePreview(res.data.message).then(() => props.setLoading(false))
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const uploadMasterCV = async (value) => {
		props.newSnack('Syncing Changes', 'info')
		setSavingMasterCV(true)
		const res = await Axios.post(studentMasterCV, { mastercv: value }, config).catch((error) =>
			console.error(error)
		)
		setSavingMasterCV(false)
		if (res.data.success) {
			props.newSnack('Updated successfully', 'info')
		} else {
			props.newSnack(res.data.message, res.data.success ? 'info' : 'error')
		}
		props.updateData()
	}

	const handleChangeRteValue = (value) => {
		setRteValue(value)
	}

	const handleCreatePoint = () => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		const info = `${rteValue.toString('html')}<div style="padding-bottom: ${
			paddingPerPoint ? `${paddingPerPoint}px` : 0
		};"></div>`
		newAllOfMasterCV[currentlySelected].fields.push({
			info: info.replace(/\n/g, ''),
			right_: pointRightText,
			padding: parseInt(paddingPerPoint) || 0,
		})
		setAllOfMasterCV(newAllOfMasterCV)
		handleResetRTE()
		setPointRightText('')
	}

	const handleResetRTE = () => {
		setRteValue(RichTextEditor.createEmptyValue())
	}

	const handleRemovePoint = (index) => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		newAllOfMasterCV[currentlySelected].fields[index].info = undefined
		newAllOfMasterCV[currentlySelected].fields[index].right_ = ''
		newAllOfMasterCV[currentlySelected].fields[index].padding = 0
		setAllOfMasterCV(newAllOfMasterCV)
	}

	const handleOnEdit = (index) => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		setRteValue(
			RichTextEditor.createValueFromString(
				newAllOfMasterCV[currentlySelected].fields[index].info.replace('</div>', '').replace(/<div(.*?)>/g, ''),
				'html'
			)
		)
		setPointRightText(newAllOfMasterCV[currentlySelected].fields[index].right_ || '')
		setPaddingPerPoint(newAllOfMasterCV[currentlySelected].fields[index].padding || '0')
		newAllOfMasterCV[currentlySelected].fields[index].info = undefined
		newAllOfMasterCV[currentlySelected].fields[index].right_ = ''
		newAllOfMasterCV[currentlySelected].fields[index].padding = 0
		setAllOfMasterCV(newAllOfMasterCV)
	}

	console.warn = ((_error) =>
		function (message) {
			if (typeof message === 'string' && message.indexOf('UNSAFE_') === -1) _error.apply(console, arguments)
		})(console.warn)

	const onSortEnd = ({ oldIndex, newIndex }) => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		newAllOfMasterCV[currentlySelected].fields = arrayMove(
			allOfMasterCV[currentlySelected].fields,
			oldIndex,
			newIndex
		)
		setAllOfMasterCV(newAllOfMasterCV)
	}

	const handleAddNewHeading = () => {
		setNewHeadingOpen(true)
	}

	const addNewHeading = () => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		newAllOfMasterCV.push({
			info: newHeadingTitle,
			fields: [],
		})
		setAllOfMasterCV(newAllOfMasterCV)
		setNewHeadingTitle('')
		setNewHeadingOpen(false)
	}

	const handleRemoveHeading = () => {
		confirm()
			.then(() => {
				const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
				if (masterCVLength <= 1) return props.newSnack('Atleast one item should be there', 'warning')
				newAllOfMasterCV[currentlySelected].info = undefined
				setCurrentlySelected(0)
				setAllOfMasterCV(newAllOfMasterCV)
				props.newSnack('It will be removed on Save', 'info')
			})
			.catch(() => {})
	}

	const toggleVisibility = (checked, index) => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		newAllOfMasterCV[currentlySelected].fields[index].visibility = checked
		setAllOfMasterCV(newAllOfMasterCV)
	}

	const toggleVisibilityHeading = (checked, index) => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		newAllOfMasterCV[index].visibility = checked
		setAllOfMasterCV(newAllOfMasterCV)
	}

	const handlePreview = async (CV) => {
		setPreviewPDFBlobURL('')
		const pdfMakeData = JSON.parse(JSON.stringify(CV))
		const dd = pdfCVMakerFileStudent(props.fetchedData, pdfMakeData, props.parentProps.eligibilityLookupTableData)
		// const { data } = await Axios.post(pdfCVMaker, { cv: pdfMakeData }, config).catch((error) => {
		// 	console.error(error)
		// 	props.newSnack('Connection Error', 'error')
		// })
		// if (data.success) {
		// const blobPDF = b64toBlob(data.message, 'application/pdf')
		// const blobPDFURL = URL.createObjectURL(blobPDF)
		// setPreviewPDFBlobURL(blobPDFURL)
		// }
		const pdfDoc = pdfMake.createPdf(dd)
		pdfDoc.getBlob((data) => {
			const blobPDFURL = URL.createObjectURL(data)
			setPreviewPDFBlobURL(blobPDFURL)
		})
	}

	const handleVerification = async () => {
		const res = await Axios.post(studentMasterCVforVerification, {}, config).catch((error) => console.error(error))
		res.data.success ? props.newSnack(res.data.message, 'success') : props.newSnack(res.data.message, 'error')
		props.updateData()
	}

	const handleRenameHeading = () => {
		setRenameHeadingTitle('')
		setRenameHeadingOpen(true)
	}

	const renameHeading = () => {
		const newAllOfMasterCV = JSON.parse(JSON.stringify(allOfMasterCV))
		newAllOfMasterCV[currentlySelected].info = renameHeadingTitle
		setAllOfMasterCV(newAllOfMasterCV)
		setRenameHeadingOpen(false)
		props.newSnack('Rename Successful', 'info')
	}

	return (
		<Fade in>
			<div>
				<Dialog
					maxWidth="lg"
					TransitionProps={{ unmountOnExit: true }}
					fullWidth
					open={newHeadingOpen}
					disableBackdropClick
				>
					<DialogTitle>Add new Heading</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							fullWidth
							variant="outlined"
							value={newHeadingTitle}
							onChange={(e) => {
								e.preventDefault()
								setNewHeadingTitle(e.target.value)
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={() => addNewHeading()}>
							OK
						</Button>
						<Button variant="contained" color="secondary" onClick={() => setNewHeadingOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<Dialog
					maxWidth="lg"
					TransitionProps={{ unmountOnExit: true }}
					fullWidth
					open={renameHeadingOpen}
					disableBackdropClick
				>
					<DialogTitle>Rename this heading</DialogTitle>
					<DialogContent>
						<TextField
							autoFocus
							fullWidth
							variant="outlined"
							value={renameHeadingTitle}
							onChange={(e) => {
								e.preventDefault()
								setRenameHeadingTitle(e.target.value)
							}}
						/>
					</DialogContent>
					<DialogActions>
						<Button variant="contained" color="primary" onClick={() => renameHeading()}>
							OK
						</Button>
						<Button variant="contained" color="secondary" onClick={() => setRenameHeadingOpen(false)}>
							Cancel
						</Button>
					</DialogActions>
				</Dialog>
				<div style={{ padding: 10 }} />
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<SortableSelect
						setList={setAllOfMasterCV}
						setCurrentlySelected={setCurrentlySelected}
						currentlySelected={currentlySelected}
						list={allOfMasterCV}
					/>
					<Tooltip title="Add new heading">
						<IconButton onClick={handleAddNewHeading}>
							<AddIcon />
						</IconButton>
					</Tooltip>
					{/* <Tooltip title="Rename heading">
						<IconButton onClick={handleRenameHeading}>
							<RenameIcon />
						</IconButton>
					</Tooltip> */}
					<div style={{ padding: 10 }} />
					<Tooltip title="Toggle Visibility in Preview">
						<FormControlLabel
							control={
								<GreenSwitch
									size="small"
									checked={
										allOfMasterCV[currentlySelected].visibility === undefined
											? true
											: allOfMasterCV[currentlySelected].visibility
									}
									onChange={(e) => toggleVisibilityHeading(e.target.checked, currentlySelected)}
								/>
							}
						/>
					</Tooltip>
					<Tooltip title="Remove this heading">
						<IconButton onClick={handleRemoveHeading}>
							<CrossIcon />
						</IconButton>
					</Tooltip>
				</div>
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography style={{ flexGrow: 1 }} />
					<Button
						disabled={savingMasterCV}
						variant="contained"
						color="primary"
						onClick={() => uploadMasterCV(allOfMasterCV)}
						style={{ marginRight: '10px' }}
					>
						Save
					</Button>
					<Button
						disabled={savingMasterCV}
						variant="contained"
						color="secondary"
						style={{ marginRight: '10px' }}
						onClick={() => handlePreview(allOfMasterCV)}
					>
						Preview
					</Button>
					{/* {props.fetchedData.placement === 0 && ( */}
						<Button
							disabled={savingMasterCV}
							variant="contained"
							style={{ backgroundColor: '#00b300', color: 'white' }}
							// style={{ backgroundColor: 'green[300]', color: 'white' }}
							onClick={() => handleVerification()}
						>
							Send for verification
						</Button>
					{/* )} */}
				</div>
				<div style={{ padding: 10 }} />
				<Typography style={{ color: 'red' }} component="p">
					Please checkout{' '}
					<Typography component="span" style={{ color: 'blue', textDecoration: 'underline' }}>
						<Link to="/login/student/portal/documents">Manage Documents</Link>
					</Typography>
					. The resumes created there will be the final ones to be sent to the companies
				</Typography>
				<div style={{ padding: 10 }} />
				<Paper className="pZeroMargin">
					<SortableContainer onSortEnd={onSortEnd} useDragHandle>
						{allOfMasterCV[currentlySelected].fields.map((value, index) => {
							const toggleVisibilityInner = (checked) => {
								toggleVisibility(checked, index)
							}
							return (
								<SortableItem
									key={`item-${index}`}
									index={index}
									value={value}
									toggleVisibility={toggleVisibilityInner}
									onRemove={() => handleRemovePoint(index)}
									onEdit={() => handleOnEdit(index)}
								/>
							)
						})}
					</SortableContainer>
				</Paper>
				<div style={{ padding: 15 }} />
				<Paper elevation={3} style={{ padding: 10 }}>
					<Typography variant="button" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
						Create new point
					</Typography>
					<RichTextEditor
						value={rteValue}
						onChange={handleChangeRteValue}
						toolbarConfig={{
							display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'HISTORY_BUTTONS'],
							INLINE_STYLE_BUTTONS: [
								{ label: 'Bold', style: 'BOLD' },
								{ label: 'Italic', style: 'ITALIC' },
								{ label: 'Underline', style: 'UNDERLINE' },
							],
							BLOCK_TYPE_BUTTONS: [
								{ label: 'UL', style: 'unordered-list-item' },
								{ label: 'OL', style: 'ordered-list-item' },
							],
						}}
					/>
					<div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
						<TextField
							style={{ margin: 5 }}
							label="Padding Bottom"
							variant="outlined"
							size="small"
							type="number"
							value={paddingPerPoint}
							onChange={(e) => {
								e.preventDefault()
								if (e.target.value < 100 && e.target.value >= 0) setPaddingPerPoint(e.target.value)
								else props.newSnack('Padding must be positive and less than 100', 'warning')
							}}
						/>
						<TextField
							style={{ margin: 5 }}
							label="Right side text"
							variant="outlined"
							size="small"
							value={pointRightText}
							onChange={(e) => {
								e.preventDefault()
								setPointRightText(e.target.value)
							}}
						/>
						<Tooltip title="Create">
							<IconButton onClick={handleCreatePoint}>
								<CheckIcon />
							</IconButton>
						</Tooltip>
						<Tooltip title="Reset">
							<IconButton onClick={handleResetRTE}>
								<CrossIcon />
							</IconButton>
						</Tooltip>
					</div>
				</Paper>
				<div style={{ padding: 15 }} />
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
				</div>
			</div>
		</Fade>
	)
}

export default MasterCV
