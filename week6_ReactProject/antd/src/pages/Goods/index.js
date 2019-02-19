/**
 * 容器组件（类组件）：
 * 处理业务逻辑
 */

import React,{Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import cartAction from '@/actions/cartAction';
import commonAction from '@/actions/commonAction';

import axios from '@/utils/axios';

import Goods from './Goods';

class GoodsContainer extends Component{
    constructor(){
        super();
        this.state = {
            goods:{}
        }
    }
    componentDidMount(){console.log(this);
        let {location} = this.props;
        let search = location.search.slice(1);
        search = search.split('&');
        let params = {}
        search.forEach(item=>{
            let kv = item.split('=');
            params[kv[0]] = kv[1];
        });

        

        this.getData(params.id);

    }
    componentWillUnmount(){
        // 退出重新显示
        this.props.menuConfig({show:true});
    }


    async getData(goods_id){
        // https://www.nanshig.com/mobile/index.php?act=goods&op=goods_detail&goods_id=226857&key=
        let res = await axios.get('',{
            params:{
                act:'goods',
                op:'goods_detail',
                goods_id
            }
        });

        let goods = res.data.datas

        // console.log('goods:',goods);

        this.setState({
            goods
        })

        
        // 进入商品详情页隐藏菜单
        this.props.menuConfig({show:false});

    }
    render(){
        return <Goods {...this.state} {...this.props}/>
    }
}

const mapStateToProps = state=>({
    cartlist:state.cart.goodslist
  });
  
// const mapDispatchToProps = dispatch=>({
//     add2cart(goods){
//       dispatch(cartAction.add(goods))
//     },
//     changeQty(id,qty){
//       dispatch(cartAction.changeQty(id,qty))
//     },
//     showMenu(show){
//         dispatch(commonAction.menuConfig({show}))
//     }
// });

const mapDispatchToProps = dispatch=>({...bindActionCreators(cartAction,dispatch),...bindActionCreators(commonAction,dispatch)});
  
  
GoodsContainer = connect(mapStateToProps,mapDispatchToProps)(GoodsContainer);
export default GoodsContainer;