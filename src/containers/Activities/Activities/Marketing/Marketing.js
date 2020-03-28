import React, {Component} from 'react';
import {Button, message, Modal, Table} from "antd";
import BannerSetting from "./Modal/BannerSetting";
import {banners, deleteBanner} from "../../../../api/activities";
import './css/index.sass'
class Marketing extends Component {
	constructor(props) {
		super(props);
		this.state = {
			banners: [],
			settingVisible: false,
			banner: {},
			actId: ''
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.setState({actId: this.props.location.state.id},()=>{
			this.refresh();
		})
	};
	
	refresh = () => {
		banners({},this.state.actId).then(r=>{
			this.setState({banners: r.data})
		}).catch(_=>{})
	};
	
	paginationChange = (list)=>{
		this.setState({banners:list})
	};
	
	createNewBanner = () =>{
		this.setState({settingVisible: true,banner: {}})
	};
	
	editBanner = (record) =>{
		this.setState({settingVisible: true,banner: record})
	};
	
	closeModal = () =>{
		this.setState({settingVisible: false})
	};
	
	backAct = () => {
		this.props.history.push({pathname:"/activities"})
	};
	
	deleteBanner = id => {
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
					确定删除该活动banner么？
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
				deleteBanner({},id).then(r=>{
					message.success(r.message);
					refresh()
				}).catch(_=>{})
			}
		});
	};
	
	render() {
		
		const columns = [
			{
				title: '图片',
				dataIndex: 'image',
				render: (text, record) => (
					<img src={text} className='tableImage' alt=""/>
				)
			},
			{
				title: '跳转类型',
				dataIndex: 'action_type',
				render: (text,record)=>{
					if (record['can_jump']) {
						return text === 'PRODUCT_DETAIL'? '商品详情' : '网址链接'
					} else {
						return '无'
					}
				}
			},
			{
				title: '跳转地址/商品详情ID',
				dataIndex: 'action_link',
				render: (text,record)=>{
					return record['can_jump'] ? text : '无'
				}
			},
			{
				title: '上传时间',
				dataIndex: 'created_at',
			},
			{
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
							onClick={()=>this.editBanner(record)}
						>编辑
						</span>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
							onClick={()=>this.deleteBanner(record.id)}
						>删除
						</span>
					</div>
			},
		];
		
		const bannerSettingProps = {
			visible: this.state.settingVisible,
			banner: this.state.banner,
			onclose : this.closeModal,
			actId: this.state.actId,
			refresh: this.refresh
		};
		
		return (
			<div className='bannerSetting'>
				<BannerSetting {...bannerSettingProps} />
				
				<div className="chart">
					<Button className="addNew" onClick={this.createNewBanner}>
						<i className="iconfont">&#xe7e0;</i>
						新增Banner</Button>
					<Button size='small' style={{'float': 'right'}} onClick={this.backAct}>返回蛋糕管理</Button>
					<Table
						dataSource={this.state.banners}
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

export default Marketing;
