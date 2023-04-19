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
					Question: You are provided with an N*M matrix with zeros and one. Find the number of
					clusters(continuous 1’s) that can be formed when traversed horizontally, vertically, diagonally,
					horizontal_vertical, horizontal_vertical_diagonally. Interview Round 1 (Technical Round - 2hrs
					approx): It was held on the Codepair platform, where I was given three questions (Easy, Medium,
					Medium). I was asked to code as well as explain my code parallelly. After each question, I have to
					check with the test cases defined in the platform(14 test cases per question). I have done 1st and
					2nd questions entirely correct in less than 30min and I have got 11 of 14 test cases correct in the
					3rd question for which I have spent more than 90min to check where I was going wrong. Neither the
					interview nor me could figure it out. It has taken a long time for me to explain my code as I have
					used many STL functions for which I have to explain their functionality, Time complexity, and edge
					cases, some of which are not familiar with the interviewer. It has lasted for 2hrs. The interviews
					will run parallelly for all the students. So it wasn't possible to know the questions asked
					previously. Questions: Given an N*M matrix(char matrix) for which we have to find whether it is a
					solution for the Minesweeper game or not. (flags are represented with ‘f’)
					https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/
					https://stackoverflow.com/questions/58594660/maximum-subsequence-sum Interview Round 2 (Technical
					Round - 1hr approx): The interviewer asked me to describe any of my projects while he was selecting
					the questions for me. I have then explained the lexical analysis that I have done as a part
					Compilers course for 10min. After completing assigning questions, I was asked to write a pseudo code
					for evaluating an Arithmetic expression(a question related to the project I explained before). I
					have smiled and said that it was given as an assignment for students in the Introduction to Data
					Structures course for which I have worked as a TA. Then the other two questions followed. For these
					questions, I have to write a pseudocode for which I was given a text editor and explain everything
					written on it. Questions: https://www.geeksforgeeks.org/expression-evaluation/
					https://www.geeksforgeeks.org/finding-sum-of-digits-of-a-number-until-sum-becomes-single-digit/
					Given two concentric circles and some arbitrary set of line segments. How do you check if a line
					segment is valid? A line segment is said to be valid if it completely lies in the area between the
					two concentric circles. Interview Round 3 (HR round - 1hr approx): It was the coolest interview I
					have ever had. The questions are mostly based on my experience. I was asked the following questions
					for which I have also written the reply I have given. Introduce Yourself - For describing myself, I
					would prefer to start with the work I have done and the struggles faced. I have started telling the
					work I have done as the Workshop coordinator for Elan & Nvision 2020 for 10min. Explain any project
					that You have done: I have started explaining my journey in the area of parallel computing where I
					have started by doing a project of musical chairs simulation and another project of implementing
					pseudo character device driver for Linux, which was done in a virtual machine of CentOS (these are
					actually assignments of OS2 course). Then I have thought of extending parallel computing to the
					various domains for which I am working as a Research Internship under Prof. Satya Peri and now
					presently working on a project called smart contract based on the parallel computing and Ethereum
					blockchain technology. I was also interested in pushing this domain into Machine Learning and was
					doing a project of Semantic Segmentation(classification of an image using parallel computing
					techniques). I have taken more than 10min to explain all this information. Achievements till now: I
					started with the KVPY, JEE Mains, and all the other stuff I have mentioned in my CV. I ended up
					explaining my interest in electronics for which I have taken a Double major Degree in Electrical
					Engineering. Are you planning for any Higher Studies: I actually do not worry about my future, and I
					don’t plan for it and continue with the flow I was present in. I was presently interested in
					parallel computing and electronics, for which I have chosen KLA Tencor as the primary reason as It
					was the only company offering the parallel computing Intern. I may take a software job or an
					electrical job or I may enter into civil services about which I don’t care and my only present aim,
					is to crack this interview. Family Details: I said about my parents and their occupations, sister,
					and her present education. Do you have any questions for me: It was the main thing that every person
					will forget. I have gone through your job description but it hasn’t mentioned the exact work that
					KLA will do. Then, he explained with an example that they examine the defects in the chips
					manufactured by intel and google and it will be like looking for a strip of my hair from Sun. I
					appreciated the comparison and exited with positive hope.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Most of the questions either in the coding round or interview round will be standard or previously
					asked questions. Start preparing with Must do questions in GFG. In my opinion, imitating others'
					code is one of the best ways of learning programming. Even though all the other companies asked
					about the OOPS concept in which I haven’t familiarized myself, I have got lucky with this company
					where I have tested only on Data Structures in which I was good.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					We started with a group of 3 people(which was extended to 5) in June and participated in almost
					every contest of code forces. I felt difficult in the beginning but came up with learning from
					editorials after the contest. The group has been very helpful for us in sharing some good questions
					and other resources that other people have gone through. We have gone through various resources like
					GFG, Code forces, Leetcode, CSES problem set, Codechef(I used to contest in this platform in the
					start), Hackerrank(Questions that appeared in various internship online coding tests).{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Firstly try to maintain a CGPA more than 8 as some companies will restrict this. For the online
					round, If you are new to CP and have sufficient time(more than 6months) better to start with
					CodeChef for 1 month(as directly diving into code forces may affect your confidence). If you have a
					time of more than 2-3 months then start doing contests in code forces(mainly helps in time
					management) and practice the problems in CSES(mainly for binary search, DP and Graph questions). If
					the time is less than 15 days better to go for revising the GFG standard questions but it may not be
					the recommended way as you will get stuck with time management. The main thing is to think about an
					unsolved problem at night with your eyes closed. It will help in restraining your eyes as well as
					increasing your ability to think. If you got an idea, wake up and try to implement it. DO NOT
					hesitate to work late nights as it will be the best time for learning CP. Be familiar with previous
					CS concepts like Computer Architecture, POPL, OS, etc. If you have sufficient time, must learn the
					OOPS concept and do coding questions on it. Form a small group (3-5ppl) and share various questions
					and try to be more active in it. For the Online round, if you are not getting any approach to solve
					it, try solving it brute force or cook up your code for the unhidden test cases.{' '}
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
					Abburi Venkata Sai Mahesh&nbsp; | &nbsp;KLA Tencor&nbsp; | &nbsp;CSE
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Engineer Intern
				<br />
				Duration: 8 weeks
				<br />
				Min CGPA: 7
				<br />
				Stipend: 85,000 INR/month
				<br />
				Location: Chennai
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				It consisted of 20 single correct answer questions targeting mainly on AI and parallel computing(a
				common test for both the roles) and one coding question on simple DFS.{readMore && extraContent}
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
