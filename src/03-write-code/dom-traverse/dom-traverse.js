/**
 *
 * 访问节点
 * @param {Node} n
 */
function visitNode(n) {
    var _a;
    if (n instanceof Comment) {
        // 注释
        console.info("Comment Node ---", n.textContent);
    }
    if (n instanceof Text) {
        // 文本
        var t = (_a = n.textContent) === null || _a === void 0 ? void 0 : _a.trim();
        if (t)
            console.info("Text Node ---", t);
    }
    if (n instanceof HTMLElement) {
        // element
        console.info("Element Node ---", "<".concat(n.tagName.toLocaleLowerCase(), ">"));
    }
}
/**
 *
 * 深度优先遍历 递归
 * @param {Node} root
 */
function depthFirstTraverse(root) {
    visitNode(root);
    var childNodes = root.childNodes; // .childNodes 和 .children 不一样
    if (childNodes.length) {
        childNodes.forEach(function (childNode) {
            depthFirstTraverse(childNode); // 递归
        });
    }
}
/**
 *
 * 深度优先遍历 非递归
 * @param {Node} root
 */
function depthFirstTraverse2(root) {
    var stack = [];
    // 根节点压栈
    stack.push(root);
    while (stack.length > 0) {
        var curNode = stack.pop();
        if (curNode == null)
            break;
        visitNode(curNode);
        // 子节点压栈
        var childNodes = curNode.childNodes;
        if (childNodes.length > 0) {
            // reverse 反顺序压栈
            Array.from(childNodes)
                .reverse()
                .forEach(function (childNode) { return stack.push(childNode); });
        }
    }
}
/**
 *
 * 广度优先搜索
 * @param {Node} root
 */
function breadthFirstTraverse(root) {
    var queue = []; // 数组 VS 链表
    // 根节点入队列
    queue.unshift(root);
    while (queue.length > 0) {
        var curNode = queue.pop();
        if (curNode == null)
            break;
        visitNode(curNode);
        // 子节点入队
        var childNodes = curNode.childNodes;
        if (childNodes.length) {
            childNodes.forEach(function (childNode) {
                queue.unshift(childNode);
            });
        }
    }
}
var box = document.getElementById("box");
if (box === null)
    throw new Error("Box is Null");
depthFirstTraverse(box);
depthFirstTraverse2(box);
breadthFirstTraverse(box);
