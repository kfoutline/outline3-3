// 设置常量并导出
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CHANGE_QTY = 'CHANGE_QTY';
export const CLEAR_CART = 'CLEAR_CART';
export const SUB_PRICE = 'SUB_PRICE';

export const add = (goods)=>({
    type:ADD_TO_CART,
    payload:goods
});

export const remove = (id)=>({
    type:REMOVE_FROM_CART,
    payload:{id}
});

export const changeQty = (id,qty)=>({
    type:CHANGE_QTY,
    payload:{id,qty}
});

export const clear = ()=>({
    type:CLEAR_CART
});

export const subPrice = ()=>({
    type:SUB_PRICE
});

export const changeQtyAsync = (id,qty)=>{console.log(123)
    return dispatch=>{
        setTimeout(()=>{
            dispatch({
                type:CHANGE_QTY,
                payload:{id,qty}
            })
        },1000);
    }
}


export default {add,remove,changeQty,clear,subPrice}