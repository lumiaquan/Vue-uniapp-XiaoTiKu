<template>
	<view>
		<view class="cuoti-top-container">
			<view class="cuoti-top-img">
				<image src="../../static/cuotiji.png"></image>
			</view>
			<view class="cuoti-top-line">
				
			</view>
			<view class="cuoti-top-text">
				<view class="text1">
					错题集
				</view>
				<view class="text2">
					Wrong homework collection
				</view>
			</view>
		</view>
		<view class="cuoti-middle">
			
		</view>
		<view class="cuoti-bottom" v-for="(item,index) in zhangjieLit" :key="index" @click="goto(index)">
			<view class="cuoti-bottom-list">
				<view class="cuoti-bottom-img">
					<image src="../../static/铃铛.png"></image>
				</view>
				<view class="cuoti-bottom-text">
					{{item}}
				</view>
			</view>
			<view class="cuoti-bottom-line">
				
			</view>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'
	export default {
		onLoad() {
			var that = this
			if(app.globalData.userinfo.openId){
				
			}else{
				uni.navigateTo({
					url: '../loginPage/loginPage'
				})
			}
			if(this.$common.cuotiList.length>0){
				this.list = this.$common.cuotiList
				for(var i=0;i<this.list.length;i++){
					if(this.zhangjieLit.includes(this.list[i].zhangjie)){
						var a = this.zhangjieLit.indexOf(this.list[i].zhangjie)
						this.qList[a].qList.push(this.list[i])
					}else{
						this.zhangjieLit.push(this.list[i].zhangjie)
						var a = this.zhangjieLit.indexOf(this.list[i].zhangjie)
						this.qList.push({qList:[]})
						this.qList[a].qList.push(this.list[i])
					}
				}
			}else{
				console.log(this.$common.userInfo)
				uni.request({
					url: 'http://127.0.0.1:8081/getCuotiList',
					method: 'POST',
					header: {
						'Content-Type': "application/json"
					},
					data: {
						cuotiList: that.$common.userInfo.cuotiList
					},
					success(res) {
						that.$common.cuotiList = res.data
						console.log(res.data)
						that.list = that.$common.cuotiList
						for(var i=0;i<that.list.length;i++){
							if(that.zhangjieLit.includes(that.list[i].zhangjie)){
								var a = that.zhangjieLit.indexOf(that.list[i].zhangjie)
								that.qList[a].qList.push(that.list[i])
							}else{
								that.zhangjieLit.push(that.list[i].zhangjie)
								var a = that.zhangjieLit.indexOf(that.list[i].zhangjie)
								that.qList.push({qList:[]})
								that.qList[a].qList.push(that.list[i])
							}
						}
					}
				})
			}
		},
		onShow() {},
		data() {
			return {
				list: [],
				zhangjieLit: [],
				qList: [],
				cuotiList: [
					{zhangjie:"马克思第一章",qList:[{
						content: "马克思注意诞生于（ ）",
						A:'1848年2月',
						B:'1848年1月',
						C:'1843年2月',
						D:'1845年3月',
						tixing: 'danxuan',
						rightchoice: 'A',
						zhangjie: '第一章：asdasdasd',
						zhuti: '马克思主义',
						number: 1,
						jiexi: '111222333444555666'
					},
					{
						content: "马克思主义包含以下哪些内容",
						A:' 实践是认识的基础',
						B:'认识是主体对客体的能动反映',
						C:'主观能动性大于一切',
						D:'资本主义优于社会主义',
						tixing: 'duoxuan',
						rightchoices: ["A","B"],
						number: 2,
						jiexi: '111222333444555666'
					},
					{
						content: "卡尔·马克思是马克思主义的创始人之一",
						tixing: 'panduan',
						judgementanswer: 'right',
						number: 3,
						jiexi: '111222333444555666'
					}]},
					{zhangjie:"数电第八章",qList:[{},{},{}]},
					{zhangjie:"高数第三章",qList:[{},{},{}]}
				]
			}
		},
		methods: {
			goto (e){
				var url = `../jiexiPage/jiexiPage`
				this.$common.questionList = this.qList[e].qList
				uni.navigateTo({
					url: url
				})
			}
		}
	}
</script>

<style>
	.cuoti-top-container{
		width:100%;
		height:144px;
		background:rgba(64,158,255,1);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.cuoti-top-img{
		margin-left: -50px;
		margin-right: 21px;
	}
	.cuoti-top-img image{
		width: 61px;
		height: 61px;
	}
	.cuoti-top-line{
		width:1px;
		height:56px;
		background-color: #247FE0;
		margin-right: 20px;
	}
	.cuoti-top-text{
		
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
		width: 150px;
		font-size:12px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:14px;
	}
	.cuoti-middle{
		width:100%;
		height:13px;
		background:rgba(216,216,216,1);
	}
	.cuoti-bottom{
		width: 100%;
		height: 47px;
	}
	.cuoti-bottom-list{
		display: flex;
		width: 100%;
		height: 47px;
	}
	.cuoti-bottom-img{
		height: 47px;
		display: flex;
		align-items: center;
		margin-left: 26px;
		margin-right: 17px;
	}
	.cuoti-bottom-img image{
		width: 30px;
		height: 25px;
	}
	.cuoti-bottom-text{
		font-size:14px;
		font-family:STHeitiSC-Medium,STHeitiSC;
		font-weight:500;
		color:rgba(4,4,4,1);
		line-height:47px;
	}
	.cuoti-bottom-line{
		width: 100%;
		height: 1px;
		background:rgba(216,216,216,1);
	}
	
</style>
