<template>
	<view class="card-container">
		<view class="card-header">
			<view class="card-header-star">
			</view>
			<view class="card-header-text">
				{{title}}
			</view>
		</view>
		<view class="cards-container">
			<view class="card" v-for="(item,index) in cardslist" :key="item.id">
				<view :class="item.color" @click="goto(index)">
					<view class="card-img">
						<image :src="item.src"></image>
					</view>
					<view class="card-title">
						{{item.title}}
					</view>
					<view class="card-content">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			goto(e) {
				if(this.$common.userinfo.id){
					var url = this.cardslist[e].url
				}else{
					var url = '../loginPage/loginPage'
				}
				uni.navigateTo({
					url: url
				})
			}
		},
		props: [
			'cardslist',
			'title'
		]
	}
</script>

<style>
	.card-header {
		display: flex;
		flex: auto;
		padding-left: 30px;
		margin-bottom: 16px;
		margin-top: 13px;
	}

	.card-header-star {
		width: 19px;
		height: 18px;
		background-image: url('http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipEnCHyKoGgtV.Vaqs*YdAFOrV5EhMu43v6f09R.Ue.hStmtiT4e*R68FsntqPCoCSYvweffmmgLDZVF4uippNPw!/r');
		background-repeat: no-repeat;
		background-clip: border-box;
		background-size: 375px 667px;
		background-position: -30px -324px;
		margin-right: 4px;
	}

	.card-header-text {
		font-size: 15px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(0, 0, 0, 1);
		line-height: 21px;
	}

	.cards-container {
		display: flex;
		justify-content: space-evenly;
		color: white;
		margin-bottom: 30px;
	}

	.card {
		width: 74px;
		height: 126px;
		box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.5);
		border-radius: 10px;
	}

	.btn {
		width: 74px;
		height: 126px;
		z-index: -1;
	}

	.blue {
		z-index: 3;
		width: 74px;
		height: 126px;
		border-radius: 10px;
		background-image: linear-gradient(to top, #4E8EE4, #BBF1FF);
		position: relative;
	}

	.orange {
		z-index: 3;
		width: 74px;
		height: 126px;
		border-radius: 10px;
		background-image: linear-gradient(to top, #E14505, #FFF5CC);
		position: relative;
	}

	.purple {
		z-index: 3;
		width: 74px;
		height: 126px;
		border-radius: 10px;
		background-image: linear-gradient(to top, #6200E1, #F8DDFF);
		position: relative;
	}

	.pink {
		z-index: 3;
		width: 74px;
		height: 126px;
		border-radius: 10px;
		background-image: linear-gradient(to top, #FD0E7A, #FFDDFF);
		position: relative;
	}

	.card-img {
		width: 40px;
		height: 40px;
		position: absolute;
		left: 16px;
		top: 11px;
	}

	.card-img image {
		width: 100%;
		height: 100%;
	}

	.card-title {
		width: 74px;
		height: 17px;
		font-size: 12px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: rgba(251, 248, 248, 1);
		line-height: 17px;
		text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
		text-align: center;
		position: absolute;
		top: 60px;
	}

	.card-content {
		width: 74px;
		height: 22px;
		font-size: 8px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(251, 248, 248, 1);
		line-height: 11px;
		text-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
		text-align: center;
		position: absolute;
		top: 86px;
	}

	.noshadow {
		hover-class: none;
	}
</style>
