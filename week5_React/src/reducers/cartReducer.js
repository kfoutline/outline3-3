// 初始化
const initialState = {
    goodslist: [
      {
        name: 'bread 700g',
        qty: 2,
        price: 90
      },
      {
        name: 'milk 500ml',
        qty: 1,
        price: 47
      }
    ]
  }

let cartReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state,
                goodslist: [...state.goodslist, action.payload]
            }
          case 'DELETE_FROM_CART': {
            return {
              ...state,
              goodslist: state.goodslist.filter(item => item.name !== action.payload.name)
            }
          }
        default:
            return state;
    }
}

export default cartReducer;