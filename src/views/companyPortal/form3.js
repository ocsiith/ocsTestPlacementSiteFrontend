import React, { useState } from 'react'

import Axios from 'axios'

import { companyGetForm3Data, companySetForm3Data } from '../../constants/addresses'

import Fade from '@material-ui/core/Fade'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Paper } from '@material-ui/core'

const Form3 = (props) => {
	const [form3Data, setForm3Data] = useState({
		No_of_Female_Members: '',
		Arrival_Date: '',
		No_of_Rooms: '',
		No_of_Male_Members: '',
		Departure_Date: '',
		Other_Requirements: '',
		Resource_Type: '',
		Quantity: '',
		Unit_of_Measurement: '',
		Notes: '',
	})
	const disabledState = props.fetchedData.Form_3
	const config = { headers: { Authorization: `BEARER ${props.parentProps.companyCredentials.accessToken}` } }

	React.useEffect(() => {
		if (props.fetchedData.Form_3) {
			props.setLoading(true)
			Axios.get(companyGetForm3Data, config)
				.then((res) => {
					setForm3Data(res.data.message)
					props.setLoading(false)
				})
				.catch((error) => {
					console.error(error)
					props.newSnack('Connection Error', 'error')
				})
		}
		// eslint-disable-next-line
	}, [props.updated])

	const handleChange = (event) => {
		const newForm3Data = JSON.parse(JSON.stringify(form3Data))
		newForm3Data[event.target.id] = event.target.value
		setForm3Data(newForm3Data)
	}

	const TextFieldProps = {
		disabled: disabledState,
		style: { margin: 10 },
		fullWidth: true,
		size: 'small',
		onChange: handleChange,
		variant: 'outlined',
	}

	const validForm = () => {
		var result = true
		for (var attr in form3Data) {
			if (form3Data[attr] === '') {
				result = false
				props.newSnack('All fields are mandatory', 'error')
			}
		}
		return result
	}

	const handleRegister = async () => {
		if (validForm()) {
			props.setLoading(true)
			const res = await Axios.post(companySetForm3Data, form3Data, config).catch((error) => {
				console.error(error)
				props.newSnack('Connection Error', 'error')
			})
			props.setLoading(false)
			props.newSnack(res.data.message, res.data.success ? 'info' : 'error')
			props.updateData()
		}
	}

	return (
		<Fade in>
			<div>
				<div style={{ padding: 15 }} />
				<Paper>
					<div style={{ padding: 15 }} />
					<Container>
						<Typography variant="h5">Form 3</Typography>
						<div style={{ padding: 15 }} />
						<TextField
							InputLabelProps={{ shrink: true }}
							value={form3Data.Departure_Date}
							id="Departure_Date"
							label="Departure_Date"
							placeholder="yyyy-mm-dd"
							inputProps={{ pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ }}
							type="date"
							{...TextFieldProps}
						/>
						<TextField
							InputLabelProps={{ shrink: true }}
							value={form3Data.Arrival_Date}
							id="Arrival_Date"
							label="Arrival_Date"
							placeholder="yyyy-mm-dd"
							type="date"
							inputProps={{ pattern: /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/ }}
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.No_of_Male_Members}
							id="No_of_Male_Members"
							label="No_of_Male_Members"
							type="number"
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.No_of_Female_Members}
							id="No_of_Female_Members"
							label="No_of_Female_Members"
							type="number"
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.No_of_Rooms}
							id="No_of_Rooms"
							label="No_of_Rooms"
							type="number"
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.Other_Requirements}
							id="Other_Requirements"
							label="Other_Requirements"
							multiline
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.Resource_Type}
							id="Resource_Type"
							label="Resource_Type"
							multiline
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.Quantity}
							id="Quantity"
							label="Quantity"
							type="number"
							{...TextFieldProps}
						/>
						<TextField
							value={form3Data.Unit_of_Measurement}
							id="Unit_of_Measurement"
							label="Unit_of_Measurement"
							multiline
							{...TextFieldProps}
						/>
						<TextField value={form3Data.Notes} id="Notes" label="Notes" multiline {...TextFieldProps} />
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<Typography style={{ flexGrow: 1 }} />
							<Button
								variant="contained"
								color="primary"
								disabled={disabledState}
								onClick={handleRegister}
							>
								Submit
							</Button>
						</div>
					</Container>
					<div style={{ padding: 15 }} />
				</Paper>
			</div>
		</Fade>
	)
}

export default Form3
