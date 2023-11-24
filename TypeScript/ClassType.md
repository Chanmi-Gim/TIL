# 클래스 타입

클래스 구조와 멤버에 대한 타입을 정의하는 방법.  
런타임 값 또는 타입 애너테이션을 모두 클래스 선언을 통해 이루어진다.
<br></br>

## 함수 및 속성 정의

### 매개변수

타입 또는 기본값을 지정해야 함 (안하면 해당 매개변수는 `any` 타입으로 간주됨)  
인수의 개수도 명시되어야 함.

```typescript
class Greeter {
    constructor(name: string) {
        // name만 쓸경우 any로 유추
        console.log(`${name}, hello~~`);
    }
}
new Greeter("Gim");
// new Greeter() // Error : 인수 개수
```

<br></br>

### 속성 정의

명시적으로 클래스에 선언해야 함.  
(타입스크립트는 생성자 내의 할당에 대해서 멤버가 클래스에 존재하지 추론하지 않음)

-   필수속성 : 반드시 기입해야하는 속성
-   선택속성 : 생략 가능한 속성 (생략시 디폴트 : undefined)
-   읽기전용 속성(readonly) : 속성을 읽기 전용으로 변환(수정 불가). 생성자 또는 선언된 위치에서만 초깃값 할당 가능. 만약, 원시값으로 초깃값 설정되면 리터럴 타입으로 추론됨.

```typescript
class Trip {
    destination: string;
    constructor(destination: string) {
        this.destination = destination;
        console.log(`our trip : ${destination}`);
        // this.non = destination; // Error : 명시적으로  속성 선언 안함
    }
}
```

```typescript
readonly a : string = "abc" // string 타입
readonly b = "abc" // 리터럴 타입 (abc)
```

<br></br>

### 함수 정의

```typescript
class Person {
    name: string;
    get3: () => void; // 함수 속성으로 정의
    constructor(name: string) {
        this.name = name;
        this.get3 = () => {
            console.log(`my name is ${this.name}. from get3()`);
        };
    }
    // 메서드로 정의
    get1() {
        console.log(`my name is ${this.name}. from get1()`);
    }
    // 호출 시그니처로 정의
    get2 = () => {
        console.log(`my name is ${this.name}. from get2()`);
    };
}
```

<br></br>

## 초기화 검사

-   undefined 타입으로 선언된 각 속성이 생성자에서 할당되었는지 확인
-   ! : 의도적으로 클래스 속성 값할당을 안하고 싶을 때 추가하면 검사를 비활성화시킨다. 속성이 처음 시작되기 전에 undefined값이 할당된다.
    ```typescript
    class withTS {
        a = 0;
        b: number;
        c: number | undefined;
        d: number; //Error : 초기화검사시 생성자에서 값할당 안됨
        constructor() {
            this.b = 1;
        }
    }
    ```
    ```typescript
    class withTS {
        a = 0;
        b: number;
        c: number | undefined;
        d!: number; //Error : 초기화검사시 생성자에서 undefined 할당
        constructor() {
            this.b = 1;
        }
    }
    const aaa = new withTS();
    console.log(aaa.a); //0
    console.log(aaa.b); //1
    console.log(aaa.c); //undefined
    console.log(aaa.d); //undefined
    ```
    <br></br>

## 값 할당

-   클래스와 동일한 멤버를 가진 객체 타입은 클래스 인스턴스로 할당할 수 있습니다.
    ```typescript
    class Teacher {
        sayhello() {
            return ["hi", "hello"];
        }
    }
    function withT(teacher: Teacher) {
        console.log(teacher.sayhello());
    }
    let teacher: Teacher = new Teacher();
    withT(new Teacher()); // ["hi", "hello"]
    withT({ sayhello: () => ["hah"] }); // 동일한 멤버를 모두 포함하는 객체 타입 할당 ["hah"]
    // withT({ sayhello: () => 123 }); // Error : 객체의 반환 타입이 다름
    ```

<br></br>

## 인터페이스 이용한 클래스 구현 : Implements 키워드 이용

-   인터페이스에서 정의한 타입보다 구체적인 타입으로 구현해야 함

    > **클래스에서는 인터페이스에서 정의한 타입 대신에 어떠한 속성이든 any 타입으로 구현가능**  
    > **Why?** any 타입은 컴파일러가 타입 검사를 수행하지 않는 타입으로 해당 값에 대한 타입 검사를 수행하지 않고 모든 연산 및 메서드 호출을 허용하기 때문임(위험하므로 비권장)

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

