<template>
	<view>
		<view class="top">
			<view class="top-text">
				答题详情
			</view>
		</view>
		<view class="header">
			<view class="zhangjie">
				{{zhangjie}}
			</view>
			<view class="fenshu">
				正确{{rightNum}}/{{l}}
			</view>
		</view>
		<view class="line">
		</view>
		<view class="circle-container">
			<view class="circle" v-for="(item,index) in resList" :key="index">
				<view v-if="item == 1" class="right">
					{{index+1}}
				</view>
				<view v-if="item == 0" class="false">
					{{index+1}}
				</view>
				<view v-if="item == 3" class="none">
					{{index+1}}
				</view>
			</view>
		</view>
		<view class="bottom">
			<view class="bottom-left" @click="leftGoto">
				<view class="bottom-img">
					<image src="../../static/错题.png" mode=""></image>
				</view>
				<view class="bottom-text">
					错题解析
				</view>
			</view>
			<view class="bottom-right" @click="rightGoto">
				<view class="bottom-img">
					<image src="../../static/全部.png" mode=""></image>
				</view>
				<view class="bottom-text">
					全部解析
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			var that = this
			this.resList = this.$common.resList
			this.zhangjie = options.zhangjie
			for(var i=0;i<this.resList.length;i++){
				if(this.resList[i] == 1){
					that.rightNum++
				}
			}
			this.l = this.resList.length
			var yushu = this.resList.length % 5
			if(yushu>0){
				for(var i=0;i<(5-yushu);i++){
					that.resList.push(3)
				}
			}
			for(var i=0;i<this.resList.length;i++){
				if(that.resList[i] == 0){
					that.falseQ.push(that.$common.questionList[i])
				}
			}
		},
		data() {
			return {
				zhangjie: "",
				resList: [],
				rightNum: 0,
				falseQ: [],
				l: 0
			}
		},
		methods: {
			leftGoto (){
				this.$common.falseQ = this.falseQ
				var url = `../jiexiPage/jiexiPage?tag=l`
				uni.navigateTo({
					url: url
				})
			},
			rightGoto (){
				var url = `../jiexiPage/jiexiPage?tag=r`
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.top{
		width: 100%;
		height: 50px;
		background-color: rgba(64,158,255,1);
	}
	.top-text{
		color: #FFFFFF;
		line-height: 50px;
		font-size: 20px;
		text-align: center;
	}
	.header{
		margin-left: 5%;
		margin-top: 10px;
	}
	.zhangjie{
		margin-bottom: 10px;
		width: 230px;
	}
	.line{
		width: 90%;
		height: 1px;
		background-color: #8799A3;
		margin-left: 5%;
		margin-top: 10px;
		margin-bottom: 10px;
	}
	.circle-container{
		margin: 0 5%;
		display: flex;
		justify-content: space-evenly;
		flex-wrap: wrap;
	}
	.right{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #39B54A;
		line-height: 40px;
		color: #FFFFFF;
		text-align: center;
		margin-right: 30px;
		margin-bottom: 15px;
	}
	.false{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #FF0000;
		line-height: 40px;
		color: #FFFFFF;
		text-align: center;
		margin-right: 30px;
		margin-bottom: 15px;
	}
	.none{
		width: 40px;
		height: 40px;
		border-radius: 50%;
		background-color: #FFFFFF;
		line-height: 40px;
		color: #FFFFFF;
		text-align: center;
		margin-right: 30px;
		margin-bottom: 15px;
	}
	.bottom{
		margin-top: 100px;
		background-color: rgba(64,158,255,1);
		display: flex;
		justify-content: space-around;
		height: 50px;
	}
	.bottom-left{
		display: flex;
	}
	.bottom-right{
		display: flex;
	}
	.bottom-img{
		display: flex;
		align-items: center;
	}
	.bottom-img image{
		width: 20px;
		height: 20px;
	}
	.bottom-text{
		color: #FFFFFF;
		line-height: 50px;
	}
</style>
