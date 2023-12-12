import { PropsWithChildren, createContext, useContext, useState } from 'react';

type CounterContextProps = {
  count: number;
  plusCount: () => void;
};

const CounterContext = createContext<CounterContextProps>({
  count: 0,
  plusCount: () => {},
});

const CounterContextProvider = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0);
  const plusCount = () => setCount(count + 1);
  return (
    <CounterContext.Provider value={{ count, plusCount }}>
      {children}
    </CounterContext.Provider>
  );
};
const useCounter = () => useContext(CounterContext);

// 컴포넌트 파일에서는 컴포넌트 하나만 export 하라는 설정인데 컨텍스트는 예외로 disable
// eslint-disable-next-line react-refresh/only-export-components
export { CounterContextProvider, useCounter };