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
					Make sure you are firm with Mathematical Concepts like P&C and Probability and confident with CS
					core fundamentals like Data Structures, Algorithms, Operation Systems, OOPS, and a little
					understanding about Databases. Interviews: 1st Round: Questions on Arrays, Strings, and Time
					Complexity. 2nd Round: Questions on Data Structures, Algorithms, and Sorting. 3rd Round and HR
					Round: Different methods on solving a given Problem Statement. Questions like Why did you select
					Oracle? Why should we hire you? What are your plans after Engineering? And similar general
					questions… Make sure you are confident about the Projects you have done and the ones written on
					Resume. Better to revise before the Interviews. Try to have Mock Interviews with your friend if
					possible (really helps).{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Practice CP from platforms like geeksforgeeks, leetcode, codeforces. Experiences, previously asked
					questions from gfg helps a lot. Especially for dynamic programming, there is a problem set in cses
					which is good for practice. Thoroughly revise the projects that you mention in the resume. Also do
					not neglect cs core courses like computer architecture, operating systems and oop concepts etc. It
					is better if you start revising them even before exams as you can expect some questions in the exams
					too. Be well prepared about each and every point that you mention in the resume.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					Preparation for Interviews: No special preparation is required for Interviews. Just revise your
					Projects. Interviews mostly depend on Luck. The interviewer will be judging you based on your
					answers, which rely on his questions. So, there is nothing much left to us except to answer the
					question with maximum efforts. Preparation Material: Data Structures and Algorithms play an
					important role in only play a role in every round of Internship Selection. No amount of extra skills
					(Web/App Development or ML) are going to help you. Resources: GeeksforGeeks, LeetCode, InterviewBit
					If you have a little coding experience and are not familiar with DS and Algo, you need to start at
					least two months before the Internship Selection (on an average). You should be strong and Fast in
					Mathematics. You need to practice a lot as you need to think fast and correct while solving a
					question. Try to avoid committing a mistake on the problem which you already solved. Make sure you
					are confident and strong of Data Structures before you proceed to Advanced Data Structures. Be
					perfect on Standard Algorithms. Practice Problems as much as possible and get good exposure to
					questions of different sorts. While practicing, try to select questions slightly above your current
					standard. Do not waste much time on a problem. Try to formulate the Algorithm in less than 20 mins.
					Try to implement it as fast as possible. Use Editorials if Stuck. If demotivated while practicing,
					try to solve the questions (4-5) below your standards to regain your confidence and then try
					proceeding. Try to Enjoy Coding rather than feeling it as a Work. There is a lot of fun in it.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Try to be confident (I know it sounds INSANE). Loss of Confidence or feeling Panic will lead to
					adverse effects which you regret later.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> : Krishna Srikar Durbha&nbsp; | &nbsp;ORACLE&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Application Development
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Online Test: The test consists of nearly 80-100 questions with 2 hours divided into four sections, with
				each section having a time limit. Aptitude, Communication (English), Technical and Coding Sections.{' '}
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
