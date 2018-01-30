import React, {
	Component
} from 'react'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class Top extends Component {
	constructor(props) {
		super(props)
		this.state = {
			showLogout: "none",
			showNumber: "--",
			hasMessages: false,
			//			selectIndex:params.type ? 3 : params.vin? 1 : params.car ? 2 : 1
			selectIndex: params.type ? (params.type == "vin" ? 1 : (params.type == "part" ? 3 : 2)) : 1
		}
		this.vinType = "vin"
		this.carType = "car"
		this.partType = "part"
		this.chooseType = params.type ? params.type : "vin" //记录上次点击记录，防止多次点击相同清空内容
	}

	componentDidMount() {
		getAjax("/usersinfos", {}, response => {
				this.setState({
					showNumber: response.data.users
				})
			})
			//接受inquirecenter
		catchEvent(middleEvents.titleCanClick, e => {
			//			console.log(e.info.can)
			this.titleclick = e.info.can
		})

		this.pollTimer = setInterval(() => {
			this.poll()
		}, 900000)

		this.poll()
	}

	//轮询获取消息状态
	poll() {
		getAjax("/user/msglocalunread", {}, res => {
			// console.log(res)
			let _hasMessages = false
			if (res.data.total_counts > 0) _hasMessages = true
			this.setState({
				hasMessages: _hasMessages
			})
		})
	}

	showLogout(e) {
		let _showLogout = "none"
		if (e.type == "mouseover") {
			_showLogout = "initial"
		}
		this.setState({
			showLogout: _showLogout
		})
	}

	chooseInquire(inquireType = "vin", index) {

		this.props.chooseInquire(inquireType)
		this.chooseType = inquireType
	}

	render() {
		let _chooseInquire = this.chooseInquire.bind(this)
		let _hasMessages = this.state.hasMessages
		let _newlogo = '/img/p_007.png'
		if(zhEn(false,true)){
			_newlogo = '/img/p_007vin.png'
		}
		return (
			<div className='TopContainer'>
				<div className="TopBackground"></div>
				<div className="TopRightContainer">
					<div className="TopRightSelectersContainer">
						<img className="TopLogo" src={cdnHost+_newlogo} onClick={() => location.href = "/"}/>
						<span className="TopRightSelector" style={{color:"#333"}} onClick={() => _chooseInquire(this.vinType,1)}>{zhEn('车架号查询','VIN')}</span>
						<span className="TopRightSelector" style={{color:"#333"}} onClick={() => _chooseInquire(this.carType,2)}>{zhEn('车型查询','Model')}</span>
						<span className="TopRightSelector" style={{color:"#333"}} onClick={() => _chooseInquire(this.partType,3)}>{zhEn('零件号查询','Part')}</span>
					</div>
					<div className="TopRightAccountContainer"
						style={{display: "block"}}
						onClick={this.showLogout.bind(this)}
						onMouseOver={this.showLogout.bind(this)}
						onMouseLeave={this.showLogout.bind(this)}>
						<div className="TopRightAccount">
						{zhEn('个人中心','Account')}
							<div className="RedPoint" style={{display: _hasMessages ? "block" : "none"}}></div>
							<span><img src={cdnHost+"/img/icon_xiala.png"} /></span>
						</div>
						<div className="Logout" style={{display: this.state.showLogout}} >
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=search&type=messages"}>
								<img src={cdnHost+"/img/icon_mess.png"}/>
								<span>{zhEn('消息中心','Message')}</span>
								<div className="RedPoint" style={{display: _hasMessages ? "block" : "none"}}></div>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=search"}>
								<img src={cdnHost+"/img/user_icon.png"}/>
								<span>{zhEn('个人中心','Account')}</span>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/user/profile?binds=home"}>
								<img src={cdnHost+ "/img/p_pay.png"}/>
								<span>{zhEn('续费','Purchase')}</span>
							</div>
							<div className="LogoutItem" onClick={() => location.href = "/logout"}>
								<img src={cdnHost+"/img/icon_exit.png"}/>
								<span>{zhEn('退出','Log out')}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

Top.propTypes = {
	chooseInquire: React.PropTypes.func.isRequired
}