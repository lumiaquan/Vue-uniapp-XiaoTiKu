<script>
	export default {
		onLaunch: function() {
			var that = this
			console.log('App Launch')
			var openId = uni.getStorageSync("openId")
			if(openId){
				uni.request({
					url: 'http://127.0.0.1:8081/getCuoti',
					method: 'GET',
					data: {
						openId: openId
					},
					success(res) {
						if(res.data.length>0){
							that.$common.userInfo = res.data[0]
						}
					}
				})
			}
		},
		onShow: function() {
			console.log('App Show')
			this.globalData.userinfo.id = uni.getStorageSync("id")
			this.globalData.userinfo.avatar = uni.getStorageSync("avatar")
			this.globalData.userinfo.openId = uni.getStorageSync("openId")
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
