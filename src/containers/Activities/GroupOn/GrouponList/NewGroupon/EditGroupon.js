import React, {Component, Fragment} from 'react';
import {Button, Input, DatePicker, ConfigProvider, Radio, Select, message,Modal,Transfer, Switch, Table, Tag} from "antd";
import '../css/newGroupon.sass';
import zh_CN from "antd/lib/locale-provider/zh_CN";
import CustomUpload from "../../../../../components/Upload/Upload";
import Editor from "../../../../../components/Editor/Editor";
import {shelfableProducts} from "../../../../../api/activities/activities";
import _ from 'lodash';
import moment from 'moment';
import { editGroupon} from "../../../../../api/activities/groupon";
import {delivery, discount, giftInfo, groupLimit, orderDeadline, redPacketLevel} from "../utils/desc";
import difference from 'lodash/difference';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const TableTransfer = ({ leftColumns, rightColumns, ...restProps }) => (
    <Transfer {...restProps} showSelectAll={false}>
      {({
        direction,
        filteredItems,
        onItemSelectAll,
        onItemSelect,
        selectedKeys: listSelectedKeys,
        disabled: listDisabled,
      }) => {
        const columns = direction === 'left' ? leftColumns : rightColumns;
  
        const rowSelection = {
        //   getCheckboxProps: item => ({ disabled: listDisabled || item.disabled }),
          onSelectAll(selected, selectedRows) {
            console.log(selected, selectedRows,777);
            const treeSelectedKeys = selectedRows
              .filter(item => !item.disabled)
              .map(({ key }) => key);
            const diffKeys = selected
              ? difference(treeSelectedKeys, listSelectedKeys)
              : difference(listSelectedKeys, treeSelectedKeys);
            onItemSelectAll(diffKeys, selected);
          },
          onSelect({ key }, selected) {
              console.log(key, selected);
            onItemSelect(key, selected);
          },
              selectedRowKeys: listSelectedKeys,
        };
        return (
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredItems}
            size="small"
            style={{ pointerEvents: listDisabled ? 'none' : null }}
            // onRow={({ key }) => ({
            onRow={({ key, disabled: itemDisabled }) => ({
              onClick: () => {
                if (itemDisabled ) return;
                // onItemSelect(key, !listSelectedKeys.includes(key));
                onItemSelect(key);
              },
            })}
          />
        );
      }}
    </Transfer>
  );
class EditGroupon extends Component {
    constructor(props) {
        var leftTableColumns = [
            {
              dataIndex: 'title',
              title: '商品名称',
            },
            {
              dataIndex:'spec_value',
              title:'规格'
            },
            {
              dataIndex: 'retail_price',
              title: '零售价',
            },
            {
                dataIndex: 'group_price',
                title: '促销价',
                render:(text,record, index) =><Input
                  value={this.state.group_products[index]['group_price']}
                  onChange={(e)=>this.onTableInputChange(e, index,'group_price',record)}
                  style={{'width':'50px','height':'28px'}}
                ></Input>
            },
            {
                dataIndex: 'everybody_limit_num',
                title: '限购数量',
                render:(text,record, index) =><Input
                value={this.state.group_products[index]['everybody_limit_num']}
                onChange={(e)=>this.onTableInputChange(e, index,'everybody_limit_num',record)}
                  style={{'width':'50px','height':'28px'}}
                ></Input>
            },
            // {
            //     dataIndex: 'group_stock',
            //     title: '参与优惠最大数量',
            //     render:(text,record, index) =><Input
            //     value={this.state.group_products[index]['group_stock']}
            //     onChange={(e)=>this.onTableInputChange(e, index,'group_stock',record)}
            //       style={{'width':'50px','height':'28px'}}
            //     ></Input>
            // },
          ];
          var rightTableColumns = [
            {
              dataIndex: 'title',
              title: '商品名称',
            },
            {
              dataIndex:'spec_value',
              title:'规格'
            }
          ];



        super(props);
        this.state = {
            transferData:[],
            rightTableColumns:rightTableColumns,
            leftTableColumns:leftTableColumns,
            targetKeys: [],
            showSearch: true,
            display_name: '',
            share_text: '',
            discount: '',
            products: [],
            gift_products: [],
            group_products: [],
            timeRange: [],
            visible: false,
        };
        this.image = React.createRef();
        this.editor = React.createRef();
    }

