export const slugs = [
	'nav-index',
	'nav-user',
	'nav-shops',
	'nav-order',
	'nav-market',
	'nav-goods',
	'nav-data',
	'nav-finance',
	'nav-setting',
];

export const a = {
	"id": 29,
	"name": "智能群组4",
	"remark": "非常活跃的用户",
	"type": "智能群组",
	"created_at": "2019-07-04 11:50:26",
	"conditions": [
		{
			"logic": "and",
			"children": [
				{
					"logic": "and",
					"children": [],
					"conditions": [
						{
							"key": "name",
							"operation": "=",
							"value": "katerine"
						}
					]
				},
				{
					"logic": "and",
					"children": [
						{
							"logic": "and",
							"children": [],
							"conditions": [
								{
									"key": "city",
									"operation": "=",
									"value": "合肥"
								},
								{
									"key": "area",
									"operation": "like",
									"value": "\b蜀山区"
								}
							]
						}
					],
					"conditions": [
						{
							"key": "age",
							"operation": ">",
							"value": "12"
						}
					]
				},
				{
					"logic": "or",
					"children": [],
					"conditions": [
						{
							"key": "province",
							"operation": "=",
							"value": "安徽"
						}
					]
				}
			],
			"conditions": []
		}
	]
}
