/**
 * LRU 最近未使用算法
 * 使用哈希表存储数据，get、set才够快 O(1)
 * 必须是有序的，常用数据放前面，"沉水"数据放后面
 * 哈希 + 有序 ==> Map 其他都不行
 * @class LRUCache
 */
export class LRUCache {
  private length: number;
  private data: Map<any, any> = new Map();
  constructor(length: number) {
    if (length < 1) throw new Error("invalid length");
    this.length = length;
  }

  /**
   *
   * 添加、设置元素，并放置到最新位置，如果超过了容量，则删除最老的元素
   * @param {*} key
   * @param {*} value
   * @memberof LRUCache
   */
  set(key: any, value: any) {
    const data = this.data;

    if (data.has(key)) {
      data.delete(key);
    }
    data.set(key, value);

    if (data.size > this.length) {
      // 如果超过了容量，则删除最老的元素
      const delKey = data.keys().next().value;
      data.delete(delKey);
    }
  }

  /**
   *
   * 获取某个值，如果存在就置为最新，删除再加入就是最新的，不存在返回空
   * @param {*} key
   * @return {*}  {*}
   * @memberof LRUCache
   */
  get(key: any): any {
    const data = this.data;

    if (!data.has(key)) return null;

    const value = data.get(key);

    // 删除再加入就是最新的
    data.delete(key);
    data.set(key, value);

    return value;
  }
}

// const lruChche = new LRUCache(2);
// lruChche.set("1", 1); // {1=1}
// lruChche.set("2", 2); // {1=1, 2=2}
// console.log(lruChche.get("1")); // 1 {2=2, 1=1}
// lruChche.set("3", 3); // {1=1, 3=3}
// console.log(lruChche.get("2")); // null
// lruChche.set("4", 4); // {3=3, 4=4}
// console.log(lruChche.get("1")); // null
// console.log(lruChche.get("3")); // 3 {4=4, 3=3}
// console.log(lruChche.get("4")); // 4 {3=3, 4=4}
