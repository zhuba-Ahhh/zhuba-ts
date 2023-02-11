// 不使用Map 而是双向链表

interface IListNode {
  value: any;
  key: string; // 存储 key, 方便删除(否则删除时就需要遍历对象)
  prev?: IListNode;
  next?: IListNode;
}

export class LRUCache {
  private length: number;
  private data: { [key: string]: IListNode } = {};
  private dataLength: number = 0;
  private listHead: IListNode | null = null;
  private listTail: IListNode | null = null;

  constructor(length: number) {
    if (length < 1) throw new Error("invalid length");
    this.length = length;
  }

  private moveToTail(curNode: IListNode) {
    const tail = this.listTail;
    if (tail === curNode) return;

    // 1. 断绝prevNode、nextNode 断绝与 curNode 的关系
    const prevNode = curNode.prev;
    const nextNode = curNode.next;
    if (prevNode) {
      if (nextNode) {
        prevNode.next = nextNode;
      } else {
        delete prevNode.next;
      }
    }

    if (nextNode) {
      if (prevNode) {
        nextNode.prev = prevNode;
      } else {
        delete nextNode.prev;
      }

      if (this.listHead === curNode) this.listHead = nextNode;
    }

    // 2. 让curNode断绝与prevNode建立的关系
    delete curNode.prev;
    delete curNode.next;

    // 3. 在list的末尾重新建立curNode的关系
    if (tail) {
      tail.next = curNode;
      curNode.prev = tail;
    }
    this.listTail = curNode;
  }

  private tryClean() {
    while (this.dataLength > this.length) {
      const head = this.listHead;
      if (head == null) throw new Error("head is null");
      const headNext = head.next;
      if (headNext == null) throw new Error("headNext is null");

      // 1. 断绝head和next的关系
      delete headNext.prev;
      delete head.next;

      // 2. 重新赋值 listHead
      this.listHead = headNext;

      // 3. 清理 data 并 重新计数
      delete this.data[head.key];
      this.dataLength = this.dataLength - 1;
    }
  }

  set(key: string, value: any): any {
    const data = this.data;
    const curNode = data[key];

    if (curNode == null) {
      // 新增数据
      const newNode: IListNode = { key, value };
      // 移动到末尾
      this.moveToTail(newNode);

      data[key] = newNode;
      this.dataLength++;

      if (this.dataLength === 1) this.listHead = newNode;
    } else {
      // 修改现有数据
      curNode.value = value;
      // 移动到末尾
      this.moveToTail(curNode);
    }

    // 长度清理 如果超出长度清理
    this.tryClean();
  }
  get(key: string): any {
    const data = this.data;
    const curNode = data[key];

    if (curNode == null) return null;

    if (this.listTail === curNode) {
      // 本身就在末尾就是最新鲜的,直接返回 value
      return curNode.value;
    }

    // curNode 移到末尾
    this.moveToTail(curNode);

    return curNode.value;
  }
}

const lruChche = new LRUCache(2);
lruChche.set("1", 1); // {1=1}
lruChche.set("2", 2); // {1=1, 2=2}
console.log(lruChche.get("1")); // 1 {2=2, 1=1}
lruChche.set("3", 3); // {1=1, 3=3}
console.log(lruChche.get("2")); // null
lruChche.set("4", 4); // {3=3, 4=4}
console.log(lruChche.get("1")); // null
console.log(lruChche.get("3")); // 3 {4=4, 3=3}
console.log(lruChche.get("4")); // 4 {3=3, 4=4}
