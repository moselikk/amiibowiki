<script lang="ts">
export default {
  name: "AmiiboList",
};
</script>
<script setup lang="ts">
import { reactive, watch, computed, toRefs } from "vue";
import AmiiboDialog from "@/components/Dialog/index.vue";
import { useStore } from "@/store/useStore";
const emit = defineEmits(["handleStart"]);
const settings = useStore();
const data = reactive({
  without: false,
  btnShow: false,
  dialogShow: false,
  amiiboInfo: {},
});
const { without, btnShow, dialogShow, amiiboInfo } = toRefs(data);

// Type
interface IAmiibo {
  amiiboSeries: string;
  character: string;
  gameSeries: string;
  head: string;
  image: string;
  name: string;
  release: object;
  tail: string;
  type: string;
}

const show = computed<IAmiibo[]>(() => {
  return settings.show;
});
const listLength = computed(() => {
  return settings.listLength;
});

watch(show, (show) => {
  if (show.length) emit("handleStart");
  if (show.length > listLength.value) {
    data.btnShow = true;
  } else {
    data.btnShow = false;
  }
});
watch(listLength, (listLength) => {
  if (show.value.length < listLength) {
    data.btnShow = false;
  }
});

// 卡片点击显示详情页
const handleClick = (index: number) => {
  data.amiiboInfo = show.value[index];
  data.dialogShow = true;
  // 阻止背景页面滚动
  (document.querySelector("body") as HTMLBodyElement).style.overflow = "hidden";
};
// 关闭详情页
const handleShade = () => {
  data.dialogShow = false;
  // 释放背景页面滚动
  (document.querySelector("body") as HTMLBodyElement).style.overflow = "";
};
// 加载更多
const loadMore = () => {
  settings.LOADEMORE();
};
</script>
<template>
  <div class="listOuter">
    <div class="shade" v-if="dialogShow" @click="handleShade">
      <AmiiboDialog :amiiboInfo="amiiboInfo"></AmiiboDialog>
    </div>
    <div class="list">
      <div v-show="without">没有相关数据</div>
      <div
        v-for="(item, $index) in show ? show.slice(0, listLength) : []"
        class="img-list"
        :key="item.tail"
        @click="handleClick($index)"
      >
        <!--:src="`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${item.image.slice(65)}`"-->
        <img
          :key="item.tail"
          :alt="item.name"
          :src="`https://less-1251975755.cos.ap-beijing.myqcloud.com/images/${item.image.slice(
            65
          )}`"
        />
      </div>
    </div>
    <button @click="loadMore" v-show="btnShow">加载更多</button>
  </div>
</template>

<style scoped lang="scss">
.listOuter {
  // margin-bottom: 30px;
  background-color: #fafafa;
  padding-bottom: calc(8vh - 10px);
}
.shade {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 100;
}
.list {
  margin: 30px 10px;
  margin-bottom: 0;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 0px;
  gap: 30px;
  .img-list {
    // width: 200px;
    // margin: 10;
    // border: 8px solid #000;
    background-color: #fff;
    width: 200px;
    height: 280px;
    border: 20px solid #fff;
    box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.3);
    border-radius: 25px;
    cursor: pointer;
    position: relative;
  }
  img {
    height: 100%;
    // width: 100%;
    // object-fit: contain;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
}
button {
  margin-top: 20px;
  width: 80px;
  height: 30px;
  outline: none;
  border-radius: 30px;
  border: none;
  background-color: rgba(128, 128, 128, 0.3);
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15),
    inset 0px 2px 2px rgba(0, 0, 0, 0.35);
  cursor: pointer;
}
</style>
