import React, { useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

function DisplayExp(props) {
	const [readMore, setReadMore] = useState(false)

	const extraContent = (
		<div>
			<Typography paragraph>
				{props.rounds}

				{props.preparation == null ? null : (
					<div>
						<Divider />
						<Typography variant="h6">
							What to prepare for each and every round? Any particular methodology that might help in
							preparation?
						</Typography>
						<Typography paragraph>{props.preparation}</Typography>
					</div>
				)}

				{props.experience == null ? null : (
					<div>
						<Divider />
						<Typography variant="h6">
							What material did you use for studying? Your experience of preparation (When did you start,
							challenges you faced, how did you overcome them?)
						</Typography>
						<Typography paragraph>{props.experience}</Typography>
					</div>
				)}

				{props.tips == null ? null : (
					<div>
						<Divider />
						<Typography variant="h6">Some Tips for written &amp; interview round?:</Typography>
						<Typography paragraph>{props.tips}</Typography>
					</div>
				)}
			</Typography>
		</div>
	)
	const linkName = readMore ? ' Read Less ' : ' ...Read More '

	return (
		<div className="App">
			<center>
				<Typography variant="h4">
					{' '}
					{props.name}&nbsp; | &nbsp;{props.company}&nbsp; | &nbsp;{props.branch}
				</Typography>
			</center>
			<br />
			<br />

			<Typography variant="h6">Job profile</Typography>
			<Typography paragraph>Title: {props.profile}</Typography>
			<Divider />
			<Typography paragraph>
				<Typography variant="h6">
					Tell us about the details of the placement selection rounds (All of them):
				</Typography>{' '}
				{!readMore ? props.rounds.slice(0, 100) : null}
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
export default DisplayExp
