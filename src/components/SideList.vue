<!-- side list -->
<template>
  <div class="side-list">
    <!-- <el-collapse-transition> -->
    <!-- 确保动画有效 -->
    <!-- <div v-show="showSearchBar">
        <el-input v-model="searchValue" size="small" @keyup.enter.native="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </div> -->
    <!-- </el-collapse-transition> -->
    <el-card class="side-card">
      <div class="side-card-header">
        <!-- <img src="@/assets/images/87535782_p0.png" alt="" /> -->
        <!-- <div class="avatar"></div> -->
      </div>
      <el-button-group>
        <a href="https://github.com/docodocool" target="_blank">
          <el-button
            size="mini"
            plain
            icon="iconfont icon-git"
            @click="clearFocus"
            >Github</el-button
          >
        </a>
        <a
          href="http://wpa.qq.com/msgrd?v=3&uin=1045606768&site=qq&menu=yes"
          target="_blank"
        >
          <el-button
            size="mini"
            plain
            icon="iconfont icon-qq"
            @click="clearFocus"
            >QQ</el-button
          >
        </a>
        <a href="mailto:me@doco.dev">
          <el-button
            size="mini"
            plain
            icon="iconfont icon-mail"
            @click="clearFocus"
            >Mailto</el-button
          >
        </a>
      </el-button-group>
    </el-card>
  </div>
</template>

<script>
export default {
  components: {},
  emits: ['search'],
  data() {
    return {
      searchValue: '',
    };
  },
  computed: {
    showSearchBar() {
      const { path } = this.$route;
      return /^\/$/.test(path);
    },
  },
  watch: {},
  methods: {
    search() {
      const { searchValue } = this;
      console.log('search: ', searchValue);
      this.$emit('search', searchValue);
      this.$message({
        message: '搜索功能暂不可用',
        type: 'warning',
        showClose: true,
      });
    },
    clearFocus() {
      const el = document.activeElement;
      el.blur();
    },
  },
};
</script>
<style lang="scss">
.side-list {
  // 父元素与子元素顶部会有5px距离, 由于换行符导致的. 也可以在父元素添加font-size:0;来解决
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  .el-input {
    margin-bottom: 10px;
  }
  .side-card {
    position: sticky;
    top: 10px;
    .el-card__body {
      display: flex;
      flex-direction: column;
      padding: 0;
    }
    .side-card-header {
      cursor: pointer;
      position: relative;
      // 背景图片资源宽高比3/5, side-card固定宽度300px;
      height: 230px;
      background: url('~@/assets/images/87535782_p0.png') no-repeat top center;
      background-size: 300px 243px;
      overflow: hidden;
      transition: all 0.2s ease-in-out;
      &:hover {
        background-size: 330px 267.3px;
      }
      // margin-bottom: 50px;
      // img {
      //   width: 100%;
      //   height: 100%;
      //   object-fit: cover;
      //   transition: all 0.5s;
      //   cursor: pointer;
      //   &:hover {
      //     transform: scale(1.05);
      //   }
      // }
      .avatar {
        // 优化性能
        z-index: 1;
        position: absolute;
        left: calc(50% - 40px);
        bottom: -40px;
        width: 80px;
        height: 80px;
        border: 2px solid #fff;
        border-radius: 50%;
        background: url('~@/assets/images/avatar.jpg') no-repeat center center;
        background-size: cover;
        transition: all 0.5s;
        &:hover {
          cursor: pointer;
          transform: rotate(360deg) scale(1.2);
        }
      }
    }
    .el-button-group {
      display: flex;
      margin: 20px;
      a {
        // 三等分
        flex: 1;
        display: flex;
        text-decoration: none;
        .el-button {
          flex-grow: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0;
          font-size: 14px;
          padding: 7px 0;
          i {
            margin-right: 5px;
          }
          &:hover,
          &:focus {
            z-index: 2;
          }
        }
        &:first-child > .el-button {
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
          margin-right: -1px;
        }
        &:last-child > .el-button {
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          margin-left: -1px;
        }
      }
    }
  }
}
</style>
