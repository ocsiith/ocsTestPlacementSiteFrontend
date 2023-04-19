import React from 'react'

import EmailLinkExpiredPage from './emailLinkExpired'
import EmailVerifiedPage from './emailVerified'
import ForgotPassFailedPage from './forgotPasswordFailed'
import ForgotPassSuccessPage from './forgotPasswordSuccess'

import { Route } from 'react-router-dom'

const currentAddress = '/auth20/verify/'

const StaticPages = (props) => {
	return (
		<>
			<Route path={currentAddress + 'emailexpired'} exact>
				<EmailLinkExpiredPage />
			</Route>
			<Route path={currentAddress + 'emailverified'} exact>
				<EmailVerifiedPage />
			</Route>
			<Route path={currentAddress + 'forgotpassfail'} exact>
				<ForgotPassFailedPage />
			</Route>
			<Route path={currentAddress + 'forgotpasssuccess'} exact>
				<ForgotPassSuccessPage />
			</Route>
		</>
	)
}

export default StaticPages
