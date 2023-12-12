import { PropsWithChildren, useId } from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
  children?: React.ReactNode;
};

const Hello = ({ name, age, children }: PropsWithChildren<Props>) => {
  const helloId = useId();
  const { plusCount } = useCounter();
  return (
    <div style={{ border: '2px solid red' }}>
      <h5 id={helloId}>
        Hello, {name} ({age}세)
      </h5>
      {children}
      <button onClick={plusCount}>+count</button>
    </div>
  );
};
// Hello.defaultProps = { name: 'Choi' };
export default Hello;
