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
					Interview: There were 2 rounds(some had 3) which were mostly technical . Both of them were held on
					Zoom(for face to face interaction) and Codepair(for the coding part). ROUND 1:(35 mins approx) This
					was a preliminary technical round. The interviewer was very calm and supportive. Question 1: find
					the minimum element in a sorted and rotated array. He asked me to explain the approach, then he said
					to code it. He checked for some test cases and corner cases and was satisfied with the solution.
					Question 2: current maximum element in a stack. I explained to him the approach, he asked me to
					demonstrate how it works with an example. He didn’t ask for the code. He then asked for an approach
					without using an extra stack, I said we could use a hashmap but he wanted an approach that uses less
					auxiliary space, I kept thinking, all the time expressing what’s going on in my mind. I could not
					come up with an answer but that was fine. Throughout the interview i felt like the interviewer was
					focusing on how I was explaining the approach and not the approach itself, so I tried to be as clear
					as possible. ROUND 2:(45 mins approx) This round did not go so well for me. There was a powercut and
					I requested the interviewer to allow me to switch off my camera to conserve battery and data. The
					interviewer has been really supportive throughout the round. He asked my whereabouts, then about the
					weather in our area. I was asked two questions. Question 1:find the first non repeating character in
					a string Question 2: I was asked to design a class for a parking lot. One should be able to park,
					unpark and to make it simple the vehicle numbers were simple integers. Another constraint was that
					the slot allotment should be as fast as possible. I took a lot of time to come up with a design and
					the interviewer has been helping me throughout my struggle. You can stay silent but long pauses are
					not encouraged as they can bore the interviewer. Just keep telling what you are thinking. At last
					the interviewer was satisfied with my solution. He then asked if I knew how memory is managed in
					C++. I was not very confident about that, so I said no. This marked the end of the round.{' '}
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
					companies.(Microsoft and few other companies have a minimum cgpa criteria of 8). ● Having a good
					idea of OOPs , OS and other CS fundamentals helps in tests as well as interviews. ● Doing CP
					regularly helps you to improve your speed and thought process speed which are very important in
					online tests and interviews. ● Do not jump to a solution directly if you don’t get a problem while
					practicing. ● Try to pass as many test cases possible in the online test. Even brute force can help
					you to clear a significant number of cases. So don’t leave a question if you can’t think of an
					optimized solution. ● Be confident in interviews(most of the interviewers are very cool and
					supportive) and try to explain your approach/thought process to the interviewer instead of being
					quiet in case you are stuck in some question. ● Be thorough with whatever you have written on your
					resume because many interviewers start with your resume and it leaves a bad impression if you don’t
					answer something written on your resume.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Sai Srikar Perugu&nbsp; | &nbsp;GOLDMAN SACHS&nbsp; | &nbsp;CS</Typography>
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
