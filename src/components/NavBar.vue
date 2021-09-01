<!-- nav bar -->
<template>
  <div class="nav-bar">
    <div class="nav-bar-container">
      <router-link to="/" class="logo">
        <!-- <img class="logo" src="/logo.png" alt="logo"> -->
        Doco
      </router-link>
      <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        @select="handleNavSelect"
      >
        <el-menu-item
          v-for="item in navList"
          :key="item.index"
          :index="item.index"
        >
          {{ item.name }}
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      activeIndex: 'blog',
      navList: [
        { index: 'blog', name: 'Blog' },
        { index: 'practice', name: 'Practice' },
        { index: 'about', name: 'About Me' },
      ],
    };
  },
  computed: {},
  watch: {
    $route(to) {
      switch (true) {
        case /practice/.test(to.path):
          this.activeIndex = 'practice';
          break;
        case /about/.test(to.path):
          this.activeIndex = 'about';
          break;
        default:
          this.activeIndex = 'blog';
          break;
      }
    },
  },
  created() {
    if (/practice/.test(this.$route.path)) {
      this.activeIndex = 'practice';
    }
    if (/about/.test(this.$route.path)) {
      this.activeIndex = 'about';
    }
  },
  methods: {
    handleNavSelect(key) {
      this.$router.push(`/${key}`);
    },
  },
};
</script>
<style lang="scss">
.nav-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: #fff;
  z-index: 2;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  transition: height 0.3s ease;
  user-select: none;
  .nav-bar-container {
    display: flex;
    justify-content: space-between;
    width: 1040px;
    max-width: 100%;
  }
  .logo {
    cursor: pointer;
    // object-fit: contain;
    font-size: 40px;
    font-weight: bold;
    height: 56px;
    padding-left: 20px;
    &:visited,
    &:active {
      color: inherit;
    }
  }
  .el-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 20px;
    border-bottom: none;
    // background: url('/logo.png') no-repeat left center;
    // background-size: contain;
    .el-menu-item {
      // color: #666;
      width: 90px;
      text-align: center;
      &.is-active,
      &:hover {
        color: #000;
      }
    }
  }
}
</style>
