import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'

import BackgroundChanger from '../../components/backgroundChanger'
const ForgotPassFailed = () => (
	<Container style={{ marginTop: 100 }}>
		<BackgroundChanger backgroundColor="#F5F5F5" />
		<Typography variant="h4" color="error">
			Your Password Reset Procedure Failed. Try Again or Contact OCS Office.
		</Typography>
	</Container>
)

export default ForgotPassFailed
