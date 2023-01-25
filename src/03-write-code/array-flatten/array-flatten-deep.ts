/**
 *
 * 数组扁平化 push
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function flattenDeep1(arr: any[]): any[] {
  const res: any[] = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep1(item);
      flatItem.forEach((n) => res.push(n));
    } else res.push(item);
  });

  return res;
}

// const arr = [2, [1, 2], ["b", ["a", [1]]]];
// console.log(flattenDeep1(arr));

/**
 *s
 * 数组扁平化 concat
 * @export
 * @param {any[]} arr
 * @return {*}  {any[]}
 */
export function flattenDeep2(arr: any[]): any[] {
  let res: any[] = [];

  arr.forEach((item) => {
    if (Array.isArray(item)) {
      const flatItem = flattenDeep2(item);
      res = res.concat(flatItem);
    } else res = res.concat(item);
  });

  return res;
}
