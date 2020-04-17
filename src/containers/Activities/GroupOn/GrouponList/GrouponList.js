import React, {Component} from 'react';
import {Button} from "antd";

class GrouponList extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    createNewGroupon = () => {
        this.props.history.push({pathname:`/activities/newGroupon`})
    };

    render() {
        return (
            <div className='grouponList'>
                <Button size='small' onClick={this.createNewGroupon}>创建拼团</Button>
            </div>
        );
    }
}

export default GrouponList;