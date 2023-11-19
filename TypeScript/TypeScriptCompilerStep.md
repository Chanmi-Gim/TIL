# 타입스크립트 컴파일러 단계

### 1. 타입스크립트 컴파일 명령어 실행 : $ tsc

### 2. TSConig 파일 읽기

-   컴파일러는 tsconfig.json 파일을 읽어 프로그램을 설정하고 시작 파일을 가져온다. 이 파일에는 프로렉트 컴파일 옵션과 시작파일의 설정이 징의되어 있다.

### 3. 파일전처리 및 import

-   컴파일러는 시작 파일을 기준으로 모든 가능한 파일을 전처리하고 파일간의 Import 구문을 따라가면서 필요한 모듈을 수집한다.

### 4. 토크나이징 (스캔) 및 파싱

-   컴파일러는 파일의 텍스트를 토큰화하고 이를 파싱하여 Syntax tree 생성

### 5. 바인더

-   Syntax tree안의 식별자를 심볼로 변환하는 바인더 동작. 변수, 함수 등의 이름을 해당하는 심볼에 연결한다.
-   Symbol Table : 스코프별 Symbol 바인딩한 것을 표시 (구조화된 타입 : 식별자 + 티인키워드 + 속성)

### 6 . 타입체커 (= 타입검사기)(타입비교& 타입 추론)

-   바인더와 Syntax tree를 활용하여 타임체크 수행.
-   변수 및 표현식에 할당된 값들의 타입이 일치하는지 검사.

### 7. 변환 (transform)

-   tsconfig 타겟읍션에 따라 Syntax tree 변경 (ECMAScript 버전 및 다른 옵션에 따라 다양하게 변환 수행함)

### 8. 발행(emit)

-   최종적으로 운행 트리를 기반으로 js파일, 타입 정의파일(.d.ts), 다른 설정에 따른 파일생성

### 예시

```typescript
// main.ts
const message: string = 'hello, TypeScript!
console.log(message)
```

```typescript
// tsconfig.json
{
 "compileoptions" : {
    target : es5
    outDir : ./dist
    rootDir : ./src
    },
    include : ["src/**/*.ts"],
    exclude : ["node_modules"]
}
```

1. tsc
2. tsconfig.json 읽기
3. 타일 파일이므로 X
4. main.ts 파일의 내용을 토큰화하고 Syntax tree 생성
5. 바인딩 (.tsbuildinfo)
6. 타입체크 : message 변수 타입 체크하고 할당값이 문지열인지 확인
7. 특별한 변환 없음
8. 최종적으로 ./dist 디렉토리에 컴파일된 파일(main.is 및 main.d.ts) 생성
