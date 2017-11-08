<template>
  <div class="shape">
    {{ msg }}
  </div>
</template>

<script>
  export default {
    data () {
      return {
        msg: '我是异步组件1'
      }
    }
  }
</script>

<style>
  .shape {
    width: 150px;
    height: 150px;
    line-height: 200px;
    border-radius: 50%;
    background-color: #3cc51f;
    color: #fff;
    text-align: center;
    margin: 10px auto;
  }
  .shape {
    color: #fff;
  }
</style>