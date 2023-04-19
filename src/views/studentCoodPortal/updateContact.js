import React, { useContext } from 'react'
import Axios from 'axios'

import { useConfirm } from 'material-ui-confirm'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardActions from '@material-ui/core/CardActions'
import { LoadingContext, studentCoodUpdateContact } from './index'

const UpdateContact = ({ studentDetails, config, updateData, ...props }) => {
	const [updateStudentContact, setUpdateStudentContact] = React.useState('')
	const confirm = useConfirm()

	const Loading = useContext(LoadingContext)

	return (
		<div>
			<div style={{ padding: 10 }} />
			<Card>
				<Container>
					<div style={{ padding: 10 }} />
					<CardHeader title="Your Details" />
					<CardContent>
						<Typography variant="body2" component="div">
							{'Name: ' + studentDetails.student_name}
						</Typography>
						<Typography variant="body2" component="div">
							{'Email: ' + studentDetails.email}
						</Typography>
						<Typography variant="body2" component="div">
							{'Contact: ' + studentDetails.contact}
						</Typography>
					</CardContent>
					<div style={{ padding: 10 }} />
					<div style={{ padding: 10 }} />
					<CardHeader title="Update Your Details" />
					<CardContent>
						<TextField
							variant="outlined"
							type="number"
							value={updateStudentContact}
							onChange={(e) => {
								const re = /^\+{0,1}[0-9]{10,14}$/
								const element = document.getElementById('contactError')
								if (!re.test(e.target.value)) {
									element.style.display = 'block'
								} else {
									element.style.display = 'none'
								}
								setUpdateStudentContact(e.target.value)
							}}
						/>
						<p id="contactError" style={{ display: 'none', color: 'red' }}>
							Enter a vaild number
						</p>
					</CardContent>
					<CardActions>
						<Button
							variant="contained"
							color="secondary"
							// disabled={document.getElementById('contactError').style.display !== 'none'}
							onClick={() => {
								const element = document.getElementById('contactError')
								if (element.style.display !== 'none') {
									alert("Enter a valid number")
								} else {
									confirm()
										.then(() => {
											Loading.startLoading()
											Axios.post(
												studentCoodUpdateContact,
												{ contact: updateStudentContact },
												config
											)
												.then(({ data }) => {
													if (data.success) updateData()
													props.newSnack(data.message, data.success ? 'info' : 'error')
													setUpdateStudentContact('')
													Loading.stopLoading()
												})
												.catch((error) => {
													console.error(error)
													props.newSnack('Connection Error', 'error')
													Loading.stopLoading()
												})
										})
										.catch(() => {})
								}
							}}
						>
							Update Contact
						</Button>
					</CardActions>
					<div style={{ padding: 10 }} />
				</Container>
			</Card>
			<div style={{ padding: 10 }} />
		</div>
	)
}

export default UpdateContact
