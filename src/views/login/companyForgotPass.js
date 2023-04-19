import React from 'react'
import Axios from 'axios'
import ReCAPTCHA from 'react-google-recaptcha'

import { companyForgotPassword, companyResendVerificationMail } from '../../constants/addresses'
import { reCaptchaClientKey } from '../../constants/keys'

import BackgroundChanger from '../../components/backgroundChanger'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Fade from '@material-ui/core/Fade'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const CompanyForgotPass = () => {
	const reCaptchaRef = React.createRef()

	const [reCaptchaToken, setReCaptchaToken] = React.useState('')
	const [validEmail, setValidEmail] = React.useState(true)
	const [emailAddress, setEmailAddress] = React.useState('')
	const [errorMsg, setErrorMsg] = React.useState('')

	const handleChange = (event) => {
		function validateEmail(email) {
			var re = /\S+@\S+\.\S+/
			return re.test(email)
		}

		if (event !== undefined) {
			setEmailAddress(event.target.value)
			if (!validateEmail(event.target.value)) setValidEmail(false)
			else {
				setValidEmail(true)
			}
		} else {
			if (emailAddress === '') {
				setValidEmail(false)
				return false
			} else {
				if (validateEmail(emailAddress)) {
					setValidEmail(true)
					return true
				}
				setValidEmail(false)
				return false
			}
		}
	}

	const handleReset = async () => {
		const reset = reCaptchaRef.current
		if (handleChange() && reCaptchaToken !== '') {
			const res = await Axios.post(companyForgotPassword, {
				email: emailAddress,
				captcha: reCaptchaToken,
			}).catch((error) => {
				console.error(error)
			})
			reset.reset()
			console.log(res.data)
			setErrorMsg(res.data.message)
		} else setErrorMsg('Some Error Occured')
	}

	const handleResend = async () => {
		const reset = reCaptchaRef.current
		if (handleChange() && reCaptchaToken !== '') {
			const res = await Axios.post(companyResendVerificationMail, {
				email: emailAddress,
				captcha: reCaptchaToken,
			}).catch((error) => {
				console.error(error)
			})
			reset.reset()
			console.log(res.data)
			setErrorMsg(res.data.message)
		} else setErrorMsg('Some Error Occured')
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<Container
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<div style={{ padding: 16 }} />
				<Accordion style={{ width: '100%' }} TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
						<Typography variant="button" style={{ flexGrow: 1, margin: 10 }}>
							Forgot Password
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div style={{ width: '100%' }}>
							<div style={{ margin: 10 }}>
								<TextField
									style={{ width: '100%' }}
									value={emailAddress}
									variant="outlined"
									error={!validEmail}
									autoComplete="new-password"
									helperText={!validEmail ? 'Enter a valid Email ID' : ''}
									required
									id="formEmail"
									onChange={handleChange}
									label="Please enter your Email ID"
								/>
							</div>
							<Typography style={{ flexGrow: 1, margin: 10, justifyContent: 'center', color: 'red' }}>
								{errorMsg}
							</Typography>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
								}}
							>
								<ReCAPTCHA
									ref={reCaptchaRef}
									theme="light"
									sitekey={reCaptchaClientKey}
									onChange={(token) => setReCaptchaToken(token)}
								/>
							</div>
							<div style={{ margin: 10, display: 'flex' }}>
								<Typography style={{ flexGrow: 1 }} />

								<Button color="primary" variant="contained" onClick={handleReset}>
									Reset Password
								</Button>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
				<Accordion style={{ width: '100%' }} TransitionProps={{ unmountOnExit: true }}>
					<AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content">
						<Typography variant="button" style={{ flexGrow: 1, margin: 10 }}>
							Resend verification mail
						</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<div style={{ width: '100%' }}>
							<div style={{ margin: 10 }}>
								<TextField
									style={{ width: '100%' }}
									value={emailAddress}
									variant="outlined"
									error={!validEmail}
									autoComplete="new-password"
									helperText={!validEmail ? 'Enter a valid Email ID' : ''}
									required
									id="formEmail"
									onChange={handleChange}
									label="Please enter your Email ID"
								/>
							</div>
							<Typography style={{ flexGrow: 1, margin: 10, justifyContent: 'center', color: 'red' }}>
								{errorMsg}
							</Typography>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
								}}
							>
								<ReCAPTCHA
									ref={reCaptchaRef}
									theme="light"
									sitekey={reCaptchaClientKey}
									onChange={(token) => setReCaptchaToken(token)}
								/>
							</div>
							<div style={{ margin: 10, display: 'flex' }}>
								<Typography style={{ flexGrow: 1 }} />

								<Button color="primary" variant="contained" onClick={handleResend}>
									Resend
								</Button>
							</div>
						</div>
					</AccordionDetails>
				</Accordion>
			</Container>
		</Fade>
	)
}

export default CompanyForgotPass
