import React from 'react'

// import { useHistory } from 'react-router-dom'
import { Route } from 'react-router-dom'

import sideBarItems from '../constants/sideBarItems'

// import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade'
// import Select from '@material-ui/core/Select'
// import MenuItem from '@material-ui/core/MenuItem'

const Welcome = () => {
	const homePageRoutes = sideBarItems[0].sections
	// const history = useHistory()
	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div style={{ width: '100%', height: '100%' }}>
				{/* <Typography style={{ display: 'flex', justifyContent: 'center' }}>WelcomePage</Typography> */}
				{/* <div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography style={{ flexGrow: 1 }} />
					<Select
						variant="outlined"
						onChange={(e) => setTimeout(() => history.push(e.target.value), 0)}
						value="default"
						labelId="demo-simple-select-label"
					>
						<MenuItem value="default">Home</MenuItem>
						{homePageRoutes.map((route, key) => (
							<MenuItem key={key} value={route.to}>
								{route.name}
							</MenuItem>
						))}
					</Select>
				</div> */}
				<Route path="/" exact>
					<Fade in>
						<div>{homePageRoutes[0].component}</div>
					</Fade>
				</Route>
				{homePageRoutes.map((route, key) => (
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

export default Welcome
