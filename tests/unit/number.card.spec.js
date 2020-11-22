import { shallowMount } from '@vue/test-utils'
import NumberCard from '@/components/NumberCard.vue'

describe('NumberCard.vue', () => {
  it('computed property num', () => {
    const wrapper = shallowMount(NumberCard, {
      props: {
        original: 3
      }
    })

    expect(wrapper.find('div').text()).toBe('odd')
  })
})
