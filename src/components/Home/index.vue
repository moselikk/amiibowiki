<template>
    <div v-show="start" class="start">
      <h1>正因为生来什么都没有，因此我们能拥有一切。</h1>
      <img src="../../assets/start-img.jpg" alt="start">
  </div>
</template>

<script>
  export default {
    name: 'HomeModule',
    props: ['start']
  }
</script>

<style lang="scss" scoped>
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
</style>