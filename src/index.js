function node(value, left, right) {
  return {
    value,
    left,
    right,
  };
}
function tree(root) {
  return {
    root,
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
  };
}
const mixedArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const newTree = tree().buildTree(mixedArr);
// console.log(newTree.root);
