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
					Second Round - Online Interview. Panel Strength: 4-5. Duration 20-25 min. It started with them
					asking my introduction and then followed by the projects I had done. They seemed to be curious about
					my projects and ended up asking about the same for the rest of the interview, until they finally ran
					out of the slot time. However, some of my peers were asked to speak on a given topic for one minute
					in this round. Third Round - This was more of an HR round. Started with general chit-chat, then the
					Interviewer asked me why he should choose me amongst all others. In the end he asked me if I had any
					questions for him. (It was the most informal HR round that I faced in during the internship season).{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					For the general aptitude test, I would suggest to go through a few logical reasoning practice tests
					beforehand. Most importantly, make sure that you know what kind of questions you can expect in a
					reasoning test; for example data interpretation, inductive and deductive reasoning….etc( A
					calculator might come handy during the test, if allowed) For the interview rounds, you’d want to
					have a few projects in your backpack (self projects would be good enough too). Try including a few
					catchy points in your introduction script (yeah, start preparing one if you haven’t already) that
					they can probe to; for example you might want to mention your area of interest and any relevant
					work. This way you can easily take control of the conversation and drive it towards topics you are
					confident about.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started a month before the first company arrived, but honestly, I would suggest starting earlier.
					I used online platforms, the same old - Geeks for Geeks, Leetcode, Interviewbit (mock interview on
					this one is a great tool). If you are the early bird, you can follow a book for algorithms and data
					structures, so as to learn these concepts in a more structured manner. Apart from DSA, it would be
					helpful to brush up some basic maths (probability, combinatorics, linear algebra) I had only had a
					little experience of competitive programming beforehand; that brought me a lot of rejections.
					Luckily, I had a few self projects that I just did for fun and they did me some good. If you’re
					sailing on the same boat and you have less time before companies arrive, it’d be good to be
					specific. In the end I would just say that you may face a lot of hardships (I hope you don’t);
					discuss with your seniors and seek their advice; be confident, be yourself. Good Luck!!.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Ritwik Sahani&nbsp; | &nbsp;Deloitte&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Analyst-Deloitte Application Studios
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				First Round - Online test. It was a general aptitude test; consisted of questions from Logical reasoning
				and English language.{readMore && extraContent}
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
