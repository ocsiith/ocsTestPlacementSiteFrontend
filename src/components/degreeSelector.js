import React from 'react'

import CheckboxTree from 'react-checkbox-tree'
import Axios from 'axios'

import { allEligibilityDegrees } from '../constants/addresses'
import { placementStaffAddBranchesToListing } from '../views/placementCellPortal/index'

import {
	Container,
	Button,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	CircularProgress,
} from '@material-ui/core'
import { useConfirm } from 'material-ui-confirm'

const DegreeSelector = (props) => {
	const [loading, setLoading] = React.useState(true)
	const [allDegrees, setAllDegrees] = React.useState()
	const [open, setOpen] = React.useState(false)
	const [checkedState, setCheckedState] = React.useState(props.Department)
	const [expandedState, setExpandedState] = React.useState([])
	const confirm = useConfirm()

	const handleClickOpen = () => {
		setOpen(true)
	}
	const handleClose = async () => {
		setOpen(false)
		props.setDepartment(checkedState)
	}

	React.useEffect(() => {
		Axios.get(allEligibilityDegrees)
			.then((res) => {
				// console.log(res)
				setAllDegrees(res.data.message)
				setCheckedState(props.Department)
				setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	React.useEffect(() => {
		props.setDepartment(checkedState)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [checkedState])

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
					{props.properties && (
						<Button
							onClick={() =>
								confirm()
									.then(() => {
										props.properties.setLoading(true)
										Axios.post(
											placementStaffAddBranchesToListing,
											{ id: props.properties.id, branches: props.Department },
											props.properties.config
										)
											.then(({ data }) => {
												if (data.success) props.properties.updateData()
												props.properties.newSnack(data.message, data.success ? 'info' : 'error')
												props.properties.setLoading(false)
											})
											.catch((error) => {
												console.error(error)
												props.properties.newSnack('Connection Error', 'error')
											})
									})
									.catch(() => {})
							}
							variant="contained"
							color="primary"
						>
							Confirm
						</Button>
					)}
					<Button onClick={handleClose} variant="contained" color="primary">
						{props.properties ? 'Close' : 'OK'}
					</Button>
				</DialogActions>
			</Dialog>
		</Container>
	)
}

export default DegreeSelector
