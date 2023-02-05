/**
 * @description 复习第三章
 * 3.1 二叉搜索树 三种遍历、第 K 小值
 * 3.5：斐波那契数列
 * 3.8：移动 0 到数组末尾（在原数组上操作）
 * 3.10：获取字符串中连续最多的字符及次数
 * 3.13：快速排序
 * 3.15：1-10000之间的对称数
 * 3.18：数字千分位格式化
 * 3.20：切换字母大小写
 */

/**
 * 切换字母大小写
 * @param str
 */
export function switchLetterCase1(str: string): string {
    const length = str.length;

    const upReg = /[A-Z]/;
    const lowReg = /[a-z]/;

    let res = "";

    for (let i = 0; i < length; i++) {
        const char = str[i];
        if (upReg.test(char)) {
            res += char.toLowerCase();
        } else if (lowReg.test(char)) {
            res += char.toUpperCase();
        } else {
            res += char;
        }
    }

    return res;
}
export function switchLetterCase2(str: string): string {
    const length = str.length;

    let res = "";

    for (let i = 0; i < length; i++) {
        const char = str[i];
        const code = char.charCodeAt(0);

        if (code >= 65 && code <= 90) {
            res += char.toLowerCase();
        } else if (code >= 97 && code <= 122) {
            res += char.toUpperCase();
        } else {
            res += char;
        }
    }

    return res;
}

const str = "qwerTY123";
console.info(switchLetterCase1(str));
console.info(switchLetterCase2(str));

/**
 *  数字千分位格式化
 */
export function thousandsFormat1(number: number): string {
    number = Math.floor(number); // 只考虑整数
    const s = number.toString();

    const arr = s.split("").reverse();
    return arr.reduce((prev, cur, index) => {
        if (index % 3 === 0 && index !== 0) {
            return cur + "," + prev;
        } else {
            return cur + prev;
        }
    }, "");
}
export function thousandsFormat2(number: number): string {
    number = Math.floor(number); // 只考虑整数
    const s = number.toString();
    const length = s.length;

    let res = "";
    for (let i = length - 1; i >= 0; i--) {
        if ((length - i) % 3 === 0 && i !== 0) {
            res = "," + s[i] + res;
        } else {
            res = s[i] + res;
        }
    }

    return res;
}

// const number = 1066008900999
// console.info(thousandsFormat1(number))
// console.info(thousandsFormat2(number))

/**
 * 1-10000之间的对称数
 * @param max
 * @returns
 */
export function findPalindromeNumbers1(max: number): number[] {
    const res: number[] = [];
    if (max <= 0) return res;

    for (let i = 1; i <= max; i++) {
        const s = i.toString();
        const arr = s.split("");
        arr.reverse();
        if (s === arr.join("")) {
            res.push(i);
        }
    }

    return res;
}

export function findPalindromeNumbers2(max: number): number[] {
    const res: number[] = [];
    if (max <= 0) return res;

    for (let i = 1; i <= max; i++) {
        const s = i.toString();
        const length = s.length;
        let startIndex = 0;
        let endIndex = length - 1;
        let flag = true;
        while (startIndex < endIndex) {
            if (s[startIndex] === s[endIndex]) {
                startIndex++;
                endIndex--;
            } else {
                flag = false;
                break;
            }
        }
        if (flag) res.push(i);
    }

    return res;
}

export function findPalindromeNumbers3(max: number): number[] {
    const res: number[] = [];

    for (let i = 1; i <= max; i++) {
        // 123
        let n = i;
        let rev = 0; // 生成的反转数
        while (n > 0) {
            rev = rev * 10 + (n % 10);
            n = Math.floor(n / 10);
        }

        if (rev === i) res.push(i);
    }

    return res;
}

// console.info(findPalindromeNumbers1(200))
// console.info(findPalindromeNumbers2(200))
// console.info(findPalindromeNumbers3(200))

/**
 * 快速排序(splice)
 */
export function quickSort1(arr: number[]): number[] {
    const length = arr.length;
    if (length === 0) return arr;

    const midIndex = Math.floor(length / 2);
    const midValue = arr.splice(midIndex, 1)[0];

    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (temp < midValue) {
            left.push(temp);
        } else {
            right.push(temp);
        }
    }

    return quickSort1(left).concat([midValue], quickSort1(right));
}

export function quickSort2(arr: number[]): number[] {
    const length = arr.length;
    if (length === 0) return arr;

    const midIndex = Math.floor(length / 2);
    // const midValue = arr.slice(midIndex, midIndex + 1)[0]
    const midValue = arr[midIndex];

    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < length; i++) {
        if (i !== midIndex) {
            const temp = arr[i];
            if (temp < midValue) {
                left.push(temp);
            } else {
                right.push(temp);
            }
        }
    }

    return quickSort2(left).concat([midValue], quickSort2(right));
}

