<template>
	<view>
		<view class="header">
			<view class="header-img">
				<image src="http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r"></image>
			</view>
			<view class="header-text">
				<view class="text-top">
					{{title}}题库
				</view>
				<view class="text-bottom">
					Political Question Bank
				</view>
			</view>
		</view>
		<view class="line">
		</view>
		<view class="middle-container">
			<view class="middle-left" :style="{'height':systemHeight+'px'}">
				<view :class="(isActive == index)?'left-box-active':'left-box'" v-for="(item,index) in subzhutiList" :key="index"
				 @click="changeActive(index)">
					<view class="lfet-text">
						{{item}}
					</view>
				</view>
			</view>
			<view class="middle-right">
				<view class="right-title">
					<view class="right-title-img">
						<image src="../../static/italic-icon.png"></image>
					</view>
					<view class="rignt-title-text">
						{{zhutiList[isActive]}}
					</view>
					<view class="right-title-img">
						<image src="../../static/italic-icon.png"></image>
					</view>
				</view>
				<view class="right-zhangjie" v-for="(item,index) in zhangjieList" :key="index">
					<view class="zhangjie-box" @click="goto(item)">
						{{item}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad(options) {
			var that = this
			uni.getSystemInfo({
				success(res) {
					that.systemHeight = (res.windowHeight - 107)
				}
			})
			this.title = options.tiku
			this.tiku = options.tiku
			uni.request({
				url: "http://127.0.0.1:8081/getMulu",
				method: 'GET',
				data: {
					tiku: that.tiku
				},
				success(res) {
					that.list = res.data
					for (var i = 0; i < that.list.length; i++) {
						if (that.zhutiList.includes(that.list[i].zhuti)) {

						} else {
							that.zhutiList.push(that.list[i].zhuti)
						}
						if (that.subzhutiList.includes(that.list[i].subzhuti)) {

						} else {
							that.subzhutiList.push(that.list[i].subzhuti)
						}
						// for (var y = 0; y < that.subzhutiList.length; y++) {
						// 	if (that.list[i].subzhuti == that.subzhutiList[y]) {
						// 		that.zhangjieList[y].push(that.list[i].zhangjie)
						// 	}
						// }
					}
					that.zhangjieList = that.list[0].zhangjie
				}
			})
		},
		data() {
			return {
				tiku: "",
				zhuti: "",
				title: "",
				list: [],
				subzhutiList: [],
				zhutiList: [],
				zhangjieList: [],
				systemHeight: 0,
				isActive: 0
			};
		},
		methods: {
			changeActive(e) {
				this.isActive = e
			},
			goto(e){
				var url = `../questionPage/questionPage?tiku=${this.tiku}&zhuti=${this.zhutiList[this.isActive]}&zhangjie=${e}`
				console.log(url)
				uni.navigateTo({
					url: url
				})
			}
		},
		watch: {
			isActive: function(val, oldVal) {
				this.zhangjieList = this.list[val].zhangjie
			}
		}
	}
</script>

<style>
	.header {
		width: 100%;
		height: 100px;
		background: rgba(43, 83, 150, 1);
		display: flex;
		flex: auto;
	}

	.header-img {
		width: 60px;
		height: 60px;
		margin-left: 72px;
		margin-top: 22px;
	}

	.header-img image {
		width: 60px;
		height: 60px;
	}

	.header-text {
		margin-left: 24px;
		margin-top: 28px;
		color: #FFFFFF;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 28px;
		text-shadow: -2px 2px 4px rgba(255, 255, 255, 0.59);
	}

	.text-top {
		font-size: 20px;
		margin-bottom: -3px;
	}

	.line {
		width: 414px;
		height: 7px;
		background: rgba(216, 216, 216, 1);
	}

	.middle-container {
		display: flex;
		flex: auto;
	}

	.middle-left {
		width: 102px;
		border-right: rgba(216, 216, 216, 1) 2px solid;
	}

	.left-box {
		height: 54px;
		border-bottom: rgba(216, 216, 216, 1) 2px solid;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #000000;
	}

	.left-box-active {
		height: 54px;
		border-bottom: rgba(216, 216, 216, 1) 2px solid;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		background-color: rgba(43, 83, 150, 1);
	}

	.middle-right {
		width: 100%;
		margin-top: 16px;
	}

	.right-title {
		display: flex;
		justify-content: center;
		margin-bottom: 5px;
	}

	.right-title-img image {
		width: 25px;
		height: 27px;
	}

	.rignt-title-text {
		letter-spacing: 2px;
		font-size: 16px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 600;
		color: #000000;
		line-height: 27px;
		margin: 0 10px;
	}

	.right-zhangjie {
		display: flex;
		flex-wrap: 1;
		justify-content: center;
	}

	.zhangjie-box {
		width: 260px;
		height: 38px;
		border-radius: 8px;
		border: 1px solid rgba(43, 83, 150, 1);
		margin-bottom: 18px;
		font-size: 12px;
		font-family: PingFangSC-Light, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		line-height: 38px;
		padding-left: 11px;
	}
</style>
