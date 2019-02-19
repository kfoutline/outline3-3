import {ADD_TO_CART,REMOVE_FROM_CART,CLEAR_CART,CHANGE_QTY,SUB_PRICE} from '@/actions/cartAction';

let initState = {
    goodslist: [
        {
          id: '226857',
          name: '男士外套冬季2018新款韩版潮流短款加厚羽绒棉服帅气立领棉衣男装 灰色 XL',
          price: '158.00',
          imgurl: 'https://www.nanshig.com/data/upload/shop/store/goods/34/34_05962460773414914_360.jpg',
          qty: 5
        },
        {
          id: '226935',
          name: '冬季加厚羊羔绒毛短款外套男士修身帅气棉衣韩版休闲情侣棉袄潮装 灰色 L',
          price: '169.00',
          imgurl: 'https://www.nanshig.com/data/upload/shop/store/goods/39/39_05977667423494467_360.jpg',
          qty: 3
        },
        {
          id: '226977',
          name: '冬季羊羔毛加绒加厚外套男士棉服韩版帅气棉衣潮流短款情侣装棉袄 军绿色 L',
          price: '159.00',
          imgurl: 'https://www.nanshig.com/data/upload/shop/store/goods/39/39_05977679684046298_360.jpg',
          qty: 2
        }
      ],
    step:1,
}

const reducer = (state=initState,{type,payload})=>{console.log(111,type,payload)
    switch(type){
        // 添加到购物车：payload{商品信息}
        case ADD_TO_CART:
            return {
                ...state,
                goodslist:[...state.goodslist,payload]
            }
        // 删除购物车商品：payload{id}
        case REMOVE_FROM_CART:
            return {
                ...state,
                goodslist:state.goodslist.filter(goods=>goods.id!=payload.id)
            }
        // 清空购物车：无payload
        case CLEAR_CART:
            return {
                ...state,
                goodslist:[]
            }
        // 修改单个商品数量：payload{id,qty}
        case CHANGE_QTY:
            return {
                ...state,
                goodslist:state.goodslist.map(goods=>{
                    if(goods.id === payload.id){
                        goods.qty = payload.qty
                    }
                    return goods;
                })
            }
        // 计算总价：无payload
        case SUB_PRICE:
            return {
                ...state,
                totalPrice:state.goodslist.reduce((prev,goods)=>prev+goods.price*goods.qty,0).toFixed(2)
            }

        default:
            return state;
    }
}

export default reducer;