import { PropsWithChildren, useId } from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
  children?: React.ReactNode;
};

const Hello = ({ name, age }: PropsWithChildren<Props>) => {
  const helloId = useId();
  const { plusCount } = useCounter();
  console.log('hello.age>>', age);
  return (
    <div
      style={{
        border: '3px solid black',
        backgroundColor: 'blue',
        color: 'white',
      }}
    >
      <h2 id={helloId}>
        Hello, {name} ({age}세)
      </h2>
      <button onClick={plusCount}>+count</button>
    </div>
  );
};
export default Hello;
