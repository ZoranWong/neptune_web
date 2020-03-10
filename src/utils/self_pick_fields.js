export const self_pick_fields = [
	{
		value:'money_attributes',
		label:'基本属性',
		children:[
			{
				label:'返现时间',
				value:'commission_at',
				type:'timeCompare'
			}
		]
	}
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
			type:'noTimePeriod'
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
