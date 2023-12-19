import { useLocation, useNavigate } from 'react-router-dom';
import { useTimer } from './hooks/timer-hooks';

export const NotFound = () => {
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  const { useTimeout } = useTimer();
  useTimeout(() => navigate(-1), 2000);
  return <h1>{location.pathname}: Page Not Found!</h1>;
};
