import React from 'react';
import {Table, Button, Popconfirm, message} from 'antd';
import './css/shopGroup.sass'
import {withRouter} from "react-router-dom";
import {groups,deleteGroup} from "../../../api/goods/groups";
import CreateNewGroup from "./CreateNewGroup";
import GroupDetail from "./GroupDetail";
const { Column } = Table;
class Groups extends React.Component{
	
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
	
	goGroupManage = (record) =>{
		this.props.history.push({pathname:'/goods',query:{groupId:record.id}});
	};
	
	
	
	render(){
		return (
			<div>
				<CreateNewGroup
					visible={this.state.createVisible}
					onCancel={this.closeNew}
					refresh={this.refresh}
				/>
				<GroupDetail
					visible={this.state.detailVisible}
					onCancel={this.hideDetail}
					groupId={this.state.detailId}
				/>
				<div className="chart">
					<Button className="addNew" onClick={this.addNew}>
						<i className="iconfont">&#xe7e0;</i>
						新增商品组</Button>
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
							title="商品组"
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
							title="商品数量"
							dataIndex="model_count"
							key="model_count" />
						<Column
							title="操作"
							key="action"
							className="column_group groupOperation"
							render={(text, record) => (
								<span>
							<span className="operation" onClick={()=>this.goGroupManage(record)}>详情</span>
							<Popconfirm
								title="确定要删除该商品组么"
								okText="确定"
								icon={null}
								cancelText="取消"
								onConfirm={()=>{
									deleteGroup({},record.id).then(r=>{
										message.success('删除商品组成功');
										this.refresh()
									})
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
export default withRouter(Groups);
