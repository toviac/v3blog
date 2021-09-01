<template>
  <div class="blog-page">
    <article-card v-if="!postList.length" v-loading="true"></article-card>
    <template v-else>
      <article-card
        v-for="item in postList"
        :key="item.id"
        :item="item"
        @click="cardClick(item.id)"
      >
      </article-card>
    </template>
  </div>
</template>

<script>
import ArticleCard from '@/components/ArticleCard.vue';

export default {
  components: {
    ArticleCard,
  },
  data() {
    return {
      postList: [],
    };
  },
  computed: {},
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      if (!this.postList.length) {
        const { list } = await this.$axios.$get('/api/post/list');
        this.postList = list;
      }
    },
    cardClick(id) {
      this.$router.push(`/blog/${id}`);
    },
  },
};
</script>

<style lang="scss">
.blog-page {
  padding-bottom: 10px;
}
</style>
