import React, { useState } from 'react'

import { placementStaffGetUnverifiedCompanies, placementStaffMarkAsVerifiedCompany } from '../../index'

import Axios from 'axios'

import MaterialTable from 'material-table'
import tableIcons from '../../../../constants/tableIcons'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'

import CheckIcon from '@material-ui/icons/Check'
import { useConfirm } from 'material-ui-confirm'

const VerifyCompaniesPage = (props) => {
	const [allCompaniesData, setAllCompaniesData] = useState([])
	const confirm = useConfirm()

	React.useEffect(() => {
		props.setLoading(true)
		Axios.get(placementStaffGetUnverifiedCompanies, props.config)
			.then(({ data }) => {
				if (data.success) setAllCompaniesData(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
				props.setLoading(false)
			})
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	return (
		<div>
			<Typography>Verify Companies</Typography>
			<MaterialTable
				options={{
					filtering: true,
					actionsColumnIndex: -1,
				}}
				actions={[
					{
						icon: CheckIcon,
						tooltip: 'Mark as verified',
						onClick: (event, rowData) =>
							confirm()
								.then(async () => {
									props.setLoading(true)
									const { data } = await Axios.post(
										placementStaffMarkAsVerifiedCompany,
										{ id: rowData.id },
										props.config
									).catch((error) => {
										console.error(error)
										props.newSnack('Connection Error', 'error')
									})
									if (data.success) props.updateData()
									props.newSnack(data.message, data.success ? 'info' : 'error')
									props.setLoading(false)
								})
								.catch(() => {}),
					},
				]}
				columns={[
					{
						title: 'Profile ID',
						field: 'id',
					},
					{
						title: 'Company Name',
						field: 'Name_of_the_company',
					},
					{
						title: 'Placement or Internship',
						field: 'placement',
						lookup: { 1: 'Placement', 0: 'Internship' },
					},
					{
						title: 'Employer Contact Email',
						field: 'Employer_Contact_Email',
					},
					{
						title: 'Employer Contact',
						field: 'Employer_Contact',
					},
					{
						title: 'Other details',
						render: (rowData) => {
							const attrs = []
							for (var attr in rowData) attrs.push(attr)
							return (
								<List dense style={{ maxHeight: 200, maxWidth: 300, overflow: 'auto' }}>
									{attrs.map((attr, key) =>
										typeof rowData[attr] === 'object' ? (
											<React.Fragment key={key} />
										) : (
											<ListItem divider key={key}>
												{attr + ' : ' + rowData[attr]}
											</ListItem>
										)
									)}
								</List>
							)
						},
					},
				]}
				title="Unverified Placement Companies"
				icons={tableIcons}
				data={allCompaniesData.filter((company) => !!company.placement)}
			/>
			<MaterialTable
				options={{
					filtering: true,
					actionsColumnIndex: -1,
				}}
				actions={[
					{
						icon: CheckIcon,
						tooltip: 'Mark as verified',
						onClick: (event, rowData) =>
							confirm()
								.then(async () => {
									props.setLoading(true)
									const { data } = await Axios.post(
										placementStaffMarkAsVerifiedCompany,
										{ id: rowData.id },
										props.config
									).catch((error) => {
										console.error(error)
										props.newSnack('Connection Error', 'error')
									})
									if (data.success) props.updateData()
									props.newSnack(data.message, data.success ? 'info' : 'error')
									props.setLoading(false)
								})
								.catch(() => {}),
					},
				]}
				columns={[
					{
						title: 'Profile ID',
						field: 'id',
					},
					{
						title: 'Company Name',
						field: 'Name_of_the_company',
					},
					{
						title: 'Placement or Internship',
						field: 'placement',
						lookup: { 1: 'Placement', 0: 'Internship' },
					},
					{
						title: 'Employer Contact Email',
						field: 'Employer_Contact_Email',
					},
					{
						title: 'Employer Contact',
						field: 'Employer_Contact',
					},
					{
						title: 'Other details',
						render: (rowData) => {
							const attrs = []
							for (var attr in rowData) attrs.push(attr)
							return (
								<List dense style={{ maxHeight: 200, maxWidth: 300, overflow: 'auto' }}>
									{attrs.map((attr, key) =>
										typeof rowData[attr] === 'object' ? (
											<React.Fragment key={key} />
										) : (
											<ListItem divider key={key}>
												{attr + ' : ' + rowData[attr]}
											</ListItem>
										)
									)}
								</List>
							)
						},
					},
				]}
				title="Unverified Internship Companies"
				icons={tableIcons}
				data={allCompaniesData.filter((company) => !company.placement)}
			/>
		</div>
	)
}

export default VerifyCompaniesPage
