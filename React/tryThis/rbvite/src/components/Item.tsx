import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect, useState } from 'react';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();
  const location = useLocation();
  const { state: itemState } = location;
  const [item, setItem] = useState<Cart | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const _item = itemState || cart.find((item) => item.id === Number(id));
    if (!_item) navigate('./');
    setItem(_item);
  }, [item, navigate, cart, id, itemState]);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '3rem' }}>
        {item?.id}. {item?.name} ({item?.price.toLocaleString()}원)
        <Link to={`/items`} state={{ item }}>
          <strong>Edit</strong>
        </Link>
      </div>
    </>
  );
};
