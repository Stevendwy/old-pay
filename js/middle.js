import React, {Component} from 'react'
import MeddlePay from './meddlepay'
export default class Middle extends Component {
	
	constructor() {
		super()
	}
	
	render() {
		// let _height = "auto"
//		if (_inquireType == this.partType) _height = "100%"
		return (
			<div className="MiddleContainer" style={{background:"none"}}>
				<MeddlePay/>
			</div>
		)
	}
}