// express를 사용하기 위해 npm으로 설치한 express를 가져온다
const express = require("express");

// 시간을 YYYY년MM월DD일월요일hh시mm분ss초 포맷으로 바꿔주는 기능을 가져온다 
const dateFormat = require("../utills/date.js");

// 라우터를 사용하기 위해 express의 Router를 router에 넣는다
const router = express.Router();

// Post 스키마를 사용하기 위해 가져온다
const Post = require("../schema/post.js");
const e = require("express");


// 데이터베이스와 통신을 완료가 되면 다음 코드를 실행할 수 있게 비동기 처리를 해준다
router.get("/posts", async (req, res) => {
    // post컬렉션에서 필요한 필드만 정해서 모두 가져오고 date를 내림차순으로 정렬한다
    const posts = await Post.find().select("user title date").sort({ "date": "desc" });

    // 정상적으로 데이터를 가져오면 상태코드 200과 가져온 게시글 정보를 JSON형태로 반환한다
    res.status(200).json({ data: posts });
});

router.post("/posts", async (req, res) => {
    try {
        // JSON형태로 받은 request를 객체 구조분해를 통해 각 변수에 넣는다
        const { user, password, title, content } = req.body

        // 데이터가 이상하게 들어오면 강제로 예외를 발생시킨다
        if (!user || !password || !title || !content) {
            throw e;
        }

        // user가 중복을 체크하기 위해 해당 user를 가져와 체크한다
        // 체크 후 있다면 상태코드 400과 실패 메시지를 반환하다
        const check_posts = await Post.find({ user: user });
        if (check_posts.length) {
            return res.status(400).json({ success: false, msg: "글 작성하는 아이디가 이미 존재합니다." });
        }

        // 위 예외처리를 통과했다면 정상적으로 post 컬렉션에 추가한다
        await Post.create({ user: user, password: Number(password), title: title, content: content, date: dateFormat(new Date()) });

        // 정상적으로 데이터를 추가했다면 상태코드 200과 성공 메시지를 반환한다
        res.status(200).json({ msg: "게시글을 작성했습니다." });
    } catch {
        // try catch를 통해서 파리미터나 request 데이터가 문제가 있다면 상태코드 400과 실패 메시지를 반환한다
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
});

router.get("/posts/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;

        // 파라미터로 받은 post_id를 통해 post_id를 가진 글을 가져온다
        // 가져오지 못하면 해당 post_id의 글은 없는 것으로 판단하고 상태코드 400과 실패 메시지를 반환하며 종료한다
        const post = await Post.findById(post_id).select("user title content date");
        if (!post) {
            return res.status(400).json({ msg: "해당 글을 찾을 수 없습니다." });
        }

        res.status(200).json({ msg: post });
    } catch {
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
});

router.put("/posts/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;
        const { password, title, content } = req.body;

        // 데이터가 이상하게 들어오면 강제로 예외를 발생시킨다
        if (!password || !title || !content) {
            throw e;
        }

        // 비밀번호를 체크하고 글이 존재하는지 파악하기 위해 password를 가져온다
        // password가 없다면 댓글이 없다고 판단하고 상태코드 400과 실패 메시지를 반환하며 종료한다
        const post = await Post.findById(post_id).select("password");
        if (!post) {
            return res.status(400).json({ msg: "해당 글을 찾을 수 없습니다." });
        }

        // password가 틀리면 상태코드 400과 실패 메시지를 반환하며 종료한다
        if (!(password === post.password)) {
            return res.status(400).json({ msg: "해당 비밀번호가 틀렸습니다." });
        }

        // 위 예외처리를 통과했으면 정상적으로 post컬렉션에 수정한다
        await Post.updateOne({ _id: post_id }, { $set: { title: title, content: content, date: dateFormat(new Date()) } });

        res.status(200).json({ msg: "게시글을 수정했습니다." });
    } catch {
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
});

router.delete("/posts/:post_id", async (req, res) => {
    try {
        const { post_id } = req.params;
        const { password } = req.body;
        if (!password) {
            throw e;
        }

        const post = await Post.findById(post_id).select("password");
        if (!post) {
            return res.status(400).json({ msg: "해당 글을 찾을 수 없습니다." });
        }

        if (!(password === post.password)) {
            return res.status(400).json({ msg: "해당 비밀번호가 틀렸습니다." });
        }

        await Post.deleteOne({ _id: post_id });

        res.status(200).json({ msg: "게시글을 삭제했습니다." });
    } catch {
        res.status(400).json({ msg: "데이터 형식이 올바르지 않습니다." });
    }
});

module.exports = router;