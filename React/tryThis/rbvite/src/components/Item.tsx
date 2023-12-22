import {
  Link,
  // useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import { useEffect, useState } from 'react';

export const Item = () => {
  const {
    session: { cart },
  } = useSession();
  const { id } = useParams();
  const { currItem } = useOutletContext<{ currItem: Cart | undefined }>();
  const [item, setItem] = useState<Cart | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const _item = currItem || cart.find((item) => item.id === Number(id));
    if (!_item) navigate('./');
    setItem(_item);
  }, [item, navigate, cart, id, currItem]);
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', padding: '3rem' }}>
        {item?.id}. {item?.name} ({item?.price.toLocaleString()}원)
        <Link to={`/items`}>
          <strong>Edit</strong>
        </Link>
      </div>
    </>
  );
};
