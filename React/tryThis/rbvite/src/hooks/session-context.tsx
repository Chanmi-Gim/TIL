import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

type SessionContextProp = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  saveCartItem: (id: number, name: string, price: number) => void;
  removeCartItem: (id: number) => void;
};

const DEFAULT_SESSION = {
  loginUser: null,
  cart: [],
};

const SessionContext = createContext<SessionContextProp>({
  session: DEFAULT_SESSION,
  login: () => {},
  logout: () => {},
  saveCartItem: () => {},
  removeCartItem: () => {},
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(DEFAULT_SESSION);

  const url = '/data/sample.json';
  useEffect(() => {
    const controller = new AbortController(); // AbortController: Promise 취소
    const { signal } = controller;
    fetch(url, { signal })
      .then((res) => res.json())
      .then((data) => setSession(data));
    return () => {
      controller.abort();
    };
  }, []);

  const login = ({ id, name }: LoginUser) => {
    if (!name) {
      alert('Input users name, Please.');
      return;
    }
    setSession({ ...session, loginUser: { id, name } });
  };
  const logout = () => {
    setSession({ ...session, loginUser: null });
  };
  const saveCartItem = (
    itemId: number,
    itemName: string,
    itemPrice: number
  ) => {
    const { cart } = session;
    itemId = itemId || Math.max(...session.cart.map((cart) => cart.id), 0) + 1;
    const item = cart.find((item) => item.id === itemId);
    if (item) {
      item.name = itemName;
      item.price = itemPrice;
    } else {
      cart.push({ id: itemId, name: itemName, price: itemPrice });
    }
    setSession({
      ...session,
      cart: [...cart],
    });
  };

  const removeCartItem = (itemId: number) => {
    setSession({
      ...session,
      cart: session.cart.filter((x) => x.id !== itemId),
    });
  };

  return (
    <SessionContext.Provider
      value={{
        session,
        login,
        logout,
        saveCartItem,
        removeCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
