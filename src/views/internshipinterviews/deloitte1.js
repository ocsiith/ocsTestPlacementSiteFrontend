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
					Round 2: Online Interview (technical, panel strength - 2, duration 15 mins). This round started with
					a basic introduction. They asked about my interests (in technology) and the topics in which I am
					confident. They asked about the topic that I was interested in and gave me a scenario, and asked for
					a solution. Round 3: This round was a mix of technical and HR. The interviewer asked about my
					general interests and then asked me about the projects that I had done. He gave a situation and
					asked how my project can be modified to be of use in the given case. The general strengths and
					weaknesses are, what I would change about myself and what my friends’ views are for me. The
					interview ended with if I had any questions for him.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Specifically for general aptitude test, solving some mock tests should be enough to be familiar with
					the kind of questions that will be asked (inductive, deductive, numerical, verbal reasoning, data
					interpretation, and English language). In the interview rounds, the general idea is that the
					interviewer just wants you to convey your idea, concept, but not exactly solve it. Having a few
					decent projects will be good (so you can drift the conversation towards the things you’re interested
					in). And have good technical knowledge (or in detail) of the projects that you would mention.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started my preparations just when the internship process began, but I’d suggest starting earlier.
					I was just doing the regular geeksforgeeks and coding challenges on codeforces, codechef.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Have a good understanding of DSA and practice (most of the companies have a coding round). Have a
					decent project on your resume (it can be self projects) and be thorough with your project’s
					technical things. As I mentioned earlier, not getting a solution isn’t essential, so conveying your
					ideas and your approach may get you selected. Also, keeping your cgpa more than 8 helps (many
					companies have that criteria).{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Kartikeya Jaiswal&nbsp; | &nbsp;Deloitte&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Analyst (Deloitte Applications Studio)
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: This was an online test. The general aptitude test consisted of Logical reasoning and the
				English language.{readMore && extraContent}
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
