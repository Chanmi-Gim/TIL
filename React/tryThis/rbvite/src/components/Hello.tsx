import { PropsWithChildren, useId } from 'react';

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
  children?: React.ReactNode;
};

const Hello = ({ name, age, plusCount }: PropsWithChildren<Props>) => {
  // age = age + 1;
  const helloId = useId();
  console.log('hello.age>>', age);
  return (
    <div
      style={{
        border: '3px solid black',
        backgroundColor: 'blue',
        color: 'white',
      }}
    >
      <h1 id={helloId}>
        Hello, {name} ({age}세)
      </h1>
      <button onClick={plusCount}>+count</button>
    </div>
  );
};
export default Hello;
