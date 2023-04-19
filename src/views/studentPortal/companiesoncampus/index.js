import React, { forwardRef } from 'react'
import Axios from 'axios'
import { Link, Route } from 'react-router-dom'

import { studentListAllListings, studentCVName } from '../../../constants/addresses'

import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

import { makeStyles } from '@material-ui/core/styles'

import MaterialTable from 'material-table'

import CompanyDetails from './companyDetails'

import AddBoxIcon from '@material-ui/icons/AddBox'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import CheckIcon from '@material-ui/icons/Check'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ClearIcon from '@material-ui/icons/Clear'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit'
import FilterListIcon from '@material-ui/icons/FilterList'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import LastPageIcon from '@material-ui/icons/LastPage'
import RemoveIcon from '@material-ui/icons/Remove'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import SearchIcon from '@material-ui/icons/Search'
import ViewColumnIcon from '@material-ui/icons/ViewColumn'
import IconButton from '@material-ui/core/IconButton'

const tableIcons = {
	Add: forwardRef((props, ref) => <AddBoxIcon {...props} ref={ref} />),
	Check: forwardRef((props, ref) => <CheckIcon {...props} ref={ref} />),
	Clear: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
	Delete: forwardRef((props, ref) => <DeleteOutlineIcon {...props} ref={ref} />),
	DetailPanel: forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
	Edit: forwardRef((props, ref) => <EditIcon {...props} ref={ref} />),
	Export: forwardRef((props, ref) => <SaveAltIcon {...props} ref={ref} />),
	Filter: forwardRef((props, ref) => <FilterListIcon {...props} ref={ref} />),
	FirstPage: forwardRef((props, ref) => <FirstPageIcon {...props} ref={ref} />),
	LastPage: forwardRef((props, ref) => <LastPageIcon {...props} ref={ref} />),
	NextPage: forwardRef((props, ref) => <ChevronRightIcon {...props} ref={ref} />),
	PreviousPage: forwardRef((props, ref) => <ChevronLeftIcon {...props} ref={ref} />),
	ResetSearch: forwardRef((props, ref) => <ClearIcon {...props} ref={ref} />),
	Search: forwardRef((props, ref) => <SearchIcon {...props} ref={ref} />),
	SortArrow: forwardRef((props, ref) => <ArrowDownwardIcon {...props} ref={ref} />),
	ThirdStateCheck: forwardRef((props, ref) => <RemoveIcon {...props} ref={ref} />),
	ViewColumn: forwardRef((props, ref) => <ViewColumnIcon {...props} ref={ref} />),
}

const useStyles = makeStyles((theme) => ({
	paper: {
		width: 300,
	},
	backdrop: {
		width: '100%',
		height: '100%',
	},
}))

const currentAddress = '/login/student/portal/allcompanies'

