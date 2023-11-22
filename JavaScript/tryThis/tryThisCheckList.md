# 📎 TryThis CheckList

## Hoisting

-   [ ] 다음 변수들의 논리적 메모리(Stack & Heap) 모델을 그려보세요.

## Operator

-   [ ] modPriority - 산술연산자 중 %의 연산자 우선순위를 증명하시오. (vs +- vs \*/ vs )
-   [ ] point - for문을 이용하여 다음과 같이 출력하는 제어문을 작성하시오.
-   [ ] point - 소숫점 5자리까지 입력가능하고, 이 값에 0.1을 더해서 결과를 출력하려 한다. 사용자가 0.21354 를 입력했을 때 정확한 값을 출력하시오.
-   [ ] functionSignature - user 객체를 받아서 id와 name을 출력하는 함수를 3개의 함수로 작성하시오. (Function signature를 3개 이상으로 표현하기)

## Control Statement & Repetitive Statement

-   [ ] sqrt&weekName - 1 ~ 10 사이의 정수에 대해 제곱근을 소숫점 3자리까지 출력하시오.
-   [ ] sqrt&weekName - 오늘 날짜의 요일을 출력하는 switch문을 사용해서 작성해 보고, switch문을 사용하지 않은 더 간단한 방법도 찾아보세요.

## Closure

-   [ ] 평가 문제 - receipt 주문 받기 및 영수증 출력하기
-   [ ] recursive - 1 ~ 10까지의 원소로 이루어진 배열을 만드는 함수를 재귀함수와 TCO로 작성하시오. (단, array 메소드 사용하지 말고, destructuring을 사용하시오)
-   [ ] memoizedFibonacci - 피보나치 수열을 memoized하여 출력하는 함수를 작성해 보세요.
-   [ ] neverFullCallStackMemoizedFibonacci - 앞 장의 memoizedFibonacci를 CallStack이 풀 나지 않도록하는 neverFullCallStack 함수를 만들어 보시오.

## Object & Property

-   [ ] practice01 - 1) for-in문을 사용하여 배열의 인덱스를 출력하시오.
-   [ ] practice01 - 2) for-in문을 사용하여 배열의 원소를 출력하시오.
-   [ ] practice01 - 3) for-in문을 사용하여 프로퍼티 이름을 출력하시오.
-   [ ] practice01 - 4) for-in문을 사용하여 프로퍼티 값을 출력하시오.
-   [ ] practice01 - 5) for-of문을 사용하여 프로퍼티 값을 출력하시오.
-   [ ] practice01 - 6) level 프로퍼티가 열거되지 않도록 설정하시오.
-   [ ] practice01 - 7) role 프로퍼티는 읽기전용으로 설정하시오.
-   [ ] practice02 - 1) [[‘A’, 10, 20], [‘B’, 30, 40], [‘C’, 50, 60, 70]] 배열을 객체로 만드시오. => { ‘A’: [10, 20], ‘B’: [30, 40], ‘C’: [50, 60, 70] }
-   [ ] practice02 - 2) 위에서 만든 객체를 다시 배열로 만드시오. { ‘A’: [10, 20], ‘B’: [30, 40], ‘C’: [50, 60, 70] } => [[‘A’, 10, 20], [‘B’, 30, 40], [‘C’, 50, 60, 70]]
-   [ ] primitiveKimCopy - 원시값(primitive)만을 갖는 객체 kim을 복사하는 프로그램을 Object의 클래스 메소드 / spread(...) 연산자를 사용하지 말고 작성하시오.

## Function

-   [ ] ObjectDeepCopy - 객체 kim을 깊은 복사하는 deepCopy 함수를 작성하시오.
-   [ ] practice03 - 어떤 함수를 호출하기 전에 before() 함수를, 호출 후에 after() 함수를 항상 실행하는 template() 함수를 만드시오.
-   [ ] practice04 - 다음과 같은 결과가 출력되도록 practice3에서 작성한 코드를 수정하세요.
-   [ ] practice05 - template 함수를 범용적으로 사용할 수 있도록 수정하세요.
-   [ ] once - 함수를 한번만 실행하게 하는 once 함수를 작성하시오.
-   [ ] getNextWeek -
        getNextWeek 함수는 widx변수에 부수 효과(side effect)가 있다. 이를 부수 효과가 없도록 변경하시오. (hint: closure, IIFE)
-   [ ] lecture(HTML) -
        앞 장표의 getNextWeek 함수를 발전시켜 다음과 같이 각 수업 별 요일을 선택하는 HTML을 작성하시오. (각각 요일 순회하는 순수함수로 작성)
-   [ ] reduce -
        Array.reduce 함수를 고차 함수로 직접 구현하시오.

