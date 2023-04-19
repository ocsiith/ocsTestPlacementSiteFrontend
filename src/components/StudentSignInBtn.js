import React, { useContext, useState } from 'react'

import GoogleIcon from '../static/images/GoogleIcon.svg'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

import { GoogleLoginStateContext } from '../App'

const StudentSignInBtn = (props) => {
	const { gapi } = window
	const [loading, setLoading] = useState(false)
	const GoogleLoginState = useContext(GoogleLoginStateContext)
	const handleLogin = async () => {
		setLoading(true)
		await (
			await gapi.auth2.getAuthInstance()
		)
			.signIn()
			.then(async () => {
				const email = await (
					await (await (await gapi.auth2.getAuthInstance()).currentUser.get()).getBasicProfile()
				).getEmail()
				if (email.includes('@iith.ac.in') || email === 'chudiry0007@gmail.com' || email === 'saitejaporpsnarayana@gmail.com'
				 || email === 'siddharthsangal1998@gmail.com' || email === 'vijaycs16bt11028@alumni.iith.ac.in'
				 || email === 'sumanasom@alumni.iith.ac.in' || email === 'rohithsinghk@gmail.com' || 'jeereddybhargav.iith@gmail.com'
				 || email === 'sagar.mulani@alumni.iith.ac.in'
				 ) {
					props.newSnack('Logged in', 'success')
					props.onSuccess()
				} else {
					props.newSnack('Please use IITH email ID', 'warning')
					await (await gapi.auth2.getAuthInstance()).signOut()
				}
			})
			.catch((error) => {
				props.newSnack('Error', 'error')
				console.log(error)
			})
		setLoading(false)
	}
	const handleLogout = async () => {
		setLoading(true)
		await (
			await gapi.auth2.getAuthInstance()
		)
			.signOut()
			.then(() => {
				props.newSnack('Logged out', 'success')
			})
			.catch((error) => {
				props.newSnack('Error', 'error')
				console.log(error)
			})
		setLoading(false)
	}

	return !(loading || GoogleLoginState.isSignedIn === undefined) ? (
		<Button
			style={props.style}
			variant="outlined"
			onClick={GoogleLoginState.isSignedIn ? handleLogout : handleLogin}
			disabled={props.disabled || loading}
			startIcon={<img style={{ height: '1rem', width: '1rem' }} src={GoogleIcon} alt="Sign In with Google" />}
		>
			{GoogleLoginState.isSignedIn ? 'Log out' : 'Sign In'}
		</Button>
	) : (
		<Button style={props.style} variant="outlined" disabled>
			<CircularProgress />
		</Button>
	)
}

export default StudentSignInBtn
