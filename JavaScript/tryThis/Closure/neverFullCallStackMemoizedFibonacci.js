// // 앞 장의 memoizedFibonacci를 CallStack이 풀 나지 않도록 하는 neverFullCallStack 함수를 만들어 보시오.
// // 스스로 다시 해보기

function memoized(fn) {
    const memoTable = {};
    return function (n) {
        return memoTable[n] || (memoTable[n] = fn(n));
    };
}

const memoizedFibonacci = memoized(function (n) {
    if (n <= 1) return n;
    return memoizedFibonacci(n - 2) + memoizedFibonacci(n - 1);
});

const MAX_CALLABLE = 2;
function neverFullCallStack(fn, n) {
    for (let i = 1; i <= Math.floor(n / MAX_CALLABLE); i += 1) {
        fn(i * MAX_CALLABLE);
    }
    return fn(n);
}
const result = neverFullCallStack(memoizedFibonacci, 10);
console.log(result);

// 만약, n이 100이라면, max로 나눠서 10회 반복
// fn(1 * 10) : 10까지 메모아이즈
// fn(2 * 10) : 10까지의 메모아이즈 사용하여 10~20까지 메모아이즈
// fn(3 * 10) : 20까지의 메모아이즈 사용하여 20~30까지 메모아이즈
// ....
// fn(10 * 10) : 90까지의 메모아이즈 사용하여 100까지 메모아이즈
