/* eslint-disable */
import React, { useEffect } from 'react'
import Typography from '@material-ui/core/Typography'
import Footer from './footer'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import { FaPhoneAlt, FaAlignJustify } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'
import BackgroundChanger from '../../components/backgroundChanger'
import Aos from 'aos'
import 'aos/dist/aos.css'

const ReachUsPage = () => {
	React.useEffect(() => {
		document.getElementById(`java1`).style.height =
			Math.max(document.getElementById(`java1`).clientHeight, document.getElementById(`java2`).clientHeight) +
			'px'
		document.getElementById(`java2`).style.height =
			Math.max(document.getElementById(`java1`).clientHeight, document.getElementById(`java2`).clientHeight) +
			'px'
	})
	return (
		<div className="staying1">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div style={{ padding: 15 }} />
			<div style={{ padding: 15 }} />
			<div className="portalguide">
				<div>
					{' '}
					<Card
						variant="contained"
						style={{
							backgroundColor: 'white',
							width: '90%',
							padding: 25,
							maxWidth: '400px',
							margin: '5%',
						}}
						id="java1"
					>
						<CardContent>
							<Typography variant="h3" component="h2">
								Office Address:
							</Typography>
							<br />
							<Typography variant="body" style={{ fontSize: '1.5em' }} component="p">
								B-313, Office of Career Services
								<br />
								Indian Institute of Technology, Hyderabad
								<br />
								Kandi Mandal, Sangareddy District,
								<br />
								Telangana, India-502285.
							</Typography>
						</CardContent>
					</Card>
				</div>

				<div>
					<Card
						variant="contained"
						style={{
							backgroundColor: 'white',
							padding: 25,
							width: '90%',
							maxWidth: '400px',
							margin: '5%',
						}}
						id="java2"
					>
						<CardContent>
							<Typography variant="h3" component="h2">
								Contact
								<br />
								At:
							</Typography>
							<br />

							<Typography variant="body" style={{ fontSize: '1.5em', lineHeight: '1.8' }} component="p">
								<a href="mailto:office.placement@iith.ac.in" style={{ color: 'black' }}>
									<GrMail className="reacticon" /> &nbsp;office.placement@iith.ac.in
								</a>
								<br />
								<a href="mailto:internships@iith.ac.in" style={{ color: 'black' }}>
									<GrMail className="reacticon" /> &nbsp;internships@iith.ac.in
								</a>
								<br />
								<a href="tel:04023016810" style={{ color: 'black' }}>
									<FaPhoneAlt className="reacticon" /> &nbsp;040 2301 6810
								</a>
								<br />
								<a href="tel:04023017066" style={{ color: 'black' }}>
									<FaPhoneAlt className="reacticon" /> &nbsp;040 2301 7066
								</a>
								<br />
								<a href="tel:918331036118" style={{ color: 'black' }}>
									<FaPhoneAlt className="reacticon" /> &nbsp;83310 36118
								</a>
							</Typography>
						</CardContent>
						<br />
					</Card>
				</div>
			</div>{' '}
			<p>
				<br />
			</p>
			<Footer />{' '}
		</div>
	)
}
export default ReachUsPage

