# 타입 종류 (함수타입)

## 함수타입

함수의 형태를 정의하는 방법. 매개변수와 리턴값의 타입을 확인하여 할당한다.

## 매개변수

-   필수 매개변수 : 함수 호출시 반드시 기입해야 함
-   선택 매개변수 : 함수 호출시 생략해도 됨(디폴트로 undefined 타입 추가됨)

    -   기본값 제공 : 애너테이션 없으면 기본값의 타입 추론

    ```typescript
    // 선택 매개변수
    function f1(song: string, name?: string) {} // type { song : string, name ?: string }
    f1("소향");
    f1("소향", "I have nothing");
    f1("소향", undefined);
    ```

    ```typescript
    // 선택 매개변수 (기본값 제공)
    function f2(song: string, name = "kim") {} // type : { song :string , name ?: string }
    f2("소향");
    f2("소향", "I have nothing");
    f2("소향", undefined);
    ```

-   나머지 매개변수 : 여러개의 매개변수 사용시, 해당 매개변수부터 마지막 매개변수까지 단일배열로 저장되어 전달됨. 함수 선언시 마지막 매개변수여야 한다. 튜플로 개수 지정가능.

    ```typescript
    function f3(singer: string, ...songs: string[]) {} // 여러 개의 인자 사용 가능
    function f3(singer: string, ...songs: [string, string]) {} // 3개의 인자
    ```

## 반환타입 (명시적 반환타입)

```typescript
function a(song: string): string {}
```

-   void : 함수 반환타입 선언을 위해 타입스크립트에서 사용하는 키워드. 아무것도 반환하지 않음. void 사용시 함수에서 반환되는 모든 값 무시. return문이 없거나 값을 반환하지 않는 return문에 쓰인다.
    ```typescript
    // js 함수값은 실제값이 반환하지 않으면 undefined 반환하지만 void는 Undefined과 다름
    // void : 함수의 반환 타입을 무시, undefined : 반환되는 리터럴값
    function f(song: string): void {
        console.log(""); // OK
        return; // OK
        return undefined; // OK
        return true; // Error
    }
    ```
-   never :절대 반환하지 않음. 의도적으로 오류를 발생시키거나 무한루프를 실행하는 함수에 사용

    ```typescript
    function fail(message: string): never {
        throw new Error(`error: ${message}`);
    }

    function work(param: unknown) {
        if (typeof param !== "string") {
            fail(`param should be a string, not ${typeof param}`);
        }
        param.toUpperCase();
    }
    ```

## 함수타입

-   콜백 매개변수 설명에 자주 이용함.
-   매개변수/ 반환타입 지정
-   호출 시그니처 : (type 파라미터) => return 타입

    ```typescript
    let a: () => string;
    a = () => "hello";
    // === let a : (() => string) = () => "hello"

    let a: (() => string) | undefined;
    a = () => "hello!";
    a = undefined;

    type a = () => string;
    function f(cb: a) {}
    ```
