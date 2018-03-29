<template>
  <div id="app">
    <headers></headers>
    <myFooters></myFooters>
  </div>
</template>

<script>
import Headers from "@/components/header"
import MyFooters from "@/components/myFooter"

export default {
  name: 'App',
  components: {
    Headers,
    MyFooters
  }
}
</script>

<style>
p {
  text-indent: 2em;
}
</style>
