/* eslint-disable */
import React from 'react'
import { Route } from 'react-router-dom'
import Footer from './footer'

import { makeStyles } from '@material-ui/core/styles'
import { WalkthroughPage } from './content/recruitersPortalGuide'
import Typography from '@material-ui/core/Typography'
import GuidePDF from '../../static/pdfs/Recruiters-Guide.pdf'
import Button from '@material-ui/core/Button'
import DownloadIcon from '@material-ui/icons/CloudDownload'
import LazyLoad from 'react-lazyload'
import Fade from '@material-ui/core/Fade'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import BackgroundChanger from '../../components/backgroundChanger'
import { FaPhoneAlt, FaAlignJustify } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import { GoLinkExternal } from 'react-icons/go'

import img1 from './content/recruitersPortalGuide/images/Firsty-01.png'
import img2 from './content/recruitersPortalGuide/images/Firsty-02.png'
import img3 from './content/recruitersPortalGuide/images/Firsty-03.png'
import img4 from './content/recruitersPortalGuide/images/Firsty-04.png'
import img5 from './content/recruitersPortalGuide/images/Firsty-05.png'
import img6 from './content/recruitersPortalGuide/images/Firsty-06.png'
import img7 from './content/recruitersPortalGuide/images/Firsty-07.png'
import img8 from './content/recruitersPortalGuide/images/Firsty-08.png'
const mainPath = '/whyrecruit/howto'

