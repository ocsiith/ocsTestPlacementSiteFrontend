import React, { useState } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
//constants
import sideBarItems, { sideBarWidth } from '../../constants/sideBarItems'

import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import Aos from 'aos'

import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MuiMenuItem from '@material-ui/core/MenuItem'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpansionPanel from '@material-ui/core/Accordion'
import ExpansionPanelSummary from '@material-ui/core/AccordionSummary'
import ExpansionPanelDetails from '@material-ui/core/AccordionDetails'
import { allPages as companyPages } from '../../views/companyPortal/index'
import { allPages as studentPages } from '../../views/studentPortal/index'
const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightRegular,
	},
}))

const ListItemLink = (props) => {
	const renderLink = React.useMemo(
		() => React.forwardRef((linkProps, ref) => <Link ref={ref} to={props.to} {...linkProps} />),
		[props.to]
	)
	return (
		<ListItem button component={renderLink} style={{ width: '250px' }}>
			{props.icon ? <ListItemIcon>{props.icon}</ListItemIcon> : <></>}
			<ListItemText primary={props.name} />
		</ListItem>
	)
}

const ListItemLinkPortal = (props) => {
	console.log(props.atTop)
	const renderLink = React.useMemo(
		() => React.forwardRef((linkProps, ref) => <Link ref={ref} to={props.to} {...linkProps} />),
		[props.to]
	)
	return (
		<Button
			startIcon={<props.icon htmlColor={props.atTop ? '#555555' : 'white'} />}
			component={renderLink}
			style={{ color: '#555555', marginRight: 16, marginTop: 20 }}
		>
			<Typography
				variant="inherit"
				noWrap
				style={{
					color: props.atTop ? '#555555' : 'white',
					display: 'flex',
					alignItems: 'center',
				}}
			>
				{props.name}
			</Typography>
		</Button>
	)
}

const ListItemLinkPortalMobile = (props) => {
	const renderLink = React.useMemo(
		() => React.forwardRef((linkProps, ref) => <Link ref={ref} to={props.to} {...linkProps} />),
		[props.to]
	)
	return (
		<ListItem button component={renderLink} style={{ width: 'calc(' + sideBarWidth + ' + 230px - 7px)' }}>
			{props.icon ? (
				<ListItemIcon>
					<props.icon htmlColor={props.open ? '#F5F5F5' : '#555555'} />
				</ListItemIcon>
			) : (
				<></>
			)}
			<ListItemText
				primaryTypographyProps={{ noWrap: true, style: { color: props.open ? '#F5F5F5' : '#555555' } }}
				primary={props.name}
			/>
		</ListItem>
	)
}

const MenuItem = (props) => {
	const classes = useStyles()
	const [open, setOpen] = useState(false)

	React.useEffect(() => {
		setOpen(false)
	}, [props.open, setOpen])

	return (
		<ExpansionPanel
			square
			expanded={props.open ? open : false}
			onChange={(e, expanded) => setOpen(expanded)}
			style={{
				minWidth: sideBarWidth + 230 - 7,
				background: 'rgba(56,56,56,0)',
				color: '#F5F5F5',
				border: '0px solid rgba(0, 0, 0, .125)',
				boxShadow: 'none',
			}}
			TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
		>
			<ExpansionPanelSummary
				expandIcon={props.open ? <ExpandMoreIcon htmlColor="#F5F5F5" /> : undefined}
				aria-controls="panel1a-content"
				style={{ display: 'flex', alignItems: 'center' }}
			>
				{props.icon ? (
					<div style={{ marginRight: 10 }}>
						<span style={{ ...iconStyle, background: '#383838' }}>
							<props.icon />
						</span>
					</div>
				) : (
					''
				)}
				{props.open ? (
					<Typography className={classes.heading} style={{ display: 'flex', alignItems: 'center' }}>
						{props.name}
					</Typography>
				) : undefined}
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
				<div onClick={props.onClick} onKeyDown={props.onKeyDown}>
					{props.sections
						.filter((item) => !item.hidden)
						.map((item, index) => {
							return <ListItemLink icon={item.icon} to={item.to} name={item.name} key={index} />
						})}
				</div>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	)
}

export const iconStyle = {
	padding: 5,
	borderRadius: '40%',
	background: 'rgb(170, 170, 170)',
	width: 40,
	height: 40,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
}

