<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
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
