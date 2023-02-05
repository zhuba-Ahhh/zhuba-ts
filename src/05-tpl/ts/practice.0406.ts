/**
 * @description
 * 数组旋转 k 步
 * 判断字符串是否括号匹配
 * 两个栈实现一个队列
 * 反转单向链表
 * 链表和数组那个实现队列更好
 */

interface ILinkList {
    value: number | null;
    next: ILinkList | null;
}
export function reverseLinkList(linkList: ILinkList): ILinkList {
    let preNode = null;
    let curNode = linkList;
    let nextNode = linkList.next;

    while (nextNode) {
        if (curNode && !preNode) {
            curNode.next = null;
        }

        if (curNode && preNode) {
            curNode.next = preNode;
        }

        preNode = curNode;
        curNode = nextNode;
        nextNode = nextNode.next;
    }

    curNode.next = preNode;

    return curNode;
}
export function createLinkList(arr: number[]): ILinkList | null {
    const length = arr.length;
    if (length === 0) throw new Error("arr is empty");

    let res: ILinkList = {
        value: arr[length - 1],
        next: null,
    };

    if (length === 1) return res;

    for (let i = length - 2; i >= 0; i--) {
        res = {
            value: arr[i],
            next: res,
        };
    }

    return res;
}
const arr = [1, 2, 3, 4, 5];
const link = createLinkList(arr);
console.info(link);
const newLink = reverseLinkList(link!);
console.info(newLink);

// 两个栈实现一个队列
export class MyQueue {
    private stack1: number[] = [];
    private stack2: number[] = [];

    add(n: number) {
        this.stack1.push(n);
    }
    delete() {
        let res;
        while (this.stack1.length) {
            const number = this.stack1.pop();
            if (number) {
                this.stack2.push(number);
            }
        }
        res = this.stack2.pop();

        while (this.stack2.length) {
            const number = this.stack2.pop();
            if (number) {
                this.stack1.push(number);
            }
        }
        return res;
    }
    get length() {
        return this.stack1.length;
    }
}

// const queue = new MyQueue()
// console.info(queue.length)
// queue.add(100)
// queue.add(200)
// queue.add(300)
// console.info(queue.length)
// console.info(queue.delete())
// console.info(queue.delete())
// console.info(queue.length)

// 判断字符串是否括号匹配
function isMatch(left: string, right: string): boolean {
    if (left === "(" && right === ")") return true;
    if (left === "[" && right === "]") return true;
    if (left === "{" && right === "}") return true;
    return false;
}
export function matchBracket(str: string): boolean {
    let res = true;
    const length = str.length;

    const stack: string[] = [];
    const leftSymbols = "([{";
    const rightSymbols = ")]}";

    for (let i = 0; i < length; i++) {
        const char = str[i];
        if (leftSymbols.includes(char)) {
            stack.push(char);
        } else if (rightSymbols.includes(char)) {
            const top = stack.pop();
            if (!top || !isMatch(top, char)) {
                res = false;
                break;
            }
        }
    }

    return res;
}

// const str = "{1{2}333}()[([)]]"
// console.info(matchBracket(str))

// 数组旋转 k 步
export function rotateArray(arr: number[], k: number): number[] {
    const length = arr.length;
    if (!k || length === 0) return arr;

    const step = Math.abs(k % length);

    const part1 = arr.splice(length - step);
    const part2 = arr.splice(0, length - step);
    const part3 = part1.concat(part2);

    return part3;
}

// const arr = [1, 2, 3, 4, 5]
// console.info(rotateArray(arr, 4))
