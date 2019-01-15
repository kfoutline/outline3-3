'use strict';
const webpack = require('webpack');
const path = require('path');

const { VueLoaderPlugin } = require('vue-loader');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	// 入口文件
	entry:{
		app:path.join(__dirname,'./src/main.js')
	},
	output:{
		path:path.join(__dirname,'./build'),
		filename:'[name]-bundle.js'
	},
	resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

	// 开发模式
	mode:'development',
	devServer:{
		contentBase:path.join(__dirname,'./src'),
		port:8000,
		open:true
		
	},
	plugins:[
		new HtmlWebpackPlugin({
			title:'vuex',
			template:'src/Vuex_2_modules.html'
		}),
		new CleanWebpackPlugin('build'),

		// Vue-loader的使用在15.*之后的版本都需要伴随 VueLoaderPlugin
		new VueLoaderPlugin()
	],
	module:{
		rules:[
			{ 
				test: /\.vue$/, 
				use: 'vue-loader'
			},
			{ 
				test: /\.css$/, 
				use: ['style-loader','css-loader']  
			},
			{
				test:/\.js$/,
				exclude:path.resolve(__dirname,'./node_modules'),
				use:[{
					loader:'babel-loader',
					options:{
						presets:['env','stage-0']
					}
				}]
			}
		]
	}
}