# 라우터 구현 react-router-dom

```bash
npm install react-router-dom@5.2.0
```

라우터 구현을 위해서 위의 명령어로 `react-router-dom@5.2.0`을 설치한다.

<br />

## BrowserRouter, Route, Switch

### BrowserRouter

```javascript
// App.js

import { BrowserRouter, Route, Switch } from 'react-router-dom';
```

설치한 `react-router-dom`을 사용하기 위해서, `App` 컴포넌트에서 위와 같이 `BrowserRouter`, `Route`, `Switch`를 import 해준다.

```javascript
// App.js

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <DayList />
        <Day />
      </div>
    </BrowserRouter>
  );
}
```

우선, `App` 컴포넌트 JSX 자체를 `<BrowserRouter>`로 감싸준다.

### Switch

```javascript
// App.js

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <DayList />
          <Day />
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

모든 페이지에 나와야할 컴포넌트를 제외한 컴포넌트. 즉, 페이지에서 바뀌어야하는 컴포넌트들을 `<Switch>`로 감싸준다.

이렇게 하면, `<Switch>` 내부는 url에 따라 각각 다른 페이지를 보여주게 된다.

`<Switch>` 외부는 모든 페이지에서 공통적으로 보여진다.

만약 footer를 사용한다면, 하단 `</Switch>` 바깥 부분에 넣어주면 된다.

### Route

```javascript
// App.js

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/">
            <DayList />
          </Route>
          <Route path="/day">
            <Day />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

`<Route path="/"></Route>`에서 `path` 뒤에 주소를 적어주면 되는데, `path="/"`는 첫 페이지를 의미한다.

주소에 따라 보여주고 싶은 컴포넌트를 `<Route>` 태그 사이에 넣어주면 된다.

그런데 이렇게 설정을 한 뒤에, `/day`로 접속을 하여도, 첫 페이지와 동일하게 `DayList` 컴포넌트가 보인다.

`<Switch>`로 `<Route>`들을 감싸놓으면, 일치하는 첫 번째 결과를 보여주는데, `/day`에도 `/`가 포함되어 있기 때문이다.

```javascript
// App.js

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <DayList />
          </Route>
          <Route path="/day">
            <Day />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

따라서, 이러한 경우에는 위의 `<Route exact path="/">`와 같이 `exact`를 써줘야 한다.

그러면 정확하게 `/`로 일치할 경우에만 `DayList` 컴포넌트가 렌더링된다.

<br />

## Link

```javascript
// DayList.js

import { Link } from 'react-router-dom';
import dummy from '../db/data.json';

export default function DayList() {
  console.log(dummy);
  return (
    <ul className="list_day">
      {dummy.days.map((day) => (
        <li key={day.id}>
          <Link to="/day">Day {day.day}</Link>
        </li>
      ))}
      <li></li>
    </ul>
  );
}
```

html에서는 링크 연결을 위해서 `<a>` 태그와 `href` 속성을 사용하지만, 리액트 라우터는 `<Link>` 태그와 `to` 속성을 사용한다.

`Link`를 사용하기 위해 `import { Link } from 'react-router-dom'`로 import해주고, `<Link to="/day">Day {day.day}</Link>`로 링크를 연결해준다.

개발자 도구를 확인해보면, `<a>` 태그로 렌더링 된 것을 확인할 수 있고, 클릭을 하면, `/day`로 잘 이동이 된다.

```javascript
// Header.js

import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">토익 영단어(고급)</Link>
      </h1>
      <div className="menu">
        <a href="#x" className="link">
          단어 추가
        </a>
        <a href="#x" className="link">
          Day 추가
        </a>
      </div>
    </div>
  );
}
```

`Header` 컴포넌트의 `<h1>`을 누르면, 첫 페이지로 이동할 수 있게, 위와 같이 `<h1>`에 `<Link>`로 링크 연결을 해준다.

```javascript
// DayList.js

