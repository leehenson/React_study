import { useState } from 'react';

export default function Hello() {
  // let name = 'Henson';
  const [name, setName] = useState('Henson');

  return (
    <div>
      <h2 id="name">{name}</h2>
      <button
        onClick={() => {
          setName(name === 'Henson' ? 'Jane' : 'Henson');
        }}
      >
        Change
      </button>
    </div>
  );
}
