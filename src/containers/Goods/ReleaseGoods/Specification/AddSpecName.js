
import React from "react";
import {Select, Modal} from "antd";
import './common.sass'
import {allSpecification,createSpecification} from '../../../../api/goods/specification'
const {Option} = Select;
export default class AddSpecName extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			//SelectedSonSpecification:[],
			allSpecification:[],
			allNames:[], //  后台获取当前所有规格值名称
			parent:{},
			specNames:[]
		};
		this.child = React.createRef();
	}
	
	handleChange = (e) =>{
		this.setState({specNames:e})
	};
	
	
	componentDidMount() {
		let ary = [];
		allSpecification({}).then(r=>{
			r.forEach(item=>{
				ary.push(item.name)
			});
			this.setState({allSpecification:r,allNames:ary})
		}).catch(_=>{})
	}
	
	handleCancel = () =>{
		this.setState({value:''});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		// let newNames = [];
		// let allNames = this.state.allNames;
		// let specNames = this.state.specNames;
		// //
		// allNames.forEach(item=>{
		// 	if(specNames.indexOf(item) > -1){
		// 		specNames.splice(specNames[item],1)
		// 	}
		// });
		createSpecification({name:this.state.specNames[0]}).then(r=>{
			this.props.onSubmit(r.data)
			
		}).catch(_=>{});
	};
	
	
	
	render() {
		return (
			<div>
				
				
				<Modal
					title="新增规格"
					width={520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="newSpecification">
						选择规格
						<Select
							mode="tags"
							onChange={this.handleChange}
							allowClear={true}
						>
							{
								this.state.allSpecification.map(item=>{
									return (
										<Option key={item.name} >{item.name}</Option>
									)
								})
							}
						</Select>
					</div>
				</Modal>
			</div>
		)
	}
	
}