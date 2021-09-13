<!-- canvas树形图 -->
<template>
  <div class="tree-diagram">
    <h1>Canvas绘制树形图</h1>
    <div>
      <el-radio-group v-model="selectedRole">
        <el-radio label="platform"> platform </el-radio>
        <el-radio label="operator"> operator </el-radio>
        <el-radio label="shop"> shop </el-radio>
      </el-radio-group>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script>
import Tree from '@/utils/tree';

export default {
  components: {},
  data() {
    return {
      tree: null,
      selectedRole: 'platform',
      treeData: [
        {
          name: '权限A',
          isPlatform: true,
          children: [
            {
              name: '权限a',
              isShop: true,
            },
          ],
        },
        {
          name: '权限B',
          isPlatform: true,
          isOperator: true,
          children: [
            {
              name: '权限b',
              isShop: true,
              children: [
                {
                  name: 'b子权限',
                  isOperator: true,
                },
              ],
            },
          ],
        },
        {
          name: '权限C',
          isPlatform: true,
          isOperator: true,
          children: [
            {
              name: '权限c1',
              isShop: true,
            },
            {
              name: '权限c2',
              isPlatform: true,
            },
          ],
        },
        {
          name: '权限D',
          isOperator: true,
          children: [
            {
              name: '权限d1',
              isShop: true,
              children: [
                {
                  name: 'd子权限',
                  isPlatform: true,
                },
              ],
            },
            {
              name: '权限d2',
              isPlatform: true,
            },
          ],
        },
      ],
    };
  },
  computed: {},
  watch: {
    selectedRole(newVal, oldVal) {
      this.tree.changeRole(newVal, oldVal);
    },
  },
  mounted() {
    this.tree = new Tree(this.treeData);
    this.tree.render();
  },
  methods: {},
};
</script>
<style lang="scss">
.tree-diagram {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
