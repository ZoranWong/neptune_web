// 员工列表

import React from 'react'
import {Modal, Input, Table} from 'antd';
import './css/common.sass'
import './css/staffList.sass'
import {admins} from "../../api/setting";
import {trim} from "../../utils/dataStorage";
import SearchInput from "../../components/SearchInput/SearchInput";
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
	
	
	componentWillReceiveProps(nextProps, nextContext) {
		if(nextProps.visible){
			admins({limit:50,page:1,only_trashed:true}).then(r=>{
				this.setState({tableData:r.data})
			}).catch(_=>{})
		}
	}
	
	handleCancel = () => {
		this.props.onClose()
	};
	
	//搜索框搜索
	searchDatas = (value) =>{
		admins({limit:10,page:1,only_trashed:true,search:`name:${value};mobile:${value}`}).then(r=>{
			this.setState({tableData:r.data})
		}).catch(_=>{});
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
						
						<SearchInput
							getDatas={this.searchDatas}
							text="请输入员工姓名或手机号码"
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