# Iterator

## 이터레이션 프로토콜 : 자료구조의 요소를 순회하는 방법을 정의하는 표준

순회가능한 데이터 컬렉션을 이터레이션 프로토콜을 준수하는 이터러블로 통일하여 for...of문, 스프레드 문법, 구조분해 할당의 대상으로 사용할 수 있도록 일원화했다. 이터레이션 프로토콜에는 이터러블 프로토콜과 이터레이터 프로토콜이 있다.

1. 이터러블 프로토콜 : 객체의 이터레이터 반환방법을 정의한다. Symbol.iterator를 프로퍼티키로 사용한 메서드를 직접 구현하거나, 프로토타입 체인을 통해 상속받은 Symbol.iterator 메서드를 호출하면 이터레이터를 반환해야 한다는 규약이다.[Symbol.iterator]() 메서드를 구현해야 한다.

    - [Symbol.iterator] () : 호출될 때 해당 객체의 요소들을 순차적으로 접근할 수 있는 이터레이터를 반환하는 메서드이다.
    - 이터러블 (객체) : 순회할 수 있는 객체 [ex] 이터러블 : 배열, 문자열, Map, Set 등

2. 이터레이터 프로토콜 : 이터러블의 순회방법을 제공하는 객체이다. 이터러블의 Symbol.iterator 메서드를 호출하면 이터레이터를 반환하는데, 이터레이터 프로토콜이란 이터레이터는 next 메서드를 포함하고 있으며 next 메서드 호출시 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환해야 한다.

    - 이터레이터 프로토콜을 준수한다? 객체가 next() 메서드를 구현하고 next()가 value와 done 속성을 가진 객체를 반환하는 것
    - 이터레이터 (객체) : 자료구조의 아이템들을 순차적으로 접근하는 포인터

        - next 메서드 : 호출시 { value, done } 형식의 객체를 반환한다.
            - value : 현재 아이템의 값
            - done : 모든 아이템을 순회했는지 여부 (true or false)

        ```javascript
        const arr = [1, 2, 3];
        const iterableObj = arr[Symbol.iterator]();
        console.log(iterableObj.next()); // { value: 1, done: false }
        console.log(typeof iterableObj.next); // function
        ```

        ```javascript
        const iter = cities[Symbol.iterator]();
        console.log(iter); // Object [Array Iterator] {}
        console.log(iter.next()); // 5회 반복
        // { value: '부산', done: false }
        // { value: '대구', done: false }
        // { value: '대전', done: false }
        // { value: '서울', done: false }
        // { value: undefined, done: true }

        const cities = ["부산", "대구", "대전", "서울"];
        const iter = cities.keys();
        console.log(iter); // Object [Array Iterator] {}
        console.log(iter.next()); // 5회 반복
        // { value: 0, done: false }
        // { value: 1, done: false }
        // { value: 2, done: false }
        // { value: 3, done: false }
        // { value: undefined, done: true }

        const iter = cities.entries();
        console.log(iter); // Object [Array Iterator] {}
        console.log(iter.next()); // 5회 반복
        // { value: [ 0, '부산' ], done: false }
        // { value: [ 1, '대구' ], done: false }
        // { value: [ 2, '대전' ], done: false }
        // { value: [ 3, '서울' ], done: false }
        // { value: undefined, done: true }

        // 변수명[Symbol.iterator]() === 변수명.values()
        const iter = cities.values();
        console.log(iter); // Object [Array Iterator] {}
        console.log(iter.next()); // 5회 반복
        // { value: '부산', done: false }
        // { value: '대구', done: false }
        // { value: '대전', done: false }
        // { value: '서울', done: false }
        // { value: undefined, done: true }
        ```

    - for...of문 : 내부적으로 이터레이터의 next 메서드를 호출하여 이터러블을 순회하며 next 메서드가 반환한 리절트 객체의 value 프로퍼티 값을 for...of 문의 변수에 할당한다. 이터레이터 리절트 객체의 done 프로퍼티 값의 여부에 따라 순회를 진행(false)/중단(true)한다.
        ```javascript
        // for... of문
        const cities = ["부산", "대구", "대전", "서울"];
        const iter = cities[Symbol.iterator]();
        for (const x of iter) console.log(x);
        // 부산
        // 대구
        // 대전
        // 서울
        console.log(...cities); // 부산 대구 대전 서울
        ```
        ```typescript
        // while문
        const arr = [1, 2, 3];
        const it = arr[Symbol.iterator]();
        while (true) {
            const x = it.next();
            if (x.done) break; // 모든 요소를 순회했다면 반복 종료
            console.log(x.value); // 1, 2, 3 순서대로 출력
        }
        ```
    - 이터러블 객체인지 확인하기
        ```javascript
        typeof obj[Symbol.iterator] === "function"; // 객체의 [Symbol.iterator]가 함수로 구현됐는지 확인
        Symbol.iterator in obj; // 객체의 속성에 존재하는지 확인
        "next" in iterator; // 이터러블 객체 안에 next()가 있는지 확인
        ```

