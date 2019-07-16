export const user_values = [
	{
		value:'purchase_information',
		label:'购买信息',
		children:[
			{
				label:'上次购买时间',
				value:'last_purchased_at',
				type:'timeCompare'
			},
			{
				label:'上次购买距离今天的天数',
				value:'last_purchased_from_today',
				type:'numCompare'
				
			},
			{
				label:'第一次购买时间',
				value:'first_purchased_at',
				type:'timeCompare'
			},
			{
				label:'购买总额',
				value:'total_purchase_amount',
				type:'numCompare'
				
			},
			{
				label:'扫码付金额',
				value:'code_payment_amount',
				type:'numCompare'
			},
			{
				label:'预订单金额',
				value:'preorder_amount',
				type:'numCompare'
			},
			{
				label:'订单平均金额',
				value:'orders_average_fee',
				type:'numCompare'
			},
			{
				label:'扫码付平均金额',
				value:'code_payment_average_fee',
				type:'numCompare'
			},
			{
				label:'预订单平均金额',
				value:'preorder_average_fee',
				type:'numCompare'
			},
			{
				label:'购买次数',
				value:'purchased_count',
				type:'numCompare'
			},
			{
				label:'扫码付次数',
				value:'code_payment_count',
				type:'numCompare'
			},
			{
				label:'预订单次数',
				value:'preorder_count',
				type:'numCompare'
			},
		]
	},
	{
		value:'user_attributes',
		label:'用户属性',
		children:[
			{
				label:'标签',
				value:'tags',
				type:'contain'
			},
			{
				label:'群组',
				value:'groups',
				type:'group'
			},
			{
				label:'来源',
				value:'source',
				type:'equalCompare'
			},
		]
	},
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'姓名',
				value:'name',
				type:'emptyCompare'
			},
			{
				label:'手机号码',
				value:'mobile',
				type:'emptyCompare'
			},
			{
				label:'微信昵称',
				value:'wx_name',
				type:'emptyCompare'
			},
			{
				label:'openId',
				value:'open_id',
				type:'emptyCompare'
			},
			{
				label:'unionId',
				value:'union_id',
				type:'emptyCompare'
			},
			{
				label:'性别',
				value:'gender',
				type:'genderCompare'
			},
			{
				label:'省',
				value:'province',
				type:'cityCompare'
			},
			{
				label:'市',
				value:'city',
				type:'cityCompare'
			},
			{
				label:'区',
				value:'area',
				type:'cityCompare'
			},
			{
				label:'注册时间',
				value:'registered_at',
				type:'timeCompare'
			},
			{
				label:'会员等级',
				value:'membership_level',
				type:'equalCompare'
			},
			{
				label:'上线',
				value:'introducer',
				type:'emptyCompare'
			},
			{
				label:'成为此人下线的时间',
				value:'introduced_at',
				type:'timeCompare'
			},
			{
				label:'成为下线的时间',
				value:'first_introduced_at',
				type:'timeCompare'
			},
		]
	},
	{
		value:'account_information',
		label:'账户信息',
		children:[
			{
				label:'储值总额',
				value:'charge_amount',
				type:'numCompare'
			},
			{
				label:'储值次数',
				value:'charge_count',
				type:'numCompare'
			},
			{
				label:'赠送总额',
				value:'gift_amount',
				type:'numCompare'
			},
			{
				label:'账户余额',
				value:'account_balance',
				type:'numCompare'
			},
			{
				label:'总积分',
				value:'integral_amount',
				type:'numCompare'
			},
			{
				label:'当前积分',
				value:'current_integral',
				type:'numCompare'
			},
			{
				label:'已使用积分',
				value:'integral_used',
				type:'numCompare'
			},
			{
				label:'积分兑换次数',
				value:'integral_exchanged_count',
				type:'numCompare'
			},
			{
				label:'现有优惠券数',
				value:'current_coupon_count',
				type:'numCompare'
			},
			{
				label:'失效优惠券数',
				value:'invaild_coupon_count',
				type:'numCompare'
			},
			{
				label:'使用优惠券数',
				value:'used_coupon_count',
				type:'numCompare'
			}
		]
	},
];


export const operation = {
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
			value:'<',
			type:'timestamp'
		},
		{
			label:'晚于(含)',
			value:'<=',
			type:'timestamp'
		},
		{
			label:'早于',
			value:'>',
			type:'timestamp'
		},
		{
			label:'早于(含)',
			value:'>=',
			type:'timestamp'
		},
		{
			label:'区间',
			value:'between',
			type:'period'
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
	'genderCompare':[
		{
			label:'等于',
			value:'=',
			type:'selectedBoxGender'
		},
		{
			label:'不等于',
			value:'<>',
			type:'selectedBoxGender'
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
	'cityCompare':[
		{
			label:'等于',
			value:'=',
			type:'cityOneBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'cityBox'
		},
		{
			label:'不等于其中任意',
			value:'not in',
			type:'cityBox'
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