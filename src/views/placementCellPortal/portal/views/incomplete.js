import React, { useState } from 'react'
import Axios from 'axios'

import { placementStaffIncompleteCompanies, placementStaffLoginToCompany } from '../../index'

import tableIcons from '../../../../constants/tableIcons'

import MaterialTable from 'material-table'

import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

const Incomplete = (props) => {
	const [allCompaniesData, setAllCompaniesData] = useState([])

	React.useEffect(() => {
		props.setLoading(true)
		Promise.all([
			Axios.get(placementStaffIncompleteCompanies, props.config).then(({ data }) => {
				if (data.success) setAllCompaniesData(data.message)
				else props.newSnack(data.message, data.success ? 'info' : 'error')
			}),
		])
			.then(() => props.setLoading(false))
			.catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
		// eslint-disable-next-line
	}, [props.updated])

	return (
		<div>
			<div>
				<MaterialTable
					title="Placements"
					options={{
						actionsColumnIndex: -1,
						filtering: true,
					}}
					data={allCompaniesData}
					icons={tableIcons}
					columns={[
						{
							title: 'ID',
							field: 'id',
						},
						{
							title: 'Email',
							field: 'Employer_Contact_Email',
						},
						{
							title: 'Contact',
							render: (rowData) => (
								<div>
									Mobile: {rowData.Employer_Contact_Mobile}
									<br />
									Phone: {rowData.Employer_Contact_Phone}
								</div>
							),
						},
						{
							title: 'Login to this company',
							render: (rowData) => (
								<Button
									onClick={() => {
										if (window.confirm('Are you sure?')) {
											Axios.post(
												placementStaffLoginToCompany,
												{ email: rowData.Employer_Contact_Email },
												props.config
											).then(({ data }) => {
												if (data.success) {
													window.localStorage.setItem(
														'companyCredentials',
														JSON.stringify(data)
													)
												}
												props.newSnack(data.message)
											})
										}
									}}
									variant="contained"
									color="secondary"
								>
									Login
								</Button>
							),
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
				/>
			</div>
		</div>
	)
}

export default Incomplete
