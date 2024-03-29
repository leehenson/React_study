# CSS 작성법(module css)

리액트에서 css를 작성하는 방법은 여러가지가 있다.

`create-react-app`으로 만든 프로젝트라면, 별도의 다른 패키지 설치 없이 바로 사용할 수 있는 방법 세 가지가 있다.

<br />

## inline 스타일

첫 번째 방법은 css 파일을 따로 작성할 필요 없이 바로 html 태그에 css를 적어주는 방식인 **inline 스타일**이다.

```javascript
<h1
  style={{
    color: '#f00',
    borderRight: '12px solid #000',
    marginBottom: '50px',
    opacity: 1,
  }}
>
  Hello
</h1>
```

JSX에서 inline 스타일은 위와 같이 **객체로 작성해야 한다.**

`style={}` 중괄호 안에 또 하나의 `{}` 중괄호로 객체를 만들고, `key`에는 속성을 적고, `value`에는 속성값을 적어주면 된다.

객체이기 때문에 `;` 세미클론이 아닌 `,` 쉼표로 구분해줘야 한다.

또한, css와 다르게 단어 사이에 `-`를 사용하지 않고, `borderRight`와 같이 카멜 케이스로 작성해야 한다.

속성 값도 문자열일 경우에 `''` 따옴표로 감싸주어야 한다.

숫자는 그냥 숫자를 기입해도 되지만, `px`이 들어갈 경우에는 `marginBottom: '50px'`와 같이 따옴표로 감싸주어야 한다.

**일반적으로 마크업할 때와 마찬가지로, 특별한 이유가 없으면 inline 스타일로 css를 작성하진 않는다.**

<br />

## index.css / App.css

두 번째 방법으로는 `create-react-app`으로 프로젝트를 생성하면 자동적으로 생성되는 `index.css`와 `App.css`를 이용하는 방법이다.

`index.css`는 전체 프로젝트에 영향을 미치는 css 파일이고, `App.css`는 `App` 컴포넌트에 한정되어있는 css 파일이다.

이 두 개의 css 파일에서 클래스도 추가하면서 사용할 수 있다.

주의할 점으로는 `App.css`는 `App` 컴포넌트에만 적용되는 것이 아니다.

```javascript
// App.js
function App() {
  return (
    <div className="App">
      <Hello />
      <div className="box">App</div>
    </div>
  );
}
```

```css
/* App.css */
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

`App` 컴포넌트에 가로와 세로가 100px인 빨간색 박스를 하나 만들었다.

```javascript
import './Hello.css';

export default function Hello() {
  return (
    <div>
      <h1
        style={{
          color: '#f00',
          borderRight: '12px solid #000',
          marginBottom: '50px',
          opacity: 1,
        }}
      >
        Hello
      </h1>
      <div className="box">Hello</div>
    </div>
  );
}
```

```css
.box {
  width: 200px;
  height: 50px;
  background-color: blue;
}
```

`Hello` 컴포넌트에 똑같이 클래스 명이 `box`인 `div`를 하나 만들어주고, `component` 폴더에 `Hello.css`를 새로 만들고, `.box div`를 가로 200px, 세로 50px인 파란색 박스로 만들어주고, `Hello` 컴포넌트에서 `Hello.css`를 `import`해준다.

그러면, `App` 컴포넌트의 `box`와 `Hello` 컴포넌트의 `box`의 스타일이 똑같아졌다.

개발자도구를 확인해보면, 같은 클래스명이라서 오버라이딩이 된다.

각 css 파일들이 각 컴포넌트에 종속되는 것이 아니라, html `<head>` 부분에 모두 들어가게 된다.

따라서, 모든 css 파일들이 `<head>` 안데 다 같이 작성되기 때문에 모든 페이지에 다 영향을 미치게 된다.

## 각 컴포넌트에 특화된 css 작성법

css 모듈을 활용해서 각 컴포넌트에 특화된 css를 작성할 수 있다.

### Hello 컴포넌트에 특화된 css 작성하기

`Hello` 컴포넌트에 특화된 css를 만들기 위해 `Hello.css`를 `Hello.module.css`로 바꿔준다.

> `.module.css` 앞부분은 아무거나 적어도 상관없지만, 보통 컴포넌트의 이름에 맞춰서 적어준다.

`[컴포넌트 명].module.css` 이렇게 작성해줘야 한다.

```javascript
import styles from './Hello.module.css';

export default function Hello() {
  return (
    <div>
      <h1
        style={{
          color: '#f00',
          borderRight: '12px solid #000',
          marginBottom: '50px',
          opacity: 1,
        }}
      >
        Hello
      </h1>
      <div className={styles.box}>Hello</div>
    </div>
  );
}
```

`Hello` 컴포넌트에서 module css는 `import styles from './Hello.module.css';`와 같이 `import` 해주면 `styles`라는 객체가 생성이 된다.

태그의 클래스 이름도 `<div className={styles.box}>Hello</div>`와 같이 문자열이 아니라 `{styles.box}`로 적어주면 된다.

### App 컴포넌트에 특화된 css 작성하기

```css
/* App.module.css */
.box {
  width: 100px;
  height: 100px;
  background-color: red;
}
```

`App.module.css`를 만들고, `.box`의 스타일을 만든 module css 파일로 옮겨준다.

```javascript
// App.js
import './App.css';
import Hello from './component/Hello';
import styles from './App.module.css';

function App() {
  return (
    <div className="App">
      <Hello />
      <div className={styles.box}>App</div>
    </div>
  );
}

export default App;
```

`App` 컴포넌트에서도 `import styles from './App.module.css';`와 같이 모듈 css를 `import`하고, `className={styles.box}`로 클래스 명을 적어준다.

이렇게 모듈 css를 적용해주면, 똑같은 클래스명을 사용하여도, 다른 스타일을 보여준다.

```html
<div class="App">
  <div>
    <h1
      style="color: rgb(255, 0, 0); border-right: 12px solid rgb(0, 0, 0); margin-bottom: 50px; opacity: 1;"
    >
      Hello
    </h1>
    <div class="Hello_box__pBigN">Hello</div>
  </div>
  <div class="App_box__f6BKg">App</div>
</div>
```

개발자 도구로 클래스명을 확인해보면, 위의 `Hello_box__[해쉬 값]`, `App_box__[해쉬 값]`와 같이 해당 컴포넌트에 특화된 클래스명으로 들어가 있다.

따라서, 동일한 클래스 명으로 작성하더라도, 서로 중복될 걱정이 없다.

실제 프로젝트에서 css의 크기가 커지면, 가장 많이 고민되는 부분이 네이밍과 상속, 오버라이딩에 대한 부분인데, 모듈 css 방식으로 말끔히 해결할 수 있다.

또한, 글로벌에서 관리되는 것이 아니라, 컴포넌트 단위로 관리된다는 장점이 있다.
