<!-- practice-detail -->
<template>
  <components :is="component"></components>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { list } from './Index.vue';

export default defineComponent({
  computed: {
    component() {
      const componentName = list.find(
        (i) => i.id === `${this.$route.params.component}`,
      )?.component;
      return defineAsyncComponent(() => import(`./${componentName}.vue`));
    },
  },
});
</script>
<style lang="scss"></style>
