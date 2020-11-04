import React, {Component} from 'react';
import {Input} from "antd";
import '../../css/redPacket.sass'
import _ from 'lodash'
class GroupRedPacketLevel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ary: [
                {full: '', send: '', id: 0}
            ]
        }
    }

    add = (index) => {
        let obj = {full: '', send: '', id: index + 1};
        this.setState({ary: [...this.state.ary, obj]})
    };

    delete = (item) => {
        let ary = this.state.ary;
        ary = ary.filter(i=> {
            return i.id !== item.id
        });
        console.log(ary);
        this.setState({ary})
    };

    change = (e, item, type) => {
        if (e.target.value < 0) e.target.value = 0;
        item[type] = e.target.value;
        let ary = this.state.ary;
        _.map(ary, i=>{
            if (i.id === item.id) {
                i = item
            }
        });
        this.setState({ary})
    };

    render() {
        return (
            <div className='redPacket'>
                <ul>
                    {
                        this.state.ary.map((item,index) => (
                            <li key={index}>
                                <div>满 <Input type='number' value={item.full} onChange={(e)=>this.change(e, item, 'full')} /> 送 <Input type='number' value={item.send} onChange={(e)=>this.change(e, item, 'send')} /></div>
                                {
                                    index === this.state.ary.length -1 && <span className='add' onClick={()=>this.add(index)}>添加</span>
                                }
                                {
                                    index > 0 &&  <span className='delete' onClick={()=>this.delete(item)}>删除</span>
                                }
                            </li>
                        ))
                    }
                </ul>
            </div>
        );
    }
}

export default GroupRedPacketLevel;