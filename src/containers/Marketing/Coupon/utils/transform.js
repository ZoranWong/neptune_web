import _ from 'lodash'
export const types = [
	{
		cn: '主动领取',
		en: 'MANUAL_RECEIVE'
	},
	{
		cn: '直接发送',
		en: 'PLATFORM_SEND'
	},
	{
		cn: '积分商城',
		en: 'INTEGRAL_EXCHANGE'
	},
	{
		cn: '新人优惠券',
		en: 'NEW_USER'
	}
];
export function transform(en) {
	let cn;
	_.map(types, type=>{
		if (en === type.en) {
			cn = type.cn
		}
	});
	return cn;
}
