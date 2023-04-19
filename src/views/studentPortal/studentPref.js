import React, { useState } from 'react'
import Axios from 'axios'
import { Route, useHistory } from 'react-router-dom'

import {
	studentGetPreferenceReference,
	studentSetPreferencePerSlot,
	studentGetPreferencePerSlot,
} from '../../constants/addresses'

import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Button from '@material-ui/core/Button'

import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc'
import arrayMove from 'array-move'

import DragHandleIcon from '@material-ui/icons/DragHandle'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import EditIcon from '@material-ui/icons/Edit'
import SaveIcon from '@material-ui/icons/Save'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import { Paper, Container } from '@material-ui/core'

const currentAddress = '/login/student/portal/preferences/'
const listingsAddress = '/login/student/portal/allcompanies/'

const DragHandle = sortableHandle(() => <DragHandleIcon />)

const SortableList = sortableContainer((props) => {
	return <List {...props}></List>
})

const SortableListItem = sortableElement((props) => {
	return <ListItem {...props}></ListItem>
})

const StudentPreferenceHome = (props) => {
	const history = useHistory()
	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div>
				<div style={{ padding: 15 }} />
				<Typography variant="h6">Slots</Typography>
				<div style={{ padding: 10 }} />
				<List>
					{props.reference.map((slot, key) => (
						<ListItem divider button key={key} onClick={() => history.push(currentAddress + slot.slot_id)}>
							<div>
								<p>Slot: {slot.slot_id}</p>
								<p>Date: {slot.slot_date}</p>
								<p>Time: {slot.slot_time}</p>
								<p>To: {slot.slot_end_time}</p>
							</div>
						</ListItem>
					))}
				</List>
			</div>
		</Fade>
	)
}

const openLinkInNewTab = (openURL) => {
	window.open(openURL, '_blank')
}

const StudentPreferenceSlotPage = (props) => {
	const [slotPref, setSlotPref] = React.useState([])
	const [newPref, setNewPref] = React.useState([])
	const history = useHistory()
	const [editing, setEditing] = React.useState(false)

	React.useEffect(() => {
		props.setLoading(true)
		setNewPref(props.reference[props.index].listings.map((listing) => listing.listings_id))
		Axios.get(studentGetPreferencePerSlot + props.slotId, props.config)
			.then(({ data }) => {
				if (data.success) {
					setSlotPref(data.message)
				} else props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const handleSortEnd = ({ oldIndex, newIndex }) => setNewPref(arrayMove(newPref, oldIndex, newIndex))

	const handleSavePref = async () => {
		props.setLoading(true)
		const { data } = await Axios.post(
			studentSetPreferencePerSlot,
			{ slot_id: props.slotId, prefer: newPref },
			props.config
		).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		props.setLoading(false)
		if (data.success) {
			setEditing(false)
			props.updateData()
		}
		props.newSnack(data.message, data.success ? 'info' : 'error')
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div>
				<div style={{ padding: 15 }} />
				<div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
					<Typography variant="h6" style={{ flexGrow: 1 }}>
						Slot: {props.slotId}
					</Typography>
					<Button
						startIcon={<ChevronLeftIcon />}
						variant="outlined"
						onClick={() => setTimeout(() => history.push(currentAddress), 0)}
					>
						Back
					</Button>
				</div>
				<div style={{ padding: 10 }} />
				<ButtonGroup>
					<Button
						startIcon={<EditIcon />}
						variant="contained"
						color="secondary"
						disabled={editing}
						onClick={() => setEditing(true)}
					>
						Edit
					</Button>
					<Button
						endIcon={<SaveIcon />}
						variant="contained"
						color="primary"
						disabled={!editing}
						onClick={handleSavePref}
					>
						Save
					</Button>
				</ButtonGroup>
				{/*<List>
					{props.reference[props.index].listings.map((listing, key) => (
						<ListItem divider key={key}>
							{listing.form_2.Job_Title}
						</ListItem>
					))}
				</List>*/}
				{!editing ? (
					<div>
						<List>
							{slotPref.map((listingId, key) => (
								<ListItem
									button
									divider
									key={key}
									onClick={() => openLinkInNewTab(listingsAddress + listingId)}
								>
									{
										props.reference[props.index].listings.filter(
											(listing) => listing.listings_id === listingId
										)[0].form_2.Job_Title
									}
									<Typography style={{ flexGrow: 1 }} />
									<Tooltip title="Open in new tab">
										<ListItemIcon>
											<OpenInNewIcon />
										</ListItemIcon>
									</Tooltip>
								</ListItem>
							))}
						</List>
					</div>
				) : (
					<div>
						<SortableList style={{ width: '100%' }} onSortEnd={handleSortEnd} useDragHandle>
							{newPref.map((listingId, key) => (
								<SortableListItem index={key} divider key={key}>
									<Tooltip title="Drag">
										<ListItemIcon style={{ cursor: 'row-resize' }}>
											<DragHandle />
										</ListItemIcon>
									</Tooltip>
									<div>
										{
											props.reference[props.index].listings.filter(
												(listing) => listing.listings_id === listingId
											)[0].form_2.Job_Title
										}
									</div>
								</SortableListItem>
							))}
						</SortableList>
					</div>
				)}
			</div>
		</Fade>
	)
}

const StudentPreferencePage = (props) => {
	const [reference, setReference] = useState([])
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
	React.useEffect(() => {
		props.setLoading(true)
		Axios.get(studentGetPreferenceReference, config)
			.then(({ data }) => {
				//console.log(data)
				if (data.success) setReference(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<>
				<div style={{ padding: 15 }} />
				<Paper>
					<div style={{ padding: 15 }} />
					<Container>
						<Typography variant="h5">Student's Preference</Typography>
						<Route path={currentAddress} exact>
							<StudentPreferenceHome config={config} reference={reference} {...props} />
						</Route>
						{reference.map((slot, key) => (
							<Route path={currentAddress + slot.slot_id} exact key={key}>
								<StudentPreferenceSlotPage
									config={config}
									slotId={slot.slot_id}
									reference={reference}
									{...props}
									index={key}
								/>
							</Route>
						))}
					</Container>
					<div style={{ padding: 15 }} />
				</Paper>
			</>
		</Fade>
	)
}

export default StudentPreferencePage
