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
					The third section was the technical round. Where they asked basic questions like finding the
					expected output of a given code,OS, Computer Architecture. The fourth section was the advanced
					programming section, where we had to solve one coding question in 35 mins. The last section was
					subjective, where they asked two questions( description of our favourite project, what would I do if
					my teammate couldn’t contribute enough in a group project) There were three rounds of interviews. I
					was interviewed by two interviewers in the first round. They were very supportive and calm.
					Initially I was nervous but they asked me to calm down. They asked for my introduction and then they
					asked me some basic statistics and probability questions. Then they asked me about some algorithms.
					They also asked me for my approach to a data science problem. They expected me to discuss my
					solution from the beginning and we came up with the answers by discussing the questions. They were
					very helpful and gave hints wherever I got stuck. I got a spot offer at the end of the first round
					so I didn’t have to give the other two rounds!.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					More or less all good companies will test your coding skills. You need to write a code without any
					errors, without referring to any material in the given amount of time. So you need to be very
					thorough with the syntax, to avoid wasting time correcting basic mistakes. Practice CP from any
					online coding platform like hackerrank, read from GeeksforGeeks. Be through with basic data
					structures.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I used HackerRank and GeeksforGeeks, for the coding rounds. I started a bit too late, around a month
					before the exams started. But I suggest you start as early as possible. It’s just about how well you
					can code, the more you practice the better.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Stay calm. In most of the exams, they give you partial marks for getting a few test cases right, so
					write the code with any approach that seems feasible, even if you think that is not the most
					optimised approach. Sometimes brute force can also help you get a few test cases right. After every
					exam, don’t get disheartened if you’re not able to solve the problems, instead try discussing the
					questions with your friends and try doing better in the next exam. You will have enough
					opportunities, not getting an internship is not the end of the world. For the interviews, be
					confident and smile. Most interviewers are very supportive and understand that you’re just a
					beginner. Just don’t be afraid to accept that you don’t know something. Beating around the bush is
					something that you must avoid at any cost. They will not always expect you to come up with the right
					answer but the way you think and your approach is what they’ll be more interested in.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Riddhi Shah&nbsp; | &nbsp;GOLDMAN SACHS&nbsp; | &nbsp;ES</Typography>
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
				Tell us about the details of the Internship selection rounds ( All of them)- We had a basic screening
				test, which had 5 sections. The first section was on basic programming, where we had to solve 2 easy
				coding problems in 30 mins. Then there was an aptitude round, they as you basic math and logical
				reasoning questions, the questions are easy, but you need to solve them quickly.
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
