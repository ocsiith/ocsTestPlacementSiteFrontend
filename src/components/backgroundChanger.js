import React from 'react'

const BackgroundChanger = ({ background, backgroundColor }) => (
	<style
		dangerouslySetInnerHTML={{
			__html: `
				body { 
					background-image: ${'url(' + background + ')' || ''};
					background-color: ${backgroundColor || 'black'};
				} 
		    `,
		}}
	/>
)
export default BackgroundChanger
