// Tagged templates - 오른 쪽과 같은 형태로 출력하는 fmt 함수를 작성하시오.
const total = { price: 45000, vat: 4500 };
function fmt(string, won) {
    let [str0, str1] = string;
    return `${str0}: ${won.toLocaleString().padStart(8, " ")}원`;
}

console.log(fmt`주문합계: ${total.price}원`);
console.log(fmt`세액합계: ${total.vat}원`);
