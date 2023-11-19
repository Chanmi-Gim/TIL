# Type System

### 타입 애너테이션(타입주석)

변수 선언문을 확장시켜 타입을 명시하는 것

```typescript
let 변수명 : 타입 [=초기값] // let이므로 선언한 변수의 값은 선언한 타입의 값으로 변경 가능
const 변수명 : 타입 = 초기값
```

### 타입 종류

-   타입종류 : 기본타입(8가지) , any, void, 리터럴 유니언, 교차, never, 튜플, 배열
    -   튜플 : 각 요소가 다른 타입을 가진다. 길이는 선언시에 고정된다. [x, x]
    -   배열 : 각 요소가 동일한 타입을 가진다. 길이는 동적으로 변한다. x[]
    -   any : 모든 타입의 상위 타입이다. 즉, any 타입의 변수에는 어떠한 타입의 값도 할당할 수 있다. 변수를 선언하고 초기값을 할당하지 않으면, 해당 변수의 타입은 기본적으로 any로 설정된다. 이러한 변수의 타입은 후에 할당된 값에 따라 변화할 수 있으므로 주의해서 사용해야 한다.
-   타입별칭 : 자주 사용하는 타입에 별명을 붙이는 것 (타입시스템에만 존재하므로 런타임에서 코드 참조 불가)
    ```typescript
    type personInfo = { id: number; name: string; age: numbers };
    const some = ({ id, name, age }: personInfo) => {};
    ```
-   StrictNullCheck (엄격한 null검사): true시 null 또는 undefined임을 명시해야 null 또는 undefined임을 취급한다. (false: 무조건 null, undefined 취급한다.)

### 타입시스템

프로그래밍 언어가 프로그램에서 가질 수 있는 입을 이해하는 방법에 대한 규칙집합

-   타입시스템이 코드를 이해하는 방법
    1. 코드를 읽고 존재하는 모든 타입과 값을 이해
    2. 각 값이 초기 선언에서 가질 수 있는 타입 확인
    3. 각 값이 추후 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인
    4. 값의 사용법이 타입과 일치하지 않으면 사용자에게 오류 표시
    ```typescript
    let fistName = "Tom";
    firstName.length(); // Error: Type 'Number' has np call...
    // 1. 코드를 읽고 fistName 변수 이해
    // 2. "Tom"이므로 타입을 string이라고 결론지음
    // 3. firstName의 length를 함수로 호출하는 코드 확인
    // 4. sting의 length는 함수가 아닌 속성임을 표시
    ```
-   타입을 구조화하여 정의

    ```typescript
    let xUser = { id: number, password: string };
    ```

-   할당 가능성 : 값을 제공할수 있는지 여부를 확인하는 것
    ```typescript
    let fistName = "kim";
    firstName = "Tom";
    firstName = true; //error
    ```
-   타입 형태 : 객체의 속성목록별 타입까지 체크한다.

-   오류종류

    -   구문오류 : 타입스크립트가 코드로 이해할 수 있는 잘못된 구문을 감지할때 발생.타입스크립트가 자바스크립트로 변환되는 것을 차단.
    -   타입오류 : 타입체커가 프로그램의 타입에서 오류를 감지할때 발생, 자바스크립트로 변환은 됨

### ECMA스크립트 모듈

-   ESM(ECMA 스크립트 모듈) : 파일간에 가져오고 내보내는 구문을 표준화하기 위해 만들어진 모듈

    -   스크립트파일 : 모듈이 아닌 모든 파일. 선언된 변수/함수 등은 전역 범위에 존재한다.
    -   모듈 파일: export 또는 import가 있는 파일. 독립적인 범위를 가지며 export를 사용해야 외부에서 접근가능 -ㄴ 모듈로서 파일을 작동시키고 싶지만 실제로 어떤 것도 내보내거나 가져오고 싶지 않을 때 빈 export {} 구문을 추가함으로써 파일을 강제로 "모듈"로 만들 수 있다. 이렇게 하면 해당 파일은 자체적인 범위를 갖게 되어 다른 파일들과 변수나 함수 이름이 충돌하는 것을 방지할 수 있다. 즉 export {}는 "이 파일을 독립적인 모듈로 취급하지만 실제로는 아무것도 내보내지 않을 것이다"라는 의미

-   예시 코드1

    -   모듈인 a.ts와 b.ts가 동일한 변수이름인 shared을 내보내지만 문제 되지 않는다.
    -   모듈인 c.ts는 가져온 shared 변수와 c.ts에서 직접 정의한 shared의 변수 이름이 같기 때문에 충돌해서 타입오류가 발생한다.

        ```typescript
        // a.ts
        export const shared = "Cher";
        ```

        ```typescript
        // b.ts
        export const shared = "Cher";
        ```

        ```typescript
        // c.ts
        import { shared } from "./a";
        export const shared = "Cher";
        ```

-   예시 코드2
    -   스크립트인 a.ts, b.ts은 동일한 파일에 동일한 이름의 변수가 선언된 것처럼 충돌하게 된다.
        ```typescript
        // a.ts
        // cannot redeclare block-scoped variable 'shared'
        const shared = "Cher";
        ```
        ```typescript
        // cannot redeclare block-scoped variable 'shared'
        // b.ts
        const shared = "Cher";
        ```
