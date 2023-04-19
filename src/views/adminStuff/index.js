import React from 'react'

import { Route, useHistory } from 'react-router-dom'

import { serverAddress } from '../../constants/addresses'

import AdminLogin from './login'
import AdminPortal from './portal'

import BackgroundChanger from '../../components/backgroundChanger'
import { Container } from '@material-ui/core'

export const topsecretlocation = '/topsecreturl/'

const AdminStuff = (props) => {
	const history = useHistory()

	const [accessToken, setAccessToken] = React.useState('')

	React.useEffect(() => {
		if (accessToken === '') setTimeout(() => history.push(topsecretlocation), 0)
		// eslint-disable-next-line
	}, [accessToken])

	const handleLogout = () => {
		setAccessToken('')
		setTimeout(() => history.push(topsecretlocation), 0)
	}

	return (
		<Container>
			<div>{accessToken === '' ? 'Not Logged in' : <button onClick={handleLogout}>Logout</button>}</div>
			<BackgroundChanger backgroundColor="#F5F5F5" />

			<Route path={topsecretlocation} exact>
				<AdminLogin accessToken={accessToken} setAccessToken={setAccessToken} />
			</Route>
			<Route path={topsecretlocation + 'portal'}>
				<AdminPortal accessToken={accessToken} />
			</Route>
		</Container>
	)
}

export default AdminStuff

export const adminLoginAddress = serverAddress + 'admin/login'
export const adminAccessCompanyDBAddress = serverAddress + 'admin/company'
export const adminAccessStudentDBAddress = serverAddress + 'admin/student'
export const adminGetStudentCoods = serverAddress + 'admin/student-co-ods'
export const adminUnassignCompany = serverAddress + 'admin/removecompany'
export const adminAssignCompany = serverAddress + 'admin/assigncompany'
export const adminCreateStudentCood = serverAddress + 'admin/createco_od'
export const adminRemoveStudentCood = serverAddress + 'admin/remove_co_od'
export const adminGetStudentCoodsList = serverAddress + 'admin/list'
export const adminGetAllSlots = serverAddress + 'admin/slots'
export const adminGetUnverifiedCompanies = serverAddress + 'admin/unverified_companies'
export const adminGetAllCompanies = serverAddress + 'admin/companydetails'
export const adminMarkAsVerifiedCompany = serverAddress + 'admin/verify_company'
export const adminGetAllCompaniesWithoutInterviewSlot = serverAddress + 'admin/waiting_interview'
export const adminCreatePlacementStaff = serverAddress + 'admin/addplacement'
export const adminAllowCompanyToDownloadInterviewList = serverAddress + 'admin/interviewstate'
export const adminAllowCompanyToUploadSelectedAndWaitLists = serverAddress + 'admin/interviewcompleted'
export const adminUpdateSlotOfListingWithExcel = serverAddress + 'admin/interviewexcel'
export const adminRunAlgo = serverAddress + 'admin/runalgo'
export const adminGenerateInterviewList = serverAddress + 'admin/generate_interview_list'

export const adminGetUnverifiedInternshipCVs = serverAddress + 'admin/unverified_cvs_list/0'
export const adminGetUnverifiedPlacementCVs = serverAddress + 'admin/unverified_cvs_list/1'

export const adminGetFlaggedInternshipCVs = serverAddress + 'admin/flagged_cvs_list/0'
export const adminGetFlaggedPlacementCVs = serverAddress + 'admin/flagged_cvs_list/1'

export const adminGetStudentCV = serverAddress + 'admin/cv/'
export const adminMarkAsVerifiedCVOrRemark = serverAddress + 'admin/verifymastercv'

export const adminLowerCGPAForListing = serverAddress + 'admin/lowercgpa'
export const adminAddBranchesToListing = serverAddress + 'admin/addbranches'

export const adminMasterCVFreezeAndSubmit = serverAddress + 'admin/freezeandsubmit'
export const adminMasterCVUpdateDeadline = serverAddress + 'admin/updatedeadline'

export const adminGetSetShortlist = serverAddress + 'admin/shortlistexcelspec/'
export const adminGetSetInterviewList = serverAddress + 'admin/interviewexcelspec/'

export const adminGetNoWaitlistListingsForSlot = serverAddress + 'admin/no_waitlist/'
export const adminMarkAsAbsent = serverAddress + 'admin/mark_company_absent'

export const adminVerifyMail = serverAddress + 'admin/verify_company_email'
export const adminRemoveProfile = serverAddress + 'admin/remove_profile'

export const adminLoginToStudent = serverAddress + 'admin/login_student'
export const adminLoginToCompany = serverAddress + 'admin/login_company'
export const adminLoginToStudentCood = serverAddress + 'admin/login_co_od'
