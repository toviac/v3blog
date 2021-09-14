<!-- practice-detail -->
<template>
  <component :is="componentName"></component>
</template>
<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue';
import { list } from './Index.vue';

const modules = import.meta.glob('./*.vue');

export default defineComponent({
  components: {},
  computed: {
    componentName() {
      const componentName =
        list.find((i) => i.id === `${this.$route.params.component}`)
          ?.component || '';
      return componentName;
    },
  },
  created() {
    const originComponents = this.$options.components || {};
    Object.keys(modules).forEach((path) => {
      const name = path.match(/([^/]+)\.vue$/)?.[1];
      if (name) {
        originComponents[name] = defineAsyncComponent(modules[path]);
      }
    });
  },
});
</script>
