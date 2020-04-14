<template>
	<view>
		<danxuanpage v-if="danxuan" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></danxuanpage>
		<duoxuanpage v-if="duoxuan" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></duoxuanpage>
		<panduanpage v-if="panduan" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></panduanpage>
		<jiandapage v-if="jianda" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></jiandapage>
		<view class="line">
			
		</view>
		<view class="cmt-container">
			<view class="cmt-title">
				发表笔记
			</view>
			<view class="cmt-content">
				<textarea value="" placeholder="请输入您的笔记(最多120字)" maxlength="120" v-model="biji"/>
			</view>
			<button type="primary" @click="postBiji">发表</button>
			<view class="cmt-comments" v-for="(item,index) in questionList[qNumber].bijiList" :key="index">
				<view class="cmt-header">
					<view class="cmt-avatar">
						<image :src="item.avatarUrl"></image>
					</view>
					<view class="cmt-id-time">
						<view class="cmt-id">
							{{item.nickName}}
						</view>
						<view class="cmt-time">
							{{item.time}}
						</view>
					</view>
					<view class="cmt-collection">
						收藏
						<image src="../../static/星星1.png"></image>
					</view>
				</view>
				<view class="cmt-bottom">
					{{item.content}}
				</view>
				<view class="cmt-line">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import danxuanpage from '../../components/danxuan.vue'
	import duoxuanpage from '../../components/duoxuan.vue'
	import panduanpage from '../../components/panduan.vue'
	import jiandapage from '../../components/jianda.vue'
	var moment = require('moment')
	export default {
		onLoad(options) {
			var that = this
			this.tag = options.tag
			if(options.tag == "l"){
				this.questionList = this.$common.falseQ
			}else{
				this.questionList = this.$common.questionList
			}
			if(this.questionList[0].tixing == 'danxuan'){
				that.danxuan = true
			}
			if(this.questionList[0].tixing == 'duoxuan'){
				that.duoxuan = true
			}
			if(this.questionList[0].tixing == 'panduan'){
				that.panduan = true
			}
			if(this.questionList[0].tixing == 'jianda'){
				that.jianda = true
			}
			if(options.cuotiTag == 1){
				this.number = 1
			}else{
				this.number = this.questionList[0].number
			}
			if(this.questionList.length>1){
				that.nextText = "下一题"
			}else{
				that.nextText = "无"
			}
		},
		data() {
			return {
				tag: "",
				danxuan: false,
				duoxuan: false,
				panduan: false,
				jianda: false,
				questionList: [],
				number: 0,
				qNumber: 0,
				nextText: "",
				jiexiTag: 1,
				biji: ""
			}
		},
		methods: {
			changeQuestion (data){
				var that = this
				if (data.ps == 1) {
					this.qNumber++
					this.number = this.questionList[this.qNumber].number
					if (this.questionList[this.qNumber].tixing == "danxuan") {
						this.danxuan = true
						this.duoxuan = false
						this.panduan = false
						this.jianda = false
						that.tixing = "danxuan"
					}
					if (this.questionList[this.qNumber].tixing == "duoxuan") {
						this.danxuan = false
						this.duoxuan = true
						this.panduan = false
						this.jianda = false
						that.tixing = "duoxuan"
					}
					if (this.questionList[this.qNumber].tixing == "panduan") {
						this.danxuan = false
						this.duoxuan = false
						this.panduan = true
						this.jianda = false
						that.tixing = "panduan"
					}
					if (this.questionList[this.qNumber].tixing == "jianda") {
						this.danxuan = false
						this.duoxuan = false
						this.panduan = false
						this.jianda = true
						that.tixing = "jianda"
					}
				}else if (data.ps == -1) {
						if (this.questionList[this.qNumber - 1].tixing == "danxuan") {
							this.danxuan = true
							this.duoxuan = false
							this.panduan = false
							this.jianda = false
						}
						if (this.questionList[this.qNumber - 1].tixing == "duoxuan") {
							this.danxuan = false
							this.duoxuan = true
							this.panduan = false
							this.jianda = false
						}
						if (this.questionList[this.qNumber - 1].tixing == "panduan") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = true
							this.jianda = false
						}
						if (this.questionList[this.qNumber - 1].tixing == "jianda") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = false
							this.jianda = true
						}
						this.qNumber--
						this.number = this.questionList[this.qNumber].number
				}
			},
			postBiji (){
				var that = this
				var pattern = "YYYY-MM-DD HH:mm:ss"
				uni.request({
					url: 'https://magiskq.top:8081/postBiji',
					method: 'POST',
					header: {
						'Content-Type': "application/json"
					},
					data: {
						_id: that.questionList[that.qNumber]._id,
						content: that.biji,
						nickName: that.$common.userinfo.id,
						avatarUrl: that.$common.userinfo.avatar,
						time: Date.now()
					},
					success() {
						uni.showToast({
							title: "发表成功！"
						})
						that.questionList[that.qNumber].bijiList.unshift({
							content: that.biji,
						    nickName: that.$common.userinfo.id,
						    avatarUrl: that.$common.userinfo.avatar,
							time: moment(Date.now()).format(pattern)
						})
						that.biji = ""
					}
				})
			}
		},
		components:{
			"danxuanpage" : danxuanpage,
			"duoxuanpage" : duoxuanpage,
			"panduanpage" : panduanpage,
			"jiandapage" : jiandapage
		}
	}
</script>

<style>
	.line{
		width: 100%;
		height: 2px;
		background-color: rgba(216,216,216,1);
		margin-top: 20px;
	}
	.cmt-title{
		font-size: 20px;
		margin-top: 5px;
	}
	.cmt-content{
		width: 100%;
		padding: 5px 0;
	}
	.cmt-content textarea{
		width: 100%;
		height: 50px;
		border: 1px solid rgba(216,216,216,1);
		font-size: 13px;
	}
	.cmt-comments{
		margin-top: 10px;
		width: 100%;
	}
	.cmt-header{
		margin-left: 7%;
		display: flex;
		margin-top: 5px;
		position: relative;
	}
	.cmt-avatar{
		margin-right: 20px;
	}
	.cmt-avatar image{
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	.cmt-collection{
		display: flex;
		align-items: center;
	}
	.cmt-id-time{
		
	}
	.cmt-id{
		line-height: 20px;
	}
	.cmt-time{
		line-height: 20px;
	}
	.cmt-collection{
		position: absolute;
		right: 7%;
		bottom: 9px;
	}
	.cmt-collection image{
		width: 20px;
		height: 22px;
	}
	.cmt-bottom{
		margin: 0 7%;
		font-size:14px;
		font-weight:500;
		color: #000000;
		line-height:22px;
		letter-spacing:1px;
	}
	.cmt-line{
		width: 100%;
		height: 2px;
		background-color: rgba(216,216,216,1);
	}
</style>
