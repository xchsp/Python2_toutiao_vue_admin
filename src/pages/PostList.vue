<template>
     <div>文章列表</div>

</template>

<script>
    export default {
        name: "PostList",
        methods:{
          getPostList(){
            this.$axios(
              {
                url:'/get_posts',
                method:'get',
                params:{
                  pageIndex:2,
                  pageSize:5
                }
              }
            ).then(res=>{
                console.log(res.data.data)
              }
            )
          }
        },
        mounted(){
          this.getPostList()
        }
    }
</script>

<style scoped>

</style>
