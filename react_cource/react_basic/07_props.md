# props

**props**는 properties의 약자로, 속성값을 의미한다.

<br />

## props 사용 방법

```javascript
// App.js

function App() {
  return (
    <div className="App">
      <h3>props : properties</h3>
      <Hello age={10} />
      <Hello age={20} />
      <Hello age={30} />
    </div>
  );
}
```

`Hello` 컴포넌트에 `<Hello age={10} />`와 같이 속성값을 전달한다.

```javascript
// Hello.js

export default function Hello(props) {
  console.log(props);
  const [name, setName] = useState('Henson');

  return (
    <div>
      <h2 id="name">
        {name}({props.age})
      </h2>
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

/**
 * {age: 10}
 * {age: 20}
 * {age: 30}
 */
```

그러면 함수형 컴포넌트의 `export default function Hello(props)` 괄호 안에 매개변수로 전달한 값이 들어온다.

매개변수 `props`를 콘솔 로그에 출력해보면, 전달한 값들을 확인할 수 있다.

`props.age`로 전달 받은 값을 컴포넌트에서 사용할 수 있다.

하지만, 이 값은 컴포넌트 내부에서 변경할 수 없고, 넘겨 받은 그대로 사용해야 한다.

```javascript
// Hello.js

export default function Hello(props) {
  const [name, setName] = useState('Henson');
  const [age, setAge] = useState(props.age);

  return (
    <div>
      <h2 id="name">
        {name}({age})
      </h2>
      <button
        onClick={() => {
          setName(name === 'Henson' ? 'Jane' : 'Henson');
          setAge(age + 1);
        }}
      >
        Change
      </button>
    </div>
  );
}
```

만약, 변경하고 싶다면, 컴포넌트 내부에서 `const [age, setAge] = useState(props.age);`와 같이 `state`를 다시 만들어줘야 한다.

`useState()` 괄호에 `props.age`를 넣어서 초기값을 설정해주고, JSX에서도 `state`인 `age`를 사용하고, 버튼 클릭 이벤트에 `setAge(age + 1)` 함수로 클릭 시, `age`값이 증가하도록 하였다.

클릭 이벤트로 값을 변경이 가능한데, 이것은 넘겨받은 값을 변경하는 것이 아니라 `state`인 `age`의 값을 변경하는 것이다.

```javascript
// Hello.js

export default function Hello(props) {
  props.age = 100;
  const [name, setName] = useState('Henson');
  const [age, setAge] = useState(props.age);

  return (
    <div>
      <h2 id="name">
        {name}({age})
      </h2>
      <button
        onClick={() => {
          setName(name === 'Henson' ? 'Jane' : 'Henson');
          setAge(age + 1);
        }}
      >
        Change
      </button>
    </div>
  );
}
```

`props.age = 100;`와 같이 전달 받은 속성값을 변경하려고 하면, read only라는 TypeError가 발생한다.

```javascript
// Hello.js

export default function Hello({ age }) {
  const [name, setName] = useState('Henson');

  return (
    <div>
      <h2 id="name">
        {name}({age})
      </h2>
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

전달 받은 속성값은 구조 분해 할당으로 `export default function Hello({ age }){}`와 같이 받을 수 있다.

```javascript
// Hello.js

export default function Hello({ age }) {
  const [name, setName] = useState('Henson');
  const msg = age > 19 ? '성인 입니다.' : '미성년자 입니다.';

  return (
    <div>
      <h2 id="name">
        {name}({age}) : {msg}
      </h2>
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

`props`로 받은 정보로 `msg`를 만들어서, `const msg = age > 19 ? '성인 입니다.' : '미성년자 입니다.';`와 같이 사용할 수 있다.

<br />

## state와 props

`state`와 `props`는 굉장히 많이 사용된다.

화면에 어떤 데이터를 갱신하기 위해서는 항상 이 두 가지를 사용해서 처리하는 것이 좋다.

한 컴포넌트가 가지고 있는 `state`를 `props`로 넘길수 도 있다.

```javascript
// UserName.js

export default function UserName({ name }) {
  return <p>Hello, {name}</p>;
}
```

`name`을 받아서 그냥 보여주기만 하는 `UserName`이란 컴포넌트를 만들었다.

```javascript
// Hello.js

export default function Hello({ age }) {
  const [name, setName] = useState('Henson');
  const msg = age > 19 ? '성인 입니다.' : '미성년자 입니다.';

  return (
    <div>
      <h2 id="name">
        {name}({age}) : {msg}
      </h2>
      <UserName name={name} />
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

`Hello` 컴포넌트에서 `UserName` 컴포넌트를 호출하고, `state`인 `name`을 `props`로 전달해준다.

이 `name`은 `Hello` 컴포넌트에서는 `state`이지만, `UserName` 컴포넌트에서는 `props`이다.

버튼을 클릭해보면, `Hello` 컴포넌트의 `name`과 `UserName` 컴포넌트의 `name`이 동시에 변경되는 것을 확인할 수 있다.

리액트는 이런 식으로 동작하기 때문에, 개발자는 데이터만 적절히 바꿔주면 된다.

그러면 컴포넌트는 알아서 렌더링을 다시 하고, 화면에 UI 정보는 갱신된다.

일일이 어떤 요소를 어떤 값으로 바꿔줘야 할지 찾아다닐 필요가 없다.
