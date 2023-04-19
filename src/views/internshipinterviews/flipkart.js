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
					Round-2: Technical Interview This was a virtual technical interview that was conducted on Aspiring
					Minds- Smartmeet Platform. In this round, they tested my Data-structure and algorithm skills. They
					gave me 2 coding questions to solve and I was provided an online editor to write pseudocodes.
					Questions were: Given a bag of words, check a given sentence that can be formed using bag of words.
					https://www.geeksforgeeks.org/split-a-circular-linked-list-into-two-halves/ I was asked to explain
					the solution, Time-complexity and write Pseudocode. This round lasted for 50 mins. Round-3:
					Technical Interview This interview was also conducted on the same platform. But this time there were
					3 interviewers. They started directly with coding questions. Questions were:
					https://www.geeksforgeeks.org/boundary-traversal-of-binary-tree/ Based on Topological
					sorting/DFS/BFS Based on BFS/DFS I was expected to explain the logic of my solution and write a
					pseudocode. This round lasted to 60 mins. Round-4: HR Interview I was interviewed by a Manager. He
					was so friendly and interactive. This round started with my introduction and followed by a few
					questions like: Why you Choose IITH and MNC. Share one of your proudest achievements Why you are
					interested in Flipkart What are other activities you do apart from academics? He asked about my
					interests , Strengths, weaknesses,... Apart from these many other questions were also asked.
					Finally, he asked me if there was any question. I asked him about work that interns gonna get and
					similar questions.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Practice more Problems for coding questions. Learn and Practice from geekforgeeks,hackerranker, and
					participate contests from codeforces. Be perfect with concepts in Data-structures and Algorithms and
					Standard questions(see Previous Interview questions in gfg).{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I used to do questions from hackerranker(to improve data-structures and algorithms skills) . 2
					months before the intern hiring process got started, I started practicing previous interview
					questions from gfg and leetcode.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Practice coding (be in touch with coding) Start preparing at least 2 before In interviews, if you
					don’t get idea ask the interviewer for hints. Be confident in interviews and keep a clear
					understanding of your projects Don’t panic if you are not shortlisted (sometimes luck also matters)
					be calm and always try to give your best.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> P. JAYANTH&nbsp; | &nbsp;Flipkart&nbsp; | &nbsp;MA</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: SDE
				<br />
				Duration: 2 months
				<br />
				Stipend: 50,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round-1: Online Test This was an Online Coding test on Aspiring Minds- AMCAT Platform. We were given 3
				Questions to solve in 90 mins. The Coding questions were Application of DFS/BFS Similar to this:
				https://leetcode.com/problems/minimum-number-of-refueling-stops/ Manipulation with Strings and
				Characters Answers were tested with Hidden test cases.
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
