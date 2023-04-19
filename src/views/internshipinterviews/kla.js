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
					Generally, the coding questions have more weightage. I was able to solve both of them in 15-20 min
					and also did fine in MCQs. The coding questions were: Some sliding window problem model
					https://www.geeksforgeeks.org/count-inversions-of-size-three-in-a-give-array/ Round 2: It was a
					virtual interview round. I was given 3 coding questions arranged in increasing order of difficulty.
					I was supposed to explain my approach and write the code/pseudo code and run the testcases (in case
					u write a proper code). I completed the first 2 of them in 20-25 min. The 3rd one was tricky. I
					didn't write a proper code for this one and just kept talking about my thinking process. The coding
					questions asked were: Given solution to a Minesweeper (with numbers and flags represented as a
					matrix), check if the solution is valid or not.
					https://www.geeksforgeeks.org/sliding-window-maximum-maximum-of-all-subarrays-of-size-k/ (asked in
					DE Shaw on the same day too) https://stackoverflow.com/questions/58594660/maximum-subsequence-sum
					Round 3: I was again given 3 questions, but this time it wasn't like I was provided IDE to write
					code for them, but rather was asked to write pseudo code/logical steps you would perform in order to
					achieve the answer. This round went a little bad for me, but I kept constantly expressing my thought
					process and the interviewer was a little supportive too. The questions were:
					https://www.geeksforgeeks.org/finding-sum-of-digits-of-a-number-until-sum-becomes-single-digit/
					Given 2 concentric circles and some arbitrary set of line segments. How do you check if a line
					segment is valid? A line segment is said to be valid if it completely lies in the area in between
					the two concentric circles https://www.geeksforgeeks.org/expression-evaluation/ HR Round: Probably I
					was selected for doing well in round 1 and round 2. Once, you reach HR round, it implies you are
					selected for sure for 99% unless you communicate really really bad. So you can now relax and just be
					honest in talking with HR. The HR was friendly. He kept asking some questions like: Describe
					yourself. Which other company interviews did u attend. Why were u rejected? Are you planning for any
					higher studies? Are you happy with your stipend? Are you okay with work location being Chennai? Will
					you accept if we offer you PPO at the end of your internship? He also explained about his company
					and what it does.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Every round (except HR) mostly has coding questions. And most of these questions aren't like new and
					75% of the questions were either standard or past interview questions. So keep practicing past
					interview questions from gfg/interviewbit or problemset from leetcode. It would also help a lot if
					you could form a small group of 5 or 6 members where you can discuss coding questions, share some
					good problems, etc.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I used to participate in codechef and codeforces contests since the start of 2nd year. Though not so
					frequent, I did like doing CP. I didn't explicitly prepare much from any specific website. Our
					little coding grp in WhatsApp has been active for since like 2 months before the internship exams,
					where my friends used to share coding problems. Most of my preparation involved solving these
					problems.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					If you are new to CP, start doing codeforces contests to get a feel for timed contests. Also start
					solving past interview questions in interviewbit/gfg/leetcode If you aren't able to solve some
					problem, don't right away look at the solutions. Think about them during the end of the day and if u
					still can't figure it out, look for solution the next day. Forming small coding groups where u can
					share coding problems and help each other in solving them might be helpful Parallely revise CS core
					subjects (especially OS and sometimes computer architecture). Also be thorough with OOPS concepts.
					Most of the companies ask questions in it. Be prepared in explaining the projects you've wrote on ur
					resume. Maintaining a CGPA more than 8 will give you opportunity to all companies. I couldn't apply
					for Microsoft and Adobe because of this. But if there is nothing you can do about it, don't worry.
					There are other good opportunities too. For online rounds, if you can't think of a method to solve a
					question completely, atleast solve it partially by brute force or other approaches (Some of them
					tried manually constructing if else statements and passing the visible test cases). The interviewers
					are friendly. Don't get tensed. Be confident and free in communicating with ur ideas and thought
					process throughout the interview. Finally, Campus interns are definitely not an accurate measure of
					ur talent. Luck plays a major role too. Don't let the pay decide your talent. If you are rejected by
					a particular company or even if you couldn't get an internship, Don't depress over it. It isn't end
					of the world.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Krishna Pawan&nbsp; | &nbsp;KLA Tencor&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Engineer Intern
				<br />
				Duration: 8 weeks
				<br />
				Min CGPA: 6
				<br />
				Stipend: 85,000 INR/month as promised by HR
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: It was an online coding round. It consisted of 2 coding questions and aptitude mcq questions
				related to CS subjects and general maths.
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
