/**
 * 时间复杂度O(n)
 * 空间复杂度O(n)
 * @param str
 * @returns
 */
export function matchBracket(str: string): boolean {
  const length = str.length;
  if (length === 0) return true;

  const stack: string[] = [];

  let leftBrackets = "{([";
  let rightBrackets = "})]";

  for (let i = 0; i < length; i++) {
    const s = str[i];

    // 注 意 : 这里的includes的复杂度其实也是O(n),只不过他的数组是固定的,跟str参数无关,且很短
    if (leftBrackets.includes(s)) {
      // 左括号 压栈
      stack.push(s);
    } else if (rightBrackets.includes(s)) {
      // 右括号,判断站定是否匹配
      const top = stack[stack.length - 1];
      if (isMatch(top, s)) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}

function isMatch(left: string, right: string): boolean {
  if (left === "(" && right === ")") return true;
  if (left === "{" && right === "}") return true;
  if (left === "[" && right === "]") return true;
  return false;
}
