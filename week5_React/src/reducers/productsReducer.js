// 初始化
const initialState = {
    goods:
      {
        name: 'bread 700g',
        qty: 2,
        price: 90
      }
  }

let produtsReducer = (state=initialState,action)=>{
    switch(action.type){
        case 'ADD_TO_CART':
            return {
                ...state,
                goods: {...action.payload}
            }
        default:
            return state;
    }
}

export default produtsReducer;