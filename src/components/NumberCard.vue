<template>
  <div>
    {{ num }}
  </div>
</template>

<script>
export default {
  props: {
    original: {
      type: Number,
      required: true
    }
  },

  computed: {
    num() {
      return this.original % 2 == 0 ? 'even' : 'odd'
    }
  }
}
</script>
