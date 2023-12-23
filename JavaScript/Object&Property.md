# Objec & Property

## 객체의 프로퍼티 key 표현 규칙

> -   string화 될 수 있는 것은 모두 `키`로 올 수 있다.
>     `${}`: 템플릿 연산자도 string 될수 있으므로 가능하다)
>
> *   `키가 중복될 경우는 맨 마지막에 정의한 것으로 호출`된다.
> *   \`\`와 Symbol()을 사용하려면 `[](대괄호)`와 함께 써야한다.

 <br>

객체인 `user`의 `키`를 살펴보자.
참고로 `getInfo:`는 객체의 `함수 프로퍼티`, `getInfo()`는 `객체의 메서드`이다.

```javascript
const user = {
    '': 1, // 빈문자열
    ' ': 1, // 'id': 1, '0y': 2 모두 OK!
    123: 1, // user[123], user['123'] OK, but user.123 is SyntaxError!!
    12345n: 2, // user[12345], user[12345n], user['12345'] OK, but user['12345n'] is undefined!
    true: 1, // OK  user[true]  user.true
    id: 2,
    [`name`]: 'Hong', // But, `name`: 'Hong'은 SyntaxError: Unexpected template string!
    [Symbol()]: 'Hong', // OK But, Symbol(): 'Hong'은 SyntaxError: Unexpected token ':'
    [`${new Date()}`]: 365, // OK! 'Sun Jul …': 365
    'my-friends': ['Han', 'Kim'],
    getInfo: () => `${this.id}-${this.name}`, // 함수 프로퍼티, Ok! But, this is not user!
    getInfo() {
        return `${this.id}-${this.name}`;
    }, // 함수 메서드, getInfo의 최종 <f.o>
};

// 출력결과
// {
//     '123': 1,
//     '12345': 2,
//     '': 1,
//     ' ': 1,
//     true: 1,
//     id: 2,
//     name: 'Hong',
//     'Tue Oct 03 2023 17:11:27 GMT+0900 (Korean Standard Time)': 365,
//     'my-friends': [ 'Han', 'Kim' ],
//     getInfo: [Function: getInfo],
//     [Symbol()]: 'Hong'
//   }
```

> -   `''(빈문자열)`, ' ' : 문자열
> -   `123`, `12345n` : number, bigInt → 문자열화
>     -   호출시, user[12345], user[12345n], user['12345']은 되지만 user['12345n']은 에러 (bigInt를 string으로 바꾸면 n이 빠지기 때문이다.)
> -   `true` :boolean → 문자열화
> -   `id` : 문자열
> -   `` [`name`] `` : ``을 사용하려면 대괄호와 함께 써야함
> -   `[Symbol()]` : Symbol을 사용하려면 대괄호와 함께 써야함
> -   `getInfo`와 `getInfo()` : 키가 중복되므로 값은 맨 마지막에 저장된 메서드로 저장됨
> -   [`${new Date()}`] : 템플릿 연산자도 string화 되므로 사용가능

 <br>

-   `template`에 변수를 사용하는 경우, `snapshot이기 때문에 변수값이 변하더라도 고정된다.`

```javascript
user[`${user.id}'s name`] = `Mr. ${user.name}`;
console.log(user); // "2's name": 'Mr. Hong' 가 추가되어 나옴

