<template>
	<view>
		<view class="Header">
			<view class="number">
				{{number}}
			</view>
			<view class="category">
				简答题
			</view>
		</view>
		<view class="question-content">
			{{content}}
		</view>
		<view v-if="jiexiTag==1" class="jiexi-container">
			<view class="jiexi-title">
				正确答案:{{rightAnswer}}
			</view>
		</view>
		<view v-if="jiexiTag==1" class="jiexi-container">
			<view class="jiexi-title">
				解析:
			</view>
			<view class="jiexi">
				{{jiexi}}
			</view>
		</view>
		<view class="dafen-container">
			<view class="dafen">
				给自己打分
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		created() {
			var neirong = this.questionList[this.number-1]
			if(this.tag == "l"){
				neirong = this.questionList[this.qNumber]
			}
			this.content = neirong.content
			this.jiexi = neirong.jiexi
		},
		data() {
			return {
				content: '',
				jiexi: ''
			};
		},
		props:[
			"number",
			"questionList",
			"nextText",
			"jiexiTag",
			"qNumber",
			"tag"
		]
	}
</script>

<style>
	.Header{
		margin-left: 7%;
		padding-top: 12px;
		display: flex;
		flex: auto;
		align-items: center;
	}
	
	.number{
		width:31px;
		height:31px;
		background-color:#096642;
		border-radius: 50%;
		text-align: center;
		line-height: 31px;
		font-size:16px;
		color: rgba(255,255,255,1);
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
	}
	
	.category{
		margin-left: 16px;
		width:61px;
		height:23px;
		background:#096642;
		border-radius:32px;
		font-size:13px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		line-height:23px;
		text-align: center;
		color: #FFFFFF;
	}
	
	.question-content{
		margin-left: 7%;
		padding-top: 10px;
		width: 86%;
		font-size:15px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:500;
		color: #000000;
		line-height:22px;
		letter-spacing:1px;
		margin-bottom: 34px;
	}
	
	.dafen-container{
		display: flex;
		justify-content: center;
	}
	
	.dafen{
		width:147px;
		height:38px;
		background:rgba(3,100,33,1);
		border-radius:19px;
		color: #FFFFFF;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:300;
		font-size: 20px;
		line-height: 38px;
		text-align: center;
	}
</style>
