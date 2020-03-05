<template>
    <el-form :model="form">
        <el-form-item label="标题">
              <el-input v-model="form.title"></el-input>
        </el-form-item>

        <el-form-item label="封面">
              <el-upload
                :action="this.$axios.defaults.baseURL+'/upload/'"
                :file-list="form.cover"
                :headers="{Authorization:token}"
                list-type="picture-card"
                :on-success="handleSuccess"
                :on-remove="coverRemoved"
                mutiple
              >
                <i class="el-icon-plus"></i>
              </el-upload>
        </el-form-item>

        <el-form-item label="栏目">
              <el-checkbox-group v-model="form.categories">
                  <el-checkbox
                    v-for="(item,index) in categoryList"
                    :key="index"
                    :label="item.id"
                  >
                    {{item.name}}
                  </el-checkbox>
              </el-checkbox-group>
        </el-form-item>

        <el-form-item label="类型">
               <el-radio-group v-model="form.type">
                   <el-radio :label = "1">文章</el-radio>
                   <el-radio :label = "2">视频</el-radio>
              </el-radio-group>
        </el-form-item>

       <el-form-item>
              <vue-editor
                v-if="form.type===1"
                id="editor"
                :editor-toolbar="customToolbar"
                useCustomImageHandler
                @image-added="handleImageAdded"
                v-model="form.content">
              </vue-editor>


              <el-upload
                v-if="form.type===2"
                :action="this.$axios.defaults.baseURL+'/upload/'"
                :headers="{Authorization:token}"
                :on-success="handleSuccessUploadVideo"
                :before-upload="beforeUpload"
              >
                <el-button type="primary">点击上传</el-button>
              </el-upload>
        </el-form-item>

       <el-form-item>
              <el-button @click="onSubmit" type="primary">提交</el-button>
        </el-form-item>
    </el-form>

</template>

<script>
    import {VueEditor}  from 'vue2-editor'
    export default {
        components:{
          VueEditor
        },
        data(){
          return {
            postId:this.$route.query.id,
            token:'Bearer '+ localStorage.getItem('token'),
            form:{
              title:'',
              content:'',
              type:1,
              cover:[],
              categories:[]
            },
            categoryList:[],
            customToolbar: [
              ["bold", "italic", "underline"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["image", "code-block"]
            ]
          }
        },
        mounted(){
          console.log('postId:'+this.postId)
          this.$axios(
            {
              url:'/category',
              methods:'get'
            }
          ).then(res => {
                console.log(res.data)
                res.data.forEach(element=>{
                  this.categoryList.push(element)
                })
            }
          )

          // 修改文章
          if(this.postId)
          {
            this.$axios(
            {
              url:'/post/'+this.postId,
              methods:'get'
            }
            ).then(res => {
                  this.form = res.data

                  let newCate = []
                  res.data.categories.forEach(element=>{
                    newCate.push(element.id)
                  })

                  this.form.categories  = newCate

                 let newCover = []
                  res.data.cover.forEach(element=>{
                    let obj = {
                      uid:element.id,
                      url:this.$fixImgUrl(element.url)
                    }
                    newCover.push(obj)
                  })

                  this.form.cover  = newCover

              }
            )
          }
        },
        methods:{
          handleSuccessUploadVideo(res){
              this.form.content = res.data.url
          },
          beforeUpload(file){
            console.log(file.type)
            if(file.type.indexOf('video/') !==0)
            {
                this.$message.warning('请选择视频文件')
            }
          },
          handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
            console.log('handleImageAdded')

            var formData = new FormData();
            formData.append("file", file);

            this.$axios({
              url: "/upload/",
              method: "POST",
              data: formData
            })
              .then(res => {
                let url = this.$fixImgUrl(res.data.data.url); // Get url from response
                Editor.insertEmbed(cursorLocation, "image", url);
                resetUploader();
              })
              .catch(err => {
                console.log(err);
              });
          },
          coverRemoved(file,fileLst){
            console.log(file)
            console.log(fileLst)
            this.form.cover = fileLst
          },
          handleSuccess(res){
            console.log(res.data)
            // this.form.cover.push(res.data)

            this.form.cover.push(
              {
                uid:res.data.id,
                url:this.$fixImgUrl(res.data.url)
              }
            )
          },
          onSubmit(){
            this.$axios(
              {
                url:this.postId ? '/update_post/'+ this.postId :'/posts',
                method:'POST',
                data:this.form
              }
            ).then(res=>{
              console.log(res.data)
              this.$message.success('提交成功')
            })
          }
        }
    }

</script>

<style scoped>

</style>
