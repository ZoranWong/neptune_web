import React from 'react';
import {Button,Tabs} from "antd";
import SearchInput from "../../../components/SearchInput/SearchInput";
import './css/tagManage.sass'
import CreateNewGroup from './CreateNewGroup'
class TagManage extends React.Component{
	constructor(props) {
		super(props);
		this.state = {
			createNewVisible:false
		}
	}
	
	showCreateNew = () =>{
		this.setState({createNewVisible:true})
	};
	hideCreateNew = () =>{
		this.setState({createNewVisible:false})
	};
	
	
	searchDatas = () => {
	
	};
	
	
	render(){
		return (
			<div>
				
				<CreateNewGroup
					visible={this.state.createNewVisible}
					onClose={this.hideCreateNew}
				/>
				
				<div className="header">
					<SearchInput
						getDatas={this.searchDatas}
						text="请输入标签名称"
					/>
					<Button size="small" className="btn btnAdd fBtn" onClick={this.showCreateNew}>
						<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
						新建分组</Button>
					<Button size="small" className="btn btnAdd" >
						<i className="iconfont" style={{color:'#4F9863',fontSize:'12px',marginRight:'6px'}}>&#xe7e0;</i>
						新建标签
					</Button>
					
				</div>
			</div>
		)
	}
}
export default TagManage