import React from 'react'

import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'

const Home = (props) => {
	const history = useHistory()
	return (
		<div style={{ display: 'flex', justifyContent: 'space-evenly', flexWrap: 'wrap' }}>
			{props.allPages.map((page, key) => (
				<Button
					style={{ margin: 15 }}
					variant="contained"
					key={key}
					onClick={() => setTimeout(() => history.push(page.path), 0)}
				>
					{page.name}
				</Button>
			))}
		</div>
	)
}

export default Home
