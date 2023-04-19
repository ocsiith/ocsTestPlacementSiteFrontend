/* eslint-disable eqeqeq */
const htmlToPdfmake = require('html-to-pdfmake')

export const pdfCVMakerFileCompany = (details, degrees, atiith, cv, lookup) => {
	return pdfMaker(details, degrees, atiith, cv, lookup)
}

export const pdfCVMakerFileStudent = (personalInfo, fieldsData, lookup) => {
	const details = {
		student_name: personalInfo.name,
		email_other: personalInfo.email_other,
		contact: personalInfo.contact,
		email: personalInfo.email,
		Passing_Year_XII: personalInfo.Passing_Year_XII,
		Board_XII: personalInfo.Board_XII,
		School_XII: personalInfo.School_XII,
		Marks_XII: personalInfo.Marks_XII,
		Passing_Year_X: personalInfo.Passing_Year_X,
		Board_X: personalInfo.Board_X,
		School_X: personalInfo.School_X,
		Marks_X: personalInfo.Marks_X,
		placement: personalInfo.placement,
	}
	const degrees = personalInfo.degrees
	const atiith = personalInfo.atiith
	return pdfMaker(details, degrees, atiith, fieldsData, lookup)
}

const pdfMaker = (details, degrees, atiith, fieldsData, lookup) => {
	const IITH_LOGO =
		'data:image/png;base64,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'

	const check_if_undefined = (num) => {
		if (num === undefined) {
			return 0
		} else if (num === null) {
			return 0
		} else {
			return num
		}
	}

	var academic_details_table = [
		{ text: '', style: 'tabletext' },
		{ text: '', style: 'tabletext' },
		{ text: '', style: 'tabletext' },
		{ text: '', style: 'tabletext' },
	]
	var heading = {
		style: 'tableHeading',
		table: {
			widths: ['*'],
			body: [[{ text: 'Scholastic', style: 'subheader' }]],
		},
		layout: {
			fillColor: '#CCCCCC',
		},
	}
	//heading.table.body[0][0].text = "Scholatic"
	var dd = {
		content: [
			{
				columns: [
					{
						image: 'icon',
						fit: [50, 50],
					},
					{
						width: 'auto',
						text: '\n' + details.student_name,
						style: 'header',
						alignment: 'center',
					},
					{
						width: '*',
						text: `${details.email_other}\n${details.email}\n${details.contact}`,
						alignment: 'right',
					},
				],
			},
			{
				style: 'tableHeading',
				table: {
					widths: ['*'],
					body: [[{ text: 'Academic Details', style: 'subheader' }]],
				},
				layout: {
					fillColor: '#CCCCCC',
				},
			},
			{
				style: 'tableExample',
				table: {
					widths: ['auto', 'auto', 'auto', '*'],
					body: [
						[
							{ text: 'Year', style: 'tableheader' },
							{ text: 'Degree', style: 'tableheader' },
							{ text: 'Institute', style: 'tableheader' },
							{ text: 'CGPA/Marks(%)', style: 'tableheader' },
						] /*,
                              [{text : details.Passing_Year_X , style : 'tabletext'},{text : `X (${details.Board_X})` , style : 'tabletext'},{text : details.School_X , style : 'tabletext'},{text : details.Marks_X , style : 'tabletext'}],
                              [{text : details.Passing_Year_XII , style : 'tabletext'},{text : `XII (${details.Board_XII})` , style : 'tabletext'},{text : details.School_XII , style : 'tabletext'},{text : details.Marks_XII , style : 'tabletext'}]*/,
					],
				},
			},
		],
		styles: {
			header: {
				fontSize: 15,
				bold: true,
			},
			subheader: {
				fontSize: 10,
				bold: true,
				alignment: 'center',
			},
			tableheader: {
				fontSize: 10,
				bold: true,
				alignment: 'center',
			},
			tabletext: {
				fontsize: 10,
				alignment: 'center',
			},
			tableExample: {
				margin: [0, 0, 0, 0], //left,up,right,down
			},
			tableHeading: {
				margin: [0, 7, 0, 0], //left,up,right,down
			},
			'html-h1': {
				fontSize: 11,
				bold: true,
			},
			'html-h2': {
				fontSize: 10,
				bold: true,
			},
			'html-h3': {
				fontSize: 9,
				bold: true,
			},
			'html-strong': {
				bold: true,
			},
			'html-em': {
				italics: true,
			},
			'html-u': {
				decoration: 'underline',
			},
			'html-del': {
				decoration: 'lineThrough',
			},
			'html-blockquote': {
				backgound: 'lightgrey',
			},
			'html-p': {
				fontSize: 10,
			},
			'html-a': {
				decoration: 'underline',
				color: 'blue',
			},
			'html-ul': {
				fontSize: 10,
			},
			'html-ol': {
				fontSize: 10,
			},
		},
		defaultStyle: {
			fontSize: 10,
		},
		images: {
			icon: IITH_LOGO,
		},
	}
	for (var k = 0; k < atiith.length; k++) {
		//This block of code is for minors 0 CGPA considered as N.A

		if (details.placement == 0) {
			let num = parseInt(atiith[k].degree / 10000)
			if (num === 137 || num === 138 || num === 139) {
				if (atiith[k].CGPA === 0) {
					atiith[k].CGPA = 'N.A'
				}
				/*
                      else if(atiith[k].CGPA === 10){
                          atiith[k].CGPA = "S"
                      }
					  */
			}
		} else if (details.placement == 1) {
			let num = parseInt(atiith[k].degree / 10000)
			if (num === 139) {
				if (atiith[k].CGPA === 0) {
					atiith[k].CGPA = 'N.A'
				}
			}
		}

		//
		academic_details_table[0].text = atiith[k].Passing_Year.toString()
		academic_details_table[1].text = lookup[atiith[k].degree.toString()]
		academic_details_table[2].text = 'IIT Hyderabad'
		academic_details_table[3].text = atiith[k].CGPA!==0 ? atiith[k].CGPA.toString() : 'N.A'
		var test = JSON.parse(JSON.stringify(academic_details_table))
		dd.content[2].table.body.push(test)
	}
	for (var i = 0; i < degrees.length; i++) {
		if (degrees[i].Marks > 10) {
			degrees[i].Marks = degrees[i].Marks.toString() + '%'
		}
		academic_details_table[0].text = degrees[i].Passing_Year.toString()
		academic_details_table[1].text = degrees[i].Degree
		academic_details_table[2].text = degrees[i].INSTITUTE
		academic_details_table[3].text = degrees[i].Marks.toString()
		var test_2 = JSON.parse(JSON.stringify(academic_details_table))
		dd.content[2].table.body.push(test_2)
	}
	if (details.Marks_X > 10) {
		details.Marks_X = details.Marks_X.toString() + '%'
	}
	if (details.Marks_XII > 10) {
		details.Marks_XII = details.Marks_XII.toString() + '%'
	}
	if (details.Marks_XII != null && details.Marks_XII != 0) {
		dd.content[2].table.body.push([
			{ text: details.Passing_Year_XII, style: 'tabletext' },
			{ text: `XII (${details.Board_XII})`, style: 'tabletext' },
			{ text: details.School_XII, style: 'tabletext' },
			{ text: details.Marks_XII, style: 'tabletext' },
		])
	}
	if (details.Marks_X != null && details.Marks_X != 0) {
		dd.content[2].table.body.push([
			{ text: details.Passing_Year_X, style: 'tabletext' },
			{ text: `X (${details.Board_X})`, style: 'tabletext' },
			{ text: details.School_X, style: 'tabletext' },
			{ text: details.Marks_X, style: 'tabletext' },
		])
	}
	const cv = fieldsData
	for (var j = 0; j < cv.length; j++) {
		if (cv[j].visibility === undefined || cv[j].visibility === true) {
			if (cv[j].info) {
				heading.table.body[0][0].text = cv[j].info
				var test_heading = JSON.parse(JSON.stringify(heading))
				dd.content.push(test_heading)
				if (cv[j].fields) {
					for (var k = 0; k < cv[j].fields.length; k++) {
						if (cv[j].fields[k].visibility === undefined || cv[j].fields[k].visibility === true) {
							if (cv[j].fields[k].info) {
								if (
									cv[j].fields[k].right_ === undefined ||
									cv[j].fields[k].right_ === null ||
									cv[j].fields[k].right_ === ''
								) {
									var test_html = htmlToPdfmake(cv[j].fields[k].info, {
										window: window,
										defaultStyles: {
											a: '',
											li: '',
											b: '',
											strong: '',
											u: '',
											s: '',
											em: '',
											i: '',
											h1: '',
											h2: '',
											h3: '',
											h4: '',
											h5: '',
											h6: '',
											strike: '',
											p: '',
											ul: '',
											table: '',
											th: '',
										},
									})
									/*
                                        for(var a=0;a<test.length;a++){
                                            if(test[a].ul != undefined){
                                                for(var b=0;b<test[a].ul.length;b++){
                                                    if(typeof test[a].ul[b].text === "string"){
                                                        if(test[a].ul[b].text.trim() === ""){
                                                            test[a].ul.splice(b,1)
                                                            b--
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        for(var a=0;a<test.length;a++){
                                            if(test[a].ol != undefined){
                                                for(var b=0;b<test[a].ol.length;b++){
                                                    if(typeof test[a].ol[b].text === "string"){
                                                        if(test[a].ol[b].text.trim() === ""){
                                                            test[a].ol.splice(b,1)
                                                            b--
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        */
									var text_pad = {
										stack: test_html,
										margin: [0, 0, 0, check_if_undefined(cv[j].fields[k].padding)],
									}

									//console.log(test[0].stack)
									/*
                                     if(test.content[0].nodeName == "DIV"){
                                        test.content[0].margin = [
                                            0,
                                            check_if_undefined(cv[j].fields[k].padding),
                                            0,
                                            check_if_undefined(cv[j].fields[k].padding),
                                          ]
                                     }
                                     */
									dd.content.push(text_pad)
								} else {
									var columns = []
									var test_2_make = htmlToPdfmake(cv[j].fields[k].info, {
										window: window,
										defaultStyles: {
											a: '',
											li: '',
											b: '',
											strong: '',
											u: '',
											s: '',
											em: '',
											i: '',
											h1: '',
											h2: '',
											h3: '',
											h4: '',
											h5: '',
											h6: '',
											strike: '',
											p: '',
											ul: '',
											table: '',
											th: '',
										},
									})
									/*
                                        for(var a=0;a<test.length;a++){
                                            if(test[a].ul != undefined){
                                                for(var b=0;b<test[a].ul.length;b++){
                                                    if(typeof test[a].ul[b].text === "string"){
                                                        if(test[a].ul[b].text.trim() === ""){
                                                            test[a].ul.splice(b,1)
                                                            b--
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        for(var a=0;a<test.length;a++){
                                            if(test[a].ol != undefined){
                                                for(var b=0;b<test[a].ol.length;b++){
                                                    if(typeof test[a].ol[b].text === "string"){
                                                        if(test[a].ol[b].text.trim() === ""){
                                                            test[a].ol.splice(b,1)
                                                            b--
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        */
									var test_pad_2 = {
										stack: test_2_make,
										margin: [0, 0, 0, check_if_undefined(cv[j].fields[k].padding)],
									}
									/*
                                     console.log(test_2)
                                     if(test_2.content[0].nodeName == "DIV"){
                                        test_2.content[0].margin = [
                                            0,
                                            check_if_undefined(cv[j].fields[k].padding),
                                            0,
                                            check_if_undefined(cv[j].fields[k].padding),
                                          ]
                                     }
                                     */
									columns.push(test_pad_2)
									columns[0].width = '*'
									const test_final = {
										text: cv[j].fields[k].right_,
										width: 'auto',
										alignment: 'right',
										margin: [0, 0, 0, check_if_undefined(cv[j].fields[k].padding)],
									}
									columns.push(test_final)
									dd.content.push({ columns: columns })
								}
							}
						}
					}
				}
			}
		}
	}

	dd.pageMargins = [20, 25, 20, 10] //left,top,right,bottom

	return dd
}
