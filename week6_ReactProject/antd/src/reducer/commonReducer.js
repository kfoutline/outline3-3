let initState = {
    user:{
        token:'',
        name:'',
    },
    menu:{
        show:true,
        theme:'dark',
        mode:'horizontal'
    }
}

import {USER_CONFIG,MENU_CONFIG} from '@/actions/commonAction';

const reducer = (state=initState,{type,payload})=>{
    switch(type){
        // 更新用户
        case USER_CONFIG:
            return {
                ...state,
                user:{
                    ...state.user,
                    ...payload
                }
            }
        // 更新菜单配置
        case MENU_CONFIG:
            return {
                ...state,
                menu:{
                    ...state.menu,
                    ...payload
                }
            }

        default:
            return state;
    }
}

export default reducer;