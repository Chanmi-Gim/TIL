import { useSession } from '../hooks/session-context';
import Profile from './Profile';
import Login from './Login';
import './My.css';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const My = () => {
  const {
    session: { loginUser },
  } = useSession();

  const navigate = useNavigate();
  useEffect(() => {
    if (!loginUser) navigate('/login');
  }, [navigate, loginUser]);
  return (
    <>
      <div className={clsx({ 'green-border': !loginUser })}>
        {loginUser ? <Profile /> : <Login />}
      </div>
    </>
  );
};
export default My;
