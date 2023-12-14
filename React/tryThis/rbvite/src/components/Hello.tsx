import {
  PropsWithChildren,
  forwardRef,
  useId,
  useImperativeHandle,
} from 'react';
import { useCounter } from '../hooks/counter-context';

type Props = {
  name: string;
  age: number;
  plusCount: () => void;
  children?: React.ReactNode;
};

export type GiftHandle = {
  getGift: () => void;
};

const Hello = forwardRef(
  ({ name, age, children }: PropsWithChildren<Props>, handleRef) => {
    const helloId = useId();
    const { plusCount } = useCounter();
    const getGift = () => {
      alert('안뇽 나는 기프트야! 자식 Hello로부터 와써~~~🎉');
    };
    useImperativeHandle(handleRef, () => ({
      getGift,
    }));

    return (
      <div>
        <h2
          id={helloId}
          style={{
            color: 'white',
            backgroundColor: 'skyblue',
          }}
        >
          Hello, {name} ({age}세)
        </h2>
        {children}
        <button
          onClick={plusCount}
          style={{ width: 300, textDecorationColor: 'blue' }}
        >
          Count UP!
        </button>
      </div>
    );
  }
);
// Hello.defaultProps = { name: 'Choi' };
export default Hello;
