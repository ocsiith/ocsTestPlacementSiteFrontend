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
					There was an aptitude section (25 min), a coding section with 2 easy-medium questions(30 min), a
					coding section with one hard question (45 min), a section for computer concepts like DSA, pointers,
					OOPS, OS, Computer architecture and there were questions with code snippets asking for output (20
					min), the last section was essay questions (15 min). All sections had a time limit of their own.
					Interview Round-1: The questions for me were mostly involving mathematical concepts especially
					Probability and Probability models. They asked questions related to the Maths courses that I
					mentioned on my CV. Try thinking out loud while solving. Interview Round-2: In this round also they
					asked me mathematical questions related to probability and linear algebra.{''}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Start coding(CP) a couple of months before the exams. Try timing yourself while doing CP towards the
					end. Even if you didn’t start early, just try solving archives on GFG or the Interview Preparation
					kit on Hackerrank a week or two before the exams.Try learning CS concepts like OS, Computer
					Architecture, Data Structures, OOPS. Try learning at least the basics of the above concepts. Be
					thorough with the courses (especially Mathematics courses) that you mentioned in your CV. It would
					be useful to know about topics like linear regressions and mathematics behind ML and probability
					models though it might not be necessary. If you don’t know any concepts, tell them that. As a
					practice for coding rounds, try implementing concepts you learnt in DSA. Especially DFS and BFS and
					look at what kind of problems they can be used. DP is also important. For interviews, it would be
					useful to know the working behind a program you write, like the kind of memory allocation, time
					complexity.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					For Computer Theory, knowing the corresponding courses at IITH is more than enough. Use platforms
					like Hackerrank, Leetcode for practice. Go through GFG for DSA and go through their previous
					archives for different companies. Try brushing up concepts of your courses(Mathematics).{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Make sure that you can implement your approaches for a problem quickly. Implementation is just as
					important as the solution. It’s not always possible to get the complete solution in the exam itself.
					Try as many problems as possible so that you can use those approaches for given questions. Be quick
					in aptitude rounds. Be confident in the interviews. And think out loud while solving problems. Tell
					them if you don’t know any concepts and make sure to let them know that you are willing to learn
					those.{' '}
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
					Devi Aishwarya Pendyala&nbsp; | &nbsp;Goldman Sachs&nbsp; | &nbsp;ES
				</Typography>
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
				There were three rounds, one online screening round and two interviews. Screening: The exam had 5
				sections, you had to pass the cut-off for at least 3 sections(CGPA is also a criteria) to get
				shortlisted for the interviews.{readMore && extraContent}
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
