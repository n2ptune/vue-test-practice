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

  it('computed property num with call', () => {
    const evenProps = { original: 2 }
    const oddProps = { original: 3 }

    expect(NumberCard.computed.num.call(evenProps)).toBe('even')
    expect(NumberCard.computed.num.call(oddProps)).toBe('odd')
  })
})
