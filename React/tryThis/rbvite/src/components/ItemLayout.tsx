import { Link, Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import './ItemLayout.css';
import clsx from 'clsx';

export const ItemLayout = () => {
  const {
    session: { cart },
    removeCartItem,
  } = useSession();
  const [searchParams, setSearchParams] = useSearchParams({ searchStr: '' });
  return (
    <>
      <div>
        <input
          type='text'
          value={searchParams.get('searchStr') || ''}
          onChange={(e) =>
            setSearchParams({ searchStr: e.currentTarget.value })
          }
          className={clsx('input')}
        />
        <div className={clsx('ul')}>
          <ul>
            {cart
              .filter((item) =>
                item.name.includes(searchParams.get('searchStr') || '')
              )
              .map((item) => (
                <li key={item.id}>
                  <small>{item.id}</small>
                  <Link to={`/items/${item.id}`} state={item}>
                    <strong>{item.name}</strong>
                  </Link>
                  <small>({item.price.toLocaleString()}원)</small>
                  <button onClick={() => removeCartItem(item.id)}>X</button>
                </li>
              ))}
          </ul>{' '}
        </div>
        <Outlet />
      </div>
    </>
  );
};
