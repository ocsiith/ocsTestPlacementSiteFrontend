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
					2 compulsory and 1 with a choice between two questions. Most of these were based on Data Structures
					and Algorithms, primarily DP. One of the optional questions was based on SQL, and could be done
					easily with practice of basic SQL querying with joins, etc. Around 50-60 candidates were
					shortlisted. Interview 1: This was a short 10 min HR-type interview for the selected candidates. We
					discussed my projects (I was asked to explain one in detail), and some situational questions were
					asked. Also, certain questions specific to NTT-AT and working in Japan were asked. Interview 2: This
					was again a short 10 min technical interview. Questions were asked on OOPS, and basic exception
					handling in python. Brief discussion about my skills and preferred coding language. Psychometric
					Test: This was an aptitude test, primarily to check our logical reasoning, diagrammatic reasoning,
					inductive reasoning and very basic arithmetic. Many questions were to be solved in very little time,
					but accuracy was key. The test culminated with another HR-type personal questionnaire. Prior to
					this, we were also asked to create a portfolio on their portal and upload an introduction video.
					This was also part of the evaluation process. Final Interview: This was a longish interview
					conducted by a full-fledged technical and HR-panel. I was asked about my preference order for the
					listings I had applied for and the reason for the same. They asked me if I had any prior experience
					in those profiles, and whether I will be willing to work in Japan after graduation. No technical
					questions were asked. 8 students were selected for the internship eventually.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					For the initial screening round, a thorough knowledge of DSA is expected, as with most other
					companies. Adequate time is provided for each question, and we were allowed to attempt questions at
					our discretion in a 30 hour-long timespan. The interviews are very relaxed and barring the technical
					interview, no technical knowledge is tested. Be thorough with all your projects, as any of them
					could become a point of discussion. For the technical interview, be thorough about any programming
					language and the OOPS concepts involved with it. It is better to practice before-hand for even
					aptitude/psychometric tests as these do form a basis for selection later on. The final interview
					could be intimidating and formal but be very honest in what you answer. I honestly denied having
					prior experience in any of the profiles I had applied for but expressed a strong desire to learn
					with time, which did the trick.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started with CP by around July end and continued practising until the test schedule was packed. I
					primarily used Leetcode for practice during this period. So, that was just over 1 month, but I used
					to solve problems on Hackerrank sparingly before that. Also, I was working on projects before that
					too (in Python), so I always remained in touch with coding during summer. Since I started practicing
					CP in the ‘exam mode’ quite late, it was difficult to cover all concepts before the tests. I
					frequently spoke to my seniors and inquired about commonly asked topics in the coding rounds, and
					laid greater emphasis on those. Before the interview, I prepared myself well with all that was
					written in my resume, primarily the projects and made sure I could confidently answer any questions.
					Also, read some theory about OOPS from GeeksForGeeks specifically for the interview.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Be regular with CP practice, and make sure you stick to strict time control towards the latter
					stages. Do not leave anything for later, as the test schedule coupled with regular classes can get
					very taxing, and you will not find time to learn new concepts during this period. Be punctual to the
					interview, the Japanese really value this trait. Also, they like to see longevity in the candidate,
					hence the questions about working in Japan after graduation. Be honest and confident in the
					interview and express a desire to learn and grasp if you can’t answer a question. NTT-AT has a
					fairly long but relatively easy selection procedure compared to other companies (with experience of
					rejection in Round 3 of Goldman Sachs), so make sure to hang in there. Again, DO NOT trivialise the
					process of making your portfolio or any such process this company takes you through, including the
					psychometric tests. These are crucial to their evaluation of a candidate. Best Of Luck!{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Rajdeep Agrawal&nbsp; | &nbsp;NTT AT&nbsp; | &nbsp;EP</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title:Developing Operation Support System for ROME (Robotic Optical Management System) to control and
				visualize ROME operation by GUI.
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Written Test: An online written test was conducted for the initial screening. 3 questions were asked in
				total: {readMore && extraContent}
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