export default function DayList() {
  console.log(dummy);
  return (
    <ul className="list_day">
      {dummy.days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
```

Day 1 버튼을 누르면 1일차 페이지로, Day 2 버튼을 누르면 2일차 페이지로 이동하게 하기위해서 `DayList` 컴포넌트에서는 위와 같이 해주면 `/day/1`과 같은 식으로 라우트가 된다.

하지만, url만 바뀔 뿐 페이지는 바뀌지 않는다.

```javascript
// App.js

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <DayList />
          </Route>
          <Route path="/day:day">
            <Day />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

`react-router-dom`에서 url에 있는 값을 `day`로 사용하는 것과 같이 다이나믹한 url을 처리할 때에는 `<Route path="/day:day">`와 같이 `:` 콜론을 사용하면 된다.

이렇게 하면, `<Route path="/day:day">`에서 `/day/1`로 들어왔을 때, `day`라는 변수로 `1`이라는 값을 얻을 수 있다.

`<Route path="/day:id">`이면 `id`라는 변수로 `1`을 얻을 수 있다.

위와 같이 url에 포함된 값을 얻을 때에는 `react-router-dom`에서 제공하는 `useParams` 훅을 사용하면 된다.

<br />

## useParams

```javascript
// Day.js
import dummy from '../db/data.json';
import { useParams } from 'react-router-dom';

export default function Day() {
  const day = 3;
  const wordList = dummy.words.filter((word) => word.day === day);

  const a = useParams();
  console.log(a);

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {wordList.map((word) => (
            <tr key={word.id}>
              <td>{word.eng}</td>
              <td>{word.kor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

`useParmas` 훅을 사용하기 위해서는 `import { useParams } from 'react-router-dom'`로 import를 해야 한다.

`useParams`는 `const a = useParams()`와 같이 사용하면 된다. `a`를 출력하면, url의 값이 잘 들어오는 것을 확인할 수 있다.

```javascript
// Day.js

export default function Day() {
  const { day } = useParams();
  const wordList = dummy.words.filter((word) => word.day === day);

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {wordList.map((word) => (
            <tr key={word.id}>
              <td>{word.eng}</td>
              <td>{word.kor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

고정적으로 사용하던 `day` 변수를 `const { day } = useParams()`를 통해 url의 값으로 할당해줄 수 있다.

하지만, url로 받아온 `day`의 값은 문자형이고, `words`의 `day`는 숫자형이기 때문에, `filter()`에서 처리를 하지 못하여, 단어들이 출력되지 않고 있다.

```javascript
// Day.js

const wordList = dummy.words.filter((word) => word.day === Number(day));
```

따라서, 위와 같이 `Number(Day)`로 문자형을 숫자형으로 변경해주어야 한다. 그러면 일치하는 정보가 잘 출력이 된다.

`/xxx`와 같이 명시하지 않은 url 주소를 치면, 본문에 아무것도 나오질 않는다.

`App` 컴포넌트에 일치하는 라우터가 없기 때문이다.

```javascript
// EmptyPage.js

import { Link } from 'react-router-dom';

export default function EmptyPage() {
  return (
    <>
      <h2>잘못된 접근입니다.</h2>
      <Link to="/">돌아가기</Link>
    </>
  );
}
```

홈으로 돌아가는 링크를 가진 `EmptyPage` 컴포넌트를 생성한다.

```javascript
// App.js

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <DayList />
          </Route>
          <Route path="/day/:day">
            <Day />
          </Route>
          <Route>
            <EmptyPage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

`App` 컴포넌트에서 `<Switch>` 안의 제일 아래에 위와 같이 아무것도 적지 않은 `<Route>`를 생성하고, 그 안에 `<EmptyPage>` 컴포넌트를 넣어주면, 앞에 조건을 모두 만족하지 않으면, `EmptyPage` 컴포넌트가 보여지게 된다.

근데 만약 이 부분을 제일 위에 넣어주면, 모든 페이지가 이 페이지로 이동하기 때문에 주의해야 한다.