// 그런데 템플릿의 값인 id값 변경하면?
user.id = 3;
console.log(user.id, user);
// id값은 변경되지만, "2's name"에는 영향없음
//   3 {
//     '123': 1,
//     '12345': 2,
//     '': 1,
//     ' ': 1,
//     true: 1,
//     id: 3,
//     name: 'Hong',
//     'Tue Oct 03 2023 19:10:47 GMT+0900 (Korean Standard Time)': 365,
//     'my-friends': [ 'Han', 'Kim' ],
//     getInfo: [Function: getInfo],
//     "2's name": 'Mr. Hong',
//     [Symbol()]: 'Hong'
//   }
```

※ 참고
`table`이나, `JSON.stringify()`를 이용하면 객체의 로그를 깔끔하게 확인할 수 있다.

```javascript
console.table(user);
console.log(JSON.stringify(user, null, 4)); // JSON.stringify(value, replacer, space)
```

![](https://velog.velcdn.com/images/beatres/post/c75fd474-919d-4a37-bf09-46cf2bd65e1c/image.png)

<br>

## 프로퍼티 제어

### 요소 추가/수정

-   `요소 속성에 값 할당하면 됨.`

    ```javascript
    user.addr = 'Busan'; // user의 메모리주소에 연결된 Heap에서 추가되었기 때문에 가능
    user = { ...user, addr: 'Seoul' }; // user가 const인 경우에는 메모리 변경이 안되므로 에러
    console.log(user);
    ```

### 속성 삭제

-   키워드 : `delete`
-   함수 : `Reflect.deleteProperty()`

    ```javascript
    delete user.addr;
    Reflect.deleteProperty(user, 'addr');
    ```

### key 접근

-   `Object.keys()` : `Symbol 제외 모든 키 반환`
-   `Reflect.ownKeys()` : `Symbol 포함 모든 키 반환`
-   `Object.getOwnPropertySymbols(user)` : `Symbol 속성을 가진 모든 키 반환`

    ```javascript
    // Object.keys로는 Symbol은 안나오나 Reflect.ownKeys하면 나옴
    const keys = Object.keys(user);
    console.log('keys:', keys, keys.length);
    console.log('keys:', Reflect.ownKeys(user), Reflect.ownKeys(user).length);
    ```

### value 접근

-   `Object.values()` : `Symbol 제외 모든 값 반환`

    ```javascript
    const values = Object.values(user);
    ```

### key, value 접근

-   `Symbol 빠진 키-값` : `Object.entries()`
-   `Symbol 포함 키-값` : `Reflect.ownKeys()`를 이용하여 함수 만들어 반환가능

    ```javascript
    // 객체의 모든 요소에 접근하기
    console.log(Object.entries(user)); //array로 표출(Symbol은 빠져있음)
    function entriesWithSymbol(obj) {
        const rets = [];
        if (!obj || typeof obj !== 'object') return []; // demon에서 돌릴 경우 프로그램이 죽을 수 있으므로 써주는 것이 좋음
        for (const k of Reflect.ownKeys(obj)) {
            // in은 인덱스값, of는 키-값
            console.log(k);
            rets.push([[k, obj[k]]]);
        }
        return rets;
    }
    console.log(entriesWithSymbol(user));

    // keys: [
    //     '123',
    //     '12345',
    //     '',
    //     ' ',
    //     'true',
    //     'id',
    //     'name',
    //     'Tue Oct 03 2023 18:53:16 GMT+0900 (Korean Standard Time)',
    //     'my-friends',
    //     'getInfo'
    //   ] 10
    //   keys: [
    //     '123',
    //     '12345',
    //     '',
    //     ' ',
    //     'true',
    //     'id',
    //     'name',
    //     'Tue Oct 03 2023 18:53:16 GMT+0900 (Korean Standard Time)',
    //     'my-friends',
    //     'getInfo',
    //     Symbol()
    //   ] 11
    ```

### 객체 안에 속성 존재여부 확인

-   키워드: `in`
-   함수 : `객체.hasOwnProperty('addr')`, `Reflect.has(user, 'addr')`

    ```javascript
    console.log('addr' in user); // in: 연산자
    console.log(user.hasOwnProperty('addr')); // hasOwnproperty : 함수
    console.log(Reflect.has(user, 'addr')); // Reflect.has() : 함수
    ```

<br>
 <br>

## 객체 클래스 메소드

### Object.getOwnPropertyDescriptor , Object.getOwnPropertyDescriptors, Object.defineProperty

> -   **객체에도 객체의 내부속성 (value, writable, enumerable, configurable) 이 있다.** > **value** : 값 리터럴
>     **writable** : 값 수정가능한지
>     **enumerable** : 열거할 때 나오는지 (Symbol도 Reflect를 통해 나올 수 있으므로 True)
>     **configurable** : 위의 값들을 바꿀 수 있는지

```javascript
// 내부속성 확인
console.log(Object.getOwnPropertyDescriptor(user, 'name'));
// { value: 'Hong', writable: true, enumerable: true, configurable: true }

