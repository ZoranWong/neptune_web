import React from "react";
import {Button, Input, DatePicker, LocaleProvider} from "antd";
import 'moment/locale/zh-cn';
import './css/inStockNew.sass'
import zh_CN from "antd/lib/locale-provider/zh_CN";
const { RangePicker } = DatePicker;

export default class InStockNew extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
		}
	}
	
	onDateChange = (date,dateString) =>{
		console.log(date, dateString);
		
	};
	
	render() {
		return (
			<div className="inStockNew">
				<div className="header">
					新建入库
					<Button size="small">返回上一页</Button>
				</div>
				<div className="body">
					<div className="filter">
						<ul className="left">
							<li>
								入库类型：
								<Input />
							</li>
							<li className="needMargin">
								入库时间：
								<LocaleProvider locale={zh_CN}>
									<RangePicker
										onChange={this.onDateChange}
									/>
								</LocaleProvider>
							
							</li>
							<li>
								备注：
								<Input />
							</li>
							<li>
								<Button
									size="small"
									type="primary"
								>选择入库商品</Button>
							</li>
						</ul>
						<div className="right">
							<Button size="small" type="primary" className="button">筛选</Button>
							<Button size="small">导出</Button>
							<span className="clear">清空筛选条件</span>
						</div>
					</div>
				</div>
			
			</div>
		)
	}
	
}