<!-- editor -->
<template>
  <div class="blog-editor">
    <div id="editor"></div>
  </div>
</template>

<script lang="ts">
import Vditor from 'vditor';
import 'vditor/src/assets/scss/index.scss';
import { defineComponent } from 'vue';
import { ElMessageBox } from 'element-plus';

export default defineComponent({
  components: {},
  data() {
    return {
      vditor: null as null | Vditor,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.showLogin();
    this.initEditor();
  },
  beforeUnmount() {
    if (this.vditor) this.vditor = null;
  },
  methods: {
    showLogin() {
      ElMessageBox({
        title: 'Login',
        // message: 'Input password',
        showInput: true,
        inputPlaceholder: 'Input password',
        showClose: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true;
            instance.confirmButtonText = 'Loading...';
            const password = instance.inputValue;
            this.$axios.put('', { password });
            setTimeout(() => {
              done();
            }, 3000);
          }
        },
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
                  this.onSave();
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
      };
      this.vditor = new Vditor('editor', options);
    },
    async onSave() {
      const value = (this.vditor as Vditor).getValue();
      // 获取标题正则
      const getTitleReg = /^#\s(.*)/g;
      let title = '';
      let regTitle = getTitleReg.exec(value);
      if (regTitle) {
        title = regTitle[1];
      }
      if (!title) {
        this.$message.error('请输入标题');
        return;
      }
      if (this.$route.params.id) {
        await this.$axios.put('', {
          id: this.$route.params.id,
          title,
          content: value,
        });
      } else {
        await this.$axios.post('', { title, content: value });
      }
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
