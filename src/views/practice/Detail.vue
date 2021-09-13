<!-- practice-detail -->
<template>
  <div>
    <component :is="componentName"></component>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { list } from './Index.vue';

const modules = import.meta.glob('/src/views/practice/*.vue');

export default defineComponent({
  components: modules,
  computed: {
    componentName() {
      const componentName =
        list.find((i) => i.id === `${this.$route.params.component}`)
          ?.component || '';
      console.log('modules: ', modules);
      console.log('component: ', componentName);
      return `/src/views/practice/${componentName}.vue`;
    },
  },
});
</script>
