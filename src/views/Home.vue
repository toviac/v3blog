<!-- home page -->
<template>
  <div class="home">
    <canvas id="startrack"></canvas>
    <div class="background-cover"></div>
    <CardGrid></CardGrid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardGrid from '@/components/CardGrid.vue';
import startrack from '@/utils/startrack.js';

export default defineComponent({
  components: { CardGrid },
  mounted() {
    const el = document.querySelector('#startrack');
    startrack(el);
  },
});
</script>
<style lang="scss">
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .background-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
      to top,
      rgba(32, 32, 32, 1) 0%,
      rgba(32, 32, 32, 0) 100%
    );
  }
  #startrack {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  .card-grid {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 100px;
  }
}
</style>