export const HowToReach = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className="recruit">
			{' '}
			<div className="HowToReach">
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className="recruit_1 extracirricular_1">
					<h1 className=" ">
						<center>How to Reach IITH?</center>
					</h1>
				</div>{' '}
				<div data-aos="zoom-in" className="howtoreach_card">
					<Typography
						variant="h5"
						style={{ fontSize: '1.5em', color: 'black', padding: '0%' }}
						component="h2"
					>
						From Airport (64 km)
						<hr style={{ width: '200px', border: '1px solid black', marginLeft: '0%', color: 'black' }} />
					</Typography>
					<ul className="para_color">
						<li> Get on ORR in Gandiguda from Airport Approach Road</li>
						<li>Follow ORR to Muthangi, Hyderabad, Take exit 3 from ORR</li>
						<li>
							Drive to Mumbai Highway/ NH-9 for 15km. You will find the sign board of IITH on RIght side.
						</li>
					</ul>
				</div>
				<div data-aos="zoom-in" className="howtoreach_card1">
					<Typography
						variant="h5"
						style={{ fontSize: '1.5em', color: 'black', padding: '0%' }}
						component="h2"
					>
						From Mahatma Gandhi Bus Station (54 km)
						<hr style={{ width: '200px', border: '1px solid black', marginLeft: '0%', color: 'black' }} />
					</Typography>

					<ul className="para_color">
						<li>Head north towards Mumbai Highway or NH-65</li>
						<li>Get Via Kukatpally, Patancheruvu</li>
						<li>Follow ORR to Mumbai Highway or NH-65</li>
						<li>Merge onto ORR</li>
						<li>Take exit towards Mumbai Highway or NH-65</li>
						<li>
							{' '}
							Drive to Mumbai Highway or NH-65 for 15km. You will find the sign board of IITH on Right
							side
						</li>
					</ul>
				</div>{' '}
				<div data-aos="zoom-in" className="howtoreach_card">
					<Typography
						variant="h5"
						style={{ fontSize: '1.5em', color: 'black', padding: '0%' }}
						component="h2"
					>
						From Secundrabad Railway Station (50 km)
						<hr style={{ width: '200px', border: '1px solid black', marginLeft: '0%', color: 'black' }} />
					</Typography>

					<ul className="para_color">
						<li>Take SD Road to Mahatma Gandhi Rd/NH 7 in Hyderabad</li>
						<li>Follow NH 7 to Old Airport Rd in New Bowenpally</li>
						<li>Continue on Old Airport Rd to Bhavani Nagar</li>
						<li>Drive to Mumbai Highway/NH 65</li>
						<li>
							Continue to drive on Mumbai Highway/NH 65, you will find the sign board of IITH on Right
							side
						</li>
					</ul>
				</div>
				<div data-aos="zoom-in" className="howtoreach_card1">
					<Typography
						variant="h5"
						style={{ fontSize: '1.5em', color: 'black', padding: '0%' }}
						component="h2"
					>
						From Hitech City (38 km)
						<hr style={{ width: '200px', border: '1px solid black', marginLeft: '0%', color: 'black' }} />
					</Typography>
					<ul className="para_color">
						<li> Take Gachibowli - Miyapur Road to NH-65 in Hafeezpet 19 mins (6.9 km)</li>
						<li>Drive to NH-65 in Kandi</li>
					</ul>
				</div>
				<div data-aos="zoom-in" className="howtoreach_card">
					<Typography
						variant="h5"
						style={{ fontSize: '1.5em', color: 'black', padding: '0%' }}
						component="h2"
					>
						Metro Route
						<hr style={{ width: '150px', border: '1px solid black', marginLeft: '0%', color: 'black' }} />
					</Typography>
					<ul className="para_color">
						<li>
							Reach the Secunderabad-East Metro station which is about 600 meters from the Secunderabad
							Railway station.
						</li>
						<li>Take a ticket to Miyapur Station. You need to change metros to reach Miyapur Station.</li>
						<li>Board a metro and get down in Ameerpet Station.</li>
						<li>Board a metro towards Miyapur Station.</li>
						<li>Take a bus from Miyapur Bus-stop to Patancheru Bus Station.</li>
						<li>Take a bus to Sangareddy Town and you will find the sign board of IITH on Right side.</li>
					</ul>
				</div>
				<div data-aos="zoom-in" className="howtoreach_card1">
					<Typography
						variant="h5"
						style={{ fontSize: '1.5em', color: 'black', padding: '0%' }}
						component="h2"
					>
						MMTS Route
						<hr style={{ width: '150px', border: '1px solid black', marginLeft: '0%', color: 'black' }} />
					</Typography>
					<ul className="para_color">
						<li>Take an MMTS from Secunderabad Railway Station to Lingampally Railway Station.</li>
						<li>Take a bus from Lingampally Railway Station to Lingampally Bus stand.</li>
						<li>Take a bus to Patancheru Bus stand.</li>
						<li>Take a bus to Sangareddy Town and you will find the sign board of IITH on Right side.</li>
					</ul>
				</div>
			</div>{' '}
			<p>
				<br />
			</p>
			<p>
				<br />
				<br />
			</p>
			<Footer className="homepage" />{' '}
		</div>
	)
}
export const Staying = () => (
	<div className="reachuspage">
		<BackgroundChanger backgroundColor="#f0f0f0" />
		<div className="recruit_1">
			<h1 className=" ">
				<center>Stay near IITH</center>
			</h1>
		</div>
		<div className="howtoreach_card">
			<Typography variant="h5" style={{ fontSize: '1.5em', color: 'black', padding: '0%' }} component="h2">
				<center>Area: SANGAREDDY</center>
				<hr style={{ width: '150px', border: '1px solid black', color: 'black' }} />
			</Typography>
			<ul className="para_color">
				<li>
					Hotel Redla’s Inn, Manjeera Nagar, Main Road, Above Reliance Fresh, Sangareddy-502 001. (approx.
					distance from Institute: 5km)
					<br />
					Phone No: 08455 – 277700, 277701 &amp; 277702
					<br />
					Mobile: 76600 22027, 76600 22026
					<br />
					Email: bookings@redlas.in, gm@redlas.in, www.redlas.in
				</li>
				<li>
					Manjeera Hotel, Opp. Rural Police Station, Sangareddy X Road, Sangareddy – 502 2001. (Approximate
					distance from institute: 3.5 Kms)
					<br />
					Ph. No. 99488 82222, 98480 88122, 08455 272666
				</li>
				<li>
					Sri Sai Krishna Lodge, Above Janapriya Hotel, Sangareddy Junction, Sangareddy – 502 001 .
					(Approximate distance from institute: 3.5 Kms)
					<br />
					Mobile: 77027 47730, 90527 67606
				</li>
			</ul>
		</div>
		<div className="howtoreach_card1">
			<Typography variant="h5" style={{ fontSize: '1.5em', color: 'black', padding: '0%' }} component="h2">
				<center>Area: ISNAPUR</center>
				<hr style={{ width: '150px', border: '1px solid black', color: 'black' }} />
			</Typography>
			<ul className="para_color">
				<li>
					Hotel Squar Inn # 2-55, Squar Inn Building, Isnapur X Roads, Patancheru (M), Medak Dist., Telangana
					– 502 307. (Approximate distance from institute: 15 Kms)
					<br />
					Phone No: 08455 225567, 9493 42 5555
				</li>
				<li>
					Hotel Pankaj Palace, Ratan Towers #8-48, Muthangi (V) Patancheru (M), NH-9, Road Medak Dist.,
					Telangana – 502 307. (Approximate distance from institute: 15 Kms) Isnapur
					<br />
					Ph. No. 08455 225033, 93939 66033
				</li>
				<li>
					Sri Sai Krishna Lodge, Above Janapriya Hotel, Sangareddy Junction, Sangareddy – 502 001 .
					(Approximate distance from institute: 3.5 Kms)
					<br />
					Mobile: 77027 47730, 90527 67606
				</li>
			</ul>
		</div>{' '}
		<Footer />{' '}
	</div>
)

export const GMap = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className="recruit background_change">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="firstpage">
				<div className="recruit_1" style={{ paddingTop: '10vh' }}>
					<h1 className=" ">
						<center>Where is IITH?</center>
					</h1>
					<Typography variant="h4" style={{ color: '#f0f0f0' }}>
						<center>Find us on Google Maps</center>
					</Typography>
				</div>
				<div className="tryingforbg">
					<div>
						<center data-aos="fade-up" className="firstpage_card firstpage_card2">
							<iframe
								title="map"
								src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3803.16909870289!2d78.12091135098586!3d17.594703287895523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcbf74d7593e7b7%3A0x96e0ba6acb5ca6e8!2sAcademic+Block+A%2C+IITH!5e0!3m2!1sen!2sin!4v1520257239564"
								allowfullscreen=""
								style={{ width: '100%', height: '400px', frameborder: '0px' }}
								className="googlemap"
							></iframe>
						</center>{' '}
					</div>
				</div>
				<br />
			</div>{' '}
			<p>
				<br />
			</p>
			<p>
				<br />
			</p>
			<Footer />{' '}
		</div>
	)
}
