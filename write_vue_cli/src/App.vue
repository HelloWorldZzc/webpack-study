<template>
  <div>
    <h1 class="title">hello app</h1>
    <home></home>
  </div>
</template>

<script>

import Home from "./home/index.vue"
export default {
  name: "App",
  components:{
    Home
  }

};
</script>

<style>
.title {
  color: pink;
}
</style>
