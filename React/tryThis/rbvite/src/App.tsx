import {
  forwardRef,
  useEffect,
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
  const { useInterval } = useTimer();

  useInterval(() => setBadCount((pre) => pre + 1), 1000);

  useEffect(() => {
    const intl = setInterval(() => setGoodCount((pre) => pre + 1), 1000);
    return () => clearInterval(intl);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log('>>useEffect');
      setBadCount(100);
      setGoodCount(100);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

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
      <h2 style={{ color: 'skyblue' }}>your Count is "{count}"</h2>
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
