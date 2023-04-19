import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

const DialogButton = (props) => {
	const [open, setOpen] = React.useState(false)

	return (
		<React.Fragment>
			<Button variant="outlined" onClick={() => setOpen(true)}>
				{props.name ? props.name : 'Open'}
			</Button>
			<Dialog
				maxWidth="lg"
				open={open}
				onClose={() => setOpen(false)}
				fullWidth
				TransitionProps={{ unmountOnExit: true }}
			>
				<DialogTitle>{props.title}</DialogTitle>
				<DialogContent>{props.children}</DialogContent>
				<DialogActions>
					<Button variant="contained" color="primary" onClick={() => setOpen(false)}>
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	)
}

export default DialogButton
