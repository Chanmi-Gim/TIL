import { FormEvent, useRef } from 'react';
import { useSession } from '../hooks/session-context';
import Profile from './Profile';
import Login from './Login';

const My = () => {
  console.log('@@@My');
  const {
    session: { loginUser, cart },
    saveCartItem,
    removeCartItem,
  } = useSession();

  const itemIdRef = useRef<number>(0);
  const itemNameRef = useRef<HTMLInputElement>(null);
  const itemPriceRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = itemNameRef.current?.value;
    const price = itemPriceRef.current?.value;
    if (!name) {
      alert('상품명을 정확히 알려주세요!');
      return itemNameRef.current?.focus();
    }
    if (!price) {
      alert('가격을 정확히 알려주세요!');
      return itemPriceRef.current?.focus();
    }
    saveCartItem(itemIdRef.current, name, Number(price));
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
  };

  const setCartItem = (id: number) => {
    itemIdRef.current = id;
    const selectedItem = cart.find((item) => item.id === id) || {
      name: '',
      price: 0,
    };
    if (itemNameRef.current && itemPriceRef.current) {
      itemNameRef.current.value = selectedItem?.name;
      itemPriceRef.current.value = '' + selectedItem?.price;
    }
  };
  return (
    <>
      {loginUser ? <Profile /> : <Login />}
      <hr></hr>
      <ul>
        {cart.map(({ id, name, price }) => (
          <li key={id}>
            <small>[id:{id}]</small>{' '}
            <button
              onClick={() => setCartItem(id)}
              style={{
                paddingTop: 0,
                paddingBottom: '0.2rem',
                backgroundColor: 'inherit',
              }}
            >
              <strong>{name}</strong>
            </button>
            <small>({price.toLocaleString()}원)</small>
            <button onClick={() => removeCartItem(id)}>X</button>
          </li>
        ))}
        <form onSubmit={submit}>
          <input type='text' ref={itemNameRef} />
          <input type='number' ref={itemPriceRef} />
          <button type='submit'>Save</button>
        </form>
      </ul>
    </>
  );
};
export default My;
