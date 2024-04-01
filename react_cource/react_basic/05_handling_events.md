# 이벤트 처리(Handling events)

<br />

## onClick 사용

### 첫 번째 방법

```javascript
export default function Hello() {
  function showName() {
    console.log('Henson');
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>Show name</button>
      <button>Show age</button>
    </div>
  );
}
```

`Show name` 버튼을 누르면 이름을, `Show age`버튼을 누르면 나이를 콘솔창에 출력하려고 한다.

이벤트를 거는 첫 번째 방법은 미리 함수를 하나 만들어놓고, 전달을 하는 것이다.

`showName()`이라는 함수를 만들어놓고, 버튼에 `onCick`으로 함수를 넣어주면 되는데, `onCick`에 전달해야 하는 내용이 문자열이 아니기 때문에 `{}` 중괄호에 함수를 넣어주면 된다.

> JSX에서는 `onClick`과 같이 카멜 케이스로 작성해줘야 한다.

`{}` 중괄호 안에 `showName`가 아닌 `showName()`을 넣게되면, `showName()` 함수가 반환하는 값이 들어가게 된다. 위의 코드에서는 `showName()` 함수가 반환하는 값이 없기 때문에 `undefined`가 들어간다. 따라서 `showName` 함수명만 적어주면 된다.

### 두 번째 방법

```javascript
export default function Hello() {
  function showName() {
    console.log('Henson');
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>Show name</button>
      <button
        onClick={() => {
          console.log(29);
        }}
      >
        Show age
      </button>
    </div>
  );
}
```

두 번째 방법은 `onClick={}` 중괄호 내부에 직접 함수를 작성하는 방법이다.

두 번째 방법은 매개변수를 전달하기 편하다는 장점이 있다.

두 가지 방법중에서 상황에 맞게 적절하게 사용하면 된다.

### 세 번 째 방법

```javascript
export default function Hello() {
  function showName() {
    console.log('Henson');
  }

  function showAge(age) {
    console.log(age);
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>Show name</button>
      <button
        onClick={() => {
          showAge(29);
        }}
      >
        Show age
      </button>
    </div>
  );
}
```

위와 같이 매개변수를 받는 함수를 작성해놓고, 인수를 전달하여, 함수를 호출하는 함수를 작성하는 것도 가능하다.

<br />

## onChange 사용

### 첫 번째 방법

```javascript
export default function Hello() {
  function showName() {
    console.log('Henson');
  }

  function showAge(age) {
    console.log(age);
  }

  function showText(e) {
    console.log(e.target.value);
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>Show name</button>
      <button
        onClick={() => {
          showAge(29);
        }}
      >
        Show age
      </button>
      <input thype="text" onChange={showText} />
    </div>
  );
}
```

위의 input창에서 작성할 때마다 로그를 출력하는 코드이다.

input창이 바뀔 때마다 `showText` 함수를 실행하기 위해서 `onChange={showText}`를 사용해준다.

`showText` 함수는 매개변수 `e`로 이벤트 객체 받아서, `e.target.value` 즉, input에 작성한 값을 콘솔창에 출력한다.

따라서, input창에 글자를 작성할 때마다 input의 값이 로그에 출력된다.

## 두 번째 방법

```javascript
export default function Hello() {
  function showName() {
    console.log('Henson');
  }

  function showAge(age) {
    console.log(age);
  }

  // function showText(e) {
  //   console.log(e.target.value);
  // }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>Show name</button>
      <button
        onClick={() => {
          showAge(29);
        }}
      >
        Show age
      </button>
      <input
        thype="text"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );
}
```

위와 같이 `onChange`안에 함수를 직접 작성해도 되고,

### 세 번째 방법

```javascript
export default function Hello() {
  function showName() {
    console.log('Henson');
  }

  function showAge(age) {
    console.log(age);
  }

  function showText(txt) {
    console.log(txt);
  }

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={showName}>Show name</button>
      <button
        onClick={() => {
          showAge(29);
        }}
      >
        Show age
      </button>
      <input
        thype="text"
        onChange={(e) => {
          const txt = e.target.value;
          showText(txt);
        }}
      />
    </div>
  );
}
```

위와 같이 `e.target.value`를 변수에 담고, 해당 변수를 인수로 함수를 호출하여도 똑같이 동작한다.

<br />

## 정리

위의 다양한 이벤트 처리방법 중에서 상황에 맞게 편하고, 가독성 좋은 코드를 활용하면 된다.
