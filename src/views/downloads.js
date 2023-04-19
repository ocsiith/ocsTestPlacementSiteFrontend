/* eslint-disable */

import React from 'react'
import ReactPlayer from 'react-player/lazy'
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

	const itemList = [
		{
			text: 'Video 1',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName('display1')).forEach(myFunction1)
				setOpen(!open)
			},
		},
		{
			text: 'Video 2',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName('display2')).forEach(myFunction1)
				setOpen(!open)
			},
		},
		{
			text: 'Video 3',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName('display3')).forEach(myFunction1)
				setOpen(!open)
			},
		},

		{
			text: 'Show All',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach((item, index) => {
					item.style.display = 'block'
				})
			},
		},
	]

	/*const handleClick = () => {
		setOpen(!open)
	}*/
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
	// const Accenture1 = React.lazy(() => import('./placementinterviews/accenture1'))
	// const Adobe1 = React.lazy(() => import('./placementinterviews/adobe1'))
	// const Adobe2 = React.lazy(() => import('./placementinterviews/adobe2'))
	// const Aisin = React.lazy(() => import('./placementinterviews/aisin'))

	return (
		<div style={{ width: '100vw', position: 'relative' }}>
			<div className={classes.root} style={{ width: '99vw' }}>
				<CssBaseline />
				<div>
					{/*<AppBar position="absolute" style={{ zIndex: '10' }} className={classes.appBar}>
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
	</AppBar>*/}
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
					<div className="nodisplay nodisplay1 display1">
						<center>
							<Typography variant="h4"> Webinar by Some Name</Typography>
							<br />
							<Typography variant="subtitle1">Some Description</Typography>
						</center>
						<br />
						<ReactPlayer
							className="reactplayer"
							controls="true"
							width="100%"
							//height="100%"
							url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
						/>
					</div>
					<div className="nodisplay display2">
						<center>
							<Typography variant="h4"> Webinar by Some Name</Typography>
						</center>
						<br />
						<ReactPlayer
							className="reactplayer"
							controls="true"
							width="100%"
							url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
						/>
					</div>
					<div className="nodisplay display2">
						<center>
							<Typography variant="h4"> Webinar by Some Name</Typography>
						</center>
						<br />
						<ReactPlayer
							className="reactplayer"
							controls="true"
							width="100%"
							url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
						/>
					</div>
					<div className="nodisplay display3">
						<center>
							<Typography variant="h4"> Webinar by Some Name</Typography>
						</center>
						<br />
						<ReactPlayer
							className="reactplayer"
							controls="true"
							width="100%"
							url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
						/>
					</div>
					{/**/}
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
