/**
 * 容器组件（类组件）：
 * 处理业务逻辑
 */

import React,{Component} from 'react';
import axios from '@/utils/axios';

import Home from './Home';

class HomeContainer extends Component{
    constructor(){
        super();
        this.state = {
            recommend:[],
            goodslist:[]
        }
    }
    componentWillMount(){
        this.getData();
    }
    async getData(){
        let res = await axios.get('',{
            params:{
                act:'index'
            }
        });
        let data = res.data.datas;

        console.log('data:',data);

        this.setState({
            goodslist:data.slice(1),
            recommend:data[0].adv_list.item
        })
    }
    render(){
        return <Home {...this.state}/>
    }
}
export default HomeContainer;