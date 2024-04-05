# PUT(수정), DELETE(삭제)

`Day` 컴포넌트의 체크박스 상태는 DB에 저장하여 관리하는 것이 좋다.

지금은 체크박스를 체크한 상태에서 새로고침을 하면 다시 해제가 된다.

<br />

## PUT

`PUT` 메소드를 사용하여, `data.json`의 각 단어의 `isDone` 필드를 수정해야 한다.

```javascript
// Word.js

function toggleDone() {
  setIsDone(!isDone);
}
```

`Word` 컴포넌트의 `toggleDone`함수에서는 단순히 `state`만 바꿔주게 되어있다.

```javascript
// Word.js

function toggleDone() {
  fetch(`http://localhost:3001/words/${word.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...word,
      isDone: !isDone,
    }),
  }).then((res) => {
    if (res.ok) {
      setIsDone(!isDone);
    }
  });
}
```

`PUT` 메소드의 사용법은 `GET` 메소드와 비슷한데, `fetch()` 괄호 안에 API 주소를 넣어준다. 여기서 주소는 `words`의 단어 id를 넣어주면 된다.

그리고 `GET` 메소드와 다르게 두 번쨰 인자로 객체를 넣어준다.

이 객체에는 요청의 옵션들을 입력하는데, 메소드는 `PUT`이고, `headers`에 `Content-Type`을 `application/json`으로 입력해준다.

`Content-Type`은 보내는 리소스의 타입을 의미한다. 평범한 문자열부터 html, 이미지, 등 여러가지를 쓸 수 있다.

여기서는 json 형태로 보낼 거기 때문에 위와 `application/json`으로 사용한다.

단순히 값을 가져오는 `GET`과는 다르게, `PUT`은 수정을 위한 정보를 실어서 보내줘야 한다.

그 정보를 `body`에 입력한다. 기존 데이터에 `isDone: !isDone`으로 바꿔서 넘겨주면 된다.

이 부분을 json 형태로 변환하기 위해서 `JSON.stringify()`로 감싸준다.

그리고 `then()`을 통해 응답을 받고, 응답이 `ok`이라면, `setIsDone(!isDone)`로 `state`를 바꿔주면 된다.

<br />

## DELETE

단어의 삭제 버튼을 누르면 `confirm` 창을 띄워 물어보고 삭제를 하려고 한다.

```javascript
// Word.js

export default function Word({ word }) {
  ...

  function del() {}

  return (
    <tr className={isDone ? 'off' : ''}>
      <td>
        <input type="checkbox" checked={isDone} onChange={toggleDone} />
      </td>
      <td>{word.eng}</td>
      <td>{isShow && word.kor}</td>
      <td>
        <button onClick={toggleShow}>뜻 {isShow ? '숨기기' : '보기'}</button>
        <button onClick={del} className="btn_del">
          삭제
        </button>
      </td>
    </tr>
  );
}
```

`del`이란 함수를 만들고, 삭제 버튼에 `onClick` 이벤트에 넣어준다.

```javascript
// Word.js

function del() {
  if (window.confirm('삭제 하시겠습니까?')) {
  }
}
```

실수로 삭제 버튼을 클릭할 수 있기 때문에 `confirm()`을 사용하여 확인을 받을 것이다.

`confirm`만 사용할 경우에 에러가 발생하는데, `window.confirm()`를 사용하면 된다.

```javascript
// Word.js

function del() {
  if (window.confirm('삭제 하시겠습니까?')) {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: 'DELETE',
    });
  }
}
```

API 주소는 `PUT` 메소드와 동일하며, 삭제 기능은 특별히 정보를 넘겨줄 필요가 없기 때문에 두 번쨰 인자는 객체에 `method: 'DELETE'`만 넘겨주면 된다.

삭제 버튼을 눌러보면, 화면에 아무 변화가 없다.

새로고침을 해보면, 삭제한 데이터가 없어진 것을 확인할 수 있다.

버튼을 누르고 확인해주면 실제 데이터는 삭제가 된다. 하지만, 화면에는 아무 변화가 없다. 따라서, 삭제된 이후에 단어 리스트를 다시 그려줘야 한다.

삭제 요청을 하고, `ok` 응답을 받으면, 컴포넌트를 다시 렌더링하게 해준다.

이 때, `null`을 반환하면, 아무것도 표현해주지 않는다.

```javascript
// Word.js

export default function Word({ word: w }) {
  const [word, setWord] = useState(w);
}
```

`word`를 `state`로 만들고, 이름이 겹치면 안되기 때문에, `props`로 넘어온 `word`를 `word: w`로 통해 `w`라는 새로운 변수에 할당해준다.

그리고 `word` 스테이트에는 초기값으로 `w`를 설정해준디.

```javascript
// Word.js

function del() {
  if (window.confirm('삭제 하시겠습니까?')) {
    fetch(`http://localhost:3001/words/${word.id}`, {
      method: 'DELETE',
    }).then((res) => {
      if (res.ok) {
        setWord({ id: 0 });
      }
    });
  }
}

if (word.id === 0) {
  return null;
}
```

`DELETE` 메소드의 응답이 `ok`라면, 그 단어의 `id`를 `0`으로 해준다.

그리고, `word`의 `id`가 `0`이라면, `null`을 반환하게 해준다.

그러면, 삭제 버튼을 누르면, 화면에서도 사라지고, `data.json`에서도 사라진 것을 확인할 수 있다.
