import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import SideBar, {
	SideBarCompany,
	SideBarStudent,
	SideBarDarkIcons,
	SideBarStudentMobile,
	SideBarCompanyMobile,
} from '../sidebar'
import { sideBarWidth } from '../../constants/sideBarItems'

//materialui dependencies
import { makeStyles } from '@material-ui/core/styles'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import useScrollTrigger from '@material-ui/core/useScrollTrigger'
import Slide from '@material-ui/core/Slide'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Hidden from '@material-ui/core/Hidden'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ButtonBase from '@material-ui/core/ButtonBase'
import { useConfirm } from 'material-ui-confirm'
import Axios from 'axios'
import { studentNotificationStatus } from '../../constants/addresses'
import { Tooltip } from '@material-ui/core'
import {
	Notifications as NotificationsIcon,
	NotificationImportant as NotificationImportantIcon,
} from '@material-ui/icons'

import logoonlywhite from '../../static/logos/ocslogoonlywhite.png'
import logo from '../../static/logos/ocslogoonly.png'

const drawerWidth = sideBarWidth

const useStyles = makeStyles((theme) => ({
	navMenuIcon: {
		display: 'block',
		color: 'white',
		width: '70px',
		height: '60px',
		borderRadius: '10px',
	},
	drawer: {
		[theme.breakpoints.up('md')]: {
			width: drawerWidth,
			flexShrink: 0,
		},
	},
	appBar: {
		background: 'rgba(0, 0, 0, 0)',
		boxShadow: '0px 0px',
		transition: theme.transitions.create('background', {
			duration: theme.transitions.duration.shortest,
			easing: theme.transitions.easing.sharp,
		}),
	},
	menuButton: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	menuButtonStudentPortal: {
		marginRight: theme.spacing(2),
		[theme.breakpoints.up('xl')]: {
			display: 'none',
		},
	},
	NavBar: {
		backgroundColor: '#1976D2',
	},
	desktopDrawerPaper: {
		width: drawerWidth,
	},
	drawerPaperStylesOpen: {
		background: 'rgba(56,56,56,1)',
	},
	drawerPaperStylesClose: {
		background: 'rgba(56,56,56,0)',
		borderColor: 'rgba(0,0,0,0)',
	},
	drawerPaper: {
		width: drawerWidth + 230,
		zIndex: theme.zIndex.drawer,
	},
	drawerOpen: {
		width: drawerWidth + 230,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		direction: 'ltr',
		'&::-webkit-scrollbar': {
			width: '6px',
		},
		'&::-webkit-scrollbar-track': {
			boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
			webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: 'rgba(0,0,0,.1)',
			outline: '1px solid slategrey',
		},
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		overflowX: 'hidden',
		width: 70,
	},
	backdropOpen: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	backdropClose: {
		zIndex: theme.zIndex.drawer - 1,
		width: sideBarWidth,
		background: 'rgba(56, 56, 56, 0)',
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		marginRight: 16,
		padding: theme.spacing(0, 1),
		...theme.mixins.toolbar,
	},
}))

function HideOnScroll(props) {
	const { children } = props
	const trigger = useScrollTrigger()

	return (
		<Slide appear={false} direction="down" in={!trigger}>
			{children}
		</Slide>
	)
}

const MenuButton = (props) => {
	const history = useHistory()
	const location = useLocation()
	return (
		<PopupState variant="popover">
			{(popupState) => (
				<React.Fragment>
					<IconButton {...bindTrigger(popupState)}>
						<MoreVertIcon
							htmlColor={
								location.pathname.includes('/login/company/portal')
									? props.atTop
										? '#555555'
										: '#F5F5F5'
									: location.pathname.includes('topsecreturl') ||
									  location.pathname.includes('login/student')
									? props.atTop
										? '#555555'
										: '#F5F5F5'
									: location.pathname.includes('refreshtoken')
									? '#555555'
									: '#F5F5F5'
							}
						/>
					</IconButton>
					<Menu {...bindMenu(popupState)}>
						<MenuItem
							onClick={() => {
								props.newSnack('Logged out', 'info')
								window.gapi.auth2.getAuthInstance().signOut()
								props.parent.setCompCreds('')
								setTimeout(() => {
									history.push('/login')
								}, 0)
							}}
						>
							Logout
						</MenuItem>
					</Menu>
				</React.Fragment>
			)}
		</PopupState>
	)
}

