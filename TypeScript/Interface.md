# 인터페이스

코드를 구조화하고 타입을 정의하는데 사용되는 강력한 도구. 타입 형태를 확인하여 객체를 할당한다.
(중첩 인터페이스 포함)

```
인터페이스와 타입별칭의 차이점 : 확장여부, 클래스의 선언구조 타입 확인, 속도(인터페이스 빠름)
```

<br></br>

-   속성 정의 : 동일한 이름으로 다른 타입인 속성 선언 불가
    -   필수속성 : 반드시 기입해야하는 속성
    -   선택속성 : 생략해도 되는 속성 (생략시 디폴트값 : undefined)
    -   읽기전용속성(readonly) : 객체의 속성 읽기 전용으로 변환 (수정 불가)

<br></br>

-   함수 정의 : 동일한 이름으로 다른 시그니처를 가진 메서드 정의 가능 (함수 오버로드 발생)

    -   메서드 구문 정의
        ```typescript
        property: () => string;
        ```
    -   속성 구문 정의
        ```typescript
        method() : string
        ```
    -   호출 시그니처
        ```typescript
        (input : string) : number
        ```
        ```typescript
        (input: string) => number;
        ```

    <br></br>

-   인덱스 시그니처 : 인터페이스 객체가 임의의 키를 받고 해당 키 아래의 특정 타입을 반환

    -   정의 : [key : type] : type

        ```typescript
        // 정의
        interface WordCounts {
            [i: string]: number;
        }
        const counts: WordCounts = {};
        counts.apple = 0;
        counts.banana = 1;
        counts.cherry = true; //Error

        // 값 할당
        interface DateByName {
            [i: string]: Date;
        }
        const a: DateByName = {
            frank: new Date("1 January 1818"),
        };
        a.frank; // 타입은 Date
        a.hello; // 타입은 Date, 런타임은 undefined
        console.log(a.frank, a.hello); // 1817-12-31T15:32:08.000Z undefined

        // 타입 시스템에서는 오류가 나지 않지만 실제런타임에서 오류 발생.
        // 키/쌍을 저장하려는데 키를 미리 알 수 없다면 Map을 사용하는 것이 안전함.
        // 인덱스 시그니처를 사용하면 프로퍼티의 존재유무를 알 수 없다.

        interface Counts {
            [key: string]: number;
        }
        const counts: Counts = {};
        function setCount(counts: Counts, fruit: string) {
            counts[fruit] += 10;
        }
        setCount(counts, "peach");
        console.log(counts);
        ```

        ```typescript
        // 속성과 인덱스 시그니처 혼합
        interface history {
            oro: number;
            [i: string]: number | string; // 명명된 속성의 타입 할당
        }
        const novels: history = { out: 1991, oro: 1688 };
        const missing: history = { out: 1991 };
        const missing: history = { out: 1991, in: "in", oro: 1688 };
        ```

        -   명명된 속성의 타입은 포괄적인 용도의 인덱스 시그니처(number | boolean )로 할당할 수 있어야한다.

    -   숫자 인덱스 시그니처 : TypeScript에서는 모든 객체의 프로퍼티키는 내부적으로 문자열로 변환되어 사용된다. 따라서, string 타입의 인덱스 시그니처키를 만들어서 숫자 인덱스 시그니처가 반환하는 타입을 포함하도록 해야한다.
        ```typescript
        interface More {
            [i: number]: string;
            [i: string]: string | undefined;
        }
        // interface More {
        //     [i: number]: string | undefined;
        //     [i: string]: string  // Error : 최소한 string | undefined를 가져야함
        // }
        const mixed: More = {
            0: "",
            key1: "",
            key2: undefined,
        };
        ```

    <br></br>

*   인터페이스 확장 : extends 키워드 이용 (,를 이용해 다중으로 확장 가능)

    ```typescript
    interface writing {
        title: string;
    }
    interface nov extends writing {
        pages: number;
    }
    let mynove: nov = {
        // 없거나, 추가속성 있으면 안됨(타입단언, 변수선언하면 OK)
        title: "hi",
        pages: 200,
    };
    ```

    ```typescript
    interface A {
        name: string | null | number;
    }
    // 상속받은 타입중에서만 재정의 가능하다.
    // 즉, B는 string | null | number에 한해 구체적으로 name 정의 가능
    interface B extends A {
        name: string;
    }
    ```

<br></br>

-   인터페이스 병합 : 동일한 이름으로 동일한 스코프에 선언된 경우

    ```typescript
    interface Merged {
        name: string;
    }
    interface Merged {
        age: number;
    }
    // 즉,
    // interface Merged{
    //     name : string
    //     age :number
    // }
    let merged: Merged = { name: "1", age: 1 };
    ```

<br></br>

-   값할당

    ```typescript
    class Teacher {
        sayhello() {
            return ["hi", "hello"];
        }
    }
    let teacher: Teacher = new Teacher();

    function withT(teacher: Teacher) {
        console.log(teacher.sayhello());
    }
    withT(new Teacher());
    withT({ sayhello: () => ["hah"] }); // 클래스의 동일한 멤버를 모두 포함하는 모든 객체 타입을 클래스에 할당 가능
    withT({ sayhello: () => 123 }); // Error
    ```

<br></br>

-   인터페이스 이용한 클래스 구현 : Implements 키워드 이용
    -   다중 인터페이스 이용가능. (이 경우 모든 형태를 유지해야함. 동일한 속성명/메서드명 사용 비권장하며, 다른 클래스로 구현하거나 공통 타입을 추가하기)
    ```typescript
    interface Learner {
        name: string | number;
        study(hours: number): void;
    }
    // name, study 모두 구현되어야 함
    class Student implements Learner {
        name: string; // string | number 내에서 구현가능 (any도 가능)
        constructor(name: string) {
            this.name = name;
        }
        study(hours: number) {
            for (let i = 0; i < hours; i += 1) {
                console.log("...study");
            }
        }
    }
    ```
