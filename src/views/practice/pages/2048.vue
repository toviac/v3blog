<template>
  <div class="practice-2048">
    <div class="blog-content">
      <div class="heading">
        <h1 class="title">2048</h1>
        <div class="score-container">
          SCORE
          <div id="score"></div>
        </div>
      </div>
      <div class="above-game">
        <!-- <p class="game-intro">Use arrow button to move the tiles!</p> -->
        <div class="game-intro">
          <p>Join the numbers and get to the <strong>2048 tile!</strong></p>
        </div>
        <button class="btn new-game" @click="init">New Game</button>
      </div>
      <div class="game-container">
        <div class="grid-container">
          <div class="grid-row">
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
          </div>
          <div class="grid-row">
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
          </div>
          <div class="grid-row">
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
          </div>
          <div class="grid-row">
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
            <div class="grid-cell"></div>
          </div>
        </div>
        <div class="tile-container"></div>
      </div>
      <div class="how-to-play">
        <p style="font-size: 17px">
          <strong>HOW TO PLAY:</strong> Use your arrow keys to move the tiles.
          When two tiles with the same number touch, they merge into one!
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import init from '@/utils/2048/js/main.js';

export default {
  name: 'AboutMe',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    init();
  },
  methods: {
    init() {
      init();
    },
  },
};
</script>

<style lang="scss">
@import '@/utils/2048/css/main.scss';
.practice-2048 {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  min-height: calc(100vh - 100px);
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  iframe {
    width: 100%;
    height: calc(100vh - 130px);
  }
}
</style>
