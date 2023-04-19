/* eslint-disable */
import React, { useEffect } from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ButtonBase from '@material-ui/core/ButtonBase'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Footer from './footer'
import Newsupdatesevents from './newsupdatesevents'
import ravipic from '../../static/profilepics/IMG_20200705_213959.jpg'
import backgroundImage from '../../static/images/16.18.png'
import logo1 from '../../static/images/image (2) (2) (2).png'
import BackgroundChanger from '../../components/backgroundChanger'
import Aos from 'aos'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import 'aos/dist/aos.css'
import { FaPhoneAlt, FaAlignJustify } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'

import ocslogo from '../../static/logos/ocshomepagelogo1.png'
import ocslogocolor from '../../static/logos/ocshomelogocolor.png'
import adobe from '../../static/recruiterslogos/adobelogo.png'
import amazon from '../../static/recruiterslogos/amazonlogo.png'
import bnymellon from '../../static/recruiterslogos/bnymellon.png'
import goldmansachs from '../../static/recruiterslogos/goldmansachs.png'
import hsbc from '../../static/recruiterslogos/hsbclogo.png'
import intel from '../../static/recruiterslogos/intellogo.jpeg'
import iocl from '../../static/recruiterslogos/iocllogo.jpeg'
import jaguar from '../../static/recruiterslogos/jaguarlogo.png'
import microsoft from '../../static/recruiterslogos/microsoftlogo.png'
import nvidia from '../../static/recruiterslogos/nvidialogo.png'
import oppo from '../../static/recruiterslogos/oppologo.png'
import oracle from '../../static/recruiterslogos/oraclelogo.png'
import qualcomm from '../../static/recruiterslogos/qualcommlogo.png'
import sprinklr from '../../static/recruiterslogos/sprinklrlogo.png'
import arcesium from '../../static/recruiterslogos/arcesiumlogo.png'
import deshaw from '../../static/recruiterslogos/deshawlogo.png'
import flipkart from '../../static/recruiterslogos/flipkartlogo.jpeg'
import salesforce from '../../static/recruiterslogos/salesforcelogo.png'
import stats from '../../static/images/stats.png'
import pdf20 from '../../static/pdfs/Placement-Stats-19-20.pdf'
import pdf21 from '../../static/pdfs/Placement-Stats-20-21.pdf'
import pdf22 from '../../static/pdfs/OCS22Stats.pdf'
import { useHistory } from 'react-router-dom'

import directordesk from '../../static/images/directorsdesk.jpg'
import deanphoto from '../../static/images/deanphoto.png'
import { ScatterPlot } from '@material-ui/icons'

import ScrollButton from '../../components/scrollButton/ScrollButton'

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 10,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
		partialVisibilityGutter: 30,
	},
	tablet: {
		breakpoint: { max: 1024, min: 550 },
		items: 3,
	},
	mobile: {
		breakpoint: { max: 400, min: 0 },
		items: 1.7,
	},
	mobile2: {
		breakpoint: { max: 550, min: 400 },
		items: 1.9,
	},
}

const PlacementStats = [
	{
		pdf: pdf22,
		year: '2021-2022',
	},
	{
		pdf: pdf21,
		year: '2020-2021',
	},
	{
		pdf: pdf20,
		year: '2019-2020',
	},
]

