import React, { Component } from 'react';
import { Input, Table, Modal, Radio, message } from 'antd';
import PaymentSettingGroup from './PaymentSettingGroup'
import SearchInput from "../../../components/SearchInput/SearchInput"
import { searchJson } from "../../../utils/dataStorage"
import "../css/paymentsrt.sass"
import _ from 'lodash';
import { getBreakfastCart, wxPayment } from "../../../api/shops/shopManage";
import CustomPagination from "../../../components/Layout/Pagination"
const { Search } = Input;

class SetPayment extends Component {
    constructor(props) {
        super(props)
        this.child = React.createRef();
        this.state = {
            paymentdata: [],
            api: getBreakfastCart,
            visible: false,
            zfbvisible: false,
            app_id: "",//商户号
            merchant_type: "PERSONAL",
            merchant_name: '',// 商户名称
            subgroup_id: '',
            paginationParams: {
                // name:''
            },
        }
    }
    // componentDidMount() {
    // 	this.refresh();
    // };
    // 微信配置按钮
    wxConfigure = (record) => {
        this.setState({ visible: true, record:record})//merchant_name: record.name, subgroup_id: record.id 
    }
    // handleOk = e => {
    //     let params = {
    //         merchant_name: this.state.merchant_name,
    //         merchant_type: this.state.merchant_type,
    //         app_id: this.state.app_id,
    //         subgroup_id: this.state.subgroup_id
    //     }
        // wxPayment(params).then(r => {
        //     message.success(r.message);
        //     this.setState({
        //         visible: false,
        //     });
        // }).catch(err => {
        //     message.error(err.message);
        // })
    //     console.log(params)

    // };

    handleCancel = e => {
        this.setState({
            visible: false, app_id:''
        });
    };
    // 支付宝配置按钮
    zfbConfigure = (record) => {
        // console.log(record, '支付宝配置按钮')
        this.setState({ zfbvisible: true ,merchant_name: record.name, subgroup_id: record.id })
    }
    zfbhandleOk = e => {
        console.log(e);
        this.setState({visible: false,});
    };

    zfbhandleCancel = e => {
        this.setState({ zfbvisible: false,app_id:''});
    };
    // 更新
    refresh = () => {
        this.child.current.pagination(this.child.current.state.current)
    };
    // 头部搜索框
    search = (value) => {
        debugger
        this.setState({
            api: getBreakfastCart,
            paginationParams: {
                ...this.state.paginationParams,
                searchJson: searchJson({ name: value })
            },
        }, () => {
                this.child.current.pagination(this.child.current.state.current)
            }
        );
        console.log(this.state.paginationParams)
    }
    // 分页器改变值
    paginationChange = (list) => {
        // console.log(list)
        this.setState({ paymentdata: list })
    };
    clearAll = () => {
        window.location.reload()
    }
    render() {
        const columns = [
            {
                title: '早餐车分组名称',
                dataIndex: 'name',
            },
            {
                title: '商户号简称（微信）',
                render:((text, record) =>
                    <div>
                        {
                           record.payment.length > 0 ? record.payment.map((item,index) =>{
                                if(item.type == '微信'){
                                    return <span>{item.merchant_name}</span>
                                }
                                else{
                                    return '无'
                                }
                               
                            }) : "无"
                        }
                    </div>
                )
            },
            {
                title: '商户号名称（支付宝）',
                render:((text, record) =>
                    <div>
                        
                        { 
                            record.payment.length > 0 ? record.payment.map((item,index) =>{
                                if(item.type == '支付宝'){
                                    return item.merchant_name
                                }
                                else{
                                    return <span>无</span>
                                }
                            }) : "无"
                        }
                    </div>)
            },
            {
                title: '状态',
                render: (text, record) =>
                    <div>
                        {
                            !record.is_wx_pay ? <span style={{ 'color': 'red' }}>微信未配置</span> : <span>微信已配置</span>
                        }
                    /
                    {
                            !record.is_ali_pay ? <span style={{ 'color': 'red' }}>支付宝未配置</span> : <span>支付宝已配置</span>
                        }
                    </div>
            },
            {
                title: '操作',
                render: (text, record) =>
                    <div>
                        <span
                            style={{ 'color': '#4F9863', 'cursor': 'pointer' }}
                            onClick={() => this.wxConfigure(record)}
                        >微信配置
                        </span>/
                        <span
                            style={{ 'color': '#4F9863', 'cursor': 'pointer' }}
                            onClick={() => this.zfbConfigure(record)}
                        >支付宝配置
                        </span>

                    </div>
            }, ,
        ]
        return (
            <div>
                {/* <Modal
                    title="微信配置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <div className='wxset'>
                        <span className="wx-left">早餐车名称：</span>
                        <span>{this.state.merchant_name}</span>
                    </div>
                    <div className='wxset'>
                        <span className="wx-left">选择商户号类型：</span>
                        <Radio.Group onChange={(e) => { this.setState({ merchant_type: e.target.value }) }} value={this.state.merchant_type}>
                            <Radio value="PERSONAL">个体商户</Radio>
                            <Radio value="COMPANY">企业</Radio>
                        </Radio.Group>
                    </div>
                    <div className='wxset'>
                        <span className="wx-left">商户号：</span>
                        <Input
                            value={this.state.app_id}
                            onChange={(e) => {
                                this.setState({ app_id: e.target.value })
                            }}
                        />

                    </div>
                </Modal> */}
                {/* 微信配置 */}
                <PaymentSettingGroup 
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    refresh={this.refresh}
                    record={this.state.record}
                />
                {/* 支付宝配置 */}

                <Modal
                    title="授权服务商模式"
                    visible={this.state.zfbvisible}
                    onOk={this.zfbhandleOk}
                    onCancel={this.zfbhandleCancel}
                >
                    <div className='wxset'>
                        <span className="wx-left">早餐车名称：</span>
                        <span>{this.state.merchant_name}</span>
                    </div>
                    <div className='wxset'>
                        <span className="wx-left">选择商户号类型：</span>
                        <Radio.Group onChange={(e) => { this.setState({ merchant_type: e.target.value }) }} value={this.state.merchant_type}>
                            <Radio value="PERSONAL">个体商户</Radio>
                            <Radio value="COMPANY">企业</Radio>
                        </Radio.Group>
                    </div>
                    <div className='wxset'>
                        <span className="wx-left">商户号：</span>
                        <Input
                            value={this.state.app_id}
                            onChange={(e) => {
                                this.setState({ app_id: e.target.value })
                            }}
                        />

                    </div>

                </Modal>
                <div className="payment-top">
                    <span className="payment-tille">支付设置</span>
                    <span>服务商模式下为商户配置支付</span>
                </div>
                <div style={{ margin: '10px' }}>
                    <SearchInput
                        getDatas={this.search}
                        text='请输入早餐分组名称'
                    />
                    <span onClick={this.clearAll} style={{ color: '#4F9863', cursor: 'pointer' }}>清空搜素条件</span>
                </div>

                <div>
                    <Table
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2) className = 'dark-row';
                            return className;
                        }}
                        dataSource={this.state.paymentdata}
                    />

                </div>
                <div className="pagination">
                    <CustomPagination
                        api={this.state.api}
                        ref={this.child}
                        params={this.state.paginationParams}
                        id={this.state.id}
                        valChange={this.paginationChange}
                    />
                </div>

            </div>
        )
    }
}
export default SetPayment;
