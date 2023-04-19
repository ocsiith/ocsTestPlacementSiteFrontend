/* eslint-disable */
import React, { useRef } from 'react'
import Fade from '@material-ui/core/Fade'
import Footer from './footer'
import { Chart } from 'chart.js'
import 'chartjs-plugin-error-bars'
import { useEffect, useState } from 'react'
import { Button } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import backgroundImage from '../../static/images/16.18.png'
import main_page_image from '../../static/images/research_main.webp'
import BackgroundChanger from '../../components/backgroundChanger'
import { GoLinkExternal } from 'react-icons/go'
import placementbrochure from '../../static/pdfs/Placement_Brochure_2022-23.pdf'
import internshipbrochure from '../../static/pdfs/Internship-Brochure.pdf'
import ai from '../../static/pdfs/Dept Brochures/Artificial Intelligence.pdf'
import am from '../../static/pdfs/Dept Brochures/Additive Manufacturing.pdf'
import bio from '../../static/pdfs/Dept Brochures/Biomedical.pdf'
import bioI from '../../static/pdfs/Dept Brochures/Internship brochure BME.pdf'
import bt from '../../static/pdfs/Dept Brochures/Biotechnology.pdf'
import ch from '../../static/pdfs/Dept Brochures/Chemical Engineering.pdf'
import chemistry from '../../static/pdfs/Dept Brochures/Chemistry.pdf'
import ci from '../../static/pdfs/Dept Brochures/Civil Engineering.pdf'
import cl from '../../static/pdfs/Dept Brochures/Climate Change.pdf'
import co from '../../static/pdfs/Dept Brochures/Computer Science and Engineering.pdf'
import de from '../../static/pdfs/Dept Brochures/Design.pdf'
import dePhd from '../../static/pdfs/Dept Brochures/Design PhD.pdf'
import deI from '../../static/pdfs/Dept Brochures/bd brochure.pdf'
import ee from '../../static/pdfs/Dept Brochures/Electrical Engineering.pdf'
import csp from '../../static/pdfs/Dept Brochures/EE-Communication _ Signal Processing.pdf'
import ps from '../../static/pdfs/Dept Brochures/EE-Power Electronics and Power Systems.pdf'
import vl from '../../static/pdfs/Dept Brochures/EE-VLSI.pdf'
import st from '../../static/pdfs/Dept Brochures/Energy Science _ Technology.pdf'
import ep from '../../static/pdfs/Dept Brochures/Engineering Physics.pdf'
import es from '../../static/pdfs/Dept Brochures/Engineering Science.pdf'
import esI from '../../static/pdfs/Dept Brochures/ES-Internship Brochure.pdf'
import ew from '../../static/pdfs/Dept Brochures/E-waste Resource Engineering _ Management.pdf'
import ss from '../../static/pdfs/Dept Brochures/Integrated Sensor System.pdf'
import ds from '../../static/pdfs/Dept Brochures/MA (Development Studies).pdf'
import ms from '../../static/pdfs/Dept Brochures/Materials Science and Metallurgical Engineering.pdf'
import ma from '../../static/pdfs/Dept Brochures/Mathematics.pdf'
import as from '../../static/pdfs/Dept Brochures/Mechanical and Aerospace Engineering.pdf'
import meI from '../../static/pdfs/Dept Brochures/Mechanical Internship Brochure.pdf'
import mdi from '../../static/pdfs/Dept Brochures/Medical Device Innovation.pdf'
import is from '../../static/pdfs/Dept Brochures/Networks and Information Security.pdf'
import pbs from '../../static/pdfs/Dept Brochures/Polymers and Biosystems Engineering.pdf'
import sm from '../../static/pdfs/Dept Brochures/Smart Mobility.pdf'

import img1 from '../../static/images/5g_tech.png'
import img2 from '../../static/images/additive_manufacturing.png'
import img3 from '../../static/images/artificial_intelligence.png'
import img4 from '../../static/images/bio_inspired.png'
import img5 from '../../static/images/catalysis.png'
import img6 from '../../static/images/climate_change.png'
import img7 from '../../static/images/energy.png'
import img8 from '../../static/images/healthcare.png'
import img9 from '../../static/images/integrated.png'
import img10 from '../../static/images/nano_x.png'
import img11 from '../../static/images/sensors.png'
import img12 from '../../static/images/tech.png'
import logo1 from '../../static/images/image (2) (2) (2).png'
import academicsimage from '../../static/images/academicsimage.jpeg'
import campusimage from '../../static/images/campusimage.jpeg'
import researchimage from '../../static/images/researchimage.jpeg'
import japandayposter from '../../static/images/japanDay2021Poster.jpg'
import studentlogo from '../../static/images/image (3).png'
import japandaylogo from '../../static/images/japanday_logo.png'
import japanday2022 from '../../static/images/japanday_2022.png'
import jetro from '../../static/images/japan_jetro.png'
import jica from '../../static/images/japan_jica.png'
import iithlogo from '../../static/logos/ocslogoonly.png'
import Aos from 'aos'
import 'aos/dist/aos.css'
//import { useWindowSize } from '../../components/scripts'
import { FaTwitter, FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'

const IITHData = [
	{
		closing: 1936,
		opening: 1031,
		year: 2010,
	},
	{
		closing: 2562,
		opening: 1813,
		year: 2011,
	},
	{
		closing: 2162,
		opening: 1385,
		year: 2012,
	},
	{
		closing: 1640,
		opening: 635,
		year: 2013,
	},
	{
		closing: 1326,
		opening: 632,
		year: 2014,
	},
	{
		opening: 534,
		closing: 988,
		year: 2015,
	},
	{
		closing: 879,
		opening: 418,
		year: 2016,
	},
	{
		closing: 975,
		opening: 522,
		year: 2017,
	},
	{
		opening: 445,
		closing: 777,
		year: 2018,
	},
	{
		closing: 616,
		opening: 203,
		year: 2019,
	},
]
const IITKGPData = [
	{
		closing: 664,
		opening: 268,
		year: 2010,
	},
	{
		closing: 562,
		opening: 136,
		year: 2011,
	},
	{
		closing: 429,
		opening: 241,
		year: 2012,
	},
	{
		closing: 396,
		opening: 240,
		year: 2013,
	},
	{
		closing: 305,
		opening: 180,
		year: 2014,
	},
	{
		opening: 300,
		closing: 213,
		year: 2015,
	},
	{
		closing: 286,
		opening: 181,
		year: 2016,
	},
	{
		closing: 262,
		opening: 160,
		year: 2017,
	},
	{
		opening: 272,
		closing: 92,
		year: 2018,
	},
	{
		closing: 283,
		opening: 204,
		year: 2019,
	},
]
const dataToErrorBars = (data) => {
	const result = {}
	data.forEach((yearData) => (result[yearData.year.toString()] = { plus: yearData.closing, minus: yearData.opening }))
	// console.log(result)
	return result
}
function useWindowSize() {
	const isClient = typeof window === 'object'

	function getSize() {
		return {
			width: isClient ? window.innerWidth : undefined,
			height: isClient ? window.innerHeight : undefined,
		}
	}

	const [windowSize, setWindowSize] = useState(getSize)

	useEffect(() => {
		if (!isClient) {
			return false
		}

		function handleResize() {
			setWindowSize(getSize())
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
		// eslint-disable-next-line
	}, [])

	return windowSize
}

const WhyRecruit = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className=" homepage background_change_temp">
			{' '}
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className=" recruit firstpage">
				<div className="recruit_1">
					<h1 className=" ">
						<center>Why Recruit Us?</center>
					</h1>
				</div>
				<div className="tryingforbg">
					<div data-aos="fade-up" className="firstpage_card">
						<div className=" card_bg">
							IIT Hyderabad is a second-generation IIT started in 2008 which can be credited for its
							unconventional approach in paving a path to provide quality education. Fractal academics
							program and virtual departments like Engineering Science, speak a great deal of innovation
							in IITH. We have been highly successful in building tie-ups with leading academic
							institutions around the globe. With a highly flexible academic structure, cutting-edge
							research, strong industry collaboration, and incubative environment for entrepreneurship,
							IITH is creating a unique holistic educational ecosystem, wherein students and faculty are
							continuously translating their dreams into realities.
						</div>
					</div>
				</div>
			</div>{' '}
			<p>
				<br />
			</p>
			<div className="recruit_grid">
				<div className="secondpage background_change_light_temp" id="campus_id">
					<div className="campuslife" style={{ color: 'black' }}>
						<br />
						<Typography variant="h3" style={{ fontSize: '1.9em', padding: '5% 2%' }}>
							<center>Campus life</center>
						</Typography>
						<img
							alt=""
							data-aos="zoom-in"
							aos-duration="1000"
							data-aos-easing="ease-in-sine"
							src={campusimage}
						/>

						<p className="para_color" style={{ padding: 25 }}>
							Along with the intense academic schedule and brain-storming class hours, the students of IIT
							Hyderabad indulge in extensive sporting action. The newly introduced mentoring of the
							students by faculty and alumni is expected to pump in positive energy into students’ lives.
							<br />
							<a href="/whyrecruit/extracurriculars" className="tounderline  tounderline1">
								Know more
							</a>
						</p>
					</div>
					<br />
					<hr className="hrclass" />
				</div>
				<div className="thirdpage background_change_light_temp" id="academics_id" style={{ color: 'black' }}>
					<br />
					<Typography variant="h3" style={{ fontSize: '1.9em', padding: '5% 2%' }}>
						<center>Academics</center>
					</Typography>
					<img
						alt=""
						data-aos="zoom-in"
						aos-duration="1000"
						data-aos-easing="ease-in-sine"
						id="building"
						src={academicsimage}
					/>
					<p className="para_color" style={{ padding: 25 }}>
						With fractal academics, many B.Tech courses are offered in finer granularity to provide breadth
						along with depth to the students. The fractal academics with interdisciplinary approach, with
						departments such as AI, Climate Change, Engineering sciences provide a unique academic
						atmosphere at IITH. <br />{' '}
						<a href="/whyrecruit/programs" className="tounderline  tounderline1">
							Know more
						</a>
					</p>
					<br />
					<hr className="hrclass" />
				</div>
				<div className="fourthpage background_change_light_temp" id="research_id" style={{ color: 'black' }}>
					<br />
					<Typography variant="h3" style={{ fontSize: '1.9em', padding: '5% 2%' }}>
						<center>Research</center>
					</Typography>
					<img
						alt=""
						data-aos="zoom-in"
						aos-duration="1000"
						data-aos-easing="ease-in-sine"
						src={researchimage}
					/>
					<p className="para_color" style={{ padding: 25 }}>
						Research and innovation are the foundations of IITH. IITH has a very vibrant research culture,
						which is exemplified by the patents and publications coming out of IITH. Around 500 sponsored
						research projects of Rs. 220 Crores are handled currently by our faculty members. <br />
						<a href="/whyrecruit/rnd" className="tounderline tounderline1">
							Know more
						</a>
					</p>
				</div>
			</div>
			<Footer />{' '}
		</div>
	)
}
export default WhyRecruit

