/**
 *
 * 快排
 * @export
 * @param {Array<number>} arr
 * @return {*}  {Array<number>}
 */
export default function quickSort(arr: Array<number>): Array<number> {
  const l = arr.length;
  if (l < 2) return arr;

  const left: Array<number> = [],
    right: Array<number> = [],
    current = arr.splice(0, 1)[0];

  for (const num of arr) {
    if (num > current) right.push(num);
    else left.push(num);
  }

  return quickSort(left).concat(current, quickSort(right));
}

const arr = [1, 2, 1, 2, 3, 4, 1, 2];
console.log(quickSort(arr));
