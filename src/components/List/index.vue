<template>
    <div class="list">
      <div v-show="without">没有相关数据</div>
      <img v-for="(item,$index) in (show ? show.slice(0,listLength) : [])"
        :key="item.tail" 
        :src="item.image" 
        :alt="item.name" 
        @click="handleClick($index)"
      >
    </div>
</template>

<script>
  export default {
    name: 'AmiiboList',
    data(){
      return{
        listLength: 8,
        without: false

      }
    },
    mounted(){
      // console.log(this.$store.state.count);
    },
    watch:{
      show: function(){
        this.$emit('handleStart')
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
    }
  }
</script>

<style lang="scss" scoped>
.list{
  min-height: 60vh;
  img{
    width: 200px;
    margin: 10;
  }
}
</style>