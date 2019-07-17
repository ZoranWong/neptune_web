import React from 'react';
import {Modal,Button} from "antd";
import AdvancedFilter from '../../../components/AdvancedFilter/AdvancedFilter'
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
		this.props.refresh()
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
					footer={
						<div>
							<Button
								size="small"
								onClick={this.clearFilter}
							>清空筛选条件</Button>
							<Button
								size="small"
								onClick={this.onSubmit}
								type="primary">确认</Button>
						</div>
					}
				>
					<AdvancedFilter ref={this.child} />
				</Modal>
			</div>
		)
	}
}