3. 유사배열객체 : 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 갖는 객체를 말한다. length 프로퍼티를 갖기 때문에 for문으로 순회할 수 있고 인덱스를 나타내는 숫자형식의 문자열을 프로퍼티키로 가지므로 마치 배열처럼 인덱스로 프로퍼티 값에 접근가능하다. 이터러블이 아닌 일반 객체이다.
   (단, arguments, NodeList, HTMLCollection 객체에는 Symbol.iterator 메서드를 구현하여 이터러블이 되었다. 즉, 유사 배열 객체이면서 이터러블)

    ```javascript
    // 유사배열객체 (이터러블 X)
    const arrayLike = {
        0: 1,
        1: 2,
        2: 3,
        length: 3,
    };
    // for문은 접근 가능하나 for...of는 불가
    for (let i = 0; i < arrayLike.length; i++) {
        console.log(arrayLike[i]); // 1 2 3
    }
    for (const x of arrayLike) console.log(x); // TypeError: arrayLike is not iterable

    // 배열으로 변경해서 이터러블로 만들기
    const arr = Array.from(arrayLike);
    console.log(arr); //[ 1, 2, 3 ]
    ```

4. 사용자 정의 이터러블 : 이터레이션 프로토콜을 준수하지 않는 일반 객체도 이터레이션 프로토콜을 준수하도록 구현하면 사용자 정의 이터러블이 된다.

    ```javascript
    // 배열로부터 상속받은 이터레이터를 이용하여 정의
    class Dog {
        constructor(name) {
            this.name = name;
        }
    }
    class ItDog extends Dog {
        [Symbol.iterator]() {
            return this.name.split(", ").values();
        }
    }
    const iDog = new ItDog("Toby, Max, Sam");
    console.log([...iDog]); //  [ 'Toby', 'Max', 'Sam' ]
    for (const d1 of iDog) console.log(d1); // 권장
    for (const d2 of [...iDog]) console.log(d2); // 비권장
    ```

    ```javascript
    //이터레이터를 직접 정의
    class ItDog2 extends Dog {
        [Symbol.iterator]() {
            let idx = 0;
            const names = this.name.split(/,\s?/);
            return {
                next() {
                    return { value: names[idx++], done: idx > names.length };
                },
            };
        }
    }
    // iDog2의 이터레이터의 메소드를 호출하는 for...of문을 이용하여 순회
    const iDog2 = new ItDog2("Toby, Max, Sam");
    for (const d of iDog2) console.log(d);

    // iDog2 이터레이터 직접 사용하여 순회
    const iter = iDog2[Symbol.iterator]();
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
    console.log(iter.next());
    ```

    ```javascript
    // 이터러블을 생성하는 객체
    const obj2 = {
        [Symbol.iterator]() {
            return {
                next() {
                    return { value: cur, done: cur >= max };
                },
            };
        },
    };

    // 이터러블이면서 이터레이터인 객체
    // Symbol.iterator 메서드는 this를 반환하므로 next 메서드를 갖는 이터레이터를 반환한다.
    const obj = {
        [Symbol.iterator]() {
            return this;
        },
        next() {
            return { value: cur, done: boolean };
        },
    };
    ```

    - 무한 이터러블과 지연평가

        - 무한 이터러블 : 끝없이 이어지는 값을 생성할 수 있는 이터러블. next 메서드에서 done 프로퍼티를 명시적으로 정의하지 않아 이터레이터가 무한하게 값을 생성한다.
        - 지연평가 : 데이터가 필요한 시점 이전까지 미리 데이터를 생성하지 않다가 데이터가 필요한 시점이 되면 그때야 비로소 데이터를 생성하는 기법. for...of문의 경우 이터레이터를 순회할 때 내부에서 이터레이터의 next메서드를 호출하는데 바로 이때 데이터가 생성된다. next 메서드가 호출되기 이전까지는 데이터를 생성하지 않는다. 즉, 데이터가 필요할 때까지 데이터의 생성을 지연하다가 데이터가 필요한 순간 데이터를 생성한다.

            ```javascript
            // 무한 이터러블
            const fibonacci = function () {
                let [pre, cur] = [0, 1];
                return {
                    [Symbol.iterator]() {
                        return this;
                    },
                    next() {
                        [pre, cur] = [cur, pre + cur];
                        return { value: cur }; // 무한을 구현해야 하므로 done 프로퍼티를 생략한다.
                    },
                };
            };

            for (const num of fibonacci()) {
                // 이터레이터를 순회할 때 내부에서 next메서드를 호출하는데 이때 데이터를 생성한다.
                if (num > 100) break;
                console.log(num);
            }

            const [f1, f2, f3] = fibonacci();
            console.log(f1, f2, f3);
            ```
