import React, { Component } from 'react';
import axios from 'axios';

import Content from './Content';

class List extends Component {
    constructor(){
        super();
        this.state = {
            data:[],
            pageNo:1,
            pageQty:10,
            loading:false,
        }

        this.getData = this.getData.bind(this);
    }

    // 用于下级Content组件中的滚动加载事件
    handleInfiniteOnLoad = () => {console.log(666)
        let {pageNo} = this.state;

        this.setState({
            loading: true,
        });

        if (pageNo > 10) {
            // message.warning('Infinite List loaded all');
            this.setState({
                loading: false
            });
            return;
        }

        this.getData();

    }
    async getData(){
        let {data,pageNo,pageQty} = this.state;
        // https://www.nanshig.com/mobile/index.php?act=goods&op=goods_list&keyword=&page=10&curpage=1
        let res = await axios.get('https://www.nanshig.com/mobile/index.php', {
            params: {
                act: 'goods',
                op: 'goods_list',
                keyword: '',
                page: pageQty,
                curpage: pageNo
            }
        })

        res = res.data.datas.goods_list;

        console.log(res);
        this.setState({
            data:data.concat(res),
            loading: false,
            pageNo:pageNo+1
        })
    }
    componentWillMount() {
        this.getData()
    }
    render() {
        return <Content {...this.state} {...this.props} handleInfiniteOnLoad={this.handleInfiniteOnLoad} />
    }
}
export default List;