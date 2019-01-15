import React,{Component} from 'react';

let About = ()=>{
    return <div>关于我们</div>;
}

let Home = ()=>{
    return <div>首页</div>;
}

class UserRouter extends Component{
    constructor(){
        super();
        this.state = {
            route:'/home'
        }
    }

    componentDidMount(){
        window.addEventListener('hashchange',()=>{
            this.setState({
                route:window.location.hash.slice(1)
            })
        })
    }
    render(){
        let Child;
        switch(this.state.route){
            case '/about': 
                Child = About;
                break;
            case '/home': 
                Child = Home;
                break;
        }
        return (
            <div className="myrouter">
                <ul>
                    <li><a href="#/home">首页</a></li>
                    <li><a href="#/about">关于</a></li>
                </ul>
                <Child/>
            </div>
        )
    }
}

export default UserRouter;