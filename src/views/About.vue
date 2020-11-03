<template>
  <div>
    <h1>This is about</h1>
    <h2>{{ isOK }}</h2>
    <p>{{ randomNumber }}</p>
    <button @click="change">Click</button>
  </div>
</template>

<script lang="ts">
import store from "@/store";
import { defineComponent } from "vue";
import { mapActions, mapState, useStore, createNamespacedHelpers } from "vuex";
export default defineComponent({
  computed: {
    ...mapState({
      isOK: (state: any) => state.custom.isOK,
      randomNumber: (state: any) => state.custom.randomNumber
    })
  },
  methods: {
    change() {
      store.dispatch("custom/changeStatusAction", !this.isOK);
    }
  }
});
</script>

<style scoped></style>
