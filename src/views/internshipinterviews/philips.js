import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const Jaguar = () => {
	const [readMore, setReadMore] = useState(false)

	const extraContent = (
		<div>
			<Typography paragraph>
				<br /> <Divider />
				<Typography paragraph>
					Round 2(50 minutes): This was a technical interview round started with a brief introduction of
					myself..The interviewer started with the projects mentioned in the resume and asked me to explain in
					depth.The interview was moreover like a healthy discussion and asked me in detail the
					challenges,limitations and insights regarding the project. Then he asked some questions from Stereo
					vision and estimating depth from monocular cameras. Finally he touched upon some fundamental
					questions on training neural networks. Round 3 This was a very casual HR round where interviewer
					asked typical HR questions like challenging situations ,how I overcame them etc.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					For the technical interview, preparing the theoretical part and the implementation details of
					projects you have worked on,would be sufficient.Also be familiar with the common loss
					functions,popular backbone networks, which model to choose for speed vs Accuracy preferences,etc.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I was mostly preparing from medium articles and similar blogs.Analytics Vidhya is one of the best
					resources which I found to be very helpful during my preparation .Prepare according to the Job
					Description and be familiar with the latest papers and methods in your research area.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Be very confident about the projects mentioned on the resume.Always try to be very honest and clear
					with the interviewer.Everyone gets stuck at some point during the interview, but by establishing a
					good communication and conveying your approach with him is more important and helps in clearing the
					interview.
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Abhijith Girin N V&nbsp; | &nbsp;PHILIPS &nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Research Intern-Computer Vision
				<br />
				Time period of internship: 6 months
				<br />
				Stipend: 45,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: An online screening test was conducted on Mettl platform,comprised of three sections,
				Aptitude,Image Processing and Machine Learning.
				{readMore && extraContent}
				<span
					className="read-more-link"
					onClick={() => {
						setReadMore(!readMore)
					}}
				>
					{linkName}
				</span>
			</Typography>
		</div>
	)
}
export default Jaguar
