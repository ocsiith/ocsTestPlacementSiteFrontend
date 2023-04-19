import React from 'react'

import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const Snacks = (props) => {
	return (
		<Snackbar
			anchorOrigin={{
				vertical: 'bottom',
				horizontal: 'left',
			}}
			open={props.open}
			autoHideDuration={60000}
			onClose={props.handleClose}
		>
			<Alert elevation={6} onClose={props.handleClose} variant="filled" severity={props.severity || 'info'}>
				{props.text}
			</Alert>
		</Snackbar>
	)
}

export default Snacks
