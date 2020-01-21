import React, {Component} from 'react';
import {Button, message, Table} from "antd";
import OperateAct from "./Modal/OperateAct";
import IconFont from "../../../utils/IconFont";
import {allActs,initActs} from "../../../api/activities";
import './css/index.sass'
class ActivitiesManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			api: allActs,
			current: 1,
			createActVisible: false
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh();
	}
	
	refresh = () => {
		allActs({}).then(r=>{
			if (r.data.length) {
				this.setState({data: r.data})
			} else {
				this.initActs();
			}
			
		}).catch(_=>{})
	};
	
	initActs = () => {
		initActs({}).then(r=>{
			message.success(r.message)
		}).catch(_=>{})
	};
	
	createAct = () => {
		this.setState({createActVisible: true})
	};
	
	closeCreateAct = () => {
		this.setState({createActVisible: false})
	};
	
	productsManage = (record) => {
		this.props.history.push({pathname:"/activities/productsManage",state:{id:record.id}});
	};
	
	orderManage = (record) => {
		this.props.history.push({pathname:"/activities/orderManage",state:{id:record.id}});
	};
	
	marketing = (record) => {
		this.props.history.push({pathname:"/activities/marketing",state:{id:record.id}});
	};
	
	render() {
		
		const column = [
			{
				title: '活动名称',
				dataIndex: 'name',
				width: '200px',
				align: 'center'
			},
			{
				title: '活动图片',
				dataIndex: 'image',
				width: '400px',
				align: 'center',
				render: (text, record) => (
					<img src={text} alt=""/>
				)
			},
			{
				title: '操作',
				align: 'center',
				render: (text, record) => (
					<div>
						<Button size="small" onClick={()=>this.productsManage(record)}>
							<IconFont type="icon-all-fill" />
							商品管理
						</Button>
						<Button size="small" onClick={()=>this.orderManage(record)}>
							<IconFont type="icon-tubiaozhizuomoban" />
							订单管理
						</Button>
						<Button size="small" onClick={()=>this.marketing(record)}>
							<IconFont type="icon-chart-relation" />
							营销
						</Button>
					</div>
				)
			}
		];
		
		const actProps = {
			visible: this.state.createActVisible,
			onClose: this.closeCreateAct,
			refresh: this.refresh
		};
		
		return (
			<div>
				
				<OperateAct {...actProps} />
				
				<Button size="small" onClick={this.createAct}>
					<IconFont type="icon-plus-circle" />
					新增活动
				</Button>
				<div className="chart u_chart">
					<Table
						columns={column}
						rowKey={record => record.id}
						pagination={false}
						rowClassName={(record, index) => {
							let className = '';
							if (index % 2 ) className = 'dark-row';
							return className;
						}}
						dataSource={this.state.data}
					/>
				</div>
			</div>
		);
	}
}

export default ActivitiesManage;
