import React from 'react'
import Typography from '@material-ui/core/Typography'
import placementbrochure from '../../static/pdfs/Placement_Brochure_2022-23.pdf'
import internshipbrochure from '../../static/pdfs/Internship-Brochure.pdf'
import { FaPhoneAlt } from 'react-icons/fa'
import { GrMail } from 'react-icons/gr'
import { FaFacebookF } from 'react-icons/fa'
import { FaTwitter } from 'react-icons/fa'
import { FaLinkedinIn } from 'react-icons/fa'

const Footer = () => {
	return (
		<div className="welcome_last homepage">
			<Typography variant="h3" style={{ letterSpacing: '0.1em' }} component="h2">
				<center></center>
			</Typography>
			<br />
			<div className="welcome_last_grid1">
				<div style={{ backgroundColor: '#002a47', borderRadius: '15px', padding: '5%' }}>
					<Typography variant="h4" component="h2">
						Contact At
						<hr className="hr10" />
					</Typography>
					<Typography component="p" style={{ color: '#f0f0f0', lineHeight: '1.7em', fontSize: '0.90em' }}>
						Office of Career Services (OCS),
						<br />
						Indian Institute of Technology, Hyderabad, Telangana,
						<br /> India-502285.
						<br />
						<a href="mailto:office.placement@iith.ac.in" style={{ color: '#f0f0f0' }}>
							<GrMail className="reacticon" /> &nbsp;office.placement@iith.ac.in
						</a>
						<br />
						<a href="mailto:internships@iith.ac.in" style={{ color: '#f0f0f0' }}>
							<GrMail className="reacticon" /> &nbsp;internships@iith.ac.in
						</a>
						<br />
						<a href="tel:04023016810" style={{ color: '#f0f0f0' }}>
							<FaPhoneAlt className="reacticon" /> &nbsp;040 2301 6810
						</a>
						<br />{' '}
						<a href="tel:04023017066" style={{ color: '#f0f0f0' }}>
							<FaPhoneAlt className="reacticon" /> &nbsp;040 2301 7066
						</a>
					</Typography>
				</div>
				<div style={{ backgroundColor: '#002a47', borderRadius: '15px', padding: '5%' }}>
					<Typography variant="h4" component="h2">
						Quick Links
						<hr className="hr10" />
					</Typography>

					<Typography component="p" style={{ color: '#f0f0f0', lineHeight: '1.7em', fontSize: '0.90em' }}>
						<a
							href="/login/company/register"
							target="blank"
							className="tounderline"
							style={{ color: '#f0f0f0' }}
						>
							Placement Registration link
						</a>
						<br />
						<a href={placementbrochure} target="blank" className="tounderline" style={{ color: '#f0f0f0' }}>
							Placement Brochure
						</a>
						{/* <p style={{ color: 'gray', marginBottom: '-30px', marginTop: '-2px' }}>
							Placement Brochure (will be available shortly)
						</p> */}
						<br />
						<a
							href={internshipbrochure}
							target="blank"
							className="tounderline"
							style={{ color: '#f0f0f0' }}
						>
							Intern Brochure
						</a>
						<br />
						<a href="/about/team" className="tounderline" style={{ color: '#f0f0f0' }}>
							Meet our Team
						</a>
						<br />
					</Typography>
				</div>
				<div style={{ backgroundColor: '#002a47', borderRadius: '15px', padding: '5%' }}>
					<Typography variant="h4" component="h2">
						External Links
						<hr className="hr10" />
					</Typography>

					<Typography component="p" style={{ color: '#f0f0f0', lineHeight: '1.7em', fontSize: '0.90em' }}>
						<a
							href="https://www.iith.ac.in"
							target="blank"
							className="tounderline"
							style={{ color: '#f0f0f0' }}
						>
							IIT Hyderabad
						</a>
						<br />
						<a
							href="http://gymkhana.iith.ac.in"
							target="blank"
							className="tounderline"
							style={{ color: '#f0f0f0' }}
						>
							Student Gymkhana
						</a>
						<br />
					</Typography>
				</div>
			</div>
			<br />
			<div style={{ display: 'none' }}>
				<center>
					<FaFacebookF className="homepage_icons" />
					<FaLinkedinIn className="homepage_icons" />
					<FaTwitter className="homepage_icons" />
				</center>
			</div>
			{/*<center>
					<div className="welcome_last_grid">
						<Card
							className="welcome_last_eachbox"
							variant="contained"
							style={{ backgroundColor: '#002e4d', color: 'white' }}
						>
							<CardContent>
								<img src={ravipic} className="contactus_image" alt="" />
								<Typography variant="h5" component="h2">
									Dr. Pradeep Kumar Yemula
								</Typography>

								<Typography variant="h6" component="p" style={{ color: '#f0f0f0' }}>
									Faculty-In-Charge
								</Typography>
							</CardContent>
							<CardActions style={{ float: 'right', paddingRight: '5%' }}>
								<Button variant="default" size="small" href="mailto:ypradeep@iith.ac.in">
									Email
								</Button>
							</CardActions>
						</Card>

					<br />
				</center>*/}
		</div>
	)
}

export default Footer
