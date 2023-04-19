/* eslint-disable */

import React from 'react'
import ReactPlayer from 'react-player/lazy'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Aos from 'aos'
import 'aos/dist/aos.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import Button from '@material-ui/core/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleDown } from '@fortawesome/free-solid-svg-icons'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import maruti from '../../static/images/MarutiConnectSession.JPG'
import isb from '../../static/images/ISBSession.JPG'
import isb1 from '../../static/images/ISBSession1.JPG'
import seedcamp from '../../static/images/SEEDCampusConnect.jpg'
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
	careercellsession: {
		display: 'block'
	},
	careercellInline: {
		display: 'flex',
		justifyContent: 'space-between',
		gap: '1rem',
		backgroundColor:'grey',
		color:'white',
		borderRadius:'8px',
		padding:'1rem'
	},
	contentDetails: {
		display: 'none',
		justifyContent:'center',
		alignItems:'center',
		flexWrap:'wrap'
	},
	image: {
		borderRadius: '8px',
		width:'100%',
		margin:'1rem',
		[theme.breakpoints.up('lg')]: {
			width: '37%',
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
			text: 'Career cell sessions',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName('display1')).forEach(myFunction1)
				setOpen(!open)
			},
		},
		{
			text: 'OCS registration guide',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName('display2')).forEach(myFunction1)
				setOpen(!open)
			},
		},
		/*{
			text: 'Video 3',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach(myFunction)
				Array.from(document.getElementsByClassName('display3')).forEach(myFunction1)
				setOpen(!open)
			},
		}*/

		{
			text: 'Show All',
			onClick: () => {
				Array.from(document.getElementsByClassName('nodisplay')).forEach((item, index) => {
					item.style.display = 'block'
				})
			},
		},
	]


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
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('collapsible');
		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].style.width = '20px'
			coll[i].addEventListener('click', handleClick) //Older syntax
		}

		//coll.map(element => element.addEventListener('click', handleClick)) 	//Newer syntax

		function handleClick(e) {

			this.classList.toggle('active')
			var contentDetails = this.parentElement.nextElementSibling
			if (contentDetails.style.display == 'flex') {
				contentDetails.style.display = 'none'
			} else {
				contentDetails.style.display = 'flex'
			}

		}

		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
		}
	})
	return (
		<div style={{ width: '100vw', position: 'relative' }}>
			<div className={classes.root} style={{ width: '99vw' }}>
				<CssBaseline />
				<nav className={classes.drawer} aria-label="mailbox folders" style={{ display: '' }}>
					{/* The implementation can be swapped with js to avoid SEO duplication of links. */}
					<Hidden smUp implementation="css">
						<Drawer
							container={container}
							style={{ position: 'relative', zIndex: 1 }}
							variant="temporary"
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
					<div className={classes.toolbar} />
					<div className="nodisplay nodisplay1 display1">
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Interview strategy & Pressure Handling</Typography>
								<Button variant='outlined' className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Bosscoderacademy</Typography></li>
									<li><Typography variant="h6">Event Date: 06.06.2022</Typography></li>
									<li><Typography>Around 45 participants took part in</Typography></li>
									<li><Typography>Rajat Garg from Bosscoder academy was the speaker</Typography></li>
								</ul>
							</div>
						</div>
						<br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Interaction with "Prototyze"</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Prototyze</Typography></li>
									<li><Typography variant="h6">Event Date: 02.07.2022</Typography></li>
									<li><Typography>Protoyze and its products are introduced to the students.</Typography></li>
									<li><Typography> Debate on Technology updates in Design field & its consequences</Typography></li>
								</ul></div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Webinar on "Resume Preparation"</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Ureify (Hyresnap)</Typography></li>
									<li><Typography variant="h6">Event Date: 20.07.2022</Typography></li>
									<li><Typography>Resume tackling was discussed</Typography></li>
									<li><Typography>ATS software explained</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Discussion with Korean Startup - vFlat</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: vFlat (VoyagerX)</Typography></li>
									<li><Typography variant="h6">Event Date: 28.07.2022</Typography></li>
									<li><Typography>vFlat introduction to students </Typography></li>
									<li><Typography>Q&A session with gifts</Typography></li>
									<li><Typography>Internship opportunities</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Introduction to Stock Markets</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: BNY Mellon</Typography></li>
									<li><Typography variant="h6">Event Date: 05.08.2022</Typography></li>
									<li><Typography>Avirtual event on "Introduction to stock markets</Typography></li>
									<li><Typography>Event held for 1 hr with lots of questions from the students and panel discussions</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Higher Studies Opportunities seminar </Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: LearnersCortex & Magosh </Typography></li>
									<li><Typography variant="h6">Event Date: 19.08.2022</Typography></li>
									<li><Typography>An offline session on "Higher Study opportuniites especially for Civil & MSME students".</Typography></li>
									<li><Typography>Event held for 2 hrs providing lots of insights to the participants</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Maruti Connect Session</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Maruti - R&D</Typography></li>
									<li><Typography variant="h6">Event Date: 06.09.2022</Typography></li>
									<li><Typography>Offline session with vice-president of R&D of Maruti, alonglwith HRs</Typography></li>
									<li><Typography>Event held of 1 hr discussing about maruti and the opportunities they offer</Typography></li>
								</ul>
								<img src={maruti} className={classes.image} alt=" "/>
							
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> SEED- Campus Tour </Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: SEED</Typography></li>
									<li><Typography variant="h6">Event Date: 12.09.2022</Typography></li>
									<li><Typography>Visitors Elaborated about thier School and discussed about possible collabrations with IIT-H</Typography></li>
									<li><Typography> Dean IR showcased about our universites to the visitors and their professional cards were exchanged</Typography></li>
									<li><Typography>Students (UGs & Masters) Interaction followed up by panel discussion held in auditorium.</Typography></li>
									<li><a href="https://www.linkedin.com/posts/iithyderabad_iithcampuscorner-iithadreamdestination-bostonuniversities-activity-6976112760703074304-XV3f?utm_source=share&utm_medium=member_desktop">
										Linkedin Posts</a></li>
								</ul>
								<img src={seedcamp} className={classes.image} alt=" "/>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Career Options for Management Studies</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: IMS</Typography></li>
									<li><Typography variant="h6">Event Date: 18.09.2022</Typography></li>
									<li><Typography>Speaker discussed about the nuances that often students while preparing for CAT</Typography></li>
									<li><Typography>Enlightened the management study opportunities in India.</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Stellantis Connect Session</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Stellantis</Typography></li>
									<li><Typography variant="h6">Event Date: 27.09.2022</Typography></li>
									<li><Typography>Stellantis Displayed Two cars whcih had few autonomus features in it beside B-Block, the whole day.</Typography></li>
									<li><Typography>Techies from stellantis interacted with the students at the end of the day.</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Offline Mock Interviews</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: TrainingInbox</Typography></li>
									<li><Typography variant="h6">Event Date: 31.10.2022 - 02.11.2022</Typography></li>
									<li><Typography> "Do's & Don't During interview" was disucssed. </Typography></li>
									<li><Typography>Free offline Mock Interviews for all the interested students was conducted. 3. Short Resume Building Session was organized</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> How to crack consulting interviews</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Qunatel</Typography></li>
									<li><Typography variant="h6">Event Date: 08.11.2022</Typography></li>
									<li><Typography>Session on cracking the consulting interviews - addressed by Quantel MD</Typography></li>
									<li><Typography>Stundents from different field took part actively and got enlightened.</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> How to Ace Interview</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: BNY Mellon</Typography></li>
									<li><Typography variant="h6">Event Date: 14.11.2022</Typography></li>
									<li><Typography>Session on "How to ace interviews" from technical and non-technical point of view.</Typography></li>
									<li><Typography>Senior leader & spokes person addressed the student community in the auditorium.</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> 3 Biggest Interview Mistakes</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Team CS Mock</Typography></li>
									<li><Typography variant="h6">Event Date: 20.11.2022</Typography></li>
									<li><Typography>Went handy to lots of stundets as it was organized just a week before the placement interviews.</Typography></li>
									<li><Typography>Real time interview instances was simulated by the speaker.</Typography></li>
								</ul>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Young Leaders Program</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Indian School of Business (ISB - Hyderabad)</Typography></li>
									<li><Typography variant="h6">Event Date: 02.02.2023</Typography></li>
									<li><Typography>Top Management school delegate gathered and interacted with the students in physical mode.</Typography></li>
									<li><Typography>Folks who were interested to pursue their career in management participated in huge numbers and made this session more interactive.</Typography></li>
								</ul>
								<img src={isb} className={classes.image} alt=" "/>
								<img src={isb1} className={classes.image} alt=" "/>
							</div>
						</div><br />
						<div className={classes.careercellsession}>
							<div className={classes.careercellInline}>
								<Typography variant="h4"> Emotional Intelligence & Leadership Program</Typography>
								<Button variant='outlined'  className='collapsible'>
									<FontAwesomeIcon icon={faAngleDoubleDown} />
								</Button>
							</div>
							<div className={classes.contentDetails}>
								<ul>
									<li><Typography variant="h6"> In Association with: Alternate Leadership</Typography></li>
									<li><Typography variant="h6">Event Date: 11.02.2023 & 12.02.2023</Typography></li>
									<li><Typography>Different perspective of understanding the emotional intelligence was delivered by the speakers.</Typography></li>
									<li><Typography>This event mainly focusson on research scholars and guess not it saw lots of UGs participating in.</Typography></li>
								</ul>
							</div>
						</div>

					</div>
				</main>
			</div>
		</div>
	)
}

ResponsiveDrawer.propTypes = {
	/**
	 * Injected Organize inEvent Date:  Association with: the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window: PropTypes.func,
}

export default ResponsiveDrawer
