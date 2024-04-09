import { useParams, useHistory } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hooks/useFetch';

export default function Day() {
  const { day } = useParams();
  const history = useHistory();
  const { data: days, loading: daysLoading } = useFetch(
    `http://localhost:3001/days`
  );
  const { data: words, loading: wordsLoading } = useFetch(
    `http://localhost:3001/words?day=${day}`
  );
  const lastDay = Number(days.length);

  function prev() {
    const prevDay = Number(day) - 1;
    if (prevDay > 0) {
      history.push(`/day/${prevDay}`);
    } else {
      alert('첫째 날입니다.');
    }
  }

  function next() {
    const nextDay = Number(day) + 1;
    if (nextDay <= lastDay) {
      history.push(`/day/${nextDay}`);
    } else {
      alert('마지막 날입니다.');
    }
  }

  return (
    <>
      <h2>Day {day}</h2>
      {daysLoading && <span>Loading...</span>}
      {!wordsLoading && words.length === 0 && <span>데이터가 없습니다.</span>}
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
