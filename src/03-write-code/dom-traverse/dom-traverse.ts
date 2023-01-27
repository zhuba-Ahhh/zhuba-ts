/**
 *
 * 访问节点
 * @param {Node} n
 */
function visitNode(n: Node) {
  if (n instanceof Comment) {
    // 注释
    console.info("Comment Node ---", n.textContent);
  }

  if (n instanceof Text) {
    // 文本
    const t = n.textContent?.trim();
    if (t) console.info("Text Node ---", t);
  }

  if (n instanceof HTMLElement) {
    // element
    console.info("Element Node ---", `<${n.tagName.toLocaleLowerCase()}>`);
  }
}
/**
 *
 * 深度优先遍历 递归
 * @param {Node} root
 */
function depthFirstTraverse(root: Node) {
  visitNode(root);

  const childNodes = root.childNodes; // .childNodes 和 .children 不一样
  if (childNodes.length) {
    childNodes.forEach((childNode) => {
      depthFirstTraverse(childNode); // 递归
    });
  }
}

/**
 *
 * 深度优先遍历 非递归
 * @param {Node} root
 */
function depthFirstTraverse2(root: Node) {
  const stack: Node[] = [];

  // 根节点压栈
  stack.push(root);

  while (stack.length > 0) {
    const curNode = stack.pop();
    if (curNode == null) break;

    visitNode(curNode);

    // 子节点压栈
    const childNodes = curNode.childNodes;
    if (childNodes.length > 0) {
      // reverse 反顺序压栈
      Array.from(childNodes)
        .reverse()
        .forEach((childNode) => stack.push(childNode));
    }
  }
}

/**
 *
 * 广度优先搜索
 * @param {Node} root
 */
function breadthFirstTraverse(root: Node) {
  const queue: Node[] = []; // 数组 VS 链表

  // 根节点入队列
  queue.unshift(root);

  while (queue.length > 0) {
    const curNode = queue.pop();
    if (curNode == null) break;

    visitNode(curNode);

    // 子节点入队
    const childNodes = curNode.childNodes;
    if (childNodes.length) {
      childNodes.forEach((childNode) => {
        queue.unshift(childNode);
      });
    }
  }
}

const box = document.getElementById("box");
if (box === null) throw new Error("Box is Null");
depthFirstTraverse(box);
depthFirstTraverse2(box);
breadthFirstTraverse(box);
