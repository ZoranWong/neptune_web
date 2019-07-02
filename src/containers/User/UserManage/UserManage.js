import React from 'react';
import {withRouter} from 'react-router-dom'
class UserManage extends React.Component{
	
	jump = () =>{
		this.props.history.replace("/user/UserDetails")
	};
	render(){
		return (
			<div onClick={this.jump}>
				UserManage
			</div>
		)
	}
}
export default withRouter(UserManage)