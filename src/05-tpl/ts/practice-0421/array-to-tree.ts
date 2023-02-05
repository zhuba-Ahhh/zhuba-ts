/**
 * @description 数组转树
 */

interface ITreeNode {
    id : number
    name: string
    children?: ITreeNode[]
}

interface ITreeItem {
    id: number
    name: string
    parentId: number
}

/**
 * 
 * @param arr 
 */
export function arrayToTree(arr: ITreeItem[]): ITreeNode | null {
    const idToTreeNode: Map<number, ITreeNode> = new Map()

    let root = null

    arr.forEach(item => {
        const { id, name, parentId } = item
        const treeNode: ITreeNode = { id, name }

        idToTreeNode.set(id, treeNode)

        const parentNode = idToTreeNode.get(parentId)
        if (parentNode) {
            if (parentNode.children == null) parentNode.children = []
            parentNode.children.push(treeNode)
        }

        if (parentId === 0) root = treeNode
    })

    return root
}

const arr = [
    { id: 1, name: "部门A", parentId: 0 },
    { id: 2, name: "部门B", parentId: 1 },
    { id: 3, name: "部门C", parentId: 1 },
    { id: 4, name: "部门D", parentId: 2 },
    { id: 5, name: "部门E", parentId: 2 },
    { id: 6, name: "部门F", parentId: 3 }
]

const tree = arrayToTree(arr)
console.info(tree)