const MenuItemDark = (props) => {
	const history = useHistory()
	const location = useLocation()
	React.useEffect(() => {
		Aos.init({ duration: 100 })

		var btns = document.getElementsByClassName('navbarbuttons')
		for (var i = 0; i < btns.length; i++) {
			/*btns[i].addEventListener('click', function () {
				this.style.backgroundColor = '#002238'
					var current = document.getElementsByClassName('activenavbar')
				if (current[0]) current[0].className = current[0].className.replace(' activenavbar', '')
				this.className += ' activenavbar'
			})
			/*btns[i].removeEventListener('click', function () {
				this.style.backgroundColor = '#00223800'
					var current = document.getElementsByClassName('activenavbar')
				if (current[0]) current[0].className = current[0].className.replace(' activenavbar', '')
				this.className += ' activenavbar'
			})*/
		}
	})
	/*const handleClick = (event) => {
		this.style.backgroundColor = '#002238'
	}
	const handleClose = (event) => {
		this.style.backgroundColor = '#00223800'
	}*/
	return (
		<PopupState variant="popover" popupId="demo-popup-menu">
			{(popupState) => (
				<React.Fragment>
					<button
						className={
							location.pathname.includes('topsecreturl') ||
							location.pathname.includes('login') ||
							location.pathname.includes('refreshtoken')
								? 'navbarbuttons navbarbuttons1'
								: 'navbarbuttons'
						}
						{...bindTrigger(popupState)}
					>
						<span className="text">
							<Typography
								variant="inherit"
								noWrap
								style={{
									display: 'flex',
									alignItems: 'center',
									filter:
										location.pathname.includes('topsecreturl') ||
										location.pathname.includes('login') ||
										location.pathname.includes('refreshtoken')
											? ''
											: 'drop-shadow(0 0 1.5px grey)',
									color:
										location.pathname.includes('/topsecreturl') &&
										(!props.atTop ? '#F5F5F5' : '#555555'),
								}}
							>
								{' '}
								&nbsp;
								<props.icon
									htmlColor={
										location.pathname.includes('topsecreturl')
											? !props.atTop
												? '#F5F5F5'
												: '#555555'
											: location.pathname.includes('login') ||
											  location.pathname.includes('refreshtoken')
											? '#555555'
											: '#F5F5F5'
									}
									// htmlColor={(props.atTop && location.pathname !== ('/' || '/home' || '/reachus')) ? '#555555' : '#F5F5F5'}
								/>{' '}
								&nbsp;&nbsp;
								{props.name}&nbsp;
								<ExpandMoreIcon
								/*htmlColor={
										location.pathname.includes('topsecreturl') ||
										location.pathname.includes('login') ||
										location.pathname.includes('refreshtoken')
											? '#555555'
											: '#F5F5F5'
									}*/
								/>
								&nbsp;
							</Typography>
						</span>
					</button>

					<Menu
						{...bindMenu(popupState)}
						//onClose={handleClose}
						elevation={0}
						getContentAnchorEl={null}
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						transformOrigin={{
							vertical: 'top',
							horizontal: 'left',
						}}
						PaperProps={{
							style: {
								marginTop: '0.65%',
								color: 'black',
								borderRadius: '0px',
								backgroundColor: 'white',
								boxShadow: '0px 0px 4px black',
							},
						}}
					>
						{' '}
						<div>
							<MuiMenuItem disabled style={{ opacity: 0.5, display: 'none' }}>
								<Typography
									variant="button"
									noWrap
									style={{ color: 'F5F5F5', display: 'flex', alignItems: 'center' }}
								>
									<props.icon fontSize="small" />
									<span style={{ marginLeft: 8 }}>{props.name}</span>
								</Typography>
							</MuiMenuItem>
							{props.sections
								.filter((item) => !item.hidden)
								.map((item, index) => (
									<div className="somethingsomething" key={index}>
										<MuiMenuItem
											//onClick={handleClose}
											onClick={() => {
												history.push(item.to)
												popupState.close()
											}}
										>
											<Typography variant="inherit" noWrap>
												{item.name}
											</Typography>
										</MuiMenuItem>
									</div>
								))}
						</div>
					</Menu>
				</React.Fragment>
			)}
		</PopupState>
	)
}

// <ExpansionPanel
// square
// expanded={props.open ? open : false}
// onChange={(e, expanded) => setOpen(expanded)}
// style={{
// 	background: 'rgba(56,56,56,0)',
// 	color: props.open ? '#F5F5F5' : '#F5F5F5',
// 	border: '0px',
// 	boxShadow: 'none',
// }}
// TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
// >
// <ExpansionPanelSummary
// 	style={{ display: 'flex', alignItems: 'center' }}
// >
// 	{props.icon ? (
// 		<div style={{ marginRight: 10 }}>
// 			<span style={{ ...iconStyle, backgroundColor: '#383838' }}>{props.icon}</span>
// 		</div>
// 	) : (
// 		''
// 	)}
// 	{props.open ? (
// 		<Typography className={classes.heading} style={{ display: 'flex', alignItems: 'center' }}>
// 			{props.name}
// 		</Typography>
// 	) : undefined}
// </ExpansionPanelSummary>
// <ExpansionPanelDetails>
// 	<div onClick={props.onClick} onKeyDown={props.onKeyDown}>
// {props.sections.map((item, index) =>
// 	item.hidden ? (
// 		<React.Fragment key={index}></React.Fragment>
// 	) : (
// 		<ListItemLink icon={item.icon} to={item.to} name={item.name} key={index} />
// 	)
// )}
// 	</div>
// </ExpansionPanelDetails>
// </ExpansionPanel>

