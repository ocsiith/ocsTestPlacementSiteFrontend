import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import Axios from 'axios'

import ReCAPTCHA from 'react-google-recaptcha'
import { reCaptchaClientKey } from '../../constants/keys'
import { companyLoginAddress } from '../../constants/addresses'

import BackgroundChanger from '../../components/backgroundChanger'
//Mui dependencies
import Container from '@material-ui/core/Container'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'

const LoginBtn = (props) => {
	const history = useHistory()
	if (props.success) {
		setTimeout(() => history.push('/login/company/portal'), 0)
	}
	return (
		<Button disabled={props.disabled} fullWidth color="primary" variant="contained" onClick={props.onClick}>
			{props.disabled ? <CircularProgress /> : 'Login'}
		</Button>
	)
}

class CompanyLogin extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			formEmail: '',
			formPasswd: '',
			errorEmailHelper: '',
			errorPasswdHelper: '',
			validEmail: true,
			validPasswd: true,
			captchaToken: '',
			loggingInPromisePending: false,
			loginSuccess: false,
			serverResMsg: '',
		}
	}

	recaptchaRef = React.createRef()
	loginHandler = async () => {
		const f = this.state
		if (
			f.formEmail &&
			f.formPasswd &&
			f.validEmail &&
			f.validPasswd &&
			f.captchaToken &&
			!f.loggingInPromisePending
		) {
			const req = { email: f.formEmail, password: f.formPasswd, captcha: f.captchaToken }
			this.setState({ loggingInPromisePending: true })
			setTimeout(() => {
				this.state.loggingInPromisePending ? console.log('Server Timed out') : console.log()
			}, 50000)
			const res = await Axios.post(companyLoginAddress, req).catch((error) => {
				console.error(error)
			})
			this.setState({
				loggingInPromisePending: false,
				serverResMsg: res.data.message,
			})
			this.recaptchaRef.current.reset()
			if (res.data.success) {
				this.props.setCompCreds(res.data)
				this.setState({ loginSuccess: true })
			}
		}
	}

	handleChange = (event) => {
		event.preventDefault()
		function validateEmail(email) {
			var re = /\S+@\S+\.\S+/
			return re.test(email)
		}

		function validatePasswd(passwd) {
			if (passwd.length < 8) return false
			else return true
		}

		if (event.target.id === 'formEmail') {
			this.setState({ formEmail: event.target.value })
			if (!validateEmail(event.target.value)) {
				this.setState({
					validEmail: false,
					errorEmailHelper: 'Enter a valid email',
				})
			} else {
				this.setState({ validEmail: true, errorEmailHelper: '' })
			}
		} else if (event.target.id === 'formPasswd') {
			this.setState({ formPasswd: event.target.value })
			if (!validatePasswd(event.target.value)) {
				this.setState({
					validPasswd: false,
					errorPasswdHelper: 'Enter atleast 8 characters',
				})
			} else {
				this.setState({ validPasswd: true, errorPasswdHelper: '' })
			}
		}
	}

	render() {
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
					<Paper
						elevation={3}
						style={{
							margin: 10,
							padding: 30,
							display: 'flex',
							width: '50%',
							minWidth: 300,
							justifyContent: 'center',
						}}
					>
						<form style={{ width: '100%' }}>
							<Typography variant="button" style={{ flexGrow: 1, margin: 10 }}>
								Company Login
							</Typography>
							<div style={{ margin: 10 }}>
								<TextField
									style={{ width: '100%' }}
									variant="outlined"
									autoComplete="on"
									error={!this.state.validEmail}
									required
									id="formEmail"
									onChange={this.handleChange}
									label="Email"
									helperText={this.state.errorEmailHelper}
								/>
							</div>
							<div style={{ margin: 10 }}>
								<TextField
									style={{ width: '100%' }}
									variant="outlined"
									autoComplete="on"
									type="password"
									error={!this.state.validPasswd}
									required
									id="formPasswd"
									onChange={this.handleChange}
									label="Password"
									helperText={this.state.errorPasswdHelper}
								/>
							</div>
							<div style={{ margin: 5, display: 'flex', justifyContent: 'space-evenly' }}>
								<Typography style={{ flexGrow: 1 }} />
								<Link to="/login/company/resetpassword">Need help?</Link>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
								}}
							>
								<ReCAPTCHA
									ref={this.recaptchaRef}
									theme="light"
									size="compact"
									sitekey={reCaptchaClientKey}
									onChange={(token) => this.setState({ captchaToken: token })}
								/>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-evenly',
								}}
							>
								<Typography style={{ color: 'red' }}>{this.state.serverResMsg}</Typography>
							</div>
							<div
								style={{
									display: 'flex',
									justifyContent: 'space-around',
									margin: 10,
								}}
							>
								<LoginBtn
									disabled={this.state.loggingInPromisePending}
									success={this.state.loginSuccess}
									onClick={this.loginHandler}
								/>
							</div>
						</form>
					</Paper>
					<Paper
						elevation={3}
						style={{
							padding: 20,
							display: 'flex',
							width: '50%',
							minWidth: 300,
							justifyContent: 'center',
							margin: 10,
						}}
					>
						<Link style={{ textDecoration: 'none' }} to="/login/company/register">
							<Button color="primary" fullWidth variant="outlined">
								Register new Company
							</Button>
						</Link>
					</Paper>
				</Container>
			</Fade>
		)
	}
}

export default CompanyLogin
