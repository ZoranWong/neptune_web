import React from 'react'
import PropTypes from 'prop-types'
import { Menu,Dropdown } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
import {hasPermission} from "../../utils/hasPermissions";
import { DownOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

let baseMenu = [
	{
		path:'/activities',
		icon:'icon-dangao-shi',
		text:'蛋糕管理',
		slug: 'menu_order_management'
	},
	{
		path:'/activities/all',
		icon:'icon-huodong3',
		text:'活动管理',
	},
	{
		text: '拼团',
		path: '/activities/grouponList'
	},
	{
		text: '拼团单管理',
		path: '/activities/grouponManage'
	},
	{
		text: '拼团订单管理',
		path: '/activities/grouponOrderManage'
	},
	{
		text: '商品管理',
		path: '/activities/grouponProductsManage'
	}
];
// const groups = [
// 	{
// 		name: '拼团',
// 		path: '/activities/grouponList'
// 	},
// 	{
// 		name: '拼团单管理',
// 		path: '/activities/grouponManage'
// 	},
// 	{
// 		name: '拼团订单管理',
// 		path: '/activities/grouponOrderManage'
// 	},
// 	{
// 		name: '商品管理',
// 		path: '/activities/grouponProductsManage'
// 	}
// ];


// const menu = (
// 	<Menu>
// 		{
// 			groups.map((item, index)=>(
// 				<Menu.Item key={index}>
// 					<Link to={item.path} key={item.name}>{item.name}</Link>
// 				</Menu.Item>
//
// 			))
// 		}
// 	</Menu>
// );

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
							{
								item.text === '拼团管理' ? <a>
									<IconFont type={item.icon} />
									<span>拼团管理</span>
								</a> : <Link to={item.path}>
									<IconFont type={item.icon} />
									<span>{item.text}</span>
								</Link>
							}

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
