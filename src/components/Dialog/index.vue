<script lang="ts">
export default {
  name: "AmiiboDialog",
};
</script>
<script setup lang="ts">
import { api, config } from '@/settings';
import { imgSrc } from '@/utils/submethod'

defineProps(["amiiboInfo"]);

</script>
<template>
  <div class="dialog" :class="amiiboInfo.type === 'Card' ? 'padding-30' : ''" @click.stop.prevent>
    <img class="dialog-img" :src="imgSrc(amiiboInfo.image)" :alt="amiiboInfo.name" />
    <div class="information">
      <div class="name">{{ amiiboInfo.name }}</div>
      <div class="text-row"><span class="label">GameSeries:</span> <span>{{ amiiboInfo.gameSeries }}</span></div>
      <div class="text-row"><span class="label">Type:</span><span>{{ amiiboInfo.type }}</span> </div>

      <div class="text-row"><span class="label">Release:</span></div>
      <div v-for="(_, $index) in amiiboInfo.release" :key="$index">
        {{ $index }}: {{ amiiboInfo.release[$index] }}
      </div>

    </div>
  </div>
</template>

<style scoped lang="scss">
.dialog {
  display: flex;
  box-shadow: 4px 4px 10px 2px rgba(0, 0, 0, 0.3);
  border-radius: 25px;
  padding: 48px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fafafa;
  border-radius: 30px;
  cursor: auto;

  .dialog-img {
    height: 50vh;
  }

  .information {
    text-align: start;
    padding-left: 60px;
    width: 300px;
    color: #333333;

    .name {
      font-size: 26px;
      font-weight: bold;
    }

    .text-row {
      height: 30px;
      line-height: 30px;
    }

    .label {
      color: #999999;
      font-size: 16px;
      margin-right: 8px;
    }
  }


}

.padding-30 {
  padding: 30px;
}
</style>
