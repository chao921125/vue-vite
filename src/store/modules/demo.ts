declare interface IDemo {
  id: number;
  name: string;
}

import { defineStore } from "pinia";

export const useDemo = defineStore("demo", {
  state: () => {
    return {
      demo: {
        id: 0,
        name: "",
      },
    };
  },
  getters: {
    getDemoById: (state) => state.demo.id + 1,
    getDemo(): IDemo {
      return this.demo;
    },
  },
  actions: {
    setDemo(data) {
      this.demo = data;
    },
  },
});
