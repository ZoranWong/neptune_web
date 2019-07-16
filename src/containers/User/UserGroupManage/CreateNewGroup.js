import React from 'react'
import {Input, Modal,message} from "antd";
import AdvancedFilter from "../../../components/AdvancedFilter/AdvancedFilter";
import './css/createNewGroup.sass'
import {addNewGroup} from '../../../api/user'
export default class CreateNewGroup extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			type:'',
			nameValue:'',
			remarkValue:''
		};
		this.child = React.createRef()
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(!nextProps.type) return;
		this.setState({type:nextProps.type})
	}
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	renderChild = (boolean=true) =>{
		// 处理高级筛选样式问题
		if(!this.child.current) return;
		if(!this.child.current.state) return false;
		let advanced = document.getElementsByClassName('advanced')[0];
		advanced.style.marginLeft = boolean?'60px':'140px'
	};
	
	handleSubmit = ()=>{
		console.log(this.child.current.state.data);
		if(!this.state.nameValue || !this.state.remarkValue) {
			message.error('请填写相关信息');
			return;
		}
		let data = {
			name:this.state.nameValue,
			remark: this.state.remarkValue,
			logic_conditions:this.child.current.state.data || ''
		};
		addNewGroup(data,this.state.type).then(r=>{
			this.props.refresh();
			this.props.onCancel();
			this.setState( {
				type:'',
				nameValue:'',
				remarkValue:''
			})
		}).catch(_=>{})
	};
	
	
	
	render() {
		return (
			<div>
				<Modal
					title={this.state.type == 'dynamic'?'新建智能群组':'新建静态群组'}
					width={this.state.type == 'dynamic'?1088:520}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					onOk={this.handleSubmit}
					okText="保存"
					cancelText="取消"
				>
					<ul className="mainUl">
						<li>
							<span className="left">群组名称</span>
							<Input
								className="liInput"
								value={this.state.nameValue}
								onChange={(e)=>{
									this.setState({nameValue:e.target.value})
								}}
							/>
						</li>
						<li>
							<span className="left">备注</span>
							<Input
								className="liInput"
								value={this.state.remarkValue}
								onChange={(e)=>{
									this.setState({remarkValue:e.target.value})
								}}
							/>
						</li>
						<li style={{'display':this.state.type == 'dynamic'?'block':'none'}}>
							<span className="left">筛选条件</span>
							<div className="advanced">
								<AdvancedFilter  ref={this.child} renderChild={this.renderChild} />
							</div>
						</li>
					</ul>
				</Modal>
			</div>
		)
	}
}