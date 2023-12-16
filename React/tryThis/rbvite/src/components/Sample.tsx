import { ChangeEvent, useEffect, useMemo, useState } from 'react';

export const Sample = () => {
  const [array, setArray] = useState([1, 2, 3]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [, rerender] = useState<ChangeEvent<HTMLInputElement>>();
  const memoArray = useMemo(() => array, [array]);

  useEffect(() => {
    console.log('effect Array!!!');
    const tot = memoArray.reduce((sum, a) => sum + a, 0);
    setTotalPrice(tot);
  }, [memoArray]);

  return (
    <>
      <div>
        {totalPrice}
        <button onClick={() => setArray([...array, 1])}>PushArray</button>
        <input type='text' onChange={rerender} />
      </div>
    </>
  );
};
