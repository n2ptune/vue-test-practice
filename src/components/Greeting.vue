<template>
  <div>
    {{ greeting }}
    <GreetingChild />
  </div>
</template>

<script>
export default {
  components: {
    GreetingChild: () => import('./GreetingChild.vue')
  },

  data: () => ({
    greeting: 'Hello Greeting'
  })
}
</script>
