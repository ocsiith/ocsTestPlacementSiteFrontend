import React from 'react'
import Card from '@material-ui/core/Card'
import Typography from '@material-ui/core/Typography'
const Newsupdatesevents = () => {
	React.useEffect(() => {
		var height1 = document.getElementById('welcome1')

		// var height2 = document.getElementById('welcome2')
		var height3 = document.getElementById('welcome3')
		var height = 0

		if (height1.clientHeight > height) height = height1.clientHeight
		// if (height2.clientHeight > height) height = height2.clientHeight
		if (height3.clientHeight > height) height = height3.clientHeight
		// console.log(height + height3.clientHeight)
		height1.style.height = height + 'px'
		// height2.style.height = height + 'px'
		height3.style.height = height + 'px'
	})
	return (
		<div style={{ display: 'flex', justifyContent: 'center' }}>
			<div className="updatesevents">
				<div className="welcomenews">
					<Typography variant="h4">
						<center>News</center>
						<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
					</Typography>
					<br />
					<Card id="welcome1">
						<Typography
							variant="h5"
							style={{
								fontSize: '1.2em',
								backgroundColor: '#002238',
								color: 'White',
								padding: '5%',
								boxShadow: '0px 0px 4px black',
							}}
						>
							<center>6 Month Internships</center>
						</Typography>
						<ul className="newscard">
							<li>Btech students can now pursue a 6 month Internship at any firm or university</li>
							<li>IIT Hyderabad is the first IIT to include a 6 month internship in the curriculum.</li>
						</ul>
					</Card>
				</div>
				{/* <div className="welcomeupdates">
				<Typography variant="h4">
					<center>Updates</center>
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
				</Typography>
				<br />
				<Card id="welcome2">
					<Typography
						variant="h5"
						style={{
							fontSize: '1.2em',
							backgroundColor: '#002238',
							color: 'White',
							padding: '5%',
							boxShadow: '0px 0px 4px black',
						}}
					>
						<center>Company Portal is live</center>
					</Typography>
					<p className="newscard">
						Companies planning to hire Interns can now register at recruiter portal.
						<br />
						<a href="https://ocs.iith.ac.in/login/company/register" className="tounderline  tounderline1">
							{' '}
							Click Here
						</a>{' '}
						to Register your company.
					</p>
				</Card>
			</div> */}
				<div className="welcomeevents">
					<Typography variant="h4">
						<center>Events</center>
						<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
					</Typography>
					<br />

					<Card id="welcome3">
						<Typography
							variant="h5"
							style={{
								fontSize: '1.2em',
								backgroundColor: '#002238',
								color: 'White',
								padding: '5%',
								boxShadow: '0px 0px 4px black',
							}}
						>
							<center>Webinar on Profile building</center>
						</Typography>
						<p className="newscard">
							Webinar was taken by P.N Santosh (CEO and Founder of Career Labs), educating people about
							different career paths
						</p>{' '}
					</Card>
				</div>
			</div>
		</div>
	)
}
export default Newsupdatesevents
