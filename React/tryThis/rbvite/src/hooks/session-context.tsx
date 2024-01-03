import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { useFetch } from './fetch-hooks';

type SessionContextProp = {
  session: Session;
  login: ({ id, name }: LoginUser) => void;
  logout: () => void;
  saveCartItem: SaveCartItem;
  removeCartItem: NumberVoidFn;
};

const DEFAULT_SESSION: Session = {
  loginUser: null,
  cart: [],
};

const SessionContext = createContext<SessionContextProp>({
  session: DEFAULT_SESSION,
  login: () => {},
  logout: () => {},
  saveCartItem: () => 0,
  removeCartItem: () => {},
});

enum ActionType {
  SET_SESSION = 'setSession',
  LOGIN = 'login',
  LOGOUT = 'logout',
  SAVE_ITEM = 'saveCartItem',
  REMOVE_ITEM = 'removeCartItem',
}
type Action =
  | { type: ActionType.SET_SESSION; payload: Session }
  | { type: ActionType.LOGIN; payload: LoginUser }
  | { type: ActionType.LOGOUT; payload: null }
  | { type: ActionType.SAVE_ITEM; payload: Cart[] }
  | { type: ActionType.REMOVE_ITEM; payload: number };

const SKEY = 'SESSION';

const setStorage = (session: Session | undefined) => {
  if (!session) return;
  const { loginUser, cart } = session;
  sessionStorage.setItem(SKEY, JSON.stringify(loginUser));
  localStorage.setItem(SKEY, JSON.stringify(cart));
};

const getStorage = () => {
  const strLoginUser = sessionStorage.getItem(SKEY);
  const strCart = localStorage.getItem(SKEY);
  if (!strCart || strCart === '[]') return undefined;
  const loginUser = strLoginUser ? JSON.parse(strLoginUser) : null;
  const cart = JSON.parse(strCart);
  return { loginUser, cart };
};

const reducer = (session: Session, action: Action) => {
  let newer;
  switch (action.type) {
    case ActionType.SET_SESSION:
      newer = { ...action.payload };
      break;
    case ActionType.LOGIN:
    case ActionType.LOGOUT:
      newer = { ...session, loginUser: action.payload };
      break;
    case ActionType.SAVE_ITEM:
      newer = { ...session, cart: [...action.payload] };
      break;
    case ActionType.REMOVE_ITEM:
      newer = {
        ...session,
        cart: session?.cart.filter((item) => item.id !== action.payload),
      };
      break;
  }
  setStorage(newer);
  return newer;
};

export const SessionContextProvider = ({ children }: PropsWithChildren) => {
  const storedData = getStorage();
  console.log('Stored data:', storedData);
  const [session, dispatch] = useReducer(
    reducer,
    storedData || DEFAULT_SESSION
  );
  const url = '/data/sample.json';
  const data = useFetch<Session>(url, storedData);
  console.log('Fetched data:', data);
  useEffect(() => {
    if (data) dispatch({ type: ActionType.SET_SESSION, payload: data });
  }, [data]);

  const login = useCallback(({ id, name }: LoginUser) => {
    if (!name) {
      alert('Input User Name, Please');
      return;
    }
    dispatch({ type: ActionType.LOGIN, payload: { id, name } });
  }, []);

  const logout = useCallback(() => {
    if (session.loginUser) dispatch({ type: ActionType.LOGOUT, payload: null });
  }, [session]);

  const saveCartItem = useCallback(
    (itemId: number, itemName: string, itemPrice: number) => {
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
      return itemId;
    },
    [session]
  );

  const removeCartItem = useCallback(
    (itemId: number) => {
      dispatch({ type: ActionType.REMOVE_ITEM, payload: itemId });
    },
    [session]
  );

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