const NotificationButton = (props) => {
	const [newNotification, setNewNotifications] = React.useState(false)
	const history = useHistory()
	const location = useLocation()

	React.useEffect(() => {
		const config = {
			headers: { Authorization: `BEARER ${props.accessToken}` },
		}
		Axios.get(studentNotificationStatus, config)
			.then(({ data }) => {
				if (data.success) setNewNotifications(data.unread)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	const handleClick = () => {
		history.push('/login/student/portal/notifications')
		props.updateData()
	}

	return (
		<Tooltip title={newNotification ? 'You have unread notification' : 'No new notifications'}>
			<IconButton style={{ color: 'white' }} onClick={handleClick}>
				{newNotification ? (
					<NotificationImportantIcon
						htmlColor={
							location.pathname.includes('topsecreturl') || location.pathname.includes('login')
								? props.atTop
									? '#555555'
									: '#F5F5F5'
								: location.pathname.includes('refreshtoken')
								? '#555555'
								: '#F5F5F5'
						}
					/>
				) : (
					<NotificationsIcon
						htmlColor={
							location.pathname.includes('topsecreturl') || location.pathname.includes('login')
								? props.atTop
									? '#555555'
									: '#F5F5F5'
								: location.pathname.includes('refreshtoken')
								? '#555555'
								: '#F5F5F5'
						}
					/>
				)}
			</IconButton>
		</Tooltip>
	)
}

const RightButton = (properties) => {
	const history = useHistory()
	const location = useLocation()
	const props = properties.parent
	if (props.studentCredentials.success || props.companyCredentials.success)
		return <MenuButton newSnack={props.newSnack} parent={props} atTop={properties.atTop} />
	else
		return (
			<Button
				onClick={() => {
					props.setNotifyingMsg('')
					history.push('/login')
				}}
				style={{
					color:
						location.pathname.includes('topsecreturl') || location.pathname.includes('login/student')
							? properties.atTop
								? '#555555'
								: '#F5F5F5'
							: location.pathname.includes('login') || location.pathname.includes('refreshtoken')
							? '#555555'
							: '#F5F5F5',
				}}
			>
				Login | Register
			</Button>
		)
}

const NavBar = (props) => {
	const classes = useStyles()
	const location = useLocation()
	const [drawerOpen, setDrawerOpen] = useState(false)
	const history = useHistory()
	const confirm = useConfirm()
	const [atTop, setAtTop] = useState(true)
	React.useEffect(() => {
		window.onscroll = function () {
			if (window.pageYOffset === 0) {
				setAtTop(true)
			}
			if (atTop) {
				setAtTop(false)
			}
		}
		return () => (window.onscroll = null)
	})

	const handleDrawerToggle = (open) => {
		setDrawerOpen(open)
	}

	return (
		<>
			<HideOnScroll>
				<AppBar
					className={classes.appBar}
					style={
						location.pathname.includes('/login/student/portal') && !atTop
							? { background: 'rgba(0, 34, 56, 1)' }
							: location.pathname.includes('/login/company/portal') && !atTop
							? { background: 'rgba(0, 34, 56, 1)' }
							: location.pathname.includes('/topsecreturl') && !atTop
							? { background: 'rgba(0, 34, 56, 1)' }
							: !(
									(!location.pathname.includes('/whyrecruit') ||
										location.pathname.includes('howto')) &&
									(!location.pathname.includes('/whyrecruit') ||
										location.pathname.includes('forms')) &&
									(!location.pathname.includes('/reachus') ||
										location.pathname === '/reachus/address') &&
									!location.pathname.includes('/about') &&
									location.pathname !== '/' &&
									location.pathname !== '/students/placementrules' &&
									location.pathname !== '/students/internrules' &&
									location.pathname !== '/students/guidetoprocor' &&
									location.pathname !== '/students/linkedin'
							  )
							? !atTop && { background: 'rgba(0, 34, 56, 1)' }
							: location.pathname.includes('topsecreturl') ||
							  location.pathname.includes('login') ||
							  location.pathname.includes('refreshtoken')
							? { background: 'rgba(245, 245, 245, 1)' }
							: { background: 'rgba(0, 34, 56, 1)' }
					}
					/*style={
						!(location.pathname !== '/')
							? !atTop && { background: 'rgba(0, 34, 56, 1)' }
							: location.pathname.includes('topsecreturl') ||
								location.pathname.includes('login') ||
								location.pathname.includes('refreshtoken')
							? {}
							: { background: 'rgba(0, 34, 56, 1)' }
					}*/
					position="fixed"
				>
					<Toolbar variant="regular">
						<IconButton
							className={
								location.pathname.includes('login/student/portal')
									? classes.menuButtonStudentPortal
									: classes.menuButton
							}
							edge="start"
							style={{ color: 'white' }}
							onClick={() => handleDrawerToggle(true)}
						>
							<MenuIcon
								style={{
									color: location.pathname.includes('login/company/portal')
										? atTop
											? '#555555'
											: '#F5F5F5'
										: location.pathname.includes('login/student/portal')
										? atTop
											? '#555555'
											: '#F5F5F5'
										: location.pathname.includes('topsecreturl') ||
										  location.pathname.includes('login')
										? '#555555'
										: '#F5F5F5',
								}}
							/>
						</IconButton>
						<Hidden smDown lgDown={location.pathname.includes('login/student/portal')} implementation="js">
							<div style={{ display: 'flex'}}>
								<ButtonBase
									onClick={() => setTimeout(() => history.push('/'))}
									className={classes.toolbar}
								>
									<Typography
										variant="button"
										noWrap
										style={{
											color:
												location.pathname.includes('topsecreturl') ||
												location.pathname.includes('login') ||
												location.pathname.includes('refreshtoken')
													? '#555555'
													: '#F5F5F5',
											display: 'flex',
											alignItems: 'center',
										}}
									>
										<img
											alt="home"
											src={
												location.pathname.includes('topsecreturl') ||
												location.pathname.includes('login') ||
												location.pathname.includes('refreshtoken')
													? logo
													: logoonlywhite
											}
											style={{ height: 36 }}
										/>
										{/* <span>Office of Career Services</span> */}
									</Typography>
								</ButtonBase>
							</div>
							{location.pathname.includes('login/company/portal') ? (
								<SideBarCompany open toggleDrawer={(open) => open} atTop={atTop} />
							) : location.pathname.includes('login/student/portal') ? (
								<SideBarStudent open toggleDrawer={(open) => open} atTop={atTop} />
							) : location.pathname.includes('topsecreturl') || location.pathname.includes('login') ? (
								<SideBarDarkIcons open toggleDrawer={(open) => open} atTop={atTop} />
							) : (
								<SideBarDarkIcons open toggleDrawer={(open) => open} atTop={atTop} />
							)}
						</Hidden>
						<Typography variant="h6" noWrap style={{ flexGrow: 1 }} />
						{/* {props.studentCredentials.accessToken ? (
							<NotificationButton
								updated={props.updated}
								updateData={props.updateData}
								accessToken={props.studentCredentials.accessToken}
								newSnack={props.newSnack}
								atTop={atTop}
							/>
						) : (
							<React.Fragment></React.Fragment>
						)} */}
						<RightButton newSnack={props.newSnack} parent={props} atTop={atTop} />
					</Toolbar>
				</AppBar>
			</HideOnScroll>
			<nav className={classes.drawer}>
				<Hidden
					mdUp={!location.pathname.includes('login/student/portal')}
					xlUp={location.pathname.includes('login/student/portal')}
					implementation="js"
				>
					<SwipeableDrawer
						anchor="left"
						open={drawerOpen}
						onOpen={() => handleDrawerToggle(true)}
						onClose={() => handleDrawerToggle(false)}
						classes={{
							paper: classes.drawerPaper,
						}}
						PaperProps={{ className: classes.drawerPaperStylesOpen }}
						ModalProps={{
							keepMounted: true,
						}}
					>
						<ButtonBase
							onClick={() =>
								confirm({ title: 'Go to Home Page?' })
									.then(() => {
										setTimeout(() => history.push('/'))
										setDrawerOpen(false)
									})
									.catch(() => {})
							}
							className={classes.toolbar}
							style={{ justifyContent: 'center' }}
						>
							<Typography
								variant="button"
								noWrap
								style={{
									color: '#F5F5F5',
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<img
									alt=""
									src={require('../../static/logos/ocslogoonlywhite.png')}
									style={{ height: 36, marginRight: 16 }}
								/>
								<span>Office of Career Services</span>
							</Typography>
						</ButtonBase>
						{location.pathname.includes('login/company/portal') ? (
							<SideBarCompanyMobile open={drawerOpen} toggleDrawer={handleDrawerToggle} />
						) : location.pathname.includes('login/student/portal') ? (
							<SideBarStudentMobile open={drawerOpen} toggleDrawer={handleDrawerToggle} />
						) : location.pathname.includes('topsecreturl') ? (
							<SideBarDarkIcons open={drawerOpen} toggleDrawer={handleDrawerToggle} />
						) : (
							<SideBar open={drawerOpen} toggleDrawer={handleDrawerToggle} />
						)}
					</SwipeableDrawer>
				</Hidden>
				{/* <Hidden smDown implementation="js">
					<Backdrop
						open
						className={clsx({
							[classes.backdropOpen]: desktopDrawerOpen,
							[classes.backdropClose]: !desktopDrawerOpen,
						})}
						onClick={!desktopDrawerOpen ? () => setDesktopDrawerOpen(!desktopDrawerOpen) : undefined}
					>
						<ClickAwayListener onClickAway={() => setDesktopDrawerOpen(false)}>
							<Drawer
								variant="permanent"
								className={clsx({
									[classes.drawerOpen]: desktopDrawerOpen,
									[classes.drawerClose]: !desktopDrawerOpen,
								})}
								classes={{
									paper: clsx({
										[classes.drawerOpen]: desktopDrawerOpen,
										[classes.drawerClose]: !desktopDrawerOpen,
									}),
								}}
								PaperProps={{
									className: clsx({
										[classes.drawerPaperStylesOpen]: desktopDrawerOpen,
										[classes.drawerPaperStylesClose]: !desktopDrawerOpen,
									}),
								}}
							>
								<div
									style={{
										display: 'flex',
										justifyContent: desktopDrawerOpen ? 'flex-end' : 'center',
										alignItems: 'center',
									}}
								>
									<div className={classes.toolbar} style={{ paddingLeft: 0, paddingRight: 0 }} />
									{desktopDrawerOpen ? (
										<ButtonBase
											onClick={() =>
												confirm({ title: 'Go to Home Page?' })
													.then(() => {
														setTimeout(() => history.push('/'))
														setDesktopDrawerOpen(false)
													})
													.catch(() => {})
											}
											className={classes.toolbar}
										>
											<Typography
												variant="button"
												noWrap
												style={{ color: '#F5F5F5', flexGrow: 1 }}
											>
												Office of Career Services
											</Typography>
										</ButtonBase>
									) : (
										''
									)}
									<IconButton onClick={() => setDesktopDrawerOpen(!desktopDrawerOpen)}>
										{!desktopDrawerOpen ? (
											<span
												style={{
													...iconStyle,
													background: !location.pathname.includes('login') && '#383838',
												}}
											>
												<ChevronRightIcon
													htmlColor={
														location.pathname.includes('login/company/portal')
															? '#555555'
															: location.pathname.includes('login/student/portal')
															? '#555555'
															: location.pathname.includes('topsecreturl') ||
															  location.pathname.includes('login')
															? '#555555'
															: '#F5F5F5'
													}
												/>
											</span>
										) : (
											<CloseIcon htmlColor="#F5F5F5" />
										)}
									</IconButton>
								</div>
								{location.pathname.includes('login/company/portal') ? (
									<SideBarCompany
										open={desktopDrawerOpen}
										toggleDrawer={(open) => setDesktopDrawerOpen(open)}
									/>
								) : location.pathname.includes('login/student/portal') ? (
									<SideBarStudent
										open={desktopDrawerOpen}
										toggleDrawer={(open) => setDesktopDrawerOpen(open)}
									/>
								) : location.pathname.includes('topsecreturl') ||
								  location.pathname.includes('login') ? (
									<SideBarDarkIcons
										open={desktopDrawerOpen}
										toggleDrawer={(open) => setDesktopDrawerOpen(open)}
									/>
								) : (
									<SideBarDarkIcons
										open={desktopDrawerOpen}
										toggleDrawer={(open) => setDesktopDrawerOpen(open)}
									/>
								)}
							</Drawer>
						</ClickAwayListener>
					</Backdrop>
				</Hidden> */}
			</nav>
		</>
	)
}

export default NavBar
