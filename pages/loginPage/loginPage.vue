<template>
	<view>
		<view class="login-img">
			<image src="../../static/警告.png" mode=""></image>
		</view>
		<view class="login-text">
			授权后，才能使用后续功能
		</view>
		<view class="btn">
			<button class='loginbtn' type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo" withCredentials="true">点击授权</button>
		</view>
	</view>
</template>

<script>
	import app from '../../App.vue'
	export default {
		onLoad() {
			var that = this
			wx.login({
				success: res => {
					//code值(5分钟失效)
					//小程序appid
					let appid = 'wxfbd0debd029f4451'; //我瞎写的
					//小程序secret
					let secret = '6d695896ea4dea62a5de092bb7c01ef2'; //我瞎写的
					//wx接口路径
					let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + secret + '&js_code=' +
						res.code + '&grant_type=authorization_code';
					uni.request({
						url: url, // 请求路径
						data: {}, // 请求体  注:在这里不需要写,有没有无所谓
						method: 'GET', //请求方式,
						header: '', //请求头  注:在这里不需要写,有没有无所谓
						success: result => {
							app.globalData.userinfo.openId = result.data.openid
							//响应成功
							//这里就获取到了openid了
							uni.setStorage({
								key: 'openId',
								data: result.data.openid,
							})
						},
						fail: err => {} //失败
					});
				}
			});
		},
		data() {
			return {
				
			}
		},
		methods: {
			getUserInfo: function() {
				var that = this
				// wx登录
				wx.login({
					success(res) {
						if (res.code) {
							//发起网络请求
							var code = res.code
							// 获取微信用户信息
							wx.getUserInfo({
								success: function(res) {
									var userInfo = res.userInfo
									var nickName = userInfo.nickName
									var avatarUrl = userInfo.avatarUrl
									var gender = userInfo.gender //性别 0：未知、1：男、2：女
									var province = userInfo.province
									var city = userInfo.city
									var country = userInfo.country
									uni.setStorage({
										key: 'id',
										data: nickName,
									})
									uni.setStorage({
										key: 'avatar',
										data: avatarUrl,
									})
									app.globalData.userinfo.id = nickName
									app.globalData.userinfo.avatar = avatarUrl
									that.back()
								},
								fail: res => {
									// 获取失败的去引导用户授权 
								}
							})
			
						} else {
			
						}
					}
				})
			},
			back() {
				uni.showToast({
					title: "恭喜！授权成功！"
				})
				uni.request({
					url: 'http://127.0.0.1:8081/addUserInfo',
					data:{
						nickName : app.globalData.userinfo.id,
						avatarUrl: app.globalData.userinfo.avatar,
						openId: app.globalData.userinfo.openId
					},
					header:{
						'Content-Type': 'application/json'
					},
					method: 'POST',
					success(res) {
						console.log("上传用户数据成功！")
					}
				})
				setTimeout(() => {
				    wx.navigateBack({});
				}, 1500)
			}
		}
	}
</script>

<style>
	.login-img {
	  display: flex;
	  justify-content: center;
	  margin-top: 100rpx;
	  margin-bottom: 20rpx;
	  }
	  
	.login-img image{
	  width: 300rpx;
	  height: 300rpx;
	}
	  
	.login-text{
		text-align: center;
		color: #000000;
		font-size: 18px;
		margin-bottom: 20px;
	}  
	
	.btn{
		display: flex;
		justify-content: center;
	}
	
	.loginbtn{
		width: 90%;
		text-align: center;
	}
</style>
