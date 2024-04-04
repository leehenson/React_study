# json-server, REST API

<br />

## Day 컴포넌트 기능 추가

```javascript
// Day.js

export default function Day() {
  const { day } = useParams();
  const wordList = dummy.words.filter((word) => word.day === Number(day));

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {wordList.map((word) => (
            <tr key={word.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{word.eng}</td>
              <td>{word.kor}</td>
              <td>
                <button>뜻 보기</button>
                <button class="btn_del">삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
```

`Day` 컴포넌트에 위와 같이 뜻 보기와 삭제 버튼, 체크박스를 추가해준다.

뜻 보기 버튼을 누르면 뜻이 보였다가 안 보였다가 해줘야하는데, 별도의 컴포넌트를 만들어주는게 좋을 거 같다.

왜나햐면, 각 컴포넌트 별로 `state`를 가지고 있는데, 뜻 보기 기능이 동작할 것은 각각의 단어에만 해당하기 때문에 따로 컴포넌트를 제작해주는 것이 좋다.

<br />

## Word 컴포넌트 생성

```javascript
// Word.js

export default function Word({ word }) {
  return (
    <tr key={word.id}>
      <td>
        <input type="checkbox" />
      </td>
      <td>{word.eng}</td>
      <td>{word.kor}</td>
      <td>
        <button>뜻 보기</button>
        <button class="btn_del">삭제</button>
      </td>
    </tr>
  );
}
```

`Day` 컴포넌트에서 단어를 뿌려주는 부분만 잘라서 `Word` 컴포넌트라는 새로운 컴포넌트를 만들어주고, `word`는 `props`로 받아오게 한다.

<br />

## Day 컴포넌트에 Word 컴포넌트 호출

```javascript
// Day.js

export default function Day() {
  const { day } = useParams();
  const wordList = dummy.words.filter((word) => word.day === Number(day));

  return (
    <>
      <h2>Day {day}</h2>
      <table>
        <tbody>
          {wordList.map((word) => (
            <Word word={word} key={word.id} />
          ))}
        </tbody>
      </table>
    </>
  );
}
```

`Day` 컴포넌트에서는 `Word` 컴포넌트를 반복해서 뿌려주고, `props`로 `word`를 넘겨주고, `key`는 `word.id`가 고유한 값이기 때문에 `word.id`를 넘겨준다.

<br />

## Word 컴포넌트 state 추가 및 수정

```javascript
// Word.js

export default function Word({ word }) {
  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{word.eng}</td>
      <td>{word.kor}</td>
      <td>
        <button>뜻 보기</button>
        <button class="btn_del">삭제</button>
      </td>
    </tr>
  );
}
```

`Word` 컴포넌트에서 `key`값은 `props`로 받기 때문에, `<tr>` 태그에 있던 `key` 부분은 지워준다.

```javascript
// Word.js

import { useState } from 'react';

export default function Word({ word }) {
  const [isShow, setIsShow] = useState(false);

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button>뜻 보기</button>
        <button class="btn_del">삭제</button>
      </td>
    </tr>
  );
}
```

구현하고 싶은 기능은 뜻을 숨기거나, 숨김을 해제하는 것이기에 `isShow`라는 상태값을 `useState`로 만들어준다.

처음에는 뜻이 안보여야 하기 때문에 `isShow` 상태값의 초기값은 `false`로 준다.

`<td>{isShow && word.kor}</td>`로 `isShow`가 `true`일 경우에만, 뜻이 보이도록 한다.

```javascript
// Word.js

export default function Word({ word }) {
  const [isShow, setIsShow] = useState(false);

  function toggleShow() {
    setIsShow(!isShow);
  }

  return (
    <tr>
      <td>
        <input type="checkbox" />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 보기</button>
        <button class="btn_del">삭제</button>
      </td>
    </tr>
  );
}
```

호출되면, `isShow`의 상태값을 반대로 바꿔주는, `toggleShow()` 함수를 구현해주고, `<button onClick={toggleShow}>뜻 보기</button>`로 뜻 보기 버튼이 클릭이 되면 `toggleShow()` 함수를 호출하게 한다.

<br />

