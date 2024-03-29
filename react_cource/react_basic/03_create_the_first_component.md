# 첫 컴포넌트 만들기

`src` 폴더에 `component`라는 폴더를 만들고, `component` 폴더 안에 컴포넌트를 만들어준다.

`js` 파일을 만들고, 그 파일 안에 컴포넌트를 함수로 만들고, 만든 함수를 `export` 해주면 간단하게 컴포넌트를 만들 수 있다.

함수형 컴포넌트는 항상 대문자로 시작해야 한다.

<br />

## Hello 컴포넌트 만들고 내보내기

```javascript
const Hello = function () {
  return <h1>Hello</h1>;
};

export default Hello;
```

```javascript
const Hello = () => {
  return <h1>Hello</h1>;
};

export default Hello;
```

```javascript
export default function Hello() {
  return <h1>Hello</h1>;
}
```

`Hello.js`라는 파일을 만들고, `Hello`라는 컴포넌트를 만들어준다.

위의 세 가지 방식 중 마음에 드는 아무 방식으로 만들어주어도 된다.

JSX 앞에 `return`문을 꼭 작성해주어야 한다.

<br />

## App 컴포넌트에서 Hello 컴포넌트 불러오기

```javascript
import Hello from './component/Hello';
```

위와 같이 `Hello`라는 이름으로 `Hello` 컴포넌트를 `import`한다.

`from` 뒤 경로에는 `.js`를 안붙여도 된다.

```javascript
import './App.css';
import Hello from './component/Hello';

function App() {
  return (
    <div className="App">
      <Hello />
    </div>
  );
}

export default App;
```

불러온 `Hello` 컴포넌트는 위와 같이 `<Hello />`로 원하는 위치에 넣어주면 된다.

`<Hello></Hello>`로 넣어줘도 되지만, 태그 중간에 들어갈 내용이 없을 때는 `<Hello />`와 같이 셀프 클로즈를 해주는 것이 좋다.

<br />

## Welcome 컴포넌트 만들고, App 컴포넌트에서 불러오기

```javascript
export default function Welcome() {
  return <h2>Welcome</h2>;
}
```

```javascript
import './App.css';
import Hello from './component/Hello';
import Welcome from './component/Welcome';

function App() {
  return (
    <div className="App">
      <Hello />
      <Welcome />
    </div>
  );
}

export default App;
```

`Welcome` 컴포넌트를 만들고, `App` 컴포넌트에서 불러온다.

<br />

## World 컴포넌트를 만들고, Hello 컴포넌트에서 불러오기

```javascript
export default function World() {
  return <h3>World</h3>;
}
```

`World` 컴포넌트를 만든 후,

```javascript
import World from './World';

export default function Hello() {
  return (
    <div>
      <h1>Hello</h1>
      <World />
    </div>
  );
}
```

`Hello` 컴포넌트에서 불러온다.

여기서 주의해야 할 점이 있는데, JSX는 **하나의 태그만 만들 수 있다.**

```javascript
export default function Hello() {
  return (
    <h1>Hello</h1>
    <World />;
  );
}
```

그래서 위와 같이 작성 시, 태그가 두개이기 때문에 에러가 발생한다.

따라서, `<div>`태그나 `<>` 빈 태그로 묶어서 하나의 태그로 만들어줘야 한다.

<br />

## 전체 컴포넌트

`App` 컴포넌트에는 `Hello`와 `Welcome` 컴포넌트가 있고, `Hello` 컴포넌트에는 `World` 컴포넌트가 있게 된다.

또한, 리액트는 똑같은 컴포넌트를 여러 번 사용해도 된다.

```javascript
import World from './World';

export default function Hello() {
  return (
    <div>
      <h1>Hello</h1>
      <World />
      <World />
    </div>
  );
}
```

위와 같이 `Hello` 컴포넌트에서 `World` 컴포넌트를 여러 번 사용해도 된다.

```javascript
import './App.css';
import Hello from './component/Hello';
import Welcome from './component/Welcome';

function App() {
  return (
    <div className="App">
      <Hello />
      <Welcome />
      <Hello />
      <Hello />
    </div>
  );
}

export default App;
```

`App` 컴포넌트에서 `Hello` 컴포넌트를 여러 번 사용해도 문제가 되질 않고, 자유롭게 위치를 옮길 수도 있다.

**한번 만들어둔 컴포넌트는 어디에든 몇번이든 재사용이 가능하다.**
