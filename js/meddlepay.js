import React, {
	Component
} from 'react'
import {
	render
} from 'react-dom'
import {
	sendEvent,
	catchEvent,
	middleEvents
} from './eventmodel'
export default class MeddlePay extends Component {
	constructor() {
		super()
		this.state = {
			orderCode: "",
			paySrc: "#",
			time: "",
			msgShow: "none",
			msg: "",
			timeCount: 3,
			paymoney: "",
			buttons: "none",
			cardType: "",
			onButton: "none",
			drop: false,
			title: ""
		}
		this.type = ""
		this.timer
		this.callback = ""
		this.type = ""
		this.registRequest = ""
		this.drop = false
		this.isAlipay =  sessionStorage.getItem("payType")==="alipay"
	}

	componentDidMount() {
		// let str = location.href
		// this.type = str.split("type=")[1];
		// console.log(sessionStorage.getItem("payType"))
		
		this.toPayClick();
		catchEvent(middleEvents.topItemClick, () => {
			this.msgShowToHide("请先完成支付");
		})
	}

	toPayClick() {
		let _url
		let _obj = {
			"type": sessionStorage.getItem('priceType'),
			"device": "pc",
			"coupon_num": sessionStorage.getItem('coupon_num')
		}	
		if(this.isAlipay){
			_url = "/pays/alipay"
			getAjax(_url, _obj, response => {
				this.setState({
					orderCode: response.data.orderid,
					paySrc: response.data.img,
					time: response.data.valid_datetime,
					paymoney: response.data.money,
					cardType: response.data.description,
					title: response.data.title
				}, () => {
					this.payCallBack()
				})
			})
		}else{
			_url = "/pays/wx"	
			postAjax(_url, _obj, response => {
				this.setState({
					orderCode: response.data.orderid,
					paySrc: response.data.img,
					time: response.data.valid_datetime,
					paymoney: response.data.money,
					cardType: response.data.description,
					title: response.data.title
				}, () => {
					this.payCallBack()
				})
			})
		}
		// this.type = sessionStorage.getItem('priceType')

	}



	msgShowToHide(msg, temp = 1) {
		if (temp == 1) {
			this.setState({
				msg: msg,
				msgShow: "flex",
				timeCount: 3,
				buttons: "none",
				onButton: "none"
			}, () => {
				var timers = setInterval(() => {
					if (this.state.timeCount == 0) {
						//			          				return
						clearInterval(timers)
						this.setState({
							msgShow: "none",
							timeCount: 3
						})
					} else {
						this.setState({
							timeCount: --this.state.timeCount
						})
					}
				}, 1000)
			})
		} else if (temp == 2) {
			this.setState({
				msg: msg,
				timeCount: "",
				msgShow: "flex",
				buttons: "flex",
				onButton: "none"
			})
		} else if (temp == 3) {
			this.setState({
				msg: msg,
				timeCount: "",
				msgShow: "flex",
				buttons: "none",
				onButton: "flex"
			})
		}

	}

	payCallBack() {
		clearTimeout(this.timer);
		let _url = "/pays/check"
		let _obj = ""
		$.ajax({
			type: "get",
			url: _url,
			data: _obj,
			success: response => {
				//		getAjax("/pays/check","",response=>{
				switch (response.code) {
					case "405":
						//成功
						this.msgShowToHide("支付成功", 2);
						break;
					case "408":
						//未付款，再请求
						this.timer = setTimeout(this.payCallBack.bind(this), 2000);
						break;
					case "404":
						//验证码失效，刷新验证码
						this.toPayClick(this.type)
						break;
					case "406":
						this.msgShowToHide("支付失败");
						this.toPayClick(this.type)
				}
			}
		})
	}

	toPPY() {
		location.href = "/ppy"
	}

	hideModal() {
		this.setState({
			msgShow: "none",
			timeCount: 3
		})
	}

