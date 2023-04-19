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
					Given a string in the form of p+q=r, where one among p, q, r is X and others are integers, find the
					value of X. Convert a given equation to postfix notation. Technical Interview-1 : Asked about
					myself. Then asked a question - find the intersection node of two linked lists. After explaining the
					algorithm, I was asked to code the same. And then, test cases to check the function. Technical
					Interview-2 : Asked about myself, extracurricular activities, academic interest. First question -
					Given marks of n students, find the kth rank student. I first gave a brute force approach and there
					was discussion about its time complexity. Then discussed and thought for a better solution, he gave
					a hint to think of the algorithm of the quick sort(Before this, asked about sorting algorithms I
					know). After devising the algorithm, he asked me to code it. After this, he asked a question from
					OS(Explain deadlocks). This was followed by two more questions for which I was to explain the
					algorithms. Questions were - given start and end time of n processes. Assuming one process per core,
					find the minimum number of cores required for all processes to complete. Given the head of a linked
					list, check if it has a cycle. Technical Interview-3 : It was partly an HR interview also. In the
					beginning, he asked me if I had any questions about the internship or the company. This was followed
					by the question “Tell me about yourself”. Then asked about my projects. Asked my thoughts on how
					booking systems could work with simultaneous requests from many customers. Afterwards asked how to
					check if the given tree is a binary tree or BST. Ended with a few questions about internship,
					location and work.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Competitive Programming helps a lot in coding rounds. Take part in various timed competitions
					(codechef, codeforces). Practice questions on various topics to better understand each topic. For
					interviews, have a good understanding of Data structures and algorithms. Learn the basics of OS and
					OOPs. Also, make some projects and be thorough with them. You will also enjoy doing them! Having
					knowledge of probability, statistics and linear algebra proves to be helpful(in some companies &
					profiles).{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I did cp from my second year, and personally enjoy it and find it interesting. Doing cp will make it
					easy to qualify the coding rounds, and for interviews there are many platforms, any one of them is
					sufficient for preparation. I used interviewbit in the last month of preparation, and also solved
					some problems from leetcode. Try to be comfortable solving questions involving queues, stacks,
					linked lists, trees, recursion, backtracking and basic graph problems(involving bfs, dfs).{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					BELIEVE IN YOURSELF! During the process, don’t let your morale down. Even if you don’t get
					shortlisted or get rejected in some interviews, forget that and focus on other companies. DO NOT LIE
					ON THE RESUME. Be thorough with all the projects you mentioned. Be calm and confident during the
					interview. Say out what you think while solving and discuss your approach for the problems. Ask for
					a hint if stuck. It is better than sitting quietly. Utilize the summer holidays to practice and
					revise topics. All The Best!! P.S. : Feel free to contact seniors for guidance.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Ashutosh Tiwari&nbsp; | &nbsp;Microsoft&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Engineering Intern
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Technical test : There were 3 questions. Given a number, find the length of binary representation, lsb,
				msb. It was to be returned in the form of a string in the format “length#lsb#msb”.
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
