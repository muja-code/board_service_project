// express를 사용하기 위해 npm으로 설치한 express를 가져온다
const express = require("express");

// exports한 connect를 가져온다
const connect = require("./schema/index.js");

// 게시글에 관련된 api를 사용하기 위해 라우터를 가져온다
const postRouter = require("./routes/posts");

// 댓글 관련된 api를 사용하기 위해 라우터를 가져온다.
const commentRouter = require("./routes/comments");

// app변수에 express를 넣는다
const app = express();

// 서버를 열 때 3000번 포트의 서버로 열기 위해 미리 지정해 둔다
const port = 3000;

// mongoDB에 연결한다
connect();

// req.body를 파싱할 수 있게 미리 선언한다
app.use(express.json());

// api들을 따로 나누어서 관리하기 위해 미들웨어를 사용한다
app.use("/api", [postRouter, commentRouter]);

// 주소에 처음 들어오면 텍스트를 반환해준다
app.get("/", (req, res) => {
    res.send("안녕하세요!!")
});


// 이 부분에서 서버가 실행이 되고 위에 지정해둔 port로 서버를 열고 서버가 열리면 알려준다
app.listen(port, () => {
    console.log(port, '포트로 서버가 열렸어요!');
});