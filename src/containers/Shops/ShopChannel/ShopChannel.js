import React from 'react';
import {Table, Button, Popconfirm, message} from 'antd';
import './css/shopGroup.sass'
import {withRouter} from "react-router-dom";
import {getChannels,deleteChannel} from "../../../api/shops/channel";
import CreateNewChannel from './CreateNewChannel'
import CustomPagination from '../../../components/Layout/Pagination'
const { Column } = Table;
class ShopGroup extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			api:getChannels,
			data:[],
			createVisible:false,
			detailVisible:false,
			detailId:''
		};
		this.child = React.createRef();
	}
	paginationChange = (list)=>{
		this.setState({data:list})
	};
	
	
	
	refresh = ()=>{
		this.child.current.pagination(this.child.current.state.current)
	};
	
	addNew = () =>{
		this.setState({createVisible:true})
	};
	closeNew = () =>{
		this.setState({createVisible:false})
	};
	
	deleteChannel = (record) => {
		deleteChannel({channel_id: record.id}).then(r => {
			message.success(r.message);
			this.refresh()
		}).catch(_ => {})
	};
	
	render(){
		const columns = [
			{
				title: '渠道',
				dataIndex: 'name',
			},
			{
				title: '店铺数量',
				dataIndex: 'model_count',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.deleteChannel(record)}
						>删除
						</span>
					</div>
			},
		];
		return (
			<div>
				<CreateNewChannel
					visible={this.state.createVisible}
					onCancel={this.closeNew}
					refresh={this.refresh}
				/>
				<div className="chart">
					<Button className="addNew" onClick={this.addNew}>
						<i className="iconfont">&#xe7e0;</i>
						新增渠道</Button>
					<Table
						dataSource={this.state.data}
						rowKey={record => record.id}
						pagination={false}
						columns={columns}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
					>
					
					</Table>
				</div>
				<div className="pagination">
					<CustomPagination
						api={this.state.api}
						ref={this.child}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		)
	}
}
export default withRouter(ShopGroup);
