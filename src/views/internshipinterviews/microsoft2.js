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
					For example, “12+x=24”, find x. I was able to solve all three. The time factor also matters in this
					round. Round 1: This round started with a quick introduction about me and the interviewer jumped
					straight to the problem. The problem was to check if a given string is word palindrome or not i.e,
					“apple orange apple” is word palindrome and “apple orange orange” is not. I told him my approach and
					he was satisfied. Then he added some more constraints(O(1) space) and modifications like multiple
					spaces in the string, case insensitive etc. I was able to solve all of them. I kept explaining while
					I was writing the code in the editor. This round lasted for 1 hour. Round 2: This round started with
					a quick introduction again. The interviewer was very friendly. He asked me about my projects. Then
					he gave me a linked list problem. I gave him two solutions. One solution with optimized time and
					space complexity. He was expecting a different approach. After a hint or two, I gave him the
					solution that he was expecting. The next question was a question based on my internship project. He
					changed the problem statement a bit. The problem statement was to design an algorithm to search the
					nearest drivers in an optimized way(for cab service like uber or ola). Like before I did some
					brainstorming by discussing with him and finally came up with an optimized solution that catered the
					change in problem statement. He was quite satisfied with my approach. This round lasted around 45
					mins. Round 3: This round was a HR round. He was very friendly. He asked me if I have any questions
					for him. I asked a lot of questions about their products, about interns, about the tech stack they
					use. He asked me about a project I mentioned in my resume. He asked me to explain the workflow. This
					round lasted for about 30 mins.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					For the online coding round, be familiar with competitive programming and it is advisable to have
					some practice in it as many companies use competitive programming to filter the students. Do
					participate in time constrained contests in codechef or codeforces. Have a decent resume by doing
					some projects. Do an internship if possible. For technical interview rounds, be really thorough with
					DSA. Just keep coding until you have enough practice in all the topics. Use geeksforgeeks for
					concepts and questions. Other platforms like interviewbit and leetcode are also very helpful. Make
					coding as a hobby and enjoy it while you do. OOPS concepts are really important(JAVA or C++). You
					should also be familiar with concepts from operating systems.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started with competitive programming in my 2nd semester. It is fun and challenging. I used
					geeksforgeeks, interviewbit and leetcode extensively. They are really great if you want topic-wise
					questions or company-wise questions. I started preparing for interviews in my 4th semester holidays
					but I recommend you to start even before and learn DSA leisurely. Keep coding and also work on your
					projects as they might ask questions on those too (Learn about tech stack and be ready to face
					questions like why you preferred a particular techstack over others). I felt that my internship
					project in the summer helped boost my resume. Start planning on how you’re gonna prepare well in
					advance.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Just clear your mind before the interview. It is okay to feel nervous but just think of it as you
					explaining things to your friend. Be confident, don’t panic and keep explaining your approach
					because all they see is your way of thinking. Write neat and proper code. Do ask some technical
					questions when they ask if you have any questions for them because it shows that you are
					enthusiastic to join their company. If you have a good command on DSA and on your projects, the
					interview is gonna be a cakewalk (trust me! :D). Happy coding!!{' '}
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
					Krishnam Dhanush&nbsp; | &nbsp;Microsoft&nbsp; | &nbsp;ME and Double major(CSE)
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Engineering Intern
				<br />
				Stipend: 80,000 INR/month
				<br />
				Time period of internship: 8-12 weeks
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Selection Rounds: Coding Round: This round was on mettl platform. It consisted of 3 problems. The first
				one was infix evaluation. The second was on bit magic. The third one was based on strings, given a+b=c
				as a string and any 2 numbers given, we have to find the third one.{readMore && extraContent}
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
