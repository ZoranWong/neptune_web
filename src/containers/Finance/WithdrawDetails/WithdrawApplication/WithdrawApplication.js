import React, {Component} from 'react';
import {Button, message, Modal, Table} from "antd";
import {withdrawApplications, withdrawList,confirmWithdraw} from "../../../../api/finance/withdraw";
import CustomPagination from "../../../../components/Layout/Pagination";
import {searchJson} from "../../../../utils/dataStorage";
import SearchInput from "../../../../components/SearchInput/SearchInput";
import ApplicationAdvancedFilterComponent from "../components/ApplicationAdvancedFilterComponent";
import {operation, withdraw_application_fields} from "../../../../utils/withdraw_application_fields";
class WithdrawApplication extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data:[],
			paginationParams:{
				searchJson: searchJson({state: 1})
			},
			api:withdrawList,
			filterVisible: false,
			checkedAry: [],
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
	
	}
	
	// 分页器改变值
	paginationChange = (list) =>{
		this.setState({data:list})
	};
	
	withdraw = (data) => {
		// 规划
		if (!data) {
			this.notice()
		} else {
			confirmWithdraw({searchJson: searchJson({logic_conditions: data})}).then(r=>{
				this.refresh();
				message.success('提现成功');
				this.setState({filterVisible: false})
			}).catch(_=>{})
		}
	};
	
	// 提醒全部提现
	notice = () => {
		let refresh = this.refresh;
		let self = this;
		let confirmModal = Modal.confirm({
			title: (
				<div className= 'u_confirm_header'>
					提示
					<i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
						confirmModal.destroy()
					}}>&#xe82a;</i>
				</div>
			),
			icon:null,
			width:'280px',
			closable:true,
			centered:true,
			content: (
				<div className="U_confirm">
					未选择高级筛选将会将所有提现申请全部提现，是否继续?
				</div>
			),
			cancelText: '取消',
			okText:'确定',
			okButtonProps: {
				size:'small'
			},
			cancelButtonProps:{
				size:'small'
			},
			onOk() {
				// 确定按钮执行操作
				confirmWithdraw({searchJson: {}}).then(r=>{
					self.setState({filterVisible: false});
					refresh();
					message.success('提现成功');
				}).catch(_=>{})
			}
		});
	};
	
	// 头部搜索框
	search = (value) =>{
		this.setState({
			api:withdrawList,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value,state: 1})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	onSubmit = (data) =>{
		this.setState({
			api:withdrawList,
			paginationParams:{...this.state.paginationParams,searchJson:searchJson({logic_conditions:data,state: 1})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	refresh = ()=>{
		this.setState({
			filterVisible:false,
			paginationParams:{
				searchJson: searchJson({state: 1})
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
	
	
	
	render() {
		const columns = [
			{
				title: '店铺名称/姓名/手机号',
				render: (text, record) => `${record.shop_name}/${record['shop_keeper_name']}/${record['shop_keeper_mobile']}`
			},
			{
				title: '渠道',
				dataIndex: 'channel_name',
			},
			{
				title: '金额',
				dataIndex: 'withdrawal_amount',
			}
		];
		const rowSelection = {
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({checkedAry:selectedRowKeys})
			},
			getCheckboxProps: record => ({
				disabled: record.name === 'Disabled User', // Column configuration not to be checked
				name: record.name,
			})
		};
		return (
			<div className="withdrawApp">
				<ApplicationAdvancedFilterComponent
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
					onSubmit={this.onSubmit}
					refresh={this.refresh}
					value={withdraw_application_fields}
					operation={operation}
					withdraw={this.withdraw}
				/>
				
				
				<div className="header">
					{/*<Button size="small" onClick={this.withdraw}>确认提现</Button>*/}
					<Button size="small" onClick={()=>{
						this.props.history.go(-1)
					}}>返回上一页</Button>
				</div>
				<div className="wa_chartContent">
					<ul className="header_left" style={{background: '#F6F7FA', paddingLeft: '20px'}}>
						<li>
							店铺:
							<SearchInput
								getDatas={this.search}
								text='请输入店铺名称/店铺编号'
							/>
						</li>
						<li>
							<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						</li>
					</ul>
					<div className="chart u_chart">
						<Table
							columns={columns}
							rowSelection={rowSelection}
							rowKey={record => record.log_id}
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
			</div>
		);
	}
}

export default WithdrawApplication;