export const Demographics = () => {
	return (
		<Fade in={true} mountOnEnter unmountOnExit>
			<div className="homepage" style={{ width: '100%', height: '100%' }}>
				<PieChart />
				<Footer />{' '}
			</div>
		</Fade>
	)
}
const PieChart = () => {
	const canvasRef = useRef()
	const canvasRef1 = useRef()
	const canvasRef2 = useRef()
	const canvasRef3 = useRef()
	const canvasRef4 = useRef()

	const getscreenwidth = useWindowSize()
	Chart.defaults.global.elements.line.borderWidth = 2
	useEffect(() => {
		const ctx = canvasRef.current.getContext('2d')
		const ctx1 = canvasRef1.current.getContext('2d')
		const ctx2 = canvasRef2.current.getContext('2d')
		const ctx3 = canvasRef3.current.getContext('2d')
		const ctx4 = canvasRef4.current.getContext('2d')

		new Chart(ctx, {
			type: 'bar',
			data: barChartData,
			options: {
				animation: {
					duration: 100,
				},
				tooltips: {
					callbacks: {
						beforeTitle: (a, b) => ``,
						afterTitle: (a, b) =>
							`Opening Rank: ${b.datasets[a[0].datasetIndex].errorBars[a[0].label].minus
							}\nClosing Rank: ${b.datasets[a[0].datasetIndex].errorBars[a[0].label].plus}`,

						title: (a, b) => `${b.datasets[a[0].datasetIndex].label}`,

						label: () => '',
					},
				},
				responsive: true,
				scales: {
					yAxes: [
						{
							ticks: {
								beginAtZero: true,
							},
						},
					],
				},
				legend: {
					display: false,
					position: 'bottom',
				},
				title: {
					display: false,
					text: 'Data',
				},
				plugins: {
					chartJsPluginErrorBars: {
						color: ['black'],

						width: '30%',
						absoluteValues: true,
					},
				},
			},
		})

		if (getscreenwidth.width > 1080) {
			new Chart(ctx1, {
				type: 'doughnut',
				data: pieChartData,
				options: {
					responsive: true,
					aspectRatio: 2.5,
					legend: {
						position: 'right',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
			new Chart(ctx2, {
				type: 'doughnut',
				data: pieChartData1,
				options: {
					responsive: true,

					legend: {
						position: 'left',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
			new Chart(ctx3, {
				type: 'doughnut',
				data: pieChartData2,
				options: {
					responsive: true,

					legend: {
						position: 'right',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
			new Chart(ctx4, {
				type: 'doughnut',
				data: pieChartData3,
				options: {
					responsive: true,

					legend: {
						position: 'left',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
		} else {
			new Chart(ctx1, {
				type: 'doughnut',
				data: pieChartData,
				options: {
					responsive: true,
					legend: {
						position: 'right',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
			new Chart(ctx2, {
				type: 'doughnut',
				data: pieChartData1,
				options: {
					responsive: true,
					aspectRatio: 0.9,

					legend: {
						position: 'bottom',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
			new Chart(ctx3, {
				type: 'doughnut',
				data: pieChartData2,
				options: {
					responsive: true,
					aspectRatio: 0.9,

					legend: {
						position: 'bottom',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
			new Chart(ctx4, {
				type: 'doughnut',
				data: pieChartData3,
				options: {
					responsive: true,
					aspectRatio: 1.2,

					legend: {
						position: 'bottom',
					},
					title: {
						display: false,
						text: 'Data',
					},
				},
			})
		}
	})

	return (
		<div className="extra" style={{ backgroundColor: '#f0f0f0' }}>
			<div className=" recruit_1 extracirricular_1">
				<h1 style={{ padding: 10 }}>
					<center>Graduating Batch Profile</center>
				</h1>
			</div>
			<div className="tryingforbg">
				<div className="firstpage_card firstpage_card1 card_bg">
					<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
						<center>Total Students - 753</center>
						<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
					</Typography>
					<div className="bargraph">
						<canvas ref={canvasRef1}>
							<center></center>
						</canvas>
					</div>
				</div>
			</div>
			<br />
			<h2 style={{ padding: 10, display: 'none' }}>
				<center>Opening and Closing ranks of IITH compared to IITKGP</center>
				<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
			</h2>
			<div className="graph0" style={{ display: 'none' }}>
				<div className="bargraph ">
					<canvas ref={canvasRef}>
						<center></center>
					</canvas>
				</div>
				<br />
			</div>
			<div className="graph-left">
				<Typography variant="h3" component="h2" style={{ fontSize: '1.9em', paddingTop: '4%' }}>
					<center>B-Tech Distribution-289</center>
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
				</Typography>
				<div className="bargraph graph1">
					<canvas ref={canvasRef2} className="canvas2-style">
						<center></center>
					</canvas>
				</div>
			</div>

			<div className="graph-right1">
				<Typography variant="h3" component="h2" style={{ fontSize: '1.9em', paddingTop: '4%' }}>
					<center>M-Tech Distribution-322</center>
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
				</Typography>
				<div className="bargraph graph1">
					<canvas ref={canvasRef3}>
						<center></center>
					</canvas>
				</div>
			</div>

			<div className="graph-left">
				<Typography variant="h3" component="h2" style={{ fontSize: '1.9em', paddingTop: '4%' }}>
					<center>MSc. Distribution-89</center>
					<hr style={{ width: '20%', border: '1px solid black', color: 'black' }} />
				</Typography>
				<div className="bargraph graph1">
					<canvas ref={canvasRef4}>
						<center></center>
					</canvas>
				</div>
			</div>

			<br />
			<br />
		</div>
	)
}

export const ResearchAndDevelopment = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])
	return (
		<div className="recruit">
			<div className="research1 background_change_temp">
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className=" recruit_1 research_1">
					<h1 className="heading_programs heading_color">
						<center>Research And Development at IIT-Hyderabad</center>
					</h1>
				</div>
				<div className="tryingforbg">
					<div data-aos="fade-up" className="programs_something firstpage_card background_change_light">
						<div>
							<img alt="" src={main_page_image} className="research2_image" />
						</div>
						<div className="research2_text  ">
							<div className="para_color">
								Research and innovation are the core of what IITH stands for. The dynamicity in research
								culture is evident from the ever-increasing number of patents and publications published
								by the institute. The institute has also successfully amassed tie-ups with leading
								academic institutions around the globe over the course of history. The nurturing
								environment of the institute helps new ideas to grow and flourish. IITH is the cradle
								for inventions and innovations.
							</div>
						</div>
					</div>
				</div>
				<div>
					<br />
				</div>

				<div className="res_and_inc background_change_dark_temp  ">
					<div>
						<a href="#move1" className=" button_bg">
							Research Highlights
						</a>
					</div>
					<div>
						<a href="#move2" className=" button_bg">
							Incubation Center
						</a>
					</div>
				</div>
				<p>
					<br />
				</p>
				<br />
				<Typography variant="h3" id="move1" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
					<center> Research Highlights </center>
					<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
				</Typography>

				<div className="achievements_panel background_change_light">
					<div className="research2_3 para_color">
						<ul>
							<p>
								IITH houses several state-of-the-art facilities with over a hundred research
								laboratories equipped with sophisticated research equipment to facilitate cutting edge
								research.
							</p>

							<p>
								IITH faculty members are currently involved in a large number of research projects which
								require interdisciplinary approach:
							</p>
						</ul>
					</div>
					<div className="images_grid">
						<div className="image_container">
							<img src={img1} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">5G and Next Generation Communication Technologies</div>
							</div>
						</div>

						<div className="image_container">
							<img src={img2} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Additive Manufacturing</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img3} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Artificial Intelligence</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img4} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Bio-inspired Processes and Systems</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img5} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Catalysis</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img6} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Climate Change</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img7} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Energy</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img8} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Healthcare</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img9} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Integrated Computational Engineering</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img10} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Nano-X</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img11} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Sensors and Devices</div>
							</div>
						</div>
						<div className="image_container">
							<img src={img12} alt="" className="list_image" />
							<div className="overlay_text">
								<div className="text_on_image">Technology Research Park</div>
							</div>
						</div>
					</div>
					<div className="research2_3 para_color">
						<ul>
							<p>
								IITH Technology Research Park is an independent Section 8 Company, founded, promoted and
								hosted by IIT Hyderabad, governed by a Board of distinguished academicians, faculty of
								IIT Hyderabad and industry professionals, to inoculate the idea of innovative
								Entrepreneurship in collaboration with Research Development.
							</p>

							<p>
								The IIT-H Research Park promotes the advancement of research and development by the
								institute through close partnership with industry, aiding in the advancement of modern
								ventures and build-up boosting economic development. It assists organizations with
								research targets in setting up infrastructures in the park and to utilise the expertise
								provided by the institute. Industry-level facilities, Expert’s support, Incubation Cell
								are few perks. For further details: &nbsp;
								<br />
								<a href="http://trp.iith.ac.in/" className="tounderline tounderline1">
									Learn more.
								</a>
							</p>
						</ul>
					</div>
				</div>

				<br />
				<br />

				<p />
				<div className="background_change_temp">
					<Typography variant="h3" id="move2" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
						<center>Incubation Cell</center>
						<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
					</Typography>

					<div className="achievements_panel background_change_light ">
						<ul>
							<p className="research2_3 para_color">
								i-TIC Foundation is the Technology Business Incubator (TBI) at IIT Hyderabad. It
								provides the necessary facilities to start-up companies, along with guidance and
								mentoring by the faculty members of IITH and experts from the industry, to develop a
								robust ecosystem for entrepreneurship. For further details: &nbsp;
								<br />
								<a
									href="https://i-tic.iith.ac.in/home#h.p_AkBCcSg-PKk0"
									className="tounderline tounderline1"
								>
									Learn more.
								</a>
								&nbsp;
							</p>

							<p className="research2_3 para_color">
								The main areas at the Incubator are Artificial Intelligence, Aerospace,
								Telecommunication, Digital Manufacturing, Chip Design, Sensors, IT, Bio-Medical,
								Automotive, Advanced Materials, Energy, Flexible Electronics and Other Emerging
								Technologies. A few companies that are incubated, related to ICT are SKIoT (IoT),
								Acausal (Robotics), Sense Health (Bio-Medical), Osure (Healthcare) and Skelregen (Bio
								Material).
							</p>
						</ul>
					</div>
				</div>
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
			</div>{' '}
			<Footer />{' '}
		</div>
	)
}
export const Extracurriculars = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])
	return (
		<div className="recruit">
			<div className="extra">
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className="extra_fullscreen">
					<div className=" recruit_1 extracirricular_1">
						<h1 className=" ">
							<center>Extracurriculars</center>
						</h1>
					</div>
					<div className="tryingforbg">
						<div data-aos="fade-up" className="firstpage_card card_bg">
							{' '}
							IIT Hyderabad is a place where you do not just gain academic knowledge but also where your
							overall personality development takes place. And it’s the extra-curricular activities that
							are responsible for grooming your overall personality. Student bodies here work
							independently for several club activities, festivals, administration of hostels and many
							more. Wherever possible, IIT-H gives the responsibility to students ranging from institute
							websites to national level festivals. These activities help to get exposure to things and
							activities that reside outside of your academic curriculum.
						</div>
					</div>

					<a href="#scrollhere" className="center-con">
						<div className="round" style={{ color: 'black' }}>
							<span></span>
							<span></span>
							<span></span>
							<span></span>
						</div>
					</a>
					<br />
				</div>

				<div style={{ backgroundColor: '#00000' }} id="scrollhere">
					<div className="parallax1">
						<center style={{ color: 'white ' }}> Annual Festivals</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Annual Festivals
						</Typography>
						These festivals are completely run by a group of students, which is being served as a great
						platform for the development of communication skills, leadership and management skills. Every
						year three major fests are run in the fields of literary, techno-cultural and entrepreneurship.{' '}
						<br />
						<br />
					</div>
					<div className="parallax2">
						<center style={{ color: 'white' }}> Elan &amp; &eta;vision</center>
					</div>

					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Elan &amp; &eta;vision{' '}
						</Typography>
						Elan &amp; &eta;vision is the technical-cum-Cultural Festival of IIT Hyderabad. Being the best
						fest in AP and Telangana combined, the three-day journey through the festive atmosphere, various
						technical and cultural events, knowledge leverageable workshops, challenging hackathons,
						fun-filled games, and exhilarating pro shows surely had left a lot of people craving for more
						since its inception. It is the best exhibition of the management and organizational skills of
						the students. Its motto is to provide a platform to the technical and cultural enthusiasts of
						our country to explore, innovate and showcase their technical and engineering prowess. The
						students&rsquo; active participation in cultural, technical and literary competitions has made
						it grand prosperity. Elan &amp; Nvision is an elegant brew of culture, innovation and technology
						- with an exhilarating atmosphere of intense competitions, professional performances and a
						carefully fabricated range of events, covering varied genres in art, music and technology.
						<br />
						All The domains of the fest are overlooked by the students such as :<br /> Sponsorship, Finance,
						Online publicity, Culti, Techy, Creatives, Hospitality, Informals, Workshops, Campus publicity,
						Marketing, Production, Hackathons &amp; Exhibitions, Multimedia, Security, Social cause, Biggies
						&amp; EML, Pronites, Infra and Transport.
						<p>
							<br />
						</p>
					</div>
					<div className="parallax3">
						<center style={{ color: 'white ' }}>E-summit</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							E-Summit{' '}
							<a
								href="http://ecell.iith.ac.in/esummit/index.html"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						With the annual flagship event E-Summit, the team of E-Cell attempts to inspire and educate
						students who are inclined towards entrepreneurship and introduce them to the entrepreneur
						culture. It also consists of Panels and Talks to provide insights into the business world with
						some of the most experienced players in the business and entrepreneurship. With competitions
						such as E-Pic, Case Study and Pitch Showdown, we provide an open space for young minds to
						present their ideas and gain funding for it.
						<p>
							<br />
						</p>
					</div>
					<div className="parallax4">
						<center style={{ color: 'white' }}>Zozimus</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Zozimus{' '}
							<a
								href="https://www.zozimus.in/"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						Zozimus is the literary fest of IIT Hyderabad. It is the celebration of gathering of literary
						enthusiasts and groups from in-and-around Hyderabad. Through the literary fest, we desire to
						connect like-minded college students and others who wish to be a part of this exciting scene.The
						day-long fete will host quizzing, debating, writing, and speaking competitions, along with other
						fun literary events running throughout the day. The whole event is managed by these student-body
						domains - Marketing, Finance, Events, Web and Creatives, Litfest, Publicity, Multimedia, Hospi,
						Infra and Transport.
						<br />
						<p>
							<br />
						</p>
					</div>
					<div className="parallax5">
						<center style={{ color: 'white ' }}>Club Activities</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Club Activities
						</Typography>
						Clubs are an integral part of any college. Depending on the area of interest of students they
						can choose the club they want to join, thus allowing members to develop their skills and
						intrigues in that area. Many of the activities offered by clubs help students to extend and
						elaborate on the more formal knowledge learned in theory. Club activities develop technical
						skills, managerial and leadership skills in students. Clubs can be broadly divided into two
						parts: Sci-tech and cultural clubs.
						<div style={{ margin: '2% ', backgroundColor: 'white', padding: '3%' }}>
							<legend>
								&nbsp;&nbsp;Sci-Tech Clubs{' '}
								<a
									href="https://scitech-iith.netlify.app/"
									style={{ verticalAlign: 'middle', color: 'black' }}
									target="blank"
								>
									<GoLinkExternal />
								</a>
							</legend>
							<hr
								style={{ width: '150px', border: '1px solid black', marginLeft: '5%', color: 'black' }}
							/>
							<ul>
								<li>Kludge: The information security and networking club.</li>
								<li>Infero: The programming and algorithms club.</li>
								<li>Electronica: The electronics and signal processing club.</li>
								<li>Cepheid: The astronomy club.</li>
								<li>Torque: The automobile engineering and designing club.</li>
								<li>Robotics: The robotics and automation club.</li>
								<li>Aero Club: The aeronautics and drone design club.</li>
								<li>Lambda: The development club.</li>
								<li>Prakriti: The nature club.</li>
								<li>
									IITH Racing: The racing club, which participates in racing competitions with
									self-designed racing cars.
								</li>
							</ul>
						</div>
						<p>
							<br />
						</p>
						<div style={{ margin: '2% ', backgroundColor: 'white', padding: '3%' }}>
							<legend>
								&nbsp;&nbsp;Cultural Clubs{' '}
								<a
									href="https://cultiith.com/"
									style={{ verticalAlign: 'middle', color: 'black' }}
									target="blank"
								>
									<GoLinkExternal />
								</a>
							</legend>
							<hr
								style={{ width: '150px', border: '1px solid black', marginLeft: '5%', color: 'black' }}
							/>

							<ul className="para_color">
								<li>Gesture: The art club.</li>
								<li>Behind the lens: The film club.</li>
								<li>Infocus: The photography club.</li>
								<li>Vibes: The music club.</li>
								<li>Shuffle Crew: The dance club.</li>
								<li>Rang de Manch: The drama club.</li>
								<li>
									Litsoc: The literary society of IITH, for literary enthusiasts it hosts regular
									events like quizzes, debates, story-telling and many more.&nbsp;
								</li>
							</ul>
						</div>
						<p>
							<br />
						</p>
					</div>
					<div className="parallax6">
						<center style={{ color: 'white ' }}>Student Gym</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Student Gymkhana{' '}
							<a
								href="http://gymkhana.iith.ac.in/"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						&lsquo;Gym-khana&rsquo; is a student-governed body, which ascertains the smooth functioning of
						all the student affairs. It also acts as a link between the administration and the students.
						Every domain has a council associated with it, which avails the secretaries in conducting
						various activities throughout the year. These members manage all the activities in their
						respective areas with the President coordinating them all. It oversees all the aspects of the
						students&#39; life during their stay at IIT Hyderabad and is perpetually trying to amend their
						life here.&nbsp;
						<br />
						<p>
							<br />
						</p>
					</div>
					<div className="parallax7">
						<center style={{ color: 'white ' }}>E-Cell</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Entrepreneurship cell{' '}
							<a
								href="http://ecell.iith.ac.in/"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						E-Cell IITH aims to inspire students and build an entrepreneur spirit among them, to have a
						vision and build on it. It conducts various events over the year, including Hackathons,
						workshops and KickStart-X and Talks and Panels with leading experts in the industry. They have
						worked alongside Hult Prize, and StartUp Jalsa, to find new ideas among youth and provide them
						with guidance and reach in the open and broader market. They also have tie-ups with Tech
						Incubators such as T-hub, TiE Hyderabad to provide stable builds to budding startups.&nbsp;
						<p>
							<br />
						</p>
					</div>
					<div className="parallax8">
						<center style={{ color: 'white' }}>Milan</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Milan
						</Typography>
						It is the annual techno-cultural-sports general championship of IIT Hyderabad. These
						competitions inspire people to work harder to get ahead. It consists of 10 Sports, 15 Cultural
						and 6 technical events conducted between hostel blocks. A series of competitions are conducted
						between 12 hostel blocks and the results obtained from cultural, technological and sports
						competitions result in the overall championship.
						<p>
							<br />
						</p>
					</div>
					<div className="parallax9">
						<center style={{ color: 'white ' }}>Sports</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Sports{' '}
							<a
								href="https://sports.iith.ac.in/"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						IITH provides full-fledged facilities for all outdoor sports. The campus is well equipped with
						indoor and outdoor sports which includes basketball, volleyball, football, cricket, lawn tennis,
						table tennis, Hockey, Squash, Swimming and also a well-equipped gymnasium. The untiring
						commitment and enthusiasm of the student community, with encouragement and guidance from the
						faculty, has created tremendous opportunities for students to hone their talents and has shown
						great results at Inter-IIT sports meet. IIT Hyderabad has constantly been visiting and inviting
						colleges for one-day sports meets to strengthen bonds and inculcate the spirit of sportsmanship.
						<p>
							<br />
						</p>
					</div>
					<div className="parallax10">
						<center style={{ color: 'white ' }}>National Service Scheme</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							National Service Scheme(NSS){' '}
							<a
								href="https://sports.iith.ac.in/"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						NSS IITH as an independent body shall form a union with institute&rsquo;s faculty and students
						as members for both planning and executing the event/activities with the help of IITH community.
						The Student Body forms the core team of NSS IITH and is supported by an Advisory Committee. With
						the motto of - &lsquo;NOT ME BUT YOU&rsquo;, NSS IITHyderabad shall practice national
						integration by understanding the needs and problems of community in nearby villages and within
						the institute and by holding educational drives, cleanliness and health campaigns for their
						welfare.
						<p>
							<br />
						</p>
					</div>
					<div className="parallax11">
						<center style={{ color: 'white' }}>Sunshine</center>
					</div>
					<div className="addmargin">
						<Typography
							variant="h3"
							id="move1"
							style={{ fontSize: '1.9em', padding: '2% 0%' }}
							component="h2"
						>
							Sunshine{' '}
							<a
								href="http://sunshine.iith.ac.in/"
								style={{ verticalAlign: 'middle', color: 'black' }}
								target="blank"
							>
								<GoLinkExternal />
							</a>
						</Typography>
						Sunshine- the counselling cell at IIT- H, has been committed to helping the student community.
						The trained student mentors help other students in an unbiased manner, enabling them to run the
						program in an efficient way. The student mentorship program is aimed at offering the incoming
						students an interface to understand and interact with the diverse student community at IITH. By
						conducting various events such as Ice-breakers, Amazing race, Sunshine night, students are
						provided with ample opportunities to develop their soft skills and thereby broaden their
						perspective. On the whole, the program aims to provide the incoming students with a cordial
						environment to make their transition to the IITH way of life as smooth and fun-filled as
						possible.
						<br />
						<p>
							<br />
						</p>
					</div>
				</div>
			</div>{' '}
			<Footer />{' '}
		</div>
	)
}
export const Forms = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('form_button')
		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', handleClick) //Older syntax
		}
		function handleClick() {
			window.open('https://docs.google.com/document/d/14ka3xI5Vb4GIy3QMNh1XqHGXAR7wLBA64rz2BLH_2oU')
		}
		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
		}
	})

	return (
		<div className="recruit">
			<Fade in>
				<div>
					<BackgroundChanger backgroundColor="#f0f0f0" />
					<div style={{ padding: 15, backgroundColor: '#002238' }} />
					<div style={{ padding: 18, backgroundColor: '#002238' }} />
					<p>
						<br />
					</p>{' '}
					<div className="portalguide">
						<div>
							{' '}
							<Card
								variant="contained"
								style={{
									backgroundColor: '#ffffff',
									width: '90%',
									padding: 25,
									maxWidth: '400px',
									margin: '5%',
								}}
								id="java1"
							>
								<CardContent>
									<Typography variant="h3" component="h2">
										Placement Brochure
									</Typography>
									<Typography variant="body1" component="p">
										Placement Brochure for 2022-2023
									</Typography>
								</CardContent>
								<CardActions>
									<Button variant="default" size="small" href={placementbrochure} target="_blank">
										Open
									</Button>
								</CardActions>
							</Card>
						</div>

						<div>
							<Card
								variant="contained"
								style={{
									backgroundColor: '#ffffff',
									padding: 25,
									width: '90%',
									maxWidth: '400px',
									margin: '5%',
								}}
								id="java2"
							>
								<CardContent>
									<Typography variant="h3" component="h2">
										Internship Brochure
									</Typography>
									<Typography variant="body1" component="p">
										Internship Brochure for 2022-2023
									</Typography>
								</CardContent>
								<CardActions>
									<Button variant="default" size="small" href={internshipbrochure} target="_blank">
										Open
									</Button>
								</CardActions>
							</Card>
						</div>
					</div>
				</div>
			</Fade>
			<p>
				<br />
			</p>
			<p>
				<br />
			</p>
			<Footer />
		</div>
	)
}
export const Achievements = () => {
	useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])
	return (
		<div className="homepage background_change">
			<BackgroundChanger backgroundColor="#f0f0f0" />
			<div className="firstpage recruit">
				<div className="recruit_1 extracirricular_1">
					<h1 className=" ">
						<center>Achievements</center>
					</h1>
				</div>
				<div className="tryingforbg">
					<div data-aos="fade-up" className="firstpage_card firstpage_card1">
						<div className=" card_bg">
							IITH is one of the top young IITs started by the government of India in 2008.In India, IITH
							has retained its position of No.8 among engineering institutes by the National Institutional
							Ranking Framework in ‘Engineering’ Category. IIT Hyderabad has improved its ranking in
							‘Overall’ Category of NIRF 2020, achieving No.17 this year compared to No.22 last year. IIT
							Hyderabad was ranked 201 in Asia by the QS World IITH has retained its position of No.94
							among BRICS nations in 2020 and has been given a rank of 135 in Asia University Rankings
							2019. <br />
							IIT Hyderabad was ranked 198 in Asia by the QS World University Rankings of 2019 and has
							been placed in #601-650 ranking band in QS World University Rankings 2021. The Research
							Output of the Institute is ranked as “Very High”.
							<br />
							IIT Hyderabad is ranked among the 10 Best Institutes in India.
						</div>
					</div>
				</div>
				<br />
				<br />
				<img src={logo1} alt="" className="crest_image" />
			</div>{' '}
			<br />
			<br />
			<div className="achieve">
				<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
					<center>Some of the Major Innovations of IITH</center>{' '}
					<hr style={{ width: '40%', border: '1px solid black', color: 'black' }} />
				</Typography>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ fontSize: '1.6em', padding: '2% 0%' }}>
						Fractal Academics:
					</Typography>
					<span className="para_color">
						The Fractal Program at IITH atomizes the courses into breadth and depth, thereby enabling
						interdisciplinary learning with a wide choice of basic courses and advanced electives.
					</span>
				</div>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ fontSize: '1.6em', padding: '2% 0%' }}>
						Entrepreneurship:
					</Typography>
					<span className="para_color">
						Entrepreneurship program at IITH focuses on developing real-world skills that will help students
						to lead exceptional lives in a rapidly changing world. IIT-H offers a minor program in
						entrepreneurship. Entrepreneurship-focused courses teach students crucial life skills like
						problem-solving, teamwork, empathy, as well as learning to accept failure as a part of the
						growth process, that will help them navigate their future. The courses in this program are
						offered by industrialists who are entrepreneurs themselves.{' '}
					</span>{' '}
				</div>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ fontSize: '1.6em', padding: '2% 0%' }}>
						Double Major and Minors:
					</Typography>
					<span className="para_color">
						At IIT-H the B.Tech students are exposed to a number of courses that are in the fields of
						liberal arts and creative arts. The concept of holistic education is reinforced by free
						electives, which the students take from another engineering/science/arts/design departments.
					</span>{' '}
				</div>
				<div className="background_change_light achievements_panel" style={{ paddingTop: '1%' }}>
					<Typography variant="h4" style={{ fontSize: '1.6em', padding: '2% 0%' }}>
						Holistic Education:
					</Typography>
					<span className="para_color">
						At IIT-H the B.Tech students are exposed to a number of courses that are in the fields of
						liberal arts and creative arts. The concept of holistic education is reinforced by free
						electives, which the students take from another engineering/science/arts/design departments.
					</span>{' '}
				</div>
				<p>
					<br />
				</p>
				<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }}>
					<center>Academic Awards and Achievements</center>{' '}
					<hr style={{ width: '40%', border: '1px solid black', color: 'black' }} />
				</Typography>{' '}
				<br />
				<div className="wrapper">
					<div className="box box1">IITH Students won Smart India Hackathon 2019.</div>
					<div className="box box2">Dr.D.S.Sharada won the TAS Award.</div>
					<div className="box box3">AE Young Achiever Award to Dr.Chandra Shekhar Sharma.</div>
					<div className="box box4">Dr.Syed Quadir Moinuddin won the ‘Weldwell Speciality Award 2019’</div>
					<div className="box box5">Dr.Debaprasad Shee won the TAS Award.</div>
					<div className="box box6">
						Ms.Poonam Rani won ‘Best Poster Presentation’ Award during National Conference on Solid State
						#Ionics held at IIT Roorkee.
					</div>
					<div className="box box7">Ms.Ankita Kolat has won Metrohm Young #chemist Award.</div>
					<div className="box box8">
						T.Appidi, R.Srivastava, Tejaswini Appidi, Deepak Bharadwaj and Dr.Arvind Rengan won Best Poster
						Award at IEEE NMDC 2019 Conference, Stockholm.{' '}
					</div>
					<div className="box box9">Dr.Sai Santosh Kumar Raavi won the TAS Award.</div>
					<div className="box box10">
						Mr.S.Yempalle’s Animated short film ‘Ek Cup Chaha’ has won @ awards at Anifest 2019.
					</div>
					<div className="box box11">
						Dr.Manohar Kaul, Mr.Jain Chauhan and Mr.Deepak Nathani paper was accepted at the international
						conference on learning Representations 2020.
					</div>
					<div className="box box12">
						Mr.Mamidi Suresh got first prize in the Best Poster Award during the 2nd Annual IISER Pune-KPIT
						international PhD Conference.
					</div>
					<div className="box box13">
						Mr.Koushik Makur and Ms.Tejaswini Appidi selection for the Newton Bhabha Programme.
					</div>
					<div className="box box14">
						Pinaka, by Mr.Akash Banerjee, Ms.Eti Chaudhary and Dr.Saurabh Joshi placed 3rd in Reach
						Safety-Floats subcategory.
					</div>
					<div className="box box15">
						Dr.Anil Agarwal has been jointly awarded the Young Turk of Composites Award 2019-20.
					</div>
					<div className="box box16">
						Ms.Swarnalatha Mailaram, Mr.Nitesh Dobhal and Mr.Sunil K.Maity won the ‘Best Paper Award’ during
						the 7th ICAER 2019 Conference.
					</div>
					<div className="box box17">
						IITH secured a total of 6 medals in Inter-IIT Meet-2019, 3 silver and 3 Bronze Medals.
					</div>
				</div>
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
			</div>{' '}
			<Footer />{' '}
		</div>
	)
}

