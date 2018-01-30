import React, {
	Component
} from 'react'
import FloatWindow from './floatwindow'
import UserAgreement from './useragreement'
import UserAgreementen from "./useragreementen"

export default class Bottom extends Component {
	constructor() {
		super()
		this.state = {
			showUserAgreement: 'none'
		}
	}

	userAgreementClick() {
		this.setState({
			showUserAgreement: 'block'
		})
	}

	render() {
		let _showUserAgreement = this.state.showUserAgreement
		let _userAgreementClick = this.userAgreementClick.bind(this)
		let _title = "用户协议"
		let _Copyright = "版权所有"
		if (zhEn(false,true)) {
			_title = "User Agreement"
			_Copyright = "Copyright"
		}


		return (
			<div className="BottomContainer">
				{zhEn(<FloatWindow 
						title={_title}
						img='/img/icon_san.png'
						show={_showUserAgreement}
						hiddenEvent={() => {
							this.setState({
								showUserAgreement: 'none'
							})
						}}
						content={<UserAgreement />}
					/>,<FloatWindow 
					title={_title}
					img='/img/icon_san.png'
					show={_showUserAgreement}
					hiddenEvent={() => {
						this.setState({
							showUserAgreement: 'none'
						})
					}}
					content={<UserAgreementen />}
				/>)}
					
				    <div className="BottomContentContainer">
				     <span onClick={()=>{window.open( "http://www.peipeiyun.com/")}} style={{cursor: 'pointer'}}>{zhEn("关于我们","About Us")}</span>
				     <span onClick={_userAgreementClick} style={{cursor: 'pointer'}}>{_title}</span>
				     <div onClick={()=>{window.open("http://www.miitbeian.gov.cn/")}} style={{cursor: 'pointer'}}>
				      © 2016-2017 007vin.com {_Copyright} ICP证：浙17026959号-2
				     </div>
				    </div>
			</div>
		)
	}
}