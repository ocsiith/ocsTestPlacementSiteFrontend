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
					Interview: 1 on 1 Interview discussing my experience in the field of Machine Learning. The
					interviewer was pretty informal, and we had discussions about college life and extracurricular
					activities as well. He started with few algorithmic approach questions to an introductory Segment
					Tree problems and helped me deduce the correct path. He did dive a bit into Linear Algebra and
					Probability questions focusing on my understanding of the concepts rather than the answers. He was
					more interested in the approach and thought process. An interesting discussion about my project
					followed, which was pretty detailed. Overall the experience was pretty fun and a great conversation
					over various topics more than a question and answer session.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Every company irrespective of the profile does test the coding aptitude, and the major bottleneck is
					writing a bug-free code without the help of internet sources within time limits,So it is necessary
					to have a grip and rhythm in your coding to ensure you do not waste too much time on correcting
					basic errors, Practising timed virtual coding contests on platforms like Leetcode might prove
					helpful if you’re new to competitive programming, For other theory/math topics, topic-wise quizzes
					on GeeksForGeeks is pretty helpful, For interviews, knowing your resume and projects is essential,
					as any project/experience might be discussed in depth.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I started my preparation very late as my summer internship at the end of my sophomore year ended in
					late July. But I had participated in a few coding contests throughout my sophomore year, and a bit
					of question-solving helped me regain the flow to solve questions in a timed manner. Leetcode is a
					great platform, and I used it to solve problems both in a topicwise and a random manner. The only
					challenge I think is staying stress-free, and it is very important to not dwell too much over each
					test/round. I’d say just realise the fact that this internship season is a minor part of your entire
					life and take it as it comes. Overthinking and remembering mistakes is something that you should
					avoid at all costs. Easier said than done, but mental peace and calm are perhaps even more important
					than your technical skills. It is okay to not know everything, but it is crucial to understand what
					you do plan on stating in your resume or as your interests very well.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					I’d simply suggest that stay focused during the screening tests and not waste too much time on a
					particular question. Finish off all questions you are sure about and then manage the others in the
					time remaining. For interview rounds, try establishing a good rapport with the interviewer. Informal
					topics like sports, books helps break the ice and helps you get at ease as well. So when asked to
					introduce yourself, be sure to mention hobbies! Ensure you think out loud and involve the
					interviewer in your approach so he/she can correct or guide you as well. Do try gauging the
					interviewers reactions though, its an easy way to verify if you’re on the right track. Be clear and
					precise in your answers. Remember that the interviewer was indeed in your position once and is not
					your mortal enemy, so a jolly mood and a smile on your face and you’re good to go! Best of Luck!{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Shreyas Havaldar&nbsp; | &nbsp;Adobe&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Research Intern
				<br />
				Duration: 12 weeks
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
				Screening Test: Multiple sections that tested different skill sets including topics like Linear Algebra,
				Probability, Logical Aptitude and Puzzles, CSE Core fundamentals like OS, OOPs, Simple Coding Problems
				and an essay type question. {readMore && extraContent}
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
