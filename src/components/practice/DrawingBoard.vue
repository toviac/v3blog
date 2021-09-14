<!-- 你画我猜: 画板 -->
<template>
  <div class="drawing-board">
    <div v-if="!keyWord" class="msg">
      <span>{{ message }}</span>
      <el-button v-if="!userName" size="mini" @click="btnStart"
        >Start</el-button
      >
    </div>
    <div v-else class="msg">
      <span>{{ keyWord }}</span>
      <span class="btn-group">
        <el-tag
          v-for="(color, index) in colorList"
          :key="index"
          :class="{ selected: color === current.color }"
          effect="dark"
          :color="color"
          @click="selectColor(color)"
        ></el-tag>
        <el-button size="mini" @click="btnUndo">Undo</el-button>
        <el-button size="mini" @click="btnClear">Clear</el-button>
      </span>
    </div>
    <canvas
      id="board-canvas"
      :width="canvasWidth"
      :height="canvasHeight"
      style="border: 1px solid #999"
      @mousedown="onMouseDown"
      @mouseup="onMouseUp"
      @mouseout="onMouseUp"
      @mousemove="throttleMouseMove"
      @touchstart="onMouseDown"
      @touchend="onMouseUp"
      @touchcancel="onMouseUp"
      @touchmove="throttleMouseMove"
    ></canvas>
  </div>
</template>

<script>
import throttle from 'lodash.throttle';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {},
  props: {
    keyWord: {
      type: String,
      default: '',
    },
    userName: {
      type: String,
      default: '',
    },
  },
  emits: ['start-game', 'undo', 'clear', 'draw-end', 'drawing', 'drawing-dot'],
  data() {
    return {
      ctx: null,
      canvas: null,
      canvasWidth: 500,
      canvasHeight: 500,
      current: {
        x: 0,
        y: 0,
        color: '#303133',
        lineWidth: 4,
      },
      drawing: false,
      colorList: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#409eff',
        '#303133',
      ],
      step: [],
      stepList: [],
    };
  },
  computed: {
    message() {
      if (this.userName) return `${this.userName} is drawing...`;
      return 'Game is not started';
    },
  },
  watch: {},
  mounted() {
    this.initCanvas();
  },
  methods: {
    btnStart() {
      this.$emit('start-game');
    },
    btnUndo() {
      if (!this.stepList.length) return;
      this.$emit('undo');
    },
    btnClear() {
      this.$emit('clear');
    },
    selectColor(color) {
      this.current.color = color;
    },
    initCanvas() {
      const canvas = document.querySelector('#board-canvas');
      this.ctx = canvas.getContext('2d');
      this.ctx.strokeSyle = this.color;
      this.ctx.lineWidth = this.current.lineWidth;
      this.canvas = canvas;
      const el = document.querySelector('.drawing-board');
      const width = el.clientWidth;
      // 减去message高度
      const height = el.clientHeight - 45;
      const min = Math.min(width, height);
      canvas.width = min - 2;
      canvas.height = min - 2;
    },
    onMouseDown(e) {
      if (!this.keyWord) return;
      this.drawing = true;
      this.current.x = e.offsetX || (e.touches && e.touches[0].offsetX);
      this.current.y = e.offsetY || (e.touches && e.touches[0].offsetY);

      const x0 = this.current.x;
      const y0 = this.current.y;

      this.drawDot(
        x0,
        y0,
        this.current.lineWidth / 2,
        this.current.color,
        true,
      );
    },
    onMouseUp(e) {
      if (!this.keyWord) return;
      if (!this.drawing) return;
      this.drawing = false;
      this.drawLine(
        this.current.x,
        this.current.y,
        e.offsetX || (e.touches && e.touches[0].offsetX),
        e.offsetY || (e.touches && e.touches[0].offsetY),
        this.current.color,
        this.current.lineWidth,
        true,
      );
      this.drawDot(
        this.current.x,
        this.current.y,
        this.current.lineWidth / 2,
        this.current.color,
        true,
      );
      this.$emit('draw-end');
    },
    onMouseMove(e) {
      if (!this.keyWord) return;
      if (!this.drawing) return;
      this.drawLine(
        this.current.x,
        this.current.y,
        e.offsetX || e.touches[0].offsetX,
        e.offsetY || e.touches[0].offsetY,
        this.current.color,
        this.current.lineWidth,
        true,
      );
      this.current.x = e.offsetX || e.touches[0].offsetX;
      this.current.y = e.offsetY || e.touches[0].offsetY;
    },
    throttleMouseMove: throttle(function (e) {
      this.onMouseMove(e);
    }, 10),
    onDrawing({ x0, y0, x1, y1, color, lineWidth }) {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.drawLine(x0 * w, y0 * h, x1 * w, y1 * h, color, lineWidth);
    },
    onDrawingDot({ x, y, radius, color }) {
      const w = this.canvas.width;
      const h = this.canvas.height;
      this.drawDot(x * w, y * h, radius, color);
    },
    // 单次绘制结束
    onDrawEnd() {
      this.stepList.push(this.step);
      this.step = [];
    },
    onUndo() {
      this.stepList.pop();
      this.clearRect();
      this.stepList.forEach((step) => {
        step.forEach((i) => {
          if (i.x0 || i.y0) {
            this.drawLine(i.x0, i.y0, i.x1, i.y1, i.color, i.lineWidth);
          } else {
            this.drawDot(i.x, i.y, i.radius, i.color);
          }
        });
      });
    },
    getCanvasImage() {
      this.ctx.font = '24px Comic Sans MS';
      this.ctx.fillText(this.keyWord, 10, 30);
      return this.canvas.toDataURL();
    },
    drawLine(x0, y0, x1, y1, color, lineWidth, emit) {
      this.ctx.lineWidth = lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
      this.ctx.strokeStyle = color;
      this.ctx.stroke();
      this.ctx.closePath();
      this.step.push({ x0, y0, x1, y1, color, lineWidth });

      if (!emit) return;
      var w = this.canvas.width;
      var h = this.canvas.height;

      this.$emit('drawing', {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color: color,
        lineWidth,
      });
    },
    drawDot(x, y, radius, color = '#000', emit) {
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, 360, false);
      this.ctx.fillStyle = color;
      this.ctx.fill();
      this.ctx.closePath();
      this.step.push({ x, y, radius, color });

      if (!emit) return;
      var w = this.canvas.width;
      var h = this.canvas.height;

      this.$emit('drawing-dot', {
        x: x / w,
        y: y / h,
        radius,
        color,
      });
    },
    clearRect() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    reset() {
      this.clearRect();
      this.step = [];
      this.stepList = [];
    },
  },
});
</script>
<style lang="scss">
.drawing-board {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  .msg {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .btn-group {
      display: flex;
      .el-button {
        margin-left: 10px;
      }
    }
    .el-tag {
      display: inline-block;
      height: 28px;
      line-height: 28px;
      border-color: unset;
      border-width: 4px;
      &.selected {
        border-color: #e4e7ed;
      }
    }
  }
}
</style>
