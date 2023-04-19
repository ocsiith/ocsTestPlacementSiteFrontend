import React, { useState } from 'react'

import Axios from 'axios'

import {
	studentGetNotifications,
	studentNotificationMarkAsRead,
	studentNotificationMarkAsUnread,
	studentGetNotificationsSpecific,
	studentNotificationMarkAsReadSpecific,
	studentNotificationMarkAsUnreadSpecific,
} from '../../../constants/addresses'

import renderHTML from 'react-render-html'

import Fade from '@material-ui/core/Fade'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import CardActions from '@material-ui/core/CardActions'

import DoneIcon from '@material-ui/icons/Done'
import UndoIcon from '@material-ui/icons/Undo'

import { useConfirm } from 'material-ui-confirm'

const NotificationCenter = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }
	const confirm = useConfirm()
	const [notifData, setNotifData] = useState([])
	const [notifDataSpecific, setNotifDataSpecific] = useState([])

	const sortThenSetNotifData = (data) => {
		data.sort((a, b) => {
			if (a.read === b.read) return 0
			else if (a.read === false) return -1
			else return +1
		})
		setNotifData(data)
	}

	const sortThenSetNotifDataSpecific = (data) => {
		data.sort((a, b) => {
			if (a.read === b.read) return 0
			else if (a.read === false) return -1
			else return +1
		})
		setNotifDataSpecific(data)
	}

	React.useEffect(() => {
		props.setLoading(true)
		Axios.get(studentGetNotifications, config)
			.then(({ data }) => {
				if (data.success) {
					sortThenSetNotifData(data.message)
				} else props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		Axios.get(studentGetNotificationsSpecific, config)
			.then(({ data }) => {
				if (data.success) {
					sortThenSetNotifDataSpecific(data.message)
				} else props.newSnack(data.message, data.success ? 'info' : 'error')
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const markAsReadAction = (index, read) => {
		confirm()
			.then(() => {
				const newNotifData = JSON.parse(JSON.stringify(notifData))
				newNotifData[index].read = read
				sortThenSetNotifData(newNotifData)
				if (read) {
					Axios.post(studentNotificationMarkAsRead, { id: newNotifData[index].id }, config)
						.then(({ data }) => {
							props.newSnack(data.message, data.success ? 'info' : 'error')
							if (!data.success) props.updateData()
						})
						.catch((error) => {
							console.error(error)
							props.newSnack('Server error, action failed', 'error')
							props.updateData()
						})
				} else {
					Axios.post(studentNotificationMarkAsUnread, { id: newNotifData[index].id }, config)
						.then(({ data }) => {
							props.newSnack(data.message, data.success ? 'info' : 'error')
							if (!data.success) props.updateData()
						})
						.catch((error) => {
							console.error(error)
							props.newSnack('Server error, action failed', 'error')
							props.updateData()
						})
				}
			})
			.catch(() => {})
	}

	const markAsReadActionSpecific = (index, read) => {
		confirm()
			.then(() => {
				const newNotifData = JSON.parse(JSON.stringify(notifDataSpecific))
				newNotifData[index].read = read
				sortThenSetNotifDataSpecific(newNotifData)
				if (read) {
					Axios.post(studentNotificationMarkAsReadSpecific, { id: newNotifData[index].id }, config)
						.then(({ data }) => {
							props.newSnack(data.message, data.success ? 'info' : 'error')
							if (!data.success) props.updateData()
						})
						.catch((error) => {
							console.error(error)
							props.newSnack('Server error, action failed', 'error')
							props.updateData()
						})
				} else {
					Axios.post(studentNotificationMarkAsUnreadSpecific, { id: newNotifData[index].id }, config)
						.then(({ data }) => {
							props.newSnack(data.message, data.success ? 'info' : 'error')
							if (!data.success) props.updateData()
						})
						.catch((error) => {
							console.error(error)
							props.newSnack('Server error, action failed', 'error')
							props.updateData()
						})
				}
			})
			.catch(() => {})
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<React.Fragment>
				<div style={{ padding: 15 }} />
				<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
					<div style={{ flexGrow: 1, maxWidth: '50%' }}>
						<div style={{ padding: 15 }} />
						<List
							style={{
								padding: 10,
								border: '1px solid grey',
								borderRadius: 10,
								borderTopRightRadius: 0,
								borderBottomRightRadius: 0,
								height: '100%',
							}}
						>
							<div style={{ padding: 5 }} />
							<Typography align="center" variant="h4">
								Common
							</Typography>
							<div style={{ padding: 15 }} />
							{notifData.map((notif, key) => (
								<ListItem key={key}>
									<Card elevation={notif.read ? 0 : 3} style={{ width: '100%' }}>
										<CardHeader
											title={notif.message.title}
											action={
												notif.read ? (
													<Tooltip title="Mark as Unread">
														<IconButton onClick={() => markAsReadAction(key, false)}>
															<UndoIcon />
														</IconButton>
													</Tooltip>
												) : (
													<Tooltip title="Mark as read">
														<IconButton onClick={() => markAsReadAction(key, true)}>
															<DoneIcon />
														</IconButton>
													</Tooltip>
												)
											}
										/>
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
								</ListItem>
							))}
						</List>
					</div>
					<div style={{ flexGrow: 1, maxWidth: '50%' }}>
						<div style={{ padding: 15 }} />
						<List
							style={{
								padding: 10,
								border: '1px solid grey',
								borderLeft: '0px',
								borderRadius: 10,
								borderTopLeftRadius: 0,
								borderBottomLeftRadius: 0,
								height: '100%',
							}}
						>
							<div style={{ padding: 5 }} />
							<Typography align="center" variant="h4">
								Focused
							</Typography>
							<div style={{ padding: 15 }} />
							{notifDataSpecific.map((notif, key) => (
								<ListItem key={key}>
									<Card elevation={notif.read ? 0 : 3} style={{ width: '100%' }}>
										<CardHeader
											title={notif.message.title}
											action={
												notif.read ? (
													<Tooltip title="Mark as Unread">
														<IconButton
															onClick={() => markAsReadActionSpecific(key, false)}
														>
															<UndoIcon />
														</IconButton>
													</Tooltip>
												) : (
													<Tooltip title="Mark as read">
														<IconButton onClick={() => markAsReadActionSpecific(key, true)}>
															<DoneIcon />
														</IconButton>
													</Tooltip>
												)
											}
										/>
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
								</ListItem>
							))}
						</List>
					</div>
				</div>
			</React.Fragment>
		</Fade>
	)
}

export default NotificationCenter
