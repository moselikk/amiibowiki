<script lang="ts">
export default {
  name: "AmiiboDialog",
};
</script>
<script setup lang="ts">
defineProps(["amiiboInfo"]);
</script>
<template>
  <div class="dialog" @scroll.stop.prevent>
    <img
      :src="`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${amiiboInfo.image.slice(
        65
      )}`"
      :alt="amiiboInfo.name"
    />
    <p>{{ amiiboInfo.name }}</p>
    <p>gameSeries: {{ amiiboInfo.gameSeries }}</p>
    <p>type: {{ amiiboInfo.type }}</p>
    <ul>
      <p>release</p>
      <li v-for="(_, $index) in amiiboInfo.release" :key="$index">
        {{ $index }}: {{ amiiboInfo.release[$index] }}
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  // border: 20px solid #FFFFFF;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  padding: 30px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 30px;
  img {
    height: 80%;
  }
  ul {
    li {
      list-style: none;
    }
  }
}
</style>
