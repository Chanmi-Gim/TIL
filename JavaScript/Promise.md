# Promise

-   콜백함수 : 함수의 매개변수를 통해 다른 함수의 내부로 전달되는 함수

    -   주요 사용처: 비동기 작업처리, 함수 종료 후 작업처리 지정

-   비동기처리

    1. 콜백패턴 : 비동기함수(작업이 완료될 때까지 기다리지 않고 다른 작업을 수행)의 작업이 완료되면 그 결과나 상태에 따라 미리 정의한 콜백 함수를 호출하는 패턴

        - 단점 : 에러처리 불가, 콜백헬
        - 자주 사용되는 비동기 함수 : setTimeout/ setInterval/ fetch/ promise/ async/ await/ 이벤트핸들러(onload...)

            ```javascript
            const get = (url, successCallback, failureCallBack) => {
                const xhr = new XMLHttpRequest();
                xhr.open("GET", url);
                xhr.send();
                // 비동기함수 내 콜백함수 호출
                xhr.onload = () => {
                    if (xhr.status === 200) {
                        successCallback(JSON.parse(xhr.response));
                    } else {
                        console.log(`${xhr.status} ${xhr.statusText}`);
                    }
                };
            };
            const url = "https://~~~";
            // 콜백헬
            get(`${url}/posts/1`, ({ userId }) => {
                console.log(userId);
                get(`${url}/users/${userId}`, (userInfo) => {
                    console.log(userInfo);
                });
            });
            ```

            ```javascript
            try {
                setTimeout(() => {
                    throw new Error("Error!");
                }, 1000);
            } catch (e) {
                console.error("캐치한 에러", e); // 에러 캐치 불가
            }
            ```

    2. 프로미스 : 비동기함수의 후처리 콜백함수를 따로 만들지 않고 resolve, reject 함수를 이용

        - 장점 : 콜백패턴의 단점인 콜백헬과 에러처리 불가를 해결한다 (프로미스 체이닝, 후처리 메소드)
        - 단점 : 여전히 가독성이 좋지 않다. 콜백패턴을 사용하므로 콜백함수를 여전히 사용한다.
        - 생성방법 : 표준 빌트인 객체 Promise 생성자 함수 사용(인자 : 콜백함수(resolve함수, reject함수))

            ```javascript
            new Promise((resolve, reject)=>{
                if(`비동기처리 성공`){ resolve(...) }
                else { reject(...) }
            })
            ```

        - 작동방법 : Promise 생성자함수가 인수로 전달받은 콜백함수 내부에서 비동기 처리를 수행한다. 이때, 비동기 처리에 성공하면 비동기 처리 결과는 resolve 함수에 인수로 전달하면서 호출하고 프로미스를 fulfilled 상태로 변경한다. 실패시, 에러를 reject 함수에 인수로 전달하면서 호출하고 프로미스를 rejected 상태로 변경한다.
            ```
            * 프로미스의 상태 정보
            - pending : 비동기처리가 아직 수행되지 않은 상태(프로미스가 생성된 직후 기본상태)
            - fulfilled : 비동기처리가 수행된 상태(성공), resolve 함수 호출
            - reject : 비동기처리가 수행된 상태(실패), reject 함수 호출
            ```
        - 후속처리 메서드(에러 처리해결/ 콜백헬 해결)

            - 모든 후속처리메서드는 프로미스를 반환한다. (만약, 콜백함수가 프로미스가 아닌 값을 반환하면 그 값을 암묵적으로 resolve 또는 reject하여 프로미스를 생성해 반환한다.)
            - 비동기로 동작한다.

            ① Promise.prototype.then

            ```javascript
            // 첫번째 콜백함수 : fulfilled 상태이면 호출
            // 두번째 콜백함수 : reject 상태이면 호출
            new Promise((resolve, reject)=> {...}).then(v => console.log(v), e => console.log(e))
            ```

            ② Promise.prototype.catch

            ```javascript
            // 콜백함수 : reject 상태인 경우만 호출
            new Promise((_, reject) => {...}).catch((e) => console.log(e));
            // === new Promise((_, reject) => {...}).catch((undefined, e) => console.log(e)));
            ```

            ③ Promise.prototype.finally

            ```javascript
            // 콜백함수 : 상태 상관없이 무조건 1번 호출
            new Promise(() => {...}).finally(() => console.log("finally"));
            ```

            💡 <U>에러처리 해결</U>

            ```javascript
            const url = "https://...";
            promiseGet(url)
                .then((res) => console.log(res))
                .catch((err) => console.log(res));
            // === promiseGet(url).then((res) => console.log(res), (err)=> console.log(err))
            // 단, err는 res에서 발생한 에러를 캐치하지 못한다. 그러므로 catch를 이용한 방법 권장
            ```

            💡 <U>프로미스 체이닝</U>

            ```javascript
            - then, catch, finally 후속처리 메서드는 언제나 프로미스를 반환하므로 연속적으로 호출 가능하다.
            - 프로미스 체이닝을 통해 비동기 처리 결과를 전달받아 후속처리하므로 비동기 처리를 위한 콜백패턴의 콜백헬이 발생하지 않는다.
            ```

        * 정적 메서드

            ① Promise.resolve / Promise.reject

            ```javascript
            const resolvePromise = Promise.resolve([1, 2, 3]);
            // === const resolvePromise = new Promise((resolve) => resolve([1, 2, 3]));
            resolvePromise.then(console.log); //[1,2,3]
            ```

            ② Promise.all : 관계없는 프로미스를 함께 묶어 병렬처리하는 메서드 모든 프로미스가 성공 또는 실패할 때까지 기다리며, 모두 fulfilled면 처리결과를 배열에 저장해 새로운 프로미스로 반환한다. 하나라도 reject되면 에러가 반환한다. 처리순서를 보장한다.

            ```javascript
            // 6초 소요
            const regData1 = () => new Promise((res) => setTimeout(() => resolve(1), 3000));
            const regData2 = () => new Promise((res) => setTimeout(() => resolve(2), 2000));
            const regData3 = () => new Promise((res) => setTimeout(() => resolve(3), 1000));

            // 3초 소요
            Promise.all([regData1, regData2, regData3]).then(console.log).catch(console.log);
            ```

            ③ Promise.allSettled : 모든 프로미스가 성공 또는 실패할 때까지 기다리며 fulfilled/reject 상관없이 처리결과를 배열로 반환한다.

            ```javascript
            Promise.allSettled([
                new Promise((resolve) => setTimeout(() => resolve(1), 2000)),
                new Promise((_, reject) => setTimeout(() => reject(new Error("Error!")), 100)),
            ]).then(console.log);
            // [
            //     { status: 'fulfilled', value: 1 },
            //     {
            //       status: 'rejected',
            //       reason: Error: Error!
            //           at Timeout._onTimeout (/Users/chanmi/Dev/fullstack/ts/낙서장.js:3:56)
            //           at listOnTimeout (node:internal/timers:569:17)
            //           at process.processTimers (node:internal/timers:512:7)
            //     }
            // ]
            ```

            ④ Promise.race : 가장 먼저 settled된 하나의 프로미스 반환

            ```javascript
            const promise1 = new Promise((_, reject) => setTimeout(reject, 1000, "에러발생"));
            const promise2 = new Promise((resolve) => setTimeout(resolve, 500, "성공"));
            Promise.race([promise1, promise2])
                .then((result) => {
                    console.log("가장 먼저:", result);
                })
                .catch((err) => {
                    console.error("에러:", err);
                });
            // 가장 먼저: 성공
            ```

            ⑤ Promise.any : 하나라도 fulfilled이면 하나의 프로미스 반환(모두 실패하면 에러모음 배열 반환)

            ```javascript
            Promise.any([promise1, promise2])
                .then((result) => {
                    console.log("어느 하나:", result);
                })
                .catch((err) => {
                    console.error("모두 실패", err);
                });
            // 어느 하나: 성공
            ```

