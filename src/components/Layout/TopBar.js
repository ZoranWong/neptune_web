import React from 'react';
import '../../style/topBar.sass'
import {Icon,message} from "antd";
import {removeToken,removeUserInfo} from "../../utils/dataStorage";
import {logout} from "../../api/auth";
import {withRouter} from 'react-router-dom'
class TopBar extends React.Component{
	
	
	
	logout = () =>{
		logout({}).then(r=>{
			message.success('退出登录成功');
			removeToken();
			removeUserInfo()
			setTimeout(() =>{ this.props.history.replace("/")},1000);
		}).catch(_=>{})
	};
	render(){
		return (
			<div className="topBar">
				<div className="user">
					<Icon type="user" />
					<span
						style={{'cursor':'pointer'}}
						onClick={this.logout}
					>退出登录</span>
				</div>
			</div>
		)
	}
}
export default withRouter(TopBar)
