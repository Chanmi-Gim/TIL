# hooks(useContext)

## 컨텍스트

`전역 데이터`를 리액트 컴포넌트 트리에 공유하기 위해 설계되었다. main에 컨텍스트의 Provider를 사용할 범위에 맞게 지정하면 그 범위 내에서는 direct로 상태 공유가 가능하다.

-   `Context.Provider` : Context의 provider. value를 통해 값 전달 가능
-   `useContext`: Context의 consumer.

<br>

## 패턴 2가지

### **pattern 1 (render-prop)**

-   `MyContext.Consumer`를 사용하여 컨텍스트 값을 사용하는 방식이다. `createContext 함수`를 사용하여 MyContext를 생성하고 `Consumer`를 통해 컨텍스트 값을 받아와 JSX 안에서 활용한다.이 패턴은 컴포넌트 안에서 `직접` 값을 사용하고자 할 때 유용하다.

    ```javascript
    import { createContext } from 'react';
    export const MyContext = createContext({ x: 1 });

    import { MyContext } from '../myContext';
    <MyContext.Consumer>{(value) => <h1>x: {value.x}</h1>}</MyContext.Consumer>;
    ```

### **pattern 2 (provider-useContext)**

-   `MyContext.Provider`를 사용하여 컨텍스트 값을 설정하고 `useContext`를 활용하여 해당 값을 효율적으로 가져오는 방식이다.
    `createContext 함수`로 MyContext를 생성하고, `Provider`를 통해 컨텍스트 값을 설정합니다. 그 후,`useContext`를 이용하여 사용할 수 있다.

    -   컨텍스트를 하나의 파일로 만들어 Provider, user 모두 export해서 사용하면 편리하다.

    ```javascript (provider-useContext)
    export const MyContext = createContext();
    render(
        <MyContext.Provider value={{ xObj }}>
            <App />
        </MyContext.Provider>
    );
    // context consumer by Provider + useContext
    import { useContext } from 'react';
    import { MyContext } from '../myContext';
    const { xObj } = useContext(MyContext);
    ```
