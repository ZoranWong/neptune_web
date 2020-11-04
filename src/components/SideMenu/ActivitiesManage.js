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
		path:'/activities/productsManage',
		icon:'icon-dingdan',
		text:'商品管理',
		slug: 'menu_order_management'
	},
	{
		path:'/activities/orderManage',
		icon:'icon-resource',
		text:'订单管理',
		slug: 'menu_order_setting'
	},
	{
		path:'/activities/marketing',
		icon:'icon-tuikuan',
		text:'营销',
		slug: 'menu_order_after_service'
	}
];
baseMenu = baseMenu.filter(item=> hasPermission(item.slug));
const ActivitiesManage = ({ match }) => (
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

ActivitiesManage.propTypes = {
	match: PropTypes.object.isRequired
}

export default ActivitiesManage
