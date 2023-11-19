# 타입종류 (유니언 타입 & 리터럴 타입)

## 유니언 타입

두 개 이상의 타입을 허용하는 방법. 일부 속성들의 조합이 어느 하나의 타입에 할당가능하면 됨. 그 외의 타입이면 타입오류 발생

### 정의방법 : | (순서 무관)

### 내로잉 : 여러 타입 중 특정 타입으로 좁히는 과정

\*\* 타입가드 : 타입을 좁히는데 사용할 수 있는 논리적 검사

1. 값할당을 통한 내로잉 : 변수에 특정값이 할당되면 값의 타입으로 변수타입 좁혀짐
    ````typescript
    let result: number | string;
    result = 10;
    ```ㄴ
    ````
2. 조건 검사를 통한 내로잉 : 조건문을 이용하여 변수 확인

    ```typescript
    let scientist = Math.random() > 0.5 ? "Kim" : undefined;
    if (scientist === "kim") {
    } //string
    ```

    ```typescript
    // 주의사항 : 참 검사를 이용한 내로잉(빈 문자열이 올 수 있으므로 else는 false|string도 될 수 있다. 타입이 고정되는 const를 사용하자!)
    let scientist = Math.random() > 0.5 && "kim";
    if (scientist) {
        scientist.toUppercase(); // string
    } else {
        scientist; //false | string
    }
    ```

3. typeof 검사를 통한 내로잉 : typeof 연산자 이용

    ```typescript
    let scientisto = Math.random() > 0.5? "kim" : 10;
    if(typeof scientist === string) {...}
    ```

    ```typescript
    // 주의사항 : 객체타입에서는 각각의 속성을 내로잉. 조건문에서 who는 spend 속성타입에 대해서만 내로잉하고 있기 때문에 who.dis를 내로잉한 것이 아니다.(객체 타입 내로잉시 주의!)
    type Member = { spend: number[]; dis: 0.1 };
    type Guest = { spend: number };
    const member: Member = { spend: [10, 20], dis: 0.1 };
    const guest: Guest = { spend: 500 };
    const who = Math.random() > 0.5 ? member : guest;
    let total: number;
    if (typeof who.spend !== "number") {
        total = who.spend.reduce((acc, c) => acc + c, 0);
        who.dis; // Error
    } else {
        total = who.spend;
    }
    ```

4. instanceof 검사를 통한 내로잉: instanceof 연산자 이용
    ```typescript
    class Animal {}
    class Dog extends Animal {}
    function f(animal: Animal) {
        if (animal instanceof Dog) {
        } else {
        }
    }
    ```
5. 사용자정의 타입가드

    ```typescript
    let value: number | string;
    if (isNumber(value)) {
    } else {
    }

    let arr: number[] | number;
    if (Array.isArray(arr)) {
    } else {
    }
    ```

6. in 연산자 검사를 통한 내로잉

    ```typescript
    type circle = { kind: "circle"; radius: number };
    type square = { kind: "square"; sideLength: number };
    type Shape = circle | square;
    function getArea(shape: Shape): number {
        return "radius" in shape ? Math.PI * shape.radius ** 2 : shape.sideLength ** 2;
    }
    ```

## 리터럴타입

변수가 특정한 원시값을 가져야함을 정의하는 타입

-   할당가능성 : 더 넓은 개념의 타입이라고 해도 리터럴에 할당 불가
    ```typescript
    let lifespan: number | "ongoing" | "uncertain";
    lifespan = 89;
    lifespan = "ongoing";
    lifespan = "byron"; // Error : 정해진 값만 가져야 함
    let something = ""; // string 타입
    lifespan = something; // Error : something이 string이라는 더 넓은 개념이라고 해도 더 구체적인 타입에 할당할 수 없음
    ```
