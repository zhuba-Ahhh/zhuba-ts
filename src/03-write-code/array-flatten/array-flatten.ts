/**
 *
 * 数组扁平化 使用push
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function flatten1(arr: any[]): any[] {
  const res: any[] = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      item.forEach((item) => {
        res.push(item);
      });
    } else res.push(item);
  });

  return res;
}

// const arr = [2, [1, 2], [1, [2, [1]]]];
// console.log(flatten1(arr));

/**
 *
 * 数组扁平化 使用 concat
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function flatten2(arr: any[]): any[] {
  let res: any[] = [];

  arr.forEach((item) => {
    res = res.concat(item);
  });

  return res;
}
