import { shallowMount } from '@vue/test-utils'
import EventTrigger from '@/components/EventTrigger.vue'
import flushPromise from 'flush-promises'

let url = ''
let data = ''

const mockHttp = {
  get: (_url, _data) => {
    return new Promise((resolve, _reject) => {
      url = _url
      data = _data
      resolve()
    })
  }
}

describe('EventTrigger.vue', () => {
  test('Show username on submit event', async () => {
    const wrapper = shallowMount(EventTrigger, {
      global: {
        mocks: {
          $http: mockHttp
        }
      }
    })

    wrapper.find('[data-username]').setValue('alice')
    wrapper.find('form').trigger('submit.prevent')

    await flushPromise()

    expect(wrapper.find('.message').text()).toBe('alice')
    expect(url).toBe('/api/show')
    expect(data).toEqual({ username: 'alice' })
  })
})
