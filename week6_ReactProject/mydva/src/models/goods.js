export default {
    namespace: 'goods',
    state: [{
      name:'laoxie',
      id:1
    },{
      name:'lemon',
      id:2
    }],
    reducers: {
      'delete'(state, { payload: id }) {
        return state.filter(item => item.id !== id);
      },
    },
  };