const MenuItemPortal = (props) => {
	return (
		<div onClick={props.onClick} onKeyDown={props.onKeyDown}>
			<ListItemLinkPortal
				open={props.open}
				icon={props.icon}
				to={props.to}
				name={props.name}
				atTop={props.atTop}
			/>
		</div>
	)
}

const MenuItemPortalMobile = (props) => {
	return (
		<div onClick={props.onClick} onKeyDown={props.onKeyDown}>
			<ListItemLinkPortalMobile open={props.open} icon={props.icon} to={props.to} name={props.name} />
		</div>
	)
}

const SideBar = (props) => {
	return (
		<div role="presentation">
			<List>
				<div>
					{sideBarItems.map((item, index) => {
						return item.hidden ? (
							<React.Fragment key={index}></React.Fragment>
						) : (
							<MenuItem
								onClick={() => props.toggleDrawer(false)}
								onKeyDown={() => props.toggleDrawer(false)}
								to={item.to}
								open={props.open}
								icon={item.icon}
								key={index}
								name={item.name}
								sections={item.sections}
							/>
						)
					})}
				</div>
			</List>
		</div>
	)
}

export const SideBarDarkIcons = (props) => {
	return (
		<div role="presentation">
			<List style={{ width: '100%' }}>
				<div style={{ display: 'flex', justifyContent: 'space-evenly', width: '100%' }}>
					{sideBarItems.map((item, index) => {
						return item.hidden ? (
							<React.Fragment key={index}></React.Fragment>
						) : (
							<MenuItemDark
								onClick={() => props.toggleDrawer(false)}
								onKeyDown={() => props.toggleDrawer(false)}
								to={item.to}
								open={props.open}
								icon={item.icon}
								key={index}
								name={item.name}
								sections={item.sections}
								atTop={props.atTop}
							/>
						)
					})}
				</div>
			</List>
		</div>
	)
}

export const SideBarDesktop = (props) => {
	return (
		<div role="presentation">
			<List>
				{sideBarItems.map((item, index) => {
					return item.hidden ? (
						<React.Fragment key={index}></React.Fragment>
					) : (
						<MenuItem
							onClick={() => props.toggleDrawer(false)}
							onKeyDown={() => props.toggleDrawer(false)}
							to={item.to}
							open={props.open}
							iconBgColor={'#383838'}
							icon={item.icon}
							key={index}
							name={item.name}
							sections={item.sections}
						/>
					)
				})}
			</List>
		</div>
	)
}

export const SideBarCompany = (props) => {
	return (
		<div role="presentation">
			<div style={{ display: 'flex', paddingBottom: '12px' }}>
				{companyPages.map((item, index) => {
					return item.hidden ? (
						<React.Fragment key={index}></React.Fragment>
					) : (
						<MenuItemPortal
							onClick={() => props.toggleDrawer(false)}
							onKeyDown={() => props.toggleDrawer(false)}
							to={item.to}
							open={props.open}
							key={index}
							name={item.name}
							icon={item.icon}
							atTop={props.atTop}
						/>
					)
				})}
			</div>
		</div>
	)
}

export const SideBarCompanyMobile = (props) => {
	return (
		<div role="presentation">
			<List>
				<div>
					{companyPages.map((item, index) => {
						return item.hidden ? (
							<React.Fragment key={index}></React.Fragment>
						) : (
							<MenuItemPortalMobile
								onClick={() => props.toggleDrawer(false)}
								onKeyDown={() => props.toggleDrawer(false)}
								to={item.to}
								open={props.open}
								key={index}
								name={item.name}
								icon={item.icon}
							/>
						)
					})}
				</div>
			</List>
		</div>
	)
}

export const SideBarStudent = (props) => {
	return (
		<div
			style={{
				display: 'flex',
				overflow: 'auto',
				maxWidth: 'calc(100% - 48px - 48px - 48px - 74.28px)',
				alignItems: 'baseline',
			}}
		>
			{studentPages.map((item, index) => {
				return item.hidden ? (
					<React.Fragment key={index}></React.Fragment>
				) : (
					<MenuItemPortal
						onClick={() => props.toggleDrawer(false)}
						onKeyDown={() => props.toggleDrawer(false)}
						to={item.to}
						open={props.open}
						key={index}
						name={item.name}
						icon={item.icon}
						atTop={props.atTop}
					/>
				)
			})}
		</div>
	)
}

export const SideBarStudentMobile = (props) => {
	return (
		<div role="presentation">
			<List>
				<div>
					{studentPages.map((item, index) => {
						return item.hidden ? (
							<React.Fragment key={index}></React.Fragment>
						) : (
							<MenuItemPortalMobile
								onClick={() => props.toggleDrawer(false)}
								onKeyDown={() => props.toggleDrawer(false)}
								to={item.to}
								open={props.open}
								key={index}
								name={item.name}
								icon={item.icon}
							/>
						)
					})}
				</div>
			</List>
		</div>
	)
}

export default SideBar
