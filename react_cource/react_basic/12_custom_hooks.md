# Custom Hooks

`useState`와 `useEffect`와 같은 리액트에서 제공하는 훅을 제외한 자신만의 커스텀 훅도 만들 수 있다.

커스텀 훅은 `use`로 시작하면 된다.

<br />

## 커스텀 훅 만들기

`src` 폴더에 `hooks`라는 폴더를 만들어주고, 만든 폴더에 `userFetch.js` 파일을 만들어준다.

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

`DayList` 컴포넌트와 `Day` 컴포넌트에서 API 주소를 제외하고 똑같이 사용되는 기능을 위와 같이 커스텀 훅으로 만들어준다.

API 주소를 `url` 매개변수로 받아서, `fetch()`에 받은 API 주소값을 넣어준다.

의존성 배열도 바뀔 수 있기 때문에, `url`로 넣어준다.

`state`를 여기저기에서도 사용할 수 있도록 네이밍을 `data`와 `setData`로 해준다.

그리고 최종적으로 필요한 `data`를 반환해주면, 나만의 커스텀 훅이 생성된다.

<br />

## DayList 컴포넌트 수정

```javascript
// DayList.js

import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

export default function DayList() {
  const days = useFetch('http://localhost:3001/days');

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

새롭게 만든 `useFetch()` 커스텀 훅을 import하고, API 주소만 인수로 넘겨주면, 이제 길고 복잡했던 리스트를 띄우는 기능이 간단해졌다.

이제 API로 데이터를 받아오는 부분은 `const days = useFetch('http://localhost:3001/days');` 이렇게 한줄로 처리가 가능하다.

<br />

## Day 컴포넌트 수정

```javascript
// Day.js

import { useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';

export default function Day() {
  const { day } = useParams();

  const words = useFetch(`http://localhost:3001/words?day=${day}`);

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

`Day` 컴포넌트 또한, 위와 같이 간단하게 한 줄로 API를 호출하여, 값을 받아올 수 있게 됐다.

이렇게 비슷한 작업들을 하나의 커스텀 훅으로 만들어서 여기저기서 쓸 수 있다.

반복해서 작업할 필요도 없고, 코드도 훨씬 간결해지고, 만약 수정사항이 발생한다면, 만들어둔 `useFetch()` 한 곳만 수정해줘도 되기 때문에, 유지보수가 편해진다.
