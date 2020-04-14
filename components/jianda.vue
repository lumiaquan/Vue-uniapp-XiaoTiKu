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
		<view class="fenshu">
			<input type="text" v-model="fenshu" placeholder="本题总分15"/>
		</view>
		<view class="dafen-container" @click="changeQuestion(1)">
			<view class="dafen">
				给自己打分
			</view>
		</view>
		<view class="jianda-btn">
			<button class="cu-btn round sm" @click="show">{{text}}</button>
		</view>
		<view v-if="flag" class="jiexi-container">
			<view class="jiexi-title">
				正确答案:
			</view>
			<view class="jiexi">
				{{rightAnswer}}
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
			this.rightAnswer = neirong.jiandaanswer
			this.jiexi = neirong.jiexi
		},
		data() {
			return {
				content: '',
				jiexi: '',
				fenshu: '',
				flag: false,
				text: '点击显示答案',
				rightAnswer: ''
			};
		},
		methods:{
			show (){
				if(this.text == '点击显示答案'){
					this.text = '点击隐藏答案'
					this.flag = true
				}else{
					this.text = '点击显示答案'
					this.flag = false
				}
			},
			changeQuestion (e){
				var data = {}
				if(this.tag == "l"){
					data = {
						ps: e
					}
				}else {
					if(this.number == this.questionList.length){
						data = {
							ps: e,
							submit: true,
							answer: parseInt(this.fenshu),
							tixing: this.questionList[this.number-1].tixing,
							number: this.number-1
						}
					}else{
						data = {
							ps: e,
							submit: false,
							answer: parseInt(this.fenshu),
							tixing: this.questionList[this.number-1].tixing,
							number: this.number-1
						}
					}
				}
				this.$emit('func', data);	
			}
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
	
	.fenshu{
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	
	.fenshu input{
		width:147px;
		height:38px;
		border-radius:19px;
		border: 1px solid rgba(3,100,33,1);
		text-align: center;
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
	
	.jianda-btn{
		width: 100%;
		position: relative;
		margin-top: 10px;
	}
	
	.jianda-btn button{
		position: absolute;
		right: 0;
	}
	
	.jiexi-title{
		margin-left: 7%;
		width: 86%;
		font-size: 15px;
		margin-top: 40px;
	}
	
	.jiexi{
		margin-left: 7%;
		padding-top: 10px;
		width: 86%;
		font-size:15px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:500;
		color: #000000;
		line-height:22px;
		letter-spacing:1px;
	}
</style>