const AllCompanies = (props) => {
	const classes = useStyles()
	const [Data, setData] = React.useState(undefined)
	const [CVs, setCVs] = React.useState([])
	const [errorShowing, setErrorShowing] = React.useState('')
	const lookupTableData = props.parentProps.eligibilityLookupTableData
	const config = { headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` } }

	React.useEffect(() => {
		Axios.get(studentListAllListings, config)
			.then(({ data }) => {
				if (data.success === false) setErrorShowing(data.message)
				else setData(data.message || [])
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		Axios.get(studentCVName, config)
			.then(({ data }) => {
				if (data.success === true) setCVs(data.message)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	if (errorShowing)
		return (
			<Backdrop className={classes.backdrop} unmountOnExit style={{ color: 'black', zIndex: 1000 }} open>
				<Typography style={{ color: 'yellow' }}>{errorShowing}</Typography>
			</Backdrop>
		)

	if (Data === undefined)
		return (
			<Backdrop className={classes.backdrop} unmountOnExit style={{ color: 'black', zIndex: 1000 }} open>
				<CircularProgress style={{ color: 'white' }} />
			</Backdrop>
		)

	return (
		<React.Fragment>
			{Data.map((listing, key) => {
				return (
					<Route key={key} path={currentAddress + '/' + listing.id}>
						<CompanyDetails
							CVs={CVs}
							newSnack={props.newSnack}
							eligibilityLookupTableData={lookupTableData}
							setLoading={props.setLoading}
							updateData={props.updateData}
							accessToken={props.parentProps.studentCredentials.accessToken}
							updated={props.updated}
							data={listing}
							studentData = {props.fetchedData.atiith}
							placement={props.fetchedData.placement}
						/>
					</Route>
				)
			})}

			<Route path={currentAddress} exact>
				<Fade in={true} mountOnEnter unmountOnExit>
					<div>
						<div style={{ padding: 15 }} />
						<MaterialTable
							icons={tableIcons}
							columns={[
								{ title: 'Company', field: 'Name_of_the_company' },
								{ title: 'Title', field: 'Job_Title' },
								{
									title: 'Deadline',
									field: 'deadline',
									defaultSort: 'asc',
									render: (rowData) => {
										if (!rowData.deadline) return 'TBA'
										return new Date(rowData.deadline).toLocaleString()
									},
									customSort: ({ deadline: a }, { deadline: b }) => {
										let a2, b2
										if (!a || new Date() > new Date(a)) a2 = '3000-01-01'
										else a2 = a
										if (!b || new Date() > new Date(b)) b2 = '3000-01-01'
										else b2 = b
										if (new Date(a2) <= new Date(b2)) return -1
										if (new Date(a2) > new Date(b2)) return +1
										return 0
									},
								},
								// { title: 'Internship Type', field: 'Internship_Type' },
								{
									title: 'Eligibility',
									field: 'Job_Eligibledegrees',
									render: (rowData) => {
										//console.log("roeData: " , rowData)
										var result = false
										var res2 = false
										props.fetchedData.atiith.map((item) => {
											if (rowData.Job_Eligibledegrees.indexOf(item.degree.toString()) > -1) {
												res2 = true
											}
											return 0
										})
										rowData.Salary_Details.forEach((item) => {
											props.fetchedData.atiith.forEach((degree) => {
												if (
													parseInt(degree.degree / 10 ** 6) ===
													parseInt(parseInt(item.name_of_programme) / 10 ** 6)
												) {
													if (
														degree.degree.toString().substr(0, 3) !== '137' &&
														degree.degree.toString().substr(0, 3) !== '139'
													) {
														if (degree.CGPA >= item.MinCGPA) result = true
													}
												}
											})
										})
										result = res2 ? result : false
										return result ? 'Yes' : 'No'
									},
									customFilterAndSearch: (term, rowData) => {
										var result = false
										var res2 = false
										props.fetchedData.atiith.map((item) => {
											if (rowData.Job_Eligibledegrees.indexOf(item.degree.toString()) > -1) {
												res2 = true
											}
											return 0
										})
										rowData.Salary_Details.forEach((item) => {
											props.fetchedData.atiith.forEach((degree) => {
												if (
													parseInt(degree.degree / 10 ** 6) ===
													parseInt(parseInt(item.name_of_programme) / 10 ** 6)
												) {
													if (
														degree.degree.toString().substr(0, 3) !== '137' &&
														degree.degree.toString().substr(0, 3) !== '139'
													) {
														if (degree.CGPA >= item.MinCGPA) result = true
													}
												}
											})
										})
										result = res2 ? result : false
										if ('yes'.includes(term.toLowerCase())) if (result) return true
										if ('no'.includes(term.toLowerCase())) if (!result) return true
										return false
									},
									defaultFilter: 'Yes',
								},
								// ].filter(item => props.fetchedData.placement ? item.field !== "Internship_Type" : true)}
								{
									title: 'Registration Open',
									field: 'Registration',
									lookup: { true: 'Yes', false: 'No' },
								},
								{
									title: 'Applied',
									field: 'registered',
									render: (rowData) => (rowData.registered ? 'Yes' : 'No'),
									customFilterAndSearch: (term, rowData) => {
										let filter = false
										if ('yes'.includes(term.toLowerCase())) filter = true
										if ('no'.includes(term.toLowerCase())) filter = false
										if (rowData.registered === filter) return true
										else return false
									},
									defaultFilter: 'No',
								},
								{
									title: '',
									render: ({ id }) => (
										<Link to={currentAddress + '/' + id}>
											<IconButton variant="outlined">
												<ChevronRightIcon />
											</IconButton>
										</Link>
									),
								},
							]}
							data={Data}
							title="Companies"
							options={{
								filtering: true,
								actionsColumnIndex: -1,
								search: false,
								pageSize: Data.length,
								pageSizeOptions: [5, 10, 20, 50, 100, Data.length],
							}}
						/>
					</div>
				</Fade>
			</Route>
		</React.Fragment>
	)
}

export default AllCompanies
