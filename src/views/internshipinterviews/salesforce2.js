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
					Technical Interview Rounds: Google meet with codepair link on Hackerrank Round 1: One question
					involving a Matrix and some constraints. It was of medium level. This was followed by basic
					discussion on OOPS. Round 2: This round had only 1 coding question. Given a Start word, an End word
					and a list of words, I had to print the shortest length transformation sequence from start to end
					word by modifying only a single letter at a time. Round 3: A coding question was asked and some HR
					questions. The coding question involved traversing a chessboard with a knight and a given starting
					square.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					For the online round, it will be useful to practice contests in Codeforces or Codechef to get used
					to solving problems under time constraints. For interviews be thorough with basic Data Structures
					such as Linked Lists, Stacks, Queues and Trees. Also focus on Recursion, Backtracking and Dynamic
					Programing which are frequently asked in interviews.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					For the online coding rounds, I practiced from Codeforces. Participating in the contests helped me
					to stay calm with the timer running. For the interview preparation I majorly used GeeksforGeeks. It
					is an excellent resource which covers almost everything one needs to know. For practicing questions
					which are frequently asked in interviews, Leetcode is a useful resource.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					For the online round try to clear as many test cases as possible. Try to at least first frame a
					brute force solution which will clear a few test cases if you are unable to come up with an optimal
					solution with the given constraints. Listen to the interviewer carefully when he is explaining the
					question and clarify any ambiguities in the question immediately. Be confident during the interview,
					and first discuss the approach with the interviewer before proceeding to code. Talking out loud will
					help you as the interviewer can understand your approach better and can also give you hints in case
					you are wrong.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> J. Prabhath&nbsp; | &nbsp;Salesforce&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Intern Software Engineer
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				I had an online coding round, 3 Interview Rounds (2 coding, 1- Coding+HR) Online Round: Had 3 Coding
				questions and the time duration was 75 mins. It was on Hackerrank platform. The coding questions were of
				medium level.
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
