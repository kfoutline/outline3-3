import React from 'react';
import { withRouter } from 'react-router-dom';
import { List, Button, Icon,Spin } from 'antd';

// 滚动加载组件
import InfiniteScroll from 'react-infinite-scroller';

let Content = (props) => {
    let { data, history,handleInfiniteOnLoad,loading} = props;console.log(props)
    return <div className="page-list">
        <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={handleInfiniteOnLoad}
            hasMore={!loading}
            useWindow={false}
        >
            <List
                dataSource={data}
                renderItem={goods => (
                    <List.Item
                        onClick={() => { history.push({ pathname: '/goods', search: '?id=' + goods.goods_id }) }}
                        actions={[<Icon type="right" />]}
                    >
                        <List.Item.Meta
                            avatar={<img src={goods.goods_image_url} style={{ width: '100px', height: '100px' }} />}
                            title={<a>{goods.goods_name}</a>}
                            description={
                                <div>
                                    <Button size="small" type="dashed">{goods.store_name}</Button>
                                    <p className="price"><del>{goods.goods_marketprice}</del><span>{goods.goods_price}</span></p>
                                </div>
                            }
                        />
                        {loading && (
                                <Spin />
                        )}
                    </List.Item>
                )}
            />
        </InfiniteScroll>
    </div>
}
export default withRouter(Content);