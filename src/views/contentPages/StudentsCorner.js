/* eslint-disable */
import React from 'react'
import { useEffect, useState } from 'react'
import Footer from './footer'
import Placementexperiences from '../placements'
import Internshipexperiences from '../intenships'
import backgroundImage from '../../static/images/16.18.png'
import 'chart.js'
import Aos from 'aos'
import 'aos/dist/aos.css'
import Typography from '@material-ui/core/Typography'
import BackgroundChanger from '../../components/backgroundChanger'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import { GoLinkExternal } from 'react-icons/go'
import { FaPhoneAlt, FaAlignJustify } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'

import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import 'aos/dist/aos.css'

import Buildingprofile from '../../static/pdfs/Building-a-professional-profile.pdf'
import AlumniSearch from '../../static/pdfs/Using-the-Alumni-Search-Tool.pdf'
import Networkingprofessionally from '../../static/pdfs/Netwroking-Professionally.pdf'
import Coverletter from '../../static/pdfs/Cover-letter-writing-guide.pdf'
import Professionalreference from '../../static/pdfs/Professional-Reference-Guidelines.pdf'
import Thankyouletters from '../../static/pdfs/Thank-you-letters.pdf'

import pic20 from '../../static/PlacementDay2022/LYD01568.jpg'
import pic6 from '../../static/PlacementDay2022/carousel2/image01.jpg'
import pic7 from '../../static/PlacementDay2022/carousel2/image02.jpg'
import pic8 from '../../static/PlacementDay2022/carousel2/image03.jpg'
import pic9 from '../../static/PlacementDay2022/carousel2/image04.jpg'
import pic10 from '../../static/PlacementDay2022/carousel2/image05.jpg'
import pic11 from '../../static/PlacementDay2022/carousel2/image06.jpg'
import pic12 from '../../static/PlacementDay2022/carousel2/image07.jpg'
import pic13 from '../../static/PlacementDay2022/carousel2/image08.jpg'
import pic14 from '../../static/PlacementDay2022/carousel2/image09.jpg'
import pic15 from '../../static/PlacementDay2022/carousel2/image10.jpg'
import pic16 from '../../static/PlacementDay2022/carousel2/image11.jpg'
import pic17 from '../../static/PlacementDay2022/carousel3/image01.jpg'
import pic18 from '../../static/PlacementDay2022/carousel3/image02.jpg'
import pic19 from '../../static/PlacementDay2022/carousel3/image03.jpg'
import pic21 from '../../static/PlacementDay2022/carousel3/image04.jpg'
import pic22 from '../../static/PlacementDay2022/carousel3/image05.jpg'
import pic23 from '../../static/PlacementDay2022/carousel3/image06.jpg'
import pic24 from '../../static/PlacementDay2022/carousel3/image07.jpg'
import pic25 from '../../static/PlacementDay2022/carousel3/image08.jpg'
import pic26 from '../../static/PlacementDay2022/carousel3/image09.jpg'
import pic27 from '../../static/PlacementDay2022/carousel3/image10.jpg'
import pic28 from '../../static/PlacementDay2022/carousel3/image11.jpg'
import pic29 from '../../static/PlacementDay2022/carousel3/image12.jpg'
import pic30 from '../../static/PlacementDay2022/carousel3/image13.jpg'
import pic31 from '../../static/PlacementDay2022/carousel3/image14.jpg'
import pic32 from '../../static/PlacementDay2022/carousel3/image15.jpg'
import pic34 from '../../static/PlacementDay2022/carousel3/image16.jpg'
import pic33 from '../../static/PlacementDay2022/carousel3/image17.jpg'
import pic35 from '../../static/PlacementDay2022/carousel3/image18.jpg'
import pic36 from '../../static/PlacementDay2022/carousel3/image19.jpg'
import pic37 from '../../static/PlacementDay2022/carousel3/image20.jpg'
import pic38 from '../../static/PlacementDay2022/carousel3/image21.jpg'
import pic39 from '../../static/PlacementDay2022/carousel4/image01.jpg'
import pic40 from '../../static/PlacementDay2022/carousel4/image02.jpg'
import pic41 from '../../static/PlacementDay2022/carousel4/image03.jpg'
import pic42 from '../../static/PlacementDay2022/carousel4/image04.jpg'
import pic43 from '../../static/PlacementDay2022/carousel4/image05.jpg'
import pic44 from '../../static/PlacementDay2022/carousel4/image06.jpg'
import pic45 from '../../static/PlacementDay2022/carousel4/image07.jpg'
import pic46 from '../../static/PlacementDay2022/carousel4/image08.jpg'
import pic47 from '../../static/PlacementDay2022/carousel4/image09.jpg'
import pic48 from '../../static/PlacementDay2022/carousel4/image10.jpg'
import pic49 from '../../static/PlacementDay2022/carousel4/image11.jpg'
import pic50 from '../../static/PlacementDay2022/carousel4/image12.jpg'
import pic51 from '../../static/PlacementDay2022/carousel4/image13.jpg'
import pic52 from '../../static/PlacementDay2022/carousel4/image14.jpg'
import pic53 from '../../static/PlacementDay2022/carousel4/image15.jpg'
import pic54 from '../../static/PlacementDay2022/carousel4/image16.jpg'

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