-   다중 인터페이스 이용가능. - 모든 형태를 똑같이 유지해야 함 - 동일한 속성명/메서드명 사용 비권장(다른 클래스로 구현하거나 공통 타입을 추가하기)
    <br></br>

## 클래스 확장 : extends 키워드 이용

### 클래스 확장

```typescript
class Teacher {
    teach() {}
}

class StudentTeacher extends Teacher {
    learn() {}
}

const teacher = new StudentTeacher();
teacher.teach();
teacher.learn();
```

-   기본 클래스에 하위클래스의 속성이 없으면 사용 불가(선택 속성화하면 가능)

    ```typescript
    class Teacher {
        subject: string;
        constructor(subject: string) {
            this.subject = subject;
        }
    }
    class StudentTeacher extends Teacher {
        url: string;
        constructor(subject: string, url: string) {
            super(subject);
            this.url = url;
        }
    }

    let student1: Teacher;
    let student2: Teacher;
    student1 = new Teacher("coding");
    student2 = new StudentTeacher("coding", "https://");

    let student3: StudentTeacher;
    let student4: StudentTeacher;
    student3 = new Teacher("coding"); // Error
    student4 = new StudentTeacher("coding", "https://");
    ```

    ```typescript
    // 선택 속성화해서 기본클래스 사용 가능함
    class StudentTeacher extends Teacher {
        url?: string;
        constructor(subject: string, url?: string) {
            super(subject);
            this.url = url;
        }
    }
    let student3: StudentTeacher;
    let student4: StudentTeacher;
    student3 = new Teacher("coding");
    student4 = new StudentTeacher("coding", "https://");
    ```

    <br></br>

### 클래스 확장시 재정의

1. 생성자 : 하위클래스는 자체 생성자 정의할 필요 없음. 자체 생성자가 필요하면 super로 기본클래스 생성자 호출하여 나머지 추가하면 됨.
    - this, super호출하기 전에 super()를 제일 위에서 선언해야 한다.
2. 속성 : 하위클래스는 해당 속성을 구체적인 하위집합으로 만들어야 함

    ```typescript
    class GrandCounter {
        value = 0;
    }
    class Counter1 extends GrandCounter {
        value = Math.random() > 0.5 ? 1 : "str"; //Error
    }
    const instance: GrandCounter = new Counter1();
    console.log(instance.value);
    ```

3. 메서드 : 첫번째 매개변수와 반환타입만 동일하면 허용함
    ```typescript
    class GrandCounter {
        count(grades: string[], letter: string) {
            return grades.length;
        }
    }
    class Counter1 extends GrandCounter {
        count(grades: string[]) {
            return grades.length;
        }
    }
    class Counter2 extends GrandCounter {
        count(grades: string[]) {
            return true; //Error
        }
    }
    ```
    <br></br>

### 멤버 접근성 : 접근 제한자를 이용

-   public(default) : 모든 곳에서 누구나 접근 가능
-   protected : 클래스 내부 또는 하위클래스에서만 접근 가능
-   private : 클래스 내부에서만 접근가능(#)<br></br>

    > readonly: 접근 제한자 뒤에 표시

    ```typescript
    class One {
        private readonly name: string;
        constructor() {
            this.name = "kim";
        }
    }
    const one = new One();
    ```

    > 정적 필드 제한자 : 클래스 자체에서 멤버 선언 - static 클래스필드에 대해 readonly와 static을 사용하면 클래스 외부에서 접근되거나 수정되는 것을 제한하는데 유용함

    ```typescript
    class Question {
        protected static readonly answer: "bash";
        protected static readonly prompt = "what";
        guess(getAnswer: (prompt: string) => string) {
            const answer = getAnswer(Question.prompt);
            if (answer === Question.prompt) {
                console.log("You got it");
            } else {
                console.log("Try");
            }
        }
    }
    const q = new Question();
    // Question.answer // Error : 접근 불가
    ```

<br></br>

## 추상클래스

-   클래스명, 메서드 앞에 abstract 키워드 추가
-   일부 메서드의 구현을 선언하지 않고 하위클래스가 해당 메서드를 제공하게 만듬. 일부 메서드에 대한 정의가 없기 때문에 인스턴스화 불가

    ```typescript
    abstract class School {
        readonly name: string;
        constructor(name: string) {
            this.name = name;
        }
        abstract getStudent(): string[];
    }
    class PreSchool1 extends School {} // Error 구현안됨
    class PreSchool2 extends School {
        getStudent(): string[] {
            return ["pre"];
        }
    }
    ```
