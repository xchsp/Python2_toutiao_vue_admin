<template>
     <el-container class="wrapper">
    <el-aside width="200px">
      <div class="logo">
        <img alt class="avatar" src="https://s3.pstatp.com/toutiao/static/img/logo.271e845.png" />
      </div>
      <el-menu>
        <el-menu-item @click="jump('/postlist')" index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">文章列表</span>
        </el-menu-item>
        <el-menu-item @click="jump('/editpost')" index="4">
          <i class="el-icon-setting"></i>
          <span slot="title">发布文章</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <img :src="$axios.defaults.baseURL+user.head_img" alt class="avatar" v-if="user.head_img" />
        <img
          alt
          class="avatar"
          src="https://p3.pstatp.com/list/190x124/pgc-image/Rft0hGGCLk6YgJ"
          v-else
        />
        <span class="nickname">{{user.username}}</span>
      </el-header>
      <el-main>
        <breadcrumb />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
    import breadcrumb from '@/components/breadcrumb'
    export default {
        name: "Home",
        components:{
          breadcrumb
        },
        data() {
          return {
               user: localStorage.getItem('user')
                ? JSON.parse(localStorage.getItem('user'))
                : {}
          }
        },
        methods:{
          jump(path){
            console.log(path)
            console.log(this.$route.path)
            if(path!=this.$route.path)
            {
                this.$router.push(path)
            }

          }
        }
    }
</script>

<style lang="less" scoped>
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
}
.el-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    object-fit: cover;
  }
  .nickname {
    margin-left: 10px;
    font-weight: 700;
  }
}
.el-header,
.el-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #333;
  color: #fff;
  text-align: center;
  line-height: 200px;
  .logo {
    line-height: 60px;
    .avatar {
      width: 108px;
      height: 30px;
      vertical-align: middle;
    }
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  // text-align: center;
  // line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
