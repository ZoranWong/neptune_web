import React, {Component} from 'react';
import { Input,Table,Modal,Radio,message  } from 'antd';
import SearchInput from "../../../components/SearchInput/SearchInput"
import { AudioOutlined } from '@ant-design/icons';
import "../css/paymentsrt.sass"
import CustomPagination from "../../../components/Layout/Pagination"
const { Search } = Input;

class SetPayment extends Component{
    constructor(props){
        super(props)
        this.state={
            paymentdata:[
                {
                    name:'faf',
                    id:1
                },
                {
                    name:'是是是',
                    id:2
                },
            ],
            visible:false,
            zfbvisible:false,
            Merchantnumber:"",//商户号
            Radiovalue:"Individualmerchants",
            paginationParams:{
				logic_conditions:[],
				search:'',
			},
        }
    }
    // 微信配置按钮
    wxConfigure =(record)=>{
        console.log(record,'微信配置按钮')
        this.setState({visible:true})
    }
    wxonInputChange =(e)=>{
        console.log(e);
        // this.setState({Merchantnumber:e.targe.value})
    }
    onRadioChange = (e) => {
        console.log(e);
        this.setState({Radiovalue:e.target.value})
    }
    handleOk = e => {
        console.log(e);
        // message.error('请选择优惠券图片');
        this.setState({
          visible: false,
        });
    };

    handleCancel = e => {
    console.log(e);
    this.setState({
        visible: false,
    });
    };
    // 支付宝配置按钮
    zfbConfigure =(record)=>{
        console.log(record,'支付宝配置按钮')
        this.setState({zfbvisible:true})
    }
    // zfbhandleOk = e => {
    //     console.log(e);
    //     this.setState({visible: false,});
    // };
    
    zfbhandleCancel = e => {
        console.log(e);
        this.setState({zfbvisible: false,});
    };
    // 更新
    refresh = ()=>{
		this.setState({
			paginationParams:{
				logic_conditions:[],
				search:'',
			}
		},()=>{
			this.child.current.pagination(this.child.current.state.current)
		})
	};
    onSearch = (value)=>{
        console.log(value)
        // this.setState({
		// 	api:pickupCashback,
		// 	paginationParams:{...this.state.paginationParams,
		// 		searchJson:searchJson({search:value})}
		// },()=>{
		// 	this.child.current.pagination(this.child.current.state.current)
		// });
    }
    // 分页器改变值
	paginationChange = (list) =>{
        console.log(list)
		// this.setState({paymentdata:list})
    };
    // 清除条件
    clearAll =()=>{
        // console.log(11111111111)
        window.location.reload()
    }
    render(){
        const columns =[
            {
                title: '早餐车分组名称',
                dataIndex: 'name',
            },
            {
                title: '商户号简称（微信）',
                dataIndex: 'wxname',
            },
            {
                title: '商户号名称（支付宝）',
                dataIndex: 'zfname',
            },
            {
                title: '状态',
                dataIndex: 'status',
            },
            {
				title: '操作',
				render: (text,record) =>
					<div>
						<span
							style={{'color':'#4F9863','cursor':'pointer'}}
								onClick={()=>this.wxConfigure(record)}
							>微信配置
                        </span>/
                        <span
                                style={{'color':'#4F9863','cursor':'pointer'}}
                                onClick={()=>this.zfbConfigure(record)}
                            >支付宝配置
                        </span>
						
					</div>
			},,
        ]
        return(
            <div>
                <Modal
                    title="微信配置"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                        <div className='wxset'>
                            <span className="wx-left">早餐车名称：</span>
                            <span>四里河路五里拐东站牌</span>
                        </div>
                        <div className='wxset'>
                            <span className="wx-left">选择商户号类型：</span>
                            <Radio.Group onChange={(e)=>this.onRadioChange(e)} value={this.state.Radiovalue}>
                                <Radio value="Individualmerchants">个体商户</Radio>
                                <Radio value="enterprise">企业</Radio>
                            </Radio.Group>
                        </div>
                        <div className='wxset'>
                            <span className="wx-left">商户号：</span>
                            <Input  value={this.state.Merchantnumber} onChange={(e)=>this.wxonInputChange(e)} />
                            
                        </div>
                </Modal>

                {/* 支付宝配置 */}

                <Modal
                    title="授权服务商模式"
                    footer={null}
                    visible={this.state.zfbvisible}
                    // onOk={this.zfbhandleOk}
                    onCancel={this.zfbhandleCancel}
                    >
                        <div>请商户支付宝扫码进行授权，授权通过后，服务商模式设置成功</div>

                </Modal>
                <div className="payment-top">
                    <span className="payment-tille">支付设置</span>
                    <span>服务商模式下为商户配置支付</span>
                </div>
                <div style={{ margin: '10px' }}>
                    {/* <Search
                        placeholder="请输入早餐分组名称"
                        allowClear
                        onSearch={this.onSearch}
                        style={{ width: 200, margin: '0 10px' }}
                    /> */}
                    <SearchInput
								getDatas={this.onSearch}
								text='请输入早餐分组名称'
							/>
                    <span onClick={this.clearAll} style={{ color:'#4F9863',cursor:'pointer' }}>清空搜素条件</span>
                </div>

                <div>
                    <Table
                        columns={columns}
                        rowKey={record => record.id}
                        pagination={false}
                        rowClassName={(record, index) => {
                            let className = '';
                            if (index % 2 ) className = 'dark-row';
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