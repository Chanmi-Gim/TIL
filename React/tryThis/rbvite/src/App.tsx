import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './App.css';
import Hello from './components/Hello';
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
  return <>child: {childText}</>;
});

function App() {
  const { count, plusCount } = useCounter();
  const childRef = useRef<ChildHandler>(null);

  return (
    <>
      <ChildComponent ref={childRef} />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <h2>count: {count}</h2>
      <Hello name='홍길동' age={30} plusCount={plusCount} />
      <My />
    </>
  );
}
// 11월 10~ 12월 9일
export default App;
