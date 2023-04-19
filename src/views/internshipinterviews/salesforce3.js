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
					Round 2: From here onwards, all the rounds were interviews via Google Meet. The first interview
					started off with a tricky question related to BST. After struggling with it for around 10-15 mins,
					she decided to give me another question. The problems that followed were fairly trivial and involved
					linked lists, DP(LIS) and merge sort; three questions in total. The round lasted around 40 minutes.
					Round 3: This round involved both technical and HR aspects. The interviewer initially chatted with
					me about my JEE prep and about why I wanted to join the company. 20 to 30 minutes into the
					interview, he gave me a Graph question related to Dijkstra’s which I partially solved. He continued
					to ask me non-technical questions while I was coding. After this, he enquired about what courses I
					had done and proceeded to quiz me on OS related concepts for another 20 minutes. This was followed
					by more HR questions regarding my hobbies and aspirations. The round almost lasted 80 minutes but
					the interviewer was super friendly and made it feel shorter. Round 4: The final round was fairly
					short and felt more like a formality. The interviewer seemed like a senior employee and also asked
					about some OS concepts. A few more personal questions followed. Lasted around 15 mins.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					The first two rounds required basic knowledge of Data structures and Algorithms. Linked lists, BSTs,
					Graphs, DP etc were covered. The later rounds really tested my OS basics with upwards of 10
					questions from the field. Concurrency(Mutex, Semaphores, etc), Paging and Virtual Memory were some
					of the topics touched on.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					A month or two of CP should suffice to get past the coding rounds. Personally, I wasn’t able to do
					so because of summer classes during the pandemic. Instead I extensively went through GFG archives
					and practiced a bit on Hackerrank in the 2-3 weeks preceding the internship season. I had next to
					zero experience with CP before this and was still able to do reasonably well, so don’t lose hope if
					you haven’t done much of it in your first two years.Make sure you attend the OS-I and OS-II courses
					if possible. A month or two of CP should suffice to get past the coding rounds. Personally, I wasn’t
					able to do so because of summer classes during the pandemic. Instead I extensively went through GFG
					archives and practiced a bit on Hackerrank in the 2-3 weeks preceding the internship season. I had
					next to zero experience with CP before this and was still able to do reasonably well, so don’t lose
					hope if you haven’t done much of it in your first two years.Make sure you attend the OS-I and OS-II
					courses if possible.{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					The interviewers are generally very helpful and will try their best to make you feel comfortable.
					While coding, think out aloud and they will often give you tips to fix/optimize your code, in case
					you’re going in the wrong direction. If you’re not getting a coding question it might be worth
					admitting it, as the follow-ups could be easier as in my case.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Sandeep Kumar&nbsp; | &nbsp;Salesforce&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Intern Software Engineer
				<br />
				Stipend: INR 90,000 per Month
				<br />
				Duration: 2 Month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Round 1: The first round was a coding round on Hackerrank involving three questions. Two of them were
				fairly straightforward whereas the third one was relatively difficult. All three involved basic DSA.
				Those who got two or more were selected for the next round, around 20 in total.
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
