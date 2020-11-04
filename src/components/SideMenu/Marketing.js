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
		path:'/marketing',
		icon:'icon-coupon',
		text:'优惠券',
		slug: 'menu_marketing_coupon'
	},
	{
		path:'/marketing/integralMall',
		icon:'icon-YUAN-circle-fill',
		text:'积分商城',
		slug: 'menu_marketing_integral_mall'
	},
	{
		path:'/marketing/userStore',
		icon:'icon-box-fill',
		text:'用户储值',
		slug: 'menu_marketing_deposit'
	},
	{
		path:'/marketing/message',
		icon:'icon-commentdots-fill',
		text:'模板消息',
		slug: 'menu_marketing_msg_template'
	},
	{
		path:'/marketing/banners',
		icon:'icon-shuffling-banner',
		text:'Banner设置',
		slug: 'menu_marketing_msg_template'
	},
	{
		path:'/marketing/recharge',
		icon:'icon-chongzhiqia',
		text: '充值卡',
		slug: 'menu_marketing_msg_template'
	},
];
baseMenu = baseMenu.filter(item=> hasPermission(item.slug));
const Marketing = ({ match }) => (
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

Marketing.propTypes = {
	match: PropTypes.object.isRequired
};

export default Marketing
