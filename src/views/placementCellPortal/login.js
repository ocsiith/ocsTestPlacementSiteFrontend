import React from 'react'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'

import { placementStaffLoginAddress } from './index'

import GoogleIcon from '../../static/images/GoogleIcon.svg'
import GoogleLogin from 'react-google-login'
import { googleClientIdForAdminLogin } from '../../constants/addresses'

import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'

const PlacementStaffSignInBtn = (props) => {
	return (
		<GoogleLogin
			clientId={googleClientIdForAdminLogin}
			render={(renderProps) =>
				!props.disabled ? (
					<Button
						style={props.style}
						variant="outlined"
						onClick={renderProps.onClick}
						disabled={renderProps.disabled}
						startIcon={
							<img style={{ height: '1rem', width: '1rem' }} src={GoogleIcon} alt="Sign In with Google" />
						}
					>
						Sign In
					</Button>
				) : (
					<Button style={props.style} variant="outlined" disabled>
						<CircularProgress />
					</Button>
				)
			}
			buttonText="Sign In"
			onSuccess={props.onSuccess}
			onFailure={props.onFailure}
			cookiePolicy={'single_host_origin'}
		/>
	)
}

const PlacementStaffLogin = (props) => {
	const history = useHistory()

	const [errorMsg, setErrorMsg] = React.useState('')
	const [loggingIn, setLoggingIn] = React.useState(false)

	const responseGoogle = async (res) => {
		setLoggingIn(false)
		props.setLoading(true)
		if (res.error) {
			setErrorMsg('Login Failed: ' + res.error)
			return
		}
		const config = { headers: { Authorization: `BEARER ${res.tokenId}` } }
		const { data } = await Axios.get(placementStaffLoginAddress, config).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (data.success) {
			props.setAccessToken(data.accessToken)
			window.localStorage.setItem('PaccessToken', data.accessToken)
			setTimeout(() => history.push(props.currentAddress + 'portal'), 0)
		} else props.newSnack(data.message, 'warning')
		setLoggingIn(false)
		props.updateData()
		props.setLoading(false)
	}

	return (
		<Container>
			<Paper
				style={{
					display: 'flex',
					justifyContent: 'center',
					padding: 50,
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Typography style={{ padding: 20 }} variant="button">
					Placement Staff Login
				</Typography>
				<PlacementStaffSignInBtn
					style={{ width: '100%', height: 100, maxWidth: 400, border: '1px solid' }}
					onSuccess={responseGoogle}
					onFailure={responseGoogle}
					disabled={loggingIn}
					setLoggingIn={setLoggingIn}
				/>
				<Typography style={{ padding: 20, color: 'red' }}>{errorMsg}</Typography>
			</Paper>
		</Container>
	)
}

export default PlacementStaffLogin
