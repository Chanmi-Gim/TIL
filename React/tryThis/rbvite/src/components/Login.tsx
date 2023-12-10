type Props = {
  login: () => void;
};

const Login = ({ login }: Props) => {
  console.log('@@@Login');
  return (
    <>
      <div>
        <b>Login ID(숫자):</b> <input type='number' />
      </div>
      <div>
        <b>Login Name:</b> <input type='text' />
      </div>
      <button onClick={login}>Login</button>
    </>
  );
};
export default Login;
