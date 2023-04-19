import React from 'react'

import BackgroundChanger from '../../components/backgroundChanger'

import Container from '@material-ui/core/Container'
import Fade from '@material-ui/core/Fade'

import Form from './form'

const CompanyRegister = (props) => {
	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<Form {...props} />
			</Container>
		</Fade>
	)
}

export default CompanyRegister
