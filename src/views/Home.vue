<template>
  <img alt="Vue logo" src="@/assets/logo.png" />
  <HelloWorld></HelloWorld>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HelloWorld from '@/components/HelloWorld.vue'

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld
  }
})
</script>

<style>
</style>
