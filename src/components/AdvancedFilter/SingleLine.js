import React from 'react';
import {Select,Cascader} from 'antd';
import './index.sass'
import {user_values,operation} from "../../utils/user_fields";
import AdvancedFilterValues from './AdvancedFilterValues'
const { Option } = Select;
export default class SingleLine extends React.Component{
	constructor(props){
		super(props);
		this.itemData = props.item;
		this.cid = this.itemData.cid;//用于标识每一行数据
		this.state = {
			singleLineData:{},
			activeKey:{},      // 选中key框对应的对象
			activeOptions:operation['emptyCompare'][0].value,  //默认选中的option
			activeValue:'',
			type:operation['emptyCompare'][0].type
		};
	};
	
	
	onKeyChange = (value) => {
		this.setState({activeValue:''});
		let parent =  user_values.filter(item=>{
			return item.value == value[0]
		});
		let child = parent[0].children.filter(item=>{
			return item.value == value[value.length -1]
		});
		let type = operation[child[0].type][0].type;
		this.setState({
			activeKey:child[0],
			activeOptions:operation[child[0].type][0].value,
			type:type
		});
	}
	;

	// 选择后渲染的样式
	displayRender = (label) => {
		return label[0] + '-'+ label[label.length - 1];
	};
	
	onOperationChange = (value) => {
		let type;
		if(this.state.activeKey.type){
			type = operation[this.state.activeKey.type].filter(item=>{
				return item.value == value
			})[0].type;
		} else {
			type = operation['emptyCompare'].filter(item=>{
				return item.value == value
			})[0].type;
		}
		this.setState({type:type});
		this.setState({activeOptions:value},()=>{
			if(this.state.activeValue){
				let data = {
					key:this.state.activeKey.value,
					operation:value,
					value:this.state.activeValue,
					cid:this.cid
				};
				this.setState({singleLineData:data},()=>{
					this.props.onData(data);
				});
			} else if(value == 'is null' || value == 'is not null'){
				let data = {
					key:this.state.activeKey.value || 'name',
					operation:value,
					value:'',
					cid:this.cid
				};
				this.setState({singleLineData:data},()=>{
					this.props.onData(data);
				});
			}
		});
	};
	
	
	valueChange = (value) =>{
		let data = {
			key:this.state.activeKey.value || "name",
			operation:this.state.activeOptions,
			value:value,
			cid:this.cid
		};
		this.setState({singleLineData:data,activeValue:value});
		this.props.onData(data);
	};

	
	
	render(){
		return (
			<div className="singleBox">
				<div style={{width:"100%"}} className="selectChild">
					<Cascader
						options={user_values}
						className="cascader"
						defaultValue={["base_attributes", "name"]}
						expandTrigger="hover"
						displayRender={this.displayRender}
						onChange={this.onKeyChange}
						allowClear={false}
					/>
					<Select
						defaultActiveFirstOption={false}
						style={{ width: 120,marginLeft:5 }}
						onChange={this.onOperationChange}
						value={this.state.activeOptions}
					>
						{
							this.state.activeKey&&this.state.activeKey.type?
								(operation[this.state.activeKey.type].map(item=>(
									<Option key={item.value}>{item.label}</Option>
								)))
								:
								(operation['emptyCompare'].map(item=>(
									<Option key={item.value}>{item.label}</Option>
								)))
						}
					</Select>
					<AdvancedFilterValues
						activeKey={this.state.activeKey}
						type={this.state.type}
						onValueChange={this.valueChange} />
				</div>
				{
					this.props.lineNeedRemove?(
						<i
							className="iconfont"
							style={{'display':(this.props.lineNeedRemove) ?'block':'none'}}
							onClick={this.props.deleteSingle}
						>&#xe82a;</i>
					):''
				}
				
			</div>
			
		)
	}
}





