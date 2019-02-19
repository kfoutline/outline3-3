const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // 入口文件
    entry:{
        main:'./src/main.js'
    },

    // 出口：打包文件放置的目录
    output:{
        path:path.resolve(__dirname,'./dist/'), //打包文件存放路径
        filename:'js/[name][hash:5].js',
        // publicPath:'/'
    },

    // 编译模式
    mode:'development',

    // 测试服务器：安装
    devServer:{
        contentBase:'./dist/',
        port:3000,
        // open:true
    },

    resolve:{
        // 别名
        alias:{
            '@':path.resolve('src')
        },
        extensions:['.js','.json']
    },

    // 加载器配置
    module:{
        rules:[

            // 编译es6->es5：babel(babel-loader,babel-core,babel-preset-env)
            {
                test:/\.js$/,
                exclude:path.resolve(__dirname,'./node_modules'),
                use:{
                    loader:'babel-loader',
                    // 配置loader选项
                    options:{
                        presets:['env','react','stage-0'], //编译ES6->ES5,JSX->JS
                        plugins: [
                            ["import", {
                              "libraryName": "antd",
                              "libraryDirectory": "es",
                              "style": "css" // `style: true` 会加载 less 文件
                            }],
                            "transform-runtime",
                          ]
                    }
                }
            },

            // 样式加载器
            {
                test:/\.css$/,
                loader:['style-loader','css-loader']
            },

            // sass编译加载器
            {
                test:/\.scss$/,
                loader:['style-loader','css-loader','sass-loader']
            },

            // 图片的处理：依赖file-loader
            {
                test:/\.(jpe?g|png|gif|bmp)$/,
                use:{
                    loader:'url-loader',
                    options:{
                        // 设置转换base64编码的临界值
                        limit:10000,
                        name:'img/[name].[hash:7].[ext]'
                    }
                }
            }
        ]
    },

    plugins:[
        // 根据指定模板生成html结构
        new HtmlWebpackPlugin({
            template:'./src/template.html',
            title:'电商网'
        }),
        new HtmlWebpackPlugin({
            template:'./src/template.html',
            filename:'login.html',
            title:'用户登录',
            hash:true,
            // chunks:['login'],//login为入口文件名
        }),
        
        // 每次编译先清除dist目录
        new CleanWebpackPlugin('dist')
    ]
}