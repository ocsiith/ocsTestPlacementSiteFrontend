/* eslint-disable react/jsx-pascal-case */
import React, { useState, lazy, Suspense } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
//import PageTransition from 'react-router-page-transition'

import { bake_cookie } from 'sfcookies'

//constants
import {
	eligibilityLookup,
	googleClientId,
	// googleDriveApiKey
} from './constants/addresses'

import Axios from 'axios'

//components
import NavBar from './components/navbar'
// eslint-disable-next-line
import Footer from './components/footer'
import Snacks from './components/snacks'
//static

//views
import NotFound404 from './views/404notfound'

//Material UI dependencies
import CssBaseline from '@material-ui/core/CssBaseline'
import { makeStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
//CSS
import './styles/app.css'
import clsx from 'clsx'

const useStyles = makeStyles((theme) => ({
	content: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		minHeight: 'calc(100vh - 112px)',
		flexGrow: 1,
		//paddingTop: theme.spacing(3),
		//paddingBottom: theme.spacing(3),
		[theme.breakpoints.up('sm')]: { minHeight: 'calc(100vh - 128px)' },
	},
	toolbar: theme.mixins.toolbar,
	main: {
		position: 'relative',
	},
	mainInPortal: {
		position: 'relative',
	},
}))

const allPages = [
	{ view: lazy(() => import('./views/welcome')), path: '/', exact: true },
	{ view: lazy(() => import('./views/welcome')), path: '/home', exact: false },
	{ view: lazy(() => import('./views/about')), path: '/about', exact: false },
	{ view: lazy(() => import('./views/downloads')), path: '/downloads', exact: false },
	{ view: lazy(() => import('./views/reachus')), path: '/reachus', exact: false },
	{ view: lazy(() => import('./views/whyrecruit')), path: '/whyrecruit', exact: false },
	{ view: lazy(() => import('./views/students')), path: '/students', exact: false },
	{ view: lazy(() => import('./views/login/index')), path: '/login', exact: true },
	{ view: lazy(() => import('./views/login/companyLogin')), path: '/login/company', exact: true },
	// { view: lazy(() => import('./views/login/companyLoginOffSeason')), path: '/login/company', exact: true },
	{ view: lazy(() => import('./views/companyRegister/index')), path: '/login/company/register', exact: true },
	{ view: lazy(() => import('./views/companyPortal/index')), path: '/login/company/portal', exact: false },
	{ view: lazy(() => import('./views/studentPortal/index')), path: '/login/student/portal', exact: false },
	{ view: lazy(() => import('./views/login/student')), path: '/login/student', exact: true },
	// { view: lazy(() => import('./views/login/studentLoginOffSeason')), path: '/login/student', exact: true },
	{ view: lazy(() => import('./views/login/companyForgotPass')), path: '/login/company/resetpassword', exact: true },
	{ view: lazy(() => import('./views/refreshTokenPage')), path: '/login/refreshtoken', exact: true },
	{ view: lazy(() => import('./views/adminStuff/index')), path: '/topsecreturl', exact: false },
	{ view: lazy(() => import('./views/careercell/index1')), path: '/careercell', exact: true },
	{
		view: lazy(() => import('./views/studentCoodPortal/index')),
		path: '/topsecreturlforstudentscoods',
		exact: false,
	},
	{ view: lazy(() => import('./views/staticPages/index')), path: '/auth20/verify', exact: false },
	{
		view: lazy(() => import('./views/placementCellPortal/index')),
		path: '/topsecreturlforplacementstaff',
		exact: false,
	},
	{ view: NotFound404, path: '/', exact: false },
]

export const GoogleLoginStateContext = React.createContext({
	isSignedIn: false,
	idToken: '',
	accessToken: '',
})

