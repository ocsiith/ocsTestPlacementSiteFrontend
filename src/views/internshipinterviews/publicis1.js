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
					There was one coding Question and one real ML training question by reading inputs from some CSV
					file. Round 2: Technical Interview This went for about 40 minutes where the interviewer asked to
					explain all the projects mentioned in the resume in a more detailed way. Later he asked me some
					Machine Learning concept questions and also asked questions regarding some real-life situations and
					asked me to come up for solutions using Machine Learning. Round 3: HR Interview This went for about
					50 minutes. The interviewer asked me regarding my soft skills. The rest of discussion went about
					where the Interviewer gave me situations related to Teamwork, Problem Approaching Skills and was
					interested in how I will handle any such situation. He also asked me to present examples from my
					real life, where I was under such situations and justify my earlier answers.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Round 1: They are mostly theory questions in objective which anyone with some experience in those
					domains can solve by just having a small revision. Round 2: Be Prepared mainly for whatever you have
					included in resume thoroughly (Thoroughly in the sense, every point of your projects and courses, (I
					was asked which version of Tensorflow I used)) and go through more conceptual questions related to
					ML. The interviewer was more interested in how one will handle a situation no matter what problems
					occur in an ML Training. So preparation in this domain will help. Round 3: It had questions based on
					real-life situations. Just stay confident and clear while answering. The Interviewer was expecting
					to see if we have faced those situations in our own life.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					For Round 1, I just revised some Python and ML concepts. A decent enough experience with CP was
					enough as well. (Revision for a week or two should be sufficient). For this round, I prepared by
					practicing CP from Hackerrank and Codechef. I had my notes on ML which I made while I was learning
					few months ago, revising it helped a lot. For Round 2, I revised some courses which I took at
					Coursera, such as Deep Learning and Machine Learning courses by Andrew, Ng. (I took this courses 2-3
					months before the interview schedule, which was sufficient time as I was free during these lockdown
					times).{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Just be confident with your answers in online round. While Interviews, stay calm and try to always
					have a good interaction with the Interviewer rather than being silent on any questions. Do not
					hesitate to give your approach initially, although it might be not that good. The Interviewer helps
					you along the discussion. Most importantly, Be 100% sure of whatever you have included in your
					resume.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> K Srivatsan&nbsp; | &nbsp;Public Sapients&nbsp; | &nbsp;ME</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Data Science Internship
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: Online Test The Online test was conducted on HackerRank Platform which included around 10
				objective questions from Probability, Statistics, Python, Machine Learning and some Database related.
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
