import React from 'react';
import {Route,Link,NavLink,Switch,Redirect,withRouter} from 'react-router-dom';

import PropTypes from 'prop-types';

import Home from './pages/Home';
import List from './pages/List';
import Mine from './pages/Mine';
import Goods from './pages/Goods';
import Cart from './pages/Cart';
import Login from './pages/Login';

// 引入ant-design
import { Menu, Icon,Badge  } from 'antd';
import './sass/page.scss';

import {ReactReduxContext,connect} from 'react-redux';

/*
    <Route/>组件的职责：根据浏览器url匹配Route的path属性，渲染相应的componet
    编程式导航
*/

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            menu:[
                {
                    text:'首页',
                    path:'/home',
                    name:'Home',
                    icon:'home'
                },{
                    text:'列表',
                    path:'/list',
                    name:'List',
                    icon:'bars'
                },{
                    text:'购物车',
                    path:'/cart',
                    name:'Cart',
                    icon:'shopping-cart'
                },{
                    text:'我的',
                    path:'/mine',
                    name:'Mine',
                    icon:'user'
                },
            ],
            current:'/home'

        }

        // this绑定
        this.handleChange = this.handleChange.bind(this);
    }

    // 静态属性
    // static contextType = Context;
    // static contextType = ReactReduxContext;

    componentWillMount(){
        // 刷新保持高亮
        let hash = window.location.hash.slice(1);
        let currentTab = this.state.menu.filter(item=>hash.includes(item.path))[0];
        currentTab&&this.setState({
            current:currentTab.path
        });

    }

    handleChange({key}){
        this.setState({
            current:key
        });

        this.props.history.push(key)
    }
    render(){
        let {cartlist,menu,user} = this.props;
        return (
            <div className="container">
                <Menu
                mode={menu.mode}
                selectedKeys={[this.state.current]}
                onClick={this.handleChange}
                theme={menu.theme}
                style={{display:menu.show?'block':'none'}}
                >
                    {
                        this.state.menu.map(menu=>{
                            return (
                                <Menu.Item key={menu.path}>
                                    <Badge count={menu.name=='Cart'?cartlist.length:null}>
                                        <Icon type={menu.icon}/>{menu.text}
                                    </Badge>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                <main>
                    <Switch>
                        <Route path="/home" component={Home}/>
                        <Route path="/list" component={List}/>
                        <Route path="/mine" component={Mine}/>
                        <Route path="/goods" component={Goods}/>
                        {/* <Route path="/cart" render={()=>user.token?<Cart/>:<Redirect to="/login"/>}/> */}
                        <Route path="/cart" component={Cart}/>
                        <Route path="/login" component={Login}/>
                        <Redirect from="/" to="/home"/>
                    </Switch>
                </main>
            </div>
        )
    }
}


App = connect(state=>{
    return {
        user:state.common.user,
        menu:state.common.menu,
        cartlist:state.cart.goodslist,
    }
})(App);

// 利用withRouter高阶组件包装App组件
App = withRouter(App);

export default App;