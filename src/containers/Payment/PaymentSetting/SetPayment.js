import React, { Component } from 'react';
import { Input, Table, Modal, Radio, message } from 'antd';
import PaymentSettingGroup from './PaymentSettingGroup'
import SearchInput from "../../../components/SearchInput/SearchInput"
import { searchJson } from "../../../utils/dataStorage"
import "../css/paymentsrt.sass"
import _ from 'lodash';
import { getBreakfastCart, wxPayment,zfbPayment } from "../../../api/shops/shopManage";
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
            //app_id: "",//商户号
           // merchant_type: "PERSONAL",
            // merchant_name: '',// 商户名称
            // subgroup_id: '',
            paginationParams: {
                // name:''
            },
            imgURL:'',
        }
    }
    // 微信配置按钮
    wxConfigure = (record) => {
        this.setState({ visible: true, record:record})//merchant_name: record.name, subgroup_id: record.id 
    }

    handleCancel = e => {
        this.setState({
            visible: false, app_id:''
        });
    };
    // 支付宝配置按钮
    zfbConfigure = (record) => {  
        let subgroup =record.id
        let img ='http://neptune.klsfood.cn/api/backend/ali/'+`${subgroup}`+'/auth_qr_code'
            this.setState({ zfbvisible: true ,imgURL: img})  
    }
    zfbhandleOk = e => {
        this.setState({zfbvisible: false,});
    };

    zfbhandleCancel = e => {;
        this.setState({ zfbvisible: false});

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
                         record.payment.map((item,index) =>{
                                if(item.type == '微信'){
                                    return item.merchant_name
                                }
                               
                            })
                        }
                    </div>
                )
            },
            {
                title: '商户号名称（支付宝）',
                render:((text, record) =>
                    <div>
                        
                        { 
                            record.payment.map((item,index) =>{
                                if(item.type == '支付宝'){
                                    return item.merchant_name
                                }
                            })
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
        const modelM ={

        }
        return (
            <div>
                {/* 微信配置 */}
                <PaymentSettingGroup 
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    refresh={this.refresh}
                    record={this.state.record}
                />
                {/* 支付宝配置 */}

                <Modal
                    title="支付宝配置"
                    visible={this.state.zfbvisible}
                    onOk={this.zfbhandleOk}
                    onCancel={this.zfbhandleCancel}
                >
                    <h3>请用商户支付扫码进行授权，授权通过后，服务商模式设置成功</h3>
                    <img style={{ margin: '0 60px' }} src={this.state.imgURL} />


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
