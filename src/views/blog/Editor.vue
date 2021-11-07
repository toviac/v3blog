<!-- editor -->
<template>
  <div v-loading="loading" class="blog-editor">
    <div id="editor"></div>
  </div>
</template>

<script lang="ts">
import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';
import { defineComponent } from 'vue';
import { ElMessageBox } from 'element-plus';

declare module 'axios' {
  export interface AxiosRequestConfig {
    id: string | string[];
  }
}

export default defineComponent({
  components: {},
  data() {
    return {
      loading: true,
      vditor: null as null | Vditor,
      token: '',
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.initEditor();
  },
  beforeUnmount() {
    if (this.vditor) this.vditor = null;
  },
  methods: {
    showLogin(data: any) {
      ElMessageBox({
        title: '密码',
        // message: 'Input password',
        showInput: true,
        inputPlaceholder: 'Input password',
        customClass: 'pwd-msg-box',
        showClose: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = 'Loading...';
            this.getToken({ username: 'admin', password: instance.inputValue })
              .then(() => {
                done();
                this.onSave(data);
              })
              .finally(() => {
                instance.confirmButtonLoading = false;
                instance.confirmButtonText = 'Ok';
              });
          }
        },
      });
      this.$nextTick(() => {
        const inputEl: any = document.querySelector(
          '.pwd-msg-box input.el-input__inner',
        );
        if (inputEl) inputEl.focus();
      });
    },
    initEditor() {
      const options = {
        toolbar: [
          'emoji',
          'headings',
          'bold',
          'italic',
          'strike',
          'link',
          '|',
          'list',
          'ordered-list',
          'check',
          'outdent',
          'indent',
          '|',
          'quote',
          'line',
          'code',
          'table',
          'inline-code',
          'insert-before',
          'insert-after',
          '|',
          'undo',
          'redo',
          '|',
          'upload',
          // 'record',
          'fullscreen',
          'edit-mode',
          {
            name: 'more',
            toolbar: [
              {
                name: 'save',
                tipPosition: 's',
                tip: '保存',
                className: 'right',
                icon: '保存',
                click: () => {
                  this.beforeSave();
                },
              },
              'both',
              'code-theme',
              'content-theme',
              'export',
              'outline',
              'preview',
              'devtools',
              'info',
              'help',
            ],
          },
        ],
        after: () => {
          this.loading = false;
          if (this.$route.params.id) {
            this.getPost();
          }
        },
      };
      this.vditor = new Vditor('editor', options);
    },
    getToken(data: any): Promise<any> {
      return new Promise((resolve, reject) => {
        this.$axios
          .post('/api/login', data)
          .then((res: any) => {
            this.token = res.access_token;
            resolve(res);
          })
          .catch((err: any) => {
            if (err.statusCode === 401) {
              this.$message.error('密码错误');
            }
            reject();
          });
      });
    },
    getPost() {
      const { id } = this.$route.params;
      this.loading = true;
      this.$axios
        .get('/api/post', { id: id })
        .then((res: any) => {
          const { content } = res.data;
          if (this.vditor) {
            this.vditor.setValue(content);
          }
        })
        .catch((err: any) => {
          console.log('ERR_GET_POST: ', err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    beforeSave() {
      const content = (this.vditor as Vditor).getValue();
      // 获取标题正则
      const getTitleReg = /^#\s(.*)/g;
      let title = '';
      const author = 'admin';
      let regTitle = getTitleReg.exec(content);
      if (regTitle) {
        title = regTitle[1];
      }
      if (!title) {
        this.$message.error('请输入标题');
        return;
      }
      this.showLogin({ title, author, content });
    },
    async onSave({
      title,
      author,
      content,
    }: {
      title: string;
      author: string;
      content: string;
    }) {
      const options = { headers: { Authorization: `Bearer ${this.token}` } };
      const postId = this.$route.params.id;
      const method = postId ? 'put' : 'post';
      this.loading = true;
      try {
        await this.$axios[method](
          '/api/post',
          {
            id: postId,
            title,
            author,
            content,
          },
          options,
        );

        this.$message.success('保存成功');
        if (postId) {
          this.$router.push(`/blog/${postId}`);
        } else {
          this.$router.push('/blog');
        }
      } catch (e) {
        this.$message.error('保存失败');
      }
      this.loading = false;
    },
  },
});
</script>
<style lang="scss">
.blog-editor {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #editor {
    flex-grow: 1;
    margin-top: 20px;
    position: relative;
    z-index: 100;
    width: 100%;
    .vditor-toolbar {
      padding: 0 10px !important;
    }
    .vditor-reset {
      padding: 10px !important;
    }
  }
}
</style>