const useStyles = makeStyles((theme) => ({
	main: {
		marginLeft: '0px',
		marginTop: 64,
		[theme.breakpoints.down('sm')]: { marginLeft: 0 },
		[theme.breakpoints.down('xs')]: { marginTop: 56 },
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	preWrapper: {
		width: '100%',
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	pre: {
		maxWidth: 600,
		padding: 15,
	},
	image: {
		maxWidth: '94%',
	},
	imageWrapper: {
		maxWidth: 600,
	},
	downloadButton: {
		height: 50,
	},
}))

const Walkthrough = () => {
	const classes = useStyles()
	React.useEffect(() => {
		var socialFloat = document.querySelector('#social-float')
		var footer = document.querySelector('#footer')

		function checkOffset() {
			function getRectTop(el) {
				var rect = el.getBoundingClientRect()
				return rect.top
			}

			if (
				getRectTop(socialFloat) + document.body.scrollTop + socialFloat.offsetHeight >=
				getRectTop(footer) + document.body.scrollTop - 10
			) {
				socialFloat.style.position = 'absolute'
				socialFloat.style.right = '0%'
			}
			if (document.body.scrollTop + window.innerHeight < getRectTop(footer) + document.body.scrollTop) {
				socialFloat.style.position = 'fixed'
				socialFloat.style.right = '-5.5%'
			}
		}

		document.addEventListener('scroll', function () {
			if (window.innerWidth > 600) checkOffset()
		})
	})
	return (
		<Fade in>
			<div className={classes.main} style={{ marginLeft: '0px' }}>
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className={classes.preWrapper}>
					<div className={classes.pre}>
						<Typography variant="h2">Recruiters' Portal Guide</Typography>
						<div style={{ padding: 15 }} />
						<a href={GuidePDF} target="_blank" rel="noopener noreferrer">
							<Button
								className={classes.downloadButton}
								startIcon={<DownloadIcon />}
								variant="contained"
								color="primary"
								fullWidth
							>
								Download as PDF
							</Button>
						</a>
					</div>
				</div>
				<div style={{ padding: 15 }} />
				<div className="stickycontents" id="social-float">
					<Card variant="contained" style={{ backgroundColor: '#ffffff', padding: '25px 5px' }}>
						<CardContent>
							<Typography variant="h3" component="h2">
								<center>Contents&nbsp;</center>
							</Typography>

							<Typography variant="body2" component="p" style={{ textAlign: 'left' }}>
								<ol>
									{' '}
									<a className="stickycontentslinks" href="#scrollto1">
										<li>Login | Register page</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto3">
										<li>Register a new Company </li>
									</a>
									<a className="stickycontentslinks" href="#scrollto5">
										<li>Email Verification</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto8">
										<li>Login</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto9">
										<li>Create new Profile</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto10">
										<li>Create new listing</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto17">
										<li>List of all Listings</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto18">
										<li>Status: Registration</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto20">
										<li>Shortlisting</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto20">
										<li>Download CVs</li>
									</a>

									<a className="stickycontentslinks" href="#scrollto24">
										<li>Send waitlist to Co-od</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto27">
										<li>Interview slot details </li>
									</a>
									<a className="stickycontentslinks" href="#scrollto29">
										<li>Interview list</li>
									</a>
									<a className="stickycontentslinks" href="#scrollto30">
										<li>Shortlisted candidates </li>
									</a>
								</ol>
							</Typography>
						</CardContent>
					</Card>
				</div>
				<div style={{ padding: 15 }} />
				<div style={{ padding: 15 }} />
				<div className={classes.imageWrapper}>
					{WalkthroughPage.map((image, index) => (
						<div
							className="gettingstartedportal"
							style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
							id={`scrollto${index + 1}`}
							key={`item-${index}`}
						>
							<LazyLoad height={916} offset={100}>
								<div style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}>
									<Typography variant="h3" className="guideheading">
										{image.info}{' '}
									</Typography>
									<Typography variant="h5" color="textSecondary" className="guideheading">
										{image.description}
									</Typography>
									<Typography
										variant="h6"
										color="textSecondary"
										className="guideheading"
										style={{ transform: 'scale(0.8)' }}
									>
										Related Suggestions:{' '}
										<Button variant="outlined" color="disabled" disableRipple>
											{image.button1}
										</Button>
										&nbsp;
										<Button variant="outlined" disableRipple color="disabled">
											{image.button2}
										</Button>
									</Typography>
									<center>
										<img src={image.pic} style={{ width: '550px', maxWidth: '100%' }} alt="" />
									</center>

									<div style={{ padding: 15 }} />
								</div>
							</LazyLoad>
						</div>
					))}
				</div>
				<div id="footer">
					<br />
				</div>
				<Footer />{' '}
			</div>
		</Fade>
	)
}

const GettingStarted = () => {
	const classes = useStyles()
	React.useEffect(() => {
		var socialFloat = document.querySelector('#social-float')
		var footer = document.querySelector('#footer')

		function checkOffset() {
			function getRectTop(el) {
				var rect = el.getBoundingClientRect()
				return rect.top
			}

			if (
				getRectTop(socialFloat) + document.body.scrollTop + socialFloat.offsetHeight >=
				getRectTop(footer) + document.body.scrollTop - 10
			) {
				socialFloat.style.position = 'absolute'
				socialFloat.style.right = '0%'
			}
			if (document.body.scrollTop + window.innerHeight < getRectTop(footer) + document.body.scrollTop) {
				socialFloat.style.position = 'fixed'
				socialFloat.style.right = '-5.5%'
			} // restore when you scroll up
		}

		document.addEventListener('scroll', function () {
			if (window.innerWidth > 600) checkOffset()
		})
	})

	return (
		<Fade in>
			<div className={classes.main}>
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className={classes.preWrapper}>
					<div className={classes.pre}>
						<Typography variant="h2">Recruiters' Portal Getting Started</Typography>
						<div style={{ padding: 15 }} />
						<a href={GuidePDF} target="_blank" rel="noopener noreferrer">
							<Button
								className={classes.downloadButton}
								startIcon={<DownloadIcon />}
								variant="contained"
								color="primary"
								fullWidth
							>
								Download full the walkthrough as PDF
							</Button>
						</a>
					</div>
					<div style={{ padding: 15 }} />
				</div>
				<div>
					<div className="stickycontents" id="social-float">
						<Card variant="contained" style={{ backgroundColor: '#ffffff', padding: '25px 5px' }}>
							<CardContent>
								<Typography variant="h3" component="h2">
									<center>Contents&nbsp;</center>
								</Typography>

								<Typography variant="body2" component="p" style={{ textAlign: 'left' }}>
									<ol>
										{' '}
										<a className="stickycontentslinks" href="#scrolltoview1">
											<li>Login | Register page</li>
										</a>
										<a className="stickycontentslinks" href="#scrolltoview3">
											<li>Register a new Company</li>
										</a>
										<a className="stickycontentslinks" href="#scrolltoview5">
											<li>Email Verification</li>
										</a>
										<a className="stickycontentslinks" href="#scrolltoview8">
											<li>Login</li>
										</a>
									</ol>
								</Typography>
							</CardContent>
						</Card>
					</div>
				</div>{' '}
				<div style={{ padding: 15 }} />
				<div className="gettingstartedportal" id="scrolltoview1">
					<Typography variant="h3" className="guideheading">
						Step-1
					</Typography>

					<Typography variant="h5" color="textSecondary" className="guideheading">
						Click 'Login | Register'
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Login
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Register
						</Button>
					</Typography>
					<center>
						<img src={img1} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview2">
					<Typography variant="h3" className="guideheading">
						Step-2
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						Click on 'Company Portal'
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Portal
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Company
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Student
						</Button>
					</Typography>
					<center>
						<img src={img2} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview3">
					<Typography variant="h3" className="guideheading">
						Step-3
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						Click on 'Register New Company'
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Login
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Company
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Recruiter
						</Button>
					</Typography>
					<center>
						<img src={img3} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview4">
					<Typography variant="h3" className="guideheading">
						Step-4
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						Fill in the details appropriately and click 'Register'
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Company
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Register
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Information
						</Button>
					</Typography>
					<center>
						<img src={img4} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview5">
					<Typography variant="h3" className="guideheading">
						Step-5
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						You will have received an email in your registered email ID for email verification
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Success message
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Email verification
						</Button>
					</Typography>
					<center>
						<img src={img5} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview6">
					<Typography variant="h3" className="guideheading">
						Step-6
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						Click the button 'Verify Now' to verify your email
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Email
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Verification Link
						</Button>
					</Typography>
					<center>
						<img src={img6} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview7">
					<Typography variant="h3" className="guideheading">
						Step-7
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						If successful, you can now login to your newly created account
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Registered
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Verified
						</Button>
					</Typography>
					<center>
						<img src={img7} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div className="gettingstartedportal" id="scrolltoview8">
					<Typography variant="h3" className="guideheading">
						Step-8
					</Typography>
					<Typography variant="h5" color="textSecondary" className="guideheading">
						Enter your credentials and login to the portal
					</Typography>
					<Typography
						variant="h6"
						color="textSecondary"
						className="guideheading"
						style={{ transform: 'scale(0.8)' }}
					>
						Related Suggestions:{' '}
						<Button disableRipple variant="outlined" color="disabled">
							Login
						</Button>
						&nbsp;
						<Button disableRipple variant="outlined" color="disabled">
							Verification
						</Button>
					</Typography>
					<center>
						<img src={img8} style={{ width: '550px', maxWidth: '100%' }} alt="" />
					</center>
				</div>
				<div id="footer">
					<br />
				</div>
				<Footer />{' '}
			</div>
		</Fade>
	)
}

const RecruiterPortalGuide = () => {
	return (
		<React.Fragment>
			<Route path={mainPath} exact>
				<Fade in>
					<div>
						<BackgroundChanger backgroundColor="#f0f0f0" />
						<div style={{ padding: 15, backgroundColor: '#002238' }} />
						<div style={{ padding: 18, backgroundColor: '#002238' }} />
						<div className="portalguide">
							<div>
								{' '}
								<Card
									variant="contained"
									style={{
										backgroundColor: '#ffffff',
										width: '90%',
										padding: 25,
										maxWidth: '400px',
										margin: '5%',
									}}
									id="java1"
								>
									<CardContent>
										<Typography variant="h3" component="h2">
											Getting Started
										</Typography>
										<Typography variant="h5" color="textSecondary">
											How to quickly get Started
										</Typography>
										<Typography variant="body2" component="p">
											This guide helps you in registering and logging into an account.
										</Typography>
									</CardContent>
									<CardActions>
										<Button variant="default" size="small" href={mainPath + '/gettingstarted'}>
											Get started
										</Button>
									</CardActions>
								</Card>
							</div>

							<div>
								<Card
									variant="contained"
									style={{
										backgroundColor: '#ffffff',
										padding: 25,
										width: '90%',
										maxWidth: '400px',
										margin: '5%',
									}}
									id="java2"
								>
									<CardContent>
										<Typography variant="h3" component="h2">
											Full Walkthrough
										</Typography>
										<Typography variant="h5" color="textSecondary">
											Walkthrough from the start
										</Typography>
										<Typography variant="body2" component="p">
											This walkthrough guides you throughout the website.
										</Typography>
									</CardContent>
									<CardActions>
										<Button variant="default" size="small" href={mainPath + '/walkthrough'}>
											Get started
										</Button>
									</CardActions>
								</Card>
							</div>
						</div>{' '}
						<p>
							<br />
						</p>
						<p>
							<br />
						</p>
						<div id="footer">
							<br />
						</div>
						<Footer />{' '}
					</div>
				</Fade>
			</Route>
			<Route path={mainPath + '/walkthrough'} exact>
				<Walkthrough />
			</Route>
			<Route path={mainPath + '/gettingstarted'} exact>
				<GettingStarted />
			</Route>
		</React.Fragment>
	)
}

export default RecruiterPortalGuide
