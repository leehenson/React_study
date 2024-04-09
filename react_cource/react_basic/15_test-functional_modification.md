# 테스트 및 기능 수정

크롬 브라우저 개발자 도구 네트워크 탭에서 `online` 부분을 `Slow 3G`로 변경하여, 느린 네트워크 환경을 테스트할 수 있다.

<br />

## 커스텀 훅 살펴보기

```javascript
// useFetch.js

import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(url)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, [url]);

  return data;
}
```

`useFetch()` 커스텀 훅의 `data` 스테이트의 초기값은 빈 배열이다.

<br />

## DayList 컴포넌트

```javascript
// DayList.js

export default function DayList() {
  const days = useFetch('http://localhost:3001/days');

  if (days.length === 0) {
    return <span>Loading...</span>;
  }

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

따라서, `DayList` 컴포넌트에서 `days`의 길이가 `0`일 경우에 화면에 `Loading...`이라는 문구가 출력되도록 해준다.

<br />

## Day 컴포넌트

```javascript
// Day.js

export default function Day() {
  const { day } = useParams();

  const words = useFetch(`http://localhost:3001/words?day=${day}`);

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
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

`Day` 컴포넌트에도 `words`의 길이가 0이면, `Loading...`이라는 문구가 출력되도록 해준다.

<br />

## CreateWord 컴포넌트

```javascript
// CreateWord.js

export default function CreateWord() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e) {
    e.preventDefault();

    if (!isLoading) {
      setIsLoading(true);
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
          setIsLoading(false);
        }
      });
    }
  }

  const engRef = useRef(null);
  const korRef = useRef(null);
  const dayRef = useRef(null);

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
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
      >
        {isLoading ? 'Saving...' : '저장'}
      </button>
    </form>
  );
}
```

느린 네트워크 환경에서의 `CreateWord` 컴포넌트에서도 저장 버튼을 여러번 클릭하면, 처리가 늦어져 이상하게 동작을 하기 때문에, `isLoading`이라는 스테이트를 추가로 만들어주고, `isLoading`이 `false`인 상태에서만 API를 호출이 되고, `isLoading`의 값을 저장 중일 때는 `true`였다가 완료가 되면 `false`로 바뀌도록 해준다.

<br />

## CreateDay 컴포넌트

```javascript
// CreateDay.js

export default function CreateDay() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function addDay() {
    if (!isLoading) {
      setIsLoading(true);
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
          setIsLoading(false);
        }
      });
    }
  }

  if (days.length === 0) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
        onClick={addDay}
      >
        {isLoading ? 'Adding...' : 'Day 추가'}
      </button>
    </div>
  );
}
```

`CreateDay` 컴포넌트에서도, `useFetch()` 커스텀 훅을 통해서 `days`의 정보를 가져오는데, API 호출이 완료되기 전에는 `Loading...`이 출력되도록 해주고, `Day 추가` 버튼이 여러번 클릭되지 않도록, `isLoading` 스테이트를 추가해주어, 여러 번 클릭응 방지한다.

<br />

## DeleteDay 컴포넌트 생성

```javascript
// DeleteDay.js

import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function DeleteDay() {
  const days = useFetch('http://localhost:3001/days');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  function removeDay() {
    if (!isLoading) {
      if (window.confirm('삭제 하시겠습니까?')) {
        setIsLoading(true);
        fetch(`http://localhost:3001/days/${days[days.length - 1].id}`, {
          method: 'DELETE',
        }).then((res) => {
          if (res.ok) {
            alert('삭제되었습니다.');
            history.push('/');
            setIsLoading(false);
          }
        });
      }
    }
  }

  if (days === 0) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
        onClick={removeDay}
      >
        {isLoading ? 'removing...' : 'Day 삭제'}
      </button>
    </div>
  );
}
```

`DeleteDay` 컴포넌트를 생성하여, `Day 삭제` 버튼을 누르면, 마지막 날의 `day`를 삭제하도록 해준다.

<br />

## Day 컴포넌트에서 Day 이동 기능 추가

```javascript
// Day.js

import { useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Day() {
  const { day } = useParams();
  const history = useHistory();
  const days = useFetch(`http://localhost:3001/days`);
  const lastDay = Number(days.length);

  const words = useFetch(`http://localhost:3001/words?day=${day}`);

  function prev() {
    const prevDay = Number(day) - 1;
    if (prevDay > 0) {
      words.length = 0;
      history.push(`/day/${prevDay}`);
    } else {
      alert('첫째 날입니다.');
    }
  }

  function next() {
    const nextDay = Number(day) + 1;
    if (nextDay <= lastDay) {
      words.length = 0;
      history.push(`/day/${nextDay}`);
    } else {
      alert('마지막 날입니다.');
    }
  }

  return (
    <>
      <h2>Day {day}</h2>
      {words.length === 0 && <span>Loading...</span>}
      <table>
        <tbody>
          {words.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
      <div className="buttons">
        <button onClick={prev}>{'<'}</button>
        <button onClick={next}>{'>'}</button>
      </div>
    </>
  );
}
```

`useFetch()` 커스텀 훅으로 마지막날의 정보를 가져오고, 버튼을 통해서 이전 날과 다음 날로 이동할 수 있도록 기능을 추가해준다.

<br />

## useFetch 커스텀 훅 수정

```javascript
// useFetch.js

import { useEffect, useState } from 'react';

export default function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가

  useEffect(() => {
    setLoading(true); // 요청이 시작될 때 로딩 상태를 true로 설정
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false); // 데이터를 받아온 후 로딩 상태를 false로 설정
      })
      .catch((error) => {
        console.error('Fetch error: ', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
      });
  }, [url]);

  return { data, loading }; // 데이터와 로딩 상태를 함께 반환
}
```

`useFetch()`를 호출할 때, 로딩의 상태값을 가지고, 반환해주도록 로직을 수정해준다.

<br />

## 컴포넌트 수정

```javascript
const { data: days, loading: daysLoading } = useFetch(
  `http://localhost:3001/days`
);
```

`useFetch()` 커스텀 훅을 사용하는 모든 컴포넌트에서 커스텀 훅을 위와 같이 호출하도록 변결해주고, 로딩 상태를 `daysLoading`을 사용하도록 수정한다.

<br />

## Day 삭제 시, 단어들도 삭제되도록 DeleteDay 컴포넌트 수정

```javascript
// DeleteDay.js

import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function DeleteDay() {
  const { data: days, loading: daysLoading } = useFetch(
    'http://localhost:3001/days'
  );
  const { data: words } = useFetch('http://localhost:3001/words');
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const removeDayAndWords = async () => {
    if (!isLoading && days.length > 0) {
      if (window.confirm('삭제 하시겠습니까?')) {
        setIsLoading(true);
        const lastDayId = days[days.length - 1].id;
        const lastDayNumber = Number(days[days.length - 1].day);

        // 해당 day와 연관된 모든 words 삭제
        const wordsToDelete = words.filter((word) => {
          return Number(word.day) === lastDayNumber;
        });
        console.log(wordsToDelete);
        for (const word of wordsToDelete) {
          await fetch(`http://localhost:3001/words/${word.id}`, {
            method: 'DELETE',
          });
        }

        // 마지막으로 day 삭제
        fetch(`http://localhost:3001/days/${lastDayId}`, {
          method: 'DELETE',
        }).then((res) => {
          if (res.ok) {
            alert('삭제되었습니다.');
            history.push('/');
            setIsLoading(false);
          }
        });
      }
    }
  };

  if (daysLoading) {
    return <span>Loading...</span>;
  }

  return (
    <div>
      <h3>현재 일수 : {days.length}일</h3>
      <button
        style={{
          opacity: isLoading ? 0.3 : 1,
        }}
        onClick={removeDayAndWords}
      >
        {isLoading ? 'removing...' : 'Day 삭제'}
      </button>
    </div>
  );
}
```

`day`를 삭제할 때, `day`에 속한 단어들도 삭제하도록 수정해준다.
