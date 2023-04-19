import React, { useState } from 'react'
import { Container, makeStyles, Backdrop, CircularProgress } from '@material-ui/core'
import { Route, useHistory } from 'react-router-dom'

import Portal from './portal/index'
import Login from './login'
import BackgroundChanger from '../../components/backgroundChanger'

import { serverAddress } from '../../constants/addresses'

const currentAddress = '/topsecreturlforplacementstaff/'

const useStyles = makeStyles((theme) => ({
	backdrop: {
		width: '100%',
		height: '100%',
	},
}))

const PlacementCellPortal = (props) => {
	const [accessToken, setAccessToken] = useState(() => window.localStorage.getItem('PaccessToken'))
	const [updated, setUpdated] = useState(() => 0)
	const [loading, setLoading] = useState(() => false)
	const classes = useStyles()
	const history = useHistory()
	const config = { headers: { Authorization: `BEARER ${accessToken}` } }

	const updateData = () => {
		setUpdated((prevUpdated) => prevUpdated + 1)
	}

	React.useEffect(() => {
		if (accessToken === '') setTimeout(() => history.push(currentAddress), 0)
		// eslint-disable-next-line
	}, [updated])

	return (
		<Container>
			<BackgroundChanger backgroundColor="#F5F5F5" />
			<Backdrop
				className={classes.backdrop}
				unmountOnExit
				style={{ color: 'black', zIndex: 7000 }}
				open={loading}
			>
				<CircularProgress style={{ color: 'white' }} />
			</Backdrop>
			<Route path={currentAddress} exact>
				<Login
					setLoading={setLoading}
					newSnack={props.newSnack}
					updated={updated}
					updateData={updateData}
					accessToken={accessToken}
					setAccessToken={setAccessToken}
					currentAddress={currentAddress}
				/>
			</Route>
			<Route path={currentAddress + 'portal'}>
				<Portal
					parentProps={props}
					degreeLookup={props.eligibilityLookupTableData}
					setLoading={setLoading}
					newSnack={props.newSnack}
					updated={updated}
					updateData={updateData}
					accessToken={accessToken}
					config={config}
				/>
			</Route>
		</Container>
	)
}

export default PlacementCellPortal

export const placementStaffLoginAddress = serverAddress + 'placement/login'
export const placementStaffGetStudentCoods = serverAddress + 'placement/student-co-ods'
export const placementStaffUnassignCompany = serverAddress + 'placement/removecompany'
export const placementStaffAssignCompany = serverAddress + 'placement/assigncompany'
export const placementStaffRemoveStudentCood = serverAddress + 'admin/remove_co_od'
export const placementStaffCreateStudentCood = serverAddress + 'placement/createco_od'
export const placementStaffGetStudentCoodsList = serverAddress + 'placement/list'
export const placementStaffMarkAsVerifiedCompany = serverAddress + 'placement/verify_company'
export const placementStaffGetUnverifiedCompanies = serverAddress + 'placement/unverified_companies'
export const placementStaffGetAllCompanies = serverAddress + 'placement/companydetails'
export const placementStaffGetAllSlots = serverAddress + 'placement/slots'
export const placementStaffGetAllCompaniesWithoutInterviewSlot = serverAddress + 'placement/waiting_interview'

export const placementStaffGetSlotsAndCompanies = serverAddress + 'placement/slotsandcompanies'
export const placementStaffChangeSlotDetails = serverAddress + 'placement/changeslot'
export const placementAddSlot = serverAddress + 'placement/createslot'
export const placementAllotSlot = serverAddress + 'placement/allotslot'

export const placementStaffLowerCGPAForListing = serverAddress + 'placement/lowercgpa'
export const placementStaffAddBranchesToListing = serverAddress + 'placement/addbranches'

export const placementStaffGetAllStudentsPlacementExcel = serverAddress + 'placement/all_students_placement'
export const placementStaffGetAllStudentsInternshipExcel = serverAddress + 'placement/all_students_internship'
export const placementStaffPostAllStudentsFromBranchesPlacementExcel =
	serverAddress + 'placement/branch_student_placement'
export const placementStaffPostAllStudentsFromBranchesInternshipExcel =
	serverAddress + 'placement/branch_student_internship'

export const placementStaffGetAllCompaniesPlacementExcel = serverAddress + 'placement/all_companies_placement'
export const placementStaffGetAllCompaniesInternshipExcel = serverAddress + 'placement/all_companies_internship'
export const placementStaffPostAllRegisteredStudentsForListingExcel =
	serverAddress + 'placement/registered_list_for_listing/'
export const placementStaffPostAllCompaniesFromBranchesPlacementExcel =
	serverAddress + 'placement/branch_company_placement'
export const placementStaffPostAllCompaniesFromBranchesInternshipExcel =
	serverAddress + 'placement/branch_company_internship'

export const placementStaffGetShortListOfListing = serverAddress + 'placement/shortlistexcelspec/'
export const placementStaffGetInterviewListOfListing = serverAddress + 'placement/interviewexcelspec/'

export const placementStaffMarkAsAbsent = serverAddress + 'placement/mark_company_absent'

export const placementStaffLoginToCompany = serverAddress + 'placement/login_company'

export const placementStaffIncompleteCompanies = serverAddress + 'placement/incomplete'

export const placementStaffJobDescriptionFileDownload = serverAddress + 'placement/document/'

export const placementStaffGetStudentsList = serverAddress + 'placement/student_details'
export const placementStaffGetStudentDetails = serverAddress + 'placement/student_specific'
export const placementStaffVerifyMasterCVPoint = serverAddress + 'placement/verify_cv_point'
export const placementStaffVerifyPersonalDetails = serverAddress + 'placement/verifymastercv'
export const placementStaffStudentMasterCVstatus = serverAddress + 'static/Json/student_status.json'
