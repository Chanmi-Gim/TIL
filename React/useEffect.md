# useEffect

```javascript
useEffect(() => {
  // 콜백 함수 내용
  return () => {
    // 클린업 함수 내용
  };
}, [의존성 배열]);

```

-   `인수를 2개` 받는다.(`콜백함수`, `의존성 배열`)
-   `의존성 배열의 값이 변경되면 콜백함수를 실행한다.`
-   클래스형 컴포넌트의 생명주기 메서드와 비슷한 작동을 구현할 수 있다.
    -   의존성 배열의 값이 `빈 배열`이면 콜백함수는 `마운트`될 때만 실행된다. (마운트)
    -   의존성 배열의 값이 `변경`될 때마다 콜백함수를 실행한다. (`업데이트`)
    -   `리턴시 클린업 함수를 반환된다`. 클린업 함수는 컴포넌트가 `언마운트`될 때 실행된다. (언마운트)

<br>

### `StrictMode`의 개발환경에서 useEffect

-   의존관계 배열이 비워져있을 때 2회 호출된다. (Mount + unMount + Mount)
-   그러나, cleanup 유실 및 중복데이터 처리를 방지하기 위해서 StrictMode 것을 권장한다.
-   `cleanup` 해줄 일이 있는지 항상 염두하자. 예를 들어, useEffect의 콜백으로 setInterval을 지정한 경우 아래의 첫 번째 setBadCount는 클린 업하지 않았기 때문에 (unmount시 아무런 조치가 없어) strictMode에서는 2번의 Mount시기에 콜백을 호출하기 때문에 총 2초씩 증가한다. 그러나, setGoodCount는 클린업하는 함수를 만들어주었기 때문에 mount후 unmount를 겪으면서 setInterval에 대해 clear되었기 때문에 1초씩 증가한다.

    ```javascript
    useEffect(() => {
        setInterval(() => setBadCount((pre) => pre + 1), 1000);
    }, []);

    useEffect(() => {
        const intl = setInterval(() => setGoodCount((pre) => pre + 1), 1000);
        return () => clearInterval(intl);
    }, []);
    ```

    > **setTimeout** - 한번만 특정 작업을 지연시키고자 할때 사용된다.  
    > **setInterval** - 일정한 간격으로 코드를 주기적으로 실행하고자 할때 사용된다.  
    > **clearTimeout** - 예약된 Timeout 작업을 취소하고 타이머를 해제하려는 경우에 사용된다.  
    > **clearInterval** - 예약된 Interval작업을 취소하고 타이머를 해제하려는 경우에 사용된다.

<br>

### fetch할 때의 useEffect

-   **AbortController** : `비동기작업을 중단할 때 사용되는 객체.` 비동기 작업을 중단하고 싶을 때, `해당 작업을 관리하기 위한 AbortControlloer 인스턴스를 생성한 뒤 이 인스턴스의 signal 속성을 fetch 함수에 전달한 뒤 controller.abort()을 이용하면 전달한 비동기 작업을 즉시 취소할 수 있다.`
-   **fetch(url, 옵션객체)** : `옵션 객체중 하나인 signal 속성`은 `AbortController`에서 생성한 `signal`을 전달받아 `controller.abort()` 실행시 작업이 중단된다.

-   data 다운로드 : useEffect를 이용하여 컴포넌트 마운트시 url로부터 데이터를 받아온다. 컴포넌트 언마운트시 컨트롤러를 이용하여 비동기 작업인 fetch를 즉시 취소한다.

    -   fetch해서 얻은 url:data를 `cache`하여 속도를 빠르게 만들 수도 있다.

    ```javascript
    export const useFetch = <T>(url: string) => {
        const [data, setData] = (useState < T) | (null > null);
        useEffect(() => {
            const controller = new AbortController();
            const { signal } = controller;
            fetch(url, { signal })
                .then((res) => res.json())
                .then((data) => setData(data));
            return () => controller.abort();
        }, []);
        return data;
    };
    ```
