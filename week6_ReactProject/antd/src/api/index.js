import axios from 'axios';

export async function getGoods(goods_id){
    let res = await axios.get('https://www.nanshig.com/mobile/index.php',{
        params:{
            act:'goods',
            op:'goods_detail',
            goods_id
        }
    });

    return res.data.datas
}