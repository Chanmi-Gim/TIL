'use client';

import { useState } from 'react';

export default function DateTime() {
  const [date, setDate] = useState('');
  const dt = new Date().toString();
  return (
    <>
      <div>DateTime : {date}</div>
      <button
        className='btn'
        onClick={() => {
          setDate(dt);
          console.log(new Date());
        }}
      >
        DT
      </button>
    </>
  );
}
