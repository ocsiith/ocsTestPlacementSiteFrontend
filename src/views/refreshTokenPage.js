import React from 'react'
import { useHistory } from 'react-router-dom'
import Axios from 'axios'

import { companyRefreshTokenAddress } from '../constants/addresses'

import BackgroundChanger from '../components/backgroundChanger'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
	backdrop: {
		width: '100%',
		height: '100%',
	},
}))

const RefreshToken = (props) => {
	const history = useHistory()
	const classes = useStyles()

	if (props.companyCredentials.refreshToken) {
		const config = { headers: { Authorization: `BEARER ${props.companyCredentials.refreshToken}` } }
		Axios.get(companyRefreshTokenAddress, config).then((res) => {
			if (res.data.success) {
				const creds = props.companyCredentials
				creds.accessToken = res.data.accessToken
				props.setCompCreds(creds)
				history.push(
					props.refreshRedirectLocation && props.refreshRedirectLocation.includes('login/company/portal')
						? props.refreshRedirectLocation
						: '/login/company/portal/'
				)
			} else {
				props.setCompCreds('')
				setTimeout(() => history.push('/login'), 0)
			}
		})
	} else {
		setTimeout(() => history.push('/login'), 0)
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<Backdrop className={classes.backdrop} style={{ color: 'black' }} open={true}>
					<CircularProgress style={{ color: 'white' }} />
				</Backdrop>
			</Container>
		</Fade>
	)
}

export default RefreshToken
