import React, {Component} from 'react';
import {Button, message, Modal, Table} from "antd";
import BannerSetting from "./Modal/BannerSetting";
import {banners, deleteBanner} from "../../../api/marketing/banners";
import './css/index.sass'
import {searchJson} from "../../../utils/dataStorage";
class Banners extends Component {
	constructor(props) {
		super(props);
		this.state = {
			banners: [],
			settingVisible: false,
			banner: {},
		};
		this.child = React.createRef();
	}
	
	componentDidMount() {
		this.refresh();
	};
	
	refresh = () => {
		banners({searchJson: searchJson({scene: ''})}).then(r=>{
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
				title: '标题',
				dataIndex: 'title',
			},
			{
				title: '使用场景',
				dataIndex: 'scene_desc',
			},
			{
				title: '简介',
				dataIndex: 'synopsis',
			},
			{
				title: '图片',
				dataIndex: 'image',
				render: (text, record) => (
					<img src={text} className='tableImage' alt=""/>
				)
			},
			{
				title: '是否可跳转',
				dataIndex: 'can_jump',
				render: (text,record) => (
					<span>{text ? '是' : '否'}</span>
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
				title: '序号',
				dataIndex: 'sort',
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

export default Banners;
