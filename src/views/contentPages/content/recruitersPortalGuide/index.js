import { AllImages } from './images'

const { walkthrough, gettingStarted, walkthroughButtons } = require('./descriptions.json')

export const WalkthroughPage = AllImages.map((image, index) => ({
	pic: image,
	info: `Step-${index + 1}`,
	description: walkthrough[index],
	button1: walkthroughButtons[2 * index],
	button2: walkthroughButtons[2 * index + 1],
}))

const GettingStartedImages = [
	AllImages[0],
	AllImages[1],
	AllImages[2],
	AllImages[3],
	AllImages[4],
	AllImages[5],
	AllImages[6],
	AllImages[7],
	AllImages[8],
	AllImages[9],
	AllImages[10],
	AllImages[11],
	AllImages[12],
	AllImages[13],
	AllImages[14],
	AllImages[15],
	AllImages[16],
]

export const GettingStartedPage = GettingStartedImages.map((image, index) => ({
	pic: image,
	info: `Step-${index + 1}`,
	description: gettingStarted[index],
}))
