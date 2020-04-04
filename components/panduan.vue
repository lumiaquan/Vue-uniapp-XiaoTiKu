<template>
	<view>
		<view class="Header">
			<view class="number">
				{{number}}
			</view>
			<view class="category">
				判断题
			</view>
		</view>
		<view class="question-content">
			{{content}}
		</view>
		<view class="judgement-container">
			<view :class="(isActive== 1)?'judge-active':'judge'" @click="changeActive(1)">
				<view class="judge-text">
					对
				</view>
			</view>
			<view :class="(isActive== 2)?'judge-active':'judge'" @click="changeActive(2)">
				<view class="judge-text">
					错
				</view>
			</view>
		</view>
		<view v-if="jiexiTag==1" class="jiexi-container">
			<view class="jiexi-title">
				正确答案: {{rightAnswer}}
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
		<view class="pre-container">
			<view :class="(number == 1)?'pre2':'pre'" @click="changeQuestion(-1)">
				<view :class="(number == 1)?'pre-text2':'pre-text'">
					上一题
				</view>
			</view>
		</view>
		<view class="next-container">
			<view class="next" @click="changeQuestion(1)">
				<view class="next-text">
					{{nextText}}
				</view>
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
			this.rightAnswer = neirong.judgementanswer
			if(this.rightAnswer == "right"){
				this.rightAnswer = "对"
			}else{
				this.rightAnswer = "错"
			}
		},
		data() {
			return {
				content: '',
				isActive: 0,
				jiexi: '',
				rightAnswer: ''
			}
		},
		methods: {
			changeActive(e){
				this.isActive = e
			},
			changeQuestion(e){
				var data ={}
				var judge = ''
				if(this.isActive == 1){
					judge = 'right'
				}
				if(this.isActive == 2){
					judge = 'false'
				}
				if(this.tag == "l"){
					data = {
						ps: e
					}
				}else {
					if(this.nextText == "提交"){
						data = {
							ps: e,
							number: this.number-1,
							answer: judge,
							submit: true,
							tixing: this.questionList[this.number-1].tixing
						}
					}else{
						data = {
							ps: e,
							number: this.number-1,
							answer: this.isActive,
							submit: false,
							tixing: this.questionList[this.number-1].tixing
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

<style >
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
		background:#EF5E33;
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
		background:#EF5E33;
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
	
	.judgement-container{
		display: flex;
		justify-content: space-around;
	}
	
	.judge{
		width:117px;
		height:36px;
		background:#FFFFFF;
		border-radius:8px;
		text-align: center;
		border: 1px #EF5E33 solid;
		line-height: 34px;
		font-size:16px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:400;
		color: #000000;
	}
	
	.judge-active{
		width:117px;
		height:36px;
		background:#EF5E33;
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
		border-radius:8px;
		text-align: center;
		line-height: 34px;
		font-size:16px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:400;
		color: #FFFFFF;
	}
	
	.jiexi-title{
		margin-left: 7%;
		width: 86%;
		font-size: 15px;
		margin-top: 20px;
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
	
	.next-container{
		display: flex;
		justify-content: center;
	}
	
	.next{
		width:116px;
		height:38px;
		background:#EF5E33;
		border-radius:19px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30px;
	}
	
	.next-text{
		color: #FFFFFF;
		font-size:20px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:300;
		line-height:21px;
		text-align: center;
	}
	
	.pre-container{
		display: flex;
		justify-content: center;
	}
	
	.pre{
		width:116px;
		height:38px;
		background:#EF5E33;
		border-radius:19px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 53px;
	}
	
	.pre-text{
		color: #FFFFFF;
		font-size:20px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:300;
		line-height:21px;
		text-align: center;
	}
	
	.pre2{
		width:116px;
		height:38px;
		background:#FFFFFF;
		border-radius:19px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 53px;
		border: 1px solid #EF5E33;
	}
	
	.pre-text2{
		color: #000000;
		font-size:20px;
		font-family:STHeitiSC-Light,STHeitiSC;
		font-weight:300;
		line-height:21px;
		text-align: center;
	}
</style>
