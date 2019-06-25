import React from 'react';
import { Cascader,Select } from 'antd';
import './index.sass'
const { Option } = Select;
export default class SingleLine extends React.Component{
	constructor(){
		super()
	};
	
	
	
	
	
	render(){
		const options = [
			{
				value: 'zhejiang',
				label: 'Zhejiang',
				children: [
					{
						value: 'hangzhou',
						label: 'Hangzhou',
						children: [
							{
								value: 'xihu',
								label: 'West Lake',
							},
						],
					},
				],
			},
			{
				value: 'jiangsu',
				label: 'Jiangsu',
				children: [
					{
						value: 'nanjing',
						label: 'Nanjing',
						children: [
							{
								value: 'zhonghuamen',
								label: 'Zhong Hua Men',
							},
						],
					},
				]
			}
		];
		return (
			<div className="singleBox">
				<Cascader
					defaultValue={['zhejiang', 'hangzhou', 'xihu']}
					options={options}
				/>
				<Select defaultValue="lucy" style={{ width: 120 }}>
					<Option value="jack">Jack</Option>
					<Option value="lucy">Lucy</Option>
					<Option value="disabled" disabled>
						Disabled
					</Option>
					<Option value="Yiminghe">yiminghe</Option>
				</Select>
				<Select defaultValue="male" style={{ width: 100 }}>
					<Option value="male">男</Option>
					<Option value="female">女</Option>
					<Option value="unknown">未知</Option>
				</Select>
				
			</div>
		)
	}
}