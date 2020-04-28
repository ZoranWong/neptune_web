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
		path:'',
		icon:'icon-dingdan',
		text:'拼团管理',
	},
];
const groups = [
	{
		name: '拼团',
		path: '/activities/grouponList'
	},
	{
		name: '拼团单管理',
		path: '/activities/grouponManage'
	},
	{
		name: '拼团订单管理',
		path: '/activities/grouponOrderManage'
	},
	{
		name: '商品管理',
		path: '/activities/grouponProductsManage'
	}
];


const menu = (
	<Menu>
		{
			groups.map((item, index)=>(
				<Menu.Item key={index}>
					<Link to={item.path} key={item.name}>{item.name}</Link>
				</Menu.Item>

			))
		}
	</Menu>
);

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
								item.text === '拼团管理' ? <Dropdown overlay={menu}>
									<a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
										<IconFont type={item.icon} />
										拼团管理
										<DownOutlined />
									</a>
								</Dropdown> : <Link to={item.path}>
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
