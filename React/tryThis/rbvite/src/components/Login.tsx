import { FormEvent, useEffect, useRef } from 'react';
import { LoginUser } from '../App';

type Props = {
  login: ({ id, name }: LoginUser) => void;
};

const Login = ({ login }: Props) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
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

  //focus
  useEffect(() => {
    if (idRef.current) idRef.current.value = '100';
    focusName();
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
};
export default Login;