// 내부속성 변경 (value)
Object.defineProperty(user, 'name', { value: 'Kim' }); // === user.name = "Kim"
console.log(Object.getOwnPropertyDescriptor(user, 'name'));
// { value: 'Kim', writable: true, enumerable: true, configurable: true }

// 내부속성 변경 (writable)
Object.defineProperty(user, 'name', { writable: false });
user.name = 'Lee'; //error는 표출이 안됨
console.log(Object.getOwnPropertyDescriptor(user, 'name'));
// { value: 'Kim', writable: false, enumerable: true, configurable: true }

// 내부속성 변경 (enumerable)
console.log(Object.entries(user));
// [
//     [ '123', 1 ],
//     [ '12345', 2 ],
//     [ '', 1 ],
//     [ ' ', 1 ],
//     [ 'true', 1 ],
//     [ 'id', 2 ],
//     [ 'name', 'Kim' ],
//     [ 'Tue Oct 03 2023 19:56:11 GMT+0900 (Korean Standard Time)', 365 ],
//     [ 'my-friends', [ 'Han', 'Kim' ] ],
//     [ 'getInfo', [Function: getInfo] ]
//   ]

Object.defineProperty(user, 'name', { enumerable: false });
console.log(Object.entries(user)); // name이 false 되었으므로 나타나지 않음
//   [
//     [ '123', 1 ],
//     [ '12345', 2 ],
//     [ '', 1 ],
//     [ ' ', 1 ],
//     [ 'true', 1 ],
//     [ 'id', 2 ],
//     [ 'Tue Oct 03 2023 19:56:11 GMT+0900 (Korean Standard Time)', 365 ],
//     [ 'my-friends', [ 'Han', 'Kim' ] ],
//     [ 'getInfo', [Function: getInfo] ]
//   ]
```

 <br>

### Object.fromEntries

`배열`을 `객체`로 만들기

```javascript
// 1
const arr = [
    ['id', 1],
    ['name', 'kim'],
];
const park = Object.fromEntries(arr);
console.log(park); // { id: 1, name: 'kim' }

// 2
const arr2 = ['a', 'b', 'c'];
const arrEntries = arr2.map((x, i) => [i, x]);
console.log(arrEntries); //[ [ 0, 'a' ], [ 1, 'b' ], [ 2, 'c' ] ]
console.log(Object.fromEntries(arrEntries)); //{ '0': 'a', '1': 'b', '2': 'c' }

