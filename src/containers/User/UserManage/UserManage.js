import React from 'react';
import {withRouter} from 'react-router-dom'
import CustomPagination from '../../../components/Layout/Pagination'
import { admins} from "../../../api/setting";
import SearchInput from '../../../components/SearchInput/SearchInput'
import {Button,Table} from "antd";
import './css/index.sass'
import CustomItem from './CustomItems'
import AdvancedFilter from '../../../components/AdvancedFilter/AdvancedFilter'
class UserManage extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			filterVisible:false,
			customVisible:false
		}
	}
	
	componentDidMount() {
		document.addEventListener('click', this.closeCustom);
	}
		
		
		// 占位符 用于跳转至用户详情
	jump = () =>{
		this.props.history.replace("/user/UserDetails")
	};
	
	// 头部搜索框
	search = () =>{
	};
	
	//高级筛选
	higherFilter = () =>{
		this.setState({filterVisible:true})
	};
	closeHigherFilter = () =>{
		this.setState({filterVisible:false})
	};
	
	//自定义显示项
	showCustom = (e) =>{
		e.nativeEvent.stopImmediatePropagation();
		this.setState({customVisible:true})
	};
	closeCustom = () =>{
		this.setState({customVisible:false})
	};
	
	render(){
		return (
			<div>
				<AdvancedFilter
					visible={this.state.filterVisible}
					onCancel={this.closeHigherFilter}
				/>
				<div className="userHeader">
					<div className="headerLeft">
						<SearchInput
							getDatas={this.search()}
							text='请输入昵称或手机号码'
						/>
						<h4 className="higherFilter" onClick={this.higherFilter}>高级筛选</h4>
						<Button size="small" disabled={true}>发消息</Button>
						<Button size="small" disabled={true}>加群组</Button>
						<Button size="small" disabled={true}>加标签</Button>
						<Button size="small" disabled={true}>赠送</Button>
						<Button size="small" disabled={true}>导出</Button>
					</div>
					<Button type="primary" size="small" onClick={this.showCustom}>自定义显示项</Button>
					
				</div>
				
				<div style={{'display':this.state.customVisible?'block':'none'}} className="custom"  onClick={this.showCustom}>
					<CustomItem  />
				</div>
				
				
				<CustomPagination
					api={admins}
					params={{}}
					refresh={false}
				/>
			</div>
		)
	}
}
export default withRouter(UserManage)