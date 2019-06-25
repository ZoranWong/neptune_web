import React from 'react';
import {withRouter} from 'react-router-dom'
//import SingleLine from "../../components/AdvancedFilter/SingleLine";

class Home extends React.Component{
	
	render(){
		return (
			<div>
				我是首页
				{/*<SingleLine />*/}
			</div>
			
		)
	}
}
export default withRouter(Home)