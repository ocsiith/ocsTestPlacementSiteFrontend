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
					There were three interview rounds in total :- Round 1 :- This was a preliminary technical round. The
					interviewer was very polite and supportive. He first asked me about my projects. I had done a
					project in Deep Learning which I explained to him in detail. Then he gave me a simple puzzle to
					solve. He then asked me to share my screen and gave a coding question (based on arrays) and asked me
					to give a bug free code in a language of my choice. I was comfortable with python so I used it . I
					got a partially correct answer in the first attempt and he asked me to find the mistakes and corner
					cases. I found them soon enough. This concluded the first round. Round 2 :- This was also a
					technical round. The interviewer was different and I was again asked about the projects I had done .
					Then 2 coding questions (one related to arrays and the other one to greedy algorithms) were given
					and I was asked to give my answer on codepair. However the interviewer expected me to code either in
					C/C++ .I told him that I had left my practice with the language and he did not insist on me and
					asked me to do so in python. I gave the correct solutions but he pointed me out to not leave
					practice with the C/C++. He then gave me a case scenario and asked me to give him a solution from a
					software engineer perspective. He basically wanted to judge the way I thought about the problem. The
					answer was mainly based on approaching an optimized solution through greedy method. Round 3 :- This
					was technical + HR round I was asked to give an introduction and asked about my interests and
					skills. I am pursuing a double major in computer science which he found to be an interesting career
					choice. He wanted to know why I chose a double major and how I think it would benefit me. After this
					I was given two coding questions ( One from Dynamic Programming and the other was based on sorting
					algorithms) . I completed the questions. We then had a small interactive session about the ongoing
					work in oracle and how, as an application developer, I could give a positive contribution.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Practice coding regularly. Use a basic language like C/C++ as it gives you an opportunity to learn
					the nitty gritty of the code. Don't leave midway if you find that you are progressing very slow. It
					is better to have knowledge of some core computer science concepts such as OS and DBMS both for
					technical test and interview rounds. For roles of data science or application development it is also
					advisable to have good hold on concepts of probability and statistics as they are frequently asked
					as a part of aptitude tests.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I practiced coding questions from geeks for geeks which helped me a lot. Having a good background in
					competitive programming will give you an edge over others. This was one mistake I made as I started
					competitive programming really late ( around 1 month before the internship tests) which caused a lot
					of pressure at the end. I did not have time to work on all my weak points in coding. Getting logic
					to a coding question can be easy but writing code for it needs practice. Practice will minimize the
					anxiety during technical coding tests. Apart from this I had done three projects which significantly
					added value to the cv. Try to find a field you're passionate about, search for professors working on
					it and ask them for projects in the field. Make sure the projects are relevant to the jobs you’re
					applying for. Nothing can help you learn things more effectively as a project does. You can also do
					personal projects . That helps a lot .{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					It is very important to be calm in technical rounds. Anxiety can block you from solving the easiest
					of questions during an interview. Don’t panic if you can’t solve a coding question. A way out of
					this block is to share your thoughts about the solution to the interviewer. This buys you both time
					to think and makes you calm. During preparation set time limits on yourself while finding coding
					solutions. There are a lot of standard algorithms in the texts. Make sure you learn them before
					practising. Don’t waste a lot of time in finding answers to standard algorithms and depressing
					yourself. They were derived over years of experience, so no profit in wasting your energy deriving
					those again. It is better you build over them. For an HR Interview, present yourself very
					professionally. Have an attitude to make them believe that you are important for their company and
					you are genuinely interested in the role. Be truthful in all aspects. Don’t fabricate your
					personality. Knowing a bit about the present work in the company can help you build an engaging
					conversation with the HR Interviewer. This turns out to be a lot fruitful.{' '}
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
					Amitanshu Sahoo&nbsp; | &nbsp;ORACLE India&nbsp; | &nbsp;CSE and ME(Double Major)
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
				The technical test consisted of five section :- English vocabulary Reading comprehension Coding
				(Answering questions related to a given code) Software Engineering Aptitude Mental Aptitude
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
