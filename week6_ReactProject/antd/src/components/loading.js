import React,{Component} from 'react';

import {Spin } from 'antd';

export default Com=>{
    return class extends Component{
        render(){
            return this.props.loading ? <Spin/> : <Com {...this.props}/>
        }
    }
}