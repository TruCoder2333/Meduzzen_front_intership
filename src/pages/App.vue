<template>
  <HelloWorld msg="Hello mentor"/>
</template>

<script>
import HelloWorld from '/app/src/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: 'Times New Roman', Times, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #0e0224;
  margin-top: 60px;
}
</style>
