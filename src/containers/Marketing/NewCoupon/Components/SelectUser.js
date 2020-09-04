import React, {Component} from 'react';
import {Select} from "antd";
import {users} from "../../../../api/user";
import {searchJson} from "../../../../utils/dataStorage";
import {debounce} from 'lodash';

class SelectUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItems: [],
            users: [],
            scrollPage: 1,
            userInputValue: null,
            spinState: false,
            total_page: 0
        }
    }

    componentDidMount() {
        users({limit: 10, page: 1}).then(r => {
            this.setState({users: r.data})
        })
    }


    handleChange = selectedItems => {
        selectedItems = selectedItems.filter(item => parseInt(item));
        this.setState({selectedItems})
    };

    userScroll = (e) => {
        const {scrollPage, total_page} = this.state;
        if(scrollPage < total_page){
            e.persist();
            const {target} = e;
            if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
                const nextScrollPage = scrollPage + 1;
                this.setState({scrollPage: nextScrollPage});
                this.getUserList(nextScrollPage); // 调用api方法
            }
        }
    };

    getUserList = (page) => {
        this.setState({spinState: true}, () => {
            let {userInputValue} = this.state;
            let json = userInputValue ? {
                logic: 'and',
                conditions: [{
                    logic: 'or',
                    conditions: [
                        {
                            key: 'user_mobile',
                            operation: 'like',
                            value: userInputValue
                        },
                        {
                            key: 'user_wx_name',
                            operation: 'like',
                            value: userInputValue
                        }
                    ]
                }]
            } : {};
            users({limit: 10, page: page, searchJson: searchJson({'logic_conditions': json})}).then(r => {
                this.setState({total_page: r.meta.pagination.total_pages})
                if (!r.data.length) {
                    this.setState({loading: false})
                    return;
                }
                this.setState({users: this.state.users.concat(r.data)}, () => {
                    this.setState({spinState: false})
                })
            }).catch(_ => {
                this.setState({spinState: false})
            })
        })
    };

    render() {
        const {selectedItems, users, spinState} = this.state;
        return (
            <Select
                defaultActiveFirstOption={false}
                placeholder='请选择用户'
                mode="tags"
                value={selectedItems}
                className='selectedBox tagBox'
                onChange={this.handleChange}
                onPopupScroll={this.userScroll}
                allowClear
                optionLabelProp="label"
                optionFilterProp="children"
                notFoundContent={spinState ? 'loading' : '暂无数据'}
                // filterOption={(input, option) =>
                //     option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
                // }
                filterOption={false}
                onSearch={debounce((value) => {
                    if (value !== this.state.userInputValue) {
                        this.setState({'users': [], userInputValue: value}, () => {
                            this.getUserList(0);
                        });
                    }
                }, 500)
                }
            >
                {
                    users.map((item, index) => {
                        return (
                            <Select.Option key={index} label={item.nickname + '(' + item.mobile + ')'}
                                           value={item.id + ''}>
                                {item.nickname + '(' + item.mobile + ')'}
                            </Select.Option>
                        )
                    })
                }
            </Select>
        );
    }
}

export default SelectUser;