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
    if (sorted[middleEle] === rightArr[0]) {
      rightArr.splice(0, 1);
    }

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

  this.findLowestSuccessor = (child) => {
    if (child.root.left === null) {
      return child;
    }
    return this.findLowestSuccessor(child.root.left);
  };

  this.find = (value) => {
    if (this.root.value === value) return this;
    if (value < this.root.value) {
      if (this.root.left !== null) return this.root.left.find(value);
      return "Couldn't find value";
    }
    if (this.root.right !== null) return this.root.right.find(value);
    return "Couldn't find value";
  };

  this.delete = (valToDelete, parent = null, isLeft = true) => {
    if (this.root === null) return null;

    if (valToDelete > this.root.value) {
      this.root.right.delete(valToDelete, this.root, false);
    }
    if (valToDelete < this.root.value) {
      this.root.left.delete(valToDelete, this.root, true);
    }

    if (valToDelete === this.root.value) {
      if (this.root.left === null && this.root.right === null) {
        // node has no children
        console.log(`deleted ${this.root.value}`);
        isLeft ? (parent.left = null) : (parent.right = null);
      } else if (this.root.left === null && this.root.right !== null) {
        // node has one child
        isLeft
          ? (parent.left = this.root.right)
          : (parent.right = this.root.right);
      } else if (this.root.left !== null && this.root.right === null) {
        isLeft
          ? (parent.left = this.root.left)
          : (parent.right = this.root.left);
      } else {
        // has two children
        const successor = this.findLowestSuccessor(this.root.right);
        this.delete(successor.root.value);
        this.root.value = successor.root.value;
      }
    }
  };
  this.levelOrderRec = (fn, queue = [], list = []) => {
    if (!queue.includes(this)) {
      queue.push(this);
    }
    if (!list.includes(this)) {
      list.push(this.root.value);
    }

    if (this.root.left !== null) {
      queue.push(this.root.left);
    }
    if (this.root.right !== null) {
      queue.push(this.root.right);
    }
    if (typeof fn === "function") {
      fn(queue[0].root.value);
    }
    queue.splice(0, 1);

    queue.forEach((ele) => {
      ele.levelOrderRec(fn, queue, list);
    });
    return list;
  };
  this.preorder = (fn, list = []) => {
    if (!list.includes(this)) {
      list.push(this.root.value);
    }
    if (typeof fn === "function") {
      fn(this.root.value);
    }
    if (this.root.left !== null) {
      this.root.left.preorder(fn, list);
    }
    if (this.root.right !== null) {
      this.root.right.preorder(fn, list);
    }
    return list;
  };
  this.inorder = (fn, list = []) => {
    if (this.root.left !== null) {
      this.root.left.inorder(fn, list);
    }
    if (!list.includes(this)) {
      list.push(this.root.value);
    }
    if (typeof fn === "function") {
      fn(this.root.value);
    }
    if (this.root.right !== null) {
      this.root.right.inorder(fn, list);
    }
    return list;
  };
  this.postorder = (fn, list = []) => {
    if (this.root.left !== null) {
      this.root.left.postorder(fn, list);
    }

    if (this.root.right !== null) {
      this.root.right.postorder(fn, list);
    }
    if (!list.includes(this)) {
      list.push(this.root.value);
    }
    if (typeof fn === "function") {
      fn(this.root.value);
    }
    return list;
  };
  this.highest = (arr) => {
    let top = 0;
    arr.forEach((ele) => {
      if (ele > top) top = ele;
    });
    return top;
  };
  this.height = (level = 0, list = []) => {
    level++;
    if (this.root.left === null && this.root.right === null) {
      list.push(level);
    }
    if (this.root.left !== null) {
      this.root.left.height(level, list);
    }
    if (this.root.right !== null) {
      this.root.right.height(level, list);
    }
    level--;
    return this.highest(list);
  };
  this.depth = (value, deep = 0, searchedNode = null) => {
    deep++;
    if (!searchedNode) {
      searchedNode = this.find(value);
    }
    if (searchedNode !== null) {
      if (this === searchedNode) return deep;
      if (this.root.value > searchedNode.root.value) {
        return this.root.left.depth(value, deep, searchedNode);
      }
      if (this.root.value < searchedNode.root.value) {
        return this.root.right.depth(value, deep, searchedNode);
      }
    }
    return deep;
  };
  this.isBalanced = (level = 0, list = []) => {
    level++;
    if (this.root.left === null && this.root.right === null) {
      list.push(level);
    }
    if (this.root.left !== null) {
      this.root.left.height(level, list);
    }
    if (this.root.right !== null) {
      this.root.right.height(level, list);
    }
    level--;
    const sorted = new Set(list);
    return !(sorted.size > 2);
  };
  this.rebalance = () => {
    const newArr = this.inorder();
    this.buildTree(newArr);
  };

  return `${this.root}`;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node.root.right !== null) {
    prettyPrint(node.root.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.root.value}`);
  if (node.root.left !== null) {
    prettyPrint(node.root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
const mixedArr = [
  1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 33, 9, 13, 77, 42, 67, 6345, 324,
];
const mainTree = new Tree();
mainTree.buildTree(mixedArr);

function randomArr(size, range) {
  if (size > range) return "Size cannot be bigger than range";
  const arr = [];
  for (let i = 0; i < size; i++) {
    const randomInt = Math.floor(Math.random() * range);
    if (!arr.includes(randomInt)) {
      arr.push(randomInt);
    } else {
      i--;
    }
  }
  return arr;
}
function display(value) {
  console.log(value);
}

function demo(arr) {
  const demoTree = new Tree();
  demoTree.buildTree(arr);
  prettyPrint(demoTree);
  console.log(`Is balanced? ${demoTree.isBalanced()}`);
  console.log(`Level order: ${demoTree.levelOrderRec()}`);
  console.log(`Preorder: ${demoTree.preorder()}`);
  console.log(`Inorder: ${demoTree.inorder()}`);
  console.log(`Postorder: ${demoTree.postorder()}`);
  const intToInsert = randomArr(50, 1000);
  intToInsert.forEach((int) => {
    demoTree.insert(int);
  });
  console.log(`Is balanced? ${demoTree.isBalanced()}`);
  demoTree.rebalance();
  console.log(`Is balanced? ${demoTree.isBalanced()}`);
  console.log(`Level order: ${demoTree.levelOrderRec()}`);
  console.log(`Preorder: ${demoTree.preorder()}`);
  console.log(`Inorder: ${demoTree.inorder()}`);
  console.log(`Postorder: ${demoTree.postorder()}`);
  prettyPrint(demoTree);
}
demo(randomArr(10, 1000));
