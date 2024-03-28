# 컴포넌트, JSX

<br />

## 컴포넌트

리액트로 만든 페이지는 컴포넌트들로 구성되어 있다.

페이지 단위로 html을 작성하는 것이 아니라, 각 부분을 컴포넌트로 만들어서, 조립해서 사용한다.

이렇게 함으로써, 비슷한 부분들은 코드를 재사용할 수 있고, 유지보수도 한결 쉬워진다.

예를 들어, 비슷하게 동작하는 부분은 똑같은 컴포넌트를 스타일만 다르게 해서 재활용할 수 있다.

하나 컴포넌트를 만들어놓고, 필요한 여러 곳에서 사용할 수 있다.

### App 컴포넌트

`create-react-app`으로 만든 초기 프로젝트에는 `App`라는 하나의 컴포넌트만 존재한다.

```javascript
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Henson</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React~~~~~~~~~!!!
        </a>
      </header>
    </div>
  );
}
```

`App` 컴포넌트는 함수로 만들어져 있다.

```javascript
export default App;
```

그리고 `export defalut`로 내보내지고 있다.

이것을 `index.js`에서 `import`하여 사용한다.

`App` 컴포넌트와 같이 함수로 만들어진 컴포넌트를 **함수형 컴포넌트**라고 한다.

```javascript
function App() {
  ...
}
```

`function App() {}`와 같이 **모든 컴포넌트는 대문자로 시작해야 한다.**

<br />

## JSX

`function App() {}` 함수가 반환하는 것은 html처럼 생긴 **JSX(JavaScript XML)** 이다.

```javascript
<div className="App">...</div>
```

자바스크립트에서 `class`는 예약어이기 때문에, JSX에서 태그의 클래스는 `className`으로 적어줘야 한다.

```javascript
<h1
  style={{
    color: '#f0f',
    backgroundColor: 'green',
  }}
>
  Hello, Henson.
</h1>
```

그리고 스타일은 위와 같이 자바스크립트로 객체를 작성하여 전달해야 적용된다.

`'red'`, `'#ff0'`, `'#f0f'`와 같은 것도 문자열로 적어줘야 한다.

배경색도 `background-color`가 아닌 `backgroundColor`와 같이 카멜 케이스로 작성해야 한다.

```javascript
function App() {
  const name = 'Henson';
  return (
    <div className="App">
      <h1
        style={{
          color: '#f0f',
          backgroundColor: 'green',
        }}
      >
        Hello, {name}.
      </h1>
    </div>
  );
}
```

위와 같이 `return`문 전에 변수를 하나 만들고, `{}`중괄호 내부에서 변수를 사용할 수 있다.

```javascript
function App() {
  const name = 'Henson';
  return (
    <div className="App">
      <h1
        style={{
          color: '#f0f',
          backgroundColor: 'green',
        }}
      >
        Hello, {name}.<p>{2 + 3}</p>
      </h1>
    </div>
  );
}
```

또는, `<p>{2 + 3}</p>`와 같이 숫자도 사용할 수 있다.

하지만, booleean 타입이나 객체는 표현하지 못한다.

boolean 타입이나 객체를 사용하면 에러가 발생한다.

```javascript
function App() {
  const name = 'Henson';
  const naver = {
    name: '네이버',
    url: 'https://naver.com',
  };
  return (
    <div className="App">
      <h1
        style={{
          color: '#f0f',
          backgroundColor: 'green',
        }}
      >
        Hello, {name}.<p>{2 + 3}</p>
      </h1>
      <a href={naver.url}>{naver.name}</a>
    </div>
  );
}
```

하지만, `<a href={naver.url}>{naver.name}</a>`와 같이 문자열이나 숫자를 반환하는 객체의 프로퍼티는 사용할 수 있다.
