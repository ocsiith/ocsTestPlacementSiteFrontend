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
					Round 2 : Personal Interview It was a Hackerrank codepair round. There was one coding question on
					Dynamic Programming. I have explained the approach and then he asked me to code. I have written the
					code. He has evaluated code on different test cases. After that he asked me about my projects. He
					asked me about OOPS concepts and some basic OS concepts. Round 3 : Personal Interview It was again
					Hackerrank Codepair round. Interviewer asked me a question based on Linked List. I told him two
					approaches and then he asked me to write pseudo code for both approaches. After that he asked me in
					detail about OS concepts mainly deadlock, Mutex lock, Semaphores, Paging. He also asked various
					Cache Replacement Policies. After that he asked some algorithmic questions. You just need to tell
					him the approach. Round 4: HR Interview Total 2 students are selected for the internship.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					In all rounds, the primary focus on data structures and algorithms. You should be comfortable with
					OS and OOPS concepts.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					Do as many CP questions as you can. This is the only way to get shortlisted for companies. Try
					participating in codechef long challenges. I have solved some of the must do coding questions from
					geeks for geeks in the last week.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Try to do projects if you can whilst maintaining a decent CGPA. Write only those points in your
					resume, for which you have in depth knowledge. The most important thing is, be COOL !!!{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Shah Nisarg Pankaj&nbsp; | &nbsp;Arcesium&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Developer Intern
				<br />
				Duration: 6-8 Weeks
				<br />
				Stipend: 1 Lakh/month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1 (On Hackerrank) : Aptitude + CS Fundamentals + 2 Coding Questions.16 Students were selected for
				the next round of Interview.{readMore && extraContent}
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
