/**
 * @description 树转数组
 */

interface ITreeItem {
    id: number
    name: string
    parentId: number
}
interface ITreeNode {
    id: number
    name: string
    children?: ITreeNode[]
}
interface ILinkNode {
    value: any
    next: ILinkNode | null
}

/**
 * 链表实现队列
 * @param root 
 */
class MyQueue {
    private head: ILinkNode | null = null
    private tail: ILinkNode | null = null
    private len: number = 0
    
    add(val: any) {
        const tail = this.tail
        const head = this.head

        const node: ILinkNode = { value: val, next: null }
        if (head == null) {
            this.head = node
        }
        if (tail) {
            tail.next = node
        }
        this.tail = node

        this.len++
    }
    delete(): any {
        let value = null
        if (this.len <= 0) return value

        const head = this.head
        if (head == null) return value

        value = head.value

        this.head = head.next

        if (this.len === 1) {
            this.tail = null
        }

        this.len--

        return value
    }
    get length(): number {
        return this.len
    }
}
// const queue = new MyQueue()
// console.info("length", queue.length)
// queue.add(100)
// queue.add(200)
// queue.add(300)
// console.info("length", queue.length)
// console.info(queue.delete())
// console.info(queue.delete())
// console.info(queue.delete())
// console.info("length", queue.length)
export function convert(root: ITreeNode): ITreeItem[] {
    const treeNodeToParent: Map<ITreeNode, ITreeNode> = new Map()

    const result: ITreeItem[] = []

    const queue = new MyQueue()
    queue.add(root)

    while (queue.length > 0) {
        const curNode = queue.delete()
        const { id, name, children = [] } = curNode
        const parentNode = treeNodeToParent.get(curNode)
        const parentId = parentNode?.id || 0

        const treeItem: ITreeItem = { id, name, parentId }

        result.push(treeItem)

        children.forEach((child: ITreeNode) => {
            queue.add(child)  
            treeNodeToParent.set(child, curNode)
        })
    }



    return result
}


/**
 * 通过数组实现队列
 * @param root 
 */
export function treeToArray(root: ITreeNode): ITreeItem[] {
    const treeNodeToParent: Map<ITreeNode, ITreeNode> = new Map()
    const result: ITreeItem[] = []

    const queue = []
    queue.push(root)

    while (queue.length > 0) {
        const curNode = queue.shift()
        if (curNode == null) break

        const { id, name, children = [] } = curNode
        const parentNode = treeNodeToParent.get(curNode)
        const parentId = parentNode?.id || 0
        const item: ITreeItem = { id, name, parentId }
        result.push(item)

        children.forEach(child => {
            queue.push(child)
            treeNodeToParent.set(child, curNode)
        })
    }

    return result
}

const obj = {
    id: 1,
    name: "部门A",
    children: [
        {
            id: 2,
            name: "部门B",
            children: [
                { id: 4, name: "部门D" },
                { id: 5, name: "部门E" },
            ]
        },
        {
            id: 3,
            name: "部门C",
            children: [
                { id: 6, name: "部门F" }
            ]
        }
    ]
}

const arr = convert(obj)
console.info(arr)