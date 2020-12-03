import React, {Component} from 'react';
import {Button, message, Modal, Table} from "antd";
import './css/index.sass'
import NewCard from "./Modal/NewMerchantsCard";
import SearchInput from "../../../components/SearchInput/SearchInput";
import {cardList, stopCard} from "../../../api/marketing/cards";
import {getToken, searchJson} from "../../../utils/dataStorage";
import CustomPagination from "../../../components/Layout/Pagination";
import Config from "../../../config/app";
class Recharge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			api: cardList,
			paginationParams: {
				consume_group:1
			},
			current: 1,
			cards: [],
			newCardVisible: false
		};
		
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh();
	};
	
	refresh = () => {
		this.child.current.pagination(this.child.current.state.current)
	};

	// 头部搜索框
	search = (value) =>{
		this.setState({
			api: cardList,
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	paginationChange = (list)=>{
		this.setState({cards:list})
	};

	// 激活详情
	exchangeDetails = (id) => {
		this.props.history.push({pathname:"/marketing/rechargeDetails", state: {id: id}});
	};

	// 停用
	stopExchange = (id) => {
		let refresh = this.refresh;
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
					确定停用该消费卡吗？
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
				stopCard({},id).then(r=>{
					message.success(r.message);
					refresh()
				})
			}
		});
	};

	// 创建充值卡
	createNewCard = () => {
		this.setState({newCardVisible: true})
	};
	closeCreateNewCard = () => {
		this.setState({newCardVisible: false})
	};

	// 导出充值卡
	export = (id) => {
		let json = searchJson({
			strategy: 'CONSUME_CARD_EXCHANGE_CODE',
			customize_columns: [],
			logic_conditions: [],
			consume_card_id: id
		});
		window.location.href = `${Config.apiUrl}/api/backend/export?searchJson=${json}&Authorization=${getToken()}`;
	};

	
	
	render() {
		const columns = [
			{
				title: '充值卡名称',
				dataIndex: 'name',
			},
			{
				title: '金额',
				dataIndex: 'amount',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
			},
			{
				title: '有效期',
				dataIndex: 'start_time',
				render: (text, record) => (
					<span>{text}-{record['end_time']}</span>
				)
			},
			{
				title:'使用场景',
				dataIndex:'used_scene',
				// render:(text, record)=>(
                    //<span style={{'color':'blue','border':'1px solid blue','marginRight' : '10px'}}>{record.used_scene}</span>
					// &&<span style={{'color':'blue','border':'1px solid blue','marginRight' : '10px'}}>{record.used_scene[1]}</span>
					// &&<span style={{'color':'blue','border':'1px solid blue','marginRight' : '10px'}}>{record.used_scene[2]}</span>
					// &&<span style={{'color':'blue','border':'1px solid blue','marginRight' : '10px'}}>{record.used_scene[3]}</span>
					
                // )
			},
			{
				title: '总数量',
				dataIndex: 'total_quantity',
			},
			{
				title: '已激活数量',
				dataIndex: 'exchange_quantity'
			},
			{
				title: '状态',
				dataIndex: 'state_desc'
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
							onClick={()=>this.exchangeDetails(record.id)}
						>激活详情
						</span>
						{
							(record.state === 0 || record.state === 1) && <span
								style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
								onClick={()=>this.stopExchange(record.id)}
							>停用
						</span>
						}
						{
							record['exchange_code_ready'] && <span
								style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.export(record.id)}
							>导出
						</span>
						}

					</div>
			},
		];
		
		const cardProps = {
			visible: this.state.newCardVisible,
			onClose: this.closeCreateNewCard,
			refresh: this.refresh
		};
		
		return (
			<div className='bannerSetting'>

				<NewCard {...cardProps} />

				<div className="chart">
					<div className="headerLeft rechargeCards">
						<SearchInput
							getDatas={this.search}
							text='请输入充值卡名称'
						/>
						<Button className="addNew addNewCard" onClick={this.createNewCard}>
							<i className="iconfont">&#xe7e0;</i>
							新建充值卡
						</Button>
					</div>

					<Table
						dataSource={this.state.cards}
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
						text="个充值卡"
						ref={this.child}
						params={this.state.paginationParams}
						current={this.state.current}
						valChange={this.paginationChange}
					/>
				</div>
			</div>
		);
	}
}

export default Recharge;
