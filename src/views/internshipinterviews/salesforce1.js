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
					To be honest I didn’t know a lot about Salesforce back then, so I wasn’t really aiming for it, hence
					I wasn’t tensed about being shortlisted for the interviews while giving the coding test. And this
					helped me perform better and I was able to solve all the three questions completely.So, I highly
					recommend you to just stay calm during the complete hiring process. Trust me on this :) Technical
					Round-1: I had this interview early in the morning, the interviewer was very calm and supportive. He
					initially asked me about my interests and gave me a small puzzle. Then, he asked me a question in
					sorting, given 2 unsorted lists of numbers can you write a program to have all negative elements on
					the left and the positive elements on the right. I was trying to give the answer using quicksort’s
					partition algorithm. He asked me to not think about efficiency and just give a solution that works.
					After giving the brute force answer of joining the 2 lists and sorting it, he said that the first
					goal should always be to have basic code that works and later we can improve it. Then, we moved to
					codepair where he asked me to code the same, but extended the question a bit further and then asked
					me to code that as well. And they forwarded me to the 2nd round of the Technical Interview.
					Technical Round-2: In this round, I was asked to join codepair, where I was given a question over
					the chat window of google meet. The question wasn’t very clear and he just asked me to code the
					solution and went on mute. I asked a few questions to confirm my understanding of the problem, he
					gave short replies with very less info to work on. I wasn’t able to complete my code as I had
					another interview for a company right after (which i was really aiming for), so I wanted to just
					leave, I said I had to meet another person. The interviewer got a bit angry but finally he agreed
					and I went to the other interview. By the time I finished this interview, I was told I got an offer
					from Salesforce .(So basically, I was selected because of being the best performer in the online
					coding round, they didn’t want to lose me to another company. So do give your best in the coding
					round so that you’ll be on the safer side even if you mess up your interview a bit :P) HR Round: I
					was already told I was selected by this time and it was just a formality where the manager asked me
					a few questions, about how to work in a company, how to collaborate etc Total 5 students were
					selected.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					I would highly recommend InterviewBit, which was recommended to me by a senior. Especially if you
					are short of time, I felt that solving all the questions from this is enough to cover the majority
					of the models. Make sure that you are through with each and every model you solve and in a state
					where you can solve similar questions later in the future . Also understand the solution properly
					and implement it again without any hints if you had the need to see the solution. Another useful
					platform is Leetcode. For technical interviews, prepare thoroughly about the things you mentioned in
					your resume and also be strong with the fundamentals of DS and algos For HR interviews, look up for
					some standard questions on the internet and prepare for them. Here are a few, Why should we hire
					you? Why choose our company? What are your strengths? What are your weaknesses? Where do you see
					yourself in five years? Tell us about a time when you faced a difficult situation and how you
					managed it. Tell us about a time when you directed a group of people to achieve a common goal.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					Even though I used to do long challenges on codechef regularly, my actual preparation started 2
					weeks before the first online coding round was conducted. So one major point is, it’s never too late
					to start, but then you wouldn’t really have a strong grip on the concepts. I feel that ideally a
					person should start at least 2 months before the first test, but usually during the same time you’ll
					be having classes etc. So the best thing to do is spend your summer coding(at least a major part of
					your summer), after which you can visit these concepts regularly through practicing on leetcode.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					For interviews do try to constantly speak with the interviewer, but do make sure you don't talk
					unnecessary things. Try to build things up from the base without directly giving complicated
					answers. So even if you know the efficient solution, do start with the brute force method. Say that
					………. Is the brute force approach, but we can improve the efficiency by approaching the solution like
					this ……….. Also be friendly with the interviewer so that you'll feel more comfortable. If the
					interviewer asks you something you don’t know, say you don’t know or else it’ll create an impression
					as if you are not able to explain something you know. Another major point is, you need to be calm.
					Believe me! Because I’m saying this from my experience, I was able to perform more than what I
					thought, just by being calm, in other words not caring too much. Do care less but don’t be careless.
					Once you think that it's super important, fear will occupy a part of your brain, suppressing your
					full potential. I do know it's easier said than done, but I would recommend getting a control of
					your emotions because it'll be helping you out everywhere in life. I would like to once again stress
					on the fact that internships are an important way to experience a field which interests you, and
					figure out if you want to work in that field for the long run. Don't let the pressure or fear of the
					process get to you and force you into opting for something that doesn't interest you. In the end,
					everything works out to be great, and if it doesn't, that's not the end. Don’t let a 2-month
					internship define you or demotivate you away from what you really are - life is too short for that!
					Good Luck :){' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Pavan Kumar V.S Vemuri&nbsp; | &nbsp;Salesforce&nbsp; | &nbsp;MA</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Intern Software Engineer
				<br />
				Stipend: INR 90,000 per Month
				<br />
				Duration: 2 Months
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Online Coding Round: The first screening round was an online test, where I was given 3 questions (out of
				which I found 2 to be easy and the other to be of medium level) with a time frame of 75min.
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
