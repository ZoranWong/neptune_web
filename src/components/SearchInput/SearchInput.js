import React from 'react'
import {trim} from "../../utils/dataStorage";
import {admins} from "../../api/setting";
import './searchInput.sass'
import {Input} from "antd";
const Search = Input.Search;
export default class SearchInput extends React.Component{
	constructor(props) {
		super(props);
		
	}
	render() {
		return (
			<Search
				className="searchInput"
				placeholder="请输入员工姓名或手机号码"
				onSearch={value => {
					value = trim(value);
					this.props.getDatas(value)
				}}
				onFocus={(e)=>{
					let rightBtnF = e.target.nextSibling.childNodes[0];
					rightBtnF.setAttribute("style","background-color:#4f9863!important;color:#FFF!important;border-color: #58A86E!important;box-shadow: 0  0 3px rgba(88,168,110,0.5)!important")
				}}
				onBlur={(e)=>{
					let rightBtnF = e.target.nextSibling.childNodes[0];
					rightBtnF.setAttribute("style","background-color:#fff!important;color:#666!important;border-color: #D9D9D9!important;box-shadow: none!important")
				}}
				enterButton
			/>
		)
	}
	
}