    componentDidMount() {
        let props = this.props.location.state;
        let group_products = [];
        if(props && props.data && props.data.id){
            _.map(props.data['group_products'], product => {
                // group_products.push(product.id)
                group_products.push({
                    entity_id: product.id,
                    group_price: product['group_price'],
                    title: product.name,
                    spec_value: product['spec_value'] ?  _.map(product['spec_value'], function (value, key) {
                        return value ? `${key}(${value})` : ''
                    }).join(';') : '无',
                    everybody_limit_num: product['everybody_limit_num'],
                    // group_stock: product['group_stock']
                });
            });
            let start = props.data['start_date'];
            let end = props.data['end_date'];
            let startMoment = moment(start,'YYYY-MM-DD HH:mm:ss');
            let endMoment = moment(end,'YYYY-MM-DD HH:mm:ss');
            let timeRange = [startMoment, endMoment];
            this.setState({...props.data, group_products: group_products, timeRange})
        }
        shelfableProducts({limit:100,page:1}, 13).then(r=>{
            console.log(group_products,'group_productsgroup_products')
                var transferData = [];
                let requstData=r.data;
                // _.each(group_products, (item) => {
                //     let idx = _.findIndex(requstData, (product) => {
                //         let result = product['product_entity_id'] === item['entity_id'];
                //         if(result) {
                //             item['retail_price'] = product['product_entity']['product_entity'];
                //         }
                //         return result;
                //     });
                    
                //     if(idx >  -1) {
                //         requstData.splice(idx, 1);
                //     }
                // });
                for (let i = 0; i < requstData.length; i++) {

                    let spec = '无';
                    if(requstData[i]['product_entity']['spec_value']) {
                        spec = _.map(requstData[i]['product_entity']['spec_value'], function (value, key) {
                            return value ? `${key}(${value})` : ''
                        }).join(';');
                    }
                    transferData.push({
                        key: requstData[i]['product_entity_id'],
                        title: requstData[i]['product_entity'].name,
                        spec_value: spec,
                        retail_price:requstData[i]['product_entity'].retail_price,
                    });
                }
                var originTargetKeys = _.map(group_products, (product) => {
                    return product['entity_id'];
                });
            this.setState({products: r.data, group_products: group_products,transferData:transferData, targetKeys:originTargetKeys})
        }).catch(_=>{})
    }

    selectionChange = (type, value) => {
        this.setState({[type]: value})
    };

    // 返回活动管理
    back = () => {
        this.props.history.go(-1)
    };

    // 是非框选择
    onRadioChange = (e, type) => {
        this.setState({[type]: e.target.value})
    };

    //输入框填写内容
    onInputChange = (e, type) => {
        if (e.target.value < 0) e.target.value = 0;
        let value = parseInt(e.target.value)  ? Number(e.target.value) : e.target.value;
        this.setState({[type]: value})
    };

    // 活动起始时间
    actDateChange = (date, dateString) => {
        this.setState({
            start_date: dateString[0],
            end_date: dateString[1],
            timeRange: date
        })
    };

    // 选择商品
    onProductChange = (e, type) => {
        this.setState({
            [type]: e
        })
    };
    onTableInputChange =(e, proudctIndex, column,record)=>{
        let products = this.state.group_products;
        products[proudctIndex][column] = e.target.value;
        console.log(products,'productsproducts')
        this.setState({
            group_products: products
        });
    }
    onChangeTarget = (nextTargetKeys, direction, moveKeys) => {
        let groupProducts =this.state.group_products;
        if(direction === 'right') {
            _.each(moveKeys, (id) => {
                groupProducts.push({
                    entity_id: id,
                    group_price:'',
                    everybody_limit_num:'',
                    // group_stock:''
                })
            });
        }else{
            _.each(moveKeys, (id) => {
                let index = _.findIndex(groupProducts, (product) => {
                    return product['entity_id'] = id
                });
                if(index >  -1) {
                    groupProducts.splice(index, 1);
                }
            });
        }
        this.setState({ targetKeys: nextTargetKeys });
      };
    showModal = () => {
        this.setState({
          visible: true,
        });
    };
    handleOk = e => {
        console.log(this.state.group_products);
        if(this.state.group_products.length >0){
            _.findIndex(this.state.group_products,(product)=>{
                if(!product['group_price']){
                    message.error('请填写促销价');
                    return
                }
                if(!product['everybody_limit_num']){
                    message.error('请填写限购数量');
                    return
                }
                console.log(product['everybody_limit_num'])
                // if(!product['group_stock']){
                //     message.error('请填写参与优惠的最大数量');
                //     return
                // }
                this.setState({
                    visible: false,
                });
            })
        }else{
            message.error('请选择商品');
            return
        }
       
    };
    
    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    // 日期选择
    onDatePicker = (dateString, type) => {
        this.setState({[type]: dateString})
    };

    // 时间选择
    onTimeChange = (time, type) => {
        this.setState({[type]: time})
    };
    // 时间范围选择
    onTimeRangeChange = (time, type) => {
        this.setState({[type]: time})
    };

