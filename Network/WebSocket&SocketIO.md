# SocketIO 
### WebSocket
- 실시간, 양방향, event 기반 통신을 제공하는 방법 중 하나이다.

### SocketIO
- 프론트엔드와 백엔드간 실시간 통신을 가능하게 해주는 프레임워크로 WebSocket뿐만 아니라 다양한 방법(HTTP long polling 등)을 활용하여 실시간, 양방향, event 기반 통신을 구현한다. 
- WebSocket 지원 여부 확인 후, 브라우저가 지원하면 WebSocket을 사용하고 지원하지 않거나 문제가 발생하면 다른 방법을 사용하여 통신을 유지한다.
- 방화벽, 프록시가 존재해도 SocketIO는 계속 작동한다.
- WIFI 연결이 잠시 끊겨도 연결이 끊어져도 재연결된다.
- WebSocket보다는 조금 무겁다. 하지만 신뢰성, 안정성, 더 편리한 코드를 제공한다.


### SocketIO 실무
- Room 기능을 포함한다.
- WebSocket 모듈과의 차이점
    - 특정한 이벤트명으로 emit 가능 (단, on할 때도 같은 이벤트명으로 기입해야한다.)
    - JavaScript의 다양한 Type을 emit 가능
        - Object, string, number, boolean, Callback function 등...   
            `socket.emit(이벤트명, 보내고 싶은 페이로드, ... , callbackFunc)`
            - 단, callbackFunction은 맨 마지막에 위치해야 함
            - front-end에서 back-end에 Func을 emit 했을 때 back-end에서는 받은 함수를 실행시키면 Func이 front-end에서 실행된다.(backend에서 실행시키는 것이 아니다.)
    - io(): port, ws 기입할 필요 없이 자동적으로 socket.io를 실행하고 있는 서버를 찾는다. (프론트엔드와 SocketIO 연결)