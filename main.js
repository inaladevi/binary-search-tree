import Tree from './Tree.js';

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const myTree = new Tree(testArray);

const randomNumbers = Array.from({ length: 15 }, () => Math.floor(Math.random() * 100));
const tree = new Tree(randomNumbers);

console.log("Is tree balanced?", tree.isBalanced());

const printOrders = () => {
  const level = [];
  const pre = [];
  const inOrder = [];
  const post = [];

  tree.levelOrderForEach(val => level.push(val));
  tree.preOrderForEach(val => pre.push(val));
  tree.inOrderForEach(val => inOrder.push(val));
  tree.postOrderForEach(val => post.push(val));

  console.log("Level Order:", level);
  console.log("Pre Order:  ", pre);
  console.log("In Order:   ", inOrder);
  console.log("Post Order: ", post);

};

printOrders();

console.log("\n--- Unbalancing the tree ---");
tree.insert(150);
tree.insert(200);
tree.insert(250);
tree.insert(300);

console.log("Is tree balanced?", tree.isBalanced()); 

console.log("--- Rebalancing ---");
tree.rebalance();

console.log("Is tree balanced?", tree.isBalanced()); 
console.log("Final Traversal Orders:");
printOrders();

prettyPrint(myTree.root);