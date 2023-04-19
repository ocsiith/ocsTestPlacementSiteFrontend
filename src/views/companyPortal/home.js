import React from 'react'

import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { Divider, List, ListItem } from '@material-ui/core'

const Home = (props) => {
	return (
		<Fade in>
			<div>
				{/* <div style={{ margin: 15 }} />
				<Paper style={{ width: '100%', padding: 30 }}>
					<Typography variant="h5">Welcome {props.fetchedData.Name_of_the_company}</Typography>
				</Paper> */}
				{/* <div style={{ margin: 15 }} />
				<Paper style={{ width: '100%', padding: 30 }}>
					<Typography variant="h6">Dashboard</Typography>
				</Paper> */}
				<div style={{ margin: 15 }} />
				<div style={{ margin: 15 }} />
				<Paper style={{ width: '100%', padding: 30 }}>
					<Typography variant="h4">
						Welcome {props.fetchedData.Employer_Registration_Contacts_Contact_Person}
					</Typography>
					<p style={{ textAlign: 'right' }}>{props.fetchedData.Employer_Contact_Email}</p>
				</Paper>
				<div style={{ margin: 15 }} />
				{/* <Paper style={{ width: '100%', padding: 30 }}>
					{!props.fetchedData.student_co_od_email ? (
						<Typography variant="h6">Student Coordinator not yet alloted</Typography>
					) : (
						<React.Fragment>
							<Typography variant="h5">Student Coordinator Details</Typography>
							<p>Email: {props.fetchedData.student_co_od_email}</p>
							<p>Name: {props.fetchedData.student_co_od_name}</p>
							<p>Contact: {props.fetchedData.student_co_od_contact}</p>
						</React.Fragment>
					)}
				</Paper>
				<div style={{ margin: 15 }} /> */}
				<Paper style={{ width: '100%', padding: 15 }}>
					<Typography variant="body1" align="center" style={{ color: 'red' }}>
						Please checkout the{' '}
						<a target="_blank" rel="noreferer" href="/whyrecruit/howto">
							guide
						</a>{' '}
						whenever required
					</Typography>
					<Typography variant="body1" align="center" style={{ margin: "30px 0px", fontWeight: "800" }}>
						Registrations for 1st phase of placement for the year 2022-2023 are open. All the listings
						created on or after 11th November 2022 will be considered for 2nd phase of placements which will
						be starting in January 2023. Please contact{' '}
						<a href="mailto:office.placement@iith.ac.in">
							office.placement@iith.ac.in
						</a>{' '}
						for more information.
					</Typography>
					<Typography variant="h6">Terminologies</Typography>
					<List>
						<ListItem>
							<div>
								<Typography variant="button">Profile</Typography>
								<List>
									<ListItem>
										If you are a hiring firm, hiring students for different companies, then create
										one profile per company.
									</ListItem>
									<ListItem>
										If you are a stand alone firm, create just one profile which represents your
										firm.
									</ListItem>
									<ListItem>
										Unless you create your company profile you cannot fill the job listings form.
									</ListItem>
								</List>
							</div>
						</ListItem>
						<ListItem>
							<div>
								<Typography variant="button">Job Listings</Typography>
								<List>
									<ListItem>These are the actual roles you’ll be hiring for</ListItem>
									<ListItem>You can create multiple job listing from a single profile</ListItem>
									<ListItem>
										Students will be able to register for each job posting separately
									</ListItem>
								</List>
							</div>
						</ListItem>
					</List>
					<div style={{ margin: 10 }} />
					<Divider />
					<div style={{ margin: 10 }} />
					<Typography variant="h6">6 Month Internships</Typography>
					<List>
						<ListItem>
							IIT-Hyderabad has started Semester internships (6 Months : January - June) for B.Tech
							students from last year.
						</ListItem>
						<ListItem>You can create a job listing to post a 6 Month internship opportunity</ListItem>
					</List>
					<div style={{ margin: 10 }} />
					<Divider />
					<div style={{ margin: 10 }} />
					<Typography variant="h6">Student Registrations for Placements</Typography>
					<List>
						<ListItem>Students Registrations for Placements will start from 15th September 2021.</ListItem>
					</List>
				</Paper>
				<div style={{ display: 'none' }}>
					<p>Establishment_Date: {props.fetchedData.Establishment_Date}</p>
					<p>Type_of_Organization: {props.fetchedData.Type_of_Organization}</p>
					<p>Nature_of_Business: {props.fetchedData.Nature_of_Business}</p>
					<p>Employer_Permanent_Address_Line1: {props.fetchedData.Employer_Permanent_Address_Line1}</p>
					<p>Employer_Permanent_Address_Line2: {props.fetchedData.Employer_Permanent_Address_Line2}</p>
					<p>PinCode_Permanent: {props.fetchedData.PinCode_Permanent}</p>
					<p>Country_Permanent: {props.fetchedData.Country_Permanent}</p>
					<p>State_Permanent: {props.fetchedData.State_Permanent}</p>
					<p>Website: {props.fetchedData.Website}</p>
					<p>
						Employer_Registration_Contacts_Contact_Person:{' '}
						{props.fetchedData.Employer_Registration_Contacts_Contact_Person}
					</p>
					<p>
						Employer_Registration_Contacts_Designation:{' '}
						{props.fetchedData.Employer_Registration_Contacts_Designation}
					</p>
					<p>
						Employer_Correspondence_Address_Line1: {props.fetchedData.Employer_Correspondence_Address_Line1}
					</p>
					<p>
						Employer_Correspondence_Address_Line2: {props.fetchedData.Employer_Correspondence_Address_Line2}
					</p>
					<p>PinCode_Correspondence: {props.fetchedData.PinCode_Correspondence}</p>
					<p>Country_Correspondence: {props.fetchedData.Country_Correspondence}</p>
					<p>State_Correspondence: {props.fetchedData.State_Correspondence}</p>
					<p>Employer_Contact_Phone: {props.fetchedData.Employer_Contact_Phone}</p>
					<p>Employer_Contact_Mobile: {props.fetchedData.Employer_Contact_Mobile}</p>
					<p>Employer_Contact_Email: {props.fetchedData.Employer_Contact_Email}</p>
				</div>
			</div>
		</Fade>
	)
}

export default Home
