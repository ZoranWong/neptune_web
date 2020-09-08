import React from 'react';
import {Input, message} from "antd";
import './css/shopSetting.less';
import {getSocietyOrderSet,saveSocietyOrderSet} from "../../../api/order/society";
class ShopSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent:'',
        };
    }
    placeSearch = (e) => {
        let value=e.target.value;
        this.setState({searchContent:value},()=>this.saveOrderSetting())
    };
    componentDidMount() {
        this.orderSetting();
    };
    orderSetting = () =>{
        let param={'searchJson[type]':"SOCIETY_FOOD"}
        getSocietyOrderSet(param).then(r=>{
            let list=r.data;
            for (let i = 0; i <list.length ; i++) {
                let key=list[i].key;
                let value=list[i].value;
                if(value){
                    if(key=="SOCIETY_FOOD_SHOP_BASIC_CRANGE"){
                        this.setState({searchContent:value})
                    }
                }
            }
        })
    };
    saveOrderSetting = (key) =>{
        let param={
            type:"SOCIETY_FOOD",
            key:"SOCIETY_FOOD_SHOP_BASIC_CRANGE",
            value:this.state.searchContent
        }
        saveSocietyOrderSet(param).then(r=>{
            message.success(r.message);
        })
    };
    render() {
        return (
            <div className="shop-setting">
                <div className="shop-scope">
                    <label>社会餐门店辐射范围：</label>
                    <Input placeholder="辐射范围只能输入数字" addonAfter="公里" value={this.state.searchContent} onChange={(e)=>{this.placeSearch(e)}}/>
                </div>
            </div>
        );
    }
}

export default ShopSetting;
