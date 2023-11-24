/**
 * 피보나치 수열을 memoized하여 출력하는 함수를 작성해 보세요.
 * 수열의 규칙은 f(n) = f(n - 2) + f(n - 1)  (단, n <= 1 일 때 f(n) = n)
 * 즉, 0 ~ 9까지의 값은 각각 [0, 1, 1, 2, 3, 5, 8, 13, 21, 34] 이다.
 * */

// answer) 1.일반함수, 2.recursive, 3.memoized

// 📌 일반함수로 만든 Fibonacci
function fibonacci(n) {
    const arr = [0, 1];
    if (n <= 1) return n;
    for (let i = 2; i <= n; i++) arr[i] = arr[i - 2] + arr[i - 1];
    return arr[n];
}
console.time("LOOP");
console.log(fibonacci(3));
console.log(fibonacci(15));
console.log(fibonacci(50));
console.timeEnd("LOOP"); // LOOP: 9.115ms
console.log("------------------");

// 📌 recursive Fibonacci
let rcnt = 0;
function fibonacciByRecursive(n) {
    rcnt += 1;
    if (n <= 1) return n;
    return fibonacciByRecursive(n - 2) + fibonacciByRecursive(n - 1);
}
console.time("RECUR");
console.log(fibonacciByRecursive(3));
console.log(fibonacciByRecursive(15));
console.log(fibonacciByRecursive(50));
console.timeEnd("RECUR");
console.log("------------------", rcnt);

// 📌 memoized Fibonacci
function memoized(fn) {
    const memoizedTable = {};
    return function (k) {
        return memoizedTable[k] || (memoizedTable[k] = fn(k));
    };
}
let mcnt = 0;
const memoizedFibonacci = memoized(function (n) {
    mcnt += 1;
    if (n <= 1) return n;
    return memoizedFibonacci(n - 2) + memoizedFibonacci(n - 1);
});

console.time("MemoFIBO");
console.log(memoizedFibonacci(3));
console.log(memoizedFibonacci(15));
console.log(memoizedFibonacci(50));
console.timeEnd("MemoFIBO"); // MemoFIBO: 0.387ms
console.log("------------------", mcnt);
