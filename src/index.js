const node = (newValue) => {
  let value = null;
  let left = null;
  let right = null;
  if (newValue) {
    value = newValue;
  }
  return {
    get value() {
      return value;
    },
    get left() {
      return left;
    },
    set left(newNode) {
      left = newNode;
    },
    get right() {
      return right;
    },
    set right(newNode) {
      right = newNode;
    },
  };
};
const tree = () => {
  let root = null;
  return {
    buildTree: (arr) => {
      const sorted = Array.from(new Set(arr.sort((a, b) => a - b)));
      const middleEle = Math.ceil((sorted.length - 1) / 2);
      root = node(sorted[middleEle]);
      const leftArr = sorted.slice(0, middleEle);
      const rightArr = sorted.slice(-middleEle);
      if (leftArr.length > 0) {
        root.left = node(leftArr[Math.ceil((leftArr.length - 1) / 2)]);
      }
      if (rightArr.length > 0) {
        root.right = node(rightArr[Math.ceil((rightArr.length - 1) / 2)]);
      }
    },
    get root() {
      return root;
    },
    prettyPrint: (node = root, prefix = "", isLeft = true) => {
      if (node.right !== null) {
        tree().prettyPrint(
          node.right,
          `${prefix}${isLeft ? "│   " : "    "}`,
          false
        );
      }
      console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
      if (node.left !== null) {
        tree().prettyPrint(
          node.left,
          `${prefix}${isLeft ? "    " : "│   "}`,
          true
        );
      }
    },
  };
};
const mixedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const newTree = tree().buildTree(mixedArr);
// console.log(newTree.root);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
const newTree = tree();
newTree.buildTree(mixedArr, () => {
  prettyPrint(newTree.root);
});
