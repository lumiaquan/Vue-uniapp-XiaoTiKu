<template>
	<view singlechoice-container>
		<view class="Header">
			<view class="number">
				{{number}}
			</view>
			<view class="category">
				多选题
			</view>
		</view>
		<view class="question-content">
			{{content}}
		</view>
		<view class="choices-container" v-for="(item,index) in choices" :key="item.Eindex">
			<view class="choices-subcontainer">
				<view :class="(isActive.includes(index))?'choices-content-active':'choices-content '" @click="activeChoice(index)">
					{{item}}
				</view>
			</view>
		</view>
		<view v-if="jiexiTag==1" class="jiexi-container">
			<view class="jiexi-title">
				正确答案: &nbsp;<text v-for="(item,index) in rightAnswer" :key="inex">{{item}}</text>
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
			this.rightAnswer = neirong.rightchoices
			var a = `A. ${neirong.A}`
			var b = `B. ${neirong.B}`
			var c = `C. ${neirong.C}`
			var d = `D. ${neirong.D}`
			this.choices.push(a)
			this.choices.push(b)
			this.choices.push(c)
			this.choices.push(d)
		},
		data() {
			return {
				content: '',
				choices: [],
				isActive: [],
				answer: [],
				jiexi: '',
				rightAnswer: []
			}	
		},
		methods: {
			activeChoice (e){
				var arryindex = this.isActive.indexOf(e);
				if(arryindex == -1){
					this.isActive.push(e)
					if(e == 0){
						this.answer.push("A")
					}else if(e == 1){
						this.answer.push("B")
					}else if(e == 2){
						this.answer.push("C")
					}else if(e == 3){
						this.answer.push("D")
					}
				}else{
					this.isActive.splice(arryindex,1)
					this.answer.splice(arryindex,1)
				}
			},
			changeQuestion(e){
				var data ={}
				if(this.tag == "l"){
					data = {
						ps: e
					}
				}else {
					if(this.nextText == "提交"){
						data = {
							ps: e,
							number: this.number-1,
							answer: this.answer,
							submit: true,
							tixing: this.questionList[this.number-1].tixing
						}
					}else{
						data = {
							ps: e,
							number: this.number-1,
							answer: this.answer,
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
		background:rgba(64,77,170,1);
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
		background:rgba(64,77,170,1);
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
	
	.choices-container{
		margin-left: 7%;
		width: 100%;
	}
	
	.choices-subcontainer{
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		width: 86%;
	}
	
	.choices-content{
		padding: 8px 18px;
		width: 100%;
		border-radius:6px;
		border:1px solid rgba(64,77,170,1);
		color:#000000
	}
	
	.choices-content-active{
		padding: 8px 18px;
		width: 100%;
		border-radius:6px;
		border:1px solid rgba(64,77,170,1);
		background-color: rgba(64,77,170,1);
		color: white;
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
		background:rgba(64,77,170,1);
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
		background:rgba(64,77,170,1);
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
		border: 1px solid rgba(64,77,170,1);
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
