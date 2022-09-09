<template>
    <div class="listOuter">
      <div class="list">
        <div v-show="without">没有相关数据</div>
        <div 
          class="img-list" v-for="(item,$index) in (show ? show.slice(0,listLength) : [])" 
          :key="item.tail"
          @click="handleClick($index)"
          >
          <img 
            :key="item.tail" 
            :src="`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${item.image.slice(65)}`" 
            :alt="item.name" 
            
          />
        </div>
      </div>
      <button @click="loadMore" v-show="btnShow">加载更多</button>
    </div>
</template>

<script>
  export default {
    name: 'AmiiboList',
    data(){
      return{
        listLength: 8,
        without: false,
        btnShow: false

      }
    },
    mounted(){
      // console.log(this.$store.state.count);
    },
    watch:{
      show: function(){
        this.$emit('handleStart')
        if(this.show.length > this.listLength){
          this.btnShow = true
          console.log('执行了');
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
      // 卡片点击
      handleClick(index){
        alert(`点击的是第：${index}个，名字是${this.show[index].name}`)
      },
      loadMore(){
        this.listLength += 8
      }
    }
  }
</script>

<style lang="scss" scoped>
.listOuter{
  margin-bottom: 30px;
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