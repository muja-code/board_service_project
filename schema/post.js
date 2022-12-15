// node.js에서 mongoDB를 사용할 수 있게 npm으로 설치한 mongoose를 가져온다
const mongoose = require("mongoose");

// mongoose를 이용해서 post 스카마를 생성한다 이 건 collections이라고 생각하자
const postSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

// 만든 스키마를 모델로 감싸 객체로 exports를 사용해 내보내서 DB에 실제로 작업한다
module.exports = mongoose.model("Post", postSchema);