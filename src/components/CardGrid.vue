<!-- card grid -->
<template>
  <div class="card-grid">
    <div
      v-for="(card, index) in cardList"
      :key="index"
      class="card"
      :class="card.area"
      :style="styleList[index]"
      @mouseover="cardMouseOver(index)"
      @mouseleave="cardMouseLeave(index)"
    >
      <a v-if="card.isExternal" :href="card.path" :target="card.target || ''">
        <span class="icon iconfont" :class="card.icon"></span>
        <div class="card-desc">
          {{ card.name }}
        </div>
      </a>
      <router-link v-else :to="card.path || ''">
        <span class="icon iconfont" :class="card.icon"></span>
        <div class="card-desc">
          {{ card.name }}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue';

const cardGrid = () => {
  const cardList = [
    {
      name: 'Blog',
      area: 'area_a',
      color: '#39c',
      icon: 'icon-writing',
      path: '/blog',
    },
    {
      name: 'Practice',
      area: 'area_b',
      color: '#d81',
      icon: 'icon-practice',
      path: '/practice',
    },
    {
      name: 'About',
      area: 'area_c',
      color: '#595',
      icon: 'icon-resume',
      path: '/about',
    },
    {
      name: 'More',
      area: 'area_d',
      color: '#666',
      icon: 'icon-more',
      path: '',
    },
    {
      // 这里很奇怪, icon-github无法显示, icon-git就可以正常显示. 不知道是nuxt的问题还是iconfont的问题
      name: 'Github',
      area: 'area_e',
      color: '#333',
      icon: 'icon-git',
      path: 'https://www.github.com/docodocool',
      isExternal: true,
      target: '_blank',
    },
    {
      name: 'Mailto',
      area: 'area_f',
      color: '#601180',
      icon: 'icon-mail',
      path: 'mailto:me@doco.dev',
      isExternal: true,
      target: '',
    },
    {
      name: 'QQ',
      area: 'area_g',
      color: '#dd4b39',
      icon: 'icon-qq',
      path: 'http://wpa.qq.com/msgrd?v=3&uin=1045606768&site=qq&menu=yes',
      isExternal: true,
      target: '_blank',
    },
  ];
  let styleList: any = reactive([]);
  const cardMouseOver = (index: number) => {
    styleList[index] = `background-color: ${cardList[index].color}`;
  };
  const cardMouseLeave = (index: number) => {
    styleList[index] = ``;
  };
  return {
    cardList,
    styleList,
    cardMouseOver,
    cardMouseLeave,
  };
};
export default defineComponent({
  setup() {
    return {
      ...cardGrid(),
    };
  },
});
</script>

<style lang="scss">
.card-grid {
  display: grid;
  grid-template-columns: 200px 200px 100px 100px 100px;
  grid-template-rows: 100px 100px;
  grid-row-gap: 10px;
  grid-column-gap: 10px;
  grid-template-areas:
    'a b c c d'
    'a b e f g';
  .card {
    cursor: pointer;
    position: relative;
    color: #fff;
    font-size: 2rem;
    background-color: rgba($color: #ccc, $alpha: 0.8);
    transition: background-color 0.3s ease, top 0.5s ease, left 0.5s ease,
      width 0.5s ease, height 0.5s ease;
    overflow: hidden;
    &:hover {
      // background-color: #39c;
      .icon {
        opacity: 0;
        font-size: 10% !important;
      }
      .card-desc {
        top: 0;
        opacity: 1;
      }
    }
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
    }
    .icon {
      font-size: 3rem;
      opacity: 1;
      transition: opacity 0.3s ease, font-size 0.3s ease, color 0.3s ease;
    }
    .card-desc {
      opacity: 0;
      position: absolute;
      top: 100%;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      transition: top 0.3s ease, opacity 0.3s ease;
      font-size: 65%;
    }
    &.area_a {
      grid-area: a;
      font-size: 4rem;
      .icon {
        font-size: 4rem;
      }
    }
    &.area_b {
      grid-area: b;
      font-size: 4rem;
      .icon {
        font-size: 4rem;
      }
    }
    &.area_c {
      grid-area: c;
    }
    &.area_d {
      grid-area: d;
    }
    &.area_e {
      grid-area: e;
    }
    &.area_f {
      grid-area: f;
    }
    &.area_g {
      grid-area: g;
    }
  }
}
</style>
