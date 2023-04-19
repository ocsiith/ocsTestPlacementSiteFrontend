/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import Axios from 'axios'

import { useHistory, Route, Switch, useLocation } from 'react-router-dom'

import { studentGetData } from '../../constants/addresses'

//views
import PersonalInfo from './personalInfo'
import AllApplications from './manageApplications'
import AcademicInfo from './academicinfo'
import AllCompanies from './companiesoncampus'
import Documents from './manageDocuments/index'
import MasterCV from './masterCV'
// import NotificationCenter from './notificationCenter'
import Webinars from './webinars'
// import StudentPreferencePage from './studentPref'

//Mui
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import PopupState, { bindTrigger, bindMenu } from 'material-ui-popup-state'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Container from '@material-ui/core/Container'

//icons
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import PersonIcon from '@material-ui/icons/Person'
import ExploreIcon from '@material-ui/icons/Explore'
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary'
import CompanyIcon from '@material-ui/icons/Business'
import DocumentIcon from '@material-ui/icons/Description'
import FilesIcon from '@material-ui/icons/FileCopy'
// import NotificationsIcon from '@material-ui/icons/Notifications'
// import FilterListIcon from '@material-ui/icons/FilterList'

import BackgroundChanger from '../../components/backgroundChanger'

const useStyles = makeStyles((theme) => ({
	paper: {
		width: 300,
		zIndex: 1000,
	},
	backdrop: {
		width: '100%',
		height: '100%',
	},
}))

const getDataUsingAccessToken = async (token) => {
	const config = { headers: { Authorization: `BEARER ${token}` } }
	const res = await Axios.get(studentGetData, config).catch((error) => {
		console.error(error)
	})
	//console.log(res.data)
	return res.data
}

const studentPortalAddress = '/login/student/portal'

export const allPages = [
	{
		view: PersonalInfo,
		name: 'Personal Information',
		to: studentPortalAddress + '/',
		icon: PersonIcon,
		exact: true,
	},
	{
		view: AcademicInfo,
		name: 'Academic Details',
		to: studentPortalAddress + '/acadinfo',
		icon: LocalLibraryIcon,
		exact: true,
	},
	{
		view: MasterCV,
		name: 'Master CV',
		to: studentPortalAddress + '/masterCV',
		icon: DocumentIcon,
		exact: false,
	},
	{
		view: Documents,
		name: 'Manage Documents',
		to: studentPortalAddress + '/documents',
		icon: FilesIcon,
		exact: false,
	},
	{
		view: AllCompanies,
		name: 'Jobs on Campus',
		to: studentPortalAddress + '/allcompanies',
		icon: CompanyIcon,
		exact: false,
	},
	{
		view: AllApplications,
		name: 'Manage Applications',
		to: studentPortalAddress + '/applications',
		icon: ExploreIcon,
		exact: true,
	},
	// {
	// 	view: NotificationCenter,
	// 	name: 'Notification Center',
	// 	to: studentPortalAddress + '/notifications',
	// 	icon: NotificationsIcon,
	// 	exact: true,
	// },
	// {
	// 	view: StudentPreferencePage,
	// 	name: 'Preferences',
	// 	to: studentPortalAddress + '/preferences',
	// 	icon: FilterListIcon,
	// 	exact: false,
	// },
]

const PortalMenu = (Props) => {
	const history = useHistory()
	const classes = useStyles()
	const location = useLocation()

	const handleClick = (Page) => {
		Props.setCurrentPage({ name: Page.name, icon: Page.icon })
		//Props.updateData()
		setTimeout(() => history.push(Page.to), 0)
	}

	React.useEffect(() => {
		allPages.map((page) => {
			if ((page.to + '/').includes(location.pathname)) {
				if (location.pathname === studentPortalAddress || location.pathname === studentPortalAddress + '/')
					Props.setCurrentPage({ name: 'Personal Information', icon: PersonIcon })
				else Props.setCurrentPage({ name: page.name, icon: page.icon })
			}
			return 0
		})
		// eslint-disable-next-line
	}, [location.pathname])

	return (
		<PopupState variant="popover">
			{(popupState) => (
				<div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
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

const StudentPortal = (props) => {
	const history = useHistory()
	const classes = useStyles()

	const { gapi } = window

	const [fetchedData, setFetchedData] = React.useState({})
	const [currentPage, setCurrentPage] = React.useState({ name: 'Personal Information', icon: PersonIcon })
	const [loading, setLoading] = React.useState(true)
	const [updated, setUpdated] = React.useState(0)
	const [fetchedNewData, setfetchedNewData] = React.useState(true)

	const updateData = () => {
		props.updateData()
		setUpdated(updated + 1)
	}

	React.useEffect(() => {
		;(async () => {
			setLoading(true)
			const authInstance = await gapi.auth2.getAuthInstance()
			const isSignedIn = await authInstance.isSignedIn.get()
			const authResponse = await (await authInstance.currentUser.get()).getAuthResponse()
			if (isSignedIn) {
				setfetchedNewData(false)
				getDataUsingAccessToken(authResponse.id_token).then((res) => {
					setFetchedData(res)
					if (!res.success) {
						authInstance.signOut()
					} else setLoading(false)
					setfetchedNewData(true)
				})
			} else {
				setTimeout(() => history.push('/login'), 0)
			}
		})()
		// eslint-disable-next-line
	}, [updated])
	if (fetchedData === undefined || !fetchedData.success) {
		return (
			<Backdrop className={classes.backdrop} unmountOnExit style={{ color: 'black', zIndex: 1000 }} open>
				<CircularProgress style={{ color: 'white' }} />
			</Backdrop>
		)
	} else
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
					<PortalMenu
						fetchedNewData={fetchedNewData}
						updateData={updateData}
						currentPage={currentPage}
						setCurrentPage={setCurrentPage}
					/>
					<Switch>
						{allPages.map((Page) => (
							<Route key={Page.name} path={Page.to} exact={Page.exact}>
								<Page.view
									setLoading={setLoading}
									newSnack={props.newSnack}
									fetchedNewData={fetchedNewData}
									updated={updated}
									parentProps={props}
									updateData={updateData}
									fetchedData={fetchedData}
								/>
							</Route>
						))}

						<Route key={'Webinars'} path={studentPortalAddress + '/webinars'} exact={true}>
							<Webinars
								setLoading={setLoading}
								newSnack={props.newSnack}
								fetchedNewData={fetchedNewData}
								updated={updated}
								parentProps={props}
								updateData={updateData}
								fetchedData={fetchedData}
							/>
						</Route>
					</Switch>
				</Container>
			</Fade>
		)
}

export default StudentPortal
