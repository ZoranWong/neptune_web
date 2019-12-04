import React from 'react';
import {Link, withRouter} from 'react-router-dom'
import './css/index.sass'
import SelectTime from "./Components/SelectTime";
import EChartsLeft from "./Components/EChartsLeft";
import EChartsRight from "./Components/EChartsRight";
import IconFont from "../../utils/IconFont";
import {home} from '../../api/home'
import moment from "moment";

class Home extends React.Component{
	state = {
		allData:[],
		cards: {
			order_count: 0,
			order_total_fee: 0,
			shop_count: 0,
			user_count: 0
		},
		channels: []
	};
	componentDidMount() {
		this.handleData(['1970-01-01 00:00:00', moment().format('YYYY-MM-DD HH:mm:ss')])
	}
	
	handleData = (date) => {
		home({
			start: date[0],
			end: date[1]
		}).then(r=>{
			this.setState({channels: r.data.channels,cards: r.data[0].cards})
		}).catch(_=>{})
	};
	
	
	render(){
		let selectTimeProps = {
			handleData: this.handleData
		};
		const {cards} = this.state;
		return (
			<div className="home_index">
				<div className="home_index_header">
					<SelectTime {...selectTimeProps} />
				</div>
				<ul className="home_index_statistics">
					<li>
						<div className="icon1">
							<IconFont type='icon-ziyuan' />
						</div>
						<div className="right">
							<h3  style={{color: '#4f9863'}}>{cards.shop_count || 0}</h3>
							<span  style={{color: '#4f9863'}}>店铺数</span>
						</div>
					</li>
					<li>
						<div className="icon2">
							<IconFont type='icon-kehuguanli'/>
						</div>
						<div className="right" >
							<h3 style={{color: '#F3B083'}}>{cards.user_count || 0}</h3>
							<span style={{color: '#F3B083'}}>客户数</span>
						</div>
					</li>
					<li>
						<div className="icon3">
							<IconFont type='icon-dingdan'/>
						</div>
						<div className="right"  >
							<h3 style={{color: '#5FBED6'}}>{cards.order_count || 0}</h3>
							<span style={{color: '#5FBED6'}}>订单数</span>
						</div>
					</li>
					<li>
						<div className="icon4">
							<IconFont type='icon-kehuguanli'/>
						</div>
						<div className="right"  >
							<h3 style={{color: '#F1BD55'}}>{cards.order_total_fee || 0}</h3>
							<span style={{color: '#F1BD55'}}>销售额</span>
						</div>
					</li>
				</ul>
				<div className="charts_container">
					<EChartsLeft/>
					<EChartsRight/>
				</div>
			</div>
		);
	}
}
export default withRouter(Home)
