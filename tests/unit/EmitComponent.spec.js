import EmitComponent from '@/components/EmitComponent.vue'
import { shallowMount } from '@vue/test-utils'

describe('EmitComponent.vue', () => {
  test('Emit event', () => {
    const wrapper = shallowMount(EmitComponent)

    // 컴포넌트의 handleEmit 메서드 실행
    wrapper.vm.handleEmit()
    wrapper.vm.handleEmit()

    console.log(wrapper.emitted())
  })
})
