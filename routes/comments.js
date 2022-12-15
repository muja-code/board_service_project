// express를 사용하기 위해 npm으로 설치한 express를 가져온다
const express = require("express");

// 시간을 YYYY년MM월DD일월요일hh시mm분ss초 포맷으로 바꿔주는 기능을 가져온다 
const dateFormat = require("../utills/date.js");

// 라우터를 사용하기 위해 express의 Router를 router에 넣는다
const router = express.Router();

// Comment 스키마를 사용하기 위해 가져온다
const Comment = require("../schema/comment.js");

// comments api에 post_id 파라미터를 받는다
// 데이터베이스와 통신을 완료가 되면 다음 코드를 실행할 수 있게 비동기 처리를 해준다
router.post("/comments/:post_id", async (req, res) => {
    try {
        // URL의 파라미터 값을 가져온다 객체 구조분해를 사용
        const { post_id } = req.params;
        // JSON형태의 request를 객체 구조분해를 사용해 각 변수에 넣는다
        const { user, password, comment } = req.body

        // 데이터가 이상하면 강제로 예외를 발생시킨다
        if (!password || !user || !comment) {
            throw e;
        }


        // 입력받은 값을 comment 컬렉션에 추가하고 추가한 스키마? 문서?를 변수에 담는다
        const post_comment = await Comment.create({ post: post_id, user: user, password: password, comment: comment, date: dateFormat(new Date()) });
        // populate를 통해서 post컬렉션과 연결시킨다
        await Comment.populate(post_comment, { path: "post_id" });

        // 정상적으로 데이터베이스에 추가를 한다면 상태코드 200과 성공 메시지를 반환한다
        res.status(200).json({ msg: "댓글을 작성했습니다." });
    } catch {
        // try catch를 통해서 파리미터나 request 데이터가 문제가 있다면 상태코드 400과 실패 메시지를 반환한다
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
});

router.get("/comments/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;

        // comment 컬렉션에서 post와 연결시켜서 post의 post_id와 같은 댓글들만 user comment date를 가져오고 날짜 순서로 내림차순 정렬한다
        const post_comment = await Comment.find({ post: post_id }).select("user comment date").sort({ "date": "desc" });

        res.status(200).json({ data: post_comment });
    } catch {
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }

});

router.put("/comments/:comment_id", async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { password, comment } = req.body;
        // 데이터가 이상하면 강제로 예외를 발생시킨다
        if (!password || !comment) {
            throw e;
        }

        // 비밀번호를 체크하고 댓글이 존재하는지 파악하기 위해 password를 가져온다
        const check_comment = await Comment.findById(comment_id).select("password");

        // password가 없다면 댓글이 없다고 판단하고 상태코드 400과 실패 메시지를 반환하며 종료한다
        if (!check_comment) {
            return res.status(400).json({ msg: "해당 댓글을 찾을 수 없습니다." });
        }

        // 비밀번호가 틀린다면 상태코드 400과 실패 메시지를 반환하며 종료한다
        if (!(password === check_comment.password)) {
            return res.status(400).json({ msg: "해당 비밀번호가 틀렸습니다." });
        }

        // 위 예외처리를 통과했다면 정상적으로 comment 컬렉션에 업데이트 한다
        await Comment.updateOne({ _id: comment_id }, { $set: { comment: comment, date: dateFormat(new Date()) } })

        res.status(200).json({ msg: "댓글을 수정했습니다." });
    } catch {
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }

});

router.delete("/comments/:comment_id", async (req, res) => {
    try {
        const { comment_id } = req.params;
        const { password } = req.body;
        if (!password) {
            throw e;
        }

        const check_comment = await Comment.findById(comment_id).select("password");

        if (!check_comment) {
            return res.status(400).json({ msg: "해당 댓글을 찾을 수 없습니다." });
        }

        if (!(password === check_comment.password)) {
            return res.status(400).json({ msg: "해당 비밀번호가 틀렸습니다." });
        }

        await Comment.deleteOne({ _id: comment_id })

        res.status(200).json({ msg: "댓글을 삭제했습니다." });
    } catch {
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
});

module.exports = router;