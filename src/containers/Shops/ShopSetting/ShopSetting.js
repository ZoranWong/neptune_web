import React from 'react';
import {Input} from "antd";
import './css/shopSetting.less';
class ShopSetting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchContent:'',
        };
    }
    placeSearch = (value) => {
        console.log(value)
        this.setState({searchContent:value})
    };
    render() {
        return (
            <div className="shop-setting">
                <div className="shop-scope">
                    <label>社会餐门店辐射范围：</label>
                    <Input placeholder="辐射范围只能输入数字" addonAfter="公里" onBlur={(e)=>{this.placeSearch(e.target.value)}}/>
                </div>
            </div>
        );
    }
}

export default ShopSetting;
