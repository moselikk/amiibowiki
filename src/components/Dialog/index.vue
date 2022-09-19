<template>
  <div class="dialog" @scroll.stop.prevent>
    <img :src="amiiboInfo.image" :alt="amiiboInfo.name">
    <p>{{amiiboInfo.name}}</p>
    <p>gameSeries: {{amiiboInfo.gameSeries}}</p>
    <p>type: {{amiiboInfo.type}}</p>
    <ul>
      <p>release</p>
      <li v-for="(_, $index) in amiiboInfo.release" :key="$index">{{$index}}: {{amiiboInfo.release[$index]}}</li>
    </ul>
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
  padding:30px;
  position:fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #bfa;
  border-radius: 30px;
  img{
    height: 80%;
  }
  ul{
    li{
      list-style: none;
    }
  }
}
</style>