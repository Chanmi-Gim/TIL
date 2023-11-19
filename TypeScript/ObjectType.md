# 타입 종류 (객체타입)

## 객체타입

객제의 형태를 정의하는 방법 타입형태(속성, 타입)을 확인하여 객체를 할당한다 (중첩 객체 포함)
선언시 추가속성이 있는 객체를 대입하면 타입오류가 발생한다. (freshness)

```typescript
let suser: { id: number; name: string };
```

## 정의

    - 필수속성 : 반드시 기입해야 하는 속성
    - 선택속성 : 생략해도 되는 속성 (생략 디폴트값: undefined)

## 할당

-   초과속성 검사: SuppressExcessPropertyError 또는 freshness(ExcessPropertyCheck)로 검사여부 가능

    -   SuppressExcessPropertyError = true : 초과속성에 대한 에러 미발생
    -   SuppressExcessPropertyError = False: Freshness 허용
    -   fresh off 방법 : 이미 선언된 객체를 변수에 대입, 강제로 타입단언

        -   변수 대입 방법 이용시, 배열에는 1개의 변수만 대입되어도 그 타입에 대해서는 오류가 발생하지 않지만 튜플에서는 튜플 정의상 각 다른 타입을 갖는 것을 허용하기에 요소 각각을 검사하여 각각의 타입에 모두 변수를 대입해야한다.(타입 단언도 마찬가지임)
        -   타입단언 : 컴파일러에게 내가 이 타입에 대해 정확히 알고 있다고 알려주는 방법
            ```typescript
            // <타입>객체 or 객체 as 타입
            let xuser: { id: number; name: string };
            xuser = { id: 1, name: "kim", age: 10 } as { id: number; name: string };
            ```

        ```typescript
        type TUser = { id: number; name: string };
        type TUser2 = { id: number; name: string; addr?: string };
        const Person = { id: 2, name: "kim", addr: "seoul" };

        // 객체
        const kim: TUser = { id: 2, name: "kim", addr: "seoul" }; // Error : freshness
        const kim: TUser = Person; // 통과 : 변수대입
        const kim: TUser = { id: 2, name: "kim", addr: "seoul" } as TUser; // 통과 : 타입단언

        // 객체배열
        const arr: TUser[] = [{ id: 1, name: "kim", addr: "seoul" }]; // Error : freshness
        const arr: TUser[] = [{ id: 2, name: "kim", addr: "seoul" }, Person]; // 통과 : 변수대입
        const tuple: [TUser, TUser] = [{ id: 2, name: "kim", addr: "seoul" }, Person]; // Error : 튜플은 각각을 검사하므로 에러

        // 객체튜플
        const tuple: [TUser, TUser] = [{ id: 3, name: "kim", addr: "seoul" } as TUser, Person];
        const Animal = { id: 2, name: "dog", addr: "seoul" };
        const tuple: [TUser, TUser] = [Person, Animal];
        ```

## 객체타입 유니언

-   내로잉 : in 또는 판별값 사용 (참검사시 타입오류 발생 - 존재하지 않는 속성에 접근)
    ```typescript
    // in 사용
    if ("type" in person) {
        poem.pages;
    } else {
        poem.rhymes;
    }
    // 리터럴 판별값 사용
    if (poem.type === "pages") {
        // poem.type : 리터럴 타입을 갖는 공통 속성으로 다른 판별값을 가짐
        poem.pages;
    } else {
        poem.rhymes;
    }
    ```

## 교차타입

기존 타입을 결합하여 새로운 타입으로 생성. 일반적으로 객체 타입을 결합함

-   최대한 간결하게 쓰는 것 권장- 오류메세지 읽기 복잡해짐
-   never : 원시타입 2개이상 교차되면 발생. 코드에서 불가능한 상태를 나타낸다.
    -   never 타입, never 키워드: 값을 가질 수 없고 참조할 수 없다.
