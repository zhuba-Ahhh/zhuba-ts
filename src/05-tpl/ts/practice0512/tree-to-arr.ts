interface IArrayItem {
    id: number;
    name: string;
    parentId: number;
}

interface ITreeNode {
    id: number;
    name: string;
    children?: ITreeNode[];
}

export function convert(root: ITreeNode): IArrayItem[] {
    const treeNodeToParentNode: Map<ITreeNode, ITreeNode> = new Map();

    const res: IArrayItem[] = [];
    const queue = new MyQueue();
    queue.add(root);

    while (queue.length) {
        const treeNode = queue.delete();
        const { id, name, children = [] } = treeNode;

        const parentNode = treeNodeToParentNode.get(treeNode);
        const parentId = parentNode?.id || 0;

        const item: IArrayItem = { id, name, parentId };
        res.push(item);

        children.forEach((child: ITreeNode) => {
            queue.add(child);
            treeNodeToParentNode.set(child, treeNode);
        });
    }

    return res;
}

interface ILinkNode {
    value: any;
    next: ILinkNode | null;
}
class MyQueue {
    private len = 0;
    private head: ILinkNode | null = null;
    private tail: ILinkNode | null = null;

    add(value: any) {
        const head = this.head;
        const tail = this.tail;

        const node: ILinkNode = { value, next: null };

        if (tail) {
            tail.next = node;
        }
        this.tail = node;

        if (head == null) {
            this.head = node;
        }

        this.len++;
    }

    delete(): any {
        const head = this.head;

        if (head == null) return null;

        const value = head.value;
        this.head = head.next;

        if (this.len === 1) {
            this.tail = null;
        }

        this.len--;
        return value;
    }

    get length(): number {
        return this.len;
    }
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
            ],
        },
        {
            id: 3,
            name: "部门C",
            children: [{ id: 6, name: "部门F" }],
        },
    ],
};

const arr = convert(obj);
console.info(arr);
