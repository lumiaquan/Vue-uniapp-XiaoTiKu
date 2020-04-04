<template>
	<view class="index-container">
		<view class="Header">
			<view class="swiper-container">
				<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
				 :autoplay="true" interval="3000" duration="500">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
						<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
					</swiper-item>
				</swiper>
			</view>
			<view class="search-container">
				<input class="search-input" type="search" placeholder="搜索一下你要的科目,或许就会有" />
			</view>
		</view>
		<view class="Middle">
			<view class="middle-img">
			</view>
			<view class="middle-text">
				<view class="middle-text-top">
					Leonard Cook
				</view>
				<view class="middle-text-bootom">
					你感觉不舒服的时候, 就是成长的问题
				</view>
			</view>
		</view>
		
		<view class="line">

		</view>
		<CardList :cardslist="cardslist1" :title="cardtitle1"></CardList>
		<CardList :cardslist="cardslist2" :title="cardtitle2"></CardList>
	</view>
</template>

<script>
	import CardList from '../../components/CardList.vue'
	export default {
		onLoad() {
			let that = this;
		},
		data() {
			return {
				cardCur: 0,
				swiperList: [{
						id: 0,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
					},
					{
						id: 1,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big37006.jpg',
					},
					{
						id: 2,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
					},
					{
						id: 3,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
					},
					{
						id: 4,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
					},
					{
						id: 5,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
					},
					{
						id: 6,
						type: 'image',
						url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
					},
				],
				dotStyle: false,
				cardtitle1: '精选题库',
				cardslist1: [{
						id: 1,
						url: '../../pages/tikuPage/tikuPage?tiku=政治',
						color: 'blue',
						title: '政治题库',
						content: 'Political Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'
					},
					{
						id: 2,
						url: '../../pages/tikuPage/tikuPage?tiku=高数',
						color: 'orange',
						title: '高数题库',
						content: 'Advanced Math Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'

					},
					{
						id: 3,
						url: '../../pages/tikuPage/tikuPage?tiku=英语',
						color: 'purple',
						title: '英语题库',
						content: 'English Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'

					},
					{
						id: 4,
						url: '../../pages/tikuPage/tikuPage?tiku=通用',
						color: 'pink',
						title: '通用题库',
						content: 'General Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'

					}
				],
				cardtitle2: '首义便捷',
				cardslist2: [{
						id: 1,
						color: 'blue',
						title: '政治题库',
						content: 'Political Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'
					},
					{
						id: 2,
						color: 'orange',
						title: '高数题库',
						content: 'Advanced Math Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'

					},
					{
						id: 3,
						color: 'purple',
						title: '英语题库',
						content: 'English Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'

					},
					{
						id: 4,
						color: 'pink',
						title: '通用题库',
						content: 'General Question Bank',
						src: 'http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipDWpOnJ0K2M5s*450*2hCQLEGzKUfmWMDPE0GMaUVvFV7*AUL.jIRdeOzyL4H*2uWkBatfQgYhrgwyY7zE9QGSQ!/r'

					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			
		},
		components: {
			CardList
		}
	}
</script>

<style>
	.index-container {
		background-color: white;
	}

	.Header {
		position: relative;
		height: 187px;
	}

	.uni-swiper {
		height: 187px;
	}

	.screen-swiper {
		min-height: 187px
	}

	.uni-swiper-dot {
		width: 50px;
	}

	.search-container {
		display: flex;
		justify-content: center;

	}

	.search-input {
		height: 35px;
		border: 1px solid white;
		background-color: white;
		border-radius: 40px;
		width: 80%;
		text-align: left;
		padding-left: 70px;
		position: absolute;
		top: 170px;
		font-size: 10px;
		font-weight: 600;
		background-image: url(../../static/search.png);
		background-size: 12px 12px;
		/*小图标的大小*/
		background-position: 50px 10px;
		/*小图标在input的位置*/
		background-repeat: no-repeat;
		/*背景小图标不重复*/
	}

	.Middle {
		display: flex;
		flex: auto;
		padding: 0px 56px;
		margin-top: 34px;
	}

	.middle-img {
		width: 39px;
		height: 39px;
		background-image: url('http://r.photo.store.qq.com/psc?/V11gADDH06E4hz/XwdxpE8Hv.bcKvYPS8WipEnCHyKoGgtV.Vaqs*YdAFOrV5EhMu43v6f09R.Ue.hStmtiT4e*R68FsntqPCoCSYvweffmmgLDZVF4uippNPw!/r');
		background-repeat: no-repeat;
		background-clip: border-box;
		background-size: 375px 667px;
		background-position: -56px -246px;
		margin-right: 12px;
	}

	.middle-text {
		margin-top: 7px;
	}

	.middle-text-top {
		color: #000000;
		font-size: 15px;
		font-weight: 600;
	}

	.middle-text-bootom {
		color: #000000;
		font-size: 10px;
		font-weight: 600;
	}

	.line {
		height: 9px;
		width: 100%;
		background-color: #F3F0F3;
		margin-top: 16px;
		border: 1px solid #F4F1F4;
	}
</style>
