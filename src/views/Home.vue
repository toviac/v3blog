<!-- home page -->
<template>
  <div class="home">
    <CardGrid></CardGrid>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CardGrid from '@/components/CardGrid.vue';

export default defineComponent({
  components: { CardGrid },
});
</script>
<style lang="scss"></style>
