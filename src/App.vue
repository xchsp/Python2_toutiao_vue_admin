<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  *{
    margin:0;
    padding:0;
  }

  a{
    color: inherit;
  }

  a:hover{
    text-decoration: none;
  }

  ul,li,ol{
    list-style: none;
  }
</style>
