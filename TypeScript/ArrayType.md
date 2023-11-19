# 타입종류 (배열타입)

## 배열타입

배열의 형태를 정의하는 방법. 배열의 데이터 타입을 확인하여 객체를 할당한다.

```typescript
let arr: number[];
arr = [4, 8, 16, 20];

const arr = ["A", "B", 3];
// 초기 배열의 데이터타입을 확인하고 하나의 타입으로 유지
// type : (string | number)[]
arr.push(true); // Error
```

### 유니언타입 배열/ 다차원 배열

-   유니언타입 배열 : 배열의 각 요소가 여러 타입 중 하나임을 나타낸다.
-   다차원 배열 : 2차원 배열 또는 배열의 배열([][], [][][]...)

```typescript
let arr: (string | number)[];
let arr: number[][] = [
    [1, 2, 3],
    [2, 4, 6],
    [3, 6, 9],
];
```

### 배열멤버

배열의 멤버를 찾아서 해당 배열의 타입 요소를 되돌려주는 전형적인 인덱스 기반 접근 방식

```typescript
const a = ["hi", "hello"];
const aa = a[0]; // aa 타입 : string
const b = ["hi", new Date(1993, 12, 31)];
const bb = b[0]; // bb 타입 : string | Date
```

-   주의사항 : 배열의 길이보다 큰 인덱스로 배열요소에 접근해도 타입 오류 미발생
    (noUncheckedIndexedAccess 플래그 존재하나 매우 엄격하므로 비권장)
    ```typescript
    const a = ["hi", "hello", new Date(1993, 12, 31)];
    console.log(a[100]); // Error 미발생
    ```

### 스프레드 연산자

-   배열결합 : 스프레드 연산자를 사용하여 두 배열을 결합하면 새로운 배열이 생성되며, 이 배열의 타입은 입력 배열의 유니언 타입이다. 만약 입력된 배열이 동일한 타입이라면 출력 배열도 동일한 타입이고, 서로 다른 타입의 두 배열을 함께 스프레드해 새 배열을 생성하면 새 배열은 두 타입을 가진 배열이다.
    ```typescript
    const a = ["A", "B", "C"];
    const b = [100, 90, 95];
    const join = [...a, ...b]; // type : (string | number)[]
    ```

## 튜플타입

튜플의 형태를 정의하는 방법. 구조분해 할당을 자주 이용한다.

-   타입스크립트는 생성된 배열을 튜플이 아닌 가변길이의 배열로 취급한다. 따라서, 튜플임을 나타내려면 1) 명시적 튜플타입, 2) const 어서션 사용하면 된다.

    -   const 어서션(as const) : 튜플 변환뿐만 아니라 readonly 상태로 만든다.

        ```typescript
        const readonlyTuple = [100, "Tom"] as const;
        ```

    ```typescript
    let user: [number, string] = [530, "hi"];
    let [year, warrior] = Math.random() > 0.5 ? [340, "A"] : [400, "B"]; // 구조분해 할당

    // 배열과 튜플 비교
    const arr = [1, "hi"]; // 배열 (type : (number|string)[])
    const tuple: [number, string] = [1, "hi"]; // 튜플 (type : [number, string])
    ```
