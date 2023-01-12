<script setup lang="ts">
import AmiiboList from "@/components/List/index.vue";
import AmiiboSelect from "@/components/Select/index.vue";
import HomeModule from "@/components/Home/index.vue";
import { reactive, toRefs, ref } from "vue";
import { debounce } from "lodash-es";
const data = reactive({
  start: true,
  amiibos: [],
  orderAmiibo: {
    amiiboSeries: {},
    gameSeries: {},
  },
  series: null,
  selectSeries: "",
  selectClass: "",
  chosen: [],
  show: [],
  search: "",
  without: false,
});
const { start } = toRefs(data);
const amiiboSelect = ref();
const homeModule = ref();
const handleStart = () => (data.start = false);
const resetStatus = debounce(
  () => {
    amiiboSelect.value.resetSelectStatus();
    homeModule.value.retry();
    data.start = true;
  },
  300,
  { leading: true }
);
</script>

<template>
  <div id="app">
    <img
      src="https://less-1251975755.cos.ap-beijing.myqcloud.com/amiibowiki/Logo.webp"
      alt="Amiibowiki"
      class="logo"
      @click="resetStatus"
    />
    <AmiiboSelect ref="amiiboSelect"></AmiiboSelect>
    <HomeModule :start="start" ref="homeModule"></HomeModule>
    <AmiiboList @handleStart="handleStart"></AmiiboList>
    <footer>
      <p :class="{ line: !start }">
        Code by <a href="https://moselikk.com">moselikk</a> data from
        <a href="https://amiiboapi.com">Amiiboapi</a> The image is copyright
        <a href="https://www.nintendo.com/amiibo/">Nintendo</a>
      </p>
      <p>
        Check out the project in the
        <a href="https://github.com/moselikk">Github</a>
      </p>
    </footer>
  </div>
</template>

<style scoped lang="scss">
#app {
  background-color: #fafafa;
  height: 100vh;
  text-align: center;
  margin-right: 10px;
  .logo {
    width: 300px;
    height: 105px;
    display: inline-block;
    cursor: pointer;
    margin-top: 10px;
  }

  footer {
    font-size: 13px;
    padding-top: calc(8vh - 10px);
    padding-bottom: 2vh;
    background-color: #fafafa;
    position: relative;

    a {
      text-decoration: none;
      font-weight: bold;
      color: #000;
      /*
      &:hover{
        padding: 0 8px;
        background-color: rgba(128, 128, 128, .3);
        box-shadow: inset 0px 2px 0px rgba(255, 255, 255, 0.15), inset 0px 2px 2px rgba(0, 0, 0, 0.35);
        border-radius: 8px;
      }
      */
    }
    .line::before {
      content: "";
      position: absolute;
      top: calc(8vh - 25px);
      left: calc(50% - 15em);
      width: 30em;
      height: 1px;
      background-color: rgba(128, 128, 128, 0.3);
    }
  }
}
</style>
