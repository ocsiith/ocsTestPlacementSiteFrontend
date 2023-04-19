import Axios from 'axios'
import { pdfCVMakerFileCompany } from './pdfCVMaker'

const pdfMake = require('pdfmake/build/pdfmake')
const vfsFonts = require('pdfmake/build/vfs_fonts')
pdfMake.vfs = vfsFonts.pdfMake.vfs

var JSZip = require('jszip')

export const handleDownloadAllCVs = async (props, api, config) => {
	props.setLoading(true)
	var zip = new JSZip()
	const res = await Axios.post(api, { id: props.listing.id }, config).catch((err) => console.log(err))
	if (!res.data.success) {
		props.newSnack(res.data.message, 'warning')
		props.setLoading(false)
		return
	}
	var response = await res.data.message.map(async (student, key) => {
		return new Promise(async (resolve, reject) => {
			try {
				const dd = pdfCVMakerFileCompany(
					student.details[0],
					student.degrees,
					student.atiith,
					student.cv,
					props.lookupTable
				)
				const pdfDoc = pdfMake.createPdf(dd)
				await pdfDoc.getBase64(async (data) => {
					var fileName = student.details[0].email.slice(0, -11) + '.pdf'
					zip.file(fileName, data, { base64: true })
					resolve(1)
				})
			} catch (err) {
				console.log(err)
				reject(0)
			}
		})
	})
	Promise.all(response).then(async (values) => {
		values.forEach((value) => {
			if (value === 0) {
				props.newSnack('Download failed', 'error')
				props.setLoading(false)
				return
			}
		})
		var content = await zip.generateAsync({ type: 'base64' })
		var zipName = props.listing.Job_Title + '.zip'
		var a = document.createElement('a')
		a.href = 'data:application/zip;base64,' + content
		a.download = zipName
		a.style.display = 'none'
		a.click()
		props.setLoading(false)
	})
}
