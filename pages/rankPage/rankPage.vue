<template>
	<view>
		<view class="rank-top-container">
			<view class="rank-top-img">
				<image src="../../static/奖杯.png"></image>
			</view>
			<view class="rank-top-line">
				
			</view>
			<view class="rank-top-text">
				<view class="text1">
					学霸排行
				</view>
				<view class="text2">
					Student with excellent performance ranking
				</view>
			</view>
		</view>
		<view class="rank-middle-container">
			<view class="rank-middle" v-for="(item,index) in rankList" :key="index">
				<view class="rank-number">
					{{item.number}}
				</view>
				<view class="rank-name">
					{{item.name}}
				</view>
				<view class="rank-stars">
					<image src="../../static/星星.png"></image>
					<text>X{{item.stars}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			var userList = this.$common.userList
			for(var i=0;i<10;i++){
				this.rankList.push({number:i+1,name:userList[i].nickName,stars:userList[i].collection.length})
			}
		},
		data() {
			return {
				rankList: []
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.rank-top-container{
		width:100%;
		height:144px;
		background:rgba(64,158,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 26px;
	}
	.rank-top-img{
		margin-left: -40px;
		margin-right: 21px;
	}
	.rank-top-img image{
		width: 61px;
		height: 61px;
	}
	.rank-top-line{
		width:1px;
		height:56px;
		background-color: #247FE0;
		margin-right: 20px;
	}
	.rank-top-text{
		
	}
	.text1{
		font-size:20px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:20px;
		margin-top: -5px;
		margin-bottom: 3px;
	}
	.text2{
		width: 170px;
		font-size:12px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:14px;
	}
	.rank-middle-container{
		
	}
	.rank-middle{
		display: flex;
		align-items: center;
		position: relative;
		margin-bottom: 23px;
	}
	.rank-number{
		width:33px;
		height:33px;
		background:rgba(211,76,74,1);
		border-radius: 50%;
		color: #FFFFFF;
		font-size:16px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		line-height: 33px;
		text-align: center;
		margin-left: 12%;
		margin-right: 31px;
	}
	.rank-name{
		font-size:16px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		color:rgba(0,0,0,1);
		line-height:33px;
	}
	.rank-stars{
		position: absolute;
		right: 12%;
	}
	.rank-stars image{
		width: 14px;
		height: 14px;
		margin-right: 5px;
	}
	.rank-stars text{
		font-size:16px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		color:rgba(0,0,0,1);
		line-height:33px;
	}
</style>
