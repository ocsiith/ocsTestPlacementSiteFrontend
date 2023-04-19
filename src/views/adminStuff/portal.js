import React from 'react'

import Axios from 'axios'
import { bake_cookie } from 'sfcookies'

import listingSlotsTemplateExcel from '../../static/xlsx/listingSlotsTemplate.xlsx'

import {
	Container,
	TextField,
	Button,
	Typography,
	Dialog,
	DialogActions,
	DialogTitle,
	DialogContent,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core'

import tableIcons from '../../constants/tableIcons'
import MaterialTable from 'material-table'

import { useConfirm } from 'material-ui-confirm'

import {
	adminAccessCompanyDBAddress,
	adminAccessStudentDBAddress,
	adminGetStudentCoods,
	adminAssignCompany,
	adminCreateStudentCood,
	adminUnassignCompany,
	adminGetStudentCoodsList,
	adminGetUnverifiedCompanies,
	adminMarkAsVerifiedCompany,
	adminGetAllCompaniesWithoutInterviewSlot,
	adminAllowCompanyToDownloadInterviewList,
	adminAllowCompanyToUploadSelectedAndWaitLists,
	adminUpdateSlotOfListingWithExcel,
	adminRunAlgo,
	adminGenerateInterviewList,
	adminGetAllCompanies,
	adminGetAllSlots,
	adminLowerCGPAForListing,
	adminAddBranchesToListing,
	adminCreatePlacementStaff,
	adminMasterCVUpdateDeadline,
	adminMasterCVFreezeAndSubmit,
	adminRemoveStudentCood,
	adminGetUnverifiedPlacementCVs,
	adminGetUnverifiedInternshipCVs,
	adminGetFlaggedInternshipCVs,
	adminGetFlaggedPlacementCVs,
	adminMarkAsVerifiedCVOrRemark,
	adminGetStudentCV,
	adminGetSetShortlist,
	adminGetSetInterviewList,
	adminGetNoWaitlistListingsForSlot,
	adminMarkAsAbsent,
	adminVerifyMail,
	adminRemoveProfile,
	adminLoginToStudent,
	adminLoginToCompany,
	adminLoginToStudentCood,
} from './index'

import DegreeSelector from '../../components/degreeSelector'
import { b64toBlob } from '../../components/scripts'

const UploadButton = (props) => {
	const [selected, setSelected] = React.useState(false)
	const [selectedFile, setSelectedFile] = React.useState(null)
	const [progress, setProgress] = React.useState(0)

	const handleChange = (event) => {
		event.preventDefault()
		if (event.target.files.length === 0) {
			setSelectedFile(null)
			setSelected(false)
			return
		}
		const file = event.target.files[0]
		if (file.size > 1000000) {
			props.newSnack('Select file less than 1 MiB', 'warning')
		} else {
			//console.log(file)
			setSelectedFile(file)
			setSelected(true)
		}
	}

	const handleUpload = async () => {
		if (!selected) {
			return
		}
		const data = new FormData()
		data.append('file', selectedFile)
		const res = await Axios.post(props.address, data, {
			headers: { Authorization: `BEARER ${props.accessToken}` },
			onUploadProgress: (progressEvent) => setProgress(progressEvent.loaded / progressEvent.total),
		}).catch((error) => {
			console.error(error)
			props.newSnack('Connection Error', 'error')
		})
		if (res.data.success) {
			console.log(res.data)
			props.onClose()
		}
	}

	return (
		<div>
			<Typography>{selected ? selectedFile.name : ' '}</Typography>
			<input style={{ display: 'none' }} onChange={handleChange} id={props.id} accept={props.type} type="file" />
			<label htmlFor={props.id}>
				<Button
					style={{ maxWidth: 300 }}
					disabled={progress === 0 ? false : true}
					variant="contained"
					color="primary"
					component="span"
				>
					{selected ? 'Change Selection' : 'Select file to upload'}
				</Button>
			</label>
			<br />
			<Button variant="contained" color="secondary" onClick={handleUpload} disabled={!selected || progress !== 0}>
				{progress === 0
					? 'Upload'
					: Math.round(progress * 100) === 100
					? '99%'
					: Math.round(progress * 100) + '%'}
			</Button>
		</div>
	)
}

const RemoveCompany = (props) => {
	const [companyID, setCompanyID] = React.useState(-1)
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>RemoveCompany</Typography>
			<TextField
				label="CompanyID"
				type="number"
				value={companyID}
				onChange={(e) => {
					e.preventDefault()
					setCompanyID(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminUnassignCompany, { id: companyID }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Unassign
			</Button>
		</Container>
	)
}

const AssignCompany = (props) => {
	const [companyID, setCompanyID] = React.useState(-1)
	const [rollNo, setRollNo] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>AssignCompany</Typography>
			<TextField
				label="CompanyID"
				type="number"
				value={companyID}
				onChange={(e) => {
					e.preventDefault()
					setCompanyID(e.target.value)
				}}
			/>
			<TextField
				label="Roll No."
				value={rollNo}
				onChange={(e) => {
					e.preventDefault()
					setRollNo(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminAssignCompany, { id: companyID, rollno: rollNo }, props.config).then(
								({ data }) => console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Assign
			</Button>
		</Container>
	)
}

const MarkCVVerifiedOrRemark = (props) => {
	const [verified, setVerified] = React.useState(true)
	const [id, setId] = React.useState('')
	const [remarks, setRemarks] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>MarkCVVerifiedOrRemark</Typography>
			<TextField
				label="Student ID"
				type="number"
				value={id}
				onChange={(e) => {
					e.preventDefault()
					setId(e.target.value)
				}}
			/>
			<FormControlLabel
				control={<Checkbox checked={verified} onChange={(e) => setVerified(e.target.checked)} />}
				label="Verified"
			/>
			<FormControlLabel
				control={<Checkbox checked={!verified} onChange={(e) => setVerified(!e.target.checked)} />}
				label="Something seems wrong"
			/>
			<TextField
				label="Remark"
				value={remarks}
				disabled={verified}
				multiline
				onChange={(e) => {
					e.preventDefault()
					setRemarks(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminMarkAsVerifiedCVOrRemark, { id, verified, remarks }, props.config).then(
								({ data }) => console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				MarkCVVerifiedOrRemark
			</Button>
		</Container>
	)
}

const DownloadCV = (props) => {
	const confirm = useConfirm()
	const [id, setId] = React.useState('')

	const downloadB64 = (b64data) => {
		const pre = 'data:application/pdf;base64,'
		const pdfBlob = b64toBlob(b64data, pre)
		const pdfUrl = URL.createObjectURL(pdfBlob)
		var element = document.createElement('a')
		element.setAttribute('href', pdfUrl)
		element.setAttribute('download', id + ' CV.pdf')
		element.style.display = 'none'
		document.body.appendChild(element)
		element.click()
	}

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Download MasterCV</Typography>
			<TextField
				label="Student ID"
				value={id}
				onChange={(e) => {
					e.preventDefault()
					setId(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.get(adminGetStudentCV + id, props.config).then(({ data }) => {
								console.log(data.message)
								if (data.success && data.pdf) downloadB64(data.pdf)
							})
						)
						.catch(() => {})
				}
			>
				DownloadCV
			</Button>
		</Container>
	)
}

const CreateCood = (props) => {
	const [rollNo, setRollNo] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>CreateCood</Typography>
			<TextField
				label="Roll No."
				value={rollNo}
				onChange={(e) => {
					e.preventDefault()
					setRollNo(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminCreateStudentCood, { rollno: rollNo }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Create Cood
			</Button>
		</Container>
	)
}

const RemoveCood = (props) => {
	const [rollNo, setRollNo] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>RemoveCood</Typography>
			<TextField
				label="Roll No."
				value={rollNo}
				onChange={(e) => {
					e.preventDefault()
					setRollNo(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminRemoveStudentCood, { rollno: rollNo }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Remove Cood
			</Button>
		</Container>
	)
}

const ChangeShortList = (props) => {
	const [listingId, setListingId] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>ChangeShortList</Typography>
			<TextField
				label="Listing ID"
				value={listingId}
				onChange={(e) => {
					e.preventDefault()
					setListingId(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.get(adminGetSetShortlist + listingId, props.config).then(({ data }) => {
								if (!data.success) {
									console.log(data.message)
									return
								}
								const pre =
									'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
								const excelBlob = b64toBlob(data.message, pre)
								const excelURL = URL.createObjectURL(excelBlob)
								var element = document.createElement('a')
								element.setAttribute('href', excelURL)
								element.setAttribute('download', listingId + '.xlsx')
								element.style.display = 'none'
								document.body.appendChild(element)
								element.click()
							})
						)
						.catch(() => {})
				}
			>
				DownloadShortList
			</Button>
			<UploadExcelDialog
				accessToken={props.accessToken}
				id="shortlistChanger"
				type=".xlsx"
				newSnack={props.newSnack}
				uploadAddress={adminGetSetShortlist + listingId}
			/>
		</Container>
	)
}

const ChangeInterviewList = (props) => {
	const [listingId, setListingId] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>ChangeInterviewList</Typography>
			<TextField
				label="Listing ID"
				value={listingId}
				onChange={(e) => {
					e.preventDefault()
					setListingId(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.get(adminGetSetInterviewList + listingId, props.config).then(({ data }) => {
								if (!data.success) {
									console.log(data.message)
									return
								}
								const pre =
									'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,'
								const excelBlob = b64toBlob(data.message, pre)
								const excelURL = URL.createObjectURL(excelBlob)
								var element = document.createElement('a')
								element.setAttribute('href', excelURL)
								element.setAttribute('download', listingId + '.xlsx')
								element.style.display = 'none'
								document.body.appendChild(element)
								element.click()
							})
						)
						.catch(() => {})
				}
			>
				DownloadInterviewList
			</Button>
			<UploadExcelDialog
				accessToken={props.accessToken}
				id="shortlistChanger"
				type=".xlsx"
				newSnack={props.newSnack}
				uploadAddress={adminGetSetInterviewList + listingId}
			/>
		</Container>
	)
}

const CreatePlacementStaff = (props) => {
	const [email, setEmail] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>CreatePlacementStaff CaseSensitive Enter Full Email</Typography>
			<TextField
				label="Email"
				value={email}
				onChange={(e) => {
					e.preventDefault()
					setEmail(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminCreatePlacementStaff, { email: email }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Create Placement Staff
			</Button>
		</Container>
	)
}
const LoginToStudentPortal = (props) => {
	const [email, setEmail] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Login to student account</Typography>
			<TextField
				label="Email"
				value={email}
				onChange={(e) => {
					e.preventDefault()
					setEmail(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminLoginToStudent, { email: email }, props.config).then(({ data }) => {
								console.log(data.message)
								if (data.success) {
									bake_cookie('studentCredentials', data)
									window.localStorage.setItem('studentCredentials', JSON.stringify(data))
								}
							})
						)
						.catch(() => {})
				}
			>
				Login
			</Button>
		</Container>
	)
}

const LoginToCompanyPortal = (props) => {
	const [email, setEmail] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Login to company account</Typography>
			<TextField
				label="Email"
				value={email}
				onChange={(e) => {
					e.preventDefault()
					setEmail(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminLoginToCompany, { email: email }, props.config).then(({ data }) => {
								console.log(data.message)
								if (data.success) {
									bake_cookie('companyCredentials', data)
									window.localStorage.setItem('companyCredentials', JSON.stringify(data))
								}
							})
						)
						.catch(() => {})
				}
			>
				Login
			</Button>
		</Container>
	)
}

const LoginToStudentCoodPortal = (props) => {
	const [email, setEmail] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Login to student cood account</Typography>
			<TextField
				label="Email"
				value={email}
				onChange={(e) => {
					e.preventDefault()
					setEmail(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminLoginToStudentCood, { email: email }, props.config).then(({ data }) => {
								console.log(data)
								if (data.success) {
									window.localStorage.setItem('studentCoodToken', JSON.stringify(data.token))
								}
							})
						)
						.catch(() => {})
				}
			>
				Login
			</Button>
		</Container>
	)
}

const VerifyEmail = (props) => {
	const [email, setEmail] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Verify Email</Typography>
			<TextField
				label="Account Email"
				value={email}
				onChange={(e) => {
					e.preventDefault()
					setEmail(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminVerifyMail, { email }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Mark as Verified
			</Button>
		</Container>
	)
}

const GetNoWaitlistListingsForSlot = (props) => {
	const [slotId, setSlotId] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>GetNoWaitlistListingsForSlot</Typography>
			<TextField
				label="Slot ID"
				type="number"
				value={slotId}
				onChange={(e) => {
					e.preventDefault()
					setSlotId(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.get(adminGetNoWaitlistListingsForSlot + slotId, props.config).then(({ data }) => {
								console.log(data.message)
								if (data.success) props.setData(data.message)
							})
						)
						.catch(() => {})
				}
			>
				Get No Waitlist Listings
			</Button>
		</Container>
	)
}

const FreezeAndSubmitMasterCV = (props) => {
	const [placement, setPlacement] = React.useState(true)
	const [deadline1, setDeadline1] = React.useState(true)
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>FreezeAndSubmitMasterCV</Typography>
			<FormControlLabel
				control={<Checkbox checked={placement} onChange={(e) => setPlacement(e.target.checked)} />}
				label="Placement"
			/>
			<FormControlLabel
				control={<Checkbox checked={!placement} onChange={(e) => setPlacement(!e.target.checked)} />}
				label="Internship"
			/>
			<FormControlLabel
				control={
					<Checkbox color="primary" checked={deadline1} onChange={(e) => setDeadline1(e.target.checked)} />
				}
				label="Deadline1"
			/>
			<FormControlLabel
				control={
					<Checkbox color="primary" checked={!deadline1} onChange={(e) => setDeadline1(!e.target.checked)} />
				}
				label="Deadline2"
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(
								adminMasterCVFreezeAndSubmit,
								{ placement: placement ? 1 : 0, deadline1: deadline1 },
								props.config
							).then(({ data }) => console.log(data.message))
						)
						.catch(() => {})
				}
			>
				Freeze And Submit
			</Button>
		</Container>
	)
}

const ExtendDeadlineMasterCV = (props) => {
	const [placement, setPlacement] = React.useState(true)
	const [deadline1, setDeadline1] = React.useState(true)
	const [date, setDate] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>ExtendDeadlineMasterCV</Typography>
			<FormControlLabel
				control={<Checkbox checked={placement} onChange={(e) => setPlacement(e.target.checked)} />}
				label="Placement"
			/>
			<FormControlLabel
				control={<Checkbox checked={!placement} onChange={(e) => setPlacement(!e.target.checked)} />}
				label="Internship"
			/>
			<FormControlLabel
				control={
					<Checkbox color="primary" checked={deadline1} onChange={(e) => setDeadline1(e.target.checked)} />
				}
				label="Deadline1"
			/>
			<FormControlLabel
				control={
					<Checkbox color="primary" checked={!deadline1} onChange={(e) => setDeadline1(!e.target.checked)} />
				}
				label="Deadline2"
			/>
			<TextField
				InputLabelProps={{ shrink: true }}
				value={date}
				placeholder="yyyy-mm-dd"
				type="date"
				inputProps={{ pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ }}
				onChange={(e) => setDate(e.target.value)}
				label="Deadline"
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(
								adminMasterCVUpdateDeadline,
								{ placement: placement ? 1 : 0, deadline1: deadline1, date: date },
								props.config
							).then(({ data }) => console.log(data.message))
						)
						.catch(() => {})
				}
			>
				Extend Deadline MasterCV
			</Button>
		</Container>
	)
}

const MarkCompanyVerified = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>MarkProfileVerified</Typography>
			<TextField
				label="Profile ID"
				value={value}
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminMarkAsVerifiedCompany, { id: value }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Mark as verified
			</Button>
		</Container>
	)
}

const RemoveProfile = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>RemoveProfile</Typography>
			<TextField
				label="Profile ID"
				value={value}
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminRemoveProfile, { profile_id: value }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Mark as verified
			</Button>
		</Container>
	)
}

const RunAlgo = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Run algorithm</Typography>
			<TextField
				label="Slot ID"
				value={value}
				type="number"
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminRunAlgo, { id: value }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Run algorithm
			</Button>
		</Container>
	)
}

