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
					My questions were infix evaluation, min jumps and a string manipulation question(simple one) The
					interface for this test is a mettl website where we can’t use any initial template codes. The
					function args for different versions of c++ might be different, once check and choose as per your
					convenience. If you don’t know the code, sometimes doing brute force or cooking up the code for
					partial test cases might be helpful. Coming to the questions, ppl who solved more than 2 questions
					will be selected(just an observation). Around 45 ppl are selected for interviews Interview
					experience: All of the rounds are done in MS teams app video conference Round 1- He asked to
					introduce myself and next, without seeing my resume(but better to get a grip on every part mentioned
					in the resume) he asked about what projects I did. I selected one, which I could express simply and
					in an easy way. Next, he asked application of queues My ans: bfs,scheduling, dijkstra(priority
					queue), round robin Then he moved on to round robin and asked me to describe it. I started with
					explaining drawbacks of FCFS and SJF and finally concluded with fairness in round robin Then we
					moved to coding section 1)Time Needed to Inform All Employees i told the algo and he told to code
					it(he saw the code and saw all possible edge cases without running it) 2)Find the minimum element in
					a sorted and rotated array i did this in O(n), he told to optimise more, I tried, he gave a hint and
					then i told the algo and he told to code it(same fashion as previous question) He asked me whether I
					have any questions for him. Round2: He asked me which questions were asked in prev round and next i
					got 2 questions 1)Write a function to get the intersection point of two Linked Lists- i did it in
					O(length of list1 * length of list2) initially. He asked if i use the data of the node, can i make
					it better I told a linear approach. Then he asked if I could do it without modifying data. I tried
					sometime and then after he gave a hint, i told a linear approach and i was told to code it(he saw it
					and told its fine) 2)What is the algorithm used by Uber/Ola Cabs to show nearby cabs on their
					application? How is the time calculated? We need to tell an approach where modifications and
					updating and search will happen in least time complexity I told using graphs first, which is not
					optimal Next i told using sets and by allotting ranges in a city, where each driver will be in a
					unique range in a particular time And in this approach i got to do all my operations in O(log
					n)(main application of sets) Round3(mostly HR): I was told to introduce myself. Then I talked about
					my hobbies, interests and fav subject, my achievements. He asked about any projects, i told i only
					did course projects What's your fav Lang, My answer was cpp Then he asked Y do I prefer it over c, i
					told about stl, which is having many applications and saves time for us Then casually he asked a
					simple question, given a binary tree check if its a bst and i opened a paint app and drew on it and
					explained to him clearly(not just here, in all rounds paint app was used by them to explain the
					question/ me to tell my approach) He asked whether i’m interested in a particular field and what
					about my future(studies/job) Then he asked whether i have any questions I asked him about life at ms
					and he explained in a very nice way Express your excitement about joining the company and tell y if
					possible Then finally, he told they would be glad to pick hard working ppl and all-rounder students
					like me He told they not only see just studiousness, but extra skills too So try to express all your
					hidden talents. Then I was pretty sure I would be selected and I got selected.{' '}
				</Typography>
				<Typography variant="h6">
					What to prepare for each and every round? Any particular methodology that might help in preparation?{' '}
				</Typography>
				<Typography paragraph>
					I started my preparation on 12th june, I got to know about stl, backtracking, dfs, dp and graphs and
					practiced problems. These are very important topics, which after having some insight and experience,
					you can score well. For doing standard problems, cses problemset is very nice(I practiced dp and few
					graph standard problems here) Then in july, I moved to codeforces and started doing almost every
					contest. I started doing it with a grp of ppl and discussed doubts among ourselves. After contests,
					knowing the solution of questions which we tried is important. Knowing how to use stl is also very
					important and try to know about all data structures, so that you’ll have an idea of where to use
					what DS. I practiced gfg questions at end of august(i failed to cover many models) I maintained a
					document noting the imp things I learnt, the links for problems which I felt challenging and a list
					of problems/concepts that I need to do, Else I would have forgotten many things which i thought of
					doing late.{' '}
				</Typography>
				<Divider />
				<Typography variant="h6">
					What material did you use for studying? Your experience of preparation (When did you start,
					challenges you faced, how did you overcome them?)
				</Typography>
				<Typography paragraph>
					As long as you just practice problems without a time limit, you can't gain speed. Do participate in
					contests(codeforces preferably) amap. And for knowing standard problems, see problems in
					gfg/interviewbit{' '}
				</Typography>
				<Divider /> <Typography variant="h6">Some tips for written &amp; interview round? </Typography>
				<Typography paragraph>
					Important thing is, don't be tensed, they are very friendly and patient Have a smile on your face
					and be confident All the questions which i got asked are actually standard problems Even though i
					saw none of them before, with my approaches and their hints, i managed to clear them When they if u
					have any questions, ask them anything about company, the work u might be given, etc. this shows your
					excitement towards joining the company I was lucky that he didn't ask any questions on OOP and dont
					keep projects, that u are not very familiar with Have a basic knowledge of core concepts, good
					understanding of a any prog language Do coding as a group of ppl, which enhances competitive spirit
					and motivates to do more I started coding seriously very late, cuz of which i was not able to cover
					many model of problems. You ppl don’t do this mistake. Start doing from now itself{' '}
				</Typography>
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4">
					{' '}
					Kontham Vamshi Krishna Reddy&nbsp; | &nbsp;Microsoft&nbsp; | &nbsp;CSE
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile:</Typography>
			<Typography paragraph>
				Title: Software Engineering Intern
				<br />
				Stipend: 80,000 INR/month
				<br />
				Time period of internship: 8 weeks
				<br />
			</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Details of internship selection rounds (All of them):
					<br />{' '}
				</Typography>{' '}
				It had 3 questions, mostly standard/previously asked questions and u have 90min to solve. Everyone may
				not get the same questions.
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