const StudentsCorner = () => {
	React.useEffect(() => {})

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<Internshipexperiences />
		</div>
	)
}
export default StudentsCorner

export const PlacementDay = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	const carousel1 = [pic6, pic7, pic8, pic9, pic10, pic11, pic12, pic13, pic14, pic15, pic16]
	const carousel2 = [
		pic17,
		pic18,
		pic19,
		pic21,
		pic22,
		pic23,
		pic24,
		pic25,
		pic26,
		pic27,
		pic28,
		pic29,
		pic30,
		pic31,
		pic32,
		pic33,
		pic34,
		pic35,
		pic36,
		pic37,
		pic38,
	]
	const carousel3 = [
		pic39,
		pic40,
		pic41,
		pic42,
		pic43,
		pic44,
		pic45,
		pic46,
		pic47,
		pic48,
		pic49,
		pic50,
		pic51,
		pic52,
		pic53,
		pic54,
	]

	return (
		<div className="recruit background_change_temp">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="recruit_1" style={{ paddingTop: '22vh' }}>
				<h1>
					<center>Placement Day</center>
				</h1>
			</div>
			<div className="tryingforbg">
				<div data-aos="fade-up" className="firstpage_card background_change_light">
					<center>
						Indian Institute of Technology Hyderabad celebrates ‘Placement Day’ to felicitate the young,
						dynamic, enthusiastic and aspiring students with the “Excellence Award” for their significant
						contribution to the placement and internship activities and procedures, performed under the
						Office of Career Services of IITH. They are honorably designated as ‘Student Placement
						Coordinator’ and ‘Student Internship Coordinator’, marking them as bearing greater
						responsibility and integrity and dedication. We appreciate and thank the students for their
						efforts and valuable contribution in an exceptional way which fostered the success of the
						Institute in getting maximum companies.{' '}
					</center>
				</div>
			</div>
			<img src={pic20} width="100%" height="auto"></img>

			<Typography variant="h3" className="welcome_last_heading2">
				<center style={{ marginTop: '50px' }}>
					GALLERY
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
					<br />
				</center>
			</Typography>

			<Carousel
				centerMode={false}
				swipeable={true}
				infinite={true}
				autoPlay={true}
				arrows={false}
				removeArrowOnDeviceType={['tablet', 'mobile', 'mobile2']}
				autoPlaySpeed={1500}
				customTransition="transform 1s ease-in-out"
				focusOnSelect={true}
				transitionDuration={500}
				responsive={responsive}
				className="carousel"
			>
				{carousel1.map((pic) => {
					return <img src={pic} className="placementcarousel" style={{ width: '210px', padding: '15px' }} />
				})}
			</Carousel>
			<br />
			<Carousel
				centerMode={false}
				swipeable={true}
				infinite={true}
				autoPlay={true}
				arrows={false}
				removeArrowOnDeviceType={['tablet', 'mobile', 'mobile2']}
				autoPlaySpeed={1500}
				customTransition="transform 1s ease-in-out"
				focusOnSelect={true}
				transitionDuration={500}
				responsive={responsive}
				className="carousel"
			>
				{carousel2.map((pic) => {
					return <img src={pic} className="placementcarousel" style={{ width: '210px', padding: '15px' }} />
				})}
			</Carousel>
			<br />
			<Carousel
				centerMode={false}
				swipeable={true}
				infinite={true}
				autoPlay={true}
				arrows={false}
				removeArrowOnDeviceType={['tablet', 'mobile', 'mobile2']}
				autoPlaySpeed={1500}
				customTransition="transform 1s ease-in-out"
				focusOnSelect={true}
				transitionDuration={500}
				responsive={responsive}
				className="carousel"
			>
				{carousel3.map((pic) => {
					return <img src={pic} className="placementcarousel" style={{ width: '210px', padding: '15px' }} />
				})}
			</Carousel>
		</div>
	)
}

