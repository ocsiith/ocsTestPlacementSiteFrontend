/* eslint-disable react/jsx-pascal-case */
import React, { useState } from 'react'
import Axios from 'axios'

import { useHistory, Route, Switch, useLocation } from 'react-router-dom'

import BackgroundChanger from '../../components/backgroundChanger'

//views
import NewRecruitListing from './newRecruitListing'
import Home from './home'
import ManageListings from './manageListings'
// eslint-disable-next-line
import Form3 from './form3'
import ChangePassword from './changepassword'
import Profiles from './profiles'
import Feedback from './feedback'

import { companyBasicData } from '../../constants/addresses'

import Container from '@material-ui/core/Container'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'

import NewListingIcon from '@material-ui/icons/AddCircleOutline'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import HomeIcon from '@material-ui/icons/Home'
import ManageListingsIcon from '@material-ui/icons/FileCopy'
// eslint-disable-next-line
import Form3Icon from '@material-ui/icons/FormatAlignLeft'
import KeyIcon from '@material-ui/icons/VpnKey'
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle'
import SmsIcon from '@material-ui/icons/Sms';

const useStyles = makeStyles((theme) => ({
	paper: {
		width: 300,
	},
	backdrop: {
		width: '100%',
		height: '100%',
	},
}))

const companyPortalAddress = '/login/company/portal'

export const allPages = [
	{
		view: Home,
		name: 'Dashboard',
		to: companyPortalAddress + '/',
		icon: HomeIcon,
		exact: true,
	},
	{
		view: Profiles,
		name: 'Profiles',
		to: companyPortalAddress + '/profiles',
		icon: SupervisedUserCircleIcon,
		exact: true,
	},
	{
		view: NewRecruitListing,
		name: 'Create new Listing',
		to: companyPortalAddress + '/newlisting',
		icon: NewListingIcon,
		exact: true,
	},
	{
		view: ManageListings,
		name: 'Manage Listings',
		to: companyPortalAddress + '/managelisitngs',
		icon: ManageListingsIcon,
		exact: false,
	},
	// {
	// 	view: Form3,
	// 	name: 'Form 3',
	// 	to: companyPortalAddress + '/form3',
	// 	icon: Form3Icon,
	// 	exact: true,
	// },
	{
		view: ChangePassword,
		name: 'Change Password',
		to: companyPortalAddress + '/changepassword',
		icon: KeyIcon,
		exact: true,
	},
	{
		view: Feedback,
		name: 'Feedback',
		to: companyPortalAddress + '/feedback',
		icon: SmsIcon,
		exact: true,
	},
]

const getDataUsingAccessToken = async (token) => {
	const config = { headers: { Authorization: `BEARER ${token}` } }
	const res = await Axios.get(companyBasicData, config).catch((error) => {
		console.error(error)
	})
	return res.data
}

const PortalMenu = (Props) => {
	const history = useHistory()
	const location = useLocation()
	const classes = useStyles()

	const handleClick = (Page) => {
		Props.setCurrentPage({ name: Page.name, icon: Page.icon })
		setTimeout(() => history.push(Page.to), 0)
	}

	React.useEffect(() => {
		allPages.map((page) => {
			if ((page.to + '/').includes(location.pathname)) {
				if (location.pathname === companyPortalAddress || location.pathname === companyPortalAddress + '/') {
					Props.setCurrentPage({ name: 'Dashboard', icon: HomeIcon })
				} else Props.setCurrentPage({ name: page.name, icon: page.icon })
			}
			return 0
		})
		// eslint-disable-next-line
	}, [location.pathname])

	return (
		<PopupState variant="popover">
			{(popupState) => (
				<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%', marginTop:"10px" }}>
					<Typography style={{ flexGrow: 1 }} />
					<Button
						size="medium"
						style={{ color: 'black' }}
						startIcon={<Props.currentPage.icon />}
						endIcon={<ArrowDropDownIcon />}
						variant="outlined"
						{...bindTrigger(popupState)}
					>
						{Props.currentPage.name}
					</Button>
					<Menu
						PopoverClasses={{ paper: classes.paper }}
						onClick={popupState.close}
						{...bindMenu(popupState)}
					>
						{allPages.map((Page) => (
							<MenuItem key={Page.name} onClick={() => handleClick(Page)}>
								<ListItemIcon style={{ marginRight: -25 }}>
									<Page.icon fontSize="small" />
								</ListItemIcon>
								<Typography noWrap>{Page.name}</Typography>
							</MenuItem>
						))}
					</Menu>
				</div>
			)}
		</PopupState>
	)
}

const CompanyPortal = (props) => {
	const classes = useStyles()
	const history = useHistory()
	const location = useLocation()
	const [loading, setLoading] = useState(true)
	const [fetchedData, setFetchedData] = useState({})
	const [updated, setUpdated] = useState(0)
	const [currentPage, setCurrentPage] = useState(allPages[0])

	const updateData = () => {
		setUpdated(updated + 1)
	}

	React.useEffect(() => {
		if (props.companyCredentials.success) {
			setLoading(true)
			getDataUsingAccessToken(props.companyCredentials.accessToken).then((res) => {
				if (!res.success) {
					setTimeout(() => {
						props.setRefreshRedirectLocation(location.pathname)
						history.push('/login/refreshtoken')
					}, 0)
				} else {
					setFetchedData(res.message)
					setLoading(false)
				}
			})
		} else {
			setTimeout(() => {
				history.push('/login')
			}, 0)
		}
		// eslint-disable-next-line
	}, [updated])

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<Backdrop
					className={classes.backdrop}
					unmountOnExit
					style={{ color: 'black', zIndex: 1000 }}
					open={loading}
				>
					<CircularProgress style={{ color: 'white' }} />
				</Backdrop>
				<PortalMenu fetchedData={fetchedData} currentPage={currentPage} setCurrentPage={setCurrentPage} />
				<Switch>
					{allPages.map((Page) => (
						<Route key={Page.name} path={Page.to} exact={Page.exact}>
							<Page.view
								setLoading={setLoading}
								newSnack={props.newSnack}
								parentProps={props}
								updateData={updateData}
								updated={updated}
								fetchedData={fetchedData}
							/>
						</Route>
					))}
				</Switch>
			</Container>
		</Fade>
	)
}

export default CompanyPortal
