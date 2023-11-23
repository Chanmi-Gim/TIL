// 다음과 같이 작동하는 bill 함수를 클로저를 이용하여 작성하시오
// =====================
// * 짜장
// 공급가액 :      7,000
// 부가세액 :        636
// ---------------------
// * 짬뽕
// 공급가액 :      9,900
// 부가세액 :        900
// ---------------------
// * 탕슉
// 공급가액 :     25,000
// 부가세액 :          0
// ---------------------
// 주문합계 :     41,900
// 세액합계 :      1,536
// =====================

// answer.
/**
 * @returns {object} : order와 printBill 함수를 가진 객체
 * order: 주문하면 주문개수 추가 amount가 이미 존재하면 +1 , 없으면 1 설정.
 * printBill : 1. 주문합계/세액합계를 출력하는 form을 미리 생성
 *             2. 반복문을 이용하여 주문개수가(amount) 존재하면 form의 중간에 주문내역 form 추가 및 주문합계/세액합계에 반영
 */
function bill() {
    const MENU = {
        짜장: { price: 7000 },
        짬뽕: { price: 9900 },
        탕슉: { price: 25000, taxfree: 1 },
    };
    return {
        /**
         * @param { string } str : 짜장, 짬뽕, 탕슉 중의 메뉴 1개
         */
        order(str) {
            MENU[str]["amount"] = MENU[str]["amount"] + 1 || 1;
        },
        /**
         * bills print
         */
        printBill() {
            let orderTotal = 0,
                taxTotal = 0,
                addForm = "";
            for (const name in MENU) {
                if (MENU[name]["amount"]) {
                    let [amount, price] = [MENU[name]["amount"], MENU[name]["price"]];
                    let tax = 0;
                    if (!MENU[name]["taxfree"]) tax += amount * Math.round((price / 1.1) * 0.1);
                    addForm += `\n* ${name} \n주문수량 : ${amount.toLocaleString().padStart(10, " ")} \n공급가액 : ${(
                        price * amount
                    )
                        .toLocaleString()
                        .padStart(10, " ")} \n부가세액 : ${tax.toLocaleString().padStart(10, " ")} \n${"-".repeat(21)}`;
                    orderTotal += amount * price;
                    taxTotal += tax;
                }
            }
            let form = `${"=".repeat(21)}${addForm} \n주문합계 : ${orderTotal
                .toLocaleString()
                .padStart(10, " ")} \n세액합계 : ${taxTotal.toLocaleString().padStart(10, " ")} \n${"=".repeat(21)}`;
            console.log(form);
        },
    };
}
const table1 = bill();
console.log(table1);
table1.order("짜장");
table1.order("짬뽕");
// table1.order("탕슉");
table1.printBill();
