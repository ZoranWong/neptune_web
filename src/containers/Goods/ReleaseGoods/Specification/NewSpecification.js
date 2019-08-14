
import React from "react";
import {Select, Modal,Tag} from "antd";
import './common.sass'
import IconFont from '../../../../utils/IconFont'
import {allSpecification} from '../../../../api/goods/specification'
import NewSon from "./NewSon";
const {Option} = Select;
let ary = [];
export default class NewSpecification extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			value:'',

			//SelectedSonSpecification:[],
			allSpecification:[],
			newSonVisible:false,
			parent:{}
		};
		this.child = React.createRef();
	}
	
	
	
	
	componentDidMount() {
		allSpecification({}).then(r=>{
			this.setState({allSpecification:r})
		}).catch(_=>{})
	}
	
	handleCancel = () =>{
		this.setState({value:''});
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		let val = this.state.value;
		
		this.state.allSpecification.filter(item=>item.id == val).map(item=>ary.push(item));
		//this.setState({SelectedSpecification:ary,value:''});
		this.props.onSubmit(ary)
	};
	
	// 新增规格值
	showNewSon = (item) =>{
		this.setState({parent:item});
		this.setState({newSonVisible:true})
	};
	hideNewSon = () =>{
		this.setState({newSonVisible:false})
	};
	createNewSon = (sons) =>{
		// this.setState({SelectedSonSpecification:ary},()=>{
		// 	this.hideNewSon()
		// });
		this.props.createNewSon(sons);
		this.hideNewSon()

	};
	
	render() {
		return (
			<div>
				<NewSon
					visible={this.state.newSonVisible}
					onCancel={this.hideNewSon}
					onSubmit={this.createNewSon}
					parent={this.state.parent}
					ref={this.child}
				/>

				
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
							value={this.state.value}
							onChange={(e)=>{
								this.setState({value:e})
							}}
							defaultActiveFirstOption={false}
						>
							{
								this.state.allSpecification.map(item=>{
									return (
										<Option key={item.id} value={item.id}>{item.name}</Option>
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