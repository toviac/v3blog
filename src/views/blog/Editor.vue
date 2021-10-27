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

export default defineComponent({
  components: {},
  data() {
    return {
      vditor: null,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    this.initEditor();
  },
  methods: {
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
                name: '保存',
                tip: '保存',
                click: () => {
                  console.log('save');
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
      this.vditor = new Vditor('editor', options) as any;
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
