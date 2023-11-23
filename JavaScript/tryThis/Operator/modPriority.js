const assert = require("assert");

// 산술연산자 중 %의 연산자 우선순위를 증명하시오. (vs +- vs */ vs **)
// % 우선순위는 +- 보다는 앞선다.
// % 우선순위는 */ 와는 같다.
// ** 우선순위는 % 보다 앞선다.

// 파일 저장시 자동완성됨 (괄호없이 계산한 결과값이 아래와 똑같으므로 우선순위를 증명할 수 있다.)
const a = 10;
const b = 4;
assert.strictEqual(3 + (a % b), 5);
assert.strictEqual((3 * a) % b, 2);
assert.strictEqual((a % b) * 3, 6);
assert.strictEqual(99 % a ** b, 99);
