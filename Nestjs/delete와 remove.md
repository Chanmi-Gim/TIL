# Repository Method - remove/delete

Repository가 제공하는 메서드 remove, delete

## remove

-   Entity 인스턴스를 전달받아 해당 Entity를 삭제한다.
-   존재하지 않은 아이템을 지우면 404 Error가 발생하므로 무조건 존재하는 아이템을 지워야 한다.
-   DB에 2번 접근한다. (아이템 유무 확인 + 있으면 지우기)

## delete

-   삭제할 조건을 직접 전달받아 해당 조건에 맞는 레코드 삭제한다.
-   만약 아이템이 존재하면 지우고 존재하지 않으면 아무런 영향이 없다.
-   DB 1번 접근한다 (있으면 지우기) -> 단순 삭제 작업에 빠르고 효율적이다.
-   반환객체 : { raw: any , affected : number | null }
    -   raws : 쿼리의 직접적인 결과를 도출
    -   affected : 쿼리에 의해 영향을 받은 레코드 수 (자주 사용)
