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
					The coding questions were: https://www.geeksforgeeks.org/find-water-in-a-glass/
					https://www.geeksforgeeks.org/largest-bst-binary-tree-set-2/ One more was application of level order
					traversal of tree. Round 2: This was a virtual technical interview round. It started with my
					introduction and then he asked me about the projects I have done. I was given 2 coding questions and
					was asked to first explain the approach then code it up in any one of the preferred languages. I was
					able to solve both the questions and the interviewer was satisfied with my approach. Then he asked
					me a few ML related questions since I have done ML, Dl related courses on Coursera. This round
					lasted for 45 min. He then asked me if there were any questions for him. I asked him about the work
					culture and the projects given to interns etc. I made it into the next round Round 3: This was again
					a virtual technical interview round. I was tested on various topics. It again started with my
					introduction and then he asked me for a detailed explanation of my projects which I mentioned in my
					resume. He tested my knowledge in Data Structures, Algorithms, OOP, Probability, Theory of
					computation(just basics), Comp. Arch(just basics). This round lasted for 1hr 10 min. He then asked
					me if there were any questions for him. I asked him about the work culture and the projects given to
					interns etc. I was finally selected.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					For the coding round, try to practice as many as problems as you can since, many of the questions
					which will be asked would be either standard problems or applications of those problems. Practice on
					various platforms like GFG, Interview Bit, HackerRank, Codeforces, Codechef. Try to take part in the
					contests and start doing CP as early as possible. For the interview round, be thorough with Data
					Structures, Algorithms, OOP, and courses that you have been taught in college. Attend the PPT.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I majorly used GFG and Interview bit which helped me a lot as they cover almost everything one needs
					to know. I started my preparation before 2 months. I used to practice on hackerRank.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					The first and the foremost point is don’t get tensed. During the coding round or interview rounds,
					whatever preparation you have done is enough, just stay cool and calm and try to give your best. For
					the interview rounds, don’t get panicked as the interviewer will be friendly(from what I have
					experienced). Explain your thought process without any hesitation. Presentation also plays a vital
					role. If you ever get stuck while doing problems or any concept related question, don’t stay silent
					but instead, ask for hints. Have a clear understanding of projects stated/ mentioned in the resume.
					Time plays a major role, Practice makes a man perfect so, practice to your full potential. Try to
					maintain a decent CGPA, generally above 8, so that you will be eligible for all companies. The
					interview process is more of luck-based, so don’t get depressed if you are rejected. Stay strong and
					accept the rejections there would be many companies coming. Start doing CP as early as possible. If
					you don’t get selected, don’t get depressed as this is not the end. There might be better companies
					coming later. So, don't lose hope. Self-Belief and hard work will always earn you success.{' '}
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
					R. Sai Dinesh &nbsp; | &nbsp; Samsung Research Bangalore &nbsp; | &nbsp;MA
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Student Trainee
				<br />
				Min CGPA: 7
				<br />
				Duration: 8 weeks
				<br />
				Stipend: 50,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				This was an online coding round. It consisted of 3 coding questions and each one of us was asked
				different questions. People who were able to solve 3/3 were shortlisted for further interviews.
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
