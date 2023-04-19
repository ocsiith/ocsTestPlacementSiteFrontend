import React, { useState } from 'react'
import { FaArrowAltCircleUp } from 'react-icons/fa'
import { Button } from './Styles'
import Zoom from '@material-ui/core/Zoom'

const ScrollButton = () => {
	const [visible, setVisible] = useState(false)

	const toggleVisible = () => {
		const scrolled = document.documentElement.scrollTop
		if (scrolled > 200) {
			setVisible(true)
		} else if (scrolled <= 200) {
			setVisible(false)
		}
	}

	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		})
	}

	window.addEventListener('scroll', toggleVisible)

	return (
		<Button className="scroll-button">
			<Zoom in={visible}>
				<FaArrowAltCircleUp onClick={scrollToTop} style={{ display: visible ? 'block' : 'none' }} />
			</Zoom>
		</Button>
	)
}

export default ScrollButton
