import React, { useContext } from 'react'
import Axios from 'axios'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { useConfirm } from 'material-ui-confirm'

import RichTextEditor from 'react-rte'
import renderHTML from 'react-render-html'

import {
	studentCoodSendNotificationToAllPlacement,
	studentCoodSendNotificationToAllInternship,
	studentCoodSendNotificationToSpecific,
} from './index'

import { LoadingContext } from './index'

const SendNotifications = ({ updateData, config, ...props }) => {
	const confirm = useConfirm()
	const Loading = useContext(LoadingContext)
	const [notifRecipients, setNotifRecipientsActual] = React.useState([])
	const [rteValue, setRteValue] = React.useState(RichTextEditor.createEmptyValue())
	const [newNotification, setNewNotification] = React.useState({
		title: '',
		message: RichTextEditor.createEmptyValue().toString('html'),
	})

	const handleSendNotificationToSpecific = () => {
		confirm()
			.then(async () => {
				Loading.startLoading()
				const { data } = await Axios.post(
					studentCoodSendNotificationToSpecific,
					{ message: newNotification, rollno: notifRecipients },
					config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
					Loading.stopLoading()
				})
				Loading.stopLoading()
				props.newSnack(data.message + ': ' + JSON.stringify(data.rollno || ''), data.success ? 'info' : 'error')
				if (data.success) {
					setNewNotification({ title: '', message: '' })
					setNotifRecipients([])
					setRteValue(RichTextEditor.createEmptyValue())
				}
				updateData()
			})
			.catch(() => {})
	}

	const handleSendNotificationToAllPlacement = () => {
		confirm()
			.then(async () => {
				Loading.startLoading()
				const { data } = await Axios.post(
					studentCoodSendNotificationToAllPlacement,
					{ message: newNotification },
					config
				).catch((error) => {
					console.error(error)
					Loading.stopLoading()
					props.newSnack('Connection Error', 'error')
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				if (data.success) {
					setNewNotification({ title: '', message: '' })
					setRteValue(RichTextEditor.createEmptyValue())
				}
				Loading.stopLoading()
				updateData()
			})
			.catch(() => {})
	}

	const handleSendNotificationToAllInternship = () => {
		confirm()
			.then(async () => {
				Loading.startLoading()
				const { data } = await Axios.post(
					studentCoodSendNotificationToAllInternship,
					{ message: newNotification },
					config
				).catch((error) => {
					console.error(error)
					Loading.stopLoading()
					props.newSnack('Connection Error', 'error')
				})
				props.newSnack(data.message, data.success ? 'info' : 'error')
				if (data.success) {
					setNewNotification({ title: '', message: '' })
					setRteValue(RichTextEditor.createEmptyValue())
				}
				Loading.stopLoading()
				updateData()
			})
			.catch(() => {})
	}

	const setNotifRecipients = (value) => {
		const value2 = value.split(',')
		setNotifRecipientsActual(value2.map((item) => item.trim()))
	}

	console.warn = ((_error) =>
		function (message) {
			if (typeof message === 'string' && message.indexOf('UNSAFE_') === -1) _error.apply(console, arguments)
		})(console.warn)

	return (
		<div>
			<div style={{ padding: 10 }} />
			<Paper>
				<Container>
					<div style={{ padding: 10 }} />
					<Typography>Send new notification</Typography>
					<div style={{ padding: 10 }} />
					<TextField
						fullWidth
						size="small"
						variant="outlined"
						label="New notification heading"
						value={newNotification.title}
						onChange={(e) => setNewNotification({ ...newNotification, title: e.target.value })}
					/>
					<div style={{ padding: 10 }} />
					<RichTextEditor
						value={rteValue}
						toolbarConfig={{
							display: [
								'INLINE_STYLE_BUTTONS',
								'BLOCK_TYPE_BUTTONS',
								'BLOCK_TYPE_DROPDOWN',
								'HISTORY_BUTTONS',
							],
							INLINE_STYLE_BUTTONS: [
								{ label: 'Bold', style: 'BOLD' },
								{ label: 'Italic', style: 'ITALIC' },
								{ label: 'Underline', style: 'UNDERLINE' },
							],
							BLOCK_TYPE_BUTTONS: [
								{ label: 'UL', style: 'unordered-list-item' },
								{ label: 'OL', style: 'ordered-list-item' },
							],
							BLOCK_TYPE_DROPDOWN: [
								{ label: 'Normal', style: 'unstyled' },
								{ label: 'Heading Large', style: 'header-one' },
								{ label: 'Heading Medium', style: 'header-two' },
								{ label: 'Heading Small', style: 'header-three' },
							],
						}}
						onChange={(v) => {
							setRteValue(v)
							const message = v.toString('html')
							setNewNotification({ ...newNotification, message: message.replace(/\n/g, '') })
						}}
					/>
					<div style={{ padding: 10 }} />
					<Typography>Preview</Typography>
					<Card>
						<CardHeader title={newNotification.title} />
						<CardContent>
							<Typography variant="body2" component="div">
								{renderHTML(newNotification.message)}
							</Typography>
						</CardContent>
					</Card>
					<div style={{ padding: 10 }} />
					<div>
						<Button
							color="secondary"
							variant="contained"
							onClick={handleSendNotificationToAllInternship}
							fullWidth
						>
							Send notification internship students
						</Button>
						<Button
							color="secondary"
							variant="contained"
							onClick={handleSendNotificationToAllPlacement}
							fullWidth
						>
							Send notification placement students
						</Button>
					</div>
					<div style={{ padding: 10 }} />
					<Container>
						<TextField
							fullWidth
							variant="outlined"
							label="Specify roll numbers seperated by a coma"
							onChange={(e) => setNotifRecipients(e.target.value)}
						/>
						<Button
							color="secondary"
							variant="contained"
							onClick={handleSendNotificationToSpecific}
							fullWidth
						>
							Send notification to Specific
						</Button>
						<List dense>
							{notifRecipients.map((item, key) => (
								<ListItem divider key={key}>
									<Typography>{item}</Typography>
								</ListItem>
							))}
						</List>
					</Container>
				</Container>
			</Paper>
			<div style={{ padding: 10 }} />
		</div>
	)
}

export default SendNotifications
