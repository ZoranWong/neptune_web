import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
const { SubMenu } = Menu;
const baseMenu = [
	{
		path:'/finance',
		icon:'icon-dingdan',
		text:'资产概览',
	},
	{
		path:'/finance/incomeDetails',
		icon:'icon-tuikuan',
		text:'收入明细',
	},
	{
		path:'/finance/balanceDetails',
		icon:'icon-box-fill',
		text:'余额明细',
	},
	{
		path:'/finance/refundDetails',
		icon:'icon-box-fill',
		text:'退款详情',
	},
	{
		path:'/finance/withdrawDetails',
		icon:'icon-box-fill',
		text:'提现详情',
	},
];
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
