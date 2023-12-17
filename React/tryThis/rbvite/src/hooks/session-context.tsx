import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useFetch } from './fetch-hooks';

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

enum ActionType {
  LOGIN = 'login',
  LOGOUT = 'logout',
  SAVE_ITEM = 'saveCartItem',
  REMOVE_ITEM = 'removeCartItem',
  SET_SESSION = 'setSession',
}
type Action =
  | { type: ActionType.SET_SESSION; payload: Session }
  | { type: ActionType.LOGIN; payload: LoginUser }
  | { type: ActionType.LOGOUT; payload: null }
  | { type: ActionType.SAVE_ITEM; payload: Cart[] }
  | { type: ActionType.REMOVE_ITEM; payload: number };

const reducer = (session: Session, action: Action) => {
  switch (action.type) {
    case ActionType.SET_SESSION:
      return { ...action.payload };
    case ActionType.LOGIN:
    case ActionType.LOGOUT:
      return { ...session, loginUser: action.payload };
    case ActionType.SAVE_ITEM:
      return { ...session, cart: [...action.payload] };
    case ActionType.REMOVE_ITEM:
      return {
        ...session,
        cart: session.cart.filter((item) => item.id !== action.payload),
      };
  }
};

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const [session, dispatch] = useReducer(reducer, DEFAULT_SESSION);
  const url = '/data/sample.json';
  const data = useFetch<Session>(url);
  useEffect(() => {
    if (data) {
      dispatch({ type: ActionType.SET_SESSION, payload: data });
    }
  }, [data]);

  const login = ({ id, name }: LoginUser) => {
    if (!name) {
      alert('Input User Name, Please');
      return;
    }
    dispatch({ type: ActionType.LOGIN, payload: { id, name } });
  };
  const logout = () => {
    dispatch({ type: ActionType.LOGOUT, payload: null });
  };
  const saveCartItem = (
    itemId: number,
    itemName: string,
    itemPrice: number
  ) => {
    const { cart } = session;
    const item = itemId && cart.find((item) => item.id === itemId);
    if (item) {
      item.name = itemName;
      item.price = itemPrice;
    } else {
      itemId = Math.max(...session.cart.map((cart) => cart.id), 0) + 1;
      cart.push({ id: itemId, name: itemName, price: itemPrice });
    }
    dispatch({ type: ActionType.SAVE_ITEM, payload: cart });
  };

  const removeCartItem = (itemId: number) => {
    dispatch({ type: ActionType.REMOVE_ITEM, payload: itemId });
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
