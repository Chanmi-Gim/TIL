import { ChangeEvent, useState } from 'react';
import { LoginUser } from '../App';

type Props = {
  login: ({ id, name }: LoginUser) => void;
};

const Login = ({ login }: Props) => {
  const [id, setUserId] = useState(0);
  const [name, setUserName] = useState('');
  console.log('>>Login');

  // Setter를 사용하지 않고 따로 함수로 만들면 여러개의 set 사용 가능하므로 편리할 때가 있다. 가독성이 더 좋다.
  const changeId = (evt: ChangeEvent<HTMLInputElement>) =>
    setUserId(Number(evt.currentTarget.value));
  const changeName = (evt: ChangeEvent<HTMLInputElement>) =>
    setUserName(evt.currentTarget.value);
  return (
    <>
      <div>
        Login ID(숫자): <input type='number' value={id} onChange={changeId} />
      </div>
      <div>
        Login Name: <input type='text' value={name} onChange={changeName} />
      </div>
      <button onClick={() => login({ id, name })}>Login</button>
    </>
  );
};
export default Login;
