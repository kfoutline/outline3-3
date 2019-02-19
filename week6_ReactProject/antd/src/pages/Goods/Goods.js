import React from 'react';


import {Spin,Icon,Layout,Row,Col,Button,Badge} from 'antd';
// import loading from '@/components/loading';

let Goods = ({goods,add:add2cart,changeQty,cartlist,history})=>{
  console.log('goods:',history);
  let {goods_info:info} = goods;

  const IconText = ({children,type}) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {children}
    </span>
  );


  const goPage = (path)=>{
    if(path&&path.preventDefault){
      history.goBack();
    }else if(typeof path === 'num'){
      history.go(path)
    }else{
      history.push(path);
    }
  }

  return  Object.keys(goods).length==0||goods.length==0 ? <Spin delay={500}/> : (
    <div className="goods">
      <header className="iconbar">
        <Button type="gohst" shape="circle" icon="left" onClick={goPage}></Button>
        <Button type="gohst" shape="circle" icon="star"></Button>
      </header>
      <div className="pic">
        <img src={goods.goods_image}/>
      </div>
      <h1>{goods.goods_info.goods_name}</h1>
      <div className="info">
        <p className="price"><del>{info.goods_marketprice}</del></p>
        <p className="price"><span>{info.goods_price}</span></p>
      </div>
      <div className="about">
        <IconText type="gift">{goods.goods_hair_info.if_store_cn}</IconText>
        <IconText type="car">({goods.goods_hair_info.area_name}){goods.goods_hair_info.content}</IconText>
      </div>
      <footer>
        <Row gutter={5}>
          <Col span={4}><Icon type="customer-service" />客服</Col>
          <Col span={4}>
            <Badge count={cartlist.length} onClick={goPage.bind(this,'/cart')}>
              <Icon type="shopping-cart"/>购物车
            </Badge>
          </Col>
          <Col span={8}><Button type="danger" block>立即购买</Button></Col>
          <Col span={8}><Button type="primary" block onClick={()=>{
            let goodsInfo = goods.goods_info;
            let id = goodsInfo.goods_id;

            //判断商品是否已经添加过到购物车
            // 已存在：qty++
            let currentGoods = cartlist.filter(item=>item.id===id)[0];
            if(currentGoods){
              changeQty(id,currentGoods.qty+1);
              return;
            }
            let goodsObj = {
              id,
              name:goodsInfo.goods_name,
              price:goodsInfo.goods_price,
              imgurl:goods.goods_image,
              qty:1
            } 
            add2cart(goodsObj)
          }}>加入购物车</Button></Col>
        </Row>
      </footer>
    </div>
  )
}

export default Goods;