    // 检验数据
    checkData = () => {
        let {state} = this;
        let image = this.image.current ? this.image.current.state.imgUrl || this.image.current.state.imageUrl : '';
        let detail = this.editor.current?this.editor.current.state.outputHTML : '';

        if (!state.display_name) {
            message.error('请填写展示名称');
            return
        }
        if (!state.start_date) {
            message.error('请选择拼团时间');
            return
        }
        if (!state.group_products.length) {
            message.error('请选择拼团参与商品');
            return
        }

        // 此处校验上传图片
        if (!image) {
            message.error('请上传分享图片');
            return
        }
        state.fixed_shared_picture = image;

        if (!state.share_text) {
            message.error('请填写分享文案');
            return
        }
        if (!detail) {
            message.error('请填写富文本详情页');
            return
        }
        state.detail = detail;

        this.submit(state)
    };

    submit = data => {
        editGroupon(data, this.props.location.state.data.id).then(r=>{
            message.success(r.message);
            this.back()
        }).catch(_=>{})
    };

    render() {
        const {state} = this;
        const { targetKeys,showSearch} = this.state;
        return (
            <div className='newGroupon'>
                 <Modal
                    width={1200}
                    title="选择商品"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                     <TableTransfer
                        dataSource={this.state.transferData}
                        targetKeys={targetKeys}
                        showSearch={showSearch}
                        onChange={this.onChangeTarget}
                        titles={['可选商品', '可选商品']}
                        leftColumns={this.state.rightTableColumns}
                        rightColumns={this.state.leftTableColumns}
                        />
                </Modal>



                <div className="header">
                    <Button size='small' onClick={this.checkData}>保存</Button>
                    <Button onClick={this.back} size='small' >返回上一页</Button>
                </div>
                <ul className='forms'>
                    <li>
                        <h4>拼团名称</h4>
                        <h5>{state.name}</h5>
                    </li>
                    <li>
                        <h4>展示名称（团购主题）1111</h4>
                        <Input value={this.state.display_name} onChange={(e)=>this.onInputChange(e, 'display_name')} />
                    </li>
                    <li>
                        <h4>拼团时间</h4>
                        <ConfigProvider locale={zh_CN}>
                            <RangePicker showTime value={this.state.timeRange} onChange={this.actDateChange} />
                        </ConfigProvider>
                    </li>
                    <li >
                        <h4 >参与商品</h4>
                        <Button className='ant-calendar-picker' value={this.state.group_products}  onClick={this.showModal}>选择商品</Button>
                    </li>
                    {/* <li>
                        <h4>参与商品</h4>
                        <Select
                            mode='multiple'
                            defaultActiveFirstOption={false}
                            value={this.state.group_products}
                            className='selectedBox'
                            onChange={(e)=>this.onProductChange(e, 'group_products')}
                            optionLabelProp="label"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }

                        >
                            {this.state.products.map(item => (
                                <Select.Option key={item['product_entity_id']} value={item['product_entity_id']} label={item['product_entity'].name} >
                                    {item['product_entity'].name}
                                </Select.Option>
                            ))}
                        </Select>
                    </li> */}
                    <li>
                        <h4>成团限制</h4>
                        <h5>{this.state['group_limit_desc']}</h5>
                    </li>
                    <li>
                        <h4>截单周期</h4>
                        <h5>{orderDeadline(this.state)}</h5>
                    </li>
                    {
                        this.state['consume_stock_args'] && <li>
                            <h4>开始消耗库存时间</h4>
                            <h5>截单前{this.state['consume_stock_args']['day_before_order_deadline']}天 {this.state['consume_stock_args'].time}</h5>
                        </li>
                    }
                    <li>
                        <h4>配送时间</h4>
                        <h5>{delivery(this.state)}</h5>
                    </li>
                    {/* <li>
                        <h4>折扣</h4>
                        <h5>{discount(this.state)}</h5>
                    </li> */}
                    <li>
                        <h4>成团红包</h4>
                        <h5>{redPacketLevel(this.state)}</h5>
                    </li>
                    <li>
                        <h4>是否有赠品</h4>
                        <h5>{giftInfo(this.state)}</h5>
                    </li>
                    <li>
                        <h4>可见范围</h4>
                        <h5>{this.state['visible_scope_desc']}</h5>
                    </li>
                    <li>
                        <h4>是否拼团记录生成图片</h4>
                        <h5>{this.state['auto_generate_shared_picture'] ? '是' : '否'}</h5>
                    </li>
                    <li>
                        <h4>固定分享图片</h4>
                        <CustomUpload status='edit' ref={this.image} defaultImg={this.state['fixed_shared_picture']} />
                    </li>
                    <li>
                        <h4>分享文案</h4>
                        <TextArea rows={4} value={this.state.share_text} onChange={(e)=>this.onInputChange(e, 'share_text')} />
                    </li>
                    {
                        this.state.detail && <li className='richText'>
                            <h4>拼团页富文本编辑</h4>
                            <Editor ref={this.editor} default={this.state.detail} />
                        </li>
                    }

                </ul>
            </div>
        );
    }
}

export default EditGroupon;