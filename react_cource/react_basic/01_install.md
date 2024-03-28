# 설치 create-react-app

리액트 프로젝트를 만들 폴더를 터미널로 연다.

```bash
npx create-react-app voca
```

리액트 프로젝트는 `npx create-react-app [프로젝트 명]` 멍령어로 만들 수 있다.

여기서 주의해야 할 것이 `npm`이 아닌 `npx`이다.

`npx`는 `npm`에 올라가 있는 패키지를 바로 실행해서 설치해주는 도구이다.

`create-react-app`으로 프로젝트를 만들면, 자동으로 폴더들이 만들어지고, 세팅까지 다 된다.

`webpack`이나 `babel`, 등을 수동으로 설치하고, 세팅해서 개발환경을 구축하려면 상당한 시간과 노력이 필요한데, `create-react-app`은 쉽고 빠르게 모든 것을 구현해준다.

<br />

## 시작하기

`npm start`로 리액트 프로젝트를 실행할 수 있다.

<br />

## 프로젝트 파일 살펴보기

### node_modules

node_modules 폴더에는 프로젝트를 실행할 때 사용되는 모든 dependencies 모듈들이 모두 모여있다.

### package.json

node_modules 폴더에 설치되어 있는 내용들은 `package.json` 파일 `dependencies` 부분에 기록되어 있다.

node_modules 폴더를 지우면, 프로젝트를 뛰울 수 없지만, `package.json` 파일이 있고, 수정이 되지 않았다면, `npm install` 명령어로 그대로 다시 설치할 수 있다.

따라서, git에 올릴 때에도 node_modules 폴더는 크기도 굉장히 크고, 파일도 많기 때문에 올리지 않는다.

`package.json` 파일만 올려두면, 다른 개발자가 동일한 환경을 구축할 수 있기 때문에 문제가 없다.

### index.html

public 폴더 안에 `index.html` 파일이 있다.

이 파일 안에 `<div id="root"></div>`가 있는데, 이 `div` 태그 밑으로 리액트 코드가 실행되어서 만들어진 DOM이 구현된다.

### src 폴더

리액트 프로젝트의 대부분의 src 폴더 내부에서 진행이 된다.

css 파일도 있고, js 파일, 테스트 파일도 있다.

### index.js

```javascript
import App from './App';
```

`index.js` 코드 위쪽에 `App.js` 파일을 불러오는 부분이 있다.

프로젝트 실행 시, 보이는 화면이 `App.js`에 구현된 내용들이다.

```javascript
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

`index.html`의 `<div id="root"></div>`에 `App.js`를 랜더링 시켜준다.

```javascript
reportWebVitals();
```

`reportWebVitals`는 퍼포먼스 관련된 내용이다.

### App.js

`App.js`에서 코드를 구현하면 된다.

`App.js`에서 무언가를 작성하거나 수정하거나 조작을 하게되면 브라우저에 바로 반영이 된다.

이것을 **Hot Module Replacement** 줄여서 **HMR**이라고 한다.

<br />

## 종료하기

터미널에서 `컨트로 키 + C`를 누르면 프로젝트가 종료된다.

<br />

## 다시 시작하기

`npm start`로 프로젝트를 다시 시작할 수 있다.

이러한 명령어는 `package.json` 파일에 명시되어 있다.

<br />

## npm 명령어

1. `start` - 개발 모드로 프로그램을 실행해주는 역할
2. `build` - 실제 배포 모드로 만들어주는 역할
3. `test` - 테스트해주는 역할
4. `eject` - 내부 설정파일을 꺼내는 역할(웹페이지나 바벨 설정을 변경하고 싶을 때 사용)

<br />

## 프로젝트 살펴보기

실행한 리액트 프로젝트를 개발자 도구로 확인해보면, `#root div` 밑에 `.App div`가 있다.

```javascript
<div className="App">...</div>
```

`App.js`를 보면, `className`이 `App`으로 되어 있다.

보통 html에서는 클래스를 `class`로 작성하는데, 자바스크립트에서 `class`는 예약어이기 때문에, 자바스크립트 내에서는 html의 `class`를 `className`으로 적어준다.

위와 같이 자바스크립트 내부에 html처럼 작성하는 것을 **JSX**라고 한다.
