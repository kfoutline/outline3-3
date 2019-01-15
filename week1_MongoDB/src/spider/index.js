const cheerio = require('cheerio');
const request = require('request');
const path = require('path');
const fs = require('fs');

const db = require('../db');

let headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36',
    'cookie': 'OZ_1U_2037=vid=v99db2c5c0b106.0&ctime=1503507140&ltime=0; _qzja=1.1573077346.1503507140575.1503507140575.1503507140575.1503507140575.1503507140575.0.0.0.1.1; WBIAOID=fee01e3d0da8c342b0de56e82347007f29bbf6e9%7Ef2031346363c8b8807ab7be46c2b09d7; NTKF_T2D_CLIENTID=guest8B459F5E-9418-A43B-AED3-100253872D6F; _ga=GA1.2.872240365.1503507142; wbiaoid=a7c6342f4472ca38ceea6657d15d093a; wbiaoid.sig=WhH73lC5ruR2937tiLkVqecFQ6ZJNv_KaKskfoCT9h0; showNum=0; Hm_lvt_d8e95c635d8135c55060c556fd69e039=1543476663,1543476690,1544693773; wTk=bAH2gblkQ69ZIvhrOP5e60p_; w_info=eyJlbnYiOiJwcm9kIn0=; _gid=GA1.2.1670264116.1544695613; Hm_lpvt_d8e95c635d8135c55060c556fd69e039=1544796153; Qs_lvt_93213=1543476662%2C1543476689%2C1544693773%2C1544747679%2C1544796153; Qs_pv_93213=708423598520817900%2C3068960244895955500%2C3149256393624072000%2C4555092907284111000%2C554180729456447200; nTalk_CACHE_DATA={uid:wx_1000_ISME9754_guest8B459F5E-9418-A4,tid:1544796153646275}; _gat=1; mediav=%7B%22eid%22%3A%22221303%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%22Kms%5D6smz4c%3AoZ2%3CmB%25)w%22%2C%22ctn%22%3A%22%22%7D',
    'upgrade-insecure-requests': 1,
    // 'pragma': 'no-cache',
    // 'referer': 'https://www.wbiao.cn/',
    // ':authority': 'www.wbiao.cn',
    // ':method': 'GET',
    // ':path': '/shoubiao.html?pc=9',
    // ':scheme': 'https',
}

let list_headers = {
    ...headers,
    cookie: 'mediav=%7B%22eid%22%3A%22221301%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%22Kms%5D6smz4c%3Ar3oTiQm35%22%2C%22ctn%22%3A%22%22%7D; OZ_1U_2037=vid=v99db2c5c0b106.0&ctime=1503507140&ltime=0; _qzja=1.1573077346.1503507140575.1503507140575.1503507140575.1503507140575.1503507140575.0.0.0.1.1; WBIAOID=fee01e3d0da8c342b0de56e82347007f29bbf6e9%7Ef2031346363c8b8807ab7be46c2b09d7; NTKF_T2D_CLIENTID=guest8B459F5E-9418-A43B-AED3-100253872D6F; _ga=GA1.2.872240365.1503507142; wbiaoid=a7c6342f4472ca38ceea6657d15d093a; wbiaoid.sig=WhH73lC5ruR2937tiLkVqecFQ6ZJNv_KaKskfoCT9h0; showNum=0; Qs_lvt_93213=1543476662%2C1543476689%2C1544693773; Hm_lvt_d8e95c635d8135c55060c556fd69e039=1543476663,1543476690,1544693773; nTalk_CACHE_DATA={uid:wx_1000_ISME9754_guest8B459F5E-9418-A4,tid:1544693773452679}; wTk=bAH2gblkQ69ZIvhrOP5e60p_; w_info=eyJlbnYiOiJwcm9kIn0=; mediav=%7B%22eid%22%3A%22221303%22%2C%22ep%22%3A%22%22%2C%22vid%22%3A%22Kms%5D6smz4c%3Ar3oTiQm35%22%2C%22ctn%22%3A%22%22%7D; _gid=GA1.2.1670264116.1544695613; Hm_lpvt_d8e95c635d8135c55060c556fd69e039=1544702516; Qs_pv_93213=814727655409779500%2C328212114888190400%2C4573770796627749000%2C708423598520817900%2C3068960244895955500',
}

request.get({
    url:'https://www.wbiao.cn/shoubiao.html?pc=9',
    headers
},(err,res,body)=>{
    let $ = cheerio.load(body);console.log(body)

    let data_category = [];
    $('a','.hot_brands').each((idx,ele)=>{//console.log(ele)
        let category = unescape($(ele).html().replace(/<i>.+<\/i>/gi,'').replace(/&#x(\w+);/ig,'%u$1'))
        data_category.push({
            name:category,
            add_time:Date.now()
        });

        //请求当前分类下的数据
        request.get({
            url:$(ele).attr('href'),
            headers:list_headers
        },(err,res,body)=>{
            let $ = cheerio.load(body);

            let data_goods = [];
            $('#s_goods_list li').each((idx,ele)=>{
                let $ele = $(ele);
                let name = $ele.find('.s_goods_name').text();
                let model = name.match(/\s(\d[\da-z\-]+)\s/i);
                model = model?model[1]:'';
                let sale_price = $ele.find('.s_price em').text().replace(/￥|,/g,'')*1;
                let price = $ele.find('.s_price del').text().replace(/￥|,/g,'')*1;
                let add_time = Date.now();

                let imgurl = 'http:'+$ele.find('.s_goods_img img').attr('data-wpl');
                let filename = path.basename(imgurl);

                // 把图片写入本地硬盘
                // request(imgurl).pipe(fs.createWriteStream('img/'+filename))

                data_goods.push({
                    name,
                    model,
                    category,
                    price,
                    sale_price,
                    add_time,
                    imgurl:'img/'+filename
                })
            });

            // 插入goods集合
            console.log(data_goods);
            db.insert('goods',data_goods).then(res=>{
                console.log('插入集合成功')
            });
        });
    });

    console.log(`data_category:`,data_category);
    db.insert('category',data_category).then(res=>{
        console.log('插入分类成功')
    })
})