const App = () => {
	const classes = useStyles()
	const location = useLocation()
	const { gapi } = window

	const [googleLoginState, setGoogleLoginState] = useState({
		idToken: '',
		accessToken: '',
	})

	const [companyCredentials, setCompanyCredentials] = useState(() => {
		let creds = {}
		try {
			creds = JSON.parse(window.localStorage.getItem('companyCredentials'))
		} catch (error) {
			window.localStorage.setItem('companyCredentials', JSON.stringify({}))
			creds = {}
		}
		return creds || {}
	})
	const [notifyingMsg, setNotifyingMsg] = useState('')
	const [notifications, setNotifications] = useState([])
	const [snackOpen, setSnackOpen] = useState(false)
	const [loading, setLoading] = useState(true)
	const [snackMessage, setSnackMessage] = useState('Test')
	const [snackSeverity, setSnackSeverity] = useState()
	const [snackClickawayCount, setSnackClickawayCount] = useState(0)
	const [refreshRedirectLocation, setRefreshRedirectLocation] = useState()
	const [lookupTableData, setLookupTableData] = useState({})
	const [updated, setUpdated] = useState(0)

	const Loading = (
		<div className={classes.content}>
			<Backdrop open>
				<CircularProgress style={{ color: 'white' }} />
			</Backdrop>
		</div>
	)

	const updateData = () => {
		setUpdated(updated + 1)
	}

	const snackFunc = {
		newSnack: (message, severity) => {
			if (typeof message !== 'object') {
				setSnackMessage(message)
				setSnackSeverity(severity)
			} else {
				setSnackMessage('Received type is OBJECT')
				setSnackSeverity('error')
				console.error(message)
			}
			setSnackOpen(true)
		},
		snacksClose: (event, reason) => {
			if (reason === 'clickaway') {
				if (snackClickawayCount === 1) {
					setSnackOpen(false)
					setSnackClickawayCount(0)
				} else setSnackClickawayCount(snackClickawayCount + 1)
			} else setSnackOpen(false)
		},
	}

	const CLIENT_ID = googleClientId
	// const API_KEY = googleDriveApiKey;
	const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest']
	const SCOPES =
		'email profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file openid'

	const initGapiClient = async () => {
		setLoading(true)
		await gapi.client
			.init({
				// apiKey: API_KEY,
				clientId: CLIENT_ID,
				discoveryDocs: DISCOVERY_DOCS,
				scope: SCOPES,
			})
			.then(
				() => {
					const googleAuth = gapi.auth2.getAuthInstance()
					googleAuth.isSignedIn.listen((isSignedIn) =>
						setGoogleLoginState((prevState) => {
							const currentUserProfile = googleAuth.currentUser.get().getAuthResponse()
							return {
								...prevState,
								isSignedIn: isSignedIn,
								accessToken: currentUserProfile.access_token,
								idToken: currentUserProfile.id_token,
							}
						})
					)
					const currentUserProfile = googleAuth.currentUser.get().getAuthResponse()
					setGoogleLoginState((prevState) => {
						return {
							...prevState,
							isSignedIn: googleAuth.isSignedIn.get(),
							accessToken: currentUserProfile.access_token,
							idToken: currentUserProfile.id_token,
						}
					})
				},
				(error) => {
					snackFunc.newSnack('Connection error', 'error')
					console.log(error)
				}
			)
		setLoading(false)
	}

	React.useEffect(() => {
		Axios.get(eligibilityLookup)
			.then(({ data }) => {
				setLookupTableData(data)
				// if (data.success) setLookupTableData(data.message)
				// else snackFunc.newSnack(data.message, 'warning')
			})
			.catch((error) => {
				// if (error.response.status !== undefined && error.response.status === 304) {
				// 	console.log(error.response)
				// 	setLookupTableData(error.response.data)
				// } else {
				snackFunc.newSnack('Connection Error', 'error')
				// }
			})
		gapi.load('client:auth2', initGapiClient)
		// eslint-disable-next-line
	}, [updated])

	const removeNotifications = (id) => {
		var newNotifications = []
		notifications.map((notification) => (id !== notification.id ? newNotifications.push(notification) : false))
		setNotifications(newNotifications)
	}

	const setCompCreds = (data) => {
		const cookieData = JSON.parse(JSON.stringify(data))
		if (data !== '') {
			cookieData['accessToken'] = '' //delete accessToken
			//console.log(cookieData) //to make this Session only
		}
		bake_cookie('companyCredentials', cookieData)
		window.localStorage.setItem('companyCredentials', JSON.stringify(data))
		setCompanyCredentials(data)
	}

	return (
		<Fade in>
			<div>
				<CssBaseline />
				<style
					dangerouslySetInnerHTML={{
						__html: `body { 
									background-color: #F5F5F5;
									background-blend-mode: normal;
									background-position: top center;
									background-repeat: no-repeat;
									background-size: 100%;
									min-height: 100vh;
								}`,
					}}
				/>
				<div>
					<Snacks
						open={snackOpen}
						severity={snackSeverity}
						text={snackMessage}
						handleClose={snackFunc.snacksClose}
					/>
					<NavBar
						updated={updated}
						updateData={updateData}
						newSnack={snackFunc.newSnack}
						studentCredentials={{
							success: googleLoginState.isSignedIn,
							accessToken: googleLoginState.idToken,
						}}
						companyCredentials={companyCredentials}
						setCompCreds={setCompCreds}
						notifyingMsg={notifyingMsg}
						setNotifyingMsg={setNotifyingMsg}
						notifications={notifications}
						rmNotification={removeNotifications}
					/>
					<div
						className={clsx({
							[classes.main]: !(
								location.pathname.includes('/portal') ||
								location.pathname.includes('/login') ||
								location.pathname.includes('/topsecreturl')
							),
							[classes.mainInPortal]:
								location.pathname.includes('/portal') ||
								location.pathname.includes('/login') ||
								location.pathname.includes('/topsecreturl'),
						})}
					>
						{location.pathname.includes('/portal') ||
						location.pathname.includes('/login') ||
						location.pathname.includes('/topsecreturl') ? (
							<div className={classes.toolbar} />
						) : (
							<></>
						)}
						<GoogleLoginStateContext.Provider value={googleLoginState}>
							{/*Content below*/}
							<Suspense fallback={Loading}>
								{loading ? (
									Loading
								) : (
									<Switch>
										{allPages.map((Page, key) => (
											<Route key={key} path={Page.path} exact={Page.exact}>
												<div className={classes.content}>
													{/* {console.log(lookupTableData)} */}
													<Page.view
														eligibilityLookupTableData={lookupTableData}
														setRefreshRedirectLocation={setRefreshRedirectLocation}
														refreshRedirectLocation={refreshRedirectLocation}
														newSnack={snackFunc.newSnack}
														studentCredentials={{
															success: googleLoginState.isSignedIn,
															accessToken: googleLoginState.idToken,
														}}
														companyCredentials={companyCredentials}
														setCompCreds={setCompCreds}
														notifyingMsg={notifyingMsg}
														setNotifyingMsg={setNotifyingMsg}
														updated={updated}
														updateData={updateData}
													/>
												</div>
											</Route>
										))}
									</Switch>
								)}
							</Suspense>
						</GoogleLoginStateContext.Provider>
					</div>
					{/*Content End*/}
					{/* Footer below */}
					<div className={classes.toolbar} />
					{/* <div className={classes.toolbar}>
						<Footer />
					</div> */}
				</div>
			</div>
		</Fade>
	)
}

export default App
