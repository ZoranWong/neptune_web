import React from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'
import '../../style/sider.sass'
import IconFont from "../../utils/IconFont";
const { SubMenu } = Menu;

const baseMenu = [
	{
		path:'/goods',
		icon:'icon-resource',
		text:'商品库管理',
	},
	{
		path:'/goods/obtainedGoods',
		icon:'icon-inboxin-fill',
		text:'下架商品',
	},
	{
		path:'/goods/classification',
		icon:'icon-all-fill',
		text:'商品分类',
	},
	{
		path:'/goods/groups',
		icon:'icon-database-fill',
		text:'商品组',
	},
	{
		path:'/goods/breakfastOrder',
		icon:'icon-shopping-cart-fill',
		text:'早餐车订货',
	},
	{
		path:'/goods/clientOrder',
		icon:'icon-arraive',
		text:'商户订货',
	},
	{
		path:'/goods/activities',
		icon:'icon-huodong',
		text:'活动',
	},
	{
		path:'/goods/distributionMall',
		icon:'icon-fenxiao',
		text:'分销商城',
	},
];

const Goods = ({ match }) => (
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

Goods.propTypes = {
	match: PropTypes.object.isRequired
}

export default Goods
