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
					Students were expected to perform well in at least three sections to get shortlisted for the next
					round. (CGPA criteria was also considered as an evaluation section along with the other 5 units in
					the screening test). Interview round: I had two rounds of interviews. It was an interactive session
					conducted on CodePair-Hackerrank.The interview started with a formal introduction and was mainly
					based on DS & Algorithm concepts and their application. For both the interview rounds, the
					interviewer asked me to code my approach to the problem and discussed the optimizations, which can
					be applied to improve the performance(space and time).{''}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Since almost every company initially evaluates you on your coding aptitude as a part of the
					screening tests, It is crucial to have your basics strong and have a regular coding practice to
					provide an error-free code within time limits. Practicing timed virtual coding on platforms such as
					InterviewBit and LeetCode might help you familiarise yourself with competitive programming. Having a
					basic knowledge of CS fundamentals like OOPs, OS, and Math topics such as probability/statistics
					also helps. For the interview round, be familiar and thorough with the details and projects
					mentioned in your resume as they can be discussed in depth.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started the preparation a bit late, so I suggest starting as early as possible. The more you
					practice, the more confident you will be. For coding practice, I mainly used InterviewBit and
					Hackerrank.InterviewBit provides virtual time based coding practice with topic wise questions and
					includes questions asked by various companies in past screening tests. This provides a fair idea of
					what sort of questions you can expect. For other theoretical CS/Math topics like OOPs, OS,
					probability, etc. GeeksForGeeks topic-wise quizzes helped a lot to prepare. The only challenge I
					faced was I undermined myself, which resulted in stress and elevated anxiety on my part, so my
					advice is don’t lose confidence in yourself and don’t let anything demotivate you throughout the
					process.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					I think the key is to stay calm and focused throughout the selection process. For the screening
					tests, don’t dwell on a particular question for long; try to complete the problems you are sure
					about, and if time permits, you can try the remaining ones. For the interviews, be calm and
					confident. If you get stuck on any question, don’t hesitate to ask for help. The interviewer is more
					interested in knowing your approach than the right answer. So, involve the interviewer in your
					approach, and he can guide you if you get stuck. Stay confident and believe in yourself!! Best of
					Luck!!{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Manya Goel&nbsp; | &nbsp;Goldman Sachs&nbsp; | &nbsp;CSE</Typography>
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
				Screening test: It was conducted on the Hackerrank platform. It consisted of 5 sections: Two coding
				sections, One quant(Aptitude) MCQ Section, One related to Computer Science core fundamentals (MCQs) like
				data structures, OOPs, OS, etc., and the last section to evaluate behavioral analysis (Essay).
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
