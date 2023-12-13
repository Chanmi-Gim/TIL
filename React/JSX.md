## JSX (JavaScript XML)

-   설계 목적 : 트리 구조를 토큰화해 자바스크립트(ECMAScript)가 이해할 수 있는 코드로 변경하는 것이다.
-   정의 : XML 스타일의 트리구문을 자바스크립트로 작성하는데 도움을 주는 문법이다. HTML과 유사한 구조를 가지며 JavaScript 코드 안에서 XML 형식으로 작성할 수 있다.
-   브라우저 실행 : JSX 코드는 브라우저에서 직접 실행되지 않으며, 일반적으로 `자바스크립트로 변환된 후 번들러`를 사용하여 브라우저에서 실행 가능한 형태로 만들어진다. -`번들러` : import로 모듈을 불러왔을 때 불러온 모듈을 모두 합쳐서 하나의 파일을 생성한다. (import 구문은 원래 브라우저에 없는 기능이며 노드환경에서 지원된다.)
-   장점
    각각의 UI 조각을 독립적인 컴포넌트로 나타내서 용이하고 재사용성 높다.
    XML과 비슷한 문법을 사용해서 가독성이 좋다.
    JavaScript 표현식을 사용할 수 있다.

<br>

## 구성요소

#### 1. JSX Element(컴포넌트)

-   JSX ElementName : JSX 요소의 이름을 나타냄 `<div>`, `<MyComponent>`
-   JSX Identifier : JSX 식별자로, 변수나 함수를 JSX에 포함할 때 사용`<{variable}>`, `<{function()}>`
-   JSX NameSpaceName : JSX 네임스페이스 이름을 나타냄.`<ns:element>`
-   JSX MemeberExpression : JSX의 멤버 표현식으로 객체의 속성에 접근할 때 사용.`<obj.property>`

   <br>

#### 2. JSXAttributes(속성)

-   JSX Element도 속성의 옵션으로 사용가능
-   JSX spreadAtrribute : 여러 속성을 객체로 묶어 JSX 전달할 때 사용
-   JSX Attribute : `<div className="my-class"></div>`
    -   AttributeName : 속성의 이름 `className`
    -   AttributeValue : 속성에 부여되는 값 `"my-class"`

#### 3. JSX Children(자식요소)

-   JSX Child : JSX 요소 내에 포함되는 하위 요소들`<div>{childContent}</div>`
    -   JSX Text : 텍스트 표현 `<div>Hello, JSX!</div>`
    -   표현식: JS 표현식을 {}로 감싼 형태 `<div>{2+2}</div>`
    -   JSX Element : 다른 JSX 요소`<div><childComponent /></div>`
    -   JSX Fragment : 부모요소 없이 여러 요소를 그룹화 `<><Element1 /><Element2 /></>`

#### 4. JSX Strings

-   `"Hello, JSX"`

<br>

## JSX가 JS로 변환되는 방법

-   바벨
    -   역할 : JSX 코드를 브라우저에서 실행 가능한 표준 자바스크립트 코드로 변환.
        -   변환된 자바스크립트 코드를 번들러(Webpack, Rollup, Parcel 등)에게 전달하여 최종적으로 번들링되고 최적화된 빌드가 생성됨.
        -   예시 : JSX → `Babel` → JavaScript → `번들러` → 번들된 JavaScript
-   exbuild, swc, vite(exbuild+rollup)
    -   역할 : 코드 번들링, 트리 쉐이킹, 모듈 번들링 등 성능을 향상시켜 최적화된 빌드 생성
        -   예시 : JavaScript, JSX → `exbuild, swc, Vite` → 번들된 JavaScript

<br>

## JSX 규칙

> **요소와 컴포넌트 차이점**
>
> -   요소(Element) : 브라우저에서 화면에 보이는 것들을 나타낸다. HTML 요소와 유사한 구조를 가지며, React에서는 UI를 표현하기 위한 기본 단위이다.
> -   컴포넌트(Component) : 요소들을 구성하고 독립적으로 재사용 가능한 코드 블록이다. 컴포넌트는 상태(state)와 생명주기(lifecycle)를 가질 수 있으며, 여러 개의 요소를 하나의 독립적인 단위로 묶어서 관리할 수 있도록 도와준다.
>
> ```html
> <!--요소-->
> <div>Hello, Element!</div>
> ```
>
> ```javascript
> // 컴포넌트
> const MyComponent = () => {
>     return <div>Hello, Component!</div>;
> };
> ```

1.  모든 요소는 단일 Root Element 안에 포함되어야 한다.
    -   `<React.Fragment>` 또는 `<>...</>`을 사용해서 여러 요소 그룹화 가능
2.  JavaScript 구문은 {}를 이용해서 JSX에 삽입할 수 있다.

    -   변수, 연산, 함수 등의 표현식이 가능하며 Type평가 방식도 지원한다.
    -   조건문은 3항 연산자나 논리연산자(&&, ||)를 사용하여 처리한다. (if 안됨)
    -   NaN 또는 0과 같은 falsy 값은 표시되지 않으므로 주의가 필요하다.
    -   단, 논리연산자에는 NaN, 0은 표시된다.

    ```javascript
    const myVar = 0;
    const myNaN = NaN;

    return (
        <div>
            {myVar} {/* 이 부분은 0이 표시되지 않음 */}
            {myNaN} {/* 이 부분은 NaN이 표시되지 않음 */}
            {myVar || 'Default Value'} {/* 이 부분은 falsy 값인 0이므로 'Default Value'가 표시됨 */}
            {myNaN || 'Default Value'} {/* 이 부분은 falsy 값인 NaN이므로 'Default Value'가 표시됨 */}
            {myVar && 'Rendered'} {/* 이 부분은 falsy 값인 0이므로 'Rendered'가 표시되지 않음 */}
            {myNaN && 'Rendered'} {/* 이 부분은 falsy 값인 NaN이므로 'Rendered'가 표시되지 않음 */}
        </div>
    );
    ```

3.  CSS: class는 className으로 지정하고, style 속성키는 CamelCase로 작성한다.
4.  태그: 열었으면 꼭 닫는다. (빈요소는 `<br />`처럼 사용한다.)
5.  주석: `{/* 내용 */}`
6.  HTML 태그는 소문자로 작성하고 컴포넌트는 대문자 또는 CamelCase로 시작한다.
7.  Injection Attack : 중괄호로 감싸 표현식으로 삽입하기 때문에 문자열로 해석되는 것을 방지한다. 예를 들어 일반 JavaScript 코드에서는 사용자 입력을 그대로 실행시킨다.

    ```javascript
    <script>사용자 입력: print('hi')</script>
    ```

    그러나, JSX는 {}를 이용하여 스크립트 표현식으로 해석하여 실행시키지 않는다.

    ```javascript
    <div>
        사용자 입력: <script>print('hi')</script>
    </div>
    ```
