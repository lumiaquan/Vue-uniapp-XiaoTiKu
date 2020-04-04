<template>
	<view>
		<danxuanpage v-if="danxuan" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></danxuanpage>
		<duoxuanpage v-if="duoxuan" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></duoxuanpage>
		<panduanpage v-if="panduan" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></panduanpage>
		<jiandapage v-if="jianda" :questionList="questionList" :number="number" :qNumber="qNumber" :tag="tag" :nextText="nextText" :jiexiTag="jiexiTag" @func="changeQuestion"></jiandapage>
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
			this.tag = options.tag
			if(options.tag == "l"){
				this.questionList = this.$common.falseQ
			}else{
				this.questionList = this.$common.questionList
			}
			if(this.questionList[0].tixing == 'danxuan'){
				that.danxuan = true
			}
			if(this.questionList[0].tixing == 'duoxuan'){
				that.duoxuan = true
			}
			if(this.questionList[0].tixing == 'panduan'){
				that.panduan = true
			}
			if(this.questionList[0].tixing == 'jianda'){
				that.jianda = true
			}
			this.number = this.questionList[0].number
			if(this.questionList.length>1){
				that.nextText = "下一题"
			}else{
				that.nextText = "无"
			}
		},
		data() {
			return {
				tag: "",
				danxuan: false,
				duoxuan: false,
				panduan: false,
				jianda: false,
				questionList: [],
				number: 0,
				qNumber: 0,
				nextText: "",
				jiexiTag: 1
			}
		},
		methods: {
			changeQuestion (data){
				var that = this
				if (data.ps == 1) {
					this.qNumber++
					this.number = this.questionList[this.qNumber].number
					if (this.questionList[this.qNumber].tixing == "danxuan") {
						this.danxuan = true
						this.duoxuan = false
						this.panduan = false
						this.jianda = false
						that.tixing = "danxuan"
					}
					if (this.questionList[this.qNumber].tixing == "duoxuan") {
						this.danxuan = false
						this.duoxuan = true
						this.panduan = false
						this.jianda = false
						that.tixing = "duoxuan"
					}
					if (this.questionList[this.qNumber].tixing == "panduan") {
						this.danxuan = false
						this.duoxuan = false
						this.panduan = true
						this.jianda = false
						that.tixing = "panduan"
					}
					if (this.questionList[this.qNumber].tixing == "jianda") {
						this.danxuan = false
						this.duoxuan = false
						this.panduan = false
						this.jianda = true
						that.tixing = "jianda"
					}
				}else if (data.ps == -1) {
						if (this.questionList[this.qNumber - 1].tixing == "danxuan") {
							this.danxuan = true
							this.duoxuan = false
							this.panduan = false
							this.jianda = false
						}
						if (this.questionList[this.qNumber - 1].tixing == "duoxuan") {
							this.danxuan = false
							this.duoxuan = true
							this.panduan = false
							this.jianda = false
						}
						if (this.questionList[this.qNumber - 1].tixing == "panduan") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = true
							this.jianda = false
						}
						if (this.questionList[this.qNumber - 1].tixing == "jianda") {
							this.danxuan = false
							this.duoxuan = false
							this.panduan = false
							this.jianda = true
						}
						this.qNumber--
						this.number = this.questionList[this.qNumber].number
					}
			}
		},
		components:{
			"danxuanpage" : danxuanpage,
			"duoxuanpage" : duoxuanpage,
			"panduanpage" : panduanpage,
			"jiandapage" : jiandapage
		}
	}
</script>

<style>

</style>
