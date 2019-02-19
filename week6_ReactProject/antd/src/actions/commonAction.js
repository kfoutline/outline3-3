// 设置常量并导出
export const MENU_CONFIG = 'MENU_CONFIG';
export const USER_CONFIG = 'USER_CONFIG';

export const menuConfig = (config)=>({
    type:MENU_CONFIG,
    payload:config
});

export const userConfig = (config)=>({
    type:USER_CONFIG,
    payload:config
});

export default {
    menuConfig,
    userConfig
}