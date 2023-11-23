// Q. 소숫점 5자리까지 입력가능하고, 이 값에 0.1을 더해서 결과를 출력하려 한다.
// 사용자가 0.21354 를 입력했을 때 정확한 값(0.31354)을 출력하시오.

// answer1.
console.log("보정전 값:", 0.21354 + 0.1);
console.log("보정후 값:", (0.21354 * 100000 + 0.1 * 100000) / 100000);
console.log("보정전 값:", (0.21354 + 0.1).toFixed(5));

// answer2.
function addPoint(x, y) {
    const ex = x.toString().length - 2;
    const ey = y.toString().length - 2;
    const e = ex > ey ? ex : ey;
    return Number((x + y).toFixed(e));
}

console.log("result =", addPoint(0.21354, 0.1));
console.log("result =", addPoint(0.17, 0.28));
