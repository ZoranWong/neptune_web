
import React from "react";
import {Select, Modal,AutoComplete} from "antd";
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
			specName:[]
		};
		this.child = React.createRef();
	}
	
	handleChange = (e) =>{
		this.setState({specName:e})
		
		
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
		let allNames = this.state.allNames;
		let specName = this.state.specName;
		let isInAll = allNames.indexOf(specName);
		if(isInAll > -1){
			this.props.onSubmit(this.state.allSpecification.filter(item=>item.name == specName)[0])
		} else {
			createSpecification({name:specName}).then(r=>{
				this.props.onSubmit(r.data)
			}).catch(_=>{});
		}
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
					destroyOnClose={true}
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<div className="newSpecification">
						选择规格
						<AutoComplete
							defaultValue=""
							style={{ width: 300 }}
							dataSource={this.state.allNames}
							onChange={this.handleChange}
							placeholder="1"
							filterOption={(inputValue, option) =>
								option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
							}
						/>
					</div>
				</Modal>
			</div>
		)
	}
	
}