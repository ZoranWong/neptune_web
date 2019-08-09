import React from "react";
import { Transfer, Table ,Modal} from 'antd';
import difference from 'lodash/difference';
import './css/shelfGoods.sass'
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
						.map(({ key }) => key);
					const diffKeys = selected
						? difference(treeSelectedKeys, listSelectedKeys)
						: difference(listSelectedKeys, treeSelectedKeys);
					onItemSelectAll(diffKeys, selected);
				},
				onSelect({ key }, selected) {
					onItemSelect(key, selected);
				},
				selectedRowKeys: listSelectedKeys,
			};
			
			if(direction === 'left'){
				return (
					<div>
						<Table
							rowSelection={rowSelection}
							columns={columns}
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
						<Table
							rowSelection={rowSelection}
							columns={columns}
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
					</div>
				);
			} else {
				return <Table
					rowSelection={rowSelection}
					columns={columns}
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

const originTargetKeys = mockData.filter(item => +item.key % 3 > 1).map(item => item.key);


const leftTableColumns = [
	{
		dataIndex: 'title',
		title: 'Name',
	}
];
const rightTableColumns = [
	{
		dataIndex: 'title',
		title: 'Name',
	},
];



export default class ShelfGoods extends React.Component {
	state = {
		targetKeys: originTargetKeys,
	};
	
	onChange = nextTargetKeys => {
		console.log(nextTargetKeys);
		this.setState({ targetKeys: nextTargetKeys });
	};
	
	handleCancel = () =>{
		this.props.onCancel()
	};
	
	handleSubmit = () =>{
		this.props.onSubmit(this.state.value)
	};
	
	handleTabs = () =>{
		const list = ['配送批次','保存方式','商品属性','商品分类'];
		return list.map((item,index)=>{
			return <span
				className="headerTabs"
				key={index}>
				{item}
			</span>
		})
	};
	
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
						dataSource={mockData}
						targetKeys={targetKeys}
						showSearch={true}
						onChange={this.onChange}
						locale={{'itemUnit': '项', 'itemsUnit': '项', 'notFoundContent': '列表为空', 'searchPlaceholder': '请输入商品名称'}}
						leftColumns={leftTableColumns}
						rightColumns={rightTableColumns}
						titles={[(this.handleTabs()),'已选商品']}
						filterOption={(inputValue, item) =>
							item.title.indexOf(inputValue) !== -1
						}
					/>
				</Modal>
			</div>
		);
	}
}