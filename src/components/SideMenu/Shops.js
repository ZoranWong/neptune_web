import React from 'react'
import PropTypes from 'prop-types'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
import {hasPermission} from "../../utils/hasPermissions";
let baseMenu = [
	{
		path:'/shops',
		icon:'icon-arraive',
		text:'店铺管理',
		slug: 'menu_shop_management'
	},
	{
		path:'/shops/ShopSetting',
		icon:'icon-qudao1',
		text:'店铺设置',
		slug: 'menu_shop_setting'
	},
	{
		path:'/shops/groups',
		icon:'icon-process',
		text:'店铺组',
		slug: 'menu_shop_group'
	},
	{
		path:'/shops/frozen',
		icon:'icon-lock-fill',
		text:'已冻结',
		slug: 'menu_shop_frozen'
	},
	{
		path:'/shops/channel',
		icon:'icon-qudao1',
		text:'店铺渠道',
		slug: 'menu_shop_channel'
	},
	{
		path:'/shops/logisticsRoutes',
		icon:'icon-qudao1',
		text:'物流路线',
		slug: 'menu_shop_channel'
	},
	{
		path:'/shops/BreakfastCart',
		icon:'icon-qudao1',
		text:'早餐车',
		slug: 'menu_shop_breakfastCart'
	},
	{
		path:'/shops/Supervision',
		icon:'icon-qudao1',
		text:'督导组',
		slug: 'menu_shop_supervision'
	}
];
// baseMenu = baseMenu.filter(item=> hasPermission(item.slug));
console.log("店铺管理信息打印"+hasPermission('menu_shop_management'));
const Shops = ({ match }) => (
	<div style={{ paddingBottom: '120px',width:'216px' }}>
		<Menu theme="light" defaultSelectedKeys={[match.url]} selectedKeys={[match.url]} defaultOpenKeys={['sub4']} mode="vertical">
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
