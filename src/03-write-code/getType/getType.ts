/**
 *
 * 获取详细的数据类型
 * @export
 * @param {*} x
 * @return {*}  {string}
 */
export function getType(x: any): string {
  // 1.通过 typeof 判断值类型和 function
  // 其余 Object 使用 instanceof 枚举

  // 2.
  const originType = Object.prototype.toString.call(x);
  const spaceIndex = originType.indexOf(" ");
  const type = originType.slice(spaceIndex + 1, -1);
  // 或者是 直接操作字符串效率高些 转换会有更多的消耗
  // const type = originType.split(" ")[1].split("]")[0];

  return type.toLowerCase();
}

// console.info(getType(null));
// console.info(getType(undefined));
// console.info(getType(100));
// console.info(getType("abc"));
// console.info(getType(true));
// console.info(getType(Symbol()));
// console.info(getType({}));
// console.info(getType([]));
// console.info(getType(() => {}));
