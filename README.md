# Vue test practice

[Vue 테스팅 핸드북](https://lmiller1990.github.io/vue-testing-handbook)을 참고하여 공부하고 기록하는 레포입니다.

## Render Components

`@vue/test-utils`에서 제공하는 `mount` 메서드와 `shallowMount` 메서드를 이용해서 컴포넌트를 다양한 데이터와 함께 렌더할 수 있다.

### mount

```js
import { mount } from '@vue/test-utils'
import Greeting from '@/components/Greeting.vue'

const wrapper = mount(Greeting)
```

`wrapper`엔 마운트 된 Vue용 Wrapper가 담기게 된다. 이 객체의 다양한 메서드를 통해서 테스트를 할 수 있다. 예를 들어 한 엘리먼트의 텍스트 내용을 테스트하고 싶다면 아래와 같이 작성한다.

```js
describe('Greeting.vue', () => {
  it('Render default text', () => {
    expect(wrapper.find('span').text()).toBe('default text')
  })
})
```

`wrapper`의 메서드 `find`는 해당 엘리먼트를 찾고, 그 엘리먼트 객체의 `text` 메서드는 엘리먼트의 텍스트를 반환한다. 만약 컴포넌트가 아래와 같은 구조를 가지고 있다면 테스트는 통과한다.

```vue
<template>
  <div>
    <span>default text</span>
  </div>
</template>
```

컴포넌트의 `span` 태그를 찾고, 그 안의 텍스트인 default text와 matcher의 인수로 온 문자열과 비교한 후 테스트가 끝난다.

### shallowMount

위의 상황에서, `Greeting` 컴포넌트가 자식 컴포넌트를 가지고 있다면 결과는 어떻게 될까? 예를 들어 아래와 같은 템플릿이 있다.

```vue
<template>
  <div>
    <span>default text</span>
    <Child />
  </div>
</template>
```

위의 컴포넌트를 대상으로 테스트를 진행한다고 한다고 가정한다. `Child` 컴포넌트는 아래와 같이 구성되어 있다고 한다.

```vue
<template>
  <div>
    {{ someText }}
  </div>
</template>

<script>
export default {
  data: () => ({
    someText: 'child components text'
  })
}
</script>
```

`mount` 메서드로 부모 컴포넌트를 렌더링 후 테스트를 진행하면 `Invalid VNode type: undefined (undefined)` 라는 경고 문구가 뜬다. 게다가 자식 컴포넌트에 외부 API에 요청을 하는 로직이 있다고 가정하면 테스트 시간은 느려지고, 실패할 가능성이 있다. 그렇기 때문에 외부 의존성을 없애기 위해서 `shallowMount` 라는 메서드를 사용한다.

이 메서드는 `mount` 메서드와 비슷하게 동작하며 자식 컴포넌트를 렌더링하지 않는다. 대신 자식 컴포넌트를 `<child-stub></child-stub>` 형태로 바꾼다.

한마디로, 테스트를 진행할 범위가 대상이 되는 컴포넌트와 그 자식 컴포넌트까지 영향을 끼친다면 `mount` 메서드로 자식 컴포넌트까지 렌더링해서 접근할 수 있게 하고, 그렇지 않고 한 컴포넌트를 대상으로 하되 외부 의존성을 없애고 자식 컴포넌트를 렌더링할 필요가 없다면 `shallowMount`를 사용한다.

공부해볼 테스트 방법은 유닛 테스트(단위 테스트)이기 때문에 한 컴포넌트의 기능을 테스트하기 위해서 자식 컴포넌트까지 렌더링할 필요가 없어 되도록이면 `shallowMount`를 사용하도록 한다.
