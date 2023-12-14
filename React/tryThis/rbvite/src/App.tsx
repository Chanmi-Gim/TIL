import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './App.css';
import Hello, { GiftHandle } from './components/Hello';
import My from './components/My';
import { useCounter } from './hooks/counter-context';

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
// 11월 10~ 12월 9일
export default App;
