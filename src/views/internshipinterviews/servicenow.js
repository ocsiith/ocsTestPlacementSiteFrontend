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
					Round 1: The technical test was conducted on hackerrank platform.It consisted of MCQs on basic
					computer science knowledge, java syntax ,DBMS and puzzles. One medium level coding question was also
					given. Round 2(40 mins) : The first round of technical interview started with a brief introduction
					of myself and a discussion on one of my projects. After asking a few questions based on my resume ,
					the interviewer gave one easy level coding question and asked me to explain my approach first and
					then write the code. The interviewer gave me hints to optimize my code. I was given another coding
					question of medium difficulty and asked to describe my approach without writing the code.This was
					the end of this round. Round 3(1 hr): The second round of technical interview also started with my
					introduction.I was asked questions based on oops concepts, DBMS.Since, I was not familiar with
					computer architecture,the interviewer didn't ask questions based on that topic. I was given three
					coding questions in this round. Two of easy level and one medium level. The interviewer focused on
					the time and space complexities of my approaches. Round 4 ( 40 mins ) : The HR round started with
					questions about my family and where I live. He asked a few puzzles and situational based questions
					like how would you react if this happens to you while working.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					You should be able to solve medium level coding questions.Practice competitive programming.For this
					job profile , CS concepts like OOPS, DBMS , computer architecture are required.Basic java knowledge
					is preferable.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I used geeksforgeeks and leetcode for my preparation. I started my preparation a few weeks before
					the coding tests started. Being short in time, I practiced top interview coding questions on
					leetcode and geeksforgeeks.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Start your preparation as early as possible . Be honest with the interviewer. If you say you don't
					know any topic ,the interviewer will skip questions on that topic.In my case , I was not very
					familiar with OOPS,DBMS and not at all familiar with computer architecture. So the interviewer
					mainly focused on coding questions. Have thorough knowledge about the projects mentioned in your
					resume.{' '}
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
					Venkata Tejaswini Anagani&nbsp; | &nbsp;ServiceNow&nbsp; | &nbsp;EE
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software development intern
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				The selection process consisted of four rounds.One technical test, two technical rounds and one HR
				round. {readMore && extraContent}
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
