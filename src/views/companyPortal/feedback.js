import React, { useEffect, useState } from 'react'
import Fade from '@material-ui/core/Fade'
import { Button, Paper, Typography } from '@material-ui/core'
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import { useConfirm } from 'material-ui-confirm'
import Axios from 'axios'

import { companyFeedback } from '../../constants/addresses'

const Feedback = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.parentProps.companyCredentials.accessToken}` } }
	const confirm = useConfirm()
	const [feedback, setFeedback] = useState('')

	const handleChange = (e) => {
		let ele = document.getElementById('charcheck')
		if (e.target.value.length === 1001) {
			ele.style.display = 'block'
			return
		}
		if (ele.style.display === 'block') ele.style.display = 'none'
		setFeedback(e.target.value)
	}

	const handleSubmit = () => {
		confirm()
			.then(async () => {
				props.setLoading(true)
				const { data } = await Axios.post(companyFeedback, { feedback }, config).catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
					props.setLoading(false)
				})
				if (data.success) {
					props.newSnack(data.message, 'info')
				}
				setFeedback('')
				props.setLoading(false)
			})
			.catch(() => {})
	}

	return (
		<Fade in>
			<div>
				<div style={{ margin: 15 }} />
				<div style={{ margin: 15 }} />
				<Paper style={{ width: '100%', padding: '30px' }}>
					<Typography variant="h5" style={{ marginBottom: '20px', fontFamily: 'Roboto' }}>
						Feedback
					</Typography>
					<TextareaAutosize
						value={feedback}
						onChange={handleChange}
						style={{
							maxWidth: '100%',
							minWidth: '100%',
							minHeight: '20vh',
							padding: '10px',
							fontSize: '15px',
							fontFamily: 'Roboto',
						}}
						placeholder="Maximum 1000 characters"
					></TextareaAutosize>
					<p id="charcheck" style={{ display: 'none', color: 'red', fontSize: '12px', fontFamily: 'Roboto' }}>
						You have reached the maximum character limit
					</p>
					<div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
						<Button variant="contained" color="primary" onClick={handleSubmit} disabled={feedback === ''}>
							Submit
						</Button>
					</div>
				</Paper>
			</div>
		</Fade>
	)
}

export default Feedback
