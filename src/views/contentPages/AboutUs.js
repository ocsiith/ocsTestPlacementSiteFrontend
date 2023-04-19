/* eslint-disable */
import React from 'react'
import Footer from './footer'
import { GrLinkedin } from 'react-icons/gr'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { FaPhoneAlt, FaAlignJustify } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'

import abhishekpic from '../../static/profilepics/abhishek.jpeg'
import anushkapic from '../../static/profilepics/anushka.jpg'
import aakashpic from '../../static/profilepics/aaaaa.jpg'
import ravipic from '../../static/profilepics/20191013_150503__01.jpg'
import pranjalpic from '../../static/profilepics/IMG-20200716-WA0026.jpg'
import vigneshpic from '../../static/profilepics/IDCardPic.jpg'
import bilalpic from '../../static/profilepics/bilalpic.jpg'
import rashmithapic from '../../static/profilepics/IMG_20200723_204605.jpg'
import backgroundImage from '../../static/images/16.18.png'
import karthikpic from '../../static/profilepics/me.jpg'
import ronakpic from '../../static/profilepics/ronakpic.jpg'
import arsalanpic from '../../static/profilepics/arsalanpic.jpeg'
import anandpic from '../../static/profilepics/anandpic.jpeg'

import jaipic from '../../static/profilepics/jai.jpeg'
import ranjithpic from '../../static/profilepics/ranjith.jpeg'
import susilpic from '../../static/profilepics/susilpic.jpeg'
import muditapic from '../../static/profilepics/mudita.jpeg'
import dipakpic from '../../static/profilepics/dipaksingh.jpg'
import saumyapic from '../../static/profilepics/saumya.jpeg'
import prarthnapic from '../../static/profilepics/Prarthna.jpg'
import saiPrachodhanpic from '../../static/profilepics/saiPrachodhan.jpeg'
import sarveshpic from '../../static/profilepics/sarvesh.jpeg'
import priyanshapic from '../../static/profilepics/Priyansha.jpeg'

import Aos from 'aos'
import 'aos/dist/aos.css'

import MailOutlineIcon from '@material-ui/icons/MailOutline'

import BackgroundChanger from '../../components/backgroundChanger'

const sharathpic = 'https://github.com/tnfssc.png?size=300'

