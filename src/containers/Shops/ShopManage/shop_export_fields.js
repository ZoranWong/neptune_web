export const shop_export_values = [
	{
		value:'base_attributes',
		label:'基本属性',
		children:[
			{
				label:'店铺名称',
				value:'name',
				type:'timeCompare'
			},
			{
				label:'店铺编号',
				value:'code',
				type:'equal'
			},
			{
				label:'店铺主姓名',
				value:'keeper_name',
				type:'equal'
			},
			{
				label:'店铺主手机号',
				value:'keeper_mobile',
				type:'numCompare'
			},
			{
				label:'店铺地区',
				value:'region',
				type:'detailAddress'
			},
			{
				label:'店铺地址',
				value:'address',
				type:'detailAddress'
			},
			{
				label:'介绍人编号',
				value:'introducer_code',
				type:'equal'
			},
			{
				label:'介绍人姓名',
				value:'introducer_name',
				type:'equal'
			},
		]
	}
];


export const operation = {
	'detailAddress': [
		{
			label:'等于',
			value:'=',
			type:'detailAddress'
		}
	],
	'equal':[
		{
			label:'等于',
			value:'=',
			type:'input'
		},
	],
	'status': [
		{
			label:'等于',
			value:'=',
			type:'statusBox'
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
	'channel':[
		{
			label:'等于',
			value:'=',
			type:'selectedChannelOneBox'
		},
		{
			label:'等于其中之一',
			value:'in',
			type:'selectedChannelBox'
		},
		{
			label:'不等于以下任意',
			value:'not in',
			type:'selectedChannelBox'
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
			label:'不等于以下任意',
			value:'not in',
			type:'selectedBox'
		},
	],
	// 'emptyCompare':[
	// 	{
	// 		label:'等于',
	// 		value:'=',
	// 		type:'input'
	// 	},
	// 	{
	// 		label:'为空',
	// 		value:'is null',
	// 		type:''
	// 	},
	// 	{
	// 		label:'不为空',
	// 		value:'is not null',
	// 		type:''
	// 	},
	// ],
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
	],
};
