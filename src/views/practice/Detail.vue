<!-- practice-detail -->
<template>
  <div>
    <component :is="componentName"></component>
  </div>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
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
  created() {
    const originComponents = this.$options.components || {};
    Object.keys(modules).forEach((path) => {
      const name = path.match(/([^/]+\.vue$/)?.[1];
      if (name) {
        originComponents[name] = defineAsyncComponent(modules[path]);
      }
    });
  },
});
</script>
