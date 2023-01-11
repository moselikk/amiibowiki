<script lang="ts">
export default {
  name: "HomeModule",
};
</script>
<script setup lang="ts">
const props = defineProps(["start"]);
</script>
<template>
  <div v-show="props.start" class="start">
    <h1>正因为生来什么都没有，因此我们能拥有一切。</h1>
    <img
      src="https://less-1251975755.cos.ap-beijing.myqcloud.com/amiibowiki/start-img.png"
      alt="start"
    />
  </div>
</template>

<style scoped lang="scss">
.start {
  text-align: center;
  margin-top: 10vh;
  height: 50vh;
  h1 {
    display: inline-block;
    width: 40vw;
    margin-bottom: 35px;
    font-weight: normal;
    font-size: 26px;
  }
  img {
    width: 78vw;
  }
}
</style>
