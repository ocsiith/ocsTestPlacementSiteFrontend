import React from 'react'
import { useHistory } from 'react-router-dom'

import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'

const NotFound404 = () => {
	const history = useHistory()
	return (
		<Fade in>
			<Container style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
				<Typography style={{ padding: 20 }}>
					<strong>404 Not Found</strong>
				</Typography>
				<Button variant="outlined" onClick={() => history.push('/')}>
					Go back to Home Page
				</Button>
			</Container>
		</Fade>
	)
}

export default NotFound404
