import React from 'react';
import SingleLineDisabled from './SingleLineDisabled'
import './index.sass'
import {Switch} from "antd";
import {getRandom} from "../../utils/dataStorage";
export default class SingleGroupDisabled extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			singleAry:[{key:'',value:'',operation:'', cid: getRandom()}],
			item:[]
		}
	};

	componentWillReceiveProps(nextProps, nextContext) {
		this.setState({item:nextProps.item})
	}

	render(){
		return (
			<div className="groupBox">
				{
					this.state.item.conditions&& this.state.item.conditions.length?(
						<div>
							<div className={this.state.item.conditions.length > 1? 'lines' :''}>
								{
									this.state.item.conditions.map((item, key)=>{
										return <SingleLineDisabled
											key={key}
											item = {item}
										/>
									})
								}
								<div className="switch">
									{
										this.state.item.conditions.length >1?<Switch
											disabled={true}
											checkedChildren="且"
											unCheckedChildren="或"
											checked={this.state.item.logic == 'and'}
										/>:''
									}
								</div>
							</div>

							<div className="addNew1">
								<i className="iconfont">&#xe822;</i>
								<span>新加一个条件</span>
							</div>
						</div>
					):''
				}

				
			</div>
		)
	}
}