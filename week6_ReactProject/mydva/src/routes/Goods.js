import React from 'react';
import { connect } from 'dva';
import Goodslist from '../components/Goodslist';

const Goods = ({dispatch,products}) => {
    function handleDelete(id) {
        dispatch({
          type: 'goods/delete',
          payload: id,
        });
    }

    return (
        <div>
            <h2>Goods Details</h2>
            <Goodslist onDelete={handleDelete} products={products}/>
        </div>
    );
}

// export default connect(({ goods:products }) => ({
//     products,
//   }))(Goods);

export default connect(state =>{
    console.log('state:',state)
    return {
        products:state.goods
    }
})(Goods);