import React from 'react';
import RcPagination from 'rc-pagination';
import 'rc-pagination/dist/rc-pagination.min.css'

class Pagination extends React.Component{
	constructor(props){
		super(props);
		this.state = {}
	}
	
	
	render() {
		console.log(this.props,'PaginationS');
		return (
			<div>
				<RcPagination {...this.props}/>
			</div>
		);
	}
}
export default Pagination