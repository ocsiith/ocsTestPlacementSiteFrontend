import React from 'react'

import { useHistory } from 'react-router-dom'

import Axios from 'axios'

import { adminLoginAddress, topsecretlocation } from './index'

const AdminLogin = (props) => {
	const history = useHistory()
	const [userId, setUserId] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [error, setError] = React.useState('')

	const handleChangeUserId = (event) => {
		setUserId(event.target.value)
	}

	const handleChangePassword = (event) => {
		setPassword(event.target.value)
	}

	const handleLogin = () => {
		Axios.post(adminLoginAddress, {
			username: userId,
			password: password,
		})
			.then((res) => {
				if (res.data.success) {
					props.setAccessToken(res.data.accessToken)
					setTimeout(() => history.push(topsecretlocation + 'portal'), 0)
				} else setError(res.data.message)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
	}

	return (
		<div>
			<p>AdminLogin</p>
			<p>{error}</p>
			<input placeholder="Username" type="text" onChange={handleChangeUserId} />
			<input placeholder="Password" type="password" onChange={handleChangePassword} />
			<button onClick={handleLogin}>Login</button>
		</div>
	)
}

export default AdminLogin
