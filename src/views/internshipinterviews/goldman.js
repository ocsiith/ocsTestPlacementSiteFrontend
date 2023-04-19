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
					I had three rounds of interviews. All of them were based on DS & Algorithms concepts.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					The most important thing would be to be familiar with coding at a good speed. Also having basic
					knowledge of CS Concepts like OOPS, etc helps.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					Geeks for geeks and InterviewBit give you a fair idea of what sort of questions you can expect.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					I think the most important thing would be not to bluff either on your resume or during the
					interview. If you get stuck trying to solve a question during the interview, go ahead and ask for
					help. Most importantly don’t let yourself be demotivated at any point of time during the entire
					internship selection process.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Adyasa Mohanty&nbsp; | &nbsp;GOLDMAN SACHS&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Summer Analyst
				<br />
				Duration: 10 weeks
				<br />
				Stipend: 100,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				The first round was conducted on Hackerrank. It was open to all the departments and the CGPA Cutoff was
				6.It consisted of 5 sections: Two coding sections, One quant/LR MCQ Section, One CS Core MCQ Section,
				One section with behavioral analysis Essay type questions. Students who performed well in any of the
				three sections(another section with CGPA was also used) were shortlisted.{readMore && extraContent}
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
