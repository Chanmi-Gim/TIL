import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();
  const location = useLocation();
  const { name, price } =
    location.state || cart.find((item) => item.id === Number(id));
  const [searchParams, setSearchParams] = useSearchParams({ aaa: 'x' });
  console.log('aaa:', searchParams.get('aaa'));
  return (
    <>
      {id}. {name} ({price.toLocaleString()}원)
      <button onClick={() => setSearchParams({ aaa: 'X' })}>setParam</button>
    </>
  );
};
