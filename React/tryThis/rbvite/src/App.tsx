import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';

function App() {
  const [count, setCount] = useState(0);
  const [age, setAge] = useState(0);
  const [tmpName, setTmpName] = useState('');
  const h1Style = { backgroundColor: 'green', color: 'white' };
  const Title = ({ txt }: { txt: string }) => <h1 style={h1Style}>{txt}</h1>;
  const plusCount = () => {
    // setCount((count) => count + 1); // 이전 값을 참조
    // setCount((count) => count + 1); // 이전 값을 참조
    // setCount((count) => count + 1); // 이전 값을 참조
    setCount(count + 1); // throttle 때문에 16ms로 걸려있어서 1만 증가하고 씹힘
    setCount(count + 1);
    setCount(count + 1);
    setTmpName(`${tmpName}- ${count}`);
  };
  // Throttle
  // function throttle<T extends any[]>(cb: (...args: T) => void, delay: number) {
  //   let timer : ReturnType<typeof setTimeout>;
  //   return (...args : T)=> {
  //     if(timer) return;
  //     timer = setTimeout(()=> {
  //       cb(...args);
  //     }, delay)
  //   }
  // }
  // }
  return (
    <>
      <Hello name='Kim' age={age} plusCount={plusCount}>
        <strong>I'm hello's children</strong>
      </Hello>
      <Hello name={tmpName} age={age} plusCount={plusCount}>
        <strong>I'm hello's children</strong>
      </Hello>
      {count && <Title txt={`Vite + React ${count}`} />}
      <div className='card'>
        <button onClick={() => plusCount}>
          count is {count > 0 ? 'Big' : 'Zero'}
        </button>
        <button
          onClick={() => {
            setAge(age + 1);
          }}
        >
          plusAge
        </button>
      </div>
    </>
  );
}

export default App;
