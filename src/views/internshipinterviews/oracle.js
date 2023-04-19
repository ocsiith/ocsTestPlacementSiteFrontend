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
					Each section has subsections. Also there is a time limit for each subsection. We were shortlisted
					for different positions based on our performance in this test. Interview Experience: There were
					three rounds of interviews with 2 technical and HR based rounds. Round-1: In this round, I was asked
					to solve a problem (puzzle) and 2 simple coding questions. I solved all of them. Round-2: Even in
					this round, I was asked 3 coding questions. I was able to solve two problems completely. And for the
					remaining question, I just explained my approach. If you feel it is difficult to solve any problem,
					then explain the approach and voice out your thought process. They mainly evaluate you based on how
					you approach the problem rather than the final solution. Make sure you take care of all corner cases
					while writing the code. Round-3: This is a HR round. Initially he asked me to tell him about myself,
					my interests, hobbies, favourite subjects, preferred language and why do you prefer? Etc. Be
					prepared for common questions like “Why Oracle?”, “Where do you see yourself in 5 years?”,
					“strengths and weaknesses”, etc. He also asked questions on projects that I mentioned in my resume.
					Also asked me to write some code of my project and asked me if there are any drawbacks in it and
					what according to you is good code?. Last but not least, he asked me if I have any questions for
					him.{' '}
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
					I have started my preparation roughly around 2 months before the internship recruitment. Although I
					used to participate in the contests from codechef, codeforces now and then. I suggest you to start
					even earlier. Even if I solve a problem in the contests, going through the editorial helped me a
					lot.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Be positive and stay strong. If you don’t know the answer, remember it is okay to say that you don’t
					know. In online tests, check the language that is present in the editor before you start coding.
					Sometimes copy paste will not work. Be ready to answer anything that is mentioned in your resume.{' '}
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
					Chaitanya Janakie Pothugunta&nbsp; | &nbsp;ORACLE&nbsp; | &nbsp;CSE
				</Typography>
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
				The test consisted of different sections like Aptitude, Communication(english), Technical and Coding
				sections. {readMore && extraContent}
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
