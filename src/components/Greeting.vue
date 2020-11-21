<template>
  <div>
    <div>
      <span v-if="isAdmin">Admin</span>
      <span v-else>User</span>
      <button>
        {{ msg }}
      </button>
    </div>
    <GreetingChild />
  </div>
</template>

<script>
export default {
  components: {
    GreetingChild: () => import('./GreetingChild.vue')
  },

  props: {
    msg: {
      type: String,
      required: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  }
}
</script>
