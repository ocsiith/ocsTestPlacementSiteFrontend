import React from 'react'

import HomePage, { Achievements, AboutOCS, DirectorsDesk } from '../views/contentPages/HomePage'

import WhyRecruitPage, {
	Achievements as WhyRecruitAchievements,
	Programs as WhyRecruitPrograms,
	FAQs as WhyRecruitFAQs,
	PortalGuide as WhyRecruitPortalGuide,
	Demographics,
	ResearchAndDevelopment,
	JapanDay,
	Extracurriculars,
	Forms,
} from '../views/contentPages/WhyRecruitPage'

import StudentsCorner, {
	PlacementDay,
	LinkedIn,
	AcademicCareerGuide,
	GuidetoPro,
	RecruitersPolicyForPlacements,
	RecruitersPolicyForInternships,
	PlacementRulesandRegulations,
	InternshipRulesandRegulations,
	HowToRegister as StudentsHowToRegister,
	FAQs as StudentsFAQs,
} from '../views/contentPages/StudentsCorner'

import ReachUsPage, { HowToReach, Staying, GMap } from '../views/contentPages/ReachUs'
import AboutUsPage, { OCSTeam, WebsiteTeam, ContactUs } from '../views/contentPages/AboutUs'
import Webinars from '../views/studentPortal/webinars'
import HomeIcon from '@material-ui/icons/Home'
import GroupIcon from '@material-ui/icons/Group'
import RecruitersIcon from '@material-ui/icons/Business'
import AddressIcon from '@material-ui/icons/ContactPhone'
import SchoolIcon from '@material-ui/icons/School'
// import EqualizerIcon from '@material-ui/icons/Equalizer'
import Research_Programs from '../views/careercell'

// import PlacementStats2022 from '../static/pdfs/Placement-Stats-21-22.pdf'
// import PlacementStats2021 from '../static/pdfs/Placement-Stats-20-21.pdf'
// import PlacementStats2020 from '../static/pdfs/Placement-Stats-19-20.pdf'

const sideBarItems = [
	{
		name: 'Home',
		to: '/home',
		icon: HomeIcon,
		hidden: true,
		sections: [
			{ name: 'Welcome', to: '/home', component: <HomePage /> },
			{ name: 'Achievements', to: '/home/achievements', component: <Achievements /> },
			{ name: 'About OCS', to: '/home/aboutocs', component: <AboutOCS /> },
			{ name: 'From Director’s Desk', to: '/home/directormessage', component: <DirectorsDesk /> },
		],
	},
	{
		name: "Recruiters' Corner",
		to: '/whyrecruit',
		icon: RecruitersIcon,
		sections: [
			{ name: "Recruiters' Portal", to: '/login/company/portal' },
			{ name: 'Why Recruit?', to: '/whyrecruit', component: <WhyRecruitPage /> },
			{ name: 'Achievements', to: '/whyrecruit/achievements', component: <WhyRecruitAchievements /> },
			{ name: 'Graduating Batch Profile', to: '/whyrecruit/demographics', component: <Demographics /> },
			{ name: 'Programs at IITH', to: '/whyrecruit/programs', component: <WhyRecruitPrograms /> },
			{ name: 'Japan Day', to: '/whyrecruit/japanday', component: <JapanDay /> },
			{
				name: 'Research and Development',
				to: '/whyrecruit/rnd',
				component: <ResearchAndDevelopment />,
			},
			{ name: 'Extracurriculars', to: '/whyrecruit/extracurriculars', component: <Extracurriculars /> },
			{ name: 'Placement and Internship Brochures', to: '/whyrecruit/forms', component: <Forms /> },
			{ name: 'Recruiters Policy for Placements', to: '/whyrecruit/recruiterspolicy/placements', component: <RecruitersPolicyForPlacements /> },
			{ name: 'Recruiters Policy for Internships', to: '/whyrecruit/recruiterspolicy/internships', component: <RecruitersPolicyForInternships /> },
			{ name: 'FAQs', to: '/whyrecruit/faqs', component: <WhyRecruitFAQs />, hidden: true },
			{
				name: "Recruiters' Portal Guide",
				to: '/whyrecruit/howto',
				component: <WhyRecruitPortalGuide />,
				exact: false,
			},
		],
	},
	{
		name: "Students' Corner",
		to: '/students',
		icon: SchoolIcon,
		sections: [
			// { name: "Students' Portal", to: '/login/student/portal' },
			{ name: "Students' Portal", to: '/login/student' },
			{
				name: 'Placement Rules and Regulations',
				to: '/students/placementrules',
				component: <PlacementRulesandRegulations />,
			},
			{
				name: 'Internship Rules and Regulations',
				to: '/students/internrules',
				component: <InternshipRulesandRegulations />,
			},
			{
				name: 'Placement Experiences',
				to: '/students/placement',
				component: <AcademicCareerGuide />,
			},
			{
				name: 'Internship Experiences',
				to: '/students/internship',
				component: <StudentsCorner />,
			},
			{
				name: 'Placement Day',
				to: '/students/placementDay',
				component: <PlacementDay />,
			},
			{
				name: 'Webinars',
				to: '/login/student/portal/webinars',
				component: <Webinars />,
			},
			{
				name: 'Research Programs',
				to: '/careercell',
				component: <Research_Programs />,
			},
			{ name: "Students' Portal Guide", to: '/students/howto', component: <StudentsHowToRegister /> },
			{ name: 'How to use LinkedIn', to: '/students/linkedin', component: <LinkedIn /> },
			{ name: 'Guide to Professional Correspondence', to: '/students/guidetoprocor', component: <GuidetoPro /> },
			{ name: 'FAQs', to: '/students/faqs', component: <StudentsFAQs />, hidden: true },
		],
	},
	// {
	// 	name: 'Placement Statistics',
	// 	to: '/placementStats',
	// 	icon: EqualizerIcon,
	// 	sections: [
	// 		{ name: 'Placement Statistics 2021-22', to: PlacementStats2022 },
	// 		{ name: 'Placement Statistics 2020-21', to: PlacementStats2021 },
	// 		{ name: 'Placement Statistics 2019-20', to: PlacementStats2020 },
	// 	],
	// },
	{
		name: 'Reach out to IITH',
		to: '/reachus',
		icon: AddressIcon,
		sections: [
			{ name: 'How to reach the campus', to: '/reachus', component: <HowToReach /> },
			{ name: 'Staying near IITH', to: '/reachus/staying', component: <Staying /> },
			{ name: 'Office address', to: '/reachus/address', component: <ReachUsPage /> },
			{ name: 'Map', to: '/reachus/map', component: <GMap /> },
		],
	},
	{
		name: 'Contact Us',
		to: '/about',
		icon: GroupIcon,
		sections: [
			{ name: 'About OCS', to: '/about', component: <AboutUsPage /> },
			{ name: 'OCS Team', to: '/about/team', component: <OCSTeam /> },
			{ name: 'Website Team', to: '/about/techteam', component: <WebsiteTeam /> },
			{ name: 'Contact Us', to: '/about/contact', component: <ContactUs />, hidden: true },
		],
	},
]

export default sideBarItems

export const sideBarWidth = 70
