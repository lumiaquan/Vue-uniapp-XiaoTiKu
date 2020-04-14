<template>
	<view class="mine-container">
		<view class="mine-top-container">
			<view class="top-img">
				<image :src="avatar"></image>
			</view>
			<view class="top-text">
				{{id}}
			</view>
			<view class="top-text2">
				吾生也有涯，而知也无涯
			</view>
		</view>
		<view class="mine-middle">
			<view class="mine-middle-img">
				<image src="../../static/联系.png"></image>
			</view>
			<view class="mine-middle-text">
				关于我们
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			var id = this.$common.userinfo.id
			if(id){
				console.log(id)
			}else{
				uni.navigateTo({
					url: '../loginPage/loginPage'
				})
			}
		},
		onShow() {
			var id = this.$common.userinfo.id
			var avatar = this.$common.userinfo.avatar
			if(id){
				this.id =id
				this.avatar = avatar
			}
		},
		data() {
			return {
				id: '',
				avatar: ''
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.mine-container{
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
	}
	.mine-top-container{
		width:90%;
		height:186px;
		background:rgba(64,158,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
		border-radius:10px;
		text-align: center;
		margin-top: 23px;
		margin-bottom: 29px;
	}
	.top-img{
		display: flex;
		justify-content: center;
		margin-top: 17px;
		margin-bottom: 15px;
	}
	.top-img image{
		width:82px;
		height:82px;
		border-radius: 50%;
		border:1px solid rgba(255,255,255,1);
	}
	.top-text{
		font-size:19px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:26px;
		margin-bottom: 9px;
	}
	.top-text2{
		font-size:11px;
		font-family:PingFangSC-Medium,PingFang SC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:16px;
	}
	.mine-middle{
		width:90%;
		height:44px;
		background:rgba(64,158,255,1);
		box-shadow:0px 2px 4px 0px rgba(0,0,0,0.5);
		border-radius:10px;
		margin-bottom: 9px;
		position: relative;
	}
	.mine-middle-img{
		display: inline-block;
		position: absolute;
		top: 14px;
		left: 15px;
	}
	.mine-middle-img image{
		width: 16px;
		height: 16px;
	}
	.mine-middle-text{
		display: inline-block;
		font-size:14px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		color:rgba(255,255,255,1);
		line-height:44px;
		position: absolute;
		left: 54px;
	}
</style>
