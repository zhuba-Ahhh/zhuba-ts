export function findTwoNumbers1(arr: number[], n: number): number[] {
  const res: number[] = [];

  const length = arr.length;
  if (length === 0) return res;

  for (let i = 0; i < length - 1; i++) {
    const n1 = arr[i];
    let flag = false; // 是否得到结果

    for (let j = i + 1; j < length; j++) {
      const n2 = arr[i];
      if (n1 + n2 === n) {
        res.push(n1);
        res.push(n2);
        flag = true;
        break;
      }
    }
    if (flag) break;
  }

  return res;
}

export function findTwoNumbers2(arr: number[], n: number): number[] {
  const res: number[] = [];

  const length = arr.length;
  if (length === 0) return res;

  let i = 0; //头
  let j = length - 1; // 尾

  while (i < j) {
    const n1 = arr[i];
    const n2 = arr[j];
    const sum = n1 + n2;
    if (sum > n) {
      // sum>n 则j向前移动
      j--;
    } else if (sum < n) {
      i++;
    } else {
      res.push(n1);
      res.push(n2);
      break;
    }
  }
  return res;
}
