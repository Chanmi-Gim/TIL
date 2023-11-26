# Type 제한자

변수나 함수의 선언 시 특정 조건을 부여하여 허용되는 값의 범위나 형식을 제한하는 방법.

## Top 타입 : 시스템에서 가능한 모든 값을 나타내는 타입

-   모든 타입은 top타입에 할당 가능

-   any : 타입 검사 무효화

    ```typescript
    function greet(name: any) {
        console.log(`hi, ${name.toUpperCase()}`);
    }
    ```

-   unknown : 타입 검사 실행
    -   any에 비해 값을 훨씬 더 제한적으로 취급한다.
    -   값의 속성에 직접 접근이 불가하므로 내로잉을 이용하여 접근한다.
        -   typeof 또는 타입어서션
    ```typescript
    function greet(name: unknown) {
        console.log(`hi, ${name.toUpperCase()}`); // Error : unknown에 .toUpperCase() 불가
    }
    // 내로잉
    const anyParam = (value: unknown) => {
        if (typeof value === "string") {
            console.log(`param: ${value.toUpperCase()}`);
        }
    };
    anyParam("world");
    ```

<br></br>

## 타입서술어

-   typeof, instanceof 같은 내로잉을 직접 사용할 때는 괜찮지만 로직을 함수로 감싸면 타입을 좁힐 수 없다. 따라서, 인수가 특정타입인지 여부를 나타내기 위해 boolean값을 반환하는 함수를 위해 만든 구문
    ```typescript
    function typePre(input: WideType): input is NarrowType;
    ```
    ```typescript
    function isNumberOrString(value: unknown): value is string | number {
        return ["number", "string"].includes(typeof value);
    }
    function logValueIfExist(value: number | string | null | undefined) {
        // return이 true이면, value is number | string
        if (isNumberOrString(value)) {
            value.toString(); // type : number | string
        } else {
            console.log("value does not exist : ", value); // type : null | undefined
        }
    }
    // 만약, 타입 서술어가 없다면 value의 type은 number | string | null | undefined
    ```
-   타입 내로잉

    ```typescript
    const isLongString = (input: string | undefined): input is string => {
        return !!(input && input.length >= 7);
    };

    function workwithText(text: string | undefined) {
        if (isLongString(text)) {
            console.log(text.length); // Type : String
        } else {
            console.log(text?.length); // Type : never , Error : never 타입에 length 속성 없음
        }
    }
    // 속성/값 타입을 확인하는 것 이상으로 수행하므로 가능한 피하는 것이 좋음
    string : !!(1 && 1) => true
    undefined: !!(0 && 0) ???? => never
    ```

-   인터페이스 내로잉 : Comedian인지 StandupComedia인지 내로잉
    ```typescript
    interface Comedian {
        funny: boolean;
    }
    interface StandupComedian extends Comedian {
        routine: string;
    }
    function isStandupComedian(value: Comedian): value is StandupComedian {
        return "routine" in value;
    }
    ```

<br></br>

## 타입연산자 : 기존 타입의 속성 일부를 변환해서 두 타입을 결합하는 새로운 타입을 생성

-   keyof : 객체의 모든 키를 문자열 리터럴 유니온으로 가져오는 연산자(허용되지만 사용하면 안되는 값에 접근하는 것을 막음)

    ```typescript
    interface Ratings {
        audience: number;
        critics: number;
    }
    // key : string -> string | number... 이런 식으로 경우에 따라 모든 타입을 기입하면,
    // 번거롭고, 허용은 되지만 사용하면 안되는 값에 접근하기 때문에 keyof Rating을 사용
    function getRating(ratings: Ratings, key: string): number {
        return ratings[key];
    }
    const ratings: Ratings = { audience: 66, critic: 84 };
    getRating(ratings, "audience"); // Ok
    getRating(ratings, "not valid"); // 허용되지만 사용하면 안 됨
    ```

