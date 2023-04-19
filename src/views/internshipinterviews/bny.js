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
					Round 2: This was on Hackerrank codepair, the interviewer gave me one hard question on graphs and
					then he asked a few questions on CS fundamentals like encryption, OOPS and Networks, since I was
					from EE, he was just asking me basic questions, then he asked me a few questions from my resume.
					After this I was selected for the HR round. Round 3: This round was focused mostly on behavioural
					questions, He asked me to introduce myself and asked questions on my resume. Some of the other
					questions were, What do you know about BNY Mellon? Where do you see yourself in 5 years? A situation
					where you exceeded your expectations. A situation where you had to influence someone.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Start practicing CP as early as possible, solve challenges on codeforces and codechef to get an
					experience of the real test, as you are close to the tests start practicing from Geeks for Geeks
					must do questions, also have a look at the recent interview experiences at gfg.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started my prep in the summer break, but it&#39;s always better to start early, I was doing mostly
					geeksforgeeks and participating in challenges on codeforces.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Be thorough with DSA and practice as much as you can, have a decent project on your resume and be
					ready to answer every technical question from your resume. In the interview it&#39;s not always
					about completely solving the questions, even if you are partially able to get to the optimal
					solution, you might get selected. It&#39;s all about conveying your ideas to the interviewer.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4">
					{' '}
					Shaik Abdur Rahman Nawaz&nbsp; | &nbsp;BNY Mellon Technology&nbsp; | &nbsp;EE
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Developer Intern
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: This was an online round conducted on Hackerrank, had a total of 4 questions 1 easy, 2 medium
				and 1 hard. I was able to solve the first three and almost half of the third one and was selected for
				the next round.{readMore && extraContent}
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
