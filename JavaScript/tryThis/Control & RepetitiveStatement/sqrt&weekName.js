// Q1. 1 ~ 10 사이의 정수에 대해 제곱근이면서 무리수인 수를 소숫점 3자리까지 출력하시오. 예) 2:1.414… 7:2.646… 10:3.162
// answer. 제곱근이 정수로 떨어지지 않으면 무리수이다.
for (let i = 1; i <= 20; i += 1) {
    if (Math.sqrt(i) % 1 !== 0) console.log(i, Math.sqrt(i).toFixed(3));
}

// Q2. 오늘 날짜의 요일을 출력하는 switch문을 사용해서 작성해 보고, switch문을 사용하지 않은 더 간단한 방법도 찾아보세요.
// 출력 : "오늘은 금요일입니다.""  (또는 일월화수목금토)

// answer1. switch문으로 작성
// - 입력값 : 현재 요일 번호이므로 번호에 따른 요일 매칭 필요
// - 배운점 : Date의 getDay() : 0부터 시작 (일요일 = 0, 월요일 = 1, 화요일 = 2, 수요일 =3, 목요일 = 4, 금요일 = 5, 토요일 = 6)
const printDayWithSwitch = () => {
    const today = new Date().getDay();
    switch (today) {
        case 1:
            return "월";
        case 2:
            return "화";
        case 3:
            return "수";
        case 4:
            return "목";
        case 5:
            return "금";
        case 6:
            return "토";
        case 7:
            return "일";
    }
};
console.log(`오늘은 ${printDayWithSwitch()}요일 입니다.`); //오늘은 목요일 입니다.

// answer2. switch문을 사용하지 않은 방법으로 작성
const Day = ["일", "월", "화", "수", "목", "금", "토"];
const printDay = () => {
    const today = new Date().getDay();
    console.log(`오늘은 ${Day[today]}요일입니다.`); // 오늘은 목요일입니다.
};
printDay();
