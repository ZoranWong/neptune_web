import React, {Component} from 'react';
import {message, Modal, Table} from "antd";
import CustomPagination from "../../../../components/Layout/Pagination";
import {exchangeCodes, stopCode} from "../../../../api/marketing/cards";
import {searchJson} from "../../../../utils/dataStorage";
import '../css/details.sass'
let logic_conditions = {
    conditions: [
        {
            key: 'consume_card_exchange_code_state',
            operation: '=',
            value: 0
        }
    ],
    logic: 'and'
};
class RechargeDetails extends Component {
    constructor() {
        super();

        this.state = {
            api: exchangeCodes,
            activeTab: 0,
            paginationParams:{
                logic_conditions:[],
                search:'',
                searchJson: searchJson({logic_conditions: logic_conditions})
            },
            current: 1,
            id: null,
            data: []
        };
        this.child = React.createRef()
    };

    componentDidMount() {
        this.setState({id: this.props.location.state.id})
    }

    refresh = (key)=>{
        let logic_conditions = {
            conditions: [
                {
                    key: 'consume_card_exchange_code_state',
                    operation: '=',
                    value: key
                }
            ],
            logic: 'and'
        };
        this.setState({
            filterVisible:false,
            paginationParams:{
                search:'',
                searchJson:searchJson({logic_conditions})
            }
        },()=>{
            this.child.current.pagination(this.child.current.state.current)
        })
    };

    // 停用
    stopExchange = (id) => {
        let refresh = this.refresh;
        let {activeTab} = this.state;
        let confirmModal = Modal.confirm({
            title: (
                <div className= 'u_confirm_header'>
                    提示
                    <i className="iconfont" style={{'cursor':'pointer'}} onClick={()=>{
                        confirmModal.destroy()
                    }}>&#xe82a;</i>
                </div>
            ),
            icon:null,
            width:'280px',
            closable:true,
            centered:true,
            content: (
                <div className="U_confirm">
                    确定停用该兑换码吗？
                </div>
            ),
            cancelText: '取消',
            okText:'确定',
            okButtonProps: {
                size:'small'
            },
            cancelButtonProps:{
                size:'small'
            },
            onOk() {
                // 确定按钮执行操作
                stopCode({},id).then(r=>{
                    message.success(r.message);
                    refresh(activeTab)
                })
            }
        });
    };

    // 分页器改变值
    paginationChange = (list) =>{
        this.setState({data:list})
    };

    // 切换tab
    onChangeTab = item =>{
        this.setState({activeTab:item.key});
        this.refresh(item.key)
    };



    render() {
        const columns = [
            {
                title: '兑换码',
                dataIndex: 'exchange_code',
            },
            {
                title: '兑换人昵称',
                dataIndex: 'user_nickname',
                render: (text, record) => (
                    <span>{text || '无'}</span>
                )
            },
            {
                title: '兑换人手机号',
                dataIndex: 'user_mobile',
                render: (text, record) => (
                    <span>{text || '无'}</span>
                )
            },
            {
                title: '兑换时间',
                dataIndex: 'exchange_time',
                render: (text, record) => (
                    <span>{text || '无'}</span>
                )
            },
            {
                title: '状态',
                dataIndex: 'state',
                render: (text, record) => {
                    switch (text) {
                        case 0:
                            return '未兑换';
                        case 1:
                            return '已兑换';
                        case 2:
                            return '已停用';
                        default:
                            return '已过期'
                    }
                }
            },
            {
                title: '操作',
                render: (text,record) =>
                    <div>
                        {
                            record.state === 0 && <span
                                style={{'color':'#4F9863','cursor':'pointer','marginRight' : '10px'}}
                                onClick={()=>this.stopExchange(record.id)}
                            >停用
						</span>
                        }
                    </div>
            },
        ];
        const tabs = [
            {name:'未兑换',key:0},
            {name:'已兑换',key:1},
            {name:'已停用',key:2},
            {name:'已过期',key:3}
        ];

        return (
            <div className='cardDetails'>
                <div className="tabs">
                    <ul className="left">
                        {
                            tabs.map((item,index)=>{
                                return <li
                                    key={index}
                                    className={this.state.activeTab == item.key?'active':''}
                                    onClick={()=>this.onChangeTab(item)}
                                >{item.name}</li>
                            })
                        }
                    </ul>
                </div>
                <div className="chart">
                    <Table
                        dataSource={this.state.data}
                        rowKey={record => record.id}
                        pagination={false}
                        columns={columns}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2 ) className = 'dark-row';
                            return className;
                        }}
                    >

                    </Table>
                </div>
                <div className="pagination">
                    <CustomPagination
                        api={this.state.api}
                        text="条充值码"
                        id={this.state.id}
                        ref={this.child}
                        params={this.state.paginationParams}
                        current={this.state.current}
                        valChange={this.paginationChange}
                    />
                </div>
            </div>
        );
    }
}

export default RechargeDetails;