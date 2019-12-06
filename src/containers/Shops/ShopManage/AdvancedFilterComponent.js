import React from 'react';
import {Modal,Button} from "antd";
import AdvancedFilter from '../../../components/AdvancedFilter/AdvancedFilter'
import {shop_values,operation} from "./shop_fields";
import {getChannels} from "../../../api/shops/channel";
import {groups} from "../../../api/shops/groups";

export default class AdvancedFilterComponent extends React.Component{
	constructor(props){
		super(props);
		this.child = React.createRef()
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	
	
	onSubmit = () =>{
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
								type="default"
								className="e_btn"
								onClick={this.showAddGroup}
							>加群组</Button>
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
						value={shop_values}
						operation={operation}
						api={{groups,getChannels}}
						slug="shop"
					/>
				</Modal>
			</div>
		)
	}
}