const responsive = {
	superLargeDesktop: {
		// the naming can be any, depends on you.
		breakpoint: { max: 4000, min: 3000 },
		items: 10,
	},
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 6,
		partialVisibilityGutter: 30,
	},
	tablet: {
		breakpoint: { max: 1024, min: 550 },
		items: 3,
	},
	mobile: {
		breakpoint: { max: 400, min: 0 },
		items: 1.7,
	},
	mobile2: {
		breakpoint: { max: 550, min: 400 },
		items: 1.9,
	},
}

export const JapanDay = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })
	}, [])

	return (
		<div className="recruit">
			<div className="container background_change_temp">
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className="container3 ">
					<div className="recruit_1 ">
						<h1 className=" ">
							<center>
								<img src={jetro} className="programs_img_logo" alt="" />
								<img src={iithlogo} className="programs_img_logo" alt="" />
								<img src={jica} className="programs_img_logo" alt="" />
							</center>
							<center>Japan Day</center>
						</h1>
					</div>
					<div className="tryingforbg">
						<div
							data-aos="fade-up"
							className="firstpage_card background_change_light"
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<center style={{ fontSize: '1.2rem' }}>
								Over the years, various Japanese companies have been participating in Japan Day and Campus placements and recruiting students for Placements & Internships. 10 Japanese companies attended the Offline online “JAPAN DAY 2022” @IIT Hyderabad on 24th September 2022. Joint Industry-Academia-Government session has been held for the first time as an initial interactive opportunity for nurturing future collaboration between India and Japan. &nbsp;
							</center>
							{/* <div style={{ marginTop: '40px' }}></div> */}
							<div className='japandayimagesbox'>
								<img src={japanday2022} className="programs_img_japan" alt="" />
								{/* <iframe
									src="https://www.youtube.com/embed/T4e8tFwFsio"
									title="YouTube video player"
									frameborder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowfullscreen
								></iframe> */}
							</div>
							<div style={{ marginTop: '30px' }}></div>
							<div style={{ fontSize: '1.2rem' }}>
								<center>
									<strong>
										5th Edition of Japan Day concluded at IIT Hyderabad
									</strong>
									<br />
								</center>
								<div style={{ marginTop: '10px' }}></div>
								Highlights:
								<ul style={{ marginTop: '0px' }}>
									<li>1st offline Joint Industry-Academia session post-pandemic</li>
									<li>10 Japanese entities participated in the event</li>
									<li>Established firms to Entrepreneurs have shown interest in IITH Talents</li>
								</ul>
								<center>
									Expressing his delight on occasion, Toshihiro Mizutani, Director General, JETRO Bengaluru, said, “Even during these tough times of COVID, Japanese firms have shown keen interest to be part of the physical event this year. Their eagerness to interact with students and hire the talent in IITH is hence obvious. With every JAPAN DAY, we see new changes in the Japanese working style like flexible remote work culture, some adopting English as the main language of business communication and so on. We hope this makes it easier for Indians to choose Japan as a country to work with, and together we can succeed in this era of globalization.”&nbsp;
									<a href='https://pcr.iith.ac.in/files/pressrelease/JD22.pdf' target='_blank'>Read More...</a>
								</center>
							</div>
							
							<div style={{ marginTop: '50px' }}></div>
							<center>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-around',
										alignItems: 'center',
										width: '300px',
									}}
								>
									<a
										href="https://twitter.com/IITHyderabad/status/1573749544113741824?s=20&t=wiOQz1qOHwdrZp7vOLgh4g"
										target="_blank"
										rel="noreferer"
									>
										<FaTwitter size={50} color="#1DA1F2" />
									</a>
									<a
										href="https://fb.watch/fL2WVtxfbr/"
										target="_blank"
										rel="noreferer"
									>
										<FaFacebook size={50} color="#4267B2" />
									</a>
									<a
										href="https://www.linkedin.com/feed/update/urn:li:activity:6979511707941392384"
										target="_blank"
										rel="noreferer"
									>
										<FaLinkedin size={50} color="#2867B2" />
									</a>
									<a
										href="https://www.instagram.com/tv/Ci5mudjAMEP/?utm_source=ig_web_copy_link"
										target="_blank"
										rel="noreferer"
									>
										<FaInstagram size={50} color="#bc2a8d" />
									</a>
								</div>
							</center>
						</div>
					</div>
					{/* <div style={{ marginTop: '200px' }}></div>
					<div className="tryingforbg">
						<div
							data-aos="fade-up"
							className="programs_something firstpage_card background_change_light"
							style={{ display: 'flex', flexDirection: 'column' }}
						>
							<div style={{ marginTop: '20px' }}>
								<div>
									Why Japan? Have a look at{' '}
									<a href="https://www.youtube.com/watch?v=Dv6vKNFte3s">this</a> video
								</div>
								<center>
									<a href="https://twitter.com/IITHyderabad/status/1437313037644361729?s=20">
										Twitter
									</a>{' '}
								</center>
								<center>
									<a href="https://www.linkedin.com/feed/update/urn:li:activity:6843078925329940480">
										Linked In
									</a>{' '}
								</center>
							</div>
						</div>
					</div> */}
					<br />
					{/* <Carousel
						centerMode={false}
						swipeable={true}
						infinite={true}
						autoPlay={true}
						removeArrowOnDeviceType={['tablet', 'mobile', 'mobile2']}
						autoPlaySpeed={1500}
						customTransition="transform 300ms ease-in-out"
						focusOnSelect={true}
						transitionDuration={500}
						responsive={responsive}
						className="carousel"
					></Carousel> */}
				</div>
			</div>
		</div>
	)
}

