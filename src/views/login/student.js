import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import StudentSignInBtn from '../../components/StudentSignInBtn'

import BackgroundChanger from '../../components/backgroundChanger'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Fade from '@material-ui/core/Fade'

const StudentLogin = (props) => {
	const history = useHistory()

	const handleLoginSuccess = () => {
		history.push(props.refreshRedirectLocation || '/login/student/portal')
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container>
				<BackgroundChanger backgroundColor="#F5F5F5" />
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
						Student Login
					</Typography>
					<StudentSignInBtn
						style={{ width: '100%', height: 100, maxWidth: 400, border: '1px solid' }}
						onSuccess={handleLoginSuccess}
						newSnack={props.newSnack}
					/>
					<div style={{ padding: 15 }} />
					<Typography align="center" style={{ maxWidth: 350 }}>
						By signing in, you agree with{' '}
						<Link to="/students/placementrules" style={{ color: 'blue' }}>
							the placement
						</Link>{' '}
						and{' '}
						<Link to="/students/internrules" style={{ color: 'blue' }}>
							the internship
						</Link>{' '}
						policies and would abide by it.
					</Typography>
					<div style={{ padding: 15 }} />
				</Paper>
			</Container>
		</Fade>
	)
}

export default StudentLogin
