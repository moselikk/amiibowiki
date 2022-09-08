<template>
  <div id="app">
    <img src="./assets/Logo.webp" alt="" class="logo" />
    <div class="select-boox">
      <select v-model="selectSeries" @change="handleSelectSeries">
      <option value="">--请选择一项--</option>
      <option v-for="(_,$index) in orderAmiibo" :key="$index" :value="$index">{{$index}}</option>
    </select>
    <select v-model="selectClass" :disabled="!selectSeries" @change="handleSelectClass">
      <option value="">--请选择一项--</option>
      <option v-for="(_,$index) in series" :key="$index" :value="$index">{{$index}}</option>
    </select>
    </div>
    <input class="search" type="text" v-model="search" @keyup="debounce(handleSearch, 600)" />
    <div v-show="start" class="start">
      <h1>正因为生来什么都没有，因此我们能拥有一切。</h1>
      <img src="./assets/start-img.jpg" alt="start">
    </div>
    <div v-show="without">没有相关数据</div>
    <AmiiboList :show="show" @handleStart.once="handleStart"></AmiiboList>
    <footer>
      <p>
        Code by <a href="https://moselikk.com">moselikk</a> data from <a href="https://moselikk.com">Amiiboapi</a> The image is copyright <a href="https://moselikk.com">Nintendo</a>
      </p>
      <p>Check out the project in the <a href="https://moselikk.com">Github</a></p>
    </footer>
  </div>
</template>

<script>
import Vue from 'vue'
import request from './utils/request'
import AmiiboList from './components/List'
export default {
  name: 'App',
  data(){
    return{
      start: true,
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
      search: '',
      without: false
    }
  },
  mounted(){
    // 发请求获取所有amiibo数据
    this.getData()
  },
  watch:{
    show: function(show) {
      if(!show || (show.length == 0) || (show.length==0 && !this.search) || (!this.selectClass && !this.search) || (!this.selectSeries && !this.search)){
        this.without = true
      } else {
        this.without = false
      }
    },
/*     selectSeries: function(selectSeries) {
      if(!selectSeries && !this.search){
        this.show = []
        this.without = true
      } else {
        this.without = false
      }
    } */
  },
  methods:{
    handleStart(){
      this.start = false
    },
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
          Vue.set(amiiboSeries,rawSeries,[])
          amiiboSeries[rawSeries].push(this.amiibos[i])
        } else {
          amiiboSeries[rawSeries].push(this.amiibos[i])
        }
        // 清洗出所有gameSeries类别
        if(!gameSeries[rawGameSeries]){ 
          // 初始化gameSeries子类目数组
          Vue.set(gameSeries,rawGameSeries,[])
          // gameSeries[rawGameSeries] = []
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
  components: { AmiiboList }
}
</script>

<style scope lang="scss">
// 选择部分样式
.select-boox{
  select{
    background: #D9D9D9;
    text-align: center;
    outline: none;
    width: 130px;
    height: 30px;
    border-radius: 30px;
    margin: 0 10px;
    box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15), inset 0px 2px 2px rgba(0, 0, 0, 0.35);
    border: 0;
  }
}
.search{
  margin-top: 10px;
  text-align: center;
  box-sizing: border-box;
  width: 280px;
  height: 30px;
  outline: none;
  border-radius: 30px;
  background: #D9D9D9;
  padding: 0 15px;
  border: 0;
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15), inset 0px 2px 2px rgba(0, 0, 0, 0.35);
}


#app{
  text-align: center;
  .logo{
    width: 300px;
    display: inline-block;
  }
  .start{
    text-align: center;
    margin-top: 60px;
    h1{
      display: inline-block;
      width: 40vw;
      margin-bottom: 50px;
      font-weight: normal;
    }
    img{
      width: 92vw;
    }
  }
  footer{
    font-size: 13px;
    a{
      text-decoration: none;
      font-weight: bold;
      color: #000;
      &:hover{
        padding: 0 8px;
        background-color: rgba(128, 128, 128, .3);
        border-radius: 8px;
        box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15), inset 0px 2px 2px rgba(0, 0, 0, 0.35);
      }
    }
  }
}
</style>
