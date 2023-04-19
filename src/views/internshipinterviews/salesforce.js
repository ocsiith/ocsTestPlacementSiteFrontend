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
					Technical Interview 1 - It was a hackerrank codepair round, started with a brief introduction about
					myself and some of my projects and interests. 3 problems were asked on codepair 1 on greedy and 2 on
					string manipulation. Questions were of moderate difficulty and I was able to solve all 3. First you
					have to explain your approach and then you will be asked to code. Solution should be optimized for
					space and time. Immediately after this round, I got a call that I am selected for next round.
					Technical Interview 2 - Started as a codepair round and 2 more problems were asked. The interviewer
					didn’t care much if the code worked, and was more interested in the thinking process. Then questions
					on OOPS and a programming language of my choice were asked. Since I was from EE background, he
					didn’t go too deep in CS Fundamentals. Some personal questions like where do you see yourself in 5
					years and tell me something interesting about yourself were asked. I was told I am selected for next
					round and will get an offer on the spot at the end of the third round. HR Interview - This round
					looked a mere formality. Personal questions on strengths and weaknesses were asked. Also situations
					related to working in teams were provided and some questions were asked. He also asked about my JEE
					preparation. Also he asked why being from EE background I was applying for a software engineering
					intern. He also asked if I was the topper in my batch, if no why? Finally 4 students were selected
					for the internship.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					The primary focus is on data structures and algorithms in each round. Be comfortable with
					programming fundamentals.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I used leetcode for coding rounds. I found problems on leetcode similar to what companies ask.
					Solving company archives on geeks for geeks also helped. I revised programming fundamentals by
					reading articles on geeks for geeks. Reading multiple past interview experiences will help you know
					what to expect.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Try to start your interviews confidently. Be prepared to answer personal questions upfront as most
					interviewers don’t jump to coding straight away. This will help you get comfortable and warmed up
					for the interview. Recruiters are generally friendly and helping. They try to get you to the right
					track if you deviate. Read the coding problem thoroughly and understand properly before trying to
					solve. You can cross check with the interviewer if you have any doubts. Just answer what is asked
					precisely and don’t try to unnecessarily add something from your side. Give honest answers if you
					are unprepared for something.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Aayush Goyal&nbsp; | &nbsp;Salesforce&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Intern Software Engineer
				<br />
				Stipend: INR 90,000 per Month
				<br />
				Duration: 2 Month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Online Test - 75 minute test on hackerrank consisting of 3 coding problems. 18 students were
				shortlisted.
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