const GenerateInterviewList = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>Generate Interview List</Typography>
			<TextField
				label="Slot ID"
				value={value}
				type="number"
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminGenerateInterviewList, { id: value }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Generate
			</Button>
		</Container>
	)
}

const AllowCompanyToDownloadInterviewList = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>AllowCompanyToDownloadInterviewList</Typography>
			<TextField
				label="Listing ID"
				value={value}
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminAllowCompanyToDownloadInterviewList, { id: value }, props.config).then(
								({ data }) => console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Allow
			</Button>
		</Container>
	)
}

const MarkAsAbsent = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>MarkAsAbsent</Typography>
			<TextField
				label="Listing ID"
				value={value}
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminMarkAsAbsent, { listing_id: value }, props.config).then(({ data }) =>
								console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Mark As Absent
			</Button>
		</Container>
	)
}

const AllowCompanyToUploadShortAndWaitLists = (props) => {
	const [value, setValue] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>AllowCompanyToUploadShortAndWaitLists</Typography>
			<TextField
				label="Listing ID"
				value={value}
				onChange={(e) => {
					e.preventDefault()
					setValue(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminAllowCompanyToUploadSelectedAndWaitLists, { id: value }, props.config).then(
								({ data }) => console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Allow
			</Button>
		</Container>
	)
}

const DecreaseCGPA = (props) => {
	const [id, setId] = React.useState('')
	const [CGPA, setCGPA] = React.useState('')
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>DecreaseCGPA</Typography>
			<TextField
				label="Salary Details ID"
				value={id}
				onChange={(e) => {
					e.preventDefault()
					setId(e.target.value)
				}}
			/>
			<TextField
				label="New CGPA"
				value={CGPA}
				onChange={(e) => {
					e.preventDefault()
					setCGPA(e.target.value)
				}}
			/>
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminLowerCGPAForListing, { id: id, cgpa: CGPA }, props.config).then(
								({ data }) => console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Reduce
			</Button>
		</Container>
	)
}

const IncreaseBranches = (props) => {
	const [id, setId] = React.useState('')
	const [branches, setBranches] = React.useState([])
	const confirm = useConfirm()

	return (
		<Container style={{ width: '100%', border: '1px solid' }}>
			<Typography>IncreaseBranches</Typography>
			<TextField
				label="Listing ID"
				value={id}
				onChange={(e) => {
					e.preventDefault()
					setId(e.target.value)
				}}
			/>
			<DegreeSelector setDepartment={setBranches} Department={branches} />
			<Button
				onClick={() =>
					confirm()
						.then(() =>
							Axios.post(adminAddBranchesToListing, { id: id, branches: branches }, props.config).then(
								({ data }) => console.log(data.message)
							)
						)
						.catch(() => {})
				}
			>
				Add
			</Button>
		</Container>
	)
}

const UploadExcelDialog = (props) => {
	const [open, setOpen] = React.useState(false)
	const handleClose = () => {
		setOpen(false)
	}

	return (
		<div>
			<Button onClick={() => setOpen(true)}>Open</Button>
			<Dialog maxWidth="lg" disableBackdropClick fullWidth onClose={handleClose} open={open}>
				<DialogTitle>Upload Excel</DialogTitle>
				<DialogContent>
					<UploadButton
						newSnack={props.newSnack}
						onClose={handleClose}
						accessToken={props.accessToken}
						type={props.type}
						id={props.id}
						address={props.uploadAddress}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
				</DialogActions>
			</Dialog>
		</div>
	)
}

const AdminPortal = (props) => {
	const config = { headers: { Authorization: `BEARER ${props.accessToken}` } }
	const [query, setQuery] = React.useState('')
	const [queryAddress, setQueryAddress] = React.useState(adminAccessStudentDBAddress)
	const [data, setDataActual] = React.useState([])
	const [materialTableColumns, setMaterialTableColumns] = React.useState([])
	const confirm = useConfirm()

	const setData = (value) => {
		if (Array.isArray(value) && value.length !== 0) {
			const newMaterialTableColumns = []
			for (var attr in value[0]) {
				if (typeof value[0][attr] !== 'object')
					newMaterialTableColumns.push({ title: attr, field: attr, cellStyle: { border: '1px solid' } })
			}
			setMaterialTableColumns(newMaterialTableColumns)
		}
		setDataActual(value)
	}

	const handleChange = (event) => {
		setQuery(event.target.value)
	}

	const handleSend = () => {
		confirm()
			.then(() =>
				Axios.post(queryAddress, { query: query, token: props.accessToken }, config)
					.then((res) => {
						console.info(res.data.message)
						if (res.data.success) setData(res.data.message)
					})
					.catch((error) => {
						console.error(error)
						props.newSnack('Connection Error', 'error')
					})
			)
			.catch(() => {})
	}

	const handleChangeRadio = (event) => {
		setQueryAddress(event.target.value)
	}

	const downloadFile = (url) => {
		var element = document.createElement('a')
		element.setAttribute('href', url)
		element.setAttribute('download', 'listingSlotsTemplate.xlsx')
		element.style.display = 'none'
		document.body.appendChild(element)
		element.click()
	}

	return (
		<div>
			<input type="text" placeholder="Query" onChange={handleChange} />
			Company :
			<input
				type="radio"
				onChange={handleChangeRadio}
				name="queryAddressRadio"
				value={adminAccessCompanyDBAddress}
				checked={queryAddress === adminAccessCompanyDBAddress}
			/>
			<input
				type="radio"
				onChange={handleChangeRadio}
				name="queryAddressRadio"
				value={adminAccessStudentDBAddress}
				checked={queryAddress === adminAccessStudentDBAddress}
			/>
			: Student
			<button onClick={handleSend}>Send</button>
			<br />
			<div>
				<MaterialTable
					title=""
					options={{ filtering: true, exportButton: true }}
					icons={tableIcons}
					columns={materialTableColumns}
					data={data}
				/>
			</div>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetStudentCoods, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List all companies with their cood
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetStudentCoodsList, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List all coods
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetUnverifiedCompanies, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List all unverified Companies
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetAllCompaniesWithoutInterviewSlot, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All companies without Interview Slots
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetAllCompanies, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All companies
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetAllSlots, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All Slots
				</Button>
			</Container>
			<VerifyEmail config={config} />
			<CreatePlacementStaff config={config} />
			<MarkCompanyVerified config={config} />
			<RemoveProfile config={config} />
			<RemoveCompany config={config} />
			<AssignCompany config={config} />
			<CreateCood config={config} />
			<RemoveCood config={config} />
			<div style={{ margin: 30 }} />
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Typography>Upload Interview Slots Excel</Typography>
				<Button onClick={() => downloadFile(listingSlotsTemplateExcel)}>Download Template</Button>
				<UploadExcelDialog
					accessToken={props.accessToken}
					id="interviewExcel"
					type=".xlsx"
					newSnack={props.newSnack}
					uploadAddress={adminUpdateSlotOfListingWithExcel}
				/>
			</Container>
			<AllowCompanyToDownloadInterviewList config={config} />
			<AllowCompanyToUploadShortAndWaitLists config={config} />
			<div style={{ padding: 15 }} />
			<FreezeAndSubmitMasterCV config={config} />
			<ExtendDeadlineMasterCV config={config} />
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetUnverifiedPlacementCVs, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All Unverified Placement CVs
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetUnverifiedInternshipCVs, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All Unverified Internship CVs
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetFlaggedPlacementCVs, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All Flagged Placement CVs
				</Button>
			</Container>
			<Container style={{ width: '100%', border: '1px solid' }}>
				<Button
					onClick={() =>
						confirm()
							.then(() =>
								Axios.get(adminGetFlaggedInternshipCVs, config).then(({ data }) => {
									console.log(data.message)
									if (data.success) setData(data.message)
								})
							)
							.catch(() => {})
					}
				>
					List All Flagged Internship CVs
				</Button>
			</Container>
			<DownloadCV config={config} />
			<MarkCVVerifiedOrRemark config={config} />
			<div style={{ padding: 15 }} />
			<DecreaseCGPA config={config} />
			<IncreaseBranches config={config} />
			<div style={{ padding: 15 }} />
			<ChangeShortList accessToken={props.accessToken} config={config} />
			<ChangeInterviewList accessToken={props.accessToken} config={config} />
			<div style={{ padding: 15 }} />
			<RunAlgo config={config} />
			<GenerateInterviewList config={config} />
			<div style={{ padding: 15 }} />
			<GetNoWaitlistListingsForSlot setData={setData} config={config} />
			<MarkAsAbsent config={config} />
			<LoginToStudentPortal config={config} />
			<LoginToCompanyPortal config={config} />
			<LoginToStudentCoodPortal config={config} />
		</div>
	)
}

export default AdminPortal
