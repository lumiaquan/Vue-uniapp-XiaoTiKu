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
	import app from '../../App.vue'
	export default {
		onLoad(options) {
			this.$common.questionList = this.questionList
			this.tiku = options.tiku
			this.zhuti = options.zhuti
			this.zhangjie = options.zhangjie
			for(var i=0;i<that.questionList.length;i++){
				that.resList.push(0)
			}
			var that = this
			uni.request({
				url: 'http://127.0.0.1:8081/getQuestion', 
				method: 'GET',
				data: {
					tiku: that.tiku,
					zhuti: that.zhuti,
					zhangjie: that.zhangjie
				},
				success: function(res) {
					that.questionList = res.data
					that.$common.questionList = res.data
					var list = res.data
					var tixing = list[0].tixing
					if(tixing == "danxuan"){
						that.danxuan = true
						that.tixing = "danxuan"
					}
					if(tixing == "duoxuan"){
						that.duoxuan = true
						that.tixing = "duoxuan"
					}
					if(tixing == "panduan"){
						that.panduan = true
						that.tixing = "panduan"
					}
					if(tixing == "jianda"){
						that.jianda = true
						that.tixing = "jianda"
					}
					for(var i=0;i<that.questionList.length;i++){
						that.resList.push(0)
					}
				}
			});
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
				danxuan: true,
				duoxuan: false,
				panduan: false,
				jianda: false,
				questionList: [
					{
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
						jiexi: '111222333444555666',
						_id: '123'
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
						jiexi: '111222333444555666',
						_id: '1234'
					},
					{
						content: "卡尔·马克思是马克思主义的创始人之一",
						tixing: 'panduan',
						judgementanswer: 'right',
						number: 3,
						jiexi: '111222333444555666',
						_id: '12345'
					}
				],
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
				if(data.tixing == 'danxuan'){
					if(data.answer == this.questionList[data.number].rightchoice){
						this.answerList[data.number] = 1
						this.resList[data.number] = 1
					}else{
						this.answerList[data.number] = 0
						this.resList[data.number] = 0
					}
				}
				if(data.tixing == 'duoxuan'){
					var a = this.questionList[data.number].rightchoices.length
					var b = 0
					for(var i=0;i<a;i++){
						if(this.questionList[data.number].rightchoices.includes(data.answer[i])){
							b++
						}					
					}
					if(b == a){
						this.answerList[data.number] = 1
						this.resList[data.number] = 1
					}else{
						this.answerList[data.number] = 0
						this.resList[data.number] = 0
					}
				}
				if(data.tixing == 'panduan'){
					if(data.answer == this.questionList[data.number].judgementanswer){
						this.answerList[data.number] = 1
						this.resList[data.number] = 1
					}else{
						this.answerList[data.number] = 0
						this.resList[data.number] = 0
					}
				}
				if(data.tixing == 'jianda'){
					this.jiandafenshu += data.answer
					this.resList[data.number] = 1
				}
				if(data.submit&&(data.ps == 1)){
					for(var i=0;i<this.resList.length;i++){
						if(this.questionList[i].tixing == "danxuan"){
							if(this.resList[i] == 1){
								this.danxuanfenshu+=5
							}
							this.danxuanzongfen+=5
						}else if(this.questionList[i].tixing == "duoxuan"){
							if(this.resList[i] == 1){
								this.duoxuanfenshu+=5
							}
							this.duoxuanzongfen+=5
						}else if(this.questionList[i].tixing == "panduan"){
							if(this.resList[i] == 1){
								this.panduanfenshu+=5
							}
							this.panduanzongfen+=5
						}else if(this.questionList[i].tixing == "jianda"){
							this.jiandazongfen+=15
						}
					}
					this.zongfen = this.danxuanfenshu+this.duoxuanfenshu+this.panduanfenshu+this.jiandafenshu
					for(var i=0;i<this.resList.length;i++){
						if(this.resList[i] == 0){
							this.cuotiList.push(this.questionList[i]._id)
						}
					}
					console.log(this.cuotiList)
					uni.request({
						url: 'http://127.0.0.1:8081/addCuoti',
						method: 'POST',
						header: {
							'Content-Type': "application/json"
						},
						data: {
							openId: app.globalData.userinfo.openId,
							cuotiList: that.cuotiList
						},
						success(res) {
							console.log("上传错题成功！")
						}
					})
					var url = `../jiesuanPage/jiesuanPage?danxuanfenshu=${this.danxuanfenshu}&duoxuanfenshu=${this.duoxuanfenshu}&panduanfenshu=${this.panduanfenshu}&jiandafenshu=${this.jiandafenshu}
					&danxuanzongfen=${this.danxuanzongfen}&duoxuanzongfen=${this.duoxuanzongfen}&panduanzongfen=${this.panduanzongfen}&jiandazongfen=${this.jiandazongfen}&zongfen=${this.zongfen}
					&zhuti=${this.questionList[0].zhuti}&zhangjie=${this.questionList[0].zhangjie}`
					this.$common.resList = this.resList
					uni.navigateTo({
						url: url
					})
					
				}else{
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
		components:{
			"danxuanpage" : danxuanpage,
			"duoxuanpage" : duoxuanpage,
			"panduanpage" : panduanpage,
			"jiandapage" : jiandapage
		},
		watch:{
			number(val,oldVal){
				if(val == this.questionList.length){
					this.nextText = "提交"
				}else{
					this.nextText = "下一题"
				}
			}
		}
	}
</script>

<style>
	
	
	
</style>
