
const initialState = {
  showTabbar:true
}

export default function(state=initialState, action) {
  switch (action.type) {
    case 'CHANGE_BAR_STATUS':
      return {
        ...state,
        showTabbar: action.payload
      }
    default:
      return state;
  }
}