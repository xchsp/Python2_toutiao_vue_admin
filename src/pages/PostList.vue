<template>
  <div>
      <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="日期"
      width="180">
      <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.created }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="标题"
      width="180">
      <template slot-scope="scope">
        <span size="medium">{{ scope.row.title }}</span>
      </template>
    </el-table-column>

       <el-table-column
      label="封面"
      width="200">
      <template slot-scope="scope">
        <img v-if="scope.row.cover.length == 0" src="#">
        <img :src="$fixImgUrl(scope.row.cover[0].url)" class="thumbnail" v-if="scope.row.cover.length > 0">
      </template>
    </el-table-column>


    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
           type="primary"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <div class="block">
    <span class="demonstration"></span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[3, 6, 9, 12]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
  </div>
  </div>

</template>

<script>
    export default {
        name: "PostList",
       data() {
          return {
            tableData: [],
            total:0,
            pageIndex:1,
            pageSize:3
          }
        },
        methods:{
          handleSizeChange(val){
             console.log('handleSizeChange:' + val);
            this.pageSize = val
             this.getPostList()
          },
          handleCurrentChange(val){
             console.log('handleCurrentChange:' + val);
             this.pageIndex = val
             this.getPostList()
          },
            handleEdit(index, row) {
              console.log(index, row);
            },
            handleDelete(index, row) {
              console.log(index, row);
            },
          getPostList(){
            this.$axios(
              {
                url:'/get_posts',
                method:'get',
                params:{
                  pageIndex:this.pageIndex,
                  pageSize:this.pageSize
                }
              }
            ).then(res=>{
                console.log(res.data.data)
                this.tableData = res.data.data
                this.total = res.data.total
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
    .thumbnail{
      width:200px;
      height:130px
    }
</style>
