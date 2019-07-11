import React from 'react';
import {Modal} from "antd";
import AdvancedFilter from '../../../components/AdvancedFilter/AdvancedFilter'
export default class AdvancedFilterComponent extends React.Component{
	constructor(props){
		super(props);
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	
	
	onSubmit = () =>{
	
	};
	
	
	
	render(){
		return (
			<div>
				<Modal
					title="高级筛选"
					width={1000}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.onSubmit}
					cancelButtonProps={this.handleCancel}
					cancelText="清空筛选条件"
					okText="确认"
				>
					<AdvancedFilter />
				</Modal>
			</div>
		)
	}
}