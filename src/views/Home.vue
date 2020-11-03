<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <todo-list></todo-list>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TodoList from "../components/TodoList.vue";
@Options({
  components: {
    TodoList
  }
})
export default class Home extends Vue {}
</script>
