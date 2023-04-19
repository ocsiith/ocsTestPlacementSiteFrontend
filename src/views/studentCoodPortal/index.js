import React, { useState, createContext } from 'react'

import StudentSignInBtn from '../../components/LegacyStudentSignInBtn'

import { serverAddress } from '../../constants/addresses'

import { useHistory, Route, useLocation } from 'react-router-dom'

import Axios from 'axios'

import Portal from './portal1'

import BackgroundChanger from '../../components/backgroundChanger'
import { Backdrop, CircularProgress, Container } from '@material-ui/core'
import AllotedStudents from './allotedStudents'

const currentAddress = '/topsecreturlforstudentscoods/'

export const LoadingContext = createContext({
	loading: false,
	startLoading: () => {},
	stopLoading: () => {},
})

const StudentCoodPage = (props) => {
	const [accessToken, setAccessToken] = useState(window.sessionStorage.getItem('studentCoodToken'))
	const history = useHistory()
	const location = useLocation()
	const [loading, setLoading] = useState(false)
	const config = { headers: { Authorization: `BEARER ${accessToken}` } }

	const startLoading = () => setLoading(true)
	const stopLoading = () => setLoading(false)

	const LoadingValue = {
		loading,
		startLoading,
		stopLoading,
	}

	React.useEffect(() => {
		if (accessToken && currentAddress.includes(`${location.pathname}`))
			setTimeout(() => history.push(currentAddress + 'portal'), 0)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [accessToken])

	const responseGoogle = (res) => {
		const config = { headers: { Authorization: `BEARER ${res.tokenId}` } }
		Axios.get(studentCoodLoginAccessToken, config)
			.then(({ data }) => {
				if (data.success) {
					setAccessToken(data.token)
					window.sessionStorage.setItem('studentCoodToken', data.token)
				} else {
					props.newSnack(data.message)
				}
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
	}
	return (
		<LoadingContext.Provider value={LoadingValue}>
			<Container>
				<Backdrop
					unmountOnExit
					style={{ color: 'black', zIndex: 1000, width: '100%', height: '100%' }}
					open={loading}
				>
					<CircularProgress style={{ color: 'white' }} />
				</Backdrop>
				<BackgroundChanger backgroundColor="#F5F5F5" />
				<Route path={currentAddress} exact>
					<StudentSignInBtn
						style={{ width: '100%', height: 100, maxWidth: 400, border: '1px solid' }}
						onSuccess={responseGoogle}
						onFailure={responseGoogle}
						setLoggingIn={() => console.log('loading...')}
					/>
				</Route>
				<Route path={currentAddress + 'portal'}>
					<Portal
						eligibilityLookupTableData={props.eligibilityLookupTableData}
						newSnack={props.newSnack}
						mainPageAddress={currentAddress}
						accessToken={accessToken}
					/>
				</Route>
				<Route path={currentAddress + 'mastercvverifier'}>
					<AllotedStudents
						eligibilityLookupTableData={props.eligibilityLookupTableData}
						newSnack={props.newSnack}
						mainPageAddress={currentAddress}
						accessToken={accessToken}
						config={config}
					/>
				</Route>
			</Container>
		</LoadingContext.Provider>
	)
}

export default StudentCoodPage

export const studentCoodLoginAccessToken = serverAddress + 'co-od/login'
export const studentCoodGetCompanyDetails = serverAddress + 'co-od/companydetails'
export const studentCoodGetMyNotifications = serverAddress + 'co-od/notifications'
export const studentCoodSendNotificationToAllInternship = serverAddress + 'co-od/allnotification/0'
export const studentCoodSendNotificationToAllPlacement = serverAddress + 'co-od/allnotification/1'

export const studentCoodSendNotificationToSpecific = serverAddress + 'co-od/pernotif'
export const studentCoodGetMyNotificationsOfSpecific = serverAddress + 'co-od/pernotif'

export const studentCoodOpenRegistration = serverAddress + 'co-od/openregistration'
export const studentCoodCloseRegistration = serverAddress + 'co-od/closeregistration'

export const studentCoodDeadline = serverAddress + 'co-od/listing_deadline'
export const studentCoodAlertStudent = serverAddress + 'co-od/alert_listing_deadline'

export const studentCoodSubmitRegistrations = serverAddress + 'co-od/submitregistrations'
export const studentCoodUpdateVenue = serverAddress + 'co-od/updatevenue'

export const studentCoodUpdateContact = serverAddress + 'co-od/updatecontact'
export const studentCoodGetContact = serverAddress + 'co-od/getdetails'

export const studentCoodGetRegisteredStudents = serverAddress + 'co-od/registered/'
export const studentCoodGetShortlistStudents = serverAddress + 'co-od/shortlist/'

export const studentCoodPutEmptyList = serverAddress + 'co-od/emptylist'

export const studentCoodMarkAsVerifiedOrRemark = serverAddress + 'co-od/verifymastercv'

export const studentCoodUploadRound = serverAddress + 'co-od/upload_round/'

export const companyUploadShortlist = serverAddress + 'co-od/uploadshortlist/'
export const companyGetRegisteredStudentsExcel = serverAddress + 'co-od/registeredexcel'
export const companyGetInterviewListExcel = serverAddress + 'co-od/interviewsheet/'
export const companyUploadSelectedExcel = serverAddress + 'co-od/uploadselected/'
export const companyUploadWailistExcel = serverAddress + 'co-od/uploadwaitlist/'
export const companyDownloadPlacedExcel = serverAddress + 'co-od/placedexcel/'
export const pdfCVMakerZipped = serverAddress + 'pdf/company' //////////////
export const companyUploadEmptyWailistExcel = serverAddress + 'co-od/nowaitlist'
export const companyAllProfiles = serverAddress + 'co-od/profiles'
export const companyIsItPlacement = serverAddress + 'co-od/placement_detail'

export const studentCoodInterviewState = serverAddress + 'co-od/interviewstate'

export const studentCoodListingCVs = serverAddress + 'pdf/company_shortlist' //////////////

export const studentCoodGetAllotedStudents = serverAddress + 'co-od/alloted_students'
export const studentCoodVerifyPoint = serverAddress + 'co-od/verify_cv_point'
