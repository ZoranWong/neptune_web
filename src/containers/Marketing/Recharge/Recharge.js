import React, {Component} from 'react';
import {Button, Table,Switch} from "antd";
import './css/index.sass'
import NewCard from "./Modal/NewCard";
import SearchInput from "../../../components/SearchInput/SearchInput";

import {searchJson} from "../../../utils/dataStorage";
class Recharge extends Component {
	constructor(props) {
		super(props);
		this.state = {
			cards: [1],
			newCardVisible: false
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh();
	};
	
	refresh = () => {

	};

	// 头部搜索框
	search = (value) =>{
		this.setState({
			api: '',
			paginationParams:{...this.state.paginationParams,
				searchJson:searchJson({search:value})}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		});
	};
	
	paginationChange = (list)=>{
		this.setState({banners:list})
	};

	// 兑换详情
	exchangeDetails = () => {
		this.props.history.push({pathname:"/marketing/rechargeDetails"});
	};

	// 停用
	stopExchange = () => {

	};

	// 创建充值卡
	createNewCard = () => {
		this.setState({newCardVisible: true})
	};
	closeCreateNewCard = () => {
		this.setState({newCardVisible: false})
	};

	// 导出充值卡
	export = () => {

	};

	
	
	render() {
		const columns = [
			{
				title: '充值卡名称',
				dataIndex: 'title',
			},
			{
				title: '金额',
				dataIndex: 'scene_desc',
			},
			{
				title: '创建时间',
				dataIndex: 'synopsis',
			},
			{
				title: '有效期',
				dataIndex: 'can_jump',
			},
			{
				title: '总数量',
				dataIndex: 'action_type',
			},
			{
				title: '已兑换数量',
				dataIndex: 'action_link'
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
							onClick={()=>this.exchangeDetails(record)}
						>兑换详情
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
							onClick={()=>this.stopExchange(record.id)}
						>停用
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.export(record.id)}
						>导出
						</span>
					</div>
			},
		];
		
		const cardProps = {
			visible: this.state.newCardVisible,
			onClose: this.closeCreateNewCard
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
			</div>
		);
	}
}

export default Recharge;