const HomePage = () => {
	const history = useHistory()
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('flexbutton2')
		var coll1 = document.getElementsByClassName('flexbutton1')

		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', handleClick) //Older syntax
		}
		for (i = 0; i < coll1.length; i++) {
			coll1[i].addEventListener('click', handleClick1) //Older syntax
		}
		function handleClick() {
			history.push('/login/company/portal')
		}
		function handleClick1() {
			history.push('/login/student/portal')
			// history.push('/login/student')
		}
		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
			for (i = 0; i < coll.length; i++) {
				coll1[i].removeEventListener('click', handleClick1)
			}
		}
	})

	return (
		<div className="homepage">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="welcomepage">
				<img className="welcomepage_heading" alt="" src={ocslogocolor} />

				<div className="flexbuttons">
					<div></div>
					<button className="flexbutton2">Recruiters' Corner</button>
					<button className="flexbutton1">Students' Corner</button>
					<div></div>
				</div>
			</div>

			<div className="div4">
				<div className="div1">
					<div className="div1div1"></div>
					<div className="div1div2">
						<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
							In a Nutshell
						</Typography>
						<p className="text_welcome">
							IITH is one of the top young IITs started by the government of India in 2008. The fostering
							environment of the institute helps new ideas to grow and flourish. Faculty, as well as the
							students, have distinguished themselves through awards for academic excellence from national
							and international organizations.
						</p>
					</div>
				</div>
				<div className="addingbackground" />
				<div className="div3">
					<div className="div2div1">
						<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
							Life at IITH
						</Typography>
						<p className="text_welcome">
							IITH is well known for its vigorous academic curriculum, along with the overwhelming
							excellence in extra-curricular activities. Student bodies here work independently for
							several club activities, festivals, administration of hostels and many more. These
							activities help to get exposure to things and activities that reside outside of your
							academic curriculum
						</p>
					</div>
					<div className="div2div2">
						<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
							About OCS
						</Typography>
						<p className="text_welcome">
							The Office of Career Services (OCS) hopes to work on a defined structure of hiring
							procedure. OCS also works towards increasing the interactions of IIT Hyderabad community
							with various management, research and industrial organisations ensuring the students are
							given enough exposure and training from second year itself, enabling them to be employed by
							the best of the firms.
						</p>
					</div>
				</div>
			</div>

			<Newsupdatesevents />

			{/*	<div className="div3">
				<div className="div2div1">
					<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
						Life at IITH
					</Typography>
					<p className="text_welcome">
						IITH is well known for its vigorous academic curriculum, along with the overwhelming excellence
						in extra-curricular activities. Student bodies here work independently for several club
						activities, festivals, administration of hostels and many more. These activities help to get
						exposure to things and activities that reside outside of your academic curriculum
					</p>
				</div>
				<div className="div2div2">
					<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
						About OCS
					</Typography>
					<p className="text_welcome">
						The Office of Career Services (OCS) hopes to work on a defined structure of hiring procedure.
						OCS also works towards increasing the interactions of IIT Hyderabad community with various
						management, research and industrial organisations ensuring the students are given enough
						exposure and training from second year itself, enabling them to be employed by the best of the
						firms.
					</p>
				</div>
	</div>
			<div className="div2" />*/}
			<div className="div5">
				<div className="div1 div3-1">
					<div className="div2div1">
						<Typography variant="h3" style={{ fontSize: '1.7em', padding: '2%' }}>
							From Director's Desk
						</Typography>
						<p className="text_welcome">
							IIT Hyderabad has been striving at the overall development of its students since its
							inception. With the philosophy of Invent and Innovate in Technologies (IIT) as its core
							strength, IITH has been training its students in the breadth and depth of science and
							technology through its unique and flexible fractal curriculum and at the same time preparing
							them as future technocrats through its minor in entrepreneurship. To ensure the 360-degree
							development of the students, our placement office has gone through a metamorphic
							transformation and is now ready to operate as the Office of Career Services (OCS) wherein
							career guidance is imparted to all the students along with providing excellent internship
							and placement opportunities. I invite the industry and academia globally, to collaborate
							with us so that we can deliver our best for the benefit of mankind. <br />
							<br />I wish all the best to all the IITH students to excel in all their endeavours.
						</p>
					</div>
					<div
						className="div2div2"
						style={{
							background: `url(${directordesk})`,
							backgroundSize: 'cover',
							backgroundPosition: 'center top',
							marginRight: '5%',
							marginBottom: '5%',
							minHeight: 400,
						}}
					/>
				</div>
				<div className="addingbackground" />
				<div className="div3 ">
					<div className="div2div1">
						<div
							style={{
								background: `url(${deanphoto})`,
								backgroundSize: 'cover',
								backgroundPosition: 'center top',
								minHeight: 400,
							}}
						/>
					</div>
					<div className="div2div2">
						<Typography variant="h3" style={{ fontSize: '1.7em', padding: '2%' }}>
							From <br /> Dean Public & Corporate Relations
						</Typography>
						<p className="text_welcome">
							Department of Public and Corporate Relations has been instituted at the beginning of this
							year to have a single platform for augmenting and establishing strong relations with all our
							stakeholders. A similar thought process has resulted in the transformation of the Placement
							Office into the Office of Career Services. Office of Career Services will primarily focus on
							the holistic development of all the students and providing them with the best career
							opportunities. I wish for them a rewarding career and a gracious life ahead.
						</p>
					</div>
				</div>
			</div>
			<br />
			<div className="PlacementStats">
				<Typography variant="h3" className="welcome_last_heading2">
					<center>
						Placement Statistics
						<hr style={{ width: '20%', border: '1px solid white', color: 'black' }} />
					</center>
				</Typography>
				<div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
					{PlacementStats.map((year, key) => (
						<Button
							varient="contained"
							style={{
								width: '400px',
								height: '200px',
								display: 'flex',
								backgroundColor: '#011330',
								// flexWrap: 'wrap',
								margin: '20px 40px',
								opacity: '0.97',
								borderRadius: '20px',
								justifyContent: 'center',
								textAlign: 'center',
								alignItems: 'center',
							}}
						>
							<div>
								<img src={stats} style={{ width: '150x', height: '150px', margin: '3px' }} />
							</div>

							<div style={{ display: 'flex' }}>
								<Button href={`${year.pdf}`} target="blank">
									<div
										style={{
											background: '#011330',
											display: 'flex',
											height: '70px',
											width: '150px',
											border: '1px solid white',
											color: 'white',
											justifyContent: 'center',
											textAlign: 'center',
											alignItems: 'center',
											fontSize:"25px"
										}}
									>
										{year.year}
									</div>
								</Button>
							</div>
						</Button>
					))}
				</div>
			</div>
			<br />
			<div className="recruiterspeak">
				<Typography variant="h3" className="welcome_last_heading2">
					<center>
						Recruiters' Speak
						<hr style={{ width: '20%', border: '1px solid white', color: 'black' }} />
					</center>
				</Typography>
				<div className="recruiterspeakgrid">
					<blockquote>
						Genuinely enjoyed connecting with the students. We look forward to an amazing engagement next
						year too.
						<br />
						<br />
						<div
							data-aos="fade-right"
							aos-duration="1000"
							data-aos-easing="ease-in-sine"
							style={{ textAlign: 'right' }}
						>
							-Tesco
						</div>
					</blockquote>
					<blockquote style={{ position: 'relative' }}>
						Got very good candidates in data science and analytics beyond expectation and few are
						outsanding.
						<br />
						<br />
						<div
							data-aos="fade-right"
							aos-duration="1000"
							data-aos-easing="ease-in-sine"
							style={{ textAlign: 'right', position: 'absolute', bottom: '1em', right: '20px' }}
						>
							-Schlumberger
						</div>
					</blockquote>
					<blockquote style={{ position: 'relative' }}>
						Thanks for holding interviews for us. We were very impressed to see good talents.
						<br />
						<br />
						<div
							data-aos="fade-right"
							aos-duration="1000"
							data-aos-easing="ease-in-sine"
							style={{ textAlign: 'right', position: 'absolute', bottom: '1em', right: '20px' }}
						>
							-Toyota
						</div>
					</blockquote>
				</div>
			</div>
			<p>
				<br />
			</p>

			<Typography variant="h3" className="welcome_last_heading2">
				<center>
					Past Recruiters
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
				</center>
			</Typography>
			<br />

			<ScrollButton />

			<Carousel
				centerMode={false}
				swipeable={true}
				infinite={true}
				autoPlay={true}
				removeArrowOnDeviceType={['tablet', 'mobile', 'mobile2']}
				autoPlaySpeed={1500}
				customTransition="transform 300ms ease-in-out"
				focusOnSelect={true}
				transitionDuration={500}
				responsive={responsive}
				className="carousel"
			>
				<img
					src={adobe}
					className="recruiterscarousel"
					alt="Adobe"
					title="Adobe"
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={deshaw}
					className="recruiterscarousel"
					alt=""
					title="D.E.Shaw"
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={amazon}
					className="recruiterscarousel"
					alt=""
					title="Amazon"
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={bnymellon}
					className="recruiterscarousel"
					alt=""
					title="BNY Mellon"
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={goldmansachs}
					className="recruiterscarousel"
					alt=""
					title="Goldman Sachs"
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={hsbc}
					title="HSBC"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={intel}
					title="Intel"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={iocl}
					title="IOCL"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={jaguar}
					title="Jaguar"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={arcesium}
					title="Arcesium"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={microsoft}
					title="Microsoft"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={nvidia}
					title="NVidia"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={oppo}
					title="Oppo"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={oracle}
					title="Oracle"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={qualcomm}
					title="Qualcomm"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={sprinklr}
					title="Sprinklr"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={flipkart}
					title="Flipkart"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
				<img
					src={salesforce}
					title="Salesforce"
					className="recruiterscarousel"
					alt=""
					style={{ width: '190px', height: '190px' }}
				/>
			</Carousel>
			<p>
				<br />
			</p>
			<Footer />
		</div>
	)
}
export default HomePage
export const Achievements = () => {
	useEffect(() => {
		Aos.init({ duration: 2000 })
	}, [])
	return (
		<div className="background_change">
			<BackgroundChanger backgroundColor="#f0f0f0" />

			{/*	<div className="achieve">
				<div>
					<div className="firstpage_achieve">
						<p className="heading_achieve  " style={{ color: 'white' }}>
							Achievements
						</p>
					</div>
					<div className="changethenamelater">
						<div data-aos="fade-up" className="achieve_1 card_bg background_change_light">
							<br />
							<p>
								<span>
									IITH is one of the top young IITs started by the government of India in 2008.
								</span>
							</p>
							<p>
								<span>
									In India, IIT Hyderabad was ranked 8 among engineering institutes by the National
									Institutional Ranking Framework in 2019 and 15 overall.
								</span>
							</p>
							<p>
								<span>IIT Hyderabad was ranked 201 in Asia by the QS World University Rankings</span>
								<span>&nbsp;of 2019 and 94 among BRICS nations in 2019.&nbsp;</span>
							</p>
							<br />
						</div>
					</div>
				</div>
				<div className="horizontalline1">
					<img src={logo1} alt="" className="crest_image" />
				</div>
				<hr style={{ height: '10', margin: '100' }} />
				<h1 className="heading_color" style={{ color: 'black' }}>
					<center>Some of the Major Innovations of IITH</center>
				</h1>{' '}
				<br />
				<div className="background_change_light achievements_panel">
					<h3 className="heading_color_inner">Fractal Academics:</h3>

					<span className="para_color">
						The Fractal Program at IITH atomizes the courses into breadth and depth, thereby enabling
						interdisciplinary learning with a wide choice of basic courses and advanced electives.
					</span>
				</div>
				<div className="background_change_light achievements_panel">
					<h2 className="heading_color_inner">Entrepreneurship:</h2>
					<span className="para_color">
						&nbsp;IIT-H offers a minor program in entrepreneurship. Unlike the other minor programs, the
						minor in entrepreneurship is open to all students of IITH. The courses in this program are
						offered by industrialists who are entrepreneurs themselves.
					</span>{' '}
				</div>
				<div className="background_change_light achievements_panel">
					<h2 className="heading_color_inner">Double Major and Minors:</h2>
					<span className="para_color">
						&nbsp;At IIT-H a B.Tech student can obtain a second major or minor by doing extra credits from
						another department of interest.&nbsp;
					</span>{' '}
				</div>
				<div className="background_change_light achievements_panel">
					<h2 className="heading_color_inner">Holistic Education:</h2>
					<span className="para_color">
						&nbsp;At IIT-H the B.Tech students are exposed to a number of courses that are in the fields of
						liberal arts and creative arts. The concept of holistic education is reinforced by free
						electives, which the students take from another engineering/science/arts/design departments.
					</span>{' '}
				</div>
				<p>
					<br />
				</p>
				<hr style={{ height: '10', margin: '100' }} />
				<h1 className="heading_color" style={{ color: 'black' }}>
					<center>Academic Awards and Achievements</center>
				</h1>
				<br />
				<div className="wrapper">
					<div className="box box1">IITH Students won Smart India Hackathon 2019.</div>
					<div className="box box2">Dr.D.S.Sharada won the TAS Award.</div>
					<div className="box box3">AE Young Achiever Award to Dr.Chandra Shekhar Sharma.</div>
					<div className="box box4">Dr.Syed Quadir Moinuddin won the ‘Weldwell Speciality Award 2019’</div>
					<div className="box box5">Dr.Debaprasad Shee won the TAS Award.</div>
					<div className="box box6">
						Ms.Poonam Rani won ‘Best Poster Presentation’ Award during National Conference on Solid State
						#Ionics held at IIT Roorkee.
					</div>
					<div className="box box7">Ms.Ankita Kolat has won Metrohm Young #chemist Award.</div>
					<div className="box box8">
						T.Appidi, R.Srivastava, Tejaswini Appidi, Deepak Bharadwaj and Dr.Arvind Rengan won Best Poster
						Award at IEEE NMDC 2019 Conference, Stockholm.{' '}
					</div>
					<div className="box box9">Dr.Sai Santosh Kumar Raavi won the TAS Award.</div>
					<div className="box box10">
						Mr.S.Yempalle’s Animated short film ‘Ek Cup Chaha’ has won @ awards at Anifest 2019.
					</div>
					<div className="box box11">
						Dr.Manohar Kaul, Mr.Jain Chauhan and Mr.Deepak Nathani paper was accepted at the international
						conference on learning Representations 2020.
					</div>
					<div className="box box12">
						Mr.Mamidi Suresh got first prize in the Best Poster Award during the 2nd Annual IISER Pune-KPIT
						international PhD Conference.
					</div>
					<div className="box box13">
						Mr.Koushik Makur and Ms.Tejaswini Appidi selection for the Newton Bhabha Programme.
					</div>
					<div className="box box14">
						Pinaka, by Mr.Akash Banerjee, Ms.Eti Chaudhary and Dr.Saurabh Joshi placed 3rd in Reach
						Safety-Floats subcategory.
					</div>
					<div className="box box15">
						Dr.Anil Agarwal has been jointly awarded the Young Turk of Composites Award 2019-20.
					</div>
					<div className="box box16">
						Ms.Swarnalatha Mailaram, Mr.Nitesh Dobhal and Mr.Sunil K.Maity won the ‘Best Paper Award’ during
						the 7th ICAER 2019 Conference.
					</div>
					<div className="box box17">
						IITH secured a total of 6 medals in Inter-IIT Meet-2019, 3 silver and 3 Bronze Medals.
					</div>
				</div>
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
	</div>*/}
		</div>
	)
}

export const AboutOCS = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className="recruit background_change_temp">
			{' '}
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div id="app"></div>
		</div>
	)
}
export const DirectorsDesk = () => (
	<div>
		<BackgroundChanger background={backgroundImage} />
		<p>DirectorsDesk</p>
	</div>
)
