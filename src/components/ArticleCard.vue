<!-- article card -->
<template>
  <el-card shadow="hover" class="article-card" @click="handleCardClick">
    <!-- <div class="header"> -->
    <div class="title">
      {{ item.title }}
    </div>
    <div class="create-date">
      {{ getDate(item.createTime) }}
    </div>
    <!-- </div> -->
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    item: {
      type: Object,
      default() {
        return {
          title: '',
          createTime: '',
        };
      },
    },
  },
  emits: ['click'],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    getDate(val) {
      return val.slice(0, 10);
    },
    handleCardClick() {
      this.$emit('click');
    },
  },
};
</script>
<style lang="scss">
.article-card {
  user-select: none;
  height: 150px;
  margin-top: 10px;
  padding: 20px;
  border-radius: 4px;
  background-color: #ffffff;
  // h-shadow v-shadow blur spread color inset;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  cursor: pointer;
  // color: #409EFF;
  .el-card__body {
    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 20px;
  }
  .create-date {
    padding-right: 20px;
  }
  &:hover {
    color: #66b1ff;
  }
}
</style>
