/* eslint-disable */

import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import * as data from './placementinterviews/2122_placement.json'
import DisplayExp from './placementinterviews/DisplayExp'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
	root: {
		[theme.breakpoints.up('sm')]: {
			display: 'flex',
		},
		[theme.breakpoints.down('sm')]: {
			marginRight: '-10%',
		},
	},
	drawer: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		[theme.breakpoints.up('sm')]: {
			width: `calc(100% - ${drawerWidth}px)`,
			marginLeft: drawerWidth,
		},
	},
	menuButton: {
		[theme.breakpoints.up('sm')]: {
			marginRight: theme.spacing(2),
			display: 'none',
		},
	},
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		[theme.breakpoints.up('sm')]: {
			width: drawerWidth,
		},
	},
	content: {
		[theme.breakpoints.up('sm')]: { flexGrow: 1, padding: theme.spacing(3) },
	},
}))

function ResponsiveDrawer(props) {
	const { window } = props
	const classes = useStyles()
	const theme = useTheme()
	const [mobileOpen, setMobileOpen] = React.useState(false)
	const [open, setOpen] = React.useState(true)

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen)
	}
	function myFunction(item, index) {
		item.style.display = 'none'
	}
	function myFunction1(item, index) {
		item.style.display = 'block'
	}

	let itemList = [
		{
			key: 200,
			text: 'Show All',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach((item, index) => {
					item.style.display = 'block'
				})
			},
		},
	]

	const companyList = data.students.map((student, index) => {
		return {
			key: index,
			text: student.company,
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName(student.company)).forEach(myFunction1)
				setOpen(!open)
			},
		}
	})

	const uniqueCompanyList = companyList.filter(
		(company, index) => companyList.findIndex((obj) => obj.text === company.text) === index
	)

	itemList.push(...uniqueCompanyList)

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List component="nav" aria-labelledby="nested-list-subheader">
				{itemList.map((item, index) => (
					<>
						<ListItem
							button
							key={item.text}
							onClick={() => {
								item.onClick()
							}}
						>
							{
								//<ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
							}
							<ListItemText primary={item.text} style={{ paddingLeft: '2vw' }} />
						</ListItem>
						<Divider />
					</>
				))}
			</List>{' '}
		</div>
	)

	const container = window !== undefined ? () => window().document.body : undefined

	return (
		<div style={{ width: '100vw', position: 'relative' }}>
			<div className={classes.root} style={{ width: '99vw' }}>
				<CssBaseline />
				<div>
					<AppBar position="absolute" style={{ zIndex: '10' }} className={classes.appBar}>
						<Toolbar>
							<IconButton
								color="inherit"
								aria-label="open drawer"
								edge="start"
								onClick={handleDrawerToggle}
								className={classes.menuButton}
							>
								<MenuIcon />
							</IconButton>
							<Typography variant="h6" noWrap>
								Responsive drawer
							</Typography>
						</Toolbar>
					</AppBar>
				</div>
				<nav className={classes.drawer} aria-label="mailbox folders" style={{ display: '' }}>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							style={{ position: 'relative', zIndex: 1 }}
							variant="temporrary"
							anchor={theme.direction === 'rtl' ? 'right' : 'left'}
							open={mobileOpen}
							onClose={handleDrawerToggle}
							classes={{
								paper: classes.drawerPaper,
							}}
							ModalProps={{
								keepMounted: true, // Better open performance on mobile.
							}}
						>
							<div className={classes.toolbar}>{drawer}</div>
						</Drawer>
					</Hidden>
					<Hidden xsDown implementation="css">
						<Drawer
							classes={{
								paper: classes.drawerPaper,
							}}
							style={{ position: 'relative', zIndex: 1 }}
							variant="permanent"
							open
						>
							{drawer}
						</Drawer>
					</Hidden>
				</nav>
				<main className={classes.content}>
					{' '}
					<div className={classes.toolbar} />
					{data.students.map((student, index) => {
						return (
							<div className={'nodisplay ' + student.company}>
								<DisplayExp
									key={index}
									name={student.Name}
									company={student.company}
									branch={student.branch}
									profile={student.profile}
									rounds={student.rounds}
									preparation={student.preparation}
									experience={student.experience}
									tips={student.tips}
								/>
							</div>
						)
					})}
				</main>
			</div>
		</div>
	)
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
}

export default ResponsiveDrawer
