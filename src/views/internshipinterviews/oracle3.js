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
					It also had questions related to debugging and guessing the output by analysing a logical structure.
					Interview: There were 2 rounds. In the first round, I was asked to write code to generate the
					Fibonacci sequence and to merge two sorted linked lists. The second round was a combination of
					resume-based questions and a DSA question. I was asked a basic question on Binary Search. Then, I
					was asked about my favorite project (problems faced and how I tackled them, the basic workflow of
					the project, etc.), my hobbies and my team working skills.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Focus mostly on problem solving (DSA). If you have enough time like 3-4 months take part in coding
					contests (this will help in handling the edge cases, improving speed, optimising the code), apart
					from practising. If you have a limited amount of time like 1 month or less, focus on topic-wise
					problem solving and take part in contests only if you have time. You can use GeeksForGeeks for
					practice and CodeForces/LeetCode to take part in contests. Try to avoid Long challenges, focus only
					on short contests. The most important topics for the online round (not limited to a specific
					company) are Dynamic Programming, Greedy paradigm, Graph algos, String algos, Binary Search, Hashing
					and data structures like stack, queue, heap, disjoint set. In addition to these, the interview
					rounds consist of BST and linked list-based questions. Don’t go for advanced topics like segment
					trees, BIT, etc. if you don’t have time. Also, you need to have a good understanding of your
					favorite programming language, like the OOP concepts it uses, exception handling, memory management,
					etc. Prepare well about the projects that you have mentioned in your resume.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I took an academic course on Coursera for learning Algorithms, offered by Stanford. I used
					GeeksForGeeks for practice, as it has multiple filters based on topics, companies and difficulty
					level. Along with practising, I took part in a few CodeForces and LeetCode contests (both live and
					virtual).{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Be calm and confident. Don’t over-prepare before your interview, as it may cause fatigue. Tell your
					thought process to the interviewer and start coding only when the interviewer is satisfied with your
					approach. If you get stuck in your interview look for the clues given by the interviewer, or you can
					ask the interviewer for a hint. The interviewer of any company would usually be very cool and eager
					to help.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Shaik Mastan Vali&nbsp; | &nbsp;ORACLE&nbsp; | &nbsp;EE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Server Technology intern
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Online test: It was an MCQ type of test which had questions based on OOPs concepts,Data Structures (the
				focus was mostly on trees) and basic English grammar.{readMore && extraContent}
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
