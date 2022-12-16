# 개인과제 board_service_project
---

## 과제 질문의 대한 답변

1. 수정, 삭제 API에서 Resource를 구분하기 위해서 Request를 어떤 방식으로 사용하셨나요? (param, query, body)

    id값을 받아야 하는 경우여서 param를 사용해서 id값을 받았습니다.
    

2. HTTP Method의 대표적인 4가지는 GET, POST, PUT, DELETE 가있는데 각각 어떤 상황에서 사용하셨나요?

    GET: 게시글 리스트나 게시글 조회 댓글 조회의 상황에서 사용했습니다.

    POST: 게시글 작성 댓글 작성 처럼 Create가 발생할 때 사용했습니다.

    PUT: 게시글 수정이나 댓글 수정 modify가 발생할 때 사용했습니다.

    DELETE: 게시글 삭제나 댓글 삭제 delete가 발생할 때 사용했습니다.
    

3. RESTful한 API를 설계했나요? 어떤 부분이 그런가요? 어떤 부분이 그렇지 않나요?

    posts와 comments로 복수형이로 만들고 통일하고 http Method로 구분하면서 Resource를 구분하기위해 필요한 데이터는 파라미터값으로 받고 JSON데이터만 통신하기 때문에 RESTful하게 설계했다고 생각합니다.
    

4. 역할별로 Directory Structure를 분리하였을 경우 어떠한 이점이 있을까요?

    가독성이 좋아 필요한 파일을 찾기 좋습니다
    
    파일이름 중복이 가능합니다
    
    기능별로 관리하기 편해 유지보수에 좋습니다
