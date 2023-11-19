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
    -   never 타입과 never 키워드는 값을 가질 수 없고 참조할 수 없는 타입

<!-- ### 객체 타입 선언

객체 타입은 객체 리터럴과 유사하게 보이지만 필드 값 대신 타입을 사용해 설명합니다.

```typescript
let poetLater: {
    born: number;
    name: string;
};

poetLater = {
    born: 1935,
    name: "Mary",
};
```

### 별칭 객체 타입 (더 일반적임)

```typescript
type Poet = {
    born: number;
    name: string;
};

let poetLater: Poet = {
    born: 1935,
    name: "Mary",
};
```

### 구조적 타이핑

-   타입시스템은 구조적으로 타입화되어 있다.매개변수나 변수가 특정 객체 타입으로 선언되면 타입스크립트에 어떤 객체를 사용하든 해당 속성이 있어야 한다.

    ```typescript
    type WifhFirstName = {
        firstName: string;
    };

    type WithLastName = {
        lastName: string;
    };

    const hasBoth = {
        firstName: "Cheon",
        lastName: "Jiin",
    };

    // OK: 'hasBoth'는 'string' 타입의 'firstName'을 포함함
    let withFirstName: WithFirstName = hasBoth;

    // OK: 'hasBoth'는 'string' 타입의 'lastName'을 포함함
    let withLastName: WithLastName = hasBoth;
    ```

#### 사용검사

-   객체 타입으로 애너테이션된 위치에 값을 제공할 때, 타입스크립트는 해당 객체 타입에 값을 할당할 수 있는지 확인한다. 할당하는 값에는 객체 타입의 필수 속성이 있어야 한다. 없다면 타입 오류를 발생시킨다.
-   객체 타입은 필수 속성 이름과 해당 속성이 예상되는 타입을 모두 지정하는데 객체의 속성이 일치하지 않으면 타입스크립트는 타입 오류를 발생한다.

    ```typescript
    type Name = {
        fist: string;
        last: string;
    };

    const hasBoth: Name = {
        first: "saro",
        last: "nai",
    };
    // OK

    const hasOne: Name = {
        first: "saro",
    };
    // Error: Property 'last' is missing in type '{first: string;}'
    ```

#### 초과 속성 검사

-   초깃값에 객체 타입에서 정의된 것보다 많은 필드가 있다면 타입오류가 발생한다. 따라서, 변수를 객체타입으로 선언하는 것은 타입 검사기가 해당 타입에 예상되는 필드만 있는지 확인하는 방법이다. 초과 속상이 있다면 타입오류를 발생시킨다.
-   단, 초과속성 검사는 객체 타입으로 선언된 위치에서 생성되는 객체 리터럴에 대해서만 일어난다.
-   초과 속성 검사를 우회하기 위해서는 기존 객체 리터럴을 제공하면 된다.

    ```typescript
    const obj = {
        first: "saro",
        last: "Mary",
        age: "walking",
    };
    const eatra: Name = obj; //ok
    ```

#### 중첩된 객체 타입

-   자바스크립트의 객체는 중첩할 수 있으므로 마찬가지로 타입스크립트의 객체 타입도 타입 시스템에서 중첩된 객체 타입을 나타낼 수 있어야 한다. 중첩된 타입을 자체 타입 별칭으로 추출하면 타입오류 메시지에 더 많은 정보를 담을 수 있다는 이점이 있다.

    ```typescript
    type Poem = {
        author: {
            firstName: string;
            lastName: string;
        };
    };

    const poemMatch: Poem = {
        author: {
            firstName: "Cheon",
            lastName: "Jiin",
        };
    };

    const poemMismatch : Poem = {
        author : {
            name : "kim",
            // Error : Type `{ name : string; }` is not assignable to type {'firstName: string; lastName : string; }....
        }
    }
    ```

    ```typescript
    type Author = {
        firstName: string;
        lastName: string;
    };

    type Poem = {
        author: Author;
        name: string;
    };
    const poemMismatch: Poem = {
        author: {
            name: "kim",
            // Error : Type `{ name : string; }` is not assignable to type 'Author'....
        },
    };
    ```

#### 선택적 속성

-   타입의 속성 애너테이션에서 : 앞에 ?를 추가하면 선택적 속성임을 나타낼 수 있다. 필수로 선언된 속성은 값이 | undefined 일지라도 무조건 있어야 하지만 선택적 속성은 선택적으로 허용하기에 생략 가능한다. ?를 사용해 선택적으로 선언된 속성은 존재하지 않아도 된다.

