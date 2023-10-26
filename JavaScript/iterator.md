# Iterator

-   컬렉션 내의 아이템들을 순차적으로 접근하는 포인터와 같은 역할
-   메서드 : next()

    -   value : 현재 아이템의 값
    -   done : 모든 아이템을 순회했는지 여부 (true or false)

        ```javascript
        const cities = ["부산", "대구", "대전", "서울"];
        const iter = cities.keys();
        // { value: 0, done: false }
        // { value: 1, done: false }
        // { value: 2, done: false }
        // { value: 3, done: false }
        // { value: undefined, done: true }

        const iter = cities.entries();
        // Object [Array Iterator] {}
        // { value: [ 0, '부산' ], done: false }
        // { value: [ 1, '대구' ], done: false }
        // { value: [ 2, '대전' ], done: false }
        // { value: [ 3, '서울' ], done: false }
        // { value: undefined, done: true }

        const iter = cities.values();
        // { value: '부산', done: false }
        // { value: '대구', done: false }
        // { value: '대전', done: false }
        // { value: '서울', done: false }
        // { value: undefined, done: true }

        const iter = cities[Symbol.iterator]();
        console.log(iter);
        // Object [Array Iterator] {}

        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        // { value: '부산', done: false }
        // { value: '대구', done: false }
        // { value: '대전', done: false }
        // { value: '서울', done: false }
        // { value: undefined, done: true }
        ```

-   for ... of 루프는 이터러블 객체를 순회하기 위해서 사용된다. 이터러블 객체는 Symbol.iterator 메서드를 가지고 있으며 이 메서는 이터레이터 객체를 반환한다.
    ```javascript
    for (const x of iter) console.log(x);
    console.log(...cities);
    // 부산
    // 대구
    // 대전
    // 서울
    // 부산 대구 대전 서울
    ```
-   이터레이션 프로토콜 : 컬렉션의 요소를 순회하는 방법을 정의하는 표준

    1. 이터러블 프로토콜 : 객체가 어떻게 이터레이터를 반환할 것인지를 정의한다.
        - 이터러블 객체는 그 안의 요소들을 순회할 수 있는 객체를 의미한다. 배열, 문자열, Map, Set 등이 이터러블 하다. 이터러블 객체는 [Symbol.iterator]() 메서드를 구현해야 한다. 이 메서드는 호출될 때 해당 객체의 요소들을 순차적으로 접근할 수 있는 이터레이터를 반환해야 합니다.
    2. 이터레이터 프로토콜 : 객체가 어떻게 각 요소를 순차적으로 순회할 것인지를 정의한다.
        - 이터레이터 객체는 next() 메서드를 포함하고 있다. next() 메서드를 호출하면 { value, done } 형식의 객체를 반환한다. "이터레이터 프로토콜을 준수한다" 라는 말은 객체가 next() 메서드를 구현하고 이 메서드가 value와 done 속성을 가진 객체를 반환하는 것이다.
            ```javascript
            const arr = [1, 2, 3];
            const iterableObj = arr[Symbol.iterator]();
            console.log(typeof iterableObj.next); // function
            console.log(iterableObj.next()); // { value: 1, done: false }
            ```
    3. 이터러블은 순회할 수 있는 객체이며 이터레이터는 그 순회방법을 제공하는 객체이다.

    4. 객체가 이터러블한지 확인하기

        ```javascript
        typeof obj[Symbol.iterator] === "function";

        Symbol.iterator in obj;

        "next" in obj;

        arr = [1, 2, 3];
        it = arr[Symbol.iterator()]; // arr.values()와 동일한 이터레이터 객체 반환
        ```

    5. 예제
        ```typescript
        const arr = [1, 2, 3];
        const it = arr[Symbol.iterator]();
        while (true) {
            const x = it.next();
            if (x.done) break; // 모든 요소를 순회했다면 반복 종료
            console.log(x.value); // 1, 2, 3 순서대로 출력
        }
        ```

*   이터러블 클래스 : 그 자체로 순회할 수 있는 객체를 생성하는 클래스 next() 메서드를 포함하고 이터레이터를 반환할 수 있는 Symbol.iterator 메서드를 정의해야 한다.

    -   이터레이터를 가져와서 만듬 (values())

        ```javascript
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
        // console.log([...iDog]); //  [ 'Toby', 'Max', 'Sam' ]
        // for (const d1 of iDog) console.log(d1); // 권장
        // for (const d2 of [...iDog]) console.log(d2); // 비권장
        ```

    -   이터레이터 직접 정의
        ```javascript
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
        // 인스턴스인 iDog2를 순회
        const iDog2 = new ItDog2("Toby, Max, Sam");
        for (const d of iDog2) console.log(d); \
        // iDog2 이터레이터 직접 사용
        const iter = iDog2[Symbol.iterator]();
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        console.log(iter.next());
        ```
