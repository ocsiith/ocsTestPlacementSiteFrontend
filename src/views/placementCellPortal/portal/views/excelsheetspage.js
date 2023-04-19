import React, { useState } from 'react'

import {
	placementStaffGetAllCompaniesInternshipExcel,
	placementStaffGetAllCompaniesPlacementExcel,
	placementStaffGetAllStudentsInternshipExcel,
	placementStaffGetAllStudentsPlacementExcel,
	placementStaffPostAllCompaniesFromBranchesInternshipExcel,
	placementStaffPostAllCompaniesFromBranchesPlacementExcel,
	placementStaffPostAllStudentsFromBranchesInternshipExcel,
	placementStaffPostAllStudentsFromBranchesPlacementExcel,
	placementStaffPostAllRegisteredStudentsForListingExcel,
} from '../../index'

import DegreeSelector from '../../../../components/degreeSelector'
import Axios from 'axios'

import { b64toBlob } from '../../../../components/scripts'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const downloadB64 = (b64data, name) => {
	const pre = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
	const blob = b64toBlob(b64data, pre)
	const url = URL.createObjectURL(blob)
	var element = document.createElement('a')
	element.setAttribute('href', url)
	element.setAttribute('download', name)
	element.style.display = 'none'
	document.body.appendChild(element)
	element.click()
}

const ExcelDownloader = (props) => {
	const handleClick = async () => {
		props.setLoading(true)
		const { data } = await Axios.get(props.url, props.config).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (data.success) downloadB64(data.message, props.title + '.xlsx')
		else props.newSnack(data.message, data.success ? 'info' : 'error')
		props.setLoading(false)
	}
	return (
		<div style={{ padding: 10 }}>
			<Button variant="contained" onClick={handleClick}>
				{props.title}
			</Button>
		</div>
	)
}

const FromBranchExcelDownloader = (props) => {
	const [branches, setBranches] = useState([])
	const [open, setOpen] = useState(false)

	const handleDownload = async () => {
		props.setLoading(true)
		const { data } = await Axios.post(props.url, { branches }, props.config).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (data.success) downloadB64(data.message, props.title + '.xlsx')
		else props.newSnack(data.message, data.success ? 'info' : 'error')
		props.setLoading(false)
	}
	return (
		<div style={{ padding: 10 }}>
			<Button variant="contained" onClick={() => setOpen(true)}>
				{props.title}
			</Button>
			<Dialog open={open} disableBackdropClick fullWidth maxWidth="lg">
				<DialogTitle>{props.title}</DialogTitle>
				<DialogContent>
					<DegreeSelector setDepartment={setBranches} Department={branches} />
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} variant="contained" color="secondary">
						Close
					</Button>
					<Button onClick={handleDownload} variant="contained" color="primary">
						Download
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const FromListingExcelDownloader = (props) => {
	const [listingId, setListingId] = useState('')
	const [open, setOpen] = useState(false)

	const handleDownload = async () => {
		props.setLoading(true)
		const { data } = await Axios.get(props.url + listingId, props.config).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (data.success) downloadB64(data.message, props.title + '.xlsx')
		else props.newSnack(data.message, data.success ? 'info' : 'error')
		props.setLoading(false)
	}
	return (
		<div style={{ padding: 10 }}>
			<Button variant="contained" onClick={() => setOpen(true)}>
				{props.title}
			</Button>
			<Dialog open={open} disableBackdropClick fullWidth maxWidth="lg">
				<DialogTitle>{props.title}</DialogTitle>
				<DialogContent>
					<TextField
						onChange={(e) => setListingId(e.target.value)}
						variant="outlined"
						fullWidth
						type="number"
						size="small"
						label="Listing ID"
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => setOpen(false)} variant="contained" color="secondary">
						Close
					</Button>
					<Button onClick={handleDownload} variant="contained" color="primary">
						Download
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const ExcelSheetsPage = (props) => {
	return (
		<div>
			<ExcelDownloader
				url={placementStaffGetAllCompaniesInternshipExcel}
				title="All Companies Internship"
				{...props}
			/>
			<ExcelDownloader
				url={placementStaffGetAllCompaniesPlacementExcel}
				title="All Companies Placement"
				{...props}
			/>
			<ExcelDownloader
				url={placementStaffGetAllStudentsInternshipExcel}
				title="All Students Internship"
				{...props}
			/>
			<ExcelDownloader
				url={placementStaffGetAllStudentsPlacementExcel}
				title="All Students Placement"
				{...props}
			/>
			<FromBranchExcelDownloader
				url={placementStaffPostAllCompaniesFromBranchesInternshipExcel}
				title="All Companies From Branches Internship"
				{...props}
			/>
			<FromBranchExcelDownloader
				url={placementStaffPostAllCompaniesFromBranchesPlacementExcel}
				title="All Companies From Branches Placement"
				{...props}
			/>
			<FromBranchExcelDownloader
				url={placementStaffPostAllStudentsFromBranchesInternshipExcel}
				title="All Students From Branches Internship"
				{...props}
			/>
			<FromBranchExcelDownloader
				url={placementStaffPostAllStudentsFromBranchesPlacementExcel}
				title="All Students From Branches Placement"
				{...props}
			/>
			<FromListingExcelDownloader
				url={placementStaffPostAllRegisteredStudentsForListingExcel}
				title="All Registered Students For Listing"
				{...props}
			/>
		</div>
	)
}

export default ExcelSheetsPage
