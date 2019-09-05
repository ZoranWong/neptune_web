import React, {Component} from 'react';
import {Button} from "antd";

class StoreRecord extends Component {
	render() {
		return (
			<div className="storeRecord">
				<div className="header">
					储值记录
					<Button size="small">返回上一页</Button>
				</div>
				
			</div>
		);
	}
}

export default StoreRecord;