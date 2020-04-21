import React, {Component} from 'react';
import {Select} from "antd";

class SelectionComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: []
        }
    }


    handleChange = (selectedItems) => {
        //this.setState({selectedItems})
        this.props.selectionChange(this.props.type, selectedItems)
    };

    render() {
        const {selectedItems} = this.state;
        let strategy = this.props.strategy;
        return (
            <div className='selection'>
                <Select
                    defaultActiveFirstOption={false}
                    value={selectedItems}
                    className='selectedBox'
                    onChange={this.handleChange}
                    optionLabelProp="label"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {(strategy && strategy.length) && strategy.map(item => (
                        <Select.Option key={item.key} label={item.name} value={item.key}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </div>
        );
    }
}

export default SelectionComponent;