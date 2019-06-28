// 员工列表

import React from 'react'
import {Modal, Input, Table} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import axios from 'axios'
import {admins} from "../../api/setting";
import {trim} from "../../utils/dataStorage";
const Search = Input.Search;
const { Column } = Table;

class StaffFrozen  extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			tableData:[],
			confirmLoading: false
		};
	}
	
	componentWillMount() {
	
	}
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.visible){
			admins({limit:50,page:1,only_trashed:true}).then(r=>{
				this.setState({tableData:r.data})
			})
		}
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	render() {
		return (
			<div>
				<Modal
					title="员工列表"
					width={1000}
					centered={true}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					footer={null}
				>
					<div className="list">
						<Search
							className="searchInput"
							placeholder="请输入员工姓名或手机号码"
							onSearch={value => {
								value = trim(value);
								admins({limit:10,page:1,only_trashed:true,search:`name:${value};mobile:${value}`}).then(r=>{
									this.setState({tableData:r.data})
								});
							}}
							onFocus={()=>{
								let rightBtn = document.getElementsByClassName('ant-input-search-button')[0]
								rightBtn.setAttribute("style","background-color:#4f9863!important;color:#FFF!important;border-color: #58A86E!important;box-shadow: 0  0 3px rgba(88,168,110,0.5)!important")
							}}
							onBlur={()=>{
								let rightBtn = document.getElementsByClassName('ant-input-search-button')[0]
								rightBtn.setAttribute("style","background-color:#fff!important;color:#666!important;border-color: #D9D9D9!important;box-shadow: none!important")
							}}
							enterButton
						/>
						
						<div className="listChart">
							<Table dataSource={this.state.tableData} rowKey={record => record.id}>
								<Column
									style={{width:'170px'}}
									title="姓名"
									dataIndex="name"
									key="name"
								/>
								<Column
									style={{width:'150px'}}
									title="手机号码"
									dataIndex="mobile"
									key="mobile" />
								<Column
									style={{width:'190px'}}
									title="新增时间"
									dataIndex="created_at"
									key="created_at" />
								<Column
									style={{width:'190px'}}
									title="删除时间"
									dataIndex="deleted_at"
									key="deleted_at" />
								<Column
									style={{width:'150px'}}
									title="角色"
									render={(text,record)=>{
										let roles = [];
										if(record.roles){
											record.roles.forEach(item=>{
												roles.push(item.name)
											})
										}
										return (
											<span>
												{roles.toString()}
											</span>
										)
									}}

								/>
							</Table>
						</div>
					</div>
				</Modal>
			</div>
		);
	}
}
export default StaffFrozen