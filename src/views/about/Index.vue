<template>
  <div class="about-me">
    <iframe
      src="https://www.doco.vip/upload/resume.pdf"
      frameborder="0"
    ></iframe>
  </div>
</template>

<script>
export default {
  name: 'AboutMe',
  components: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
};
</script>

<style lang="scss">
.about-me {
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
