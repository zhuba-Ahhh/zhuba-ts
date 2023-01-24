/*
### 将一个数组旋转k步
> 题目:
> 	- 输入一个数组[1,2,3,4,5,6,7]
> 	- k=3, 既旋转3步
> 	- 输出 [5,6,7,1,2,3,4]
 */

/**
 * 旋转数组 k 步 - 使用pop unshift
 * 时间复杂度  O(n²) 空间复杂度O(1)
 * @param arr
 * @param key
 * @returns
 */
export function rotate1(arr: number[], key: number): number[] {
  const length = arr.length;
  if (!key || length === 0) return arr;
  const step = Math.abs(key % length);

  // 问:为啥只有一次for循环,不是O(n),而是 O(n²)
  // 答:数组是一个有序结构(连续的内存空间),unshift操作非常慢.push是很快的
  // 所以相当于是for循环一个n,unshfit一个n,所以是n^2
  for (let a = 0; a < step; a++) {
    const n = arr.pop();
    if (n != null) {
      arr.unshift(n);
    }
  }
  return arr;
}

/**
 * 旋转数组k步 - 使用concat
 *  时间复杂度 O(1) 空间复杂度O(n)
 * @param arr
 * @param key
 * @returns
 */
export function rotate2(arr: number[], key: number): number[] {
  const length = arr.length;
  if (!key || length === 0) return arr;
  const step = Math.abs(key % length);

  const part1 = arr.slice(-step); // slice这个函数是不会动原数组的,所以时间复杂度还是O(1)
  const part2 = arr.slice(0, step);
  // const partRes= part1.concat(part2)
  return [...part1, ...part2];
}

// 性能测试

const arr1: number[] = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr1.push(i);
}
console.time("rotate1");
rotate1(arr1, 9 * 10000);
console.timeEnd("rotate1"); //800+ ms

const arr2: number[] = [];
for (let i = 0; i < 10 * 10000; i++) {
  arr2.push(i);
}
console.time("rotate2");
rotate2(arr1, 9 * 10000);
console.timeEnd("rotate2"); //1 ms

// 注意! 要识破内置API的时间复杂度(eg:unshift)
// 优先考虑时间复杂度!!!
// 比复杂度更重要的是代码逻辑清晰,易读
