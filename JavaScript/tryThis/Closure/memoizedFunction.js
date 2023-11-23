// Q. memoized Factorial 구현해보기 (O(N) -> O(logN))

// answer.
function memoized(fn) {
    let memoTable = {};
    return function (n) {
        console.log(memoTable);
        return memoTable[n] || (memoTable[n] = fn(n));
    };
}
const factorial = memoized(function (n) {
    if (n === 1) return 1;
    return n * factorial(n - 1);
});
console.log(factorial(3));
// 6
// { '1': 1, '2': 2, '3': 6 }
// { '1': 1, '2': 2, '3': 6 }
console.log(factorial(4));
// 24
// { '1': 1, '2': 2, '3': 6, '4': 24 }
// { '1': 1, '2': 2, '3': 6, '4': 24 }
// { '1': 1, '2': 2, '3': 6, '4': 24 }
// { '1': 1, '2': 2, '3': 6, '4': 24 }
console.log(factorial(7));
// 5040
