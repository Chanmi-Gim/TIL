import { PropsWithChildren, createContext, useContext, useState } from 'react';

type SessionContextProp = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  addCartItem: (name: string, price: number) => void;
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
  addCartItem: () => {},
  removeCartItem: () => {},
});

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [session, setSession] = useState<Session>(DEFAULT_SESSION);
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
        addCartItem,
        removeCartItem,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSession = () => useContext(SessionContext);
