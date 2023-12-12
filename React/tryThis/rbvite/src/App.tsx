import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';
import { LoginHandle } from './components/Login';
import { useCounter } from './hooks/counter-context';

const SampleSession = {
  loginUser: null,
  // loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};

type ChildHandler = {
  appendPeriod: () => void;
};
const ChildComponent = forwardRef((_, ref) => {
  const [childText, setChildText] = useState('');
  const handler: ChildHandler = {
    appendPeriod: () => setChildText((c) => c + '.'),
  };
  useImperativeHandle(ref, () => handler);
  return <>child: {childText}</>;
});

function App() {
  const { count, plusCount } = useCounter();
  const [session, setSession] = useState<Session>(SampleSession);
  const loginHandleRef = useRef<LoginHandle>(null);
  const login = ({ id, name }: LoginUser) => {
    if (!name) {
      alert('Input users name, Please.');
      loginHandleRef.current?.focusName();
      return;
    }
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((x) => x.id !== itemId),
    });
  };
  const childRef = useRef<ChildHandler>(null);
  const addCartItem = (itemName: string, itemPrice: number) => {
    const id =
      session.cart
        .map((cart) => cart.id)
        .sort()
        .at(-1) || 0;
    setSession({
      ...session,
      cart: [...session.cart, { id: id + 1, name: itemName, price: itemPrice }],
    });
  };

  return (
    <>
      <ChildComponent ref={childRef} />
      <button onClick={() => childRef.current?.appendPeriod()}>
        Call Child Component
      </button>
      <h2>count: {count}</h2>
      <Hello name='홍길동' age={30} plusCount={plusCount} />
      <My
        session={session}
        login={login}
        logout={logout}
        loginHandleRef={loginHandleRef}
        addCartItem={addCartItem}
        removeCartItem={removeCartItem}
      />
    </>
  );
}
// 11월 10~ 12월 9일
export default App;
