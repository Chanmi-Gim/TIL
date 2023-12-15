import {
  forwardRef,
  // useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import './App.css';
import Hello, { GiftHandle } from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/counter-context';
import { useTimer } from './hooks/timer-hooks';

type ChildHandler = {
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

function App() {
  const { count, plusCount } = useCounter();
  const childRef = useRef<ChildHandler>(null);
  const giftHandleRef = useRef<GiftHandle>(null);
  const [badCount, setBadCount] = useState(0);
  const [goodCount, setGoodCount] = useState(0);
  const { useInterval, useTimeout } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);
  useInterval(() => setGoodCount((pre) => pre + 1), 1000);
  useTimeout(
    (initSec) => {
      console.log('>>useEffect');
      setBadCount(initSec);
      setGoodCount(initSec);
    },
    5000,
    100
  );
  return (
    <>
      <button onClick={() => giftHandleRef.current?.getGift()}>
        🎁 선물받기
      </button>
      <Hello
        name='cm'
        age={30}
        plusCount={plusCount}
        ref={giftHandleRef}
      ></Hello>
      <h2 style={{ color: 'skyblue' }}>
        <div>your Count is "{count}"</div>
        <small style={{ color: 'skyblue' }}>
          (Login전이면 +1해서 "1", 후이면 -1해서 "0")
        </small>
      </h2>
      <strong style={{ float: 'left', color: 'red' }}>{badCount}</strong>
      <strong style={{ float: 'right', color: 'green' }}>{goodCount}</strong>
      <ChildComponent ref={childRef} />
      <div>
        <button onClick={() => childRef.current?.appendPeriod()}>
          Call Child Component
        </button>
      </div>
      <hr></hr>
      <My />
    </>
  );
}
export default App;
