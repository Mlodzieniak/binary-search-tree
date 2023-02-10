function Node(value, left, right) {
  this.value = value;
  this.left = left;
  this.right = right;
  return `${(this.value, this.left, this.right)}`;
}
function Tree() {
  this.root = null;
  this.buildTree = (arr) => {
    const sorted = Array.from(new Set(arr.sort((a, b) => a - b)));
    const middleEle = Math.ceil((sorted.length - 1) / 2);
    this.root = new Node(sorted[middleEle]);
    this.root.left = null;
    this.root.right = null;
    if (sorted.length === 1) {
      return this.root;
    }
    const leftArr = sorted.slice(0, middleEle);
    const rightArr = sorted.slice(-middleEle);
    rightArr.splice(0, 1);

    if (leftArr.length > 0) {
      const leftTree = new Tree();
      this.root.left = leftTree.buildTree(leftArr);
    }
    if (rightArr.length > 0) {
      const rightTree = new Tree();
      this.root.right = rightTree.buildTree(rightArr);
    }
    return this.root;
  };
  return `${this.root}`;
}
const mixedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 13, 77, 42, 67, 6345, 324];
const mainTree = new Tree();
mainTree.buildTree(mixedArr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(mainTree.root);
