<script lang="ts">
export default {
  name: "HomeModule",
};
</script>
<script setup lang="ts">
import { computed } from "vue";
import { useFetch } from "@/utils/useFetch";
import settings from "@/settings";
const props = defineProps(["start"]);
const { response, error, retry } = useFetch<{ hitokoto: string }>(
  settings.hitokotoApi
);
const hitokoto = computed(() => {
  return response.value?.hitokoto.slice(-1) === "。"
    ? response.value?.hitokoto.slice(0, -1)
    : response.value?.hitokoto;
});
defineExpose({
  retry,
});
</script>
<template>
  <div v-show="props.start" class="start">
    <h1 v-if="error">Oops! Error encountered: {{ error }}</h1>
    <h1 v-else-if="response">
      {{ hitokoto }}
    </h1>
    <h1 v-else>Loading...</h1>
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
  position: relative;
  h1 {
    display: inline-block;
    width: 40vw;
    margin-bottom: 35px;
    font-weight: normal;
    font-size: 26px;
  }
  img {
    width: 78vw;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
