import {
  forwardRef,
  memo,
  useEffect,
  useId,
  useImperativeHandle,
  useReducer,
} from 'react';
import { useCounter } from '../hooks/counter-context';
import { Sample } from './Sample';
import './Hello.css';
import classNames from 'classnames';
import clsx from 'clsx';

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
  const [isActive, toggleActive] = useReducer((preActive) => !preActive, false);
  const boldAndRedStyle = ['bold', 'red']; // 스타일 배열 가능
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
      <h2 id={helloId} className={classNames('skyblueBG')}>
        Hello,({age}세)
      </h2>
      <button
        className={classNames({ aquamarine_btn: age % 2 === 0 })}
        onClick={plusCount}
      >
        Count UP!
      </button>
      <hr />
      <span className={clsx({ bold: isActive === true })}>
        Active : {isActive ? 'Active' : 'Passive'}
      </span>
      <button onClick={toggleActive} className={clsx(boldAndRedStyle)}>
        Toggle
      </button>
    </div>
  );
});
export const MemoHello = memo(Hello, ({ age }, { age: age2 }) => {
  console.log('preProps', age, age2);
  return age === age2;
});