export const LinkedIn = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className="recruit background_change_temp">
			{' '}
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="firstpage">
				<div className="recruit_1" style={{ paddingTop: '10vh' }}>
					<h1>
						<center>How to Use LinkedIn?</center>
					</h1>

					<Typography variant="h4">
						<center>
							<a
								href="https://www.linkedin.com/"
								target="_blank"
								rel="noopener noreferrer"
								style={{ color: '#f0f0f0' }}
							>
								Visit the site <GoLinkExternal style={{ verticalAlign: 'middle' }} />
							</a>
						</center>
					</Typography>
				</div>
				<div className="tryingforbg">
					<div data-aos="fade-up" className="firstpage_card">
						<div className=" card_bg">
							LinkedIn is an online professional networking tool that boasts over 500 million members in
							more than 200 countries (representing 170+ industries). <br />
							LinkedIn,which is mostly used for looking up research jobs and industries, exchange
							information or advice, locate and contact professionals, additionally, lists professional
							networking and volunteering opportunities. According to the stats, 79% of job opportunities
							are posted on at least one social network, and 77% of those are posted on LinkedIn.{' '}
						</div>
					</div>
				</div>
				<br />
			</div>{' '}
			<br />
			<br />
			<br />
			<Typography variant="h3" id="move1" style={{ padding: '2%' }} component="h2">
				<center>Building a Linkedlin Profile</center>
				<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
			</Typography>
			<div className="background_change_light achievements_panel">
				Building a LinkedIn profile and using it to its maximum potential thus becomes crucial, if we plan to
				become modern day professionals. Though seemingly simple to use and join LinkedIn, Building a strong and
				effective LinkedIn profile to catch recruiters and investors' eye, becomes a task with multifold steps
				and to manifest its full potential, one should consider various aspects of the features provided by
				LinkedIn.
			</div>
			<div className="recruit_grid1">
				{' '}
				<Card className="secondpage background_change_light_temp">
					<CardContent>
						<Typography variant="h4" component="h2">
							Building a professional profile
						</Typography>
						<Typography variant="h6" component="p" style={{ color: '#4b4b4b' }}>
							Tailor your profile.
						</Typography>
					</CardContent>
					<CardActions style={{ paddingRight: '5%' }}>
						<a href={Buildingprofile} target="_blank" rel="noopener noreferrer">
							<Button variant="default" size="small">
								Know More
							</Button>
						</a>
					</CardActions>
				</Card>
				<Card className="thirdpage background_change_light_temp">
					<CardContent>
						<Typography variant="h4" component="h2">
							Using the alumni search tool
						</Typography>
						<Typography variant="h6" component="p" style={{ color: '#4b4b4b' }}>
							Communicating effectively on LinkedIn
						</Typography>
					</CardContent>
					<CardActions style={{ paddingRight: '5%' }}>
						<a href={AlumniSearch} target="_blank" rel="noopener noreferrer">
							<Button variant="default" style={{ marginTop: '10px' }} color="primary" size="small">
								Know More
							</Button>
						</a>
					</CardActions>
				</Card>
				<Card className="fourthpage background_change_light_temp">
					<CardContent>
						<Typography variant="h4" component="h2">
							Networking Professionally
						</Typography>
						<Typography variant="h6" component="p" style={{ color: '#4b4b4b' }}>
							Building your Personal
							<br /> Brand
						</Typography>
					</CardContent>
					<CardActions style={{ paddingRight: '5%' }}>
						<br />
						<a href={Networkingprofessionally} target="_blank" rel="noopener noreferrer">
							<Button variant="default" style={{ marginTop: '10px' }} size="small">
								Know More
							</Button>
						</a>
					</CardActions>
				</Card>
			</div>
			<div className="background_change_light achievements_panel">
				Using any tool or technology requires only one thing, your commitment to learn its features and practice
				regularly what you learn. Same is with LinkedIn, the more you remain active and the more you explore its
				features, the more it gets easier to use and the more it is beneficial for you.
			</div>
			<p>
				<br />
			</p>
			<Footer />{' '}
		</div>
	)
}
export const AcademicCareerGuide = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })
	})

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<Placementexperiences />
		</div>
	)
}
export const GuidetoPro = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className="recruit">
			<div className=" background_change_temp">
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className=" recruit_1 research_1">
					<br />
					<h1 className="heading_programs heading_color">
						<center>Guide to professional correspondence</center>
					</h1>
				</div>
				<div className="tryingforbg">
					<div data-aos="fade-up" className="firstpage_card background_change_light">
						<Typography variant="h4">What is Professional Correspondence?</Typography>
						<br />
						<div className="para_color">
							First impression might not be the last impression but indeed it is the most powerful
							impression and the deciding factor of whether your communication moves any further or not in
							the professional scenario. In the professional world your first impression is generally your
							professional correspondence i.e. your interaction with your employer or client. <br />
							Any written interaction you have with a potential employer or client, whether electronic,
							printed, or hand-written, is an opportunity for you to make a positive or negative
							impression. It is also your chance to express your interest in a position or organization,
							offer the employer or client insight into who you are and what you have to offer, and to
							impress them with your communication skills.
						</div>
					</div>
				</div>
				<Typography variant="h3" id="move1" style={{ fontSize: '1.9em', padding: '0%' }} component="h2">
					<center>Some tips for your impressive correspondence</center>
					<hr style={{ width: '50%', border: '1px solid black', color: 'black' }} />
				</Typography>
				<div className="background_change_light achievements_panel">
					<span className="para_color">
						There are a variety of ways in which you will need to correspond at least once in your career.{' '}
						<br />
						Let's take a look at some of the tips that will help you to make an impressive correspondence in
						your first go.
					</span>
					<br />
				</div>
				<div className="recruit_grid1">
					{' '}
					<Card className="secondpage background_change_light_temp">
						<CardContent>
							<Typography variant="h4" component="h2" style={{ fontSize: '1.5em' }}>
								Cover letter
								<br />
								writing
								<br />
								manual
							</Typography>
						</CardContent>
						<CardActions style={{ paddingRight: '5%' }}>
							<a href={Coverletter} target="_blank" rel="noopener noreferrer">
								<Button variant="default" size="small">
									Know More
								</Button>
							</a>
						</CardActions>
					</Card>
					<Card className="thirdpage background_change_light_temp">
						<CardContent>
							<Typography variant="h4" component="h2" style={{ fontSize: '1.5em' }}>
								Thank you
								<br />
								letter
								<br />
								<br />
							</Typography>
						</CardContent>
						<CardActions style={{ paddingRight: '5%' }}>
							<a href={Thankyouletters} target="_blank" rel="noopener noreferrer">
								<Button variant="default" style={{ marginTop: '10px' }} color="primary" size="small">
									Know More
								</Button>
							</a>
						</CardActions>
					</Card>
					<Card className="fourthpage background_change_light_temp">
						<CardContent>
							<Typography variant="h4" component="h2" style={{ fontSize: '1.5em' }}>
								Professional
								<br />
								Reference
								<br />
								Guidelines
							</Typography>
						</CardContent>
						<CardActions style={{ paddingRight: '5%' }}>
							<br />
							<a href={Professionalreference} target="_blank" rel="noopener noreferrer">
								<Button variant="default" style={{ marginTop: '10px' }} size="small">
									Know More
								</Button>
							</a>
						</CardActions>
					</Card>
				</div>
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
				<Footer />
			</div>
		</div>
	)
}
export const RecruitersPolicyForPlacements = () => {

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<iframe
				id="placementpolicyframe"
				src="/Recruiters-Policy-Placements.html"
				style={{ width: '100%', height: '100vh', position: 'absolute', margin: 0, padding: 0, border: 0 }}
			></iframe>
		</div>
	)
}
export const RecruitersPolicyForInternships = () => {

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<iframe
				id="placementpolicyframe"
				src="/Recruiters-Policy-Internships.html"
				style={{ width: '100%', height: '100vh', position: 'absolute', margin: 0, padding: 0, border: 0 }}
			></iframe>
		</div>
	)
}
export const PlacementRulesandRegulations = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('form_button')
		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', handleClick) //Older syntax
		}
		function handleClick() {
			window.open('https://docs.google.com/document/d/14ka3xI5Vb4GIy3QMNh1XqHGXAR7wLBA64rz2BLH_2oU')
		}
		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
		}
	})

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<iframe
				id="placementpolicyframe"
				src="/Placement-Policy.html"
				style={{ width: '100%', height: '100vh', position: 'absolute', margin: 0, padding: 0, border: 0 }}
			></iframe>
		</div>
	)
}
export const InternshipRulesandRegulations = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('form_button')
		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', handleClick) //Older syntax
		}
		function handleClick() {
			window.open('https://docs.google.com/document/d/14ka3xI5Vb4GIy3QMNh1XqHGXAR7wLBA64rz2BLH_2oU')
		}
		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
		}
	})

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<iframe
				id="placementpolicyframe"
				src="/Internship-Policy.html"
				style={{ width: '100%', height: '100vh', position: 'absolute', margin: 0, padding: 0, border: 0 }}
			></iframe>
		</div>
	)
}
export const FAQs = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('form_button')
		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', handleClick) //Older syntax
		}
		function handleClick() {
			window.open('https://docs.google.com/document/d/14ka3xI5Vb4GIy3QMNh1XqHGXAR7wLBA64rz2BLH_2oU')
		}
		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
		}
	})

	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className=" recruit_1 extracirricular_1 ">
				<h1 className=" ">
					<center>Policy and Guidelines</center>
				</h1>
			</div>
			<div className="tryingforbg">
				<div data-aos="fade-up" className="firstpage_card firstpage_card1 card_bg">
					<center>Coming soon ...</center>
				</div>
			</div>
		</div>
	)
}
export const HowToRegister = () => {
	const GuidePage = React.lazy(() => import('./studentPortalGuide'))
	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#FFFFFF" />
			<GuidePage />{' '}
			<p>
				<br />
			</p>{' '}
			<p>
				<br />
			</p>
		</div>
	)
}
