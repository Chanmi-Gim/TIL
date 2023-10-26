# Middle Ware

-   요청과 응답 사이의 중간 처리 단계를 담당하는 함수나 클래스. 이는 특정 작업을 수행하거나 다음 미들웨어/핸들러로 요청 및 응답 객체를 전달하는 역할을 한다.
-   종류

    -   Pipes : 요청 유효성 검사, 페이로드 변환, 예외를 던지는 역할을 수행한다.
    -   Filters : 예외를 잡아 처리하는 역할. 사용자 정의 오류 응답을 반환하는데 사용한다.
    -   Guards : 인증 미들웨어. 요청이 특정 라우터 핸들러로 전달되기 전에 실행된다. 주로 사용자가 해당 요청을 수행할 권한이 있는지 확인하는데 사용된다. 지정된 경로로 통과할 수 있는 사람과 허용하지 않는 사람을 서버에게 알려준다.
    -   Interceptors : 데이터 변환, 응답 가공, 사용자 정의 로깅 등 다양한 작업을 수행할 수 있다.

-   각각의 미들웨어가 불러지는 순서
    ```text
    Middleware ➡️ Guard ➡️ Interceptor (before) ➡️ Pipe ➡️ Controller/Route Handler ➡️ Service (if applicable) ➡️ Controller/Route Handler (response) ➡️ Interceptor (after) ➡️ Filter (if an exception is thrown) ➡️ Client
    ```
