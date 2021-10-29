<template>
  <div v-loading="loading" class="article-content">
    <!-- 'v-html' directive can lead to XSS attack  vue/no-v-html -->
    <!-- eslint-disable-next-line -->
    <div class="html" v-html="content"></div>
    <el-dialog v-model="showImgPreview" top="0" width="80%">
      <img :src="imgSrc" alt="" />
    </el-dialog>
  </div>
</template>

<script>
import marked from '@/utils/marked.js';

export default {
  name: 'ArticleContent',
  components: {},
  data() {
    return {
      content: '',
      showImgPreview: false,
      imgSrc: '',
      loading: false,
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      console.log('params: ', this.$route.params);
      const { id } = this.$route.params;
      console.log('id: ', id);
      const res = await this.$axios.get('/api/post', { id });
      let { content } = res.data;
      // 所有带hash的链接替换为history模式
      content = content.replace(/\(#\//g, '(/');
      this.content = marked(content);
      this.loading = false;
      this.$nextTick(() => {
        this.addListeners();
      });
    },
    // 图片/链接添加事件
    addListeners() {
      this.imgGroup = document.querySelectorAll('.article-content img');
      this.imgGroup.forEach((img) => {
        img.addEventListener('click', this.imgPreview);
      });
      this.linkGroup = document.querySelectorAll('.article-content a');
      this.linkGroup.forEach((link) => {
        link.addEventListener('click', this.navigate, false);
      });
    },
    removeListeners() {
      if (this.imgGroup) {
        this.imgGroup.forEach((img) => {
          img.removeEventListener('click', this.imgPreview);
        });
      }
      if (this.linkGroup) {
        this.linkGroup.forEach((link) => {
          link.removeEventListener('click', this.navigate, false);
        });
      }
    },
    imgPreview(e) {
      // this.imgSrc = e.target.src.replace('https://www.doco.dev', '');
      this.imgSrc = e.target.src;
      if (this.imgSrc) {
        this.showImgPreview = true;
      }
    },
    // https://github.com/nuxt-community/modules/issues/185
    // https://github.com/nuxt/nuxtjs.org/blob/master/components/HtmlParser.vue
    navigate(e) {
      let { target } = e;
      let i = 0;
      // Go throught 5 parents max to find a tag
      while (
        i < 5 &&
        !(target instanceof HTMLAnchorElement) &&
        target.parentNode
      ) {
        target = target.parentNode;
        i++;
      }
      if (!(target instanceof HTMLAnchorElement)) return;
      const href = target.getAttribute('href');

      // Get link target, if local link, navigate with router link
      if (href && href[0] === '/') {
        e.preventDefault();
        this.$router.push(href);
        return;
      }
      if (this.$ga) {
        // If Google Analytics is activated & is external link
        // https://developers.google.com/analytics/devguides/collection/analyticsjs/events
        this.$ga('send', 'event', 'Outbound Link', 'click', target.href);
      }
      // external link
      e.preventDefault();
      window.open(href);
    },
  },
};
</script>

<style lang="scss">
.article-content {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  pre {
    margin: 10px 0;
    & > code {
      border-radius: 4px;
      font-family: 'Consolas';
      /* atom-one-dark */
      display: block;
      overflow-x: auto;
      padding: 8px 16px;
      color: #abb2bf;
      background: #282c34;
      font-size: 16px;
    }
  }

  blockquote {
    margin: 10px 0;
    border-left: 3px solid #409eff;
    padding: 10px;
    background-color: #eee;
  }
  img,
  video {
    display: block;
    margin: 0 auto;
    max-width: 100%;
  }
  table {
    display: block;
    width: 100%;
    margin-top: 0;
    margin-bottom: 16px;
    overflow: auto;
    border-spacing: 0;
    border-collapse: collapse;
    th {
      font-weight: 600;
    }

    th,
    td {
      padding: 6px 13px;
      border: 1px solid #dfe2e5;
    }

    tr {
      background-color: #fff;
      border-top: 1px solid #c6cbd1;
    }

    tr:nth-child(2n) {
      background-color: #f6f8fa;
    }
  }

  a {
    color: #409eff;
  }

  .el-dialog__wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    .el-dialog {
      display: flex;
      flex-direction: column;
      margin: 0;
      height: 90%;
      .el-dialog__body {
        flex-grow: 1;
        // 解决子元素溢出
        overflow: hidden;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
