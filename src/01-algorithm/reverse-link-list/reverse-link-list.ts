export interface ILinkListNode {
  value: number;
  next?: ILinkListNode;
}

/**
 * 翻转单项链表,并返回翻转之后的 head node
 *
 */
export function reverseLinkList(listNode: ILinkListNode): ILinkListNode {
  // 定义三个指针
  let prevNode: ILinkListNode | undefined = undefined;
  let curNode: ILinkListNode | undefined = undefined;
  let nextNode: ILinkListNode | undefined = listNode;

  // 以nextNode为主,遍历链表
  while (nextNode) {
    // 第一个元素,删掉next ,防止循环引用
    if (curNode && !prevNode) {
      // @ts-ignore
      delete curNode.next;
    }

    // 反转指针
    if (curNode && prevNode) {
      // @ts-ignore
      curNode.next = prevNode;
    }

    // 整体向后移动指针
    prevNode = curNode;
    curNode = nextNode;
    nextNode = nextNode?.next;
  }
  // 最后一个的补充:当nextNode 为空时,此时curNode尚未设置next
  curNode!.next = prevNode;

  return curNode!;
}

/**
 * 根据数组创建 单向链表
 * @param arr
 */
export function createLinkList(arr: number[]): ILinkListNode {
  const length = arr.length;
  if (length === 0) throw new Error("arr is empty");

  let curNode: ILinkListNode = {
    value: arr[length - 1],
  };
  if (length === 1) return curNode;

  for (let i = length - 2; i >= 0; i--) {
    curNode = {
      value: arr[i],
      next: curNode,
    };
  }
  return curNode;
}
