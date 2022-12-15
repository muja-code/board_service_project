// 시간을 2022년12월15일20시07분00초의 포맷으로 바꾸는 기능
function dateFormat(date) {
    // new Date()로 시간을 만들면 요일부분이 숫자로 나와서 해당하는 인덱스의 요일을 뽑을 수 있게 요일 리스트를 준비
    const day = ['일', '월', '화', '수', '목', '금', '토'];

    // Date() 객체에서 제공하는 메서드를 이용해서 각 해당하는 값을 뽑아와 문자열로 합친다
    // 월부분은 1씩 부족하게 나오기 때문에 +1을 해서 월을 맞춘다
    const dateFormat = date.getFullYear() + "년" + (date.getMonth() + 1) + "월"
        + date.getDate() + "일" + day[date.getDay()] + "요일"
        + date.getHours() + "시" + date.getMinutes() + "분"
        + date.getSeconds() + "초";

    // 만든 날짜의 문자열을 반환해준다
    return dateFormat;
}

module.exports = dateFormat;