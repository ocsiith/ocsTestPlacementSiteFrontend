import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import BackgroundChanger from '../../components/backgroundChanger'
const ForgotPassSuccess = () => (
	<Container style={{ marginTop: 100 }}>
		<BackgroundChanger backgroundColor="#F5F5F5" />
		<Typography variant="h4">Your New Password Will Be Sent To Your Registered Email Shortly</Typography>
	</Container>
)

export default ForgotPassSuccess
