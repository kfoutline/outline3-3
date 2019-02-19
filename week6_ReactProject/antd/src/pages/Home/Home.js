import React from 'react';
import {withRouter} from 'react-router-dom';
import {List,Carousel,Layout} from 'antd';

const {Header, Content, Footer, Sider} = Layout;

let Home = ({goodslist,recommend,history})=>{

    return <div className="home">
    
        <Carousel autoplay>
            {
                recommend.map((item,idx)=><img key={idx} src={item.image}/>)
            }
        </Carousel>
        <Content>
        {
            goodslist.map((item,idx)=>{
                return(
                    <List
                        key={idx}
                        grid={{
                        gutter: 16, xs: 2, sm: 3, md: 4, lg: 4, xl: 6, xxl: 6,
                        }}
                        header={<h4>{item.goods.title}</h4>}
                        dataSource={item.goods.item}
                        renderItem={item => (
                        <List.Item onClick={()=>{history.push({pathname:'/goods',search:'?id='+item.goods_id})}}>
                            <img src={item.goods_image} style={{width:'90%'}}/>
                            <h4>{item.goods_name}</h4>
                            <p className="price"><del>{item.goods_promotion_price}</del><span>{item.goods_price}</span></p>
                        </List.Item>
                        )}
                    />
                )
            })
        }
    </Content>
  </div>
}
export default withRouter(Home);