export const consumer_order_values = [
	{
		value:'money_attributes',
		label:'金额属性',
		children:[
			{
				label:'实付款',
				value:'settlement_total_fee',
				type:'numCompare'
			},
			{
				label:'应付款',
				value:'total_fee',
				type:'numCompare'
			},
			{
				label:'成本总额',
				value:'cost_amount',
				type:'numCompare'
			},
			{
				label:'优惠金额',
				value:'total_preferential_fee',
				type:'numCompare'
			},
			{
				label:'退款金额',
				value:'refund_fee',
				type:'numCompare'
			},
			{
				label:'付款方式',
				value:'payment_type',
				type:'equalCompare'
			}
		]
	},
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'订单号',
				value:'trade_no',
				type:'absoluteCompare'
			},
			{
				label:'用户昵称',
				value:'user_nickname',
				type:'emptyCompare'
			},
			{
				label:'用户手机号',
				value:'user_mobile',
				type:'emptyCompare'
			},
			{
				label:'支付流水号',
				value:'transaction_id',
				type:'absoluteCompare'
			}
		]
	},
	{
		value:'order_attribution',
		label:'订单属性',
		children:[
			{
				label:'订单状态',
				value:'state',
				type:'consumerOrder'
			},
			{
				label:'配送类型',
				value:'delivery_type',
				type:'deliveryType'
			},
			{
				label:'下单时间',
				value:'created_at',
				type:'timeCompare'
			},
			{
				label:'商品',
				value:'product_name',
				type:'equalCompare'
			},
			{
				label:'自提店铺名称',
				value:'shop_name',
				type:'equalCompare'
			},
			{
				label:'自提店铺编号',
				value:'shop_code',
				type:'equalCompare'
			},
			{
				label:'订单类型',
				value:'order_type',
				type:'consumerOrder'
			},
			{
				label:'收货地区',
				value:'region',
				type:'detailAddress'
			},
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
	'detailAddress': [
		{
			label:'等于',
			value:'like',
			type:'orderDetailAddress'
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
	'consumerOrder': [
		{
			label:'等于',
			value:'=',
			type:'consumerOrderEqual'
		},
		{
			label: '在以下所有中',
			value: 'all',
			type: 'consumerOrder'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'consumerOrder'
		},
		{
			label:'不等于以下任意',
			value:'not in',
			type:'consumerOrder'
		},
	],
	'deliveryType': [
		{
			label:'等于',
			value:'=',
			type:'deliveryTypeEqual'
		},
	],
	'merchantOrder': [
		{
			label:'等于',
			value:'in',
			type:'merchantOrder'
		},
		{
			label:'等于其中之一',
			value:'all',
			type:'merchantOrder'
		},
		{
			label:'不等于以下任意',
			value:'not in',
			type:'merchantOrder'
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
	'timeCompare':[
		{
			label:'等于',
			value:'=',
			type:'timestamp'
		},
		{
			label:'不等于',
			value:'<>',
			type:'timestamp'
		},
		{
			label:'晚于',
			value:'>',
			type:'timestamp'
		},
		{
			label:'晚于(含)',
			value:'>=',
			type:'timestamp'
		},
		{
			label:'早于',
			value:'<',
			type:'timestamp'
		},
		{
			label:'早于(含)',
			value:'<=',
			type:'timestamp'
		},
		{
			label:'区间',
			value:'between',
			type:'period'
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
}
