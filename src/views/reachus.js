import React from 'react'

// import { useHistory } from 'react-router-dom'
import { Route } from 'react-router-dom'

import sideBarItems from '../constants/sideBarItems'

// import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'

const ReachUs = () => {
	const pageRoutes = sideBarItems[3].sections
	// const history = useHistory()

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div style={{ width: '100%', height: '100%' }}>
				{/* <Typography style={{ display: 'flex', justifyContent: 'center' }}>RecruitersCorner</Typography> */}
				{/* <div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography style={{ flexGrow: 1 }} />
					<Select
						variant="outlined"
						onChange={(e) => setTimeout(() => history.push(e.target.value), 0)}
						value="default"
						labelId="demo-simple-select-label"
					>
						<MenuItem value="default">Reach us</MenuItem>
						{pageRoutes.map((route, key) => (
							<MenuItem key={key} value={route.to}>
								{route.name}
							</MenuItem>
						))}
					</Select>
				</div> */}{' '}
				{pageRoutes.map((route, key) => (
					<Route key={key} path={route.to} exact>
						<Fade in>
							<div>{route.component}</div>
						</Fade>
					</Route>
				))}
			</div>
		</Fade>
	)
}

export default ReachUs
