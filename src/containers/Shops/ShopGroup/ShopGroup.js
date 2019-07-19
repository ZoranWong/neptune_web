import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import './css/shopGroup.sass'
import {withRouter} from "react-router-dom";
import {groups} from "../../../api/shops/groups";
import CreateNewGroup from "./CreateNewGroup";

const { Column } = Table;
class ShopGroup extends React.Component{
	
	state = {
		data:[],
		createVisible:false,
		detailVisible:false,
		detailId:''
	};
	
	componentWillMount() {
		this.refresh()
	}
	
	refresh = ()=>{
		groups({}).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{})
	};
	
	addNew = () =>{
		this.setState({createVisible:true})
	};
	closeNew = () =>{
		this.setState({createVisible:false})
	};
	
	
	showDetail = (record) => {
		this.setState({detailVisible:true,detailId:record.id})
	};
	hideDetail = () =>{
		this.setState({detailVisible:false,detailId:''})
	};
	
	goUserList = (record) =>{
		this.props.history.push({pathname:'/user',query:{groupId:record.id}});
	};
	
	render(){
		return (
			<div>
				<CreateNewGroup
					visible={this.state.createVisible}
					onCancel={this.closeNew}
					refresh={this.refresh}
				/>
				<div className="chart">
					<Button className="addNew" onClick={this.addNew}>
						<i className="iconfont">&#xe7e0;</i>
						新增店铺组</Button>
					<Table
						dataSource={this.state.data}
						rowKey={record => record.id}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
					>
						<Column
							className="column_group"
							title="群组名称"
							dataIndex="name"
							key="name"
							render={(text, record) => (
								<span className="editIcon">
							<span>{text}</span>
							<i
								style={{color:'#4F9863',fontSize:'14px',marginLeft:'10px',cursor:'pointer'}}
								className="iconfont"
								onClick={()=>this.showDetail(record)}
							>&#xe7ab;</i>
						</span>
							)}
						/>
						<Column
							className="column_group primary"
							title="建立时间"
							dataIndex="created_at"
							key="created_at" />
						<Column
							className="column_group primary"
							title="总人数"
							dataIndex="model_count"
							key="model_count" />
						<Column
							title="操作"
							key="action"
							className="column_group groupOperation"
							render={(text, record) => (
								<span>
							<span className="operation" onClick={()=>this.goUserList(record)} >详情</span>
							<Popconfirm
								title="确定要删除该账号么"
								okText="确定"
								icon={null}
								cancelText="取消"
								onConfirm={()=>{
								
								}}
							>
								<span className="operation" >删除</span>
							</Popconfirm>
						</span>
							)}
						/>
					</Table>
				</div>
			</div>
		)
	}
}
export default withRouter(ShopGroup);