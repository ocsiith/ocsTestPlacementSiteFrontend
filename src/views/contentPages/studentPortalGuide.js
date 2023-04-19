/* eslint-disable */
import React from 'react'
import { Route } from 'react-router-dom'
import Footer from './footer'

import { makeStyles } from '@material-ui/core/styles'
import { WalkthroughPage } from './content/studentPortalGuide'
import Typography from '@material-ui/core/Typography'
import GuidePDF from '../../static/pdfs/StudentPortal.pdf'
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

const mainPath = '/students/howto'

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

const RecruiterPortalGuide = () => {
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
			<>
				<div style={{ padding: 15, backgroundColor: '#002238' }} />
				<div style={{ padding: 18, backgroundColor: '#002238' }} />
				<div className={classes.main} style={{ marginLeft: '0px' }}>
					<BackgroundChanger backgroundColor="#f0f0f0" />
					<div className={classes.preWrapper}>
						<div className={classes.pre}>
							<Typography variant="h2">Students' Portal Guide</Typography>
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
											<li>Student Login </li>
										</a>
										<a className="stickycontentslinks" href="#scrollto4">
											<li>Personal Information</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto5">
											<li>Academic Details</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto7">
											<li>Master CV</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto12">
											<li>Master CV deadline</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto13">
											<li>Master CV Flagged</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto14">
											<li>Master CV verified</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto16">
											<li>Create New CV</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto22">
											<li>New Job Listing</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto25">
											<li>Companies on Campus</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto26">
											<li>Register to a comapany</li>
										</a>
										<a className="stickycontentslinks" href="#scrollto28">
											<li>Shortlisted</li>
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
			</>
		</Fade>
	)
}

export default RecruiterPortalGuide
