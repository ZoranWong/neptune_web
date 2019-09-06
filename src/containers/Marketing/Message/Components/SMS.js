import React, {Component} from 'react';
import {withRouter} from 'react-router-dom'
import {Button, Switch, Table} from "antd";
import IconFont from "../../../../utils/IconFont";
import '../css/sms.sass'
import CustomPagination from "../../../../components/Layout/Pagination";
import NewModule from "../Modal/NewModule";
class Sms extends Component {
	constructor(props) {
		super(props);
		this.state = {
			role:'consumer',
			data:[
				{
					name:'1',
					content:'1111111111111111111111111111111111111111111111111111111111',
					type:'2',
					spec:'3'
				}
			],
			api:'',
			paginationParams:{
				logic_conditions:[],
				search:'',
			},
			visible:false
		};
		this.child = React.createRef();
	}
	
	
	// 分页器改变值
	paginationChange = (list) =>{
		console.log(list);
		this.setState({data:list})
	};
	
	
	changeRole = role =>{
		this.setState({role})
	};
	
	
	goRecord = () =>{
		this.props.history.push({pathname:"/marketing/sendOutRecord"})
	};
	
	// 新建模板
	showNew = () =>{
		this.setState({visible:true})
	};
	hideVisible = () =>{
		this.setState({visible:false})
	};
	
	render() {
		const {role} = this.state;
		const columns = [
			{
				title: '模板名称',
				dataIndex: 'name',
			},
			{
				title: '短信内容',
				dataIndex: 'content',
				render: (text, record) => (
					<span className="m_message_box">
						<span  className="m_content">{text}</span>
						<IconFont type="icon-eye-fill"/>
					</span>
				)
			},
			{
				title: '发送方式',
				dataIndex: 'type',
			},
			{
				title: '发送规则',
				dataIndex: 'spec',
			},
			{
				title: '状态',
				render: (text,record) =>
					<Switch />
			},
		];
		const newModuleProps = {
			visible:this.state.visible,
			onCancel:this.hideVisible
		};
		
		return (
			<div className="m_sms">
				
				<NewModule {...newModuleProps} />
				
				<div className="header">
					<div className="left">
						<p>
							<span className={role === 'consumer'?'active':''} onClick={()=>this.changeRole('consumer')}>用户短信魔板</span>
							<span className={role === 'merchant'?'active':''} onClick={()=>this.changeRole('merchant')}>商家短信模板</span>
						</p>
						<h5>短信剩余条数10000条</h5>
					</div>
					<div className="right">
						<Button size="small" onClick={this.showNew}>
							<IconFont type="icon-plus-circle-fill" />
							新建模板
						</Button>
						<Button size="small" type="primary" onClick={this.goRecord}>发送记录</Button>
					</div>
				</div>
				<div className="chart u_chart noMargin">
					<Table
						columns={columns}
						rowKey={record => record.product_id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
				<div className="pagination">
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						params={this.state.paginationParams}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default withRouter(Sms);