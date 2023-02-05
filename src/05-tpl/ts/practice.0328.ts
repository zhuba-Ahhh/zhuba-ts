/**
 * @description 判断字符串是否括号匹配
 * @param str
 */
function isMatch(top: string, end: string): boolean {
    if (top === "(" && end === ")") return true;
    if (top === "[" && end === "]") return true;
    if (top === "{" && end === "}") return true;
    return false;
}
function matchBracket(str: string): boolean {
    let flag = true;
    const length = str.length;
    if (length === 0) return flag;

    const stack: string[] = [];
    const leftBracket = "([{";
    const rightBracket = "}])";

    for (let i = 0; i < length; i++) {
        const s = str[i];
        if (leftBracket.includes(s)) {
            stack.push(s);
        } else if (rightBracket.includes(s)) {
            const top = stack.pop();
            if (!top || !isMatch(top, s)) {
                flag = false;
                break;
            }
        }
    }

    return flag;
}

const str = "";
console.info(matchBracket(str));
