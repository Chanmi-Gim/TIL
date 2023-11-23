// user 객체를 받아서 id와 name을 출력하는 함수를 3개의 함수로 작성하시오.
// (Function signature를 3개 이상으로 표현하기)

const hong = { id: 1, name: "Hong" };
const lee = { id: 2, name: "Lee" };
// f1(hong);  f2
// ⇒ 1, 'Hong'
// console.log(id, name)

const printFn1 = (user) => console.log(`id: ${user.id}, name: ${user.name}`);
const printFn2 = ({ id, name }) => console.log(`id: ${id}, name: ${name}`);
const printFn3 = (id, name) => console.log(`id: ${id}, name: ${name}`);
const printFn4 = (...args) => {
    if (!args.length) return;
    const [{ id, name }] = args;
    console.log(`id: ${id}, name: ${name}`);
};

printFn1(hong);
printFn2(hong);
printFn3(hong.id, hong.name);
printFn4(hong);