## Day 컴포넌트 수정

```javascript
// Day.js

<button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button>
```

뜻이 숨겨진 상태에서도 뜻 보기로 보이기 때문에, 위와 같이 `isShow`의 상태에 따라, 버튼의 글씨가 바뀌도록 한다.

```javascript
// Day.js

<tr className={word.isDone ? 'off' : ''}>
```

더미 데이터의 `isDone` 속성은 단어를 외웠는지 안외웠는지를 나타내는 속성값인데, `isDone`의 값에 따라, `off`라는 클래스명 추가 및 삭제가 되도록 위와 같이 작성해준다.

하지만, 이 상태에서 더미 데이터 하나의 `isDone`을 `true`로 바꿔주면 체크박스가 더 이상 동작이 되질 않는다.

왜냐하면, 체크박스는 `onChange` 핸들러를 사용하지 않으면, 체크박스의 값을 동적으로 바꿔줄 수 없는 read only 상태와 다를 바가 없기 때문이다.

<br />

## Word 컴포넌트 체크박스 설정

```javascript
// Word.js

export default function Word({ word }) {
  const [isShow, setIsShow] = useState(false);
  const [isDone, setIsDone] = useState(word.isDone);

  function toggleShow() {
    setIsShow(!isShow);
  }

  function toggleDone() {
    setIsDone(!isDone);
  }

  return (
    <tr className={isDone ? 'off' : ''}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button>
        <button className="btn_del">삭제</button>
      </td>
    </tr>
  );
}
```

`word.isDone`의 값을 초기값으로 `isDone`이라는 상태값을 만들어주고, `isDone` 상태값을 반대로 변경해주는 `toggleDone()` 함수를 구현해준다.

체크박스에 `onChange={toggleDone}`로 체크박스의 체크 유무에 따라 `toggleDone` 함수를 호출하게 한다.

`<tr>` 태그의 클래스명을 추가해주는 부분과 체크박스의 `checked` 부분을 `word.isDone`이 아닌 상태값인 `isDone`으로 변경해주면 잘 동작한다.

하지만 이 상태에서는 새로고침을 하면, 더미 데이터의 정보의 상태로 돌아오게 된다.

왜냐하면, 더미 데이터는 고정된 채로 변경되지 않았기 때문이다.

<br />

## json-server

이제 사용자의 액션에 따라서, 데이터를 읽고, 쓰고, 수정하고, 삭제를 해야하는데, 그러기 위해서는 DB를 구축하고, API를 만들어야 한다.

json-server를 이용하면, 빠르고 쉽게 REST API를 만들 수 있다.

**json-server**는 빠르고, 쉽게 REST API를 구축해주고, 공부나, 프로토타입, 작은 프로젝트를 위해 사용할 수 있다.

### json-server 설치

```bash
npm install -g json-server
```

위 명령어를 통해 json-server를 글로벌 환경으로 설치해준다.

```bash
json-server --watch ./src/db/data.json --port 3001
```

cmd 터미널에서 위 명령어를 통해서 3001번 포트로 json-server를 띄운다.

<br />

## REST API

**REST API**는 쉽게 말해서 uri주소와 메소드로 CRUD 요청을 하는 것이다.

**CRUD**는 **Create**, **Read**, **Update**, **Delete**를 의미한다.

- Create : POST
- Read : GET
- Update : PUT
- Delete : DELETE

생성을 위해서는 `POST`, 읽기를 위해서는 `GET`, 수정을 위해서는 `PUT`, 삭제를 위해서는 `DELETE` 메소드를 사용한다.

`localhost:3001:words/2`와 같이 uri를 요청하면, 2번 데이터만 출력이 된다.

GET 메소드로 읽은 것이다.

`localhost:3001/words?day=1`와 같이 1일차에 대한 데이터만 가져오는 것도 가능하다.

이렇게 uri와 메소드만 보고도, 어떤 요청인지 유추 가능한 장점이 있다.

json-server를 이용하면, `data.json` 파일에 그대로 기록이 되기 때문에, 페이지를 벗어나든, 새로고침을 하든, PC를 리부트하든, 계속 유지된다.
