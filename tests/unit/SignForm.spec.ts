import { mount, VueWrapper } from '@vue/test-utils'
import SignForm from '@/components/SignForm.vue'

describe('Sign form test cases', () => {
  let wrapper: VueWrapper<any>

  beforeEach(() => {
    wrapper = mount(SignForm)
  })
  test('컴포넌트 초기 렌더링시에는 폼 데이터가 초기화 되어 있어야 한다.', () => {
    const { name, check1, check2, isSubmit } = wrapper.vm.form
    const isInit = [name, check1, check2, !isSubmit].every(check => !!check)

    expect(isInit).toBeFalsy()
  })

  test('모든 값이 채워지면 버튼의 disabled가 해제된다.', async () => {
    await wrapper.setData(['foo', 'bar'])
    console.log(wrapper.vm.foo)
  })
})
