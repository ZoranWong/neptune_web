import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
const { SubMenu } = Menu;
const baseMenu = [
	{
		path:'/shops',
		icon:'icon-arraive',
		text:'店铺管理',
	},
	{
		path:'/shops/groups',
		icon:'icon-process',
		text:'店铺组',
	},
	{
		path:'/shops/frozen',
		icon:'icon-lock-fill',
		text:'已冻结',
	},
	{
		path:'/shops/channel',
		icon:'icon-qudao1',
		text:'店铺渠道',
	}
];
const Shops = ({ match }) => (
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

Shops.propTypes = {
	match: PropTypes.object.isRequired
};

export default Shops
