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
					Round 2: General Interview – They asked questions like my strengths and weakness, my interests of
					study and my take on working in Japan. Round 3: Technical Interview – Asked questions on python, and
					basic Object-Oriented Programming concepts. Also asked questions on my project. Round 4: Aptitude
					Test – Basic math and mental ability questions. Round 5: HR Interview – First question was ‘Tell me
					about yourself’. The rest of the interview was shaped on what I answered earlier. Before leaving, do
					ask them any questions or queries you have.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Practice CP during second year summer break (any programming language will work). You should know
					every tiny bit about your project. For interview round, go through the company’s website and get to
					know about their work.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started ML in March (second year) from Coursera and proceeded with Deep Learning. Took part in
					various Kaggle competitions and also did projects. (Lockdown helped me in completing these rapidly.
					I would suggest start working on it from January.){' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Even if you didn’t practice enough CP, don’t worry. Questions are usually logical which can be
					solved, given you are good in any one language. For data analyst role, doing only online courses
					won’t help much. Participate in competitions, work on different datasets and have at least one very
					good project related to the profile you are applying. Be bold and clear in interviews. It is fine if
					you are wrong or do not know any concept. They check only your confidence and willingness to learn
					new things.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Abhishek Sabnis&nbsp; | &nbsp;NTT AT&nbsp; | &nbsp;ME</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Data analyst
				<br />
				Duration: 2 months
				<br />
				Stipend: 1,50,000 Yen per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: Coding round- There were 3 questions, two of them were easy and one was hard.{' '}
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
