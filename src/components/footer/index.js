import React from 'react'

//materialui dependencies
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'

const useStyles = makeStyles((theme) => ({
	appBar: {
		[theme.breakpoints.up('sm')]: {
			minHeight: 64,
		},
		top: 'auto',
		padding: 15,
		bottom: 0,
		minHeight: 56,
		background: 'rgba(56, 56, 56, 0)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}))

const Footer = (props) => {
	const classes = useStyles()

	return (
		<Paper square className={classes.appBar}>
			<Divider />
			<Typography noWrap align="center" className="colorwhite">
				Website has been designed and optimised for Google Chrome
			</Typography>
		</Paper>
	)
}

export default Footer
