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

       <el-form-item>
              <vue-editor
                id="editor"
                :editor-toolbar="customToolbar"
                useCustomImageHandler
                @image-added="handleImageAdded"
                v-model="form.content">
              </vue-editor>
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
        },
        methods:{
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
                id:res.data.id,
                url:this.$fixImgUrl(res.data.url)
              }
            )
          },
          onSubmit(){
            this.$axios(
              {
                url:'/posts',
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
