import React from 'react'
import { withRouter } from 'react-router-dom'

const ScrollToTop = ({ location, children }) => {
	React.useEffect(() => {
		window.scrollTo(0, 0)
	}, [location])
	return <></>
}

export default withRouter(ScrollToTop)
