import React from 'react';
import {Table, Button, Popconfirm} from 'antd';
import './css/shopGroup.sass'
import {withRouter} from "react-router-dom";
import {groups} from "../../../api/shops/groups";
import CreateNewChannel from './CreateNewChannel'

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
	
	};
	
	addNew = () =>{
		this.setState({createVisible:true})
	};
	closeNew = () =>{
		this.setState({createVisible:false})
	};
	
	render(){
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
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
					>
						<Column
							className="column_group"
							title="渠道"
							dataIndex="name"
							key="name"
						/>
						<Column
							className="column_group primary"
							title="店铺数量"
							dataIndex="created_at"
							key="created_at" />
					</Table>
				</div>
			</div>
		)
	}
}
export default withRouter(ShopGroup);