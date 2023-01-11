<script lang="ts">
export default {
  name: "AmiiboSelect",
};
</script>
<script setup lang="ts">
import { onMounted, reactive, computed, toRefs, ref } from "vue";
import request from "@/utils/request";
import { useStore } from "@/store/useStore";
const settings = useStore();

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
interface IObj {
  [key: string]: IAmiibo[];
}
interface IOrderAmiibo {
  amiiboSeries: IObj;
  gameSeries: IObj;
}

const data = reactive({
  start: true,
  amiibos: [] as IAmiibo[],
  orderAmiibo: {
    amiiboSeries: {},
    gameSeries: {},
  } as IOrderAmiibo,
  series: null as unknown as IObj,
  selectSeries: "" as keyof IOrderAmiibo,
  selectClass: "",
  chosen: [] as IAmiibo[],
  search: "",
});
const { orderAmiibo, series, selectSeries, selectClass, search, amiibos } =
  toRefs(data);

const searchRef = ref();

const show = computed(() => {
  return settings.show;
});

// 调用外部封装的axios
const getData = async () => {
  let response = (await request.get("/amiibo/")) as { amiibo: [] };
  data.amiibos = response.amiibo;
  order();
};
// 清洗获取到的数据，备用
const order = () => {
  for (let i = 0; i < data.amiibos.length; i++) {
    let rawSeries = data.amiibos[i].amiiboSeries as string;
    let rawGameSeries = data.amiibos[i].gameSeries;
    // 清洗出所有amiiboSeries类别
    if (!data.orderAmiibo.amiiboSeries[rawSeries]) {
      // 初始化amiiboSeries子类目数组
      data.orderAmiibo.amiiboSeries[rawSeries] = [];
      data.orderAmiibo.amiiboSeries[rawSeries].push(data.amiibos[i]);
    } else {
      data.orderAmiibo.amiiboSeries[rawSeries].push(data.amiibos[i]);
    }
    // 清洗出所有gameSeries类别
    if (!data.orderAmiibo.gameSeries[rawGameSeries]) {
      // 初始化gameSeries子类目数组
      data.orderAmiibo.gameSeries[rawGameSeries] = [];
      // gameSeries[rawGameSeries] = []
      data.orderAmiibo.gameSeries[rawGameSeries].push(data.amiibos[i]);
    } else {
      data.orderAmiibo.gameSeries[rawGameSeries].push(data.amiibos[i]);
    }
  }
};
// 第一个下拉菜单
const handleSelectSeries = () => {
  // 清除第二下拉菜单状态
  data.selectClass = "";
  // 判断选择的是游戏系列还是amiibo系列
  data.series = data.orderAmiibo[data.selectSeries];
};
// 第二个下拉菜单
const handleSelectClass = () => {
  // 状态清空
  data.search = "";
  // 保存选择的类别
  data.chosen = data.orderAmiibo[data.selectSeries][data.selectClass];
  // 展示所选类别内容
  settings.UPDATESHOW(data.chosen);
  searchRef.value.placeholder = data.selectClass + " " + data.chosen.length;
};
// 搜索
const handleSearch = () => {
  // console.log('handleSearch执行了');
  // 当处于系列选择时搜索内容池为所选系列内容
  let tempShow = [] as any;
  let search = data.search.replace(/[^a-z,]/gi, "").toLowerCase();
  if (data.selectClass) {
    for (let i = 0; i < data.chosen.length; i++) {
      let name = data.chosen[i].name.trim().toLowerCase();
      if (name.match(search) && search != "") {
        tempShow.push(data.chosen[i]);
      }
    }
  } else {
    // 直接搜索，内容池为所有amiibo元素
    for (let i = 0; i < data.amiibos.length; i++) {
      let name = data.amiibos[i].name.trim().toLowerCase();
      if (name.match(search) && search != "") {
        tempShow.push(data.amiibos[i]);
      }
    }
  }
  settings.UPDATESHOW(tempShow);
};
onMounted(() => {
  // 发请求获取所有amiibo数据
  getData();
});
</script>
<template>
  <div>
    <div class="select-boox">
      <select v-model="selectSeries" @change="handleSelectSeries">
        <option value="">--请选择一项--</option>
        <option
          v-for="(_, $index) in orderAmiibo"
          :key="$index"
          :value="$index"
        >
          {{ $index }}
        </option>
      </select>
      <select
        v-model="selectClass"
        :disabled="!selectSeries"
        @change="handleSelectClass"
      >
        <option value="">--请选择一项--</option>
        <option v-for="(_, $index) in series" :key="$index" :value="$index">
          {{ $index }}
        </option>
      </select>
    </div>
    <input
      class="search"
      type="text"
      v-model="search"
      @keyup="handleSearch"
      :placeholder="`All amiibos ${amiibos.length}`"
      ref="searchRef"
    />
  </div>
</template>

<style scoped lang="scss">
// 选择部分样式
.select-boox {
  select {
    background: #d9d9d9;
    text-align: center;
    outline: none;
    width: 130px;
    height: 30px;
    border-radius: 30px;
    margin: 0 10px;
    box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15),
      inset 0px 2px 2px rgba(0, 0, 0, 0.35);
    border: 0;
    cursor: pointer;
  }
}
.search {
  margin-top: 10px;
  text-align: center;
  box-sizing: border-box;
  width: 280px;
  height: 30px;
  outline: none;
  border-radius: 30px;
  background: #d9d9d9;
  padding: 0 15px;
  border: 0;
  box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15),
    inset 0px 2px 2px rgba(0, 0, 0, 0.35);
}
</style>