-   typeof : 식별자 또는 표현식의 타입을 가져오는 연산자. 자바스크립트의 typeof와 달리 런타임에는 아무런 영향 없음

    ```typescript
    let x: number = 10;
    typeof x; //type : number
    const ratings = {
        name: "kim",
        age: 29,
    };
    typeof ratings; // {name : string , age:number}
    ```

-   keyof typeof

    ```typescript
    const ratings = {
        name: "kim",
        age: 29,
    };

    function logRating(key: keyof typeof ratings) {
        console.log(ratings[key]);
    }
    logRating("name");
    logRating("age");
    // typeof ratings :{ name: string, age: number};
    // keyof typeof ratings: "age" | "name"
    ```

<br></br>

## 타입어서션 : TypeScript에서 코드의 타입을 명시적으로 지정하는 기능.

-   코드가 강력하게 타입화될 때 가장 효과적으로 작동하며 모든 값이 정확하게 알려진 타입을 가져야하는 경우에 유용하다.
-   JSON.parse는 의도적으로 any를 반환하므로 타입 시스템에 안전하게 전달하기 어렵기 때문에 타입어서션을 활용하여 값을 특정 타입으로 캐스팅

    ```typescript
    const rawData = '["grace", "frankie"]';
    const parsed: any = JSON.parse(rawData);
    const stringArr: string[] = parsed as string[];
    const tupledArr: [string, string] = parsed as [string, string];
    const specificArr: ["grace", "frankie"] = parsed as ["grace", "frankie"];
    ```

-   오류타입 어서션 : 오류처리시 catch블록 발생한 오류 타입구분

    ```typescript
    try {
    } catch (error) {
        console.log("on", (error as Error).message); //타입 어서션 사용
    }
    try {
    } catch (error) {
        console.log("on", error instanceof Error ? error.message : error); //권장
    }
    ```

-   non-null 어서션 : null 또는 undefined를 포함할 수 있는 변수에서 이를 제거하는 경우 사용(!도 가능)
    ```typescript
    let maybe = Math.random() > 0.5 ? undefined : new Date();
    maybe!; // 타입이 Date (non-null 어서션)
    maybe as Date; // 타입이 Date (타입어서션))
    ```
    > Non-null 어서션(!)과 선택적 속성(!)의 차이점
    -   Non-null 어서션(!) : 해당 식별자가 null 또는 undefined가 아니라고 확신하여 컴파일러에게 전달(즉, 해당값은 항상 존재한다고 단언)
    -   선택적 속성(!) : 해당속성이 undefined가 될 수 있다고 명시적으로 선언

<br></br>

## Const 어서션

배열, 원시타입, 값, 별칭 등을 상수 취급하는데 사용. (읽기전용 튜플, 리터럴 타입, 읽기 전용 객체로 간주)

```
배열 : 읽기 전용 튜플로 취급
원시타입 : 리터럴 타입으로 취급
객체속성 : 읽기 전용으로 간주 (속성변경 불가, 속성값이 리터럴타입으로 변환)
```

```typescript
// 1. 원시타입 -> 리터럴 타입
const getName = () => "maria"; // 타입 : () => string
const getName = () => "maria" as const; //타입 : () => 'maria"
```

```typescript
// 2. 읽기 전용 객체
function describePreference(preference: "maybe" | "no" | "yes") {
    switch (preference) {
        case "maybe":
            return "I suppose...";
        case "no":
            return "No thanks.";
        case "yes":
            return "Yes please!";
    }
}

const preferencesMutable = { movie: "maybe", standup: "yes" };
describePreference(preferencesMutable.movie); // Error : preferencesMutable.movie은 문자열 타입인데 리터럴로 들어가야 함.
preferencesMutable.movie = "no"; // 0k
const preferencesReadonly = { movie: "maybe", standup: "yes" } as const;
describePreference(preferencesReadonly.movie); // Ok
preferencesReadonly.movie = "no"; // Error : 읽기 전용이므로 수정 불가
```
