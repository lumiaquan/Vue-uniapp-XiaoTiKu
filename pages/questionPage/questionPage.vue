<template>
	<view>
		<danxuanpage v-if="danxuan" :number="number" :questionList="questionList" :nextText="nextText" @func="changeQuestion"></danxuanpage>
		<duoxuanpage v-if="duoxuan" :number="number" :questionList="questionList" :nextText="nextText" @func="changeQuestion"></duoxuanpage>
		<panduanpage v-if="panduan" :number="number" :questionList="questionList" :nextText="nextText" @func="changeQuestion"></panduanpage>
		<jiandapage v-if="jianda" :number="number" :questionList="questionList" :nextText="nextText" @func="changeQuestion"></jiandapage>
	</view>
</template>

<script>
	import danxuanpage from '../../components/danxuan.vue'
	import duoxuanpage from '../../components/duoxuan.vue'
	import panduanpage from '../../components/panduan.vue'
	import jiandapage from '../../components/jianda.vue'
	export default {
		onLoad(options) {
			var that = this
			this.tiku = options.tiku
			this.zhuti = options.zhuti
			this.zhangjie = options.zhangjie
			var that = this
			var url = `https://magiskq.top:8081/getQuestion?tiku=${that.tiku}&zhangjie=${that.zhangjie}&zhuti=${that.zhuti}`
			console.log(url)
			uni.request({
				url: url,
				method: 'GET',
				success(res) {
					console.log(res.data)
					that.questionList = res.data
					that.$common.questionList = res.data
					var list = res.data
					var tixing = list[0].tixing
					if (tixing == "danxuan") {
						that.danxuan = true
						that.tixing = "danxuan"
					}
					if (tixing == "duoxuan") {
						that.duoxuan = true
						that.tixing = "duoxuan"
					}
					if (tixing == "panduan") {
						that.panduan = true
						that.tixing = "panduan"
					}
					if (tixing == "jianda") {
						that.jianda = true
						that.tixing = "jianda"
					}
					for (var i = 0; i < that.questionList.length; i++) {
						that.resList.push(0)
					}
				}
			})
		},
		created() {

		},
		data() {
			return {
				nextText: "下一题",
				tiku: "",
				zhuti: "",
				zhangjie: "",
				tixing: "",
				number: 1,
				danxuan: false,
				duoxuan: false,
				panduan: false,
				jianda: false,
				questionList: [],
				danxuanfenshu: 0,
				danxuanzongfen: 0,
				duoxuanfenshu: 0,
				duoxuanzongfen: 0,
				panduanfenshu: 0,
				panduanzongfen: 0,
				jiandafenshu: 0,
				jiandazongfen: 0,
				mypoints: 0,
				zongfen: 0,
				answerList: [],
				resList: [],
				cuotiList: []
			}
		},
		methods: {
			changeQuestion(data) {
				var that = this
				if (data.tixing == 'danxuan') {
					if (data.answer == this.questionList[data.number].rightchoice) {
						this.answerList[data.number] = 1
						this.resList[data.number] = 1
					} else {
						this.answerList[data.number] = 0
						this.resList[data.number] = 0
					}
				}
				if (data.tixing == 'duoxuan') {
					var a = this.questionList[data.number].rightchoices.length
					var b = 0
					for (var i = 0; i < a; i++) {
						if (this.questionList[data.number].rightchoices.includes(data.answer[i])) {
							b++
						}
					}
					if (b == a) {
						this.answerList[data.number] = 1
						this.resList[data.number] = 1
					} else {
						this.answerList[data.number] = 0
						this.resList[data.number] = 0
					}
				}
				if (data.tixing == 'panduan') {
					var answer = ''
					if(data.answer == 1){
						answer = 'right'
					}else{
						answer = 'false'
					}
					if (answer == this.questionList[data.number].judgementanswer) {
						this.answerList[data.number] = 1
						this.resList[data.number] = 1
					} else {
						this.answerList[data.number] = 0
						this.resList[data.number] = 0
					}
				}
				if (data.tixing == 'jianda') {
					this.jiandafenshu += data.answer
					this.resList[data.number] = 1
				}
				if (data.submit && (data.ps == 1)) {
					for (var i = 0; i < this.resList.length; i++) {
						if (this.questionList[i].tixing == "danxuan") {
							if (this.resList[i] == 1) {
								this.danxuanfenshu += 5
							}
							this.danxuanzongfen += 5
						} else if (this.questionList[i].tixing == "duoxuan") {
							if (this.resList[i] == 1) {
								this.duoxuanfenshu += 5
							}
							this.duoxuanzongfen += 5
						} else if (this.questionList[i].tixing == "panduan") {
							if (this.resList[i] == 1) {
								this.panduanfenshu += 5
							}
							this.panduanzongfen += 5
						} else if (this.questionList[i].tixing == "jianda") {
							this.jiandazongfen += 15
						}
					}
					this.zongfen = this.danxuanfenshu + this.duoxuanfenshu + this.panduanfenshu + this.jiandafenshu
					for (var i = 0; i < this.resList.length; i++) {
						if (this.resList[i] == 0) {
							this.cuotiList.push(this.questionList[i]._id)
						}
					}
					console.log(this.cuotiList)
					if(this.cuotiList.length>0){
						var CuotiList = uni.getStorageSync("cuotiList")
						if(CuotiList.length>0){
							for(var i=0;i<CuotiList.length;i++){
								var flag = that.cuotiList.includes(CuotiList[i])
								if(flag == false){
									that.cuotiList.push(CuotiList[i])
								}
							}
							uni.setStorageSync("cuotiList",that.cuotiList)
							uni.request({
								url: 'https://magiskq.top:8081/addCuoti',
								method: 'POST',
								header: {
									'Content-Type': "application/json"
								},
								data: {
									openId: this.$common.userinfo.openId,
									cuotiList: that.cuotiList
								},
								success(res) {
									console.log("上传错题成功！")
								}
							})
						}else{
							uni.request({
								url: 'https://magiskq.top:8081/addCuoti',
								method: 'POST',
								header: {
									'Content-Type': "application/json"
								},
								data: {
									openId: this.$common.userinfo.openId,
									cuotiList: that.cuotiList
								},
								success(res) {
									console.log("上传错题成功！")
								}
							})
						}
					}
					var url =
						`../jiesuanPage/jiesuanPage?danxuanfenshu=${this.danxuanfenshu}&duoxuanfenshu=${this.duoxuanfenshu}&panduanfenshu=${this.panduanfenshu}&jiandafenshu=${this.jiandafenshu}
					&danxuanzongfen=${this.danxuanzongfen}&duoxuanzongfen=${this.duoxuanzongfen}&panduanzongfen=${this.panduanzongfen}&jiandazongfen=${this.jiandazongfen}&zongfen=${this.zongfen}
					&zhuti=${this.questionList[0].zhuti}&zhangjie=${this.questionList[0].zhangjie}`
					this.$common.resList = this.resList
					uni.navigateTo({
						url: url
					})

				} else {
					if (data.ps == 1) {
						if (this.questionList[this.number].tixing == "danxuan") {
							this.danxuan = true
							this.duoxuan = false
							this.panduan = false
							this.jianda = false
							that.tixing = "danxuan"
						}
						if (this.questionList[this.number].tixing == "duoxuan") {
							this.danxuan = false
							this.duoxuan = true
							this.panduan = false
							this.jianda = false
							that.tixing = "duoxuan"
						}
						if (this.questionList[this.number].tixing == "panduan") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = true
							this.jianda = false
							that.tixing = "panduan"
						}
						if (this.questionList[this.number].tixing == "jianda") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = false
							this.jianda = true
							that.tixing = "jianda"
						}
						this.number++
					} else if (data.ps == -1) {
						if (this.questionList[this.number - 2].tixing == "danxuan") {
							this.danxuan = true
							this.duoxuan = false
							this.panduan = false
							this.jianda = false
						}
						if (this.questionList[this.number - 2].tixing == "duoxuan") {
							this.danxuan = false
							this.duoxuan = true
							this.panduan = false
							this.jianda = false
						}
						if (this.questionList[this.number - 2].tixing == "panduan") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = true
							this.jianda = false
						}
						if (this.questionList[this.number - 2].tixing == "jianda") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = false
							this.jianda = true
						}
						this.number--
					}
				}
			}
		},
		components: {
			"danxuanpage": danxuanpage,
			"duoxuanpage": duoxuanpage,
			"panduanpage": panduanpage,
			"jiandapage": jiandapage
		},
		watch: {
			number(val, oldVal) {
				if (val == this.questionList.length) {
					this.nextText = "提交"
				} else {
					this.nextText = "下一题"
				}
			}
		}
	}
</script>

<style>



</style>
