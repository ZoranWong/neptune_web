import React from 'react';
import '../../style/topBar.sass'
import {Icon} from "antd";

class TopBar extends React.Component{
	
	render(){
		return (
			<div className="topBar">
				<div className="user">
					<Icon type="user" />
					<span>我的账户</span>
				</div>
			</div>
		)
	}
}
export default TopBar