// Q. for문을 이용하여 다음과 같이 출력하는 제어문을 작성하시오.
// 0.1
// 0.2
// 0.3
// 0.4
// 0.5
// 0.6
// 0.7
// 0.8
// 0.9
// 1     ← optional (1.0도 OK)

// for (let i = 0.1; i < 1; i = i + 0.1) console.log(i); // 폰노이만 방식 때문에 깔끔하게 결과값 도출이 안됨
// 0.1
// 0.2
// 0.30000000000000004
// 0.4
// 0.5
// 0.6
// 0.7
// 0.7999999999999999
// 0.8999999999999999
// 0.9999999999999999

// Answer.
for (let i = 0.1; i < 1; i = i + 0.1) console.log(i.toFixed(1));
