<template>
    <div>
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
    props: ['show'],
    data(){
      return{
        listLength: 8
      }
    },
    mounted(){
      console.log(this.show);
    },
    watch:{show(){
      this.$emit('handleStart')
    }},
    methods:{
          // 卡片点击
    handleClick(index){
      alert(`点击的是第：${index}个，名字是${this.show[index].name}`)
    }
    }
  }
</script>

<style lang="scss" scoped>

</style>