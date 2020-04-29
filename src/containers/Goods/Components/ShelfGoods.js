import React from "react";
import {Transfer, Table, Modal, message,Switch} from 'antd';
import difference from 'lodash/difference';
import './css/shelfGoods.sass'
import {products} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
// Customize Table Transfer
const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
	<Transfer {...restProps} >
		{({
			  direction,
			  filteredItems,
			  onItemSelectAll,
			  onItemSelect,
			  selectedKeys: listSelectedKeys,
			  disabled: listDisabled,
			  locale,
			  titles,
				
		  }) => {
			const columns = direction === 'left' ? leftColumns : rightColumns;
			
			const showHeader = direction === 'left' ? true : false;
			
			const rowSelection = {
				onSelectAll(selected, selectedRows) {
					const treeSelectedKeys = selectedRows
						.filter(item => !item.disabled)
						.map((item) => item.product_id);
					const diffKeys = selected
						? difference(treeSelectedKeys, listSelectedKeys)
						: difference(listSelectedKeys, treeSelectedKeys);
					onItemSelectAll(diffKeys, selected);
				},
				onSelect(selectedRowKeys, selected) {
					onItemSelect(selectedRowKeys.product_id, selected);
				},
				selectedRowKeys: listSelectedKeys,
			};
			if(direction === 'left'){
				return (
					<div>
						<Table
							rowSelection={rowSelection}
							rowKey={record => record.product_id}
							columns={columns}
							showHeader={showHeader}
							dataSource={filteredItems}
							size="small"
							pagination={false}
							onRow={({ key, disabled: itemDisabled }) => ({
								onClick: () => {
									onItemSelect(key, !listSelectedKeys.includes(key));
								},
							})}
						/>
					</div>
				);
			} else {
				return <Table
					rowSelection={rowSelection}
					columns={columns}
					rowKey={record => record.product_id}
					showHeader={showHeader}
					dataSource={filteredItems}
					size="small"
					pagination={false}
					style={{ pointerEvents: listDisabled ? 'none' : null }}
					onRow={({ key, disabled: itemDisabled }) => ({
						onClick: () => {
							if (itemDisabled || listDisabled) return;
							onItemSelect(key, !listSelectedKeys.includes(key));
						},
					})}
				/>
			}
			
			
		}}
	</Transfer>
);

const mockTags = ['cat', 'dog', 'bird'];

const mockData = [];
for (let i = 0; i < 20; i++) {
	mockData.push({
		key: i.toString(),
		title: `content${i + 1}`
	});
}
function onSwitchChange  (checked,record)  {
	record.checked = checked
}


const leftTableColumns = [
	{
		dataIndex: 'name',
		title: '商品名称',
	}
];
const rightTableColumns = [
	{
		dataIndex: 'name',
		title: 'Name',
	},
	{
		dataIndex: '操作',
		title: '操作',
		render : (text,record) => (
			<span className='shelfSwitch'>是否可用: <Switch onChange={(checked)=>onSwitchChange(checked,record)} /></span>
		)
	}
];



export default class ShelfGoods extends React.Component {
	state = {
		targetKeys: [],
		data:[]
	};
	
	componentDidMount() {
		products({limit:100,page:1,searchJson:searchJson({status:true})}).then(r=>{
			this.setState({data:r.data})
		}).catch(_=>{});
	}
	
	onChange = nextTargetKeys => {
		this.setState({ targetKeys: nextTargetKeys });
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		if(!this.state.targetKeys.length){
			message.error('请选择上架商品');
			return;
		}
		this.props.onSubmit(this.state.targetKeys)
	};
	
	// handleTabs = () =>{
	// 	const list = ['配送批次','保存方式','商品属性','商品分类'];
	// 	return list.map((item,index)=>{
	// 		return <span
	// 			className="headerTabs"
	// 			key={index}>
	// 			{item}
	// 		</span>
	// 	})
	// };
	
	render() {
		const { targetKeys } = this.state;
		
		return (
			<div className="shelfGoods">
				<Modal
					title="上架商品"
					width={1000}
					visible={this.props.visible}
					onCancel={this.handleCancel}
					maskClosable={false}
					okText="确定"
					cancelText="取消"
					onOk={this.handleSubmit}
				>
					<TableTransfer
						dataSource={this.state.data}
						targetKeys={targetKeys}
						showSearch={true}
						rowKey={record => record.product_id}
						onChange={this.onChange}
						locale={{'itemUnit': '项', 'itemsUnit': '项', 'notFoundContent': '列表为空', 'searchPlaceholder': '请输入商品名称'}}
						leftColumns={leftTableColumns}
						rightColumns={rightTableColumns}
						//titles={[(this.handleTabs()),'已选商品']}
						titles={['可选商品', '已选商品']}
						filterOption={(inputValue, item) =>(
							item.name.indexOf(inputValue) !== -1
						)}
					/>
				</Modal>
			</div>
		);
	}
}