const AboutUsPage = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])
	return (
		<div className="homepage background_change">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="firstpage recruit">
				<div className="recruit_1 extracirricular_1">
					<h1 className=" ">
						<center>About OCS</center>
					</h1>
				</div>
				<div className="tryingforbg">
					<div data-aos="fade-up" className="firstpage_card firstpage_card1">
						<div className=" card_bg">
							The Office of Career Services hopes to work on a defined structure of hiring procedure and
							will facilitate the interactions with various industrial, management and research
							organisations ensuring the students are given enough exposure/industrial training right from
							the second year enabling them to be employed by the best of the firms.
						</div>
					</div>
				</div>
				<br />
			</div>{' '}
			<br />
			<br />
			<div className="achieve">
				<Typography variant="h5" style={{ fontSize: '2em', color: 'black', padding: '5% 2% % 2%' }}>
					<center> Cells under OCS</center>{' '}
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
				</Typography>{' '}
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ padding: '2% 0%' }}>
						Career Cell:
					</Typography>
					<span className="para_color">
						Works towards diversifying the sectors of companies coming to the campus and delivering industry
						ready students.
					</span>
				</div>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ padding: '2% 0%' }}>
						Placement Cell:
					</Typography>
					<span className="para_color">
						Works closely with the career cell & is responsible for conducting the placement process in the
						campus.
					</span>{' '}
				</div>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ padding: '2% 0%' }}>
						Internship Cell:
					</Typography>
					<span className="para_color">
						Works closely with the career cell & is responsible for conducting the internship activities in
						the campus.
					</span>{' '}
				</div>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ padding: '2% 0%' }}>
						Tech Cell:
					</Typography>
					<span className="para_color">Main target of Tech Cells is to automate most of the process</span>{' '}
				</div>
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
			</div>{' '}
			<Footer />{' '}
		</div>
	)
}
export default AboutUsPage
export const OCSTeam = () => {
	const team = [
		{
			type: "Students' Head",
			members: [
				{
					name: 'Jai Goyal',
					email: 'ocs.head',
					pic: jaipic,
					linkedin: 'jai-goyal-877b011a7',
					role: 'Head of OCS',
				},
			],
		},
		{
			type: "Students' Managers",
			members: [
				{
					name: 'Mudita Dubey',
					email: 'placement.manager',
					pic: muditapic,
					linkedin: 'mudita-dubey-682b13140',
					role: 'Placement Manager',
				},
				{
					name: 'Dipak Singh',
					email: 'placement.manager',
					pic: dipakpic,
					linkedin: 'dipak-singh-a46832b5',
					role: 'Placement Manager',
				},
				{
					name: 'Saumya Mundra',
					email: 'internship.manager',
					pic: saumyapic,
					linkedin: 'saumya-mundra',
					role: 'Internship Manager',
				},
				{
					name: 'Agathiyan Susil R',
					email: 'careercell.manager',
					pic: susilpic,
					linkedin: 'agathiyan-susil-r-01928a134',
					role: 'Career Cell Manager',
				},
				{
					name: 'Cheerla Ranjith',
					email: 'support.ocs',
					pic: ranjithpic,
					linkedin: 'ranjith-cheerla',
					role: 'Tech Cell Manager',
				},
				{
					name: 'Arsalan Ahmad Sheikh',
					email: 'support.ocs',
					pic: arsalanpic,
					linkedin: 'arsalan-sheikh-7b3191194',
					role: 'Tech Cell Manager',
				},
			],
		},
	]
	return (
		<div>
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="websitedev_bg" style={{ paddingBottom: '25vh' }}>
				<p style={{ fontSize: '3.5em' }}>
					<center>OCS Team</center>
				</p>{' '}
			</div>
			<div style={{ transform: 'translateY(-25vh)' }}>
				<div data-aos="fade-up" className="ocsteam">
					<br />
					<div className="ocsteamgrid">
						<div className="placementteam">
							<div />
							<Card variant="contained" id="java1" style={{ backgroundColor: '#f0f0f0', padding: '2%' }}>
								<CardContent>
									<Typography
										variant="h6"
										style={{ fontSize: '1.25em', color: 'black', }}
										component="h2"
									>
										Dean Alumni & Corporate Relations
									</Typography>

									<Typography variant="h5" component="h2">
										Dr. Mudrika Khandelwal
									</Typography>
									<Typography color="textSecondary">Associate Professor</Typography>
									<Typography variant="body2" component="p">
										Department of MSME
										<br />
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										startIcon={<MailOutlineIcon />}
										variant="default"
										size="small"
										href="mailto:dean.acr@iith.ac.in"
									>
										dean.acr@iith.ac.in
									</Button>
								</CardActions>
							</Card>
						</div>
						<div className="placementteam">
							<Card variant="contained" id="java1" style={{ backgroundColor: '#f0f0f0', padding: '2%' }}>
								<CardContent>
									<Typography
										variant="h6"
										style={{ fontSize: '1.28em', color: 'black', }}
										component="h2"
									>
										Faculty In-charge
									</Typography>

									<Typography variant="h5" component="h2">
										Dr. Abhinav Kumar
									</Typography>
									<Typography color="textSecondary">Associate Professor</Typography>
									<Typography variant="body2" component="p">
										Department of Electrical Engineering
										<br />
									</Typography>
								</CardContent>
								<CardActions>
									<Button
										startIcon={<MailOutlineIcon />}
										variant="default"
										size="small"
										href="mailto:fic.ocs@iith.ac.in"
									>
										fic.ocs@iith.ac.in
									</Button>
								</CardActions>
							</Card>
						</div>
					</div>
					<br />
					{/* <Typography
						variant="h5"
						style={{ fontSize: '2em', color: 'black', padding: '5% 2% 2% 2%' }}
						component="h2"
					>
						<center>Dean Public & Corporate Relations</center>
						<hr style={{ width: '150px', border: '1px solid black', color: 'black' }} />
					</Typography>
					<div />

					<Card variant="contained" className="ocsteamcard1" style={{ backgroundColor: '#f0f0f0' }}>
						<CardContent>
							<Typography variant="h5" component="h2">
								Prof C. Krishna Mohan
							</Typography>
							<Typography color="textSecondary">Professor</Typography>
							<Typography variant="body2" component="p">
								Department of Computer Science & Engineering
								<br />
							</Typography>
						</CardContent>
					</Card>

					<Typography
						variant="h5"
						style={{ fontSize: '2em', color: 'black', padding: '5% 2% 2% 2%' }}
						component="h2"
					>
						<center>Faculty In-charge</center>
						<hr style={{ width: '150px', border: '1px solid black', color: 'black' }} />
					</Typography>
					<div />

					<Card variant="contained" className="ocsteamcard1" style={{ backgroundColor: '#f0f0f0' }}>
						<CardContent>
							<Typography variant="h5" component="h2">
								Dr. Abhinav Kumar
							</Typography>
							<Typography color="textSecondary">Associate Professor</Typography>
							<Typography variant="body2" component="p">
								Department Of Electrical Engineering
								<br />
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								startIcon={<MailOutlineIcon />}
								variant="default"
								size="small"
								href="mailto:fic.ocs@iith.ac.in"
							>
								fic.ocs@iith.ac.in
							</Button>
						</CardActions>
					</Card> */}

					{/* <Typography
						variant="h5"
						style={{ fontSize: '2em', color: 'black', padding: '5% 2% 2% 2%' }}
						component="h2"
					>
						<center>OCS Team</center>
						<hr style={{ width: '150px', border: '1px solid black', color: 'black' }} />
					</Typography>
					<div /> */}
					<div className="ocsteamgrid">
						<div className="placementteam">
							<Card variant="contained" id="java1" style={{ backgroundColor: '#f0f0f0', padding: '2%' }}>
								<CardContent>
									<Typography variant="h5" component="h2">
										Ms. Malini K.
									</Typography>
									<Typography color="textSecondary">Section Officer</Typography>
								</CardContent>
								<CardActions>
									<Button
										startIcon={<MailOutlineIcon />}
										variant="default"
										size="small"
										href="mailto:office.placement@iith.ac.in"
									>
										office.placement@iith.ac.in
									</Button>
								</CardActions>
							</Card>
						</div>
						<div className="placementteam">
							<Card variant="contained" id="java1" style={{ backgroundColor: '#f0f0f0', padding: '2%' }}>
								<CardContent>
									<Typography variant="h5" component="h2">
										Mr. Vetrivel M.
									</Typography>
									<Typography color="textSecondary">Executive Assistant</Typography>
								</CardContent>
								<CardActions>
									<Button
										startIcon={<MailOutlineIcon />}
										variant="default"
										size="small"
										href="mailto:internships@iith.ac.in"
									>
										internships@iith.ac.in
									</Button>
								</CardActions>
							</Card>
						</div>
					</div>
					<br />
				</div>
				<p>
					<br />
				</p>
				<div data-aos="fade-up" className="ocsteam">
					{team.map((section, key) => (
						<>
							<Typography
								variant="h5"
								style={{ fontSize: '2em', color: 'black', padding: '5% 2% 2% 2%' }}
								component="h2"
							>
								<center>{section.type}</center>
								<hr style={{ width: '150px', border: '1px solid black', color: 'black' }} />
							</Typography>
							<div className="ocsteamgrid">
								{section.members.map((individual, key) => (
									<div className="placementteam">
										<Card
											variant="contained"
											id={`java7`}
											style={{ backgroundColor: '#f0f0f0', padding: '2%' }}
										>
											<CardContent>
												<img
													src={individual.pic}
													style={{ float: 'right' }}
													className="contactus_image"
													alt=""
												/>
												<Typography variant="h5" component="h2">
													{individual.name}
												</Typography>
												<Typography color="textSecondary">{`${individual.role}`}</Typography>
											</CardContent>
											<CardActions>
												<Button
													startIcon={<MailOutlineIcon />}
													variant="default"
													size="small"
													href={`mailto:${individual.email}@iith.ac.in`}
													target="blank"
												></Button>
												<Button
													variant="default"
													size="small"
													href={`https://www.linkedin.com/in/${individual.linkedin}/`}
													target="blank"
												>
													LinkedIn
												</Button>
											</CardActions>
										</Card>
									</div>
								))}
								<br />
							</div>
						</>
					))}
				</div>
			</div>
			<Footer className="homepage" />{' '}
		</div>
	)
}
export const WebsiteTeam = () => {

	const mainTeam = [
		{
			heading: "Current Team",
			members: [
				{
					first_name: 'Arsalan',
					last_name: 'Ahmad Sheikh',
					rollNo: 'es19btech11025',
					pic: arsalanpic,
					linkedin: 'arsalan-sheikh-7b3191194',
					phone: '916005328558',
				},
				{
					first_name: 'Cheerla',
					last_name: 'Ranjith',
					rollNo: 'mi21mtech11002',
					pic: ranjithpic,
					linkedin: 'ranjith-cheerla',
					phone: '917720963457',
				},
				{
					first_name: 'Prarthna',
					last_name: 'Luthra',
					rollNo: 'bm21mtech11001',
					pic: prarthnapic,
					linkedin: 'prarthna-luthra',
					phone: '919899150040',
				},
				{
					first_name: 'Sai Prachodhan',
					last_name: 'Devulapalli',
					rollNo: 'es20btech110013',
					pic: saiPrachodhanpic,
					linkedin: 'sai-prachodhan-devulapalli',
					phone: '919160571016',
				},
				{
					first_name: 'Sarvesh',
					last_name: 'Mokhare',
					rollNo: 'ch20btech110023',
					pic: sarveshpic,
					linkedin: 'sarvesh-mokhare',
					phone: '919156833197',
				},
				{
					first_name: 'Priyansha',
					last_name: 'Tiwari',
					rollNo: 'cs22mtech02003',
					pic: priyanshapic,
					linkedin: 'priyansha-tiwari-128b18164',
					phone: '918963944005',
				},
			]
		},
		{
			heading: "Website Developers",
			members: [
				{
					first_name: 'Abhishek',
					last_name: 'Agarwal',
					rollNo: 'ep17btech11001',
					pic: abhishekpic,

				},
				{
					first_name: 'Karthik',
					last_name: 'Reddy Puli',
					rollNo: 'es18btech11008',
					pic: karthikpic,
					linkedin: 'karthik-reddy-puli-772742169',

				},
				{
					first_name: 'Sharath Chandra',
					last_name: 'Sheripally',
					rollNo: 'es18btech11016',
					pic: sharathpic,
					linkedin: 'sharath-chandra-sheripally-950735169',

				},
				{
					first_name: 'Raviteja',
					last_name: 'Namani',
					rollNo: 'cs18btech11032',
					pic: ravipic,
					linkedin: 'raviteja-namani-2240361b2',
					phone: '919381629505',
				},
				{
					first_name: 'Dontu',
					last_name: 'Anand Sai',
					rollNo: 'ee19btech11007',
					pic: anandpic,
					phone: '91951548187',
				},
				{
					first_name: 'Ronak',
					last_name: 'Devda',
					rollNo: 'ee19btech11023',
					pic: ronakpic,
					linkedin: 'ronak-devda-a73b99200',
					phone: '917023059854',
				},
			]
		},
		{
			heading: "Content Contributors",
			members: [
				{
					first_name: 'Aakash',
					last_name: 'Daswani',
					pic: aakashpic,
					linkedin: 'aakash-daswani-87316015a',
					phone: '917997512500',
				},
				{
					first_name: 'Mohammed',
					last_name: 'Bilal Shaikh',
					pic: bilalpic,
					linkedin: 'mohammed-bilal-shaikh-882b48198',
					phone: '918125908531',
				},
				{
					first_name: 'Vignesh',
					last_name: 'K',
					pic: vigneshpic,
					linkedin: 'vignesh-k-993020b7',
					phone: '917904263469',
				},
				{
					first_name: 'V Rashmitha',
					last_name: 'Reddy',
					pic: rashmithapic,
					linkedin: 'rashmitha-reddy-vemula-3036211a4',
					phone: '919381782847',
					rollNo: "me18btech11042"
				},
				{
					first_name: 'Pranjal Narendra',
					last_name: 'Desale',
					pic: pranjalpic,
					linkedin: 'pranjal-desale-4094b219b',
					phone: '919307534849',
					rollNo: "ep19btech11006"
				},
				{
					first_name: 'Anushka',
					last_name: 'Khare',
					pic: anushkapic,
					linkedin: 'anushka-khare-88185619b',
					phone: '919617915183',
					rollNo: "ch19btech11029"
				},

			]
		}
	]

	React.useEffect(() => { })

	return (
		<div className="recruit background_change_temp">
			<BackgroundChanger backgroundColor="#f0f0f0" />

			{mainTeam.map(team => <div className="firstpage">
				<div className="websitedev_bg">
					<h1 className=" ">
						<center>{team.heading}</center>
					</h1>
				</div>
				<div className="websitecontributorsbackground">
					<div className="row1">
						{team.members.map((member, key) => (
							<div className="card1 para_color card_bg">
								{/* Image */}
								<img src={member.pic} className="reacticons2" alt="" />

								{/* NAME */}
								<Typography variant="h5" component="h2" style={{ fontWeight: "500", padding: '5% 2% 2% 2%' }} >
									{member.first_name}
									<br />
									{member.last_name}
								</Typography>
								<br />

								{/* Email */}
								{member.rollNo &&
									<a style={{ color: 'black' }} href={`mailto:${member.rollNo}@iith.ac.in`}
										target="blank"
									><GrMail className="reacticon" />&nbsp;&nbsp;</a>}

								{/* LINKEDIN */}
								{member.linkedin &&
									<a
										href={`https://www.linkedin.com/in/${member.linkedin}/`} style={{ color: 'black' }} target="blank">
										<GrLinkedin className="reacticon" />
										&nbsp;&nbsp;
									</a>}

								{/* Phone Number */}
								{member.phone &&
									<a href={`tel:${member.phone}`} style={{ color: 'black' }}>
										<FaPhoneAlt className="reacticon" />
									</a>}

							</div>
						))}
					</div>
				</div>
			</div>)}
			<Footer id="footer" />
		</div>
	)
}
export const ContactUs = () => (
	<div>
		<BackgroundChanger background={backgroundImage} />
	</div>
)
