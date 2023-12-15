import {
  FormEvent,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useSession } from '../hooks/session-context';
import { useCounter } from '../hooks/counter-context';

export type LoginHandle = {
  focusName: () => void;
};

const Login = forwardRef((_, handleRef) => {
  const { login } = useSession();
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { count, plusCount, minusCount } = useCounter();
  console.log('>>Login');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // action 타지 않는다.
    const id = Number(idRef.current?.value);
    const name = nameRef.current?.value || '';
    console.log(name);
    login({ id, name });
  };

  const focusName = () => {
    if (nameRef.current) nameRef.current.focus();
  };

  useImperativeHandle(handleRef, () => ({
    focusName,
  }));

  useEffect(() => {
    if (idRef.current) idRef.current.value = '100';
    focusName();
  }, []);

  useEffect(() => {
    plusCount();
    console.log('❗️ Login please', count);
    return () => {
      minusCount();
      console.log('✅ Login-cleanup code', count);
    };
  }, []);

  return (
    <form onSubmit={submit}>
      <>
        <div>
          Login ID : <input type='number' ref={idRef} />
        </div>
        <div>
          Login Name : <input type='text' ref={nameRef} />
        </div>
        <button type='submit'>Login</button>
      </>
    </form>
  );
});
export default Login;
