export const groupon_fields = [
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'开团时间',
				value:'created_time',
				type:'detailTimeCompare'
			},
			{
				label:'截单时间',
				value:'orderable_deadline',
				type:'detailTimeCompare'
			},
			{
				label:'配送日期',
				value:'delivery_date',
				type:'dataCompare'
			},
			{
				label:'开始消耗库存时间',
				value:'consume_stock_time',
				type:'detailTimeCompare'
			},
			{
				label:'拼团状态',
				value:'state',
				type:'grouponStatus'
			},
			{
				label:'商品',
				value:'group_orders_count_floor',
				type:'numCompare'
			},
			{
				label:'点击次数',
				value:'click_count',
				type:'numCompare'
			},
			{
				label:'下单数',
				value:'order_placed_count',
				type:'deliveryType'
			},
			{
				label:'下单人数',
				value:'orders_placed_users_count',
				type:'isTrue'
			},
			{
				label:'总金额',
				value:'orders_total_settlement_fee',
				type:'numCompare'
			},
			{
				label:'开团店铺',
				value:'initiator_id',
				type:'equalShopCompare'
			},
			{
				label:'自提店铺',
				value:'pickup_shop_id',
				type:'equalShopCompare'
			},
			{
				label: "销售贡献额度",
				value: 'sales_amount',
				type: 'numCompare'
			}
		]
	},
];


export const operation = {

	'absoluteCompare':[
		{
			label:'等于',
			value:'=',
			type:'input'
		}
	],
	'numCompare':[
		{
			label:'等于',
			value:'=',
			type:'input'
		},
		{
			label:'不等于',
			value:'<>',
			type:'input'
		},
		{
			label:'小于',
			value:'<',
			type:'input'
		},
		{
			label:'小于等于',
			value:'<=',
			type:'input'
		},
		{
			label:'大于',
			value:'>',
			type:'input'
		},
		{
			label:'大于等于',
			value:'>=',
			type:'input'
		},
		{
			label:'区间',
			value:'between',
			type:'inputRange'
		}
	],
	'contain':[
		{
			label:'包含以下任意',
			value:'in',
			type:'selectedTagBox'
		},
		{
			label:'包含以下所有',
			value:'all',
			type:'selectedTagBox'
		},
		{
			label:'不包含以下任意',
			value:'not in',
			type:'selectedTagBox'
		},
	],
	'isTrue': [
		{
			label: '是否',
			value: '=',
			type: 'boolean'
		}
	],
	'equalShopCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedOneGrouponBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedGrouponBox'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'selectedGrouponBox'
		},
	],
	'group':[
		{
			label:'在以下任意群组中',
			value:'in',
			type:'selectedGroupBox'
		},
		{
			label:'在以下所有群组中',
			value:'all',
			type:'selectedGroupBox'
		},
		{
			label:'不在以下任意群组中',
			value:'not in',
			type:'selectedGroupBox'
		},
	],
	'equalCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedOneBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedBox'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'selectedBox'
		},
	],
	'deadlineType':[
		{
			label:'等于',
			value:'=',
			type:'deadlineType'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'deadlineType'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'deadlineType'
		},
	],
	'deliveryType':[
		{
			label:'等于',
			value:'=',
			type:'deliveryTime'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'deliveryTime'
		},
		{
			label:'不等于其中之一',
			value:'not in',
			type:'deliveryTime'
		},
	],
	'grouponStatus':[
		{
			label:'等于',
			value:'=',
			type:'grouponListStatus'
		},
		// {
		// 	label:'等于其中之一',
		// 	value:'in',
		// 	type:'grouponListStatus'
		// },
		// {
		// 	label:'不等于其中之一',
		// 	value:'not in',
		// 	type:'grouponListStatus'
		// },
	],
	'detailTimeCompare': [
		{
			label: '等于',
			value:'=',
			type: 'detailTime'
		},
		{
			label:'不等于',
			value:'<>',
			type:'detailTime'
		},
		{
			label:'晚于',
			value:'>',
			type:'detailTime'
		},
		{
			label:'晚于(含)',
			value:'>=',
			type:'detailTime'
		},
		{
			label:'早于',
			value:'<',
			type:'detailTime'
		},
		{
			label:'早于(含)',
			value:'<=',
			type:'detailTime'
		},
		{
			label:'区间',
			value:'between',
			type:'periodDetailTime'
		}
	],
	'dataCompare':[
		{
			label:'等于',
			value:'=',
			type:'times'
		},
		{
			label:'不等于',
			value:'<>',
			type:'times'
		},
		{
			label:'晚于',
			value:'>',
			type:'times'
		},
		{
			label:'晚于(含)',
			value:'>=',
			type:'times'
		},
		{
			label:'早于',
			value:'<',
			type:'times'
		},
		{
			label:'早于(含)',
			value:'<=',
			type:'times'
		},
		{
			label:'区间',
			value:'between',
			type:'dateRange'
		}
	],
	'emptyCompare':[
		{
			label:'等于',
			value:'=',
			type:'input'
		},
		{
			label:'为空',
			value:'is null',
			type:''
		},
		{
			label:'不为空',
			value:'is not null',
			type:''
		},
	],
};