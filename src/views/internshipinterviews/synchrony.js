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
					Round 2: It was an interview for about 20-30 min. The interviewer was quite friendly. He asked some
					basic coding questions. And then he asked about my project: the challenges I faced,the methods I
					used etc. Finally,I got the chance to ask him a question. I asked about the company's type of work,
					working environment. Round 3 (HR Interview): Selected interns are called for this round. The HR
					asked some personal questions and even I got to ask some questions.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Round 1: Basic questions from Java & Python were asked. I prepared from YouTube tutorials and
					geeksforgeeks. Round 2: Go through your project once as you can expect any type of questions
					regarding the same. The coding questions were easy,a little brush up would do the trick. Round 3: Be
					yourself.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Be confident in what you say. Don't feel nervous if you're doubtful or don't know the answer. The
					interviewer will help you to the answer many times. Also be humble. In my case, I didn't try to
					boast myself as an expert in Java/Python and the interviewer seemed to like that. Good luck.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Varada Naveen&nbsp; | &nbsp;Synchrony&nbsp; | &nbsp;ME</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Semester Intern(6 months)
				<br />
				Stipend: 35,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: This was an online assessment exam monitored through WebEx in the background. The questions are
				about Java & Python. Selected candidates are invited for the next round
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
