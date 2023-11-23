// 📌 블록 스코프인 const로 선언된 privateUser는 block를 벗어나는 순간 사라져야 하지만 user가 계속 참조하고 있기 때문에 사라지지 않고 남아 있다.
let user;
{
    const privateUser = { id: 1, name: "Hong" };
    user = privateUser;
}

user.age = 30;
console.log(user); // { id: 1, name: 'Hong', age: 30 }

// 📌 예시 2) 비순수함수를 클로저를 이용하여 순수함수로 만든다.
// 비순수함수 (외부변수 오염됨)
// let count = 0;
// function Counter1() {
//     count += 1;
//     return count;
// }
// console.log(Counter1());
// console.log(Counter1());
// console.log(Counter1());

// 순수함수
function Counter2() {
    let count = 0;
    return function () {
        count += 1;
        return count;
    };
}
const counter2 = Counter2();
console.log(counter2());
console.log(counter2());
console.log(counter2());

const counter2_1 = Counter2();
console.log(counter2_1());
