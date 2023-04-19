import React from 'react'
import Axios from 'axios'

import { studentUpdateBasicData, allEligibilityDegrees, eligibilityDegreesLabels } from '../../constants/addresses'

import Fade from '@material-ui/core/Fade'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableHead from '@material-ui/core/TableHead'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Grow from '@material-ui/core/Grow'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import Container from '@material-ui/core/Container'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'

import CheckboxTree from 'react-checkbox-tree'

import AddIcon from '@material-ui/icons/Add'
import MinusIcon from '@material-ui/icons/Remove'
import SaveIcon from '@material-ui/icons/Save'
import ResetIcon from '@material-ui/icons/Restore'

import 'react-checkbox-tree/lib/react-checkbox-tree.css'

const TableCellTextBox = (props) => {
	const value = () => {
		if (props.value === null || props.value === undefined) return ''
		if (props.value === 'null') return ''
		return props.value
	}

	return (
		<TableCell style={{ minWidth: 120 }}>
			<TextField
				disabled={props.disabled}
				label={props.label}
				type={props.type || 'text'}
				fullWidth
				size="small"
				autoComplete="off"
				margin="none"
				name={props.id}
				variant={props.variant || 'outlined'}
				onChange={props.onChange}
				value={value()}
			></TextField>
		</TableCell>
	)
}

