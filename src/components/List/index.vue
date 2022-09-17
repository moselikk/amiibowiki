<template>
    <div class="listOuter">
      <div class="shade" v-if="dialogShow" @click="handleShade">
        <Dialog :amiiboInfo="amiiboInfo"></Dialog>
      </div>
      <div class="list">
        <div v-show="without">没有相关数据</div>
        <div 
          class="img-list" v-for="(item,$index) in (show ? show.slice(0,listLength) : [])" 
          :key="item.tail"
          @click="handleClick($index)"
          >
          <!--:src="`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${item.image.slice(65)}`"-->
          <img 
            :key="item.tail"
            :alt="item.name" 
            :src="item.image"
          />
        </div>
      </div>
      <button @click="loadMore" v-show="btnShow">加载更多</button>
    </div>
</template>

<script>
import Dialog from '../Dialog'
export default {
  name: 'AmiiboList',
  data(){
    return{
      // 默认显示卡片数量
      listLength: 10,
      without: false,
      btnShow: false,
      dialogShow: false,
      amiiboInfo: {}
    }
  },
  watch:{
    show: function(){
      this.$emit('handleStart')
      if(this.show.length > this.listLength){
        this.btnShow = true
      } else {
        this.btnShow = false
      }
    },
    listLength: function(){
      if(this.show.length < this.listLength){
        this.btnShow = false
      }
    }
  },
  computed:{
    show(){
      return this.$store.state.show
    }
  },
  methods:{
    // 卡片点击显示详情页
    handleClick(index){
      this.amiiboInfo = this.show[index]
      this.dialogShow = true
      // 阻止背景页面滚动
      document.querySelector('body').style.overflow = 'hidden'
    },
    // 关闭详情页
    handleShade(){
      this.dialogShow = false
      // 释放背景页面滚动
      document.querySelector('body').style.overflow = ''
    },
    // 加载更多
    loadMore(){
      this.listLength += 10
    }
  },
  components:{ Dialog }
}
</script>

<style lang="scss" scoped>
.listOuter{
  margin-bottom: 30px;
}
.shade{
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
}
.list{
  margin: 30px 10px;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content:center;
  align-items: center;
  padding: 0px;
  gap: 30px;
  .img-list{
    // width: 200px;
    // margin: 10;
    // border: 8px solid #000;
    width: 200px;
    height: 280px;
    border: 20px solid #FFFFFF;
    box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    cursor: pointer;
  }
  img{
    height: 100%;
  }
}
button{
  margin-top: 20px;
  width: 80px;
  height: 30px;
  outline: none;
  border-radius: 30px;
  border: none;
  background-color: rgba(128, 128, 128, .3);
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15), inset 0px 2px 2px rgba(0, 0, 0, 0.35);
  cursor: pointer;
}
</style>