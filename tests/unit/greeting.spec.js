import { shallowMount } from '@vue/test-utils'
import Greeting from '../../src/components/Greeting.vue'

describe('Greeting.vue', () => {
  it('Render greeting component', () => {
    const wrapper = shallowMount(Greeting)

    expect(wrapper.text()).toMatch('Hello Greeting')
  })
})
