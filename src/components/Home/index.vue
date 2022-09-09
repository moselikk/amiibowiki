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
    margin-top: 10vh;
    height: 50vh;
    h1{
      display: inline-block;
      width: 40vw;
      margin-bottom: 35px;
      font-weight: normal;
      font-size: 26px;
    }
    img{
      width: 78vw;
    }
  }
</style>