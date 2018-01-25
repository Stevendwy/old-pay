import React, {
	Component
} from 'react'
import {
	render
} from 'react-dom'
import Top from './top'
import Bottom from './bottom'
import Middle from './middle'
//import MeddlePay from './meddlepay'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
class Page extends Component {
	constructor() {
		super()
		this.state = {
			inquireType: params.type,
			clicknum: 0
		}
		this.toJump = true
	}

	// componentDidMount() {
	// 	getAjax("/user/info", "", response => {
	// 		// this.toJump = response.overdue == "已过期" ? false : true
	// 		if (response.overdue == "已过期") {
	// 			this.toJump = false

	// 		} else if (response.is_payment == "未付款") {
	// 			this.toJump = false
	// 		} else {
	// 			this.toJump = true
	// 		}
	// 	})
	// }


	chooseInquire(type) {
		if (this.toJump) {
			location.href = "/ppy?type=" + type
		} else {
			sendEvent(middleEvents.topItemClick)
		}
		//		console.log(type)
	}

	render() {

		let _chooseInquire = this.chooseInquire.bind(this)
		let _inquireType = this.state.inquireType
		let _clicknum = this.state.clicknum

		return (
			<div className="PageContainer" onClick={() => sendEvent(middleEvents.pageClick)}>
				<Top chooseInquire={_chooseInquire}/>
				<Middle/>
				<Bottom />
			</div>

		)
	}
}

render(<Page />, document.getElementById("root"))