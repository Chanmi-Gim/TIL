import {
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useReducer,
} from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
  minusCount: () => void;
};
type Action = { type: 'plus' | 'minus'; payload?: number };
const reducer = (count: number, { type, payload = 1 }: Action) => {
  switch (type) {
    case 'plus':
      return count + payload;
    case 'minus':
      return count - payload;
    default:
      return count;
  }
};

const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
  minusCount: () => {},
});

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, dispatch] = useReducer(reducer, 0);
  const plusCount = useCallback(
    () => dispatch({ type: 'plus', payload: 1 }),
    []
  );
  const minusCount = useCallback(() => dispatch({ type: 'minus' }), []);
  return (
    <CounterContext.Provider value={{ count, plusCount, minusCount }}>
      {children}
    </CounterContext.Provider>
  );
};
const useCounter = () => useContext(CounterContext);

// 컴포넌트 파일에서는 컴포넌트 하나만 export 하라는 설정인데 컨텍스트는 예외로 disable
// eslint-disable-next-line react-refresh/only-export-components
export { CounterContextProvider, useCounter };
