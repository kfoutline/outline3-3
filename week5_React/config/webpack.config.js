const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWepackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// 导出配置模块
module.exports = {
	entry:{
		main:'./example/index.js',
	},
	output:{
		path:path.resolve(__dirname,'./dist'),
		filename:'js/[name]-bundle.js'
	},
	mode:'development',
	devServer: {
      contentBase: path.join(__dirname, "./dist"), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
      port: 9001, //端口改为9001
      open:true, // 自动打开浏览器，适合懒人
      proxy:{
      	'/api':{
      		target:'http://localhost:10086',
      		changeOrigin:true
      	}
      },
    },
	module:{
		rules:[
			{ 
				test: /\.css$/, 
				loader: ['style-loader','css-loader'] 
			},
			{
				test:/\.js$/,
				exclude:path.resolve(__dirname,'./node_modules'),
				
				use:[
					{
						loader:'babel-loader',
						options:{
							presets:['env','react','stage-0'],
							plugins: [
							    ["import", { libraryName: "antd-mobile", style: "css" }] // `style: true` 会加载 less 文件
							  ]
						}
					}
				]
			},
			{
				test:/\.scss$/,
				loader:['style-loader','css-loader','sass-loader']
			}
		]
	},
	plugins:[
		new HtmlWebpackPlugin({
			template:'./src/index.html',
			hash:true,
			title:'首页',
			chunks: ['main']
		}),

		new CleanWepackPlugin(['dist']),

		// new CopyWebpackPlugin([{
		// 	from:'./src/img',
		// 	to:'img'
		// }])
	]
}