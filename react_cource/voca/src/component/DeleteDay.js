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
