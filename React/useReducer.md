# Hooks(useReducer)

-   상태 관리 훅

## 1. 사용방법

### 1-1. useReducer Hooks 사용

-   설정 : reducer 함수, 초기값
    ```typescript
    import { useReducer } from 'react';
    const [state, dispatch] = useReducer(reducer, 초기값);
    ```

<br>

### 1-2. reducer 함수 정의

-   reducer 함수: `현재 상태`와 `action`을 받아 새로운 상태를 반환하는 함수이다.
-   action: `action`에는 필수속성인 `type`과 선택속성인 `payload`이 있다. `action`은 동작타입을, `payload`는 추가정보를 전달한다.

    ```typescript
    type Action = {
        type: 'plus' | 'minus';
        payload?: number;
    };

    const reducer = (count: number, { type, payload }: Action) => {
        switch (type) {
            case 'plus':
                return count + (payload ?? 1);
            case 'minus':
                return count - 1;
            default:
                return count;
        }
    };
    ```

<br>

### 1-3. dispatch 사용

-   `action` 을 전달하여 상태를 업데이트한다.

    ```typescript
    dispatch({ type: 'plus', payload: value });
    ```

<br>

## 2. 응용

### Context에서 사용하기

-   useReduder 훅 사용 : reducer함수를 reducer로, 초기값은 0으로 설정한다.
-   reducer 함수 정의
-   dispatch 사용

```typescript
// context 파일
type Action = { type: string; payload?: number };
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
const CounterContextProvider = ({ children }: PropsWithChildren) => {
    const [count, dispatch] = useReducer(reducer, 0);
    const plusCount = () => dispatch({ type: 'plus', payload: 2 });
    const minusCount = () => dispatch({ type: 'minus' });

    return <CounterContext.Provider value={{ count, plusCount, minusCount }}>{children}</CounterContext.Provider>;
};
// 다른 파일
const { count, minusCount } = useCounter();
```

<br>

## 3. useState와 useReducer의 차이점

-   `useState`
    -   주로 단일의 상태변수를 다룬다.
    -   로직이 간단하고 직관적이다.
-   `useReducer`

    -   객체 형태의 상태변수를 다룬다.
    -   여러 상태를 조합하거나 복잡한 로직을 다룬다.

    ```typescript
    // useState
    const [count, setCount] = useState(0);
    setCount(count + 1); // 단순히 현재 상태에 1을 더하는 예제

    // useReducer
    const initialState = { count: 0 };
    const reducer = (state, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1 };
            // ...
        }
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    dispatch({ type: 'INCREMENT' }); // 복잡한 로직을 처리하는 예제
    ```
