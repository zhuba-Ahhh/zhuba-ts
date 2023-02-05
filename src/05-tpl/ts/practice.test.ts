/**
 * @description practice test
 */
import {
    rotateArray,
    matchBracket,
    MyQueue,
    ILinkList,
    createLinkList,
    reverseLinkList,
    MyQueneByLink,
    binarySearch,
    findTwoNumber,
} from "./practice";

describe("两数之和", () => {
    it("正常情况", () => {
        const arr = [1, 2, 4, 7, 11, 15];
        const res = findTwoNumber(arr, 15);
        expect(res).toEqual([4, 11]);
    });

    it("空数组", () => {
        const res = findTwoNumber([], 15);
        expect(res).toEqual([]);
    });

    it("找不到结果", () => {
        const arr = [1, 2, 4, 7, 11, 15];
        const res = findTwoNumber(arr, 100);
        expect(res).toEqual([]);
    });
});

// describe("二分查找", () => {
//     it("正常情况", () => {
//         const arr = [10, 20, 30, 40, 50, 60]
//         const res = binarySearch(arr, 50)
//         expect(res).toBe(4)
//     })

//     it("空数组", () => {
//         const res = binarySearch([], 50)
//         expect(res).toBe(-1)
//     })

//     it("找不到", () => {
//         const arr = [10, 20, 30, 40, 50, 60]
//         const res = binarySearch(arr, 70)
//         expect(res).toBe(-1)
//     })
// })

// describe("链表实现队列", () => {
//     it("add and length", () => {
//         const queue = new MyQueneByLink();
//         queue.add(100)
//         queue.add(200)
//         queue.add(300)
//         expect(queue.length).toBe(3)
//     })

//     it("delete", () => {
//         const queue = new MyQueneByLink();
//         expect(queue.delete()).toBeNull()

//         queue.add(100)
//         queue.add(200)
//         queue.add(300)

//         expect(queue.delete()).toBe(100)
//         expect(queue.delete()).toBe(200)
//         expect(queue.delete()).toBe(300)

//     })
// })

// describe("反转单向链表", () => {
//     it("单个元素", () => {
//         const arr = [100]
//         const list = createLinkList(arr)
//         const list1 = reverseLinkList(list)
//         expect(list1).toEqual({ value: 100 })
//     })

//     it("多个元素", () => {
//         const arr = [100, 200, 300]
//         const list = createLinkList(arr)
//         const list1 = reverseLinkList(list)
//         expect(list1).toEqual({
//             value: 300,
//             next: {
//                 value: 200,
//                 next: {
//                     value: 100
//                 }
//             }
//         })
//     })
// })

// describe("两个栈实现队列", () => {
//     it("正常情况", () => {
//         const queue = new MyQueue()
//         expect(queue.length).toBe(0)
//         queue.add(100)
//         expect(queue.length).toBe(1)
//         queue.add(200)
//         expect(queue.length).toBe(2)
//         queue.add(400)
//         expect(queue.length).toBe(3)
//     })

//     it("delete", () => {
//         const queue = new MyQueue()
//         expect(queue.delete()).toBeNull()
//         queue.add(300)
//         queue.add(400)
//         queue.add(500)
//         expect(queue.delete()).toBe(300)
//         expect(queue.delete()).toBe(400)
//         expect(queue.delete()).toBe(500)
//     })
// })

// describe("字符串是否括号匹配", () => {
//     it("正常情况", () => {
//         const str = "a{s[df(g)h]j}k"
//         const res = matchBracket(str)
//         expect(res).toBe(true)
//     })

//     it("不匹配", () => {
//         const str = "a{s[df(g)h]j}k)"
//         const res = matchBracket(str)
//         expect(res).toBe(false)
//     })

//     it("括号顺序不一致", () => {
//         const str = "({[)}]"
//         const res = matchBracket(str)
//         expect(res).toBe(false)
//     })

//     it("空字符串", () => {
//         const str = ""
//         const res = matchBracket(str)
//         expect(res).toBe(true)
//     })
// })

// describe("数组旋转 k 步", () => {
//     it("正常情况", () => {
//         const arr = [1, 2, 3, 4, 5, 6];
//         const res = rotateArray(arr, 2)
//         expect(res).toEqual([5, 6, 1, 2, 3, 4])
//     })

//     it("k 为 负", () => {
//         const arr = [1, 2, 3, 4, 5, 6];
//         const res = rotateArray(arr, -2)
//         expect(res).toEqual([5, 6, 1, 2, 3, 4])
//     })

//     it("数组为空", () => {
//         const res = rotateArray([], -2)
//         expect(res).toEqual([])
//     })

//     it("k 为 0", () => {
//         const arr = [1, 2, 3, 4, 5, 6];
//         const res = rotateArray(arr, 0)
//         expect(res).toEqual(arr)
//     })

//     it("k 不是数字", () => {
//         // const arr = [1, 2, 3, 4, 5, 6];
//         // // @ts-ignore
//         // const res = rotateArray(arr, 'abc')
//         // expect(res).toEqual(arr)

//         const arr = [1, 2, 3, 4, 5, 6, 7];
//         const k = "abc";
//         // @ts-ignore
//         const res = rotateArray(arr, k);
//         expect(res).toEqual(arr); // 断言
//     })
// })
