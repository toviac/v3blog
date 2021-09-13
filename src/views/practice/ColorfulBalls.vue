<!-- canvas绘制绚丽小球 -->
<template>
  <div class="colorful-balls">
    <h1>ES6面向对象: 绚丽小球</h1>
    <canvas id="canvas">当前浏览器不支持canvas</canvas>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    this.drawCanvas();
  },
  methods: {
    drawCanvas() {
      const contentWidth =
        document.querySelector('.colorful-balls').clientWidth - 20;
      // 1.获取&绘制画布
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = contentWidth;
      canvas.height = 500;
      canvas.style.backgroundColor = '#000';

      // 2.创建类
      class Ball {
        // 构造器
        constructor(posX, posY, color) {
          // console.log(this)
          this.x = posX;
          this.y = posY;
          this.color = color;
          this.r = 40; // 半径radius
        }

        // 绘制
        render() {
          ctx.save();
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.fill();
          ctx.restore();
        }
      }

      // 3.移动的小球类
      class MoveBall extends Ball {
        constructor(posX, posY, color) {
          super(posX, posY, color); // 调用父类属性
          // console.log('color: ', color)

          // 量的变化
          this.dX = Math.random() * 10 - 5; // dX:deltaX,x的增量
          this.dY = Math.random() * 10 - 5;
          this.dR = Math.random() * 2 + 1;
        }

        upDate() {
          this.x += this.dX;
          this.y += this.dY;
          this.r -= this.dR;
          if (this.r < 0) {
            this.r = 0;
          }
        }
      }

      // 4.实例化
      const ballArr = [];
      const colorArr = [
        'red',
        'green',
        'yellow',
        'purple',
        'blue',
        'pink',
        'orange',
      ];

      // 5.监听鼠标移动
      canvas.addEventListener('mousemove', (e) => {
        // console.log('colorArr: ', colorArr)
        ballArr.push(
          new MoveBall(
            e.offsetX,
            e.offsetY,
            colorArr[Math.floor(Math.random() * (colorArr.length - 1))],
          ),
        );
        // console.log(Math.floor(Math.random(0, colorArr.length - 1)))
        // console.log(colorArr)
      });

      // 6.开启定时器
      setInterval(() => {
        // 清屏
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // 绘制
        for (let i = 0; i < ballArr.length; i++) {
          ballArr[i].render(); // 渲染
          ballArr[i].upDate(); // 更新
          if (ballArr[i].r === 0) {
            ballArr.splice(i, 1);
          }
        }
      }, 50);
    },
  },
};
</script>

<style lang="scss">
.colorful-balls {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  #canvas {
    border-radius: 4px;
  }
}
</style>
