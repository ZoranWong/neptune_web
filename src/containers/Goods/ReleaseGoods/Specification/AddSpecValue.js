
import React from "react";
import {Select, Modal, Tag} from "antd";
import './common.sass'
import {createValues} from '../../../../api/goods/specification'
const {Option} = Select;
let sons = [];
export default class NewSpecification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			specValues:[],
			allValues:[],
			sonSpecification:[],
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.parent.id) return;
		this.setState({sonSpecification:nextProps.parent.spec_value})
	}
	
	
	componentDidMount() {
	
	}
	
	handleChange = (e) =>{
		this.setState({specValues:e})
	};
	
	handleCancel = () =>{
		this.setState({value:''});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		// let specValues = [];
		// let val = this.state.value;
		// this.state.sonSpecification.filter(item=>item.id == val).map(item=>specValues.push(item));
		// this.props.onSubmit(this.props.parent.id,specValues);
		
		
		
		
		let allValues = this.state.allValues;
		let specValues = this.state.specValues;
		allValues.forEach(item=>{
			if(specValues.indexOf(item) > -1){
				specValues.splice(specValues[item],1)
			}
		});
		createValues({values:specValues},this.props.parent.id).then(r=>{
			this.props.onSubmit(this.props.parent.id,this.state.specValues);
		}).catch(_=>{})
	};
	

	render() {
		return (
			<div>
				<Modal
					title="新增规格值"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="newSpecification">
						选择规格值
						<Select
							mode="tags"
							onChange={this.handleChange}
							allowClear={true}
							
						>
							{
								this.state.sonSpecification.length?this.state.sonSpecification.map(item=>{
									return (
										<Option key={item.id} value={item.id}>{item.value}</Option>
									)
								}):''
							}
						</Select>
					</div>
				</Modal>
			</div>
		)
	}
	
}