/**
 * 高阶组件
 * 功能：用户需要登录才能访问的页面
 */

 import React,{Component} from 'react';
 import {connect} from 'react-redux';

 import axios from 'axios';
 import {userConfig} from '@/actions/commonAction'

 const withLogin = MyComponent=>{
     class Container extends Component{
        async componentWillMount(){
            let {token,history,dispatch} = this.props;

            if(!token){
                // 如redux中无token，则从本地存储中获取
                token = localStorage.getItem('token');
                dispatch(userConfig({token}));
            }

            // 如本地存储中无token,则直接跳转登录页面
            if(!token){
                history.push('/login');
                return;
            }

            // 发起ajax请求验证token是否过期
            let res;
            try{

                res = await axios.get('http://localhost:4008/verifytoken',{
                    headers:{
                        token
                    }
                });

                res = res.data;
            
                if(res.code === 302){
                    // 无token则调到登录页面
                    history.push('/login');
                }
            }catch(err){
                // 如服务器无法连接，则直接跳转登录页面
                history.push('/login');
            }
            
        }
        // shouldComponentUpdate(){
        //     return !!this.props.token;
        // }
        render(){
            return <MyComponent {...this.props}/>
        }
    }

    // 利用connect高阶组件映射token到props
    return connect(state=>({
        token:state.common.user.token
    }))(Container);
 }

 export default withLogin;