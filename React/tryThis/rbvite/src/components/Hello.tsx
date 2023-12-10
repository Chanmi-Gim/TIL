import { PropsWithChildren, useId } from 'react';

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
  children: React.ReactNode;
};

const Hello = ({
  name,
  age,
  plusCount,
  children,
}: PropsWithChildren<Props>) => {
  // age = age + 1;
  const helloId = useId();
  console.log('hello.age>>', age);
  return (
    <div style={{ border: '2px solid red' }}>
      <h1 id={helloId}>
        Hello, {name} ({age}세)
      </h1>
      <h3>children : {children}</h3>
      <button onClick={plusCount}>+count</button>
    </div>
  );
};
export default Hello;
