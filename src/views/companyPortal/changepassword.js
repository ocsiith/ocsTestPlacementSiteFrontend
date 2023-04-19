import React, { useState } from 'react'

import { companyChangePassword } from '../../constants/addresses'

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { useConfirm } from 'material-ui-confirm'

const Home = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.parentProps.companyCredentials.accessToken}` } }
	const confirm = useConfirm()
	const history = useHistory()
	const [confirmPwd, setConfirmPwd] = useState('')
	const [newPwd, setNewPwd] = useState('')
	const [currentPwd, setCurrentPwd] = useState('')

	const handleSubmit = () => {
		if (newPwd.length < 8 || confirmPwd.length < 8 || currentPwd.length < 8) {
			return props.newSnack('Password must be longer than 8 characters', 'error')
		}
		if (newPwd !== confirmPwd) return props.newSnack("Confirm Password doesn't match", 'error')
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(
					companyChangePassword,
					{
						password: newPwd,
						password_confirm: confirmPwd,
						old_password: currentPwd,
					},
					config
				).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
				if (data.success) {
					props.newSnack(data.message, 'info')
					setTimeout(() => {
						history.push('/login/refreshtoken')
					}, 0)
				}
				props.setLoading(false)
			})
			.catch(() => {})
	}

	return (
		<Fade in>
			<div>
				<div style={{ padding: 10 }} />
				<Paper style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
					<Container>
						<div style={{ padding: 10 }} />
						<Typography variant="h5">Change Password</Typography>
						<div style={{ padding: 10 }} />
						<form>
							<TextField
								autoComplete="new-password"
								fullWidth
								variant="outlined"
								label="Username"
								style={{ display: 'none' }}
							/>
							<TextField
								autoComplete="new-password"
								autoFocus
								type="password"
								fullWidth
								variant="outlined"
								label="Current password"
								onChange={(e) => setCurrentPwd(e.target.value)}
								value={currentPwd}
							/>
							<div style={{ padding: 10 }} />
							<TextField
								autoComplete="new-password"
								type="password"
								fullWidth
								variant="outlined"
								label="New password"
								onChange={(e) => setNewPwd(e.target.value)}
								value={newPwd}
							/>
							<div style={{ padding: 10 }} />
							<TextField
								autoComplete="new-password"
								type="password"
								fullWidth
								variant="outlined"
								label="Confirm password"
								onChange={(e) => setConfirmPwd(e.target.value)}
								value={confirmPwd}
							/>
							<div style={{ padding: 10 }} />
							<Button variant="contained" fullWidth color="primary" onClick={handleSubmit}>
								Change password
							</Button>
						</form>
						<div style={{ padding: 10 }} />
					</Container>
				</Paper>
			</div>
		</Fade>
	)
}

export default Home
