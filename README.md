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

### props

컴포넌트는 부모로부터 물려받는 `props`라는 속성이 있다. 테스트를 진행할 때 구성할 수 있다. 여러 테스트르 진행하기 위해 테스트마다 다른 컴포넌트를 생성해주는 팩토리 메서드를 하나 만든다.

```js
import { shallowMount } from '@vue/test-utils'
import Greeting from '../../src/components/Greeting.vue'

const factory = props => {
  return shallowMount(Greeting, {
    props: {
      ...props
    }
  })
}
```

`factory` 메서드는 `props`를 인자로 받아 마운팅된 뷰 인스턴스 Wrapper를 반환한다. 그럼 서로 다른 `props`를 테스트할 때 유용하게 쓸 수 있다. 만약 `isAdmin` 속성을 부모로부터 물려받고 이 속성이 참이면 어떤 메세지를 보여준다는 걸 가정하고 테스트를 진행할 때 아래와 작성할 수 있다.

```js
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
```

`Greeting` 컴포넌트는 `isAdmin`이 참이면 Hello Admin이라는 텍스트가 버튼안에 포함되고, 그렇지 않으면 Hello User라는 텍스트가 포함된다. 즉 이 테스트는 통과된다. 팩토리 메서드의 인자로 `props`를 줘서 정상적으로 통과되는 걸 볼 수 있다.

### computed

어떤 데이터에 의존해서 새로운 결과를 반환하는 `computed` 속성은 `props`를 테스트하는 것과 비슷하게 진행할 수 있다. 아래 간단한 `number` 타입 `props`를 받는 컴포넌트가 하나 있다. 수가 짝수면 `even`이 표시되고 홀수면 `odd`가 표시된다.

```vue
<template>
  <div>
    {{ num }}
  </div>
</template>

<script>
export default {
  props: {
    original: {
      type: Number,
      required: true
    }
  },

  computed: {
    num() {
      return this.original % 2 == 0 ? 'even' : 'odd'
    }
  }
}
</script>
```

이 컴포넌트가 정상적으로 작동하는지에 대해 테스트한다. 이전에 했던 것처럼 `props`를 주어 정상적으로 작동하는지 본다.

```js
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
```

`props`의 `original`은 3이다. 그러므로 NumberCard 컴포넌트의 `num` 속성은 odd라는 문자열이기 때문에 정확히 odd가 찍힌걸 볼 수 있다.

## Event Trigger

이벤트가 정상적으로 작동하는지에 대한 테스트를 진행할 수 있다.

### 비동기 이벤트

폼이 있고, 폼 안에 `submit` 버튼을 누르면 외부 API 서버에 요청해서 데이터를 받는 이벤트에 대해서 테스트를 진행해본다. 핸드북에 나오는 예제는 실제 API 서버에 요청하지 않고 서버가 어떻게 응답을 하는지를 추상화 시켜 `mock`을 만들어 테스트에 사용한다.

예를 들어 `/api/show` 경로에 `username`과 함께 요청하면 정상적인 응답을 한다고 가정하고 테스트를 진행한다. 먼저 폼과 서버의 요청이 완료되면 보여줄 부분을 컴포넌트로 만든다.

```vue
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
```

폼이 `submit`되면 기본적인 브라우저 동작에서는 페이지가 새로고침 되기 때문에 `prevent` 접미사를 붙인다. 그리고 `submit`하는 이벤트 메서드는 `Promise`를 반환하는 비동기 이벤트이다. 실제로는 `$http`에 `axios`같은 모듈이 많이 쓰인다.

### 테스트

가짜 요청에 의한 가짜 응답을 하기 위해 간단한 객체와 메서드를 만든다.

```js
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
```

해당 객체는 `get` 메서드를 가지고 있으며 이 메서드는 `Promise`를 반환한다. 인자를 두 개 받고 `url`과 `data`도 테스팅하기 위해 받은 데이터를 모두 저장해둔다.

```js
describe('EventTrigger.vue', () => {
  test('Show username on submit event', async () => {
    const wrapper = shallowMount(EventTrigger)
  })
})
```

테스트에 사용할 간단한 `wrapper`를 반환받는다.

```js
wrapper.find('[data-username]').setValue('alice')
wrapper.find('form').trigger('submit.prevent')
```

폼을 테스트할 데이터로 채워준다. 그리고 `trigger` 메서드를 이용해서 이벤트를 실행시킨다.

```js
expect(wrapper.find('.message').text()).toBe('alice')
```

`message` 클래스를 가지는 원소의 텍스트는 `alice`여야 한다는 테스트 구문인데, 이대로 실행하게 되면 오류가 난다. 오류에는 2가지 이유가 있다.

- `$http`가 아직 정의되지 않았다.
- `Promise`가 처리되기 전에 테스트가 끝났다.
- DOM이 업데이트 되기 전에 테스트가 끝났다.

`$http`는 나중에 `axios` 모듈을 추가해서 프로토타입에 객체를 바인딩시키면 되지만, 테스트에서는 `axios`를 사용하지 않기 때문에 우리가 만들어놓았던 `mock` 객체를 바인딩 시켜주어야 한다. 컴포넌트를 마운팅할 때, 뷰 인스턴스의 속성 등을 인젝션시킬 수 있다. `shallowMount` 혹은 `mount`의 두번째 인자에 해당하는 옵션을 준다.

```js
const wrapper = shallowMount(EventTrigger, {
  global: {
    mocks: {
      $http: mockHttp
    }
  }
})
```

핸드북에서는 두번째 인자에 바로 `mocks` 속성에 바인딩하면 되지만, `@vue/test-utils` 라이브러리의 버전이 올라감에 따라 위와 같이 바뀌었다. 이제 `this.$http`는 우리가 만들어 놓았던 `mock` 객체가 되었다.

```sh
yarn add flush-promises
```

해당 라이브러리는 현재 `Promise`를 모두 처리된 상태로 만들어주는 테스트할 때 유용한 라이브러리다.

```js
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
```

전체적인 테스트 내용을 이렇게 작성해주고 `url`과 `data`까지 테스트해주면 된다.
