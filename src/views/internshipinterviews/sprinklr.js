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
					Technical interviews by 3 interviewers back to back: Round 1: I was asked my favourite data
					structure. I answered DSU. I was then asked to implement it with arrays. Next, I was asked a
					question similar to subset sum DP but XOR instead of sum. The next question was: Given set A of n
					strings with only ‘a’, ‘b’, ‘c’ and another set B of m similar strings, find for each string in B
					whether, there exists a string in A such that the they differ at exactly one position. A puzzle was
					asked at the end. Round 2: I was asked to implement HashMap in any language, how it would be
					implemented in its standard library. I picked C++ and told how it does rehashing when load factor
					increases. Then I was asked to ignore that and implement it with chaining. The discussion then
					continued on choice of hash functions for strings, the advantage of prime numbers. Next was a dp
					question on probability of getting k heads in n coin tosses, given the probabilities of heads in
					each of the coin toss. Then I was asked a few questions on OS(synchronization) and OOP(polymorphism)
					for few minutes. There was a puzzle at the end of this round as well. Then another interviewer
					joined and asked me to implement quicksort. Finally there was an HR round with general and company
					specific questions.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					Doing CP will help a lot for the coding rounds(+ CG will also carry forward a good first impression
					to the interviews). Towards the end, practice from geeksforgeeks. Give real-time contests that
					affect your ratings in codeforces and leetcode to get used to the pressure. For the interviews,
					knowing DSA and OS offered in our courses is enough. But practice enough to be able to apply DSA to
					solve problems. Be confident as well as open to changing your approach when the interviewer hints
					that you are going wrong. Take time to communicate clearly with the interviewers. For the HR round,
					be a bit attentive in PPT. Know what exactly the company does and express how your interests align
					with it.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					I was doing CP anyway. It was more than enough for the coding rounds. Towards the end, I gave some
					contests in codeforces and leetcode. The questions in leetcode are more similar to the kind of most
					questions in the coding rounds. CP + courses were sufficient for my DSA. Revised OS course slides a
					few days before the interviews. Lot of random things can happen about the interviews: clashes,
					interviews being much easier / harder than you expected etc. I stumbled somewhat in the first round.
					Still got to the second round, but from then on, it went smooth. Not everything is in your hands,
					just give your best as it comes. :){' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Make sure you are able to implement your ideas in code as well at a reasonable speed. A significant
					number of questions in many coding rounds will need only that. In interviews as well, you are
					expected to write a proper pseudo code at least for the solution you describe.{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4"> Govind Balaji S&nbsp; | &nbsp;Sprinklr&nbsp; | &nbsp;CSE</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Product Engineer Intern
				<br />
				Duration: 8 weeks
				<br />
				Stipend: 200,000 INR per month
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				Coding round - 3 questions: Bitwise XOR, Dijkstra, Precomputation and binary search. Technical
				interviews by 3 interviewers back to back:
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
