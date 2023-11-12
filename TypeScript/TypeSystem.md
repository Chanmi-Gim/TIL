# Type System

## Type의 종류

-   Type : 타입스크립트는 자스립트를 포함하는 슈퍼셋이므로 자바스크립트가 지원하는 타입을 그대로 사용 가능하다.
    -   null, undefined, boolean, string, number, bigint, symbol

## Type System

-   프로그래밍 언어가 프로그램에서 가질 수 있는 타입을 이해하는 방법에 대한 규칙 집합이다.
-   타입시스템의 작동방식
    -   코드를 읽고 존재하는 모든 타입과 값을 이해한다. (코드 분석)
    -   각 값이 초기 선언에서 가질 수 있는 타입인지 확인한다. (초기 타입 검증)
    -   각 값이 추후 코드에서 어떻게 사용될 수 있는지 모든 방법을 확인한다.
    -   값의 사용법이 타입과 일치하지 않으면 사용자에게 오류 표시한다.

*   오류 종류

    -   구문 오류 : 타입스크립트가 코드로 이해할 수 없는 잘못된 구문을 감지할 때 발생하는 오류. 타입스크립트가 자바스크립트로 변환되는 것을 차단한다. (타입스크립트는 구문 오류와 상관없이 자바스크립트 코드를 출력하기 위해 최선을 다하지만 원하는 출력 결과가 아닐 수 있기 때문에 출력된 자바스크립트를 실행하기 전에 구문 오류를 수정 하는 것이 좋다.)

        ```typescript
        // Error: ',' expected.
        let let wat;
        ```

    -   타입 오류 : 타입스크립트의 타입검사기가 프로그램의 타입에서 오류를 감지했을 때 발생하는 오류. 자바스크립트로 변환은 되나 코드가 원하는대로 실행되지 않다. (자바스크립트를 실행하기 전에 타입 오류를 확인하고 발견된 문제를 해결하는 것이 좋다.)
        ```typescript
        // Errors in code
        // Property 'blub' does not exist on type 'Console'.
        console.blub("hello");
        ```

### 할당 가능성

-   변수가 처음 선언될 때 할당된 타입이 그 변수의 기본 타입이 된다. 이후 해당 변수에 다른 타입의 값을 할당하려고 하면 타입스크립트는 오류를 발생시킨다.
-   할당 가능성은 타입스크립트에서 함수 호출이나 변수에 값을 제공할 수 있는지 여부를 확인 하는 것이다.

    ```typescript
    let lastName = "King";
    lastName = true;
    //Error : Type 'boolean' is not assignable to type 'string'.
    ```

### 타입 애너테이션

-   any type : any는 모든 타입의 상위 타입이다. 즉, any 타입의 변수에는 어떠한 타입의 값도 할당할 수 있다. 변수를 선언하고 초기값을 할당하지 않으면, 해당 변수의 타입은 기본적으로 any로 설정된다. 이러한 변수의 타입은 후에 할당된 값에 따라 변화할 수 있으므로 주의해서 사용해야 한다.
-   진화하는 any : any 타입을 사용해 any 타입으로 진화하는 것을 허용하게 되면 타입스크립트의 타입 검사 목적을 부분적으로 쓸모없게 만든다. 타입스크립트는 값이 어떤 타입인지 알고 있을 때 잘 작동하기 때문에 타입 애너테이션을 이용해서 타입을 지정하는 것을 권장한다. 개발자는 코드의 의도를 명확하게 표현하고, 컴파일러는 제대로 된 타입이 사용되었는지 검사할 수 있다.
-   런타임 코드에 영향 주지 않는다. (유효한 자바스크립트 구문이 아니다.)

    ```typescript
    // 진화하는 any
    let rocker; // type : any
    rocker = "Alice"; // type : string
    rocker.toUpperCase(); // OK!
    rocker = 12.34; // type : number
    rocker.toPrecision(1); // OK!
    rokcker.toLowerCase(); // Error : 'toLowerCase' does not exist on type 'number'.
    ```

-   선언방법
    -   변수명 : 타입명
        ```typescript
        let rocker: string;
        rocker = "Joan Jeff";
        ```
-   불필요한 타입 애너테이션 : 변수의 초기값을 기반으로 해당 변수의 타입을 추론하기 때문에 메모리 사이즈가 변하지 않는 변수에는 타입 애너테이션을 추가하지 않는 것이 좋다.하지만, 코드를 명확하게 문서화하거나 실수로 변수 타입이 변경되지 않도록 타입스크립트를 보호하기 위해 변수에 명시적으로 타입 애니테이션을 포함하는 것이 경우에 따라서는 유용할 수 있다.
    ```typescript
    // string 타입 애너테이션 중복
    let firstName: string = "str";
    ```

### 타입 형태

-   타입스크립트는 변수에 할당된 값/타입의 일치 여부뿐만 아니라 객체의 멤버 속성도 알 수 있다. 만약 변수 속성에 접근하려고 한다면 타입스크립트는 접근하려는 속성이 해당 변수의 타입에 존재하는지 확인한다.

-   ESM(ECMA 스크립트 모듈) : 파일간에 가져오고 내보내는 구문을 표준화하기 위해 만들어진 모듈

    -   모듈 : export 또는 import가 있는 파일. 독립적인 범위를 가지며 export를 사용해야 외부에서 접근이 가능하다.
    -   스크립트 : 모듈이 아닌 모든 파일. 선언된 변수/함수 등은 전역 범위에 존재한다.

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
-   모듈로서 파일을 작동시키고 싶지만 실제로 어떤 것도 내보내거나 가져오고 싶지 않을 때 빈 export {} 구문을 추가함으로써 파일을 강제로 "모듈"로 만들 수 있다. 이렇게 하면 해당 파일은 자체적인 범위를 갖게 되어 다른 파일들과 변수나 함수 이름이 충돌하는 것을 방지할 수 있다. 다시 말해, export {}를 추가하는 것은 "이 파일을 독립적인 모듈로 취급하지만 실제로는 아무것도 내보내지 않을 것이다"라는 의미이다.
