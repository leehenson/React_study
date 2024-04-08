# POST(생성), useHistory()

<br />

## CreateWord 컴포넌트 생성

```javascript
// CreateWord.js

export default function CreateWord() {
  return <form></form>;
}
```

단어 추가를 위해 `CreateWord` 컴포넌트를 추가적으로 만들어준다.

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
          <Route path="/create_word">
            <CreateWord />
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

```javascript
// Header.js

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">토익 영단어(고급)</Link>
      </h1>
      <div className="menu">
        <Link to="/create_word" className="link">
          단어 추가
        </Link>
        <a href="#x" className="link">
          Day 추가
        </a>
      </div>
    </div>
  );
}
```

`CreateWord` 컴포넌트로 이동할 수 있게끔, `App` 컴포넌트에서 라우터 설정과 `Header` 컴포넌트에서 링크 버튼 설정을 해준다.

<br />

## 단어 추가 기능

```javascript
// CreateWord.js

export default function CreateWord() {
  return (
    <form>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select>
          <option>1</option>
          <option>2</option>
        </select>
      </div>
      <button>저장</button>
    </form>
  );
}
```

간단한 작성 폼 UI를 위와 같이 만들어준다.

```javascript
// CreateWord.js

import useFetch from '../hooks/useFetch';

export default function CreateWord() {
  const days = useFetch('http://localhost:3001/days');

  return (
    <form>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button>저장</button>
    </form>
  );
}
```

커스텀 훅인 `useFetch()`를 사용하여, `days`를 가져온 후에 `map()`을 통해서 `select` 태그의 `option`으로 뿌려준다.

그리고 현재는 `<form>`태그로 감싸져 있기 때문에, 버튼을 누르면 새로고침이 된다.

```javascript
// CreateWord.js

export default function CreateWord() {
  const days = useFetch('http://localhost:3001/days');

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="input_area">
        <label>Eng</label>
        <input type="text" placeholder="computer" />
      </div>
      <div className="input_area">
        <label>Kor</label>
        <input type="text" placeholder="컴퓨터" />
      </div>
      <div className="input_area">
        <label>Day</label>
        <select>
          {days.map((day) => (
            <option key={day.id} value={day.day}>
              {day.day}
            </option>
          ))}
        </select>
      </div>
      <button>저장</button>
    </form>
  );
}
```

`onSubmit`이라는 함수를 만들고, 위와 같이 `<form>`에 연결해준다.

`onSubmit` 함수는 이벤트를 받아서, `e.preventDefault()`를 통해서 버튼의 기본 기능을 막아준다.

<br />

## useRef()

저장 버튼을 누르면 단어와 뜻에 대한 정보를 출력하기 위해, `useRef()`라는 훅을 사용해야 한다.

`useRef()`는 DOM에 접근할 수 있게 해준다.

예를 들어, 스크롤 위치를 확인하거나, 포커스를 주거나 할 때, 사용할 수 있다.

```javascript
// CreateWord.js

const engRef = useRef(null);
const korRef = useRef(null);
const dayRef = useRef(null);
```

영어, 한국어, 일차에 대한 `engRef`, `korRef`, `dayDef` 세 개의 `Ref`를 만든다. 초기값은 `null`이다.

```javascript
// CreateWord.js

return (
  <form onSubmit={onSubmit}>
    <div className="input_area">
      <label>Eng</label>
      <input type="text" placeholder="computer" ref={engRef} />
    </div>
    <div className="input_area">
      <label>Kor</label>
      <input type="text" placeholder="컴퓨터" ref={korRef} />
    </div>
    <div className="input_area">
      <label>Day</label>
      <select ref={dayRef}>
        {days.map((day) => (
          <option key={day.id} value={day.day}>
            {day.day}
          </option>
        ))}
      </select>
    </div>
    <button>저장</button>
  </form>
);
```

그리고 각 태그에 `Ref`를 연결해준다.

이렇게 연결해주면, 도 용소가 생성된 후에 접근할 수 있다.

저장 버튼을 클릭하는 시점은 렌더링된 결과가 DOM에 반영된 이후이다.

```javascript
// CreateWord.js

function onSubmit(e) {
  e.preventDefault();

  console.log(engRef.current.value);
  console.log(korRef.current.value);
  console.log(dayRef.current.value);
}

/** output
 * apple
 * 사과
 * 3
 */
```

`current` 속성을 이용하면, 해당 요소에 접근할 수 있고, `value`는 input창에 입력된 값을 얻을 수 있다.

`POST`를 이용해서 단어를 생성하기 위해서는, `day`, `eng`, `kor`, `isDone`인데, `day`, `eng`, `kor`는 폼으로 입력을 받고, `isDone`은 초기값 `false`로 고정해서 저장하도록 한다.

