# Hooks(useReducer)
- 상태 관리 훅

### useState와 useReducer의 차이점
- `useState`
    - 주로 단일의 상태변수를 다룬다.
    - 로직이 간단하고 직관적이다. 
- `useReducer` 
    - 객체형태의 상태변수를 다룬다.
    - 여러 상태를 조합하거나 복잡한 로직을 다룬다.
    - 복잡한 로직은 `reducer`함수로 분리하고 `dispatch`함수를 통해 `action` 을 전달하여 상태를 업데이트한다. `action`에는 필수속성인 `type`과 선택속성인 `payload`이 있다. `action`은 동작타입을, `payload`는 추가정보를 전달한다.

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