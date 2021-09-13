<template>
  <div class="practice-index">
    <article-card
      v-for="item in list"
      :key="item.id"
      :item="item"
      @click="cardClick(item.id)"
    >
    </article-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ArticleCard from '@/components/ArticleCard.vue';

const list: {
  author: string;
  createTime: string;
  id: string;
  component: string;
  title: string;
  updateTime: string;
}[] = [
  {
    author: 'admin',
    createTime: '2021-02-20',
    id: 'drawsomething',
    component: 'DrawSomething',
    title: '你画我猜',
    updateTime: '2021-02-20',
  },
  {
    author: 'admin',
    createTime: '2020-04-02',
    id: 'wowtoken',
    component: 'WowToken',
    title: '魔兽世界怀旧服: 时光徽章价格曲线',
    updateTime: '2020-04-02',
  },
  {
    author: 'admin',
    createTime: '2019-03-31',
    id: 'tree',
    component: 'Tree',
    title: 'Canvas绘制树形图',
    updateTime: '2019-03-31',
  },
  {
    author: 'admin',
    createTime: '2019-02-24',
    id: 'repeater',
    component: 'Repeater',
    title: '人类的本质',
    updateTime: '2019-02-24',
  },
  {
    author: 'admin',
    createTime: '2018-01-28',
    id: 'colorfulballs',
    component: 'ColorfulBalls',
    title: '绚丽小球',
    updateTime: '2019-01-28',
  },
  {
    author: 'admin',
    createTime: '2018-01-28',
    id: '2048',
    component: '2048',
    title: '2048',
    updateTime: '2019-01-28',
  },
];

export { list };

export default defineComponent({
  components: {
    ArticleCard,
  },
  data() {
    return {
      // 练习列表
      list,
    };
  },
  methods: {
    cardClick(id: string) {
      this.$router.push(`/practice/${id}`);
    },
  },
});
</script>

<style lang="scss"></style>
