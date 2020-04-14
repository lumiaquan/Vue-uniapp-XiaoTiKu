<script>
	export default {
		onLaunch: function() {
			var that = this
			console.log('App Launch')
			var openId = uni.getStorageSync("openId")
			if(openId){
				uni.request({
					url: 'https://magiskq.top:8081/getCuoti',
					method: 'GET',
					data: {
						openId: openId
					},
					success(res) {
						if(res.data.length>0){
							uni.setStorageSync('cuotiList',res.data[0].cuotiList)
						}
					}
				})
			}
			uni.request({
				url: 'https://magiskq.top:8081/getUserList',
				method: 'GET',
				success(res) {
					that.$common.userList = res.data
				}
			})
		},
		onShow: function() {
			console.log('App Show')	
			this.$common.userinfo.id = uni.getStorageSync("id")
			this.$common.userinfo.avatar = uni.getStorageSync("avatar")
			this.$common.userinfo.openId = uni.getStorageSync("openId")
		},
		onHide: function() {
			console.log('App Hide')
		},
		globalData: {
			userinfo:{
				id: '',
				avatar: '',
				openId: ''
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";

	page {
		background-color: #FFFFFF;
	}
</style>
