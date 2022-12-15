// node.js에서 mongoDB를 사용할 수 있게 npm으로 설치한 mongoose를 가져온다
const mongoose = require("mongoose");

// 엄격 모드는 true로 활성화 시킨다 이거 안하면 경고 에러 메세지가 계속 나옴
mongoose.set('strictQuery', true);

// mongoose의 connect와 catch를 이용해서 몽고디비와 연결하고 연결이 실패할 경우를 connect에 넣는다
const connect = () => {
    mongoose
        .connect("mongodb://127.0.0.1:27017/board")
        .catch(err => console.log(err));
}

// 위에 만들어둔 connect를 app.js에서 사용해야 하기 때문에 모듈로 exports로 내보낸다.
module.exports = connect;