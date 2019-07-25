import React from 'react';
import {Pagination,LocaleProvider} from "antd";
import zhCN from 'antd/lib/locale-provider/zh_CN';
import '../../style/pagination.sass'
class CustomPagination extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			total: 0,
			current:1,
		}
	}
	
	componentDidMount() {
		this.pagination(1)
	}

	
	pagination = (page) =>{
		if(!this.props.api) return;
		let params = this.props.params||{};
		params.limit = 10;
		params.page = page;
		if(this.props.id){
			this.props.api(params,this.props.id).then(r=>{
				this.props.valChange(r.data);
				this.setState({
					total:r.meta.pagination.total
				})
			})
		} else {
			this.props.api(params).then(r=>{
				this.props.valChange(r.data);
				this.setState({
					total:r.meta.pagination.total
				})
			})
		}
		
		
	};
	
	showTotal = (total,range) =>{
		return `共 ${total}个用户，第${range[0]}-${range[1]} 条数据`
	};
	
	onChange = page => {
		this.pagination(page);
		this.setState({
			current: page,
		});
	};
	
	
	
	render() {
		return (
			<div>
				<LocaleProvider locale={zhCN}>
					<Pagination
						total={this.state.total}
						showTotal={this.showTotal}
						showQuickJumper
						defaultCurrent={1}
						pageSize={10}
						onChange={this.onChange}
					/>
				</LocaleProvider>
			</div>
		)
	}
}
export default CustomPagination