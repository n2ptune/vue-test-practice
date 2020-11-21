import { shallowMount } from '@vue/test-utils'
import Greeting from '../../src/components/Greeting.vue'

const factory = props => {
  return shallowMount(Greeting, {
    props: {
      ...props
    }
  })
}

describe('Greeting.vue', () => {
  it('Render admin message if true isAdmin', () => {
    const wrapper = factory({ msg: 'Hello Admin', isAdmin: true })

    console.log(wrapper.html())

    expect(wrapper.find('span').text()).toBe('Admin')
    expect(wrapper.find('button').text()).toBe('Hello Admin')
  })

  it('Render admin message if false isAdmin', () => {
    const wrapper = factory({ msg: 'Hello User', isAdmin: false })

    expect(wrapper.find('span').text()).toBe('User')
    expect(wrapper.find('button').text()).toBe('Hello User')
  })
})
