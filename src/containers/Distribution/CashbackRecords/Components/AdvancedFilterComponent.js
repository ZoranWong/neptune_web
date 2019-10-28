import React from 'react';
import {Modal,Button} from "antd";
import AdvancedFilter from '../../../../components/AdvancedFilter/AdvancedFilter'
export default class AdvancedFilterComponent extends React.Component{
	constructor(props){
		super(props);
		this.child = React.createRef()
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	
	
	onSubmit = () =>{
		console.log(JSON.stringify(this.child.current.state.data));
		this.props.onSubmit(this.child.current.state.data);
		this.handleCancel()
	};

	clearFilter = ()=>{
		this.child.current.clearFilter();
	};
	showAddGroup = () =>{
		this.props.showAddGroup(this.child.current.state.data)
	};
	closeAdd = ()=>{
		this.props.closeAddGroup();
		this.props.closeAddTags()
	};
	
	showAddTags = () =>{
		this.props.showAddTags(this.child.current.state.data)
	};
	
	render(){
		return (
			<div>
				<Modal
					title="高级筛选"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onClose={this.closeAdd}
					className="f_com"
					maskClosable={false}
					footer={
						<div>
							<Button
								size="small"
								className="e_btn"
								onClick={this.clearFilter}
							>清空筛选条件</Button>
							<Button
								size="small"
								onClick={this.onSubmit}
								type="primary">确认</Button>
						</div>
					}
				>
					<AdvancedFilter
						ref={this.child}
						value={this.props.value}
						operation={this.props.operation}
						slug="user"
					/>
				</Modal>
			</div>
		)
	}
}
