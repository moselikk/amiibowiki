<template>
  <div class="dialog" @scroll.stop.prevent>
    <img :src="amiiboInfo.image" :alt="amiiboInfo.name">
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