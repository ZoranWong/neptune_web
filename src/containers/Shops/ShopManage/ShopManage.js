import React from 'react';
import {withRouter} from 'react-router-dom'
class ShopManage extends React.Component{
	
	render(){
		return (
			<div onClick={()=>{
				this.props.history.push({pathname:"/shops/shopDetails"})
			}}>Thunder</div>
		)
	}
}
export default withRouter(ShopManage)