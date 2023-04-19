import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import BackgroundChanger from '../../components/backgroundChanger'
const EmailLinkExpired = () => (
	<Container style={{ marginTop: 100 }}>
		<BackgroundChanger backgroundColor="#F5F5F5" />
		<Typography variant="h4" color="error">
			Your Email Link Has Expired
		</Typography>
	</Container>
)

export default EmailLinkExpired
