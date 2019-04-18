
<template>
	<view class="content">
        <image class="logo" src="/static/logo.png"></image>
		<view>
            <text class="title">{{title}}</text>
			<text v-bind:text="title"></text>
			<h1>{{title}}</h1>
			<span>NickName:{{nickname}}</span>
        </view>
		<img src="/static/logo.png"/>
	</view>
</template>


<script>
	/**
	 * 编译成小程序后
	 * template -> index.wxml
	 * script   -> index.js
	 * style    -> index.wxss
	 * 自动生成index.json
	 */
	export default {
		data() {
			return {
				title: 'Hello laoxie',
				nickname:'jingjing'
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}
    .logo{
        height: 200upx;
        width: 200upx;
        margin-top: 200upx;
    }
	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
