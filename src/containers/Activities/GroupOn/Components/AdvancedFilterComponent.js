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
		this.props.onSubmit(this.child.current.state.data);
		this.handleCancel()
	};

	clearFilter = ()=>{
		this.child.current.clearFilter();
	};
	
	export = () =>{
		this.props.export(this.child.current.state.data)
	};

	print = () => {
		this.props.print(this.child.current.state.data)
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
							{
								this.props.slug === 'shopping_group_order' &&	<Button
									size="small"
									type="default"
									className="e_btn"
									onClick={this.export}
								>导出</Button>
							}
							{/*{*/}
							{/*	this.props.slug === 'shop_shopping_group' &&	<Button*/}
							{/*		size="small"*/}
							{/*		type="default"*/}
							{/*		className="e_btn"*/}
							{/*		onClick={this.print}*/}
							{/*		loading={this.props.loading}*/}
							{/*	>打印</Button>*/}
							{/*}*/}
						
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
						operation={this.props.operation}
						slug={this.props.slug}
					/>
				</Modal>
			</div>
		)
	}
}