console.table(arr2);
// ┌─────────┬────────┐
// │ (index) │ Values │
// ├─────────┼────────┤
// │    0    │  'a'   │
// │    1    │  'b'   │
// │    2    │  'c'   │
// └─────────┴────────┘
console.dir(arr2);
// [ 'a', 'b', 'c' ]
```

<br>

### Object.assign({}, user) , { ...user }, new Object(user), Object.create(user)

**객체 얕은 복사하기**

-   Object.assign({} , user) : {}의 메모리 주소에 user를 담는다.
-   new Object(user) : new 키워드를 이용한 새로운 Object 생성한다.
-   Object.create(user) : 주어진 객체를 프로토타입으로 하는 새로운 객체를 생성한다. Object.getPrototypeOf(user)) or user.**proto** 를 이용하여 상속받으면 얕은 복사 가능하다.

    ```javascript
    const user1 = Object.assign({}, user); =
    const user2 = { ...user };
    const user3 = new Object(user);
    const user4 = Object.create(user);

    console.log(user1);
    console.log(user2);
    console.log(user3);
    console.log(user4); // {}
    console.log(Object.getPrototypeOf(user4));
    console.log("===============================");
    //   {
    //     '123': 1,
    //     '12345': 2,
    //     '': 1,
    //     ' ': 1,
    //     true: 1,
    //     id: 2,
    //     name: 'Hong',
    //     'Tue Oct 03 2023 21:10:44 GMT+0900 (Korean Standard Time)': 365,
    //     'my-friends': [ 'Han', 'Kim' ],
    //     getInfo: [Function: getInfo],
    //     [Symbol()]: 'Hong'
    //   }
    ```

<br>

**내부 보기**

> -   `얕은 복사(shallowcopy)`를 하는 것은 `stack의 메모리 값을 복사하는 것`이다.
> -   `깊은복사(deepcopy)`는 `heap의 값까지도 모두 복사하는 것이다.`
>     (즉, 참조하는 내용까지도 완전히 다른 값을 지닌다. (clone))

-   처음 생성했을 때 `primitive value`은 원본의 값을 그대로 복사하므로 true,
    object의 생성자함수의 매개변수에 object를 주면 그대로 반환하므로 user === user3 는 true

    ```javascript
    // 객체 생성
    const user1 = Object.assign({}, user); // "{}의 메모리 주소에 user을 담겠다"
    const user2 = { ...user };
    const user3 = new Object(user);
    const user4 = Object.create(user);
    Object.getPrototypeOf(user4);

    // 1. 생성했을 때 primative value는 같기에 true
    console.log(user === user1, user.id === user1.id);
    console.log(user === user2, user.id === user2.id);
    console.log(user === user3, user.id === user3.id);
    console.log(user === user4, user.id === user4.id);
    // false true
    // false true
    // true true
    // false true
    ```

-   `reference value`의 모습도 살펴보기 위해 새로운 reference value를 추가

    ```javascript
    user['hobby'] = { first: 'running' };
    ```

-   처음 생성했을 때, `reference value`는 `같은 메모리 주소`를 가리키고 있기 때문에 `true`이다.

    ```javascript
    // 2. 속성에 reference value(객체) 추가하여 객체생성
    user['hobby'] = { first: 'running' };
    const user1 = Object.assign({}, user);
    const user2 = { ...user };
    const user3 = new Object(user);
    const user4 = Object.create(user);
    console.log(user.hobby === user1.hobby);
    console.log(user.hobby === user2.hobby);
    console.log(user.hobby === user3.hobby);
    console.log(user.hobby === user4.hobby);
    // true
    // true
    // true
    // true
    ```

-   `reference value의 값`을 변경해보자. `"running -> climing"`
    객체를 복사할 때 복사본에는 heap을 가리키는 stack의 메모리 주소가 똑같이 할당되었지만, 다른 값을 가진 메모리를 재할당함으로써 stack의 메모리 주소는 변경된다. 따라서, `user1.hobby의 메모리주소와 user.hobby의 메모리 주소는 같지 않다.`

    ```javascript
    user1['hobby'] = { first: 'climing' };
    console.log(user.hobby === user1.hobby);
    console.log(user.hobby === user2.hobby);
    console.log(user.hobby === user3.hobby);
    console.log(user.hobby === user4.hobby);
    // false
    // true
    // true
    // true
    ```

-   그렇다면, `heap 영역에 존재하는 데이터값을 변경하면? stack에서 주소값이 변하지 않기 때문에 true이다.`

    ```javascript
    user1.hobby.first = 'climing';
    console.log(user.hobby === user1.hobby);
    console.log(user.hobby === user2.hobby);
    console.log(user.hobby === user3.hobby);
    console.log(user.hobby === user4.hobby);
    // true
    // true
    // true
    // true
    ```
