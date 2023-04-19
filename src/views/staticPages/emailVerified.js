import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'

import BackgroundChanger from '../../components/backgroundChanger'
const EmailVerified = () => (
	<Container style={{ marginTop: 100 }}>
		<BackgroundChanger backgroundColor="#F5F5F5" />
		<Typography variant="h4">Your Email Is Successfully Verified</Typography>
		<div style={{ padding: 15 }} />
		<a href="/login/company">
			<Button variant="contained" color="primary" fullWidth>
				Login now
			</Button>
		</a>
	</Container>
)

export default EmailVerified
