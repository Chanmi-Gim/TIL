import { FormEvent, RefObject, useRef } from 'react';
import Login, { LoginHandle } from './Login';
import Profile from './Profile';

type Props = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  loginHandleRef: RefObject<LoginHandle>;
  removeCartItem: (itemId: number) => void;
  addCartItem: (itemName: string, itemPrice: number) => void;
};

const My = ({
  session: { loginUser, cart },
  login,
  logout,
  loginHandleRef,
  removeCartItem,
  addCartItem,
}: Props) => {
  console.log('@@@My');
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
    addCartItem(name, Number(price));
    itemNameRef.current.value = '';
    itemPriceRef.current.value = '';
  };
  return (
    <>
      {loginUser ? (
        <Profile loginUser={loginUser} logout={logout} />
      ) : (
        <Login login={login} ref={loginHandleRef} />
      )}
      <hr></hr>
      아이템 담기
      <form onSubmit={submit}>
        name:<input type='text' ref={itemNameRef}></input>
        price:<input type='number' ref={itemPriceRef}></input>
        <button type='submit'>Save</button>
      </form>
      <ul>
        {cart.map(({ id, name, price }) => (
          <li key={id}>
            <small>[id:{id}]</small>
            <strong>{name}</strong>
            <small>({price.toLocaleString()}원)</small>
            <button onClick={() => removeCartItem(id)}>DEL</button>
          </li>
        ))}
      </ul>
    </>
  );
};
export default My;
