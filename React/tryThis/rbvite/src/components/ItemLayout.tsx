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
  const [searchParams, setSearchParams] = useSearchParams({
    searchStr: '',
    itemId: '',
  });
  const searchStr = searchParams.get('searchStr') || '';
  const itemId = searchParams.get('itemId') || '';

  useEffect(() => {
    if (searchStr)
      setItems(
        cart
          .filter((item) => item.name.includes(searchStr || ''))
          .sort((a, b) => b.id - a.id)
      );
    else setItems(cart.sort((a, b) => b.id - a.id));
  }, [cart, searchStr]);

  useEffect(() => {
    if (itemId)
      setCurrItem(cart.find((item) => item.id === Number(itemId)) || null);
    else setCurrItem(items[0]);
  }, [cart, items, itemId]);

  return (
    <>
      <div>
        <input
          type='text'
          value={searchParams.get('searchStr') || ''}
          onChange={(e) =>
            setSearchParams({ searchStr: e.currentTarget.value, itemId })
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
          <div>
            <ul style={{ listStyle: 'none' }}>
              {items.map((item) => (
                <li
                  key={item.id}
                  className={clsx({ active: item.id === currItem?.id })}
                >
                  <small>
                    [{item.id}]{'  '}
                  </small>
                  <button
                    onClick={() => {
                      setCurrItem(item);
                      setSearchParams({ searchStr, itemId: String(item.id) });
                    }}
                  >
                    <strong>{item?.name}</strong>
                  </button>
                  <small>({item?.price.toLocaleString()}원)</small>
                  <button onClick={() => removeCartItem(item.id)}>X</button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setCurrItem({ id: 0, name: '', price: 0 });
                setSearchParams({ searchStr });
              }}
              style={{ backgroundColor: 'skyblue', width: '10rem' }}
            >
              + Add Item
            </button>
          </div>
          <Outlet context={{ item: currItem, saveCartItem }} />
        </div>
      </div>
    </>
  );
};
