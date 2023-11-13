// ex1) 1 ~ 10 사이의 정수에 대해 제곱근을 소숫점 3자리까지 출력하시오.
// Math.sqrt() 사용, 무리수만 출력!
// 2 1.414…7 2.646…10 3.162
for (let i = 1; i <= 10; i += 1) console.log(i, Math.sqrt(i));

// ex2) 오늘 날짜의 요일을 출력하는 switch문을 사용해서 작성해 보고, switch문을 사용하지 않은 더 간단한 방법도 찾아보세요.
// const today = new Date();  today.getDay(); // 요일번호
// 오늘은 금요일입니다.  (일월화수목금토)
const printDay = () => {
    const Day = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date();
    const d = today.getDay();
    console.log(`오늘은 ${Day[d]}요일입니다.`);
};
printDay();
