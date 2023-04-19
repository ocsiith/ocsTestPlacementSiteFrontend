import React from 'react'
import { Route, useHistory } from 'react-router-dom'

//views
import Home from './views/home'
import AllCompanies from './views/allcomp'
import Incomplete from './views/incomplete'
import ManageStudentCoods from './views/manageStudentCoods'
import VerifyCompaniesPage from './views/verifyCompanies'
import ManageSlots from './views/slotsManagement'
import ExcelSheetsPage from './views/excelsheetspage'
import StudentManager from './views/students'

import Button from '@material-ui/core/Button'

const currentAddress = '/topsecreturlforplacementstaff/portal/'

const allPages = [
	{
		view: Home,
		name: 'Home',
		path: currentAddress,
		exact: true,
	},
	{
		view: AllCompanies,
		name: 'All Companies',
		path: currentAddress + 'allcompanies',
		exact: false,
	},
	{
		view: Incomplete,
		name: 'Incomplete',
		path: currentAddress + 'incomplete',
		exact: true,
	},
	{
		view: ManageStudentCoods,
		name: 'Manage Student Coordinaters',
		path: currentAddress + 'managestudentcoods',
		exact: true,
	},
	{
		view: VerifyCompaniesPage,
		name: 'Verify Companies',
		path: currentAddress + 'verifycompanies',
		exact: true,
	},
	{
		view: ManageSlots,
		name: 'Manage Interview Slots',
		path: currentAddress + 'slotmanagement',
		exact: true,
	},
	{
		view: ExcelSheetsPage,
		name: 'Excel Sheets',
		path: currentAddress + 'excelsheetspage',
		exact: true,
	},
	{
		view: StudentManager,
		name: 'Students',
		path: currentAddress + 'students',
		exact: false,
	},
]

const Portal = (props) => {
	const history = useHistory()
	return (
		<div>
			<div style={{ display: 'flex' }}>
				<Button variant="outlined" onClick={() => setTimeout(() => history.push(currentAddress), 0)}>
					Home
				</Button>
				<div style={{ flex: 1 }} />
				<Button
					variant="contained"
					color="secondary"
					onClick={() => setTimeout(() => history.push('/topsecreturlforplacementstaff'), 0)}
				>
					Logout
				</Button>
			</div>
			<div style={{ padding: 15 }} />
			{allPages.map((page, key) => (
				<Route key={key} path={page.path} exact={page.exact}>
					<page.view {...props} homeAddress={currentAddress} currentAddress={page.path} allPages={allPages} />
				</Route>
			))}
		</div>
	)
}

export default Portal
