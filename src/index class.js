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
      return this;
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
    return this;
  };
  this.insert = (newValue) => {
    if (this.root.value === newValue) console.log("Inserted duplicate");
    if (newValue > this.root.value) {
      if (this.root.right === null) {
        const rightTree = new Tree();
        this.root.right = rightTree.buildTree([newValue]);
      } else {
        this.root.right.insert(newValue);
      }
    }
    if (newValue < this.root.value) {
      if (this.root.left === null) {
        const leftTree = new Tree();
        this.root.left = leftTree.buildTree([newValue]);
      } else {
        this.root.left.insert(newValue);
      }
    }
  };
  return `${this.root}`;
}
const mixedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 13, 77, 42, 67, 6345, 324];
const mainTree = new Tree();
mainTree.buildTree(mixedArr);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.root.right !== null) {
    prettyPrint(node.root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root.value}`);
  if (node.root.left !== null) {
    prettyPrint(node.root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
prettyPrint(mainTree);
mainTree.insert(2);
prettyPrint(mainTree);
