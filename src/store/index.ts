import { createStore } from "vuex";

import todo from "@/store/todo";
import custom from "@/store/custom";

export default createStore({
  modules: {
    todo,
    custom,
  },
});
