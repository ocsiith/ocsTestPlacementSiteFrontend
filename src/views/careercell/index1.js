import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { TablePagination } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'

import Tabletop from 'tabletop'

const columns = [
	{ id: 'Program name', label: 'Program name' },
	{ id: 'Description', label: 'Description' },
	{
		id: 'Countries',
		label: 'Countries',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'Time Period',
		label: 'Time Period',
		format: (value) => value.toLocaleString('en-US'),
	},
	{
		id: 'Application dates',
		label: 'Application dates',
		format: (value) => value.toFixed(2),
	},
	{
		id: 'Eligibility',
		label: 'Eligibility',
		format: (value) => value.toFixed(2),
	},
]

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		padding: '10px',
	},
	container: {
		maxHeight: 440,
	},
}))

export default function StickyHeadTable(props) {
	const classes = useStyles()
	const [data, setData] = useState([])
	const [page, setPage] = React.useState(0)
	const [rowsPerPage, setRowsPerPage] = React.useState(10)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setLoading(true)
		console.log(props)
		Tabletop.init({
			key: '1acj7XNCIQnlSWVjAGi2YgxNpS1XQuYQ664fKRn2DOps',
			simpleSheet: true,
		})
			.then((data) => {
				console.log('data :', data)
				setData(data)
				setLoading(false)
			})
			.catch((err) => {
				console.log('err :', err)
				setLoading(false)
			})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const Loading = (
		<div>
			<Backdrop open>
				<CircularProgress style={{ marginTop: '200px', color: 'white' }} />
			</Backdrop>
		</div>
	)

	const handleChangePage = (event, newPage) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<>
			<section
				style={{
					backgroundImage:
						'linear-gradient(to right, rgba(0, 30, 51, 1), rgba(0, 80, 138, 1), rgba(0, 30, 51, 1))',
					textAlign: 'center',
					width: '100%',
					height: '50vh',
				}}
			>
				<h1 style={{ color: 'white', padding: '100px', fontSize: '50px' }}>Research Programs</h1>
			</section>
			{loading ? (
				Loading
			) : (
				<>
					<Paper className={classes.root}>
						<TableContainer className={classes.container} >
							<Table stickyHeader aria-label="sticky table">
								<TableHead>
									<TableRow>
										{columns.map((column) => (
											<TableCell
												key={column.id}
												align={column.align}
												style={{
													minWidth: column.minWidth,
													backgroundColor: 'black',
													color: 'white',
												}}
											>
												{column.label}
											</TableCell>
										))}
									</TableRow>
								</TableHead>
								<TableBody>
									{data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
										return (
											<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
												{columns.map((column) => {
													const value = row[column.id]
													return (
														<TableCell key={column.id} align={column.align}>
															{column.format && typeof value === 'number'
																? column.format(value)
																: value}
														</TableCell>
													)
												})}
											</TableRow>
										)
									})}
								</TableBody>
							</Table>
						</TableContainer>
						<div style={{marginTop:"20px"}} />
						<TablePagination
							rowsPerPageOptions={[10, 25, 100]}
							component="div"
							count={data ? data.length : 0}
							rowsPerPage={rowsPerPage}
							page={page}
							onChangePage={handleChangePage}
							onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
					</Paper>
				</>
			)}
		</>
	)
}