### Array

-   [ ] UsersManager - 아래 users 배열에 대하여 추가/수정/삭제하는 순수 함수를 작성하시오.
-   [ ] 평가문제 - range 다음과 같은 정수 배열을 생성하는 range 함수를 구현하시오.
-   [ ] classNames - 배열의 각 원소를 String으로 변환하시오.
-   [ ] classNames - 다음과 같이 작동하는 classNames 함수를 작성하시오.
-   [ ] powSqrt - 주어진 정수 배열에서 각 요소를 제곱한 값들과 제곱근 값들을 반환하는 함수를 for-of, forEach, map을 사용하여 각각 작성하시오.
-   [ ] deleteArray - 다음과 같은 deleteArray와 deleteObjectArray를 순수 함수로 작성하시오.
-   [ ] reverse - Array.reverse 함수를 비순수 함수와 순수 함수로 각각 구현하시오.
-   [ ] push_pop_shift_unshift - 다음과 같은 push, pop, shift, unshift 를 순수 함수로 작성하시오. (단, 입력값은 다음 예시로 한정함)
-   [ ] composition - 다음과 같은 정수 배열이 주어졌을 때, reduce를 이용하여, 각 요소를 다음의 순서로 처리하시오.

        → 배열의 각 요소를 제곱   n => n 2
        → 배열 각 요소의 제곱근   n => Math.sqrt(n)
        → 배열의 각 요소를 세제곱  n => n 3

-   [ ] splice - splice 함수를 순수 함수로 구현하시오.
-   [ ] Algorithm Coding Test - 'Range Sum' 다음과 같은 정수 배열이 주어졌을 때 구간의 합을 구하는 rangeSum 함수를 작성하시오.
-   [ ] Algorithm Coding Test - 'KeyPair' 다음과 같은 정수 배열이 주어지고, 양의 정수 N이 주어졌을 때, 배열에서 합해서 N이되는 두 개의 요소(index)를 찾는 keyPair(arr, N)함수를 작성하시오.

### Object Oriented Programming(OOP)

-   [ ] proxy_user Emp type의 hong 객체에 fullName 기능을 Accessor Property를 사용하지 말고, proxy 생성자 함수를 이용하여 구현하시오.
-   [ ] prototype&array - mapBy(), findBy(), filterBy()
-   [ ] prototype&array - firstObject, lastObject
-   [ ] stackQueue class와 Array를 이용하여 Stack과 Queue를 구현하시오.
-   [ ] extendedStackQueue 이전 장표에서 작성한 Stack과 Queue에 공통 기능을 확장하시오.

### Iterator & Generator

-   [ ] IteratorStackQueue - 이전 챕터에서 작성한 Stack과 Queue 클래스를 iterator로 작성하시오. (iterable한 클래스로 작성)
-   [ ] subway - 다음의 지하철 노선 중에서, 출발역 ~ 도착역까지만을 반환하는 클래스를 작성하시오. (단방향만)
-   [ ] itAdd - 두 개의 수를 입력 받아 더하기를 수행하는 제너레이터를 작성하시오.
-   [ ] IteratorToGeneratorStackQueue - 이전에 iterator로 작성한 Stack과 Queue의 iterator를 generator 함수로 작성하시오.
-   [ ] IteratorToGeneratorSubway - 지하철 노선도 iterator를 generator함수로 작성하시오. (기능은 동일함)
-   [ ] ArrayList Collection - 클래스를 상속받아 List 메소드들과 클래스 메소드 arrayToList, listToArray를 보유한 ArrayList 클래스를 구현하시오.

### Map & Set (WeakMap, WeakSet)

-   [ ] Map - 다음과 같이 부서와 직원 객체가 있을 때, deptMap과 empDept를 만들고,  개발팀 직원 이름 목록을 출력하시오. (key: id)
-   [ ] SetUniqBy - 이전 Array.prototype에 Set을 이용하여 uniqBy() 함수도 추가하시오.
-   [ ] SetInterSectDiffUnion - 다음과 같은 집합 A, B, C가 있을 때, 각 집합의 교집합, 차집합, 합집합을 구하는 함수를 작성하시오.
-   [ ] ExtendedDeepCopy - 이전에 작성한 깊은 복사 deepCopy 함수에 Map, Set, WeakMap, WeakSet도 복사되도록 코드를 개선하시오.

### Number, Math, Date