const CurrentDegreeSelector = (props) => {
	const [loading, setLoading] = React.useState(true)
	const [allDegrees, setAllDegrees] = React.useState()
	const [open, setOpen] = React.useState(false)
	const [checkedState, setCheckedState] = React.useState(props.Department)
	const [expandedState, setExpandedState] = React.useState([])
	const config = { headers: { Authorization: `BEARER ${props.accessToken}` } }

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = async () => {
		setOpen(false)
		props.setLoading(true)
		const res = await Axios.post(eligibilityDegreesLabels, checkedState).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		props.setDepartmentLabel(res.data)
		props.setLoading(false)
		props.setDepartment(checkedState)
	}

	React.useEffect(() => {
		Axios.get(allEligibilityDegrees, config)
			.then((res) => {
				setAllDegrees(res.data.message)
				setCheckedState(props.Department)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		Axios.post(eligibilityDegreesLabels, props.Department)
			.then(({ data }) => props.setDepartmentLabel(data))
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	if (loading) {
		return (
			<Container
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<CircularProgress />
			</Container>
		)
	}
	return (
		<Container>
			<Button variant="outlined" onClick={handleClickOpen}>
				{'Select degree'}
			</Button>
			<Dialog maxWidth="lg" disableBackdropClick fullWidth open={open} onClose={handleClose}>
				<DialogTitle>Select Here</DialogTitle>
				<DialogContent style={{ minHeight: 300 }}>
					<CheckboxTree
						showExpandAll
						// icons={{
						// 	check: <FontAwesomeIcon className="rct-icon rct-icon-check" icon="check-square" />,
						// 	uncheck: <FontAwesomeIcon className="rct-icon rct-icon-uncheck" icon={['fas', 'square']} />,
						// 	halfCheck: <FontAwesomeIcon className="rct-icon rct-icon-half-check" icon="minus-square" />,
						// 	expandClose: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-expand-close" icon="chevron-right" />
						// 	),
						// 	expandOpen: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-expand-open" icon="chevron-down" />
						// 	),
						// 	expandAll: <FontAwesomeIcon className="rct-icon rct-icon-expand-all" icon="plus-square" />,
						// 	collapseAll: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-collapse-all" icon="minus-square" />
						// 	),
						// 	parentClose: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
						// 	parentOpen: (
						// 		<FontAwesomeIcon className="rct-icon rct-icon-parent-open" icon="folder-open" />
						// 	),
						// 	leaf: <FontAwesomeIcon className="rct-icon rct-icon-parent-close" icon="folder" />,
						// }}
						iconsClass="fa5"
						expandOnClick
						onClick={() => {}}
						nodes={allDegrees}
						checked={checkedState}
						expanded={expandedState}
						onCheck={(checked) => setCheckedState(checked)}
						onExpand={(expanded) => setExpandedState(expanded)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant="contained" color="primary">
						OK
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

const AcademicInfo = (props) => {
	const [Data, setDataActual] = React.useState(props.fetchedData)
	const [Degrees, setDegreesActual] = React.useState(JSON.parse(JSON.stringify(props.fetchedData.degrees)))
	const [Department, setDepartmentActual] = React.useState(props.fetchedData.atiith.map((item) => item.degree))
	const [DepartmentLabel, setDepartmentLabel] = React.useState([])
	const [dataChanged, setDataChanged] = React.useState(false)
	const [Message, setMessage] = React.useState('You can edit the information below')
	const [deletedDegreeIds, setDeletedDegreeIds] = React.useState([])
	const [atIITH, setAtIITHActual] = React.useState(props.fetchedData.atiith)

	React.useEffect(() => {
		setDataActual(props.fetchedData)
		setDeletedDegreeIds([])
		const newDepartment = props.fetchedData.atiith.map((item) => item.degree)
		//console.log(newDepartment)
		setDepartmentActual(newDepartment)
		setAtIITH(props.fetchedData.atiith)
		setDegreesActual(JSON.parse(JSON.stringify(props.fetchedData.degrees)))
		// eslint-disable-next-line
	}, [props.updated, props.fetchedNewData])

	const setAtIITH = (data) => {
		if (!dataChanged) setDataChanged(true)
		setAtIITHActual(data)
	}

	const setDepartment = (data) => {
		//console.log(data)
		const departmentCopy = JSON.parse(JSON.stringify(Department))
		const newAtIITH = []
		data = data.map((item) => parseInt(item))
		data.map((item) => {
			var abc = false
			abc = departmentCopy.includes(item)
			if (!abc) {
				newAtIITH.push({ degree: item, CGPA: '', Passing_Year: '' })
			} else {
				atIITH.map((item2) => {
					if (item === item2.degree) {
						newAtIITH.push(item2)
					}
					return 0
				})
			}
			return 0
		})
		setAtIITH(newAtIITH)
		setDepartmentActual(data)
		if (!dataChanged) setDataChanged(true)
		setMessage('You can edit the information below')
	}

	const setData = (data) => {
		if (!dataChanged) setDataChanged(true)
		setDataActual(data)
		setMessage('You can edit the information below')
	}

	const setDegrees = (data) => {
		if (!dataChanged) setDataChanged(true)
		setDegreesActual(data)
		setMessage('You can edit the information below')
	}

	const handleChange = (event) => {
		event.preventDefault()
		const Data2 = JSON.parse(JSON.stringify(Data))
		if (event.target.value === '') Data2[event.target.name] = null
		else Data2[event.target.name] = event.target.value
		setData(Data2)
	}

	const handleChangeDegree = (event, key) => {
		event.preventDefault()
		const newDegrees = JSON.parse(JSON.stringify(Degrees))
		newDegrees[key][event.target.name] = event.target.value
		setDegrees(newDegrees)
	}

	const handleAddDegree = (degree) => {
		const newDegree = {
			Degree: '',
			Passing_Year: '',
			INSTITUTE: '',
			BOARD: '',
			Marks: '',
		}
		if (degree) newDegree.Degree = degree
		const newDegrees = JSON.parse(JSON.stringify(Degrees))
		newDegrees.push(newDegree)
		setDegrees(newDegrees)
		setMessage('Fill all fields before saving')
	}

	const handleDeleteDegree = (degreeId, degreekey) => {
		if (degreeId === undefined) {
			const newDegrees = []
			Degrees.map((degree, key) => {
				if (degreekey !== key) newDegrees.push(degree)
				return 0
			})
			setDegrees(newDegrees)
			return
		}

		const newDegrees = []
		const newDeletedDegreeIds = JSON.parse(JSON.stringify(deletedDegreeIds))
		newDeletedDegreeIds.push(degreeId)
		setDeletedDegreeIds(newDeletedDegreeIds)
		const deletedDegree = {
			id: degreeId,
			Passing_Year: null,
			Degree: null,
			INSTITUTE: null,
			BOARD: null,
			Marks: null,
		}
		Degrees.map((degree) => {
			if (degree.id === degreeId) newDegrees.push(deletedDegree)
			else newDegrees.push(degree)
			return 0
		})
		setDegrees(newDegrees)
	}

	const validateAtIITH = () => {
		var result = true
		atIITH.map((item) => {
			if (!item.degree || item.CGPA === '' || item.Passing_Year === '') {
				setMessage('Fill all fields in Current degree at IITH')
				result = false
			}
			if (item.CGPA > 10 || item.CGPA < 0) {
				setMessage('Enter valid CGPA')
				result = false
			}
			if (item.Passing_Year > 2100 || item.Passing_Year < 2000) {
				result = false
				setMessage('Enter valid year')
			}
			return 0
		})
		return result
	}

	const handleSave = async () => {
		const Data2 = JSON.parse(JSON.stringify(Data))
		const newDegrees = []
		Degrees.map((degree) => {
			if (
				degree.Degree !== null &&
				degree.INSTITUTE !== null &&
				degree.Passing_Year !== null &&
				degree.Marks !== null
			) {
				newDegrees.push(degree)
			}
			return 0
		})
		Data2.degrees = Degrees
		Data2.token = props.parentProps.studentCredentials.accessToken
		Data2.department = Department

		if (!validateAtIITH()) return

		Data2.atiith = atIITH
		setMessage('Saving.....')
		const config = {
			headers: { Authorization: `BEARER ${props.parentProps.studentCredentials.accessToken}` },
		}
		const res = await Axios.post(studentUpdateBasicData, Data2, config).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (res.data.success) {
			props.updateData()
			setDegrees(newDegrees)
		}
		setDataChanged(false)
		setMessage(res.data.message)
	}

	const handleReset = () => {
		setDataActual(props.fetchedData)
		props.updateData()
		setDataChanged(false)
		setMessage('Reset successful')
	}

	const handleChangeDepartment = (value, attr, key) => {
		const newAtIITH = JSON.parse(JSON.stringify(atIITH))
		newAtIITH[key][attr] = value
		setAtIITH(newAtIITH)
	}

	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 30 }}>
				<Backdrop unmountOnExit style={{ color: 'black', zIndex: 1000 }} open={!props.fetchedNewData}>
					<CircularProgress style={{ color: 'white' }} />
				</Backdrop>
				<ButtonGroup disabled={Message === 'Saving.....'}>
					<Button
						startIcon={<SaveIcon />}
						disabled={!dataChanged}
						variant="contained"
						color="primary"
						onClick={handleSave}
					>
						Save
					</Button>
					<Button
						startIcon={<ResetIcon />}
						disabled={!dataChanged}
						variant="contained"
						color="secondary"
						onClick={handleReset}
					>
						Reset
					</Button>
				</ButtonGroup>
				<Typography style={{ color: 'red', padding: 10 }}>{Message}</Typography>
				<TableContainer style={{ width: '100%', margin: 30, marginTop: 0 }} component={Paper}>
					<Typography variant="subtitle1" style={{ padding: 30, paddingBottom: 0 }}>
						Schooling Details
					</Typography>
					<Table style={{ width: '100%' }}>
						<TableHead>
							<TableRow>
								<TableCell align="center"></TableCell>
								<TableCell type="number" align="center">
									Passing Year
								</TableCell>
								<TableCell align="center">Board</TableCell>
								<TableCell align="center">School</TableCell>
								<TableCell type="number" align="center">
									Percentage/CGPA
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							<TableRow>
								<TableCell>
									<Typography variant="button">XII</Typography>
								</TableCell>
								<TableCellTextBox
									type="number"
									id="Passing_Year_XII"
									onChange={handleChange}
									value={Data.Passing_Year_XII}
								/>
								<TableCellTextBox id="Board_XII" onChange={handleChange} value={Data.Board_XII} />
								<TableCellTextBox id="School_XII" onChange={handleChange} value={Data.School_XII} />
								<TableCellTextBox
									type="number"
									id="Marks_XII"
									onChange={handleChange}
									value={Data.Marks_XII}
								/>
							</TableRow>
							<TableRow>
								<TableCell>
									<Typography variant="button">X</Typography>
								</TableCell>
								<TableCellTextBox
									type="number"
									id="Passing_Year_X"
									onChange={handleChange}
									value={Data.Passing_Year_X}
								/>
								<TableCellTextBox id="Board_X" onChange={handleChange} value={Data.Board_X} />
								<TableCellTextBox id="School_X" onChange={handleChange} value={Data.School_X} />
								<TableCellTextBox
									type="number"
									id="Marks_X"
									onChange={handleChange}
									value={Data.Marks_X}
								/>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
				{Department.find((degree) => parseInt(degree) >= 1000000 && parseInt(degree) < 2000000 && parseInt(degree) !== 7000000) && (
					<TableContainer
						style={{ width: '100%', margin: 30, marginTop: 0, minHeight: 150 }}
						component={Paper}
					>
						<Typography variant="subtitle1" style={{ padding: 30, paddingBottom: 0 }}>
							JEE Ranks
						</Typography>
						<Table>
							<TableBody>
								<TableRow>
									<TableCellTextBox
										label="JEE Advanced Rank"
										type="number"
										id="JEE_Advanced_Rank"
										onChange={handleChange}
										value={Data.JEE_Advanced_Rank}
									/>
									<TableCellTextBox
										label="JEE Advanced Category Rank"
										type="number"
										id="JEE_Advanced_Cat_Rank"
										onChange={handleChange}
										value={Data.JEE_Advanced_Cat_Rank}
									/>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				)}
				<TableContainer style={{ width: '100%', margin: 30, marginTop: 0 }} component={Paper}>
					<Typography variant="subtitle1" style={{ padding: 30, paddingBottom: 0 }}>
						Current degree at IITH
					</Typography>
					<Container style={{ minHeight: 60 }}>
						<CurrentDegreeSelector
							accessToken={props.parentProps.studentCredentials.accessToken}
							Department={atIITH.map((item) => item.degree)}
							setDepartment={setDepartment}
							DepartmentLabel={DepartmentLabel}
							setDepartmentLabel={setDepartmentLabel}
							newSnack={props.newSnack}
							setLoading={props.setLoading}
							updated={props.updated}
						/>
					</Container>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Degree</TableCell>
								<TableCell>CGPA (till the last sem)</TableCell>
								<TableCell>Passing Year</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{atIITH.map((item, key) =>
								item.degree === undefined ? (
									<></>
								) : (
									<TableRow key={key}>
										<TableCell>
											{props.parentProps.eligibilityLookupTableData[item.degree]}
										</TableCell>
										<TableCell>
											<TextField
												onChange={(e) => handleChangeDepartment(e.target.value, 'CGPA', key)}
												variant="outlined"
												type="number"
												size="small"
												value={atIITH[key].CGPA}
											/>
										</TableCell>
										<TableCell>
											<TextField
												onChange={(e) =>
													handleChangeDepartment(e.target.value, 'Passing_Year', key)
												}
												variant="outlined"
												type="number"
												size="small"
												value={atIITH[key].Passing_Year}
											/>
										</TableCell>
									</TableRow>
								)
							)}
						</TableBody>
					</Table>
				</TableContainer>
				<TableContainer style={{ width: '100%', margin: 30, marginTop: 0 }} component={Paper}>
					<Typography variant="subtitle1" style={{ padding: 30, paddingBottom: 0 }}>
						Education details prior to IITH (Only for P.G. Students)
					</Typography>
					<Table style={{ width: '100%' }}>
						<TableHead>
							<TableRow>
								<TableCell align="center">Degree</TableCell>
								<TableCell align="center">Passing Year</TableCell>
								<TableCell align="center">Institute</TableCell>
								<TableCell align="center">Board</TableCell>
								<TableCell align="center">Percentage/CGPA</TableCell>
								<TableCell align="center"></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{Degrees.map((degree, key) => {
								if (
									degree.Degree !== '' &&
									degree.INSTITUTE !== '' &&
									degree.Passing_Year !== '' &&
									degree.Marks !== ''
								)
									if (deletedDegreeIds.includes(degree.id))
										return <React.Fragment key={key}></React.Fragment>
								return (
									<Grow key={key} in mountOnEnter unmountOnExit>
										<TableRow>
											<TableCellTextBox
												id="Degree"
												onChange={(e) => handleChangeDegree(e, key)}
												value={degree.Degree}
											/>
											<TableCellTextBox
												type="number"
												id="Passing_Year"
												onChange={(e) => handleChangeDegree(e, key)}
												value={degree.Passing_Year}
											/>
											<TableCellTextBox
												id="INSTITUTE"
												onChange={(e) => handleChangeDegree(e, key)}
												value={degree.INSTITUTE}
											/>
											<TableCellTextBox
												id="BOARD"
												onChange={(e) => handleChangeDegree(e, key)}
												value={degree.BOARD}
												disabled={degree.Degree !== 'X' && degree.Degree !== 'XII'}
												variant={degree.Degree !== 'X' && degree.Degree !== 'XII' && 'filled'}
											/>
											<TableCellTextBox
												type="number"
												id="Marks"
												onChange={(e) => handleChangeDegree(e, key)}
												value={degree.Marks}
											/>
											<TableCell align="center">
												<Tooltip title="Remove">
													<IconButton onClick={() => handleDeleteDegree(degree.id, key)}>
														<MinusIcon style={{ color: 'black' }} />
													</IconButton>
												</Tooltip>
											</TableCell>
										</TableRow>
									</Grow>
								)
							})}
							<TableRow>
								<TableCell />
								<TableCell />
								<TableCell />
								<TableCell />
								<TableCell />
								{/* <TableCell align="center">
									<Tooltip title="Add X class">
										<IconButton onClick={() => handleAddDegree('X')}>X</IconButton>
									</Tooltip>
								</TableCell>
								<TableCell align="center">
									<Tooltip title="Add XII class">
										<IconButton onClick={() => handleAddDegree('XII')}>XII</IconButton>
									</Tooltip>
								</TableCell> */}
								<TableCell>
									<Tooltip title="Add degree">
										<IconButton onClick={() => handleAddDegree()}>
											<AddIcon style={{ color: 'black' }} />
										</IconButton>
									</Tooltip>
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>
				</TableContainer>
			</div>
		</Fade>
	)
}

export default AcademicInfo