export const Programs = () => {
	React.useEffect(() => {
		Aos.init({ duration: 1500 })

		var coll = document.getElementsByClassName('collapsible')
		var i

		for (i = 0; i < coll.length; i++) {
			coll[i].addEventListener('click', handleClick) //Older syntax
		}

		//coll.map(element => element.addEventListener('click', handleClick)) 	//Newer syntax

		function handleClick(e) {

			this.classList.toggle('active')
			var content = this.nextElementSibling
			if (content.style.maxHeight) {
				content.style.maxHeight = null
			} else {
				content.style.maxHeight = content.scrollHeight + 'px'
			}

		}

		return () => {
			for (i = 0; i < coll.length; i++) {
				coll[i].removeEventListener('click', handleClick)
			}
		}
	})

	return (
		<div className="recruit">
			<div className="container background_change_temp">
				<BackgroundChanger backgroundColor="#f0f0f0" />
				<div className="container3 ">
					<div className="recruit_1 ">
						<h1 className=" ">
							<center>Programs Offered at IIT-H</center>
						</h1>
					</div>
					<div className="tryingforbg">
						<div data-aos="fade-up" className="programs_something firstpage_card background_change_light">
							<img src={studentlogo} className="programs_img" alt="" />
							<div className="para_color">
								The various departments (engineering, science, liberal arts and design) of IIT Hyderabad
								offer undergraduate, postgraduate and Ph.D programs. The assorted and specialized
								programs give students of IIT-H an edge over. IIT Hyderabad has a pliable academic
								structure, cutting-edge research and strong industry collaboration.&nbsp;
							</div>
						</div>
					</div>
					<br />
				</div>
				<p>
					<br />
				</p>
				<div>
					<button type="button" className="collapsible">
						B. Tech
					</button>
					<div className="content ">
						<div className="container1 para_color background_change_light">
							<p>
								IIT Hyderabad offers Bachelor of Technology programs in ten different branches (core and
								non-core). This is a four-year undergraduate program spread across 8 semesters and
								provides requisite background of various aspects of engineering.{' '}
							</p>
							<br />
							<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
								<center>Departments</center>
								<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
							</Typography>

							<div className="programs_grid">
								<a href={ai} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Artificial Intelligence
									</div>
								</a>

								<a href={ch} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Chemical Engineering
									</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Civil Engineering&nbsp;
									</div>
								</a>

								<a href={co} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Computer Science and Engineering&nbsp;
									</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Electrical Engineering
									</div>
								</a>

								<a href={ep} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Engineering Physics
									</div>
								</a>

								<div className="toggle-brochures">
									<div className="programs_card toggle-display" style={{ lineHeight: '1.4' }}>
										&nbsp;Engineering Science
									</div>
									<a href={esI} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" style={{ lineHeight: '1.4' }}>
											&nbsp;Internship
										</div>
									</a>
									<a href={es} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" style={{ lineHeight: '1.4' }}>
											&nbsp;Placement
										</div>
									</a>
								</div>

								<a href={ms} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" style={{ lineHeight: '1.4' }}>
										&nbsp;Materials Science and Metallurgical Engineering&nbsp;
									</div>
								</a>

								<a href={ma} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" target="blank" style={{ lineHeight: '1.4' }}>
										&nbsp;Mathematics and Computing&nbsp;
									</div>
								</a>

								<div className="toggle-brochures">
									<div className="programs_card toggle-display" style={{ lineHeight: '1.4' }}>
										&nbsp;Mechanical and Aerospace Engineering
									</div>
									<a href={meI} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" style={{ lineHeight: '1.4' }}>
											&nbsp;Internship
										</div>
									</a>
									<a href={as} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" style={{ lineHeight: '1.4' }}>
											&nbsp;Placement
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						M. Tech (2 years)
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								IIT Hyderabad offers Master of Technology (2 years) program in the following departments
								and the admission to all the below programs is through GATE scores and sponsored
								category (Govt/Industry/Self). This is a Postgraduate specialized course comprising
								research along with regular coursework. Each student is involved in a project which
								enables them to tackle practical problems of design and development. &nbsp;
							</p>
							<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
								<center>Departments</center>
								<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
							</Typography>
							<div className="programs_grid">
								<a href={am} target="blank" style={{ color: 'black' }}>
									<div className="programs_card"> Additive Manufacturing </div>
								</a>

								<a href={ai} target="blank" style={{ color: 'black' }}>
									<div className="programs_card"> Artificial Intelligence and Machine Learning </div>
								</a>

								<div className="toggle-brochures">
									<div className="programs_card toggle-display" style={{ lineHeight: '1.4' }}>
										&nbsp;Biomedical Engineering
									</div>
									<a href={bioI} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" style={{ lineHeight: '1.4' }}>
											&nbsp;Internship
										</div>
									</a>
									<a href={bio} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" style={{ lineHeight: '1.4' }}>
											&nbsp;Placement
										</div>
									</a>
								</div>


								<a href={bt} target="blank" style={{ color: 'black' }}>
									<div className="programs_card"> Bio-Technology </div>
								</a>

								<a href={ch} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Chemical Engineering</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">
										Civil Enviromental and Water Resources Engineering{' '}
									</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Civil Structural Engineering </div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Civil Geo-Technical Engineering</div>
								</a>

								<a href={cl} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Climate Change</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">&nbsp;Communication and Signal Processing</div>
								</a>

								<a href={co} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Computer Science and Engineering</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Electrical Engineering</div>
								</a>

								<a href={st} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Energy Science and Technology</div>
								</a>

								<a href={ew} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">E-waste Resource Engineering and Management</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Geo-technical Engineering</div>
								</a>

								<a href={ew} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Hydraulics and Water Resource Engineering</div>
								</a>

								{/* <a href={ss} target="blank" style={{ color: 'black' }}> */}
								<div className="programs_card">Integrated Design and Manufacturing</div>
								{/* </a> */}

								<a href={ss} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Integrated Sensor Systems</div>
								</a>

								<a href={ai} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Machine Learning</div>
								</a>

								<a href={ms} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Materials Science and Metallurgical Engineering</div>
								</a>

								<a href={ms} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Materials Science Engineering(All Course)</div>
								</a>

								<a href={as} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Mechanical Engineering</div>
								</a>

								<a href={as} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Mechanical Thermo-Fluid Engineering</div>
								</a>

								<a href={as} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Mechanics and Design</div>
								</a>

								<a href={mdi} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">&nbsp;Medical Device Innovation</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">&nbsp;Microelectronics and VLSI</div>
								</a>

								<a href={pbs} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Polymer and Bio-Systems Engineering</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Power &nbsp;Electronics and Power Systems</div>
								</a>

								<a href={sm} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Smart Mobility</div>
								</a>

								{/* <a href={ai} target="blank" style={{color:"black"}}> */}
								<div className="programs_card">Structural Engineering</div>
								{/* </a> */}

								<a href={ai} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Systems and Control</div>
								</a>

								{/* <a href={ai} target="blank" dstyle={{color:"black"}}> */}
								<div className="programs_card">Thermo-fluid Engineering</div>
								{/* </a> */}

								{/* <div className="programs_card">Civil Structural Engineering Dual Degree </div> */}
								{/* <div className="programs_card">Communication and Signal Processing Dual Degree</div> */}
								{/* <div className="programs_card">Computer Science and Engineering Dual Degree</div> */}
								{/* <div className="programs_card">Fluids and Energy System Dual Degree</div> */}
								{/* <div className="programs_card">Integrated Design and Manufacturing Dual Degree</div> */}
								{/* <div className="programs_card">Mechanical Thermo-Fluid Engineering Dual Degree</div> */}
								{/* <div className="programs_card">Mechanics and Design Dual Degree</div> */}
								{/* <div className="programs_card">Microelectronics and VLSI Dual Degree</div> */}
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						M.Tech (3 years)
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								IIT Hyderabad offers 3-years Master of Technology programs and admissions are given
								based on GATE scores and interview. This is a postgraduate program inclined more towards
								research and project work than conventional M. Tech (2-yrs) program and is offered by
								following departments:&nbsp;
							</p>
							<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
								<center>Departments</center>
								<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
							</Typography>
							<div className="programs_grid">
								<a href={ai} target="blank" style={{ color: 'black' }}>
									<div className="programs_card" >Artificial Intelligence and Machine Learning</div>
								</a>
								<a href={ch} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Chemical Engineering</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Civil Engineering</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Civil Structural Engineering</div>
								</a>

								<a href={ci} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Civil Geo-Technical Engineering</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Communication and Signal Processing</div>
								</a>

								<a href={co} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Computer Science And Engineering</div>
								</a>

								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Electrical Engineering</div>
								</a>

								{/* <a href={ss} target="blank" style={{ color: 'black' }}> */}
								<div className="programs_card">Integrated Design and Manufacturing Engineering</div>
								{/* </a> */}
								<a href={ss} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Integrated Sensor Systems</div>
								</a>
								<a href={as} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Mechanical Thermo-Fluid Engineering</div>
								</a>
								<a href={as} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">&nbsp;Mechanics and Design Engineering</div>
								</a>
								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Micro Electronics and VLSI</div>
								</a>
								<a href={ee} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Power Electronics and Power Systems</div>
								</a>
								{/* <a href={ai} style={{color:"black"}}> */}
								<div className="programs_card">System and Control</div>
								{/* </a> */}
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						Ph. D
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								The very foundation of IIT Hyderabad is based on research and innovation. Objective of
								this program is to stride the frontiers of knowledge and research accustomed according
								to the current scenario of society. All the departments (except Engineering Science) at
								IIT Hyderabad offer PhD programs. Interdisciplinary and interdepartmental research is
								actively encouraged by the institution, sponsored and development projects from
								industrial organizations are also undertaken. The average duration of the program is 4-5
								years.&nbsp;
							</p>
						</div>
					</div>
					<button type="button" className="collapsible">
						B.Des
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								The Bachelor of Design course offered by the Department of Design tackles both an
								increasing need and demand with the academic and professional aspect of the discipline
								for 4-year, undergraduate programs in design. It covers various foundational courses
								eventually leading to specializations in Product design, Visual Communication and User
								experience design.&nbsp;
							</p>

							<div className="programs_grid">
								<div className="toggle-brochures">
									<div className="programs_card toggle-display" style={{ lineHeight: '1.4' }}>
										&nbsp;B. Des
									</div>
									<a href={deI} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" >
											&nbsp;Internship
										</div>
									</a>
									<a href={de} target="blank" className="toggle-no-display" style={{ color: 'black' }}>
										<div className="programs_card" >
											&nbsp;Placement
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						M. Des
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								Department of Design IIT Hyderabad offers M. Des in Visual Design, it&rsquo;s a 2-year
								programme and the qualifying exam for this program is CEED. The programme insists upon
								developing skills, knowledge and aptitude among students to become the creative problem
								solvers who can bring innovation.&nbsp;
							</p>

							<a href={de} target="blank" style={{ color: 'black' }}>
								<div className="programs_card" style={{ padding: '4%' }}>&nbsp;M. Des</div>
							</a>
						</div>

					</div>
					<button type="button" className="collapsible">
						Ph.D Design
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								Department of design IIT Hyderabad offers a regular full time PhD in design to pursue
								practice-based and practice-led research in the field of photography and film making,
								architectural design, design education, typography and type design, artificial intelligence,
								digital heritage, design theory and methodology and drone and mobility. The program focus
								on innovation, creative use of technologies to fostering empathy on humancentric design.
								The department also envisions to develop interdisciplinary research approach in social
								science, design and engineering.&nbsp;
							</p>

							<a href={dePhd} target="blank" style={{ color: 'black' }}>
								<div className="programs_card" style={{ padding: '4%' }}>&nbsp;Ph.D Design</div>
							</a>
						</div>

					</div>
					<button type="button" className="collapsible">
						M.Sc
					</button>
					<div className="content ">
						<div className="container1 para_color background_change_light">
							<p>
								Master of Science is a 2-year program offered by IIT Hyderabad and admissions to all the
								programs are given based on JAM scores. This program puts emphasis on knowledge and
								research in pure sciences.
							</p>
							<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
								<center>Departments</center>
								<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
							</Typography>

							<div className="programs_grid">
								<a href={chemistry} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Chemistry</div>
								</a>
								<a href={ma} target="blank" style={{ color: 'black' }}>
									<div className="programs_card">Mathematics</div>
								</a>
								<div className="programs_card">Physics</div>
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						M.A.
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>The Department of Liberal Arts offers a Master in Development Studies Program.</p>

							<a href={ds} target="blank" style={{ color: 'black' }}>
								<div className="programs_card" style={{ padding: '4%' }}>&nbsp;M.A.</div>
							</a>
						</div>
					</div>
					<button type="button" className="collapsible">
						Minor
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								Additional course done from a discipline different from the student&rsquo;s original
								discipline It allows students to gain inter-disciplinary knowledge.
								<br />
								Minor is provided in following departments :&nbsp;
							</p>{' '}
							<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
								<center>Departments</center>
								<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
							</Typography>
							<div className="programs_grid">
								<div className="programs_card">Aerospace Engineering&nbsp;</div>
								<div className="programs_card">Artificial Intelligence&nbsp;</div>
								<div className="programs_card">Chemical Engineering&nbsp;</div>
								<div className="programs_card">Civil Engineering&nbsp;</div>
								<div className="programs_card">Computer Science and Engineering&nbsp;</div>
								<div className="programs_card">Economics&nbsp;</div>
								<div className="programs_card">Electrical Engineering&nbsp;</div>
								<div className="programs_card">Entrepreneurship&nbsp;</div>
								<div className="programs_card">
									Materials Science and Metallurgical Engineering&nbsp;
								</div>
								<div className="programs_card">Mathematics&nbsp;</div>
								<div className="programs_card">Physics </div>
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						Double Major
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								The Double Major program takes into cognizance the large overlap between various
								engineering streams and allows a student to graduate with two distinct degrees by doing
								a certain additional number of courses in the second stream(discipline/department) in
								addition to the original stream. On completion of Double Major, the student has
								comprehensive knowledge of both departments/disciplines and is provided by listed
								departments :&nbsp;
							</p>{' '}
							<Typography variant="h3" style={{ fontSize: '1.9em', padding: '2%' }} component="h2">
								<center>Departments</center>
								<hr style={{ width: '200px', border: '1px solid black', color: 'black' }} />
							</Typography>
							<div className="programs_grid">
								<div className="programs_card">Chemical Engineering&nbsp;</div>
								<div className="programs_card">Civil Engineering&nbsp;</div>
								<div className="programs_card">Computer Science and Engineering&nbsp;</div>
								<div className="programs_card">Electrical Engineering&nbsp;</div>
								<div className="programs_card">
									Materials Science and Metallurgical Engineering&nbsp;
								</div>
								<div className="programs_card">Mathematics Department&nbsp;</div>
								<div className="programs_card">Mechanical and Aerospace Engineering&nbsp;</div>
								<div className="programs_card">Physics Department </div>
							</div>
						</div>
					</div>
					<button type="button" className="collapsible">
						Honors
					</button>
					<div className="content ">
						<div className="container2 para_color background_change_light">
							<p>
								Additional coursework done in the same discipline as the student&rsquo;s original
								discipline. Program provides exhaustive knowledge of the principle discipline giving an
								edge over other students in terms of knowledge and subject analysis.
							</p>
						</div>
					</div>
				</div>{' '}
				<p>
					<br />
				</p>
				<p>
					<br />
				</p>
			</div>{' '}
			<Footer />{' '}
		</div>
	)
}
export const FAQs = () => (
	<div className="recruit">
		<BackgroundChanger background={backgroundImage} />
		<p>FAQs</p> <Footer />{' '}
	</div>
)
export const PortalGuide = () => {
	const GuidePage = React.lazy(() => import('./recruiterPortalGuide'))
	return (
		<div className="recruit">
			<BackgroundChanger backgroundColor="#FFFFFF" />
			<GuidePage />{' '}
			<p>
				<br />
			</p>{' '}
			<p>
				<br />
			</p>
		</div>
	)
}

