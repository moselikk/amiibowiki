import { defineStore } from 'pinia';
import { config } from '@/settings';

const { listLength } = config;
export const useStore = defineStore('settings', {
  state: () => {
    return {
      show: [],
      listLength,
    };
  },
  // 也可以这样定义
  // state: () => ({ count: 0 })
  actions: {
    UPDATESHOW(value: any) {
      this.show = value;
    },
    LOADEMORE() {
      this.listLength = this.listLength + listLength;
    },
  },
});
