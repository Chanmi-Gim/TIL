import { Outlet, useSearchParams } from 'react-router-dom';
import { useSession } from '../hooks/session-context';
import './ItemLayout.css';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
export const ItemLayout = () => {
  const {
    session: { cart },
    removeCartItem,
    saveCartItem,
  } = useSession();
  const [items, setItems] = useState<Cart[]>([]);
  const [currItem, setCurrItem] = useState<Cart | null>(null);
  const [searchParams, setSearchParams] = useSearchParams({ searchStr: '' });
  const searchStr = searchParams.get('searchStr');

  useEffect(() => {
    if (searchStr)
      setItems(cart.filter((item) => item.name.includes(searchStr || '')));
    else setItems(cart);
  }, [cart, searchStr]);

  useEffect(() => {
    setCurrItem(items[0]);
  }, [items]);

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
        <div
          style={{
            margin: '1rem',
            display: 'grid',
            gridTemplateColumns: '2fr 2fr',
            gap: '1rem',
            width: '80vw',
          }}
        >
          <ul style={{ listStyle: 'none' }}>
            {cart
              .filter((item) =>
                item.name.includes(searchParams.get('searchStr') || '')
              )
              .map((item) => (
                <li key={item.id}>
                  <small>
                    [{item.id}]{'  '}
                  </small>
                  <button onClick={() => setCurrItem(item)}>
                    <strong>{item.name}</strong>
                  </button>
                  <small>({item.price.toLocaleString()}원)</small>
                  <button onClick={() => removeCartItem(item.id)}>X</button>
                </li>
              ))}
          </ul>
          <Outlet context={{ item: currItem, saveCartItem }} />
        </div>
      </div>
    </>
  );
};
