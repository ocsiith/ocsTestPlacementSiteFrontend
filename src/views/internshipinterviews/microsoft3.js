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
					Interview round - 1: There was only one guy in this round. First of all he asked me how will you
					compute the value of nCr for given values of n and r. He wanted me to shout everything running in my
					head. We had a discussion on this, I said if bounds are small we can go with a multiplication
					approach else we will use Pascal’s triangle. He then asked how would you improve the
					space-complexity, the approach I told him was quadratic in space and so I suggested that it could be
					done in linear space. Further he asked if there was any other way, I said we can use recursion with
					memoization and he was satisfied with the approaches I suggested. He later asked me to write pseudo
					code for all. Next he asked me if you are given a set of strings then how would you find the longest
					common prefix to all of them. I said we can use Trie data structure for that and further we had a
					discussion about improving the space complexity, implementation and boundary cases. Finally he asked
					me that if you are given an array then how would you find the maximum subset of the array such that
					there do not exist any pair in the subset whose sum is divisible by 4. I spent some time thinking
					about the approach but I couldn’t come up with an efficient algorithm except the brute force
					algorithm. He then gave me a hint saying that think about remainders. I spent some more time
					thinking about the hint he gave and finally I came up with an efficient algorithm using remainders.
					It was a kind of greedy algorithm. He was satisfied with my performance and I was promoted to the
					next round of interview. Interview round - 2: Again there was only one guy in this round. He first
					asked me about IP addresses and then he gave me some examples to identify the correct and incorrect
					IP addresses. Then he gave me a coding problem saying that “You are given a string consisting of
					only digits. Print all possible IP addresses that can be generated using the given string e.g.
					123123 ⇒ 1.23.1.23, 12.3.12.3, etc”. I took a minute to think about an efficient algorithm and I
					came up with one. First he asked me to tell everything I had in my mind before writing any code so
					we had a discussion about the algorithm I was thinking about. He was impressed with it and then he
					asked me to implement it. I implemented the same algorithm in Java. As I was writing the algorithm
					he was asking the questions about the code I wrote e.g. why I used this line, why am I keeping this
					condition here, etc. On the way he also fixed some minor mistakes that I made as I was in a rush to
					finish the code as soon as possible. Some of the mistakes he fixed were like instead of writing 255
					I wrote 2 (typing mistake), instead of passing original string I was passing substring to the
					function (couldn’t figure out for a while because of rush :P ). He was overall supportive. After I
					wrote the code he tested it with some test cases and then he asked me is there any problem you see?
					I said nope, I can’t see any. Then he said what will be the output for “10000000001”. In my case I
					was generating all possible IPs e.g. “1.000.000.000.1”, “1.00.0000.000.1”, etc and so there were
					repeated IPs. He asked me how I would tackle this problem. I said we have many possible ways to
					solve this i.e. we could use a map or set to maintain unique entries or we could improve the
					algorithm to generate only unique entries by discarding the leading and trailing zeros for a given
					zero. He didn’t ask me to code this and he was impressed overall. After this I was promoted to the
					final round of interview. Interview round - 3: In this case the interviewer was a lady. She
					introduced herself and then asked me to introduce myself. Then she asked about my interests,
					preferences and other stuff. Then she discussed my resume. I was having many projects in my resume
					and so we had around 10 minutes of discussion about the projects I worked on, motivation, problems I
					faced and how I solved them. Then she gave me a coding problem “Given a sorted and rotated array,
					find a key in the array in logarithmic time”. This was quite a simple problem I had seen before but
					I didn’t try to solve it at that time. First of all she asked me if I had solved this problem
					already to which I replied that I’ve seen this problem but I didn’t solve it yet, this is the first
					time I’ll be doing it. She then said “OK, tell me how will you proceed? ”. I gave her a simple
					implementation that it’s nothing other than a variation of binary search. I wrote code and then she
					tested on multiple inputs. It failed for one input and then she started pressuring me. It was like a
					pressure round for me. She was getting strict and she was acting like she was going to kick me away
					if I failed to fix that bug within 5 minutes. I was very nervous at this time and I literally was
					not getting any idea of what’s wrong. I couldn’t find the bug within the first 5 minutes so she gave
					me five more minutes saying that this is your last chance. I took a long breath and debugged my code
					for the same input it was failing. I found the bug it’s just I was using greater than instead of ≥
					(seriously hard to find). I managed to fix the bug but I was wondering if she was going to select me
					as I took 5 extra minutes to tackle the problem. She then asked whether I am nervous, I replied kind
					of YES and NO, 50 - 50. Around 10 minutes later I received a call that Microsoft is offering me a
					summer internship role and I was like …. “Seriously? I was expecting to be kicked off because of the
					last round but luckily it didn’t happen :-) :-)”{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					REFERENCES: → Algorithms I and Algorithms II - Princeton University via Coursera → Data Structures
					and Algorithms Specialization - University of California via Coursera → HackerRank → The Complete
					Java Masterclass for Software Developers, Udemy → College core courses i.e. Data structures and OS →
					lastly Google, StackOverflow and GitHub! CONTACT: → Email: shubhamapanchal9773@gmail.com → WhatsApp:
					+91 9773669462{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Shubham Panchal&nbsp; | &nbsp;Microsoft&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Engineering Intern
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Written Exam: This exam was conducted on mettl. The exam consisted of three programming questions with a
				time limit of 1.5 hour which I was able to solve in around 45 minutes.
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
