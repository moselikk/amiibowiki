<template>
  <div class="dialog" @scroll.stop.prevent>
    <img :src="`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${amiiboInfo.image.slice(65)}`" :alt="amiiboInfo.name">
  </div>
</template>

<script>
  export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: 'Dialog',
    props:['amiiboInfo']

  }
</script>

<style lang="scss" scoped>
.dialog{
  width: 300px;
  height: 500px;
  position:fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #bfa;
}
</style>