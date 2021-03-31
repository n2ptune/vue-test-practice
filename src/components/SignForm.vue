<template>
  <form>
    <input v-model="form.name" type="text" />
    <input v-model="form.check1" type="checkbox" />
    <input v-model="form.check2" type="checkbox" />
    <button :disabled="form.isSubmit" type="submit">
      Submit
    </button>
  </form>
</template>

<script>
import { reactive } from '@vue/reactivity'
import { watch } from '@vue/runtime-core'

export default {
  setup() {
    const form = reactive({
      name: '',
      check1: false,
      check2: false,
      isSubmit: true
    })

    const useValidateForm = () => {
      form.isSubmit = !(form.name && form.check1 && form.check2)
    }

    watch(form, useValidateForm)

    return {
      form
    }
  }
}
</script>
