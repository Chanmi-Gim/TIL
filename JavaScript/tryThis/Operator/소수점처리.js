// ex1) for문을 이용하여 다음과 같이 출력하는 제어문을 작성하시오.
for (let i = 0.1; i < 1; i = i + 0.1) console.log(i.toFixed(1));
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

// 폰노이만 방식 때문에 깔끔하게 결과값 도출이 안됨
// for (let i = 0.1; i < 1; i = i + 0.1) console.log(i);
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

// ex2) 소숫점 5자리까지 입력가능하고, 이 값에 0.1을 더해서 결과를 출력하려 한다.
// 사용자가 0.21354 를 입력했을 때 정확한 값(0.31354)을 출력하시오.
// 0.21354 + 0.1; // 0.31354000000000004

console.log(0.21354 + 0.1);
console.log((0.21354 * 100000 + 0.1 * 100000) / 100000);
console.log((0.21354 + 0.1).toFixed(5));

function addPoint(x, y) {
    const ex = x.toString().length - 2;
    const ey = y.toString().length - 2;
    const e = ex > ey ? ex : ey;
    console.log(ex, ey, e);
    return Number((x + y).toFixed(e));
}

console.log("result =", addPoint(0.21354, 0.1));
console.log("result =", addPoint(0.17, 0.28));
