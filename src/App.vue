<template>
  <div id="app">
    <select v-model="selectSeries" @change="handleSelectSeries">
      <option value="">--请选择一项--</option>
      <option v-for="(_,$index) in orderAmiibo" :key="$index" :value="$index">{{$index}}</option>
    </select>
    <select v-model="selectClass" :disabled="!selectSeries" @change="handleSelectClass">
      <option value="">--请选择一项--</option>
      <option v-for="(_,$index) in series" :key="$index" :value="$index">{{$index}}</option>
    </select>
    <br />
    <input type="text" v-model="search" @keyup="debounce(handleSearch, 600)" />
    <div>
      <img v-for="(item,$index) in show.slice(0,listLength)" :key="item.tail" :src="item.image" :alt="item.name" @click="handleClick($index)">
    </div>
  </div>
</template>

<script>
import request from './utils/request'
export default {
  name: 'App',
  data(){
    return{
      listLength: 6,
      amiibos: [],
      orderAmiibo:{
        amiiboSeries:{},
        gameSeries: {}
      },
      series: null,
      selectSeries: '',
      selectClass: '',
      chosen: [],
      show: [],
      search: ''
    }
  },
  created(){
    
  },
  mounted(){
    // 发请求获取所有amiibo数据
    this.getData()
  },
  methods:{
    // 调用外部封装的axios
    async getData(){
      let response = await request.get('/amiibo/')
      this.amiibos =  await response.amiibo
      this.order()
    },
    // 清洗获取到的数据，备用
    order(){
      for(let i=0; i<this.amiibos.length; i++){
        let rawSeries = this.amiibos[i].amiiboSeries
        let rawGameSeries = this.amiibos[i].gameSeries
        let {amiiboSeries, gameSeries} = this.orderAmiibo
        // 清洗出所有amiiboSeries类别
        if(!amiiboSeries[rawSeries]){ 
          // 初始化amiiboSeries子类目数组
          amiiboSeries[rawSeries] = []
          amiiboSeries[rawSeries].push(this.amiibos[i])
        } else {
          amiiboSeries[rawSeries].push(this.amiibos[i])
        }
        // 清洗出所有gameSeries类别
        if(!gameSeries[rawGameSeries]){ 
          // 初始化gameSeries子类目数组
          gameSeries[rawGameSeries] = []
          gameSeries[rawGameSeries].push(this.amiibos[i])
        } else {
          gameSeries[rawGameSeries].push(this.amiibos[i])
        }
      }
    },
    // 第一个下拉菜单
    handleSelectSeries(){
      // 清除第二下拉菜单状态
      this.selectClass = ''
      // 判断选择的是游戏系列还是amiibo系列
      this.series = this.orderAmiibo[this.selectSeries]
    },
    // 第二个下拉菜单
    handleSelectClass(){
      // 状态清空
      this.search = ''
      // 保存选择的类别
      this.chosen = this.orderAmiibo[this.selectSeries][this.selectClass]
      // 展示所选类别内容
      this.show = this.chosen
    },
    // 卡片点击
    handleClick(index){
      alert(`点击的是第：${index}个，名字是${this.show[index].name}`)
    },
    // 搜索
    handleSearch(){
      // console.log('handleSearch执行了');
      // 清空页面显示状态
      this.show = []
      // 当处于系列选择时搜索内容池为所选系列内容
      if(this.selectClass){
        for(let i=0; i<this.chosen.length; i++) {
          let name = this.chosen[i].name.trim().toLowerCase()
          let search = this.search.trim().toLowerCase().replace(/[^a-z,]/ig, '')
          if(name.match(search) && (search != '')){
            this.show.push(this.chosen[i])
          }
        }
      } else {
        // 直接搜索，内容池为所有amiibo元素
        for(let i=0; i<this.amiibos.length; i++) {
          let name = this.amiibos[i].name.trim().toLowerCase()
          let search = this.search.trim().toLowerCase().replace(/[^a-z,]/ig, '')
          if(name.match(search) && (search != '')){
            this.show.push(this.amiibos[i])
          }
        }
      }
    },
    // 防抖
    debounce(func, delay) {
      let that = this
      let args = arguments
      return function() {
        if(that.timeout){
          clearTimeout(that.timeout)
        }
        that.timeout = setTimeout(() => { 
          func.apply(that, args)
         }, delay)
      }() //需要返回立即执行函数
    }
  },
  components: {}
}
</script>

<style>

</style>
