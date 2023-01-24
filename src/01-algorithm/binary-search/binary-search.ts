export function binarySearch1(arr: number[], target: number): number {
  const length = arr.length;
  if (length === 0) return -1;

  let startIndex = 0; // 开始位置
  let endIndex = length - 1; // 结束位置

  while (startIndex <= endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    const midValue = arr[midIndex];
    if (target > midValue) {
      // 在右侧
      startIndex = midIndex + 1;
    } else if (target < midValue) {
      // 在左侧
      endIndex = midIndex - 1;
    } else {
      return midIndex;
    }
  }
  return -1;
}

export function binarySearch2(
  arr: number[],
  target: number,
  startIndex?: number,
  endIndex?: number
): number {
  const length = arr.length;
  if (length === 0) return -1;

  // 开始和结束的范围
  if (startIndex == null) startIndex = 0;
  if (endIndex == null) endIndex = length - 1;

  // 递归出口1:start和end相遇,则结束
  if (startIndex > endIndex) return -1;

  const midIndex = Math.floor((startIndex + endIndex) / 2);
  const midValue = arr[midIndex];

  if (target > midIndex) {
    // 在右侧
    return binarySearch2(arr, target, startIndex, midIndex + 1);
  } else if (target < midIndex) {
    // 在左侧
    return binarySearch2(arr, target, startIndex, midIndex + 1);
  } else {
    // 递归出口2:找到了!
    return midIndex;
  }
}
