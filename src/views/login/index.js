import React from 'react'
import { useHistory } from 'react-router-dom'

import BackgroundChanger from '../../components/backgroundChanger'
//materialui dependencies
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import ButtonBase from '@material-ui/core/ButtonBase'
import Fade from '@material-ui/core/Fade'

const LoginPage = (props) => {
	const history = useHistory()

	const [hoverOnStudent, setHoverOnStudent] = React.useState(false)
	const [hoverOnCompany, setHoverOnCompany] = React.useState(false)

	const handleHoverStudent = (entered) => {
		if (entered === true) setHoverOnStudent(true)
		else setHoverOnStudent(false)
	}

	const handleHoverCompany = (entered) => {
		if (entered === true) setHoverOnCompany(true)
		else setHoverOnCompany(false)
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<div
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<div style={{ width: '60%', minWidth: '320px', margin: 20 }}>
						<ButtonBase
							style={{
								width: '100%',
								height: '100%',
								color: 'blue',
							}}
							onClick={() => {
								props.studentCredentials.success
									? history.push('/login/student/portal')
									: history.push('/login/student')
							}}
						>
							<Paper
								onMouseEnter={() => handleHoverStudent(true)}
								onMouseLeave={() => handleHoverStudent(false)}
								elevation={3}
								style={{
									width: '100%',
									height: '100%',
									border: '1px solid',
									backgroundColor: hoverOnStudent ? '#F0F8FF' : 'white',
								}}
							>
								<Toolbar style={{ justifyContent: 'center', display: 'flex' }}>
									<Typography align="center" variant="button">
										Student Portal
									</Typography>
								</Toolbar>
							</Paper>
						</ButtonBase>
					</div>
					<div style={{ width: '60%', minWidth: '320px', margin: 20 }}>
						<ButtonBase
							style={{ width: '100%', height: '100%', color: 'green' }}
							onClick={() => {
								props.companyCredentials.success
									? history.push('/login/company/portal')
									: history.push('/login/company')
							}}
						>
							<Paper
								onMouseEnter={() => handleHoverCompany(true)}
								onMouseLeave={() => handleHoverCompany(false)}
								elevation={3}
								style={{
									width: '100%',
									height: '100%',
									border: '1px solid',
									backgroundColor: hoverOnCompany ? '#F0F8FF' : 'white',
								}}
							>
								<Toolbar style={{ justifyContent: 'center', display: 'flex' }}>
									<Typography align="center" variant="button">
										Company Portal
									</Typography>
								</Toolbar>
							</Paper>
						</ButtonBase>
					</div>
				</div>
			</Container>
		</Fade>
	)
}

export default LoginPage
