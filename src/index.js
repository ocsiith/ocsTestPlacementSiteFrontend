import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ConfirmProvider } from 'material-ui-confirm'
import ActionsOnPageChange from './components/actionsonpagechange'
import App from './App'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
	faCheckSquare,
	faSquare,
	faChevronRight,
	faChevronDown,
	faPlusSquare,
	faMinusSquare,
	faFolder,
	faFolderOpen,
	faFile,
} from '@fortawesome/free-solid-svg-icons'

import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

library.add(
	faCheckSquare,
	faSquare,
	faChevronRight,
	faChevronDown,
	faPlusSquare,
	faMinusSquare,
	faFolder,
	faFolderOpen,
	faFile
)

const Main = () => {
	return (
		<BrowserRouter>
			<ActionsOnPageChange />
			<ConfirmProvider>
				<MuiPickersUtilsProvider utils={DateFnsUtils}>
					<App />
				</MuiPickersUtilsProvider>
			</ConfirmProvider>
		</BrowserRouter>
	)
}

ReactDOM.render(<Main />, document.getElementById('root'))
