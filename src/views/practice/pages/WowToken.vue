<!-- canvas绘制绚丽小球 -->
<template>
  <div class="wow-token-chart">
    <h1>魔兽世界怀旧服: 时光徽章价格曲线</h1>
    <div id="chart" v-loading="loading" style="height: 500px"></div>
  </div>
</template>

<script>
import echarts from '@/plugins/echarts';

export default {
  components: {},
  data() {
    return {
      list: [],
      chart: null,
      loading: false,
    };
  },
  computed: {
    chartData() {
      if (!this.list) return { updateTime: [], price: [] };
      return {
        updateTime: this.list.map((i) => {
          const time = new Date(+i.updateTime);
          // const Y = time.getFullYear();d
          const M =
            time.getMonth() + 1 < 10
              ? `0${time.getMonth() + 1}`
              : time.getMonth() + 1;
          const D = time.getDate();
          const h = time.getHours();
          const m = time.getMinutes();
          // return `${Y}-${M}-${D} ${h}:${m}`;d
          return `${M}-${D} ${h}:${m}`;
        }),
        price: this.list.map((i) => {
          const { price } = i;
          // const copper = i.slice(-2);
          // const silver = price.slice(-4, -2);
          // const gold = price.slice(0, -4);
          // return `${gold}金${silver}银`;
          return (+price / 10000).toFixed(2);
        }),
      };
    },
  },
  watch: {},
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      this.loading = true;
      const res = await this.$axios.$get('/api/wow-token/list');
      this.list = res.list;
      this.loading = false;
      this.$nextTick(() => {
        this.initChart();
      });
    },
    initChart() {
      const el = document.querySelector('#chart');
      this.chart = echarts.init(el);
      // 绘制图表
      this.chart.setOption({
        tooltip: {
          trigger: 'axis',
          formatter(params) {
            const { name, data } = params[0];
            return `${name}: ${data}G`;
          },
          axisPointer: {
            // animation: false,
          },
        },
        xAxis: {
          data: this.chartData.updateTime,
          // type: 'time',
        },
        yAxis: {
          min(value) {
            return Math.floor(value.min - 50);
          },
          max(value) {
            return Math.ceil(value.max + 50);
          },
        },
        series: [
          {
            name: '价格',
            type: 'line',
            data: this.chartData.price,
          },
        ],
      });
    },
  },
};
</script>

<style lang="scss">
.wow-token-chart {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #chart {
    width: 100%;
  }
}
</style>
