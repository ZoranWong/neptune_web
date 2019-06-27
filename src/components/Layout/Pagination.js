import React from 'react';
import {Pagination} from "antd";

class Pagination extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			total: 0,
			current: 0,
			currentDataLength: 0,
		}
	}
	
	componentWillMount() {
	
	
	}
	
	paginate = () =>{
		let params = this.props.params;
		params.limit = 10;
		params.page = this.state.current;
		let thisApp = this;
		
		thisApp.$Api[thisApp.api](params, function (data) {
			thisApp.total = data.total;
			thisApp.currentDataLength = (data.list).length
			thisApp.$emit('val-change', data.list);
		})
	};
	
	
	
	render() {
		return (
			<div>
				<Pagination>
				
				</Pagination>
			</div>
		)
	}
}
export default Pagination