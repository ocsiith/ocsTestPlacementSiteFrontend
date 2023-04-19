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
					Similar to: https://atcoder.jp/contests/dp/tasks/dp_b Count the no of strings of length ‘n’ with
					almost ‘k’ consecutive vowels. I was able to solve both the questions in the stipulated time, in the
					end, 4 students were shortlisted to the next round. Round2 (Technical Interview): (40 mins) The
					technical interview was conducted on MS Teams. Firstly the interviewer introduced himself and asked
					me to tell about myself. Then he started asking questions from projects written in my resume. Then
					he went to OOP concepts. He asked me on designing a room allocation system efficiently. He was
					expecting what classes are required, Abstraction, encapsulation, greedy algorithm which I would be
					using, etc. I was pretty confident in OOP concepts so I’ve described him the efficient approach
					directly. Then he started asking about polymorphism in C++, inbuilt mechanisms (vptr, vtable, etc.).
					Then he went to an online editor and asked me to choose my language and implement a sorting
					algorithm. I directly chose quick sort and implemented it in like 5 mins. He then asked me to
					analyze the space and time complexity of the quick sort, how to improvise it, and worst-case
					scenario, how randomization helps, etc. He was pretty impressed as it took very little time for me
					to code. He then moved to OS concepts which I was not familiar with and I’ve said that I’d be
					learning them this semester. He asked about Agile Technologies, and some software engineering
					practices. At last, he asked if I had any questions, I was asking about questions like what
					motivated you to stay in PS for 15 years (This he was speaking when he told about himself). Round3
					(Technical Interview): (1hr 15mins) This was a purely HR round. They tested if I am suitable for the
					culture of the company. He asked about my hobbies, my top 5 greatest failures, my weaknesses, and
					many situational based questions like tell some startup ideas in this COVID19 which you are thinking
					it would succeed. He asked me would you be Steve Jobs (Apple CEO) or Wozniak (built the first mac).
					Then he asked about my interests, what would I do now if I am rejected in this interview, what would
					I do in case of conflicts with others, Describe the time if your manager disagrees, etc. Finally,
					only I was selected for the SDE position.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Nothing can get you up to interview rounds for any software companies except competitive
					programming. Most of us spend time doing very different things such as web dev, app dev, ML, etc.
					But, for an SDE role or even Data Scientist (preliminary rounds), mostly all of them would be tested
					on your problem-solving and logical skills. It’s good to do other things too but doing CP regularly
					helps a lot. For the interview rounds, be confident and communicate effectively with the interviewer
					regarding your thought process. Don’t lie in the interview as the interview may go in a very
					different way. If you are not comfortable with any concepts tell straight away that you are not
					aware of it. Interviews will be focussed on OOP, OS. So its good to revise concepts like a week
					before. I saw my friends failing in the HR round, I think this is the worst case. Be prepared with
					some of the common HR questions and practice with your friends if possible. I was giving Atcoder and
					Codeforces contests which helped me a lot in terms of my speed. Give contests regularly and upsolve
					them. I used to do some standard questions from interviewbit which I would say that more aligned
					towards some specific standard algorithms. I recommend giving short contests from the very beginning
					so that you will be habituated for the time constraints. Again nothing can take you far except CP.
					Do practice Aptitude and Probability. I was not shortlisted in some of them because of attempting
					them badly{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I was doing CSES and Codeforces questions as most of the first round questions will be purely
					logical and not standard algorithmic questions. It helps a lot to look after some standard design
					questions. The biggest challenge I faced was with Dynamic programming I referred to a lot of
					questions (I still do...) but couldn’t solve them at the moment. Just practice makes things perfect.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Don’t lose your hope if not selected in your dream companies. I lost my whole confidence when I
					didn’t get selected for the last rounds of DE shaw, KLA, service now, and NTT. I didn’t know what
					went wrong, I thought that I was answering questions quite well. The thing with interviews is they
					are hugely dependent on “LUCK”. It would highly depend on the interviewer and questions too. So
					being panic, and talking about other easy interviews of your friends, just makes you feel more
					demotivated. Having good friends will help a lot. So be patient and confident and try to give your
					best. Choose among the options of companies wisely as some of the good companies would be coming at
					a later point too (Don’t regret after you are out of the internship process).{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Akash Tadwai&nbsp; | &nbsp;Public Sapients&nbsp; | &nbsp;ES</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: SDE
				<br />
				Duration: 2months
				<br />
				Stipend: 35,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				The Online test was conducted on the HackerRank, which consisted of 2 questions and we are required to
				solve them in 75 mins. Both of them were Dynamic Programming questions.
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
