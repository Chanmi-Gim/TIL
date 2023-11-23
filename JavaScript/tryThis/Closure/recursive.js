// Q. 1 ~ 10까지의 원소로 이루어진 배열을 만드는 함수를 재귀함수와 TCO로 작성하시오. (단, array 메소드 사용하지 말고, destructuring을 사용하시오)
// - makeArray(10);   //[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// - makeArrayTco(5); //[1, 2, 3, 4, 5]

// answer.
function makeArray(n) {
    if (n === 1) return [1];
    return [...makeArray(n - 1), n];
}
console.log(makeArray(10));

function makeArrayTco(n, acc = []) {
    if (n === 1) return [1, ...acc];
    return makeArrayTco(n - 1, [n, ...acc]);
}
console.log(makeArrayTco(5)); //[1, 2, 3, 4, 5]
