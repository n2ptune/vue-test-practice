<template>
  <div>
    <form @submit.prevent="onSubmit">
      <input v-model="username" type="text" data-username />
      <input type="submit" />
    </form>
    <div v-if="submitted" class="message">
      {{ username }}
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    username: '',
    submitted: false
  }),

  methods: {
    onSubmit() {
      return this.$http
        .get('/api/show', { username: this.username })
        .then(() => {
          this.submitted = true
        })
        .catch(() => {})
    }
  }
}
</script>
