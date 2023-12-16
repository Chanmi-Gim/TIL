import { forwardRef, memo, useEffect, useId, useImperativeHandle } from 'react';
import { useCounter } from '../hooks/counter-context';
import { Sample } from './Sample';

type Props = {
  age: number;
  fn: () => void;
};

export type GiftHandle = {
  getGift: () => void;
};

export const Hello = forwardRef(({ age, fn }: Props, handleRef) => {
  console.log('Hello.age>>', age);
  const helloId = useId();
  const { plusCount } = useCounter();
  const getGift = () => {
    alert('안뇽 나는 기프트야! 자식 Hello로부터 와써~~~🎉');
  };
  useImperativeHandle(handleRef, () => ({
    getGift,
  }));

  useEffect(() => {
    console.log('child.fn>>>', age, fn());
  }, [age, fn]);

  return (
    <div>
      <Sample></Sample>
      <h2
        id={helloId}
        style={{
          color: 'white',
          backgroundColor: 'skyblue',
        }}
      >
        Hello,({age}세 )
      </h2>
      <button
        onClick={plusCount}
        style={{ width: 300, textDecorationColor: 'blue' }}
      >
        Count UP!
      </button>
      <hr />
    </div>
  );
});
export const MemoHello = memo(Hello, ({ age }, { age: age2 }) => {
  console.log('preProps', age, age2);
  return age === age2;
});
