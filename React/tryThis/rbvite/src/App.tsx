import { useState } from 'react';
import './App.css';
import Hello from './components/Hello';
import My from './components/My';

export type LoginUser = { id: number; name: string };
export type Cart = { id: number; name: string; price: number };
export type Session = {
  loginUser: LoginUser | null;
  cart: Cart[];
};

const SampleSession = {
  loginUser: null,
  // loginUser: { id: 1, name: 'Hong' },
  cart: [
    { id: 100, name: '라면', price: 3000 },
    { id: 101, name: '컵라면', price: 2000 },
    { id: 200, name: '파', price: 5000 },
  ],
};
function App() {
  const [count, setCount] = useState(0);
  const [session, setSession] = useState<Session>(SampleSession);
  const plusCount = () => setCount((count) => count + 1);

  const login = ({ id, name }: LoginUser) => {
    if (!name) return alert('Input users name, Please.');
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
  return (
    <>
      <h2>count: {count}</h2>
      <Hello name='홍길동' age={30} plusCount={plusCount} />
      <My
        session={session}
        login={login}
        logout={logout}
        removeCartItem={removeCartItem}
      />
    </>
  );
}

export default App;