-   [ ] random 1) 특정 범위의 난수를 발생시키는 함수를 작성하시오.
-   [ ] random 2) 1 ~ 10 사이의 난수를 무수히(1_000_000_000) 발생시켜 분포를 나타내시오. (난수가 과연 고르게 분포될까?!)
-   [ ]6 Date 1) 1970년 1월 1일과 1970년 1월 2일의 차이를 초로 나타내시오.
-   [ ]6 Date 2) 이 달의 날짜 5개를 무작위로 만들어 역순으로 정렬하시오.
-   [ ]6 Date 3) 내년(2024년)의 오늘(8월 30일)의 요일을 출력하시오.
-   [ ]6 Date 4) 오늘(10월 30일)로 부터 100일 후의 날짜는?
-   [ ] dateCalendar 특정 날짜를 받으면 해당 월의 달력을 출력하시오.
-   [ ] debounce&throttle 0.1초에 한번씩 rand를 총 20회 호출하였을 때, 다음의 각 상황에서 총 몇 번 호출되는지 증명하시오.

        1. 단순 호출 시  ⇒ 총 20회 실행!
        2. 1초 Debounce 호출 시   ⇒ 1회 (총 3초에 실행)
        3. 1초 Throttle 호출 시   ⇒ 총 2초 동안 ⇒ 2회 실행!(1초에 한번씩)

-   [ ] lectureDebounceThrottle 지난 번 lecture.html에서, 국어 수업은 debounce로 클릭하고, 수학 수업은 throttle로 클릭하도록 구현하시오. (각 0.5초 딜레이)
-   [ ] searchDebounceThrottle 지난 번 lecture.html에서, 검색어 입력 상자를 만들고, 입력 기간 중 최대 0.5초에 1회 검색되도록 하시오.

### String & RegExp

-   [ ] isEndJaum 1) 문자열이 한글 자음으로 끝나는지 체크하는 함수를 작성하시오.
-   [ ] AttachJosa 2) 조사 '이/가, 을/를, 은/는'를 알아서 붙이는 함수를 작성하시오.
-   [ ] stringFormatting 오른쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
-   [ ] hasHangul 1) 문자열에 한글이 있는지 체크하는 hasHangul(str) 함수를 작성하시오.
-   [ ] isHangul 2) 문자열이 모두 한글인지 체크하는 isHangul(str) 함수를 작성하시오.
-   [ ] searchInitial 초성 검색을 하는 search함수를 정규식을 이용하여 작성하시오.
-   [ ] UpperToLower 1) 문자열 str에서 대문자만 골라 소문자로 변환하세요.
-   [ ] PhoneNumberFormatting 2) 전화번호를 정확한 형식으로 출력하는 함수를 작성하시오.

### Module

-   [ ] module - 기존에 작성한 소스 파일들에 대해, 다음과 같이 소스 구조를 정비하시오.
-   [ ] modulesOnBrowser - 기존에 작성한 lecture.html을 html 폴더 아래로 복사하고, 새로운 lecture.html의 script 부분을 lecture.js로, debounce등 사용 함수는 이전에 작성한 모듈을 import해서 refac하시오.
-   [ ] makeNpmModule

        1. npm에 본인만의 utils 모듈을 만들어 publish하자 (CJS로 1.0.0 버전)
        2. 1번에서 CJS 방식을 ESM방식으로 변경하고 version은 1.0.1로 up하자!
        3. 1.0.1 버전을 다시 install하여 이상없는지 테스트해보자! (재설치)

### Asynchronous Programming

-   [ ] callbackToPromise - 앞에서 작성한 다음 코드를 Promise를 이용하여 refactoring 하시오.
-   [ ] randTime - 테스트를 위한 임의의 시간(1초 미만)에 resolve를 실행하는 randTime 함수를 작성하시오.
-   [ ] myPromise - 다음과 같이 실행되는 나만의 Promise 함수를 작성하시오.
-   [ ] improvedMyPromise - 이전 장의 Promise 함수에 then,catch,finally를 구현하시오(여러개 가능)
-   [ ] promiseReject - 다음 코드에서 then 함수가 실수로 Promise 객체를 반환하지 않았을 경우 에러로 처리하도록 수정하시오.
-   [ ] promiseAll - 다음 코드에서 promiseAll 함수를 작성하시오.
-   [ ] promiseByGenerator - 다음 코드를 generator함수를 이용하여 실행하는 코드를 작성하시오.
-   [ ] promiseAllByAsync - 다음 코드를 병렬로 실행하여 3.x초에 수행되도록 promiseAll 함수를 재작성(refactoring)하시오.

### Document Object Model (DOM)

-   [ ] transformDOM - 다음 HTML에서 spanX에 offsetWidth가 500이 될 때까지 'X'문자로 채우는 프로그램을 작성하시오.
-   [ ] makeTable - 다음 users를 이용하여 table을 Node를 작성하세요.
