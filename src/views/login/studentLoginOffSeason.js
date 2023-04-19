import React from 'react'
import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

function studentLoginOffSeason() {
	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Paper
					elevation={3}
					style={{
						margin: 10,
						padding: 30,
						display: 'flex',
						width: '60%',
						minWidth: 300,
						justifyContent: 'center',
					}}
				>
					<form style={{ width: '100%' }}>
						<Typography variant="button" style={{ flexGrow: 2, margin: 10 }}>
							Student registrations for the year 2020-2021 will be opened shortly.
						</Typography>
					</form>
				</Paper>
			</Container>
		</Fade>
	)
}

export default studentLoginOffSeason
