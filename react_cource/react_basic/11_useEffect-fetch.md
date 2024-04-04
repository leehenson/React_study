# useEffect, fetch()로 API 호출

<br />

## DayList 컴포넌트 수정

```javascript
// DayList.js

import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function DayList() {
  const [days, setDays] = useState([]);

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
```

`DayList` 컴포넌트에서 import하던 더미 데이터를 지우고, `days`라는 새로운 `state`를 만든다.

<br />

## useEffect

```javascript
// DayList.js

export default function DayList() {
  const [days, setDays] = useState([]);

  useEffect();

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
```

`useEffect`라는 훅이 있는데, `useState`와 마찬가지로 `react`에서 import 해온다.

**useEffect**는 어떤 상태값이 바뀌었을 때, 동작하는 함수를 작성할 수 있다.

```javascript
// DayList.js

export default function DayList() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    console.log('change');
  });

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
```

`useEffect()`는 첫 번째 매개변수로 함수를 받는다.

개발자 도구를 열고, 새로고침을 하면 콘솔창에 `change`가 출력된다.

이 함수는 렌더링 결과가 실제 DOM에 반영된 직후에 호출된다.

따라서, UI가 다 그려지고 나서, `change`가 출력되게 된다.

그리고, 컴포넌트가 사라지기 직전에도 마지막으로 호출된다.

```javascript
// DayList.js

export default function DayList() {
  const [days, setDays] = useState([]);
  const [count, setCount] = useState(0);

  function onclick() {
    setCount(count + 1);
  }

  useEffect(() => {
    console.log('Count change');
  });

  return (
    <>
      <ul className="list_day">
        {days.map((day) => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          </li>
        ))}
      </ul>
      <button onClick={onclick}>{count}</button>
    </>
  );
}
```

`count`라는 `state`를 만들고, 초기값은 `0`으로 준다.

`count` 스테이트를 1씩 증가시키는 `onclick()` 함수를 구현한다.

`count`를 값으로 표시해주는 버튼에 클릭 이벤트로 `onclick` 함수를 넣어준다.

그러면 버튼을 클릭할 떄마다, `count`가 1씩 증가하고, 렌더링된 다음에 `useEffect()`가 동작하여, 콘솔 로그가 출력되는 것을 확인할 수 있다.

만약, 렌더링을 끝내고 API 호출과 같은 어떤 작업을 하고 싶다면, `useEffect()`의 첫 번째 매개변수로 함수를 전달해주면 된다.

하지만, 위와 같이 코드를 짠다면, 매번 렌더링이 될 때마다 불필요하게 함수가 호출될 수 있다.

원하지 않는 상황에서 호출될 수 있다는 것이다.

```javascript
// DayList.js

export default function DayList() {
  const [days, setDays] = useState([]);
  const [count, setCount] = useState(0);

  function onclick() {
    setCount(count + 1);
  }

  function onclick2() {
    setDays([
      ...days,
      {
        id: Math.random(),
        day: 1,
      },
    ]);
  }

  useEffect(() => {
    console.log('Count change');
  });

  return (
    <>
      <ul className="list_day">
        {days.map((day) => (
          <li key={day.id}>
            <Link to={`/day/${day.day}`}>Day {day.day}</Link>
          </li>
        ))}
      </ul>
      <button onClick={onclick}>{count}</button>
      <button onClick={onclick2}>Day change</button>
    </>
  );
}
```

만약, 위와 같이 `days`의 상태값을 변경하는 버튼이 추가적으로 있을 때, Day change 버튼을 누를 때에도, `Count change`가 콘솔 창에 출력된다.

이것은 `count` 상태값이 변경되지 않았는데, `useEffect`가 계속 실행된다는 것이다.

만약 `useEffect`안에 함수가 단순히 로그를 출력하는 것이 아닌 무언가 무거운 작업을 하는 함수라면, 불필요한 동작을 하기 때문에 문제가 된다.

### 의존성 배열

```javascript
// DayList.js

useEffect(() => {
  console.log('Count change');
}, [count]);
```

이럴 경우, `useEffect()`의 두 번쨰 매겨변수로, 배열을 넣어주고, 배열 안에는 상태값인 `count`를 넣어주면, `count` 상태값이 바뀔 때만 해당 `useEffect()`가 동작한다.

이런 배열을 **의존성 배열**이라고 한다.

의존성 배열의 값이 변경되는 경우에만 `useEffect()`의 첫 번째 매개변수 함수가 실행된다.

```javascript
useEffect(() => {
  console.log('Count change');
}, []);
```

위와 같이 의존성 배열을 빈 배열로 주면, 렌더링이 되고, 최초의 한 번만 실행된다.

이렇게 상태값과 무관하게 렌더링 직후 딱 한 번만 실행되는 작업은 빈 배열을 전달하면 된다.

<br />

## fetch()로 API 호출

```javascript
// DayList.js

export default function DayList() {
  const [days, setDays] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/days')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setDays(data);
      });
  }, []);

  return (
    <ul className="list_day">
      {days.map((day) => (
        <li key={day.id}>
          <Link to={`/day/${day.day}`}>Day {day.day}</Link>
        </li>
      ))}
    </ul>
  );
}
```

API 비동기 통신을 위해서 `fetch()`를 사용한다.

`fetch('http://localhost:3001/days')`와 같이 API 경로를 적어주면, `Promise`가 반환된다.

`then()`을 이용해서, `res.json()`으로 반환해준다. 왜냐하면 여기서 API 응답은 http 응답이고, 실제 json이 아니기 때문이다.

이렇게 하면, json으로 변환되고, `Promise`를 반환한다.

그러면 또 `then()`으로 `data`를 받아서, `setDays(data)`로 상태값을 변경해준다.

개발자 도구 네트워크 탭에서 확인해보면 `days` 호출이 잘 되는 것을 확인할 수 있다.

```javascript
// Day.js

import { useParams } from 'react-router-dom';
import Word from './Word';
import { useEffect, useState } from 'react';

export default function Day() {
  const { day } = useParams();
  const [words, setWords] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/words?day=${day}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWords(data);
      });
  }, [day]);

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
```

더미 데이터의 `words`를 사용하고 있던, `day` 컴포넌트도 위와 같이 REST API와 `useEffect()`를 사용하여 수정해준다.

위 코드에서는 `useEffect()` 내부에서 `day`라는 특정 값을 사용한다. 이럴 경우에는 `day`를 의존성 배열에 넣어줘야 힌다.

그러면 `day`가 최신 값이라는 것을 보장 받을 수 있다.

그런데, `DayList` 컴포넌트와 `Day` 컴포넌트의 리스트를 가져오는 API 주소 부분을 제외하고 상당히 비슷하다.

그래서, 이맇게 동일한 로직은 사용자가 직접 훅을 만드렁서 사용할 수 있다.

이것을 **커스텀 훅**이라고 한다.
