import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
import {hasPermission} from "../../utils/hasPermissions";
const { SubMenu } = Menu;
let baseMenu = [
	{
		path:'/payment',
		icon:'icon-accountbook-fill',
		text:'支付设置',
		slug: 'menu_set_payment'
	},
	
];
baseMenu = baseMenu.filter(item=> hasPermission(item.slug));

const Payment = ({ match }) => (
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
Payment.propTypes = {
	match: PropTypes.object.isRequired
}

export default Payment
