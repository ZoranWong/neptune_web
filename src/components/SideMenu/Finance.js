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
		path:'/finance',
		icon:'icon-accountbook-fill',
		text:'资产概览',
		slug: 'menu_assets_overview'
	},
	{
		path:'/finance/incomeDetails',
		icon:'icon-qianbao1',
		text:'收入明细',
		slug: 'menu_income_detailed'
	},
	{
		path:'/finance/balanceDetails',
		icon:'icon-YUAN-circle-fill',
		text:'余额明细',
		slug: 'menu_balance_detailed'
	},
	{
		path:'/finance/refundDetails',
		icon:'icon-tuikuan',
		text:'退款详情',
		slug: 'menu_refund_detailed'
	},
	{
		path:'/finance/withdrawDetails',
		icon:'icon-tixian1',
		text:'提现详情',
		slug: 'menu_withdraw_detailed'
	},
];
baseMenu = baseMenu.filter(item=> hasPermission(item.slug));

const Finance = ({ match }) => (
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

Finance.propTypes = {
	match: PropTypes.object.isRequired
}

export default Finance
