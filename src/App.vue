<template>
  <div>
    <Greeting />
  </div>
</template>

<script>
export default {
  components: {
    Greeting: () => import('./components/Greeting.vue')
  }
}
</script>
