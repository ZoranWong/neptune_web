
import React from "react";
import {Select, Modal, Tag} from "antd";
import './common.sass'
import {allSpecification, createValues} from '../../../../api/goods/specification'
const {Option} = Select;
let sons = [];
export default class NewSpecification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			specValues:[],
			allValues:[],
			values:[], // 默认值
		};
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.parent.id) return;
		if(nextProps.parent.spec_value){
			this.setState({allValues:nextProps.parent.spec_value,values:[]})
		} else {
			let all = [];
			allSpecification({}).then(r=>{
				all = r.filter(item=>item.id == nextProps.parent.id);
				this.setState({allValues:all[0].spec_value})
			}).catch(_=>{});
			let values = [];
			nextProps.parent.values.forEach(item=>{
				values.push(item.value)
			});
			this.setState({values})
		}
		
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
		console.log(allValues,'=====');
		let specValues = this.state.specValues;
		console.log(specValues,'-------');
		let isInAll = [];
		let notInAll = specValues;  // 初始默认值
		allValues.forEach(item=>{
			if(specValues.indexOf(item.value)> -1){
				isInAll.push(item);
			}
		});
		if(isInAll.length){
			isInAll.forEach(item=>{
				notInAll = notInAll.filter(i=>i != item.value)
			})
		}
		console.log(isInAll);
		console.log(notInAll);
		if(notInAll.length){
			createValues({values:notInAll},this.props.parent.id).then(r=>{
				this.props.onSubmit(this.props.parent.id,r.data.concat(isInAll));
			}).catch(_=>{})
		} else {
			this.props.onSubmit(this.props.parent.id,isInAll);
		}
		
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
					destroyOnClose={true}
					onOk={this.handleSubmit}
				>
					<div className="newSpecification">
						选择规格值
						<Select
							mode="tags"
							onChange={this.handleChange}
							allowClear={true}
							defaultValue={this.state.values}
						>
							{
								this.state.allValues.length?this.state.allValues.map(item=>{
									return (
										<Option key={item.value}>{item.value}</Option>
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
