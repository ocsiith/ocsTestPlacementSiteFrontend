import React from 'react'

import GoogleIcon from '../static/images/GoogleIcon.svg'
import GoogleLogin from 'react-google-login'
import { googleClientId } from '../constants/addresses'

import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

const StudentSignInBtn = (props) => {
	return (
		<GoogleLogin
			clientId={googleClientId}
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

export default StudentSignInBtn
