# state, useState

<br />

## state

`state`는 컴포넌트가 가지고 있는 속성값이다.

이 속성값이 변하면 리액트를 자동으로 UI를 업데이트 시켜준다.

따라서, 개발자는 `state`만 잘 관리한다면, 화면을 다시 그려주는 작업은 신경써도 되지 않는 편리함을 제공한다.

```javascript
export default function Hello() {
  let name = 'Henson';

  function changeName() {
    name = name === 'Henson' ? 'Jane' : 'Henson';
    console.log(name);
    document.getElementById('name').innerText = name;
  }

  return (
    <div>
      <h1>Hello</h1>
      <h2 id="name">{name}</h2>
      <button onClick={changeName}>Change</button>
    </div>
  );
}
```

버튼을 클릭하면 `name`을 바꿔주는 `changeName` 함수가 실행되도록 하였는데, 버튼을 클릭하여도, h2 태그의 `name`값이 바뀌지 않는다. 하지만, 콘솔창에서는 `name`이 바뀌는 것을 확인할 수 있다. 즉, DOM 업데이트가 안되는 것이다.

```javascript
function changeName() {
  name = name === 'Henson' ? 'Jane' : 'Henson';
  console.log(name);
  document.getElementById('name').innerText = name;
}
```

바닐라 자바스크립트로 작업을 한다면, 위와 같이 `changeName` 함수에서 DOM 업데이트 작업도 추가적으로 해줘야 한다.

위의 `name`은 컴포넌트가 관리하는 `state` 값이 아닌 단순히 변수일 뿐이다.

그래서 바뀌어도, 리액트는 바뀐 것을 인지하지 못하고, UI를 업데이트해주지 않는다.

<br />

## userState

첫 번째 리액트 훅인 **userState**를 사용하면, state를 만들 수 있다.

훅은 리액트 16.8 버전부터 사용할 수 있다.

초기 리액트에서는 `state`와 `lifecycle`를 관리하려면, 클래스형 컴포넌트를 만들어야 했다.

그리고 단순히 UI만 표현해주는 컴포넌트만 함수형 컴포넌트로 제작했다.

하지만, 16.8 버전부터는 모든 컴포넌트를 함수형 컴포넌트로 만들 수 있게 되었고, 리액트 훅을 이용해서 함수형 컴포넌트에서도 `state`와 `lifecycle` 괸리가 가능해졌다.

상태값 관리를 위해 `useState`를 사용한다.

```javascript
import { useState } from 'react';
```

`useState`를 사용하기 위해서는 위와 같이 `import`를 해주어야 한다.

```javascript
const [name, setName] = useState();
```

`useState`는 배열을 반환하는데, 배열의 첫 번째 값은 `state`이며, 변수명이라고 생각하면 된다.

두 번째는 `state`를 변경해주는 함수이다.

`setName` 함수가 호출되어서 `name`이 바뀌면, 리액트는 컴포넌트를 다시 렌더링 해준다.

`useState()`의 괄호 안에는 초기값을 넣어주면 된다.

### 첫 번째 방법

```javascript
export default function Hello() {
  // let name = 'Henson';
  const [name, setName] = useState('Henson');

  function changeName() {
    const newName = name === 'Henson' ? 'Jane' : 'Henson';
    // document.getElementById('name').innerText = name;
    setName(newName);
  }

  return (
    <div>
      <h1>Hello</h1>
      <h2 id="name">{name}</h2>
      <button onClick={changeName}>Change</button>
    </div>
  );
}
```

`useState()`에 초기값으로 `Henson`을 넣어주고, `newName`이라는 새로운 변수를 만들어서, `setName(newName)`로 함수를 호출해주면 된다.

### 두 번째 방법

```javascript
export default function Hello() {
  // let name = 'Henson';
  const [name, setName] = useState('Henson');

  function changeName() {
    setName(name === 'Henson' ? 'Jane' : 'Henson');
  }

  return (
    <div>
      <h1>Hello</h1>
      <h2 id="name">{name}</h2>
      <button onClick={changeName}>Change</button>
    </div>
  );
}
```

다른 방법으로는 `setName` 함수를 호출할 때, `name === 'Henson' ? 'Jane' : 'Henson'`을 인수로 전달해주면 된다.

### 세 번째 방법

```javascript
export default function Hello() {
  // let name = 'Henson';
  const [name, setName] = useState('Henson');

  return (
    <div>
      <h1>Hello</h1>
      <h2 id="name">{name}</h2>
      <button
        onClick={() => {
          setName(name === 'Henson' ? 'Jane' : 'Henson');
        }}
      >
        Change
      </button>
    </div>
  );
}
```

또 다른 방법으로는, 위와 같이 함수를 아예 JSX에 바로 적어주어도 된다.

<br />

## state 특징

```javascript
// App.js

function App() {
  return (
    <div className="App">
      <Hello />
      <Hello />
      <Hello />
    </div>
  );
}
```

`App` 컴포넌트에 `Hello` 컴포넌트를 세번 그려놓으면, 세 개의 이름 세 개의 버튼이 생성된다.

여기서 두 번째 버튼을 누르면, 두 번째 이름만 바뀐다.

이를 통해서, 동일한 컴포넌트라도, `state`는 각각 관리가 되는 것을 알 수 있다.

즉, 다른 `state`에 영향을 미치지 않는다.