// const sortArr = [3, 4, 6, 9, 1, 6, 4, 8, 7, 9]
// const sortArr2 = [3, 4, 6, 9, 1, 6, 4, 8, 7, 9]
// console.info(quickSort1(sortArr))
// console.info(quickSort2(sortArr2))

/**
 * 获取字符串中连续最多的字符及次数
 */
interface IRes {
    value: string;
    count: number;
}
export function findContinuousChar1(str: string): IRes {
    const res: IRes = {
        value: "",
        count: 0,
    };

    let tempCount = 0;
    const length = str.length;
    if (length === 0) return res;

    for (let i = 0; i < length; i++) {
        tempCount = 0;
        for (let j = i; j < length; j++) {
            if (str[i] === str[j]) {
                tempCount++;
            }
            if (str[i] !== str[j] || j === length - 1) {
                if (tempCount > res.count) {
                    res.value = str[i];
                    res.count = tempCount;
                }
                if (i < length - 1) {
                    i = j - 1;
                    break;
                }
            }
        }
    }

    return res;
}
// 双指针
export function findContinuousChar2(str: string): IRes {
    const res: IRes = {
        value: "",
        count: 0,
    };
    const length = str.length;
    if (length === 0) return res;

    let i = 0;
    let j = i;
    let tempCount = 0;

    for (; i < length; i++) {
        if (str[i] === str[j]) {
            tempCount++;
        }
        if (str[i] !== str[j] || i === length - 1) {
            if (tempCount > res.count) {
                res.value = str[j];
                res.count = tempCount;
            }
            tempCount = 0;
            if (i < length - 1) {
                j = i;
                i--;
            }
        }
    }

    return res;
}

// let str = "";
// for (let i = 0; i < 100 * 10000; i++) {
//     str += i.toString()
// }
// console.time("findContinuousChar1")
// console.info(findContinuousChar1(str))
// console.timeEnd("findContinuousChar1")

// console.time("findContinuousChar1")
// console.info(findContinuousChar2(str))
// console.timeEnd("findContinuousChar1")

// 移动 0 到数组末尾（在原数组上操作）
export function moveZero1(arr: number[]): void {
    const length = arr.length;
    if (length === 0) return;

    let zeroLength = 0;

    for (let i = 0; i < length - zeroLength; i++) {
        if (arr[i] === 0) {
            arr.splice(i, 1);
            arr.push(0);
            zeroLength++;
            i--;
        }
    }
}

export function moveZero2(arr: number[]): void {
    const length = arr.length;
    if (length === 0) return;

    let i = 0;
    let j = -1;
    for (; i < length; i++) {
        if (arr[i] === 0 && j < 0) {
            j = i;
        }

        if (arr[i] !== 0 && j >= 0) {
            const temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            j++;
        }
    }
}

// const arr2 = [1, 0, 0, 2, 0, 0, 0, 3, 0, 4, 5, 6]
// moveZero2(arr2)
// console.info("arr2: ", arr2)

interface ITreeNode {
    key: number;
    left: ITreeNode | null;
    right: ITreeNode | null;
}
const arr: number[] = [];
// 中序遍历
export function inOrderTraverse(node: ITreeNode | null) {
    if (node != null) {
        inOrderTraverse(node.left);
        arr.push(node.key);
        inOrderTraverse(node.right);
    }
}
// 前序遍历
export function preOrderTraverse(node: ITreeNode | null) {
    if (node != null) {
        console.log(node.key);
        preOrderTraverse(node.left);
        preOrderTraverse(node.right);
    }
}
// 后序遍历
export function postOrderTraverse(node: ITreeNode | null) {
    if (node != null) {
        postOrderTraverse(node.left);
        postOrderTraverse(node.right);
        console.log(node.key);
    }
}
const tree: ITreeNode = {
    key: 5,
    left: {
        key: 3,
        left: {
            key: 2,
            left: null,
            right: null,
        },
        right: {
            key: 4,
            left: null,
            right: null,
        },
    },
    right: {
        key: 7,
        left: {
            key: 6,
            left: null,
            right: null,
        },
        right: {
            key: 8,
            left: null,
            right: null,
        },
    },
};
export function findKThValue(node: ITreeNode, k: number): number | null {
    inOrderTraverse(node);
    console.log(arr);

    return arr[k - 1] || null;
}

/**
 *
 * @param n number
 * @returns
 */
export function fibonacci1(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;

    return fibonacci1(n - 2) + fibonacci1(n - 1);
}
export function fibonacci2(n: number): number {
    if (n <= 0) return 0;
    if (n === 1) return 1;

    let n1 = 1; // n - 1 的值
    let n2 = 0; // n - 2 的值
    let res = 0;

    for (let i = 2; i <= n; i++) {
        res = n2 + n1;
        n2 = n1;
        n1 = res;
    }

    return res;
}

// console.time("fibonacci1")
// console.info(fibonacci1(10))
// console.timeEnd("fibonacci1")

// console.time("fibonacci2")
// console.info(fibonacci2(100))
// console.timeEnd("fibonacci2")
