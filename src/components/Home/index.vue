<script lang="ts">
export default {
  name: "HomeModule",
};
</script>
<script setup lang="ts">
import { computed, watch } from "vue";
import { useFetch } from "@/utils/useFetch";
import settings from "@/settings";
import CryptoJS from "crypto-js";
const props = defineProps(["start"]);
const { response, error, retry } = useFetch<{ hitokoto: string; from: string }>(
  settings.hitokotoApi
);

function truncate(q: any) {
  var len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

var appKey = "";
var key = ""; //注意：暴露appSecret，有被盗用造成损失的风险
var salt = new Date().getTime();
var curtime = Math.round(new Date().getTime() / 1000);
var query = "您好，欢迎再次使用有道智云文本翻译API接口服务";
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
var from = "zh-CHS";
var to = "en";
var str1 = appKey + truncate(query) + salt + curtime + key;
var vocabId = "您的用户词表ID";
//console.log('---',str1);

var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
let enData = {
  q: query,
  appKey: appKey,
  salt: salt,
  from: from,
  to: to,
  sign: sign,
  signType: "v3",
  curtime: curtime,
  vocabId: vocabId,
};
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
    <br />
    <div class="from">{{ response?.from }}</div>
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
    width: 55vw;
    margin-bottom: 15px;
    font-weight: normal;
    font-size: 26px;
  }
  .from {
    display: inline-block;
    padding-top: 10px;
    font-size: 14px;
    text-align: center;
    border-top: 1px solid rgba(128, 128, 128, 0.3);
  }
  img {
    width: 78vw;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    filter: drop-shadow(-10px 10px 4px rgba(0, 0, 0, 0.81));
  }
}
</style>
