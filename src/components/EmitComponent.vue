<template>
  <div></div>
</template>

<script>
export default {
  props: {
    cid: {
      type: String
    }
  },

  methods: {
    handleEmit() {
      this.$emit('some-event', this.cid || 'emit-component')
    }
  }
}
</script>

<style></style>
