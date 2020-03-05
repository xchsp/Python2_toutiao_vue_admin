<template>
    <div class="breadcrumb">{{breadcrumb}}</div>
</template>

<script>
    export default {
        name: "breadcrumb",
        computed:{
          breadcrumb(){
            let result = ''
            this.$route.matched.forEach(function (item) {
              result += item.meta + '/'
            })
            result = result.slice(0,result.length-1)
            return result
          }
        }
    }
</script>

<style lang="less" scoped>
  .breadcrumb{
    padding: 10px 0;
  }
</style>
