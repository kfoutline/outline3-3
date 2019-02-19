/**
 * 容器组件（类组件）：
 * 处理业务逻辑
 */

import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import cartAction,{changeQtyAsync} from '@/actions/cartAction';
import {List,Button,Icon,InputNumber} from 'antd';

import withLogin from '@/utils/withLogin';

// import Cart from './Cart';

class CartContainer extends Component{

    componentDidMount(){
        console.log(this.props)
        // this.props.subPrice();
    }

    render(){
        // return <Cart {...this.state}/>
        let {history,cartlist,remove,clear,changeQty,totalPrice} = this.props;console.log('render',this.props)
        return <div className="cart">
            <List
                footer={
                    <footer>
                        <Button type="danger" onClick={clear}>清空购物车</Button>
                        <div>
                            <span className="price totalPrie"><span>{totalPrice}</span></span>
                            <Button type="primary" onClick={clear}>结算</Button>
                        </div>
                    </footer>
                }
                dataSource={cartlist}
                renderItem={item => (
                <List.Item 
                actions={[<Icon type="close" onClick={remove.bind(this,item.id)} />]}
                >
                    <List.Item.Meta
                        avatar={<img src={item.imgurl} style={{width:'100px',height:'100px'}}/>}
                        title={<a onClick={()=>{history.push({pathname:'/goods',search:'?id='+item.id})}}>{item.name}</a>}
                        description={
                            <div>
                            <p className="price"><span>{item.price}</span> &times; {item.qty}</p>
                            <InputNumber min={1} max={5} defaultValue={item.qty} onChange={qty=>{console.log(666)
                                // changeQty(item.id,qty)
                                this.props.dispatch({type:'change_qty',payload:{id:item.id,qty}});
                            }} />
                            </div>
                        }
                        />
                </List.Item>
                )}

                
            />

        </div>
    }
}

CartContainer = withLogin(CartContainer);

const mapStateToProps = state=>{
    return ({
        cartlist:state.cart.goodslist,
        totalPrice:state.cart.goodslist.reduce((prev,goods)=>prev+goods.price*goods.qty,0).toFixed(2)
    });
}
  
//   const mapDispatchToProps = dispatch=>({
//     remove(id,e){
//       dispatch(cartAction.remove(id));
//       e.stopPropagation();
//     },
//     clear(){
//         dispatch(cartAction.clear())
//     },
//     subPrice(i){
//         dispatch(cartAction.subPrice())
//     },
//     changeQty(id,qty){
//     //   dispatch(cartAction.changeQty(id,qty))
//         changeQtyAsync(id,qty)
//     }
//   });

const mapDispatchToProps = dispatch=>bindActionCreators(cartAction,dispatch);

CartContainer = connect(mapStateToProps,mapDispatchToProps)(CartContainer);

export default CartContainer;