import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import { useCounter } from '../hooks/counter-context';
import { useTimer } from '../hooks/timer-hooks';

export type ChildHandler = {
  appendPeriod: () => void;
};
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('');
  const handler: ChildHandler = {
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  useImperativeHandle(ref, () => handler);
  return <h2>child "{childText}"</h2>;
});

export const Home = () => {
  const { count, minusCount, plusCount } = useCounter();
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const { useInterval, useTimeout } = useTimer();
  const childRef = useRef<ChildHandler>(null);

  useInterval(() => setBadCount((pre) => pre + 1), 1000);
  useInterval(() => setGoodCount((pre) => pre + 1), 1000);
  useTimeout(
    (initSec) => {
      // console.log('>>useEffect');
      setBadCount(initSec);
      setGoodCount(initSec);
    },
    5000,
    100
  );
  return (
    <>
      <button onClick={plusCount} style={{ width: 300 }}>
        Count UP!
      </button>
      <button onClick={minusCount} style={{ width: 300 }}>
        Count down!
      </button>
      <h2 style={{ color: 'skyblue' }}>
        <div>your Count is "{count}"</div>
        <small style={{ color: 'skyblue' }}>
          (Login전이면 +1해서 "1", 후이면 -1해서 "0")
        </small>
        <hr></hr>
      </h2>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      <strong style={{ float: 'right', color: 'green' }}>{goodCount}</strong>
      <ChildComponent ref={childRef} />
      <div>
        <button onClick={() => childRef.current?.appendPeriod()}>
          Call Child Component
        </button>
      </div>
    </>
  );
};