var barChartData = {
	labels: IITHData.map((yearData) => yearData.year.toString()),
	datasets: [
		{
			label: 'IITH',
			backgroundColor: 'rgba(0,0,0,0)',
			borderWidth: 0,
			data: IITHData.map((yearData) => (yearData.closing + yearData.opening) / 2),
			errorBars: dataToErrorBars(IITHData),
		},
		{
			label: 'IITKGP',
			backgroundColor: 'rgba(255, 255, 255,0)',
			borderWidth: 0,
			data: IITKGPData.map((yearData) => (yearData.closing + yearData.opening) / 2),
			errorBars: dataToErrorBars(IITKGPData),
		},
	],
}
var pieChartData = {
	datasets: [
		{
			borderWidth: 0,

			data: [289, 322, 89, 45, 8],
			backgroundColor: ['#000066', '#0055ff', '#33ccff', '#4dffa6', '#006633'],
		},
	],

	labels: ['B-TECH', 'M-TECH', 'MSc', 'M-Des', 'MA'],
}
var pieChartData1 = {
	datasets: [
		{
			borderWidth: 0,

			data: [35, 26, 52, 52, 28, 10, 15, 52, 19],
			backgroundColor: [
				'#000066',
				'#003399',
				'#0055ff',
				'#0099cc',
				'#33ccff',
				'#99ffcc',
				'#4dffa6',
				'#00cc66',
				'#006633',
			],
		},
	],

	labels: [
		'Civil Engineering',
		'Chemical Engineering',
		'Computer Science & Engineering',
		'Electrical Engineering',
		'Engineering Sciences',
		'Mathematics/Mathematics and Computing',
		'Material Science & Metallurgical Engineering',
		'Mechanical & Aerospace Engineering',
		'Physics/Engineering Physics',
	],
}
var pieChartData2 = {
	datasets: [
		{
			borderWidth: 0,

			data: [24, 11, 9, 10, 6, 39, 14, 44, 62, 8, 5, 9, 15, 41, 4, 4, 17],
			backgroundColor: [
				'#000066',
				'#003399',
				'#0055ff',
				'#0099cc',
				'#33ccff',
				'#99ffcc',
				'#4dffa6',
				'#00cc66',
				'#00994d',
				'#006633',
				'#ff0000',
				'#ff4000',
				'#ff8000',
				'#ffbf00',
				'#ffff00',
				'#ff0080',
				'#bf00ff',
			],
		},
	],

	labels: [
		'Artificial Intelligence',
		'Additive Manufacturing',
		'Bio Medical Engineering',
		'Bio Technology',
		'Climate Change',
		'Civil Engineering',
		'Chemical Engineering',
		'Computer Science & Engineering',
		'Electrical Engineering',
		'Energy Science and Technology',
		'E-Waste Resource Engineering and Management',
		'Integrated Sensor Systems',
		'Material Science & Metallurgical Engineering',
		'Mechanical & Aerospace Engineering',
		'Networks and Information Security',
		'Polymers and Bio Systems Engineering',
		'Smart Mobility',
	],
}
var pieChartData3 = {
	datasets: [
		{
			borderWidth: 0,

			data: [47, 18, 24],
			backgroundColor: ['#003399', '#33ccff', '#4dffa6'],
		},
	],

	labels: ['Chemistry', 'Mathematics/Mathematics and Computing', 'Physics/Engineering Physics'],
}
