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
		path:'/activities',
		icon:'icon-dingdan',
		text:'蛋糕管理',
		slug: 'menu_order_management'
	},
	{
		path:'/activities/all',
		icon:'icon-dingdan',
		text:'活动管理',
	},
	{
		path:'/activities/groupon',
		icon:'icon-dingdan',
		text:'拼团管理',
	},
];
const Activities = ({ match }) => (
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
);

Activities.propTypes = {
	match: PropTypes.object.isRequired
};

export default Activities
