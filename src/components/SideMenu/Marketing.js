import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
const { SubMenu } = Menu;

const baseMenu = [
	{
		path:'/marketing',
		icon:'icon-dingdan',
		text:'优惠券',
	},
	{
		path:'/marketing/integralMall',
		icon:'icon-tuikuan',
		text:'积分商城',
	},
	{
		path:'/marketing/userStore',
		icon:'icon-box-fill',
		text:'用户储值',
	},
	{
		path:'/marketing/message',
		icon:'icon-box-fill',
		text:'模板消息',
	},
];

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