*   마이크로 태스크 큐

    -   일시저장한다는 점에서 태스크큐와 동일하지만 태스크큐보다 우선순위가 높아 이벤트 루프는 콜스택이 비면 먼저 마이크로 태스크 큐의 대기함수를 가져와 실행하고 마이크로 태스크 큐가 비면 태스크큐에서 대기하고 있는 함수를 가져와 실행한다.

    -   태스크큐와의 차이점
        -   태스크큐: 비동기 함수의 콜백함수, 이벤트 핸들러를 일시저장한다.
        -   마이크로 태스크큐 : 프로미스의 후속처리 메서드의 콜백함수를 일시저장한다.

*   fetch : HTTP 요청 전송기능을 제공하는 클라이언트 사이드 webAPI. (프로미스를 지원하므로 콜백패턴 단점으로부터 자유롭다.)

    ```javascript
    const promise = fetch(url [, options])
    // options : method, headers, body
    ```

    ```javascript
    fetch("https://...")
        .then((res) => res.json()) // res 객체에서 HTTP 응답 몸체를 취득하여 역직렬화
        .then((json) => console.log(json)); // json은 역직렬화된 HTTP 응답 몸체 {userId : .... }
    ```

    -   주의 사항 : fetch함수가 반환하는 프로미스는 기본적으로 오프라인 등의 네트워크 장애나 cors 에러에 의해 요청이 완료되지 못한 경우에만 reject 한다.
        (404 Not found, 500 Internal Server Error 같은 HTTP에러는 reject하지 않고 불리언 타입의 OK 상태를 false로 설정한 response 객체를 resolve한다.)

        ```javascript
        fetch("https://...")
            .then((res) => {
                if (!res.ok) throw new Error(res.statusText);
                return res.json();
            })
            .then((todo) => console.log(todo))
            .catch((err) => console.error(err));
        ```
