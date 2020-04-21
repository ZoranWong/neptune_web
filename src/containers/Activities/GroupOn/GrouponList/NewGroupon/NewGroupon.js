import React, {Component} from 'react';
import {Button, Input, DatePicker, LocaleProvider} from "antd";
import {memberLimit} from "./fields";
import '../css/newGroupon.sass';
import SelectionComponent from "./SelectionComponent";
import zh_CN from "antd/lib/locale-provider/zh_CN";


const { RangePicker } = DatePicker;


class NewGroupon extends Component {



    // 返回活动管理
    back = () => {
        this.props.history.go(-1)
    };

    render() {
        return (
            <div className='newGroupon'>
                <div className="header">
                    <Button size='small'>保存</Button>
                    <Button onClick={this.back} size='small' >返回上一页</Button>
                </div>
                <ul className='forms'>
                    <li>
                        <h4>拼团名称</h4>
                        <Input />
                    </li>
                    <li>
                        <h4>拼团主题</h4>
                        <Input />
                    </li>
                    <li>
                        <h4>活动时间</h4>
                        <LocaleProvider locale={zh_CN}>
                            <RangePicker showTime />
                        </LocaleProvider>
                    </li>
                    <li>
                        <h4>参与商品</h4>
                        <Input />
                    </li>
                    <li>
                        <h4>成团限制</h4>
                        <SelectionComponent />
                    </li>
                    <li>
                        <h4>截单周期</h4>
                        <SelectionComponent />
                    </li>
                    <li>
                        <h4>配送周期</h4>
                        <SelectionComponent />
                    </li>
                    <li>
                        <h4>配送时间</h4>
                        <Input />
                    </li>
                    <li>
                        <h4>是否打折</h4>
                        <SelectionComponent />
                    </li>
                    <li>
                        <h4>是否有成团红包</h4>
                        <SelectionComponent />
                    </li>
                    <li>
                        <h4>是否有赠品</h4>
                        <SelectionComponent />
                    </li>
                    <li>
                        <h4>分享图片</h4>
                        <Input />
                    </li>
                    <li>
                        <h4>分享文案</h4>
                        <Input />
                    </li>
                    <li>
                        <h4>拼团页富文本编辑</h4>
                        <Input />
                    </li>
                </ul>
            </div>
        );
    }
}

export default NewGroupon;