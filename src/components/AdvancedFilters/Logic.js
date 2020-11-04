import React from "react";
import {Switch} from 'antd';

export default class Logic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logic: null
        };
        this.child = React.createRef();
    }
    logicChange = () => {

    };
    render() {
        return this.props.showLogic ?  <div className="switch" >
            <Switch
                checkedChildren="且"
                unCheckedChildren="或"
                onChange={this.logicChange}
                defaultChecked/>
        </div> : '';
    }
}