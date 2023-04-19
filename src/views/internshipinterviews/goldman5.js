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
					Interview: There were 3 rounds and all of them were technical rounds. All of them were held on
					Zoom(for face to face interaction) and Codepair(for the coding part). ROUND 1:(35 mins approx) This
					was a preliminary technical round. The interviewer was very calm and supportive. Question 1: Given
					two linked lists with a common node, find the common node. He asked me the basic approach first and
					then asked me to code it down on codepair. He asked me to dry run my code for an example he gave and
					asked some more questions regarding my method. He was satisfied with the approach and moved on to
					the next question. Question 2: This was a probability based question.(probability to reach a point
					from a given point). I gave him a simple approach, he said it works but he asked for any other
					approach. He gave me a hint to use dynamic programming. I could quickly realise what he was
					expecting and told him the approach and coded it. He was satisfied with the approach. ROUND 2:(45
					mins approx) This round was relatively much tougher compared to other rounds. 3 questions were asked
					in this round. Question 1:It was based on a subarray with some conditions. I told him the brute
					force approach and he told me to think of an optimal solution. I came up with a solution which I
					wasn't sure about but I explained my approach and he was satisfied. Question 2: It was based on
					strings in which we have to shorten the given string based on some modified definition of regular
					expression. I couldn’t think of any direct solution but I kept telling him what kind of approach I
					was thinking of. He asked me time complexity for my approach and moved on to the final question.
					Question 3: Design a data structure to perform certain operations he gave and he also mentioned
					expected time complexity. I suggested some ways to do it. It was more of a discussion based question
					rather than a yes/no kind of question. ROUND 3:(50 mins approx) Question 1: Number theory based
					question. (Prove n^2-1 is divisible by 24 if n is more than 3 and n is prime). He was expecting a
					solution without using 6p+-1 form of primes or induction. I could give him simple proof and he was
					pretty satisfied with my proof. Question 2: Question based on longest subarray with all elements in
					a range. I told him the approach. He asked me to code it and show the output for an example which he
					gave by compiling. Initially I got the wrong answer but he was very supportive and told me to use
					debug prints to check. Finally the code worked fine and he was satisfied. Question 3: Questions
					based on arrays.(Don’t remember the exact question) He asked me O(n),O(1) space approaches. He was
					satisfied with my approach and asked to code it down and show the output. This marked the end of
					round 3.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I have used Interview Bit, geeksforgeeks to solve problems(started a couple of months before the
					internship process). I used to participate in codechef and codeforces contests but not very
					frequently. I’ve covered the problems topic wise in the order given in Interview Bit. Geeksforgeeks
					has a good collection of company specific problems and interview experiences.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Try to maintain cgpa of 8(or above), so that you will be eligible for most of the
					companies.(Microsoft and few other companies have a minimum cgpa criteria of 8). Having a good idea
					of OOPs , OS and other CS fundamentals helps in tests as well as interviews. Doing CP regularly
					helps you to improve your speed and thought process speed which are very important in online tests
					and interviews. Do not jump to a solution directly if you don’t get a problem while practicing. Try
					to pass as many test cases possible in the online test. Even brute force can help you to clear a
					significant number of cases. So don’t leave a question if you can’t think of an optimized solution.
					Be confident in interviews(most of the interviewers are very cool and supportive) and try to explain
					your approach/thought process to the interviewer instead of being quiet in case you are stuck in
					some question. Be thorough with whatever you have written on your resume because many interviewers
					start with your resume and it leaves a bad impression if you don’t answer something written on your
					resume.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Sai Nishith Jupally&nbsp; | &nbsp;GOLDMAN SACHS&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Summer Analyst
				<br />
				Duration: 10 weeks
				<br />
				Stipend: 100,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Online test : 5 sections - 2 coding sections,aptitude and math based section, CS technical questions
				section, 1 writeup based section(questions like how to manage if your teammate quits a project).
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
