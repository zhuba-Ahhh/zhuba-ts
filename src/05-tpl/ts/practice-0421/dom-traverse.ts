/**
 * @description 遍历DOM（深度优先、广度优先）
 */

function visitNode(node: Node) {
    if (node instanceof Comment) {
        console.info(`Text node--- ${node.textContent}`)
    }
    if (node instanceof Text) {
        const t = node.textContent?.trim()
        if (t) {
            console.info(`Text node--- ${t}`)
        }
    }
    if (node instanceof HTMLElement) {
        console.info(`Element node--- <${node.tagName.toLowerCase()}>`)
    }
}

/**
 * 深度优先遍历
 */
export function depthFirstTraverse(root: Node) {
    visitNode(root)

    // .childNodes获取所有 Node 节点（文本、注释等）；.children 只获取元素
    const childNodes = root.childNodes

    if (childNodes.length) {
        childNodes.forEach(child => {
            visitNode(child)
        })
    }
}

export function breadthFirstTraverse1(root: Node) {
    const queue: Node[] = []
    queue.push(root)

    while (queue.length > 0) {
        const node = queue.shift()
        if (node == null) break
        visitNode(node)

        const childNodes = node.childNodes
        if (childNodes.length) {
            childNodes.forEach(child => {
                queue.push(child)
            })
        }
    }
}
// 链表实现队列
interface ILinkNode {
    value: any
    next: ILinkNode | null
}
class MyQueue {
    private head: ILinkNode | null = null
    private tail: ILinkNode | null = null
    private len: number = 0

    add(val: any) {
        const head = this.head
        const tail = this.tail

        const tailNode: ILinkNode = { value: val, next: null }
        if (head == null) {
            this.head = tailNode
        }
        
        if (tail) {
            tail.next = tailNode
        }
        this.tail = tailNode

        this.len++
    }
    delete(): any {
        const head = this.head
        const tail = this.tail

        let value = null
        if (head == null || this.len <= 0) return value

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


// 测试代码
// const box = document.getElementById("box")
// if (box == null) throw new Error("box is null")
// breadthFirstTraverse1(box)

const queue = new MyQueue()
console.info("length", queue.length)
queue.add(100)
queue.add(200)
queue.add(300)
console.info("length", queue.length)
console.info("delete", queue.delete())
console.info("delete", queue.delete())
console.info("delete", queue.delete())
console.info("length", queue.length)