### 객체 타입 유니언

-   타입스크립트 코드에서는 속성이 조금 다른, 하나 이상의 서로 다른 객체 타입이 될 수 있는 타입을 설명할 수 있어야 한다.

#### 유추된 객체타입 유니언

-   변수에 여러 객체 타입 중 하나가 될 수 있는 초깃값이 주어지면 타입스크립트는 해당 타입을 객체 타입 유니언으로 유추한다. 유니언 타입은 가능한 각 객체 타입을 구성하고 있는 요소를 모두 가질 수 있다. 객체 타입에 정의된 각각의 가능한 속성은 비록 초깃값이 없는 선택적 타입이지만 각 객체 타입의 구성요소로 주어진다.

    ```typescript
    const poem = Math.random() > 0.5 ? { name: "The Double", pages: 7 } : { name: "Kind", rhymes: true };

    // Poem 의 type은 { name: stirng; pages: number; rhymes?: undefined } | { name: stirng; pages?: undefined; rhymes: boolean; }

    poem.name; // stirng
    poem.pages; // number | undefined
    poem.rhymes; // booleans | undefined
    ```

#### 명시된 객체타입 유니언

-   객체 타입의 조합을 명시하면 객체 타입을 더 명확히 정의할 수 있다. 코드를 조금 더 작성해야 하지만 객체 타입을 더 많이 제어할 수 있다는 이점이 있다.

    ```typescript
    type PoemWithPages = {
        name: string;
        pages: number;
    };

    type PoemWithRhymes = {
        name: string;
        rhymes: boolean;
    };

    type Poem = PoemWithPages | PoemWithRhymes;

    const poem: Poem = Math.random() > 0.5 ? { name: "The Double", pages: 7 } : { name: "Kind", rhymes: true };

    poem.name; // OK
    poem.pages; // Error
    ```

### 객체 타입 내로잉

-   코드에서 객체의 형태를 확인하고 타입 내로잉이 객체에 적용된다.

    ```typescript
    // 객체에서는 참 여부 불가 (존재하지 않는 객체의 속성에 접근하려고 시도하면 타입오류로 간주)
    // in을 통해 참 여부 확인
    if ("pages" in poem) {
        poem.pages; // OK: poem은 PoemWithPages로 좁혀짐
    } else {
        poem.rhymes; // OK: poem은 PoemWithRhymes로 좁혀짐
    })

    if (poem.pages) { ... }
    ```

### 판별된 유니언

-   객체의 속성이 객체의 형태를 나타내도록 하는 것이다. 타입스크립트는 코드에서 판별 속성을 사용해 타입 내로잉을 수행합니다.
-   판별값 : 객체의 타입을 가리키는 속성

    ```typescript
    type PoemWithPages = {
        name: string;
        pages: number;
        type: "pages";
    };

    type PoemWithRhymes = {
        name: string;
        rhymes: boolean;
        type: "rhymes";
    };

    type Poem = PoemWithPages | PoemWithRhymes;

    const poem: Poem = Math.random() > 0.5 ? { name: "The Double", pages: 7 } : { name: "Kind", rhymes: true };

    if (poem.type === "pages") {
        console.log(`It's got pages: ${poem.pages}`); // OK
    } else {
        console.log(`It rhymes: ${poem.rhymes}`); // OK
    }
    ```

### 교차 타입(&)

-   여러 기존 객체 타입을 별칭 객체 타입으로 결합해 생성된 새로운 타입
-   가능한 한 코드를 간결하게 유지하는 것을 권장

```typescript
type Artwork = {
    genre: string;
    name: string;
};

type Writing = {
    pages: number;
    name: string;
};

type WrittenArt = Artwork & Writing;

// WrittenArt은 { genre: string; name: string; pages: number; }
```

#### 교차 타입의 위험성

-   긴 할당 가능성 오류 : 복잡한 교차 타입을 만들게 되면 할당 가능성 오류 메시지는 읽기 어려워 진다.

-   never (불가능한 타입): 원시 타입의 값은 동시에 여러 타입이 될 수 없기 때문에 교차 타입의 구성요소로 결합 불가하다. 결합하면 never 키워드로 표시되는 never 타입이 된다. never 타입을 거의 사용하지 않지만 코드에서 불가능한 상태를 나타내기 위해 가끔 보인다.
    -   never : never 타입과 never 키워드는 값을 가질 수 없고 참조할 수 없는 타입 -->
