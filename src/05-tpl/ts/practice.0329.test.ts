/**
 * @description practice.0329 test
 */

import {
    fibonacci2,
    moveZero2,
    findContinuousChar1,
    findContinuousChar2,
    quickSort1,
    quickSort2,
    thousandsFormat2,
    switchLetterCase2,
} from "./practice.0329";

describe("切换字母大小写", () => {
    it("正常情况", () => {
        const str = "qwerTY123";
        const res = switchLetterCase2(str);
        expect(res).toBe("QWERty123");
    });

    it("空字符串", () => {
        const str = "";
        const res = switchLetterCase2(str);
        expect(res).toBe("");
    });

    it("非字母", () => {
        const str = "你好，世界";
        const res = switchLetterCase2(str);
        expect(res).toBe("你好，世界");
    });
});

// describe("数字千分位格式化", () => {
//     it("正常情况", () => {
//         const n = 1021001314
//         const res = thousandsFormat2(n)
//         expect(res).toBe("1,021,001,314")
//     })

//     it("小于1000", () => {
//         expect(thousandsFormat2(0)).toBe("0")
//         expect(thousandsFormat2(10)).toBe("10")
//         expect(thousandsFormat2(100)).toBe("100")
//     })
// })

// describe("对称数", () => {
//     it("正常情况", () => {
//         const res = findPalindromeNumbers3(200)
//         expect(res.length).toBe(28)
//     })

//     it("max 小于等于 0", () => {
//         const res = findPalindromeNumbers3(-1)
//         expect(res).toEqual([])
//     })
// })

// describe("快速排序", () => {
//     it("正常情况", () => {
//         const arr = [1, 4, 3, 1, 5, 89, 7, 6]
//         const res = quickSort2(arr)
//         expect(res).toEqual([1, 1, 3, 4, 5, 6, 7, 89])
//     })

//     it("空数组", () => {
//         const arr: number[] = []
//         const res = quickSort2(arr)
//         expect(res).toEqual([])
//     })

//     it("数组元素相同", () => {
//         const arr = [1, 1, 1, 1, 1, 1]
//         const res = quickSort2(arr)
//         expect(res).toEqual([1, 1, 1, 1, 1, 1])
//     })

//     it("数组含有负值", () => {
//         const arr = [1, 3, 2, -1, -2, 6, 9]
//         const res = quickSort2(arr)
//         expect(res).toEqual([-2, -1, 1, 2, 3, 6, 9])
//     })
// })

// describe("获取字符串中连续最多的字符及次数", () => {
//     it("正常情况", () => {
//         const str = "123eeeesdaaa11"
//         const res = findContinuousChar2(str)
//         expect(res).toEqual({ value: "e", count: 4 })
//     })

//     it("空字符串", () => {
//         const res = findContinuousChar2("")
//         expect(res).toEqual({ value: "", count: 0 })
//     })

//     it("无连续字符", () => {
//         const str = "123456"
//         const res = findContinuousChar2(str)
//         expect(res).toEqual({ value: "1", count: 1 })
//     })

//     it("全是连续字符", () => {
//         const str = "aaaaaa"
//         const res = findContinuousChar1(str)
//         expect(res).toEqual({ value: "a", count: 6 })
//     })
// })

// describe("移动 0 到数组末尾", () => {
//     it("正常情况", () => {
//         const arr = [1, 0, 3, 4, 0, 0, 0, 11, 0]
//         moveZero2(arr)
//         expect(arr).toEqual([1, 3, 4, 11, 0, 0, 0, 0, 0])
//     })

//     it("空数组", () => {
//         const arr: number[] = []
//         moveZero2(arr)
//         expect(arr).toEqual([])
//     })

//     it("没有 0", () => {
//         const arr = [1, 2, 3, 4, 5, 6]
//         moveZero2(arr)
//         expect(arr).toEqual([1, 2, 3, 4, 5, 6])
//     })

//     it("全是 0", () => {
//         const arr = [0, 0, 0, 0, 0, 0]
//         moveZero2(arr)
//         expect(arr).toEqual([0, 0, 0, 0, 0, 0])
//     })
// })

// describe("斐波那契数列", () => {
//     it("0 和 1", () => {
//         expect(fibonacci2(0)).toBe(0)
//         expect(fibonacci2(1)).toBe(1)
//     })

//     it("正常情况", () => {
//         expect(fibonacci2(2)).toBe(1)
//         expect(fibonacci2(3)).toBe(2)
//         expect(fibonacci2(6)).toBe(8)
//     })

//     it("小于0", () => {
//         expect(fibonacci2(-1)).toBe(0)
//     })
// })
