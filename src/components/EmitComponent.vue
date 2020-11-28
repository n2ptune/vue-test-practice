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
      this.$emit('child-event', 'child', 'parent', 'component')
    }
  }
}
</script>

<style></style>
