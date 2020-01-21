import React from 'react';
import {Modal,Button} from "antd";
import AdvancedFilter from '../../../../components/AdvancedFilter/AdvancedFilter'
import {operation} from "../../../../utils/consumer_order_fields";
import {groups} from "../../../../api/shops/groups";

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
							>打印订单</Button>
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
						value={this.props.data}
						operation={operation}
						slug="order"
						api={{groups, goodsOrder: true}}
					/>
				</Modal>
			</div>
		)
	}
}
