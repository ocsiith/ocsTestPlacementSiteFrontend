import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

import Button from '@material-ui/core/Button'

import Axios from 'axios'

import { placementStaffGetInterviewListOfListing, placementStaffGetShortListOfListing } from '../../index'
import MaterialTable from 'material-table'
import tableIcons from '../../../../constants/tableIcons'
import ButtonGroup from '@material-ui/core/ButtonGroup'

import SaveIcon from '@material-ui/icons/Save'
import ResetIcon from '@material-ui/icons/Restore'

const EditLists = (props) => {
	const history = useHistory()
	const [shortList, setShortList] = useState([])
	const [interviewList, setInterviewList] = useState([])
	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffGetShortListOfListing + props.listingData.id, props.config)
				.then(({ data }) => {
					if (data.success) setShortList(data.message)
					else props.newSnack(data.message, 'error')
				})
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				}),
			Axios.get(placementStaffGetInterviewListOfListing + props.listingData.id, props.config)
				.then(({ data }) => {
					if (data.success) setInterviewList(data.message)
					else props.newSnack(data.message, 'error')
				})
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				}),
		]).then(() => props.setLoading(false))
		// eslint-disable-next-line
	}, [props.updated])

	const handleSave = async () => {
		props.setLoading(true)
		const messages = []
		if (shortList.length !== 0) {
			const { data } = await Axios.post(
				placementStaffGetShortListOfListing + props.listingData.id,
				shortList,
				props.config
			).catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
			messages[0] = data.message
		}
		if (interviewList.length !== 0) {
			const { data } = await Axios.post(
				placementStaffGetInterviewListOfListing + props.listingData.id,
				interviewList,
				props.config
			).catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
			messages[1] = data.message
		}
		props.newSnack(
			`ShortList: ${messages[0] || 'not updated'} || InterviewList: ${messages[1] || 'not updated'}`,
			'warning'
		)
		props.updateData()
		props.setLoading(false)
	}
	const handleReset = () => {
		props.updateData()
	}
	return (
		<div>
			<Button variant="outlined" onClick={() => history.push(props.prevAddress)}>
				Back
			</Button>
			<div style={{ padding: 15 }} />
			<ButtonGroup>
				<Button startIcon={<SaveIcon />} variant="contained" color="primary" onClick={handleSave}>
					Save
				</Button>
				<Button endIcon={<ResetIcon />} variant="contained" color="secondary" onClick={handleReset}>
					Reset
				</Button>
			</ButtonGroup>
			<div style={{ padding: 15 }} />
			{shortList.length !== 0 ? (
				<>
					<MaterialTable
						icons={tableIcons}
						editable={{
							onRowAdd: async (newData) => setShortList([...shortList, newData]),
							onRowDelete: async (oldData) => {
								const dataDelete = [...shortList]
								const index = oldData.tableData.id
								dataDelete.splice(index, 1)
								setShortList([...dataDelete])
							},
							onRowUpdate: async (newData, oldData) => {
								const dataUpdate = [...shortList]
								const index = oldData.tableData.id
								dataUpdate[index] = newData
								setShortList([...dataUpdate])
							},
						}}
						title="Shortlist Editor"
						data={shortList}
						columns={[
							{ title: 'Roll Number', field: 'RollNumber', editable: 'always' },
							{ title: 'Name', field: 'Name', editable: 'never' },
						]}
					/>
					<div style={{ padding: 15 }} />
				</>
			) : (
				<></>
			)}
			{interviewList.length !== 0 ? (
				<>
					<MaterialTable
						icons={tableIcons}
						editable={{
							onRowAdd: async (newData) => setInterviewList([...interviewList, newData]),
							onRowDelete: async (oldData) => {
								const dataDelete = [...interviewList]
								const index = oldData.tableData.id
								dataDelete.splice(index, 1)
								setInterviewList([...dataDelete])
							},
							onRowUpdate: async (newData, oldData) => {
								const dataUpdate = [...interviewList]
								const index = oldData.tableData.id
								dataUpdate[index] = newData
								setInterviewList([...dataUpdate])
							},
						}}
						title="InterviewList Editor"
						data={interviewList}
						columns={[
							{ title: 'Roll Number', field: 'RollNumber', editable: 'always' },
							{ title: 'Name', field: 'Name', editable: 'never' },
						]}
					/>
				</>
			) : (
				<></>
			)}
		</div>
	)
}

export default EditLists
