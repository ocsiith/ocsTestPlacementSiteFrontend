import styled from 'styled-components'

export const Button = styled.div`
	position: fixed;
	width: 100%;
	left: 92%;
	bottom: 60px;
	height: 20px;
	font-size: 3rem;
	z-index: 1;
	cursor: pointer;
	color: rgb(128, 128, 128, 0.85);
	overlay: 'subtract';

	@media screen and (max-width: 600px) {
		left: 85%;
	}
	@media screen and (max-width: 500px) {
		left: 80%;
	}
`
