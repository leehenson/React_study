import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import useFetch from '../hooks/useFetch';
import { useState } from 'react';

export default function CreateDay() {
  const { data: days, loading: daysLoading } = useFetch(
    'http://localhost:3001/days'
  );
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
        onClick={addDay}
      >
        {isLoading ? 'Adding...' : 'Day 추가'}
      </button>
    </div>
  );
}