	getNowFormatDate(type) {
		var seperator1 = "-";
		var date = new Date();
		var year = date.getFullYear();
		var month = date.getMonth() + 1;
		var strDate = date.getDate();
		if (type == 1) {
			strDate++
		} else {
			year++
		}

		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (strDate >= 0 && strDate <= 9) {
			strDate = "0" + strDate;
		}
		var currentdate = year + seperator1 + month + seperator1 + strDate;

		return currentdate;
	}
	toDropShow() {
		this.setState({
			drop: !this.state.drop
		})

	}
	linkClick() {
		let _obj = {
			orderid: this.state.orderCode
		}
		postAjax("/pays/help", _obj, response => {
			console.log(response)
		})
		this.msgShowToHide("正在帮您查证<br/>解决后会短信通知您", 3);
	}
	render() {
		let _orderCode = this.state.orderCode
		let _paymoney = this.state.paymoney
		let _msgShow = this.state.msgShow
		let _isShow = "block"
		let _paySrc = this.state.paySrc
		let _time = this.state.time
		let _cardType = this.state.cardType
		let _msg = this.state.msg
		let _buttons = this.state.buttons
		let _onButton = this.state.onButton
		let _timeCount = this.state.timeCount
		let _dropSHow = this.state.drop ? "block" : "none"
		let _upDown = this.state.drop ? "/img/iconup.png" : "/img/icondown.png"
		let _title = this.state.title
		let text1 =  this.isAlipay ? "支付宝支付" : "微信支付"
		let text2 = this.isAlipay ? "支付宝扫一扫付款": "微信扫一扫付款"
		let color = this.isAlipay ? "#00AAEE" : "#7ED321"
		return (
			<div>
					<div className="Nmiddlecontent">
						<div className="UserPayment" style={{display:_isShow}}>
							<div className="PaymentHead">
									订单提交成功，请您尽快付款！ 订单号：{_orderCode}  <br/>
									请您 <span>立即完成支付</span>，否则订单会被自动取消。
							</div>
							<div className="PaymentBody">
								<div className="PaymentBodyHead">
										<div style={{background:color}}>{text1}</div>
										<span>{text2}</span>
								</div>
								<div className="PaymentBodyMain">
									<p>应付金额:<span>{_paymoney}</span></p>
									<div className="Dcode">
										<img src={_paySrc} alt='二维码'/>
									</div>
									<b>订单信息</b>
									<span>{_title}</span>
									<div>
										<ol>
											<li>不可取消</li>
											<li>不含税</li>
										</ol>
									</div>
									<div className="EndTime">
										有效期{_cardType}
									</div>
								</div>
								<div className="haveTrouble">
									<div className="trobleDrop" onClick={this.toDropShow.bind(this)}>
									     <span>支付遇到问题 <img src={cdnHost +_upDown} alt="#"/></span>
									</div>
									<div className="trobleSolute" style={{display:_dropSHow}}>
										{/* <p>
										1. 没有微信支付，怎么办？<br/>&nbsp;&nbsp;
   										很遗憾，目前仅支持微信支付。我们正在积极开通支付宝等支付方式。
										</p> */}
										<p>
											已成功支付，却没有开通！ <span className="linkClick" onClick={this.linkClick.bind(this)}>获取支持和服务</span>
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					<div className="msgModal" style={{display:_msgShow}}>
						<div className="msgAlert">
							<p dangerouslySetInnerHTML={{__html: _msg}}/>
							<span>{_timeCount}</span>
						</div>
						<div className="msgButtons" style={{display:_buttons}}>
							<div onClick={this.hideModal.bind(this)}>取消</div>
							<div onClick={this.toPPY.bind(this)}>立即使用</div>
						</div>
						<div className = "onButton" onClick={this.hideModal.bind(this)} style={{display:_onButton}}>
							<div>确定</div>							
						</div>
					</div>
				</div>

		)
	}
}