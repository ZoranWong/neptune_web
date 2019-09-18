import React, {Component, Fragment} from 'react';
import '../css/customMessage.sass'
import {Collapse, Icon, Input , Button ,message} from 'antd';
import ReactColor from "../../../../components/ReactColor/ReactColor";
import {updateWeChatMessage,weChatMessageList,deleteChatMessageList} from "../../../../api/marketing/message";
import IconFont from "../../../../utils/IconFont";

const { Panel } = Collapse;
class EditWeChatMessage extends Component {
	constructor(props) {
		super(props);
		this.child = React.createRef();
		this.state = {
			item: props.location.state.item,
			id:props.location.state.listId,
			data:[]
		}
	}
	
	componentDidMount() {
		this.refresh();
	}
	
	refresh = () =>{
		weChatMessageList({limit:10,page:1},this.state.id).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{})
	};
	
	submit = () =>{
		let items = this.state.item.items;
		let content = [];
		items.forEach(item=>{
			let data = {};
			data.value = item.value;
			data.color = item.color || '#666';
			content.push(data)
		});
		updateWeChatMessage({content},this.state.id,this.state.item.id).then(r=>{
			message.success(r.message);
			this.refresh();
		}).catch(_=>{})
	};
	
	valueChange = (v,e) =>{
		let item = this.state.item;
		item.items.forEach(i=>{
			if(i.key === v.key){
				i.value = e.target.value
			}
		});
		this.setState({item})
	};
	
	colorChange = (v,c='#000') =>{
		let item = this.state.item;
		item.items.forEach(i=>{
			if(i.key === v.key){
				i.color = c
			}
		});
		this.setState({item})
	};
	
	//鼠标移入 显示删除
	show = (item) => {
		item.showDelete = true;
		this.setState({item})
	};
	
	// 鼠标划出 隐藏删除
	hide = (item) => {
		item.showDelete = false;
		this.setState({item})
	};
	
	// 删除消息
	delete = (item) =>{
		deleteChatMessageList({},this.state.id,item.id).then(r=>{
			message.success(r.message);
			this.refresh();
		}).catch(_=>{})
	};
	
	render() {
		const {item,data} = this.state;
		return (
			<Fragment>
				<div className="newBox">
					<div className="preview">
						<h3>微信模板消息</h3>
						<div className="m_ul">
							<h4>{item.title}</h4>
							<ul>
								{
									item.items.map((i)=>(<li key={i.key}>
										<span className="key">{i.key}</span>
										<span className="value" style={{color:i.color || '#666'}}>{i.value}</span>
									</li>))
								}
							</ul>
							<p>
								<span>查看详情</span>
								<Icon type="right" />
							</p>
						</div>
					</div>
					<div className="configuration">
						<h2>配置</h2>
						<ul>
							{
								item.items.map((i)=>(<li key={i.key}>
									<span>{i.key}</span>
									<Input value={i.value} onChange={e=>this.valueChange(i,e)} />
									<ReactColor defaultColor={i.color} ref={this.child} colorChange={(color)=>this.colorChange(i,color)} />
								</li>))
							}
						</ul>
						<div className="btnBox">
							<Button size="small" type="primary" onClick={this.submit}>立即更新</Button>
						</div>
					
					</div>
					<div className="information">
						<h3>配置小助手(补充说明)</h3>
						<span className='span'>
						各个配置项中，你可以自定义文本，在需要的地方关联上此模板消息之后，将采用你自定义的内容去发送消息给用户。你也可以使用大括号的形式，如xxx，其中，xxx代表的是下方某一类中的可选项，填写时请查看小手册，否则，不在下方小手册中的值将以你填写的大括号中的内容发送。
					</span>
						<span>
						另外需要注意的是，填写正确的匹配项，如不要在优惠券有关的模板信息中填写订单中的配置项，造成不可识别的配置项仍然将以你填写的大括号中的内容发送。
					</span>
						<Collapse bordered={false} >
							<Panel header="优惠券" key="1">
								<p>title: 优惠券标题</p>
								<p>validateTime: 优惠券有效时间</p>
								<p>cardCode: 优惠券编码code</p>
							</Panel>
							<Panel header="订单" key="2">
								<p>selfPickUpCode: 自提码</p>
								<p>address: 自提地址、早餐车地址</p>
								<p>pickUpTime: 自提时间</p>
								<p>title: 待自提的商品名称</p>
								<p>amount: 订单实付金额</p>
								<p>paidAt: 支付时间</p>
							</Panel>
						</Collapse>
					</div>
				</div>
				<div className="m_list">
					{
						data.map(item=>(
							<div className="m_list_item">
								<div className="m_ul" onMouseEnter={()=>this.show(item)}
									 onMouseLeave={()=>this.hide(item)}>
									<h4>{item.title}</h4>
									<ul>
										{
											item.items.map((i)=>(<li key={i.key}>
												<span className="key">{i.key}</span>
												<span className="value" style={{color:i.color || '#666'}}>{i.value}</span>
											</li>))
										}
									</ul>
									<p>
										<span>查看详情</span>
										<Icon type="right" />
									</p>
									<div className="delete" style={{visibility:item.showDelete?'visible':'hidden'}} onClick={()=>this.delete(item)}>
										<IconFont type="icon-delete-fill"  />
									</div>
								</div>
							</div>
						))
					}
				</div>
			</Fragment>
			
		);
	}
}

export default EditWeChatMessage;