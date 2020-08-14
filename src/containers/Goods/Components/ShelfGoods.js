import React from "react";
import {Transfer, Table, Modal, message, Switch} from 'antd';

import difference from 'lodash/difference';
import './css/shelfGoods.sass'
import {products} from "../../../api/goods/goods";
import {searchJson} from "../../../utils/dataStorage";
import {throttle} from 'lodash';

import _ from "lodash";
// Customize Table Transfer
const TableTransfer = ({leftColumns, rightColumns, onScroll, ...restProps}) => (
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
            if (direction === 'left') {
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
                            onRow={({key, disabled: itemDisabled}) => ({
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
                    style={{pointerEvents: listDisabled ? 'none' : null}}
                    onRow={({key, disabled: itemDisabled}) => ({
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

function onSwitchChange(checked, record) {
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
        render: (text, record) => (
            <span className='shelfSwitch'>是否可用: <Switch onChange={(checked) => onSwitchChange(checked, record)}/></span>
        )
    }
];


export default class ShelfGoods extends React.Component {
    state = {
        targetKeys: [],
        data: [],
        totalPage: 1,
        currentPage: 0,
        dataSource: []
    };

    componentDidMount() {
        let loading = false;
        let timer = setInterval(async () => {
            if(loading){
                return ;
            }
            let {currentPage, totalPage} = this.state;
            if(currentPage === totalPage) {
                clearInterval(timer);
            }
            loading = true;
            console.log('------------ 000000 ------------', currentPage);
            if(await this.nextPage(currentPage, totalPage)){
                console.log('------------ 1111111 ------------', currentPage);
                loading = false;
            }
        }, 1500);
    }

    onChange = nextTargetKeys => {
        this.setState({targetKeys: nextTargetKeys});
    };

    handleCancel = () => {
        this.props.onCancel()
    };


    handleSubmit = () => {
        if (!this.state.targetKeys.length) {
            message.error('请选择上架商品');
            return;
        }
        let products = this.state.data;
        let targetKeys = this.state.targetKeys;
        let params = [];
        _.map(products, product => {
            _.map(targetKeys, key => {
                if (product['product_id'] === key) {
                    params.push({
                        product_id: key,
                        is_visible: product.checked || false
                    })
                }
            })
        });
        this.props.onSubmit(params)
    };
    handleScroll = (direction) => {
        console.log('------------ throttle scroll ------------', direction);
        return throttle(async (event) => {
            if (direction === 'left') {
                console.log('------------ throttle scroll ------------', event);
                let {currentPage, totalPage} = this.state;
                let result = await this.nextPage(currentPage, totalPage);
                if (result) {

                }
            }
        }, 1500)
    };
    onSearch = () => {
        return throttle(async (direction, search) => {
            if (direction === 'left') {
                console.log(search, '-------------- search throttle -------------');
            }
        }, 1500)
    };

    nextPage = async (currentPage, totalPage) => {
        if (currentPage < totalPage) {
            let nextPage = currentPage + 1;
            //加载下一页
            let response = await products({limit: 100, page: nextPage, searchJson: searchJson({status: true})});

            let dataSource = this.state.dataSource;
            let productList = response.data;
            let meta = response.meta;
            productList.forEach((product) => {
                if(dataSource.filter((p) => {
                    return p['product_id'] === product['product_id'];
                }).length === 0){
                    dataSource.push(product)
                }
            });
            totalPage = meta.pagination['total_pages'];
            return  await new Promise((resolve) => {
                this.setState({data: dataSource, currentPage: nextPage, totalPage: totalPage}, () => {
                    resolve(true);
                });
            })
        }
        return false;
    };

    render() {
        const {targetKeys, data} = this.state;

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
                        dataSource={data}
                        targetKeys={targetKeys}
                        showSearch={true}
                        rowKey={record => record.product_id}
                        onChange={this.onChange}
                        locale={{
                            'itemUnit': '项',
                            'itemsUnit': '项',
                            'notFoundContent': '列表为空',
                            'searchPlaceholder': '请输入商品名称'
                        }}
                        leftColumns={leftTableColumns}
                        rightColumns={rightTableColumns}
                        titles={['可选商品', '已选商品']}
                        filterOption={(inputValue, item) => (
                            item.name.indexOf(inputValue) !== -1
                        )}
                    />
                </Modal>
            </div>
        );
    }
}
