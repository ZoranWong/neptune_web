import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
import {hasPermission} from "../../utils/hasPermissions";
const { SubMenu } = Menu;

let baseMenu = [
	{
		path:'/order',
		icon:'icon-dingdan',
		text:'订单管理',
		slug: 'menu_order_management'
	},
	{
		path:'/order/setting',
		icon:'icon-resource',
		text:'订单设置',
		slug: 'menu_order_setting'
	},
	{
		path:'/order/refund',
		icon:'icon-tuikuan',
		text:'退款售后',
		slug: 'menu_order_after_service'
	},
	{
		path:'/order/goodsOrder',
		icon:'icon-box-fill',
		text:'订货管理',
		slug: 'menu_order_agent'
	},
	{
		path:'/order/summaryOrders',
		icon:'icon-box-fill',
		text:'消费者汇总单',
		slug: "menu_order_user_summary"
	},
	{
		path:'/order/orderTransformer',
		icon:'icon-box-fill',
		text:'订单转换',
		slug: "menu_order_management"
	},
];
baseMenu = baseMenu.filter(item=> hasPermission(item.slug));
const Order = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu
			theme="light"
			defaultSelectedKeys={[match.url]}
			selectedKeys={[match.url]}
			defaultOpenKeys={['sub4']}
			mode="vertical"
		>
			{
				baseMenu.map(item=>{
					return (
						<Menu.Item key={item.path}>
							<Link to={item.path}>
								<IconFont type={item.icon} />
								<span>{item.text}</span>
							</Link>
						</Menu.Item>
					)
				})
			}
			
		</Menu>
	</div>
)

Order.propTypes = {
	match: PropTypes.object.isRequired
}

export default Order