```javascript
// CreateWord.js

function onSubmit(e) {
  e.preventDefault();

  console.log(engRef.current.value);
  console.log(korRef.current.value);
  console.log(dayRef.current.value);

  fetch(`http://localhost:3001/words`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      day: dayRef.current.value,
      eng: engRef.current.value,
      kor: korRef.current.value,
      isDone: false,
    }),
  }).then((res) => {
    if (res.ok) {
      alert('생성이 완료되었습니다.');
    }
  });
}
```

`fetch()` 함수를 사용을 해서 POST API를 작성해주면 되는데, 위와 같이 주소는 `http://localhost:3001/words`로 하고, `method`는 `POST`로 하고, `body`에 `isDone`은 `false`로 고정하고, `day`, `eng`, `kor`의 값은 각 `Ref`를 할당해준다.

그리고, 단어 생성이 완료되면, `alert`를 띄우도록 한다.

`http://localhost:3001/words`까지만 입력하고, `POST`를 날리면, 새로운 단어가 생성된다. 필요한 데이터는 `body`부분에 입력을 해주었다.

한번 input창에 데이터를 넣고, 저장 버튼을 눌러보면, 잘 생성되는 것을 확인할 수 있다.

<br />

## useHistory()

하지만, 이렇게 하면 매번 생성될 때마다, 직접 해당 페이지로 가봐야지 생성이 되었는지를 확인할 수 있다.

그래서, 생성이 완료되면, 생성한 페이지로 보내주어야 하는데, 이 때 `useHistory()`라는 것을 사용하면 된다.

`useHistory()`는 리액트 라우터에서 지원하는 기능이다.

```javascript
// CreateWord.js
const days = useFetch('http://localhost:3001/days');
const history = useHistory();

const engRef = useRef(null);
const korRef = useRef(null);
const dayRef = useRef(null);

function onSubmit(e) {
  e.preventDefault();

  fetch(`http://localhost:3001/words`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      day: dayRef.current.value,
      eng: engRef.current.value,
      kor: korRef.current.value,
      isDone: false,
    }),
  }).then((res) => {
    if (res.ok) {
      alert('생성이 완료되었습니다.');
      history.push(`/day/${dayRef.current.value}`);
    }
  });
}
```

`alert()` 다음에 `history`에 `push()`를 해주면 되는데, `push()` 괄호 안에는 위와 같이 보내고 싶은 주소를 넣어주면 된다.

여기서 주소의 값인 `dayRef.current.value`를 넣어주면 된다.

이렇게 `useHistory()`로 생성한 히스토리에 주소를 `push`해주면 해당 페이지로 이동한다.

`<Link to='#'>`처럼 `<a>`태그를 사용하지 않고, 페이지를 전환시킬 때 유용하게 사용할 수 있다.

테스트를 진행해보면, 잘 되는 것을 확인할 수 있다.

<br />

## CreateDay 컴포넌트 생성

```javascript
// CreateDay.js

export default function CreateDay() {
  return (
    <div>
      <h3>현재 일수 : 10일</h3>
      <button>Day 추가</button>
    </div>
  );
}
```

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
          <Route path="/create_word">
            <CreateWord />
          </Route>
          <Route path="/create_day">
            <CreateDay />
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

```javascript
// Header.js

export default function Header() {
  return (
    <div className="header">
      <h1>
        <Link to="/">토익 영단어(고급)</Link>
      </h1>
      <div className="menu">
        <Link to="/create_word" className="link">
          단어 추가
        </Link>
        <Link to="/create_day" className="link">
          Day 추가
        </Link>
      </div>
    </div>
  );
}
```

위와 같이 `CreateDay` 컴포넌트는 생성하고, `CreateWord` 컴포넌트처럼 `App` 컴포넌트와 `Header` 컴포넌트에 라우터와 링크를 설정해준다.

<br />

## Day 추가 기능

```javascript
// CreateDay.js

export default function CreateDay() {
  const days = useFetch('http://localhost:3001/days');

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button>Day 추가</button>
    </div>
  );
}
```

커스텀 훅을 사용하여, `days`의 데이터를 가져오고, `<h3>현재 일수 : {days.length}일</h3>`로 현재 며칠까지 있는지 표시해준다.

```javascript
// CreateDay.js

import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../hooks/useFetch';

export default function CreateDay() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();

  function addDay() {
    fetch(`http://localhost:3001/days`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        day: days.length + 1,
      }),
    }).then((res) => {
      if (res.ok) {
        alert('생성이 완료되었습니다.');
        history.push('/');
      }
    });
  }

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button onClick={addDay}>Day 추가</button>
    </div>
  );
}
```

`Day 추가` 버튼을 클릭하면 데이터가 추가될 수 있도록, `addDay()`라는 함수를 만들고, 버튼에 `onClick` 이벤트 핸들러로 설정해준다.

`addDay()` 함수는 `CreateWord` 컴포넌트에 `onSubmit` 함수와 비슷하게 동작하기 때문에, `onSubmit` 함수의 내부를 그대로 가져와서, 주소를 `http://localhost:3001/days`로 설정해주고, `body`는 `day` 하나만 필요하고, 현재 `day`에 `1`를 추가만 해주면 되기 때문에, `day: days.length + 1`로 설정해준다.

그리고 완료가 되면 첫 번째 페이지로 이동하기 위해 `history.push('/');`를 `alert` 뒤에 넣어준다.

테스트를 해보면 `Day` 추가와 단어 추가 모두 정상적으로 작동하는 것을 확인할 수 있다.
