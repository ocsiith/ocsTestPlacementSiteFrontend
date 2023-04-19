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
					2nd round – Since my resume had the courses data analytics , random processes , matrix analysis the
					interviewer asked me questions based on those. For example , Eigen values and Eigen vectors of a
					given matrix, mean and variance of sum of two gaussians , expected number of throws to get two
					consecutive sixes, Which has less number of expected number of throws : throwing 6 6 or 6 5? 3rd
					round (HR)— The interviewer introduced herself and asked me to introduce myself. She then asked what
					I know about the profile I’m applying for and why I chose it? Our conversation led to the discussion
					about diversification of stocks, risk factors, etc. Then she asked me to explain 3-4 projects, she
					was interested in, on my resume briefly. She asked me about my work related to some PORs. Then she
					asked me a few puzzles and some probability questions. And finally she asked if I had any questions
					related to anything.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Most of the questions asked would be standard coding questions. Practice consistently and try to
					learn a new concept every alternate day. Start viewing gfg archives of companies 3 weeks before the
					exams start. Try to share questions with your friends and collectively learn more topics . Prepare
					even for the aptitude test from websites like geeksforgeeks.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started my preparation around the start of July. I used learncpp.com for reference. Most of my
					preparation was from the questions sent by my friends. Only DSA would be helpful for both technical
					round and interviews unless it a data science/AI/ML profile (DSA still required for the technical
					test) Websites like geeksforgeeks and leetcode would be very useful.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					For the technical test try to be as fast as you can. If you have an option of switching between
					different sections try to utilize the time of the difficult section for the easier ones. Use brute
					force or atleast if else statements to pass the visible test cases. For the interviews: The
					interviewer asks you to introduce yourself, tell something that isn’t mentioned in your resume. Show
					some excitement in the way you speak. Be positive when they ask how your day was . Being outspoken
					is definitely a plus point. Be as confident as you can and express your thought process to the
					interviewer. Most of the times your thought process matters more than the solution. If at any point
					of time you are struck somewhere don’t hesitate to ask the interviewer for hints or at least where
					you are going wrong. Last but highly effective : When you are asked if you have any questions, ask
					something unique depending on your conversation with the interviewer. The more cliché your question
					is the more likely they are to forget you. The more specific your question is more they are likely
					to remember you. Some examples of unique questions you could ask : What keeps you going in such a
					fast paced environment? What made you realize that “this” is the company? LUCK really matters. Not
					getting through doesn’t indicate everything about your talent. Don’t let these interviews demotivate
					you or doubt yourself. Be positive and keep trying!{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> C Shruti&nbsp; | &nbsp;Goldman Sachs&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Summer Analyst
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				1st round- Questions- How many times in a day do the hours hand and minutes hand of a clock coincide?
				There are 2 children. The first child is a girl. What is the probability that the second child is a girl
				too? https://www.geeksforgeeks.org/find-excel-column-name-given-number/
				https://www.geeksforgeeks.org/puzzle-9-find-the-fastest-3-horses/
				http://puzzles.nigelcoldwell.co.uk/twentytwo.html.{readMore && extraContent}
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
