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
