# 더미 데이터 구현, map() 반복문

<br />

## css 설정

```css
/* index.css */

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
    'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 20px;
}

ol,
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

a {
  text-decoration: none;
  color: #333;
}

.App {
  width: 800px;
  margin: 0 auto;
}

.header {
  position: relative;
}

.header .menu {
  position: absolute;
  top: 10px;
  right: 0;
}

.header .link {
  border: 1px solid #333;
  padding: 10px;
  margin-left: 10px;
  background-color: #efefef;
  font-weight: bold;
  border-radius: 4px;
}

.list_day {
  display: flex;
  flex-wrap: wrap;
}

.list_day li {
  flex: 20% 0 0;
  box-sizing: border-box;
  padding: 10px;
}

.list_day a {
  display: block;
  padding: 20px 0;
  font-weight: bold;
  color: #fff;
  text-align: center;
  border-radius: 10px;
  background-color: dodgerblue;
}

table {
  border-collapse: collapse;
  width: 100%;
}
table td {
  width: 25%;
  height: 70px;
  border: 1px solid #ccc;
  text-align: center;
  font-size: 26px;
}

table td:first-child {
  width: 10%;
}

.off td {
  background: #eee;
  color: #ccc;
}

.btn_del {
  margin-left: 10px;
  color: #fff;
  background-color: firebrick;
}

button {
  padding: 10px;
  font-weight: bold;
  font-size: 18px;
  cursor: pointer;
  border: 0 none;
  border-radius: 6px;
  padding: 10px 20px;
  color: #fff;
  background-color: dodgerblue;
}

.input_area {
  margin-bottom: 10px;
}

.input_area label {
  display: block;
  margin-bottom: 10px;
}

.input_area input {
  width: 400px;
  height: 40px;
  font-size: 20px;
  padding: 0 10px;
}

.input_area select {
  width: 400px;
  height: 40px;
  font-size: 20px;
}
```

위와 같이 `index.css`에 스타일을 설정해준다.

<br />

## Header 컴포넌트

```javascript
// Header.js

export default function Header() {
  return (
    <div className="header">
      <h1>
        <a href="/">토익 영단어(고급)</a>
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

위와 같이 `Header` 컴포넌트를 생성해준다.

```javascript
// App.js

import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
```

생성한 `Header` 컴포넌트를 `App` 컴포넌트에서 불러온다.

<br />

## 더미 데이터

```json
// data.json

{
  "days": [
    { "id": 1, "day": 1 },
    { "id": 2, "day": 2 },
    { "id": 3, "day": 3 }
  ],
  "words": [
    {
      "id": 1,
      "day": 1,
      "eng": "book",
      "kor": "책",
      "isDone": false
    },
    {
      "id": 2,
      "day": 1,
      "eng": "apple",
      "kor": "사과",
      "isDone": false
    },
    {
      "id": 3,
      "day": 2,
      "eng": "car",
      "kor": "자동차",
      "isDone": false
    },
    {
      "id": 4,
      "day": 2,
      "eng": "pen",
      "kor": "펜",
      "isDone": false
    },
    {
      "id": 5,
      "day": 3,
      "eng": "school",
      "kor": "학교",
      "isDone": false
    },
    {
      "id": 6,
      "day": 3,
      "eng": "pencil",
      "kor": "연필",
      "isDone": false
    }
  ]
}
```

`src` 폴더에 `db` 폴더를 생성하고, 생성한 `db` 폴더에 위와 같은 `data.json` 더미 데이터를 생성해준다.

<br />

## DayList 컴포넌트, map() 사용

```javascript
// DayList.js

import dummy from '../db/data.json';

export default function DayList() {
  console.log(dummy);
  return <></>;
}
```

본문에 들어갈 `DayList` 컴포넌트를 생성하고, 이 컴포넌트에서는 이전에 만든 더미 데이터 정보를 가지고 있는 `data.json` 파일을 `import dummy from '../db/data.json'`로 불러오고, 우선 `console.log(dummy);`로 콘솔 로그에 출력해보면, 더미 데이터가 잘 출력이 된다.

더미 데이터를 리스트 형태로 뿌려주기 위해서 `ul` 태그와 `li` 태그를 사용해야 하는데, `li`를 `day`의 갯수만큼 그려줘야 한다.

이럴 경우 반복문을 사용해야 하는데, `map()`을 사용하는 것이 편하다.

### map()

```javascript
// DayList.js

import dummy from '../db/data.json';

export default function DayList() {
  console.log(dummy);
  return (
    <ul className="list_day">
      {dummy.days.map((day) => (
        <li key={day.id}>Day {day.day}</li>
      ))}
      <li></li>
    </ul>
  );
}
```

`map()`은 배열을 받아서 또 다른 배열을 반환해주는데, 이 때 반환되는 배열의 요소를 위와 같이 JSX로 작성해주면 된다.

`dummy.days.map((day) => (<li key={day.id}>Day {day.day}</li>))`와 같이 화살표 함수로 바로 리턴문을 작성해준다.

`key`는 반복되는 요소에 고유한 값을 넣어줘야 하는데, `day.id`를 넣어준다.

<br />

## Day 컴포넌트, filter() 사용

```javascript
// Day.js

import dummy from '../db/data.json';

export default function Day() {
  // dummy.words
  return (
    <>
      <table>
        <tbody>
          {dummy.words.map((word) => (
            <tr>
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

`DayList` 컴포넌트와 똑같이 더미 데이터를 가져와서, `map()`으로 반복을 하며, 테이블 형태로, 영어와 한글을 뿌려준다.

```javascript
// App.js

import Day from './component/Day';
import DayList from './component/DayList';
import Header from './component/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <DayList />
      <Day />
    </div>
  );
}

export default App;
```

`App` 컴포넌트에서 `DayList` 컴포넌트 밑에 `Day` 컴포넌트를 뿌려준다.

이렇게 되면, 모든 `words`의 정보가 출력된다.

원하는 기능은 `Day 1`을 클릭하면 1일치에 해당하는 단어들만 출력되어야 한다.

### filter()

```javascript
// Day.js

export default function Day() {
  // dummy.words
  const day = 1;
  const wordList = dummy.words.filter((word) => word.day === day);
  console.log(wordList);

  return (
    <>
      <table>
        <tbody>
          {dummy.words.map((word) => (
            <tr>
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

`Day`컴포넌트에서 우선 `day`를 `1`로 고정하기 위해 `filter()`를 사용해서 `word.day`가 `1`인 데이터를 `wordList`로 만들어서 출력해보면, 1일치 데이터만 잘 출력이 된다.

```javascript
// Day.js

export default function Day() {
  // dummy.words
  const day = 1;
  const wordList = dummy.words.filter((word) => word.day === day);
  console.log(wordList);

  return (
    <>
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

위와 같이 `wordList.map()`으로 1일치만 반복해주면, 잘 출력되는 것을 확인할 수 있다.
