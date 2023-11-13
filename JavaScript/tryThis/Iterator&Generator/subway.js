const LINE2 = [
    "신도림",
    "성수",
    "신설동",
    "용두",
    "신답",
    "용답",
    "시청",
    "충정로",
    "아현",
    "이대",
    "신촌",
    "공항철도",
    "홍대입구",
    "합정",
    "당산",
    "영등포구청",
    "문래",
    "대림",
    "구로디지털단지",
    "신대방",
    "신림",
    "봉천",
    "서울대입구",
    "낙성대",
    "사당",
    "방배",
    "서초",
    "교대",
    "강남",
    "역삼",
    "선릉",
    "삼성",
    "종합운동장",
    "신천",
    "잠실",
    "잠실나루",
    "강변",
    "구의",
    "건대입구",
    "뚝섬",
    "한양대",
    "왕십리",
    "상왕십리",
    "신당",
    "동대문역사문화공원",
    "을지로4가",
    "을지로3가",
    "을지로입구",
];
class Subway {
    constructor(destination, arrival) {
        this.destination = LINE2.indexOf(destination);
        this.arrival = LINE2.indexOf(arrival);
    }

    [Symbol.iterator]() {
        let destination = this.destination;
        const arrival = this.arrival;
        const len = LINE2.length;
        let flag = false;
        return {
            next() {
                let value = destination++ % len;
                if (value === arrival + 1) flag = true;
                if (flag) value = len + 1;
                return { value: LINE2[value], done: flag };
            },
        };
    }
}
const routes = new Subway("문래", "신림");
const it1 = routes[Symbol.iterator]();
console.log([...routes]); // [ '문래', '대림', '구로디지털단지', '신대방', '신림' ]
console.log(it1.next()); // { value: '문래', done: false }
console.log(it1.next()); // { value: '신림', done: false }
console.log(it1.next()); // { value: '구로디지털단지', done: false }
console.log(it1.next()); // { value: '신대방', done: false }
console.log(it1.next()); // { value: '신림', done: false }
console.log(it1.next()); // { value: undefined, done: true }

const routes2 = new Subway("구로디지털단지", "성수");
console.log([...routes2]); // ['구로디지털단지', '신대방', ..., '성수']
console.log([...routes2].length); // 32개 정거장
const it2 = routes2[Symbol.iterator]();
console.log(it2.next()); // { value: '구로디지털단지', done: false }
console.log(it2.next()); // { value: '신대방', done: false }
console.log(it2.next()); // { value: '신림', done: false } ...

const routes3 = new Subway("을지로입구", "성수"); // 32개 정거장
console.log([...routes3]); // [ '을지로입구', '신도림', '성수' ]
console.log([...routes3].length); // 3정거장
const it3 = routes3[Symbol.iterator]();
console.log(it3.next()); // { value: '을지로입구', done: false }
console.log(it3.next()); // { value: '신도림', done: false }
console.log(it3.next()); // { value: '성수', done: false }
console.log(it3.next()); // { value: undefined, done: true }

const route4 = new Subway("문래", "합정"); // 46개 정거장이면 통과!
const it4 = route4[Symbol.iterator]();
while (true) {
    const x = it4.next();
    console.log(x);
    if (x.done) break;
}
console.log("===");
const route5 = new Subway("신도림", "을지로입구"); // 48개 정거장이면 통과!
console.log([...route5].length); // Error
