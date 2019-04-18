import React, { Component } from 'react';

import Home from './pages/Home';
import List from './pages/List';
import Goods from './pages/Goods';
import Cart from './pages/Cart';

import { Menu, Icon } from 'antd';
import "antd/dist/antd.css";

import { Route, Redirect, Switch, NavLink,withRouter } from 'react-router-dom';

class App extends Component {
    constructor() {
        super();
        this.state = {
            navs: [
                {
                    text: '首页',
                    name: 'Home',
                    path: '/home',
                    icon:'home'
                },
                {
                    text: '列表',
                    name: 'List',
                    path: '/list',
                    icon:'bars'
                },
                {
                    text: '详情',
                    name: 'Goods',
                    path: '/goods',
                    icon:'shopping'
                },
                {
                    text: '购物车',
                    name: 'Cart',
                    path: '/cart',
                    icon:'shopping-cart'
                }
            ],
            current:'Home'
        }

    }
    handleClick = (e)=>{
        console.log(this,e)
        this.setState({
            current: e.key
        },()=>{
            //路由跳转：编程式导航
            // 利用withRouter()高阶组件实现history的传递

            this.props.history.push('/'+e.key.toLowerCase());
        });


    }

    componentDidMount(){
        console.log(this);

        let current = this.state.navs.filter(item=>item.path==this.props.location.pathname)[0];
        console.log(current)

        this.setState({
            current: current.name
        })
    }

    render() {
        return (
            <div className="container">
                {/* <nav>
                    {
                        this.state.navs.map(item => <NavLink activeStyle={{ color: '#f00', fontWeight: 'bold' }} key={item.name} to={item.path}>{item.text}</NavLink>)
                    }
                </nav> */}
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                >
                    {
                        this.state.navs.map(item => <Menu.Item key={item.name}><Icon type={item.icon} />{item.text}</Menu.Item>)
                    }
                    
                </Menu>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/list" component={List} />
                    <Route path="/goods" component={Goods} />
                    <Route path="/cart" component={Cart} />
                    {/* <Route path="/" render={()=><div>我的首页</div>} exact/> */}
                    <Redirect from="/" to="/home" />{/* 404 */}
                </Switch>
            </div>
        )
    }
}

App = withRouter(App);

export default App;