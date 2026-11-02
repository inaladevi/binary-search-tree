import Node from './Node.js';

export default class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    const sortedArray = [...new Set(array)].sort((a, b) => a - b);
    if (sortedArray.length === 0) return null;

    const mid = Math.floor(sortedArray.length / 2);
    const node = new Node(sortedArray[mid]);

    node.left = this.buildTree(sortedArray.slice(0, mid));
    node.right = this.buildTree(sortedArray.slice(mid + 1));

    return node;
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (value === current.data) return true;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;
    let parent = null;

    while (current !== null) {
      parent = current;

      if (value === current.data) return;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    if (value < parent.data) {
      parent.left = new Node(value);
    } else {
      parent.right = new Node(value);
    }
  }

  deleteItem(value) {
    this.root = this._deleteNode(value, this.root);
  }

  _deleteNode(value, current) {
    if (current === null) {
      return current;
    }

    if (value < current.data) {
      current.left = this._deleteNode(value, current.left);
    } else if (value > current.data) {
      current.right = this._deleteNode(value, current.right);
    } else {
      if (current.left === null) {
        return current.right;
      } else if (current.right === null) {
        return current.left;
      } else {
        let successor = current.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        current.data = successor.data;
        current.right = this._deleteNode(successor.data, current.right);
      }
    }
    return current;
  }

  levelOrderForEach(callback) {
    if (!callback) {
      throw new Error("A callback function is required!");
    }

    const queue = [this.root];
    while (queue.length > 0) {
      const current = queue.shift();
      if (current !== null) {
        callback(current.data);
        if (current.left) queue.push(current.left);
        if (current.right) queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (!callback) throw new Error("Callback required");
    this._inOrder(this.root, callback);
  }

  _inOrder(node, callback) {
    if (node === null) return;

    this._inOrder(node.left, callback);
    callback(node.data);
    this._inOrder(node.right, callback);
  }

  preOrderForEach(callback) {
    if (!callback) throw new Error("Callback required");
    this._preOrder(this.root, callback);
  }

  _preOrder(node, callback) {
    if (node === null) return;

    callback(node.data);
    this._preOrder(node.left, callback);
    this._preOrder(node.right, callback);
  }

  postOrderForEach(callback) {
    if (!callback) throw new Error("Callback required");
    this._postOrder(this.root, callback);
  }

  _postOrder(node, callback) {
    if (node === null) return;

    this._postOrder(node.left, callback);
    this._postOrder(node.right, callback);
    callback(node.data);
  }

  height(value) {
    let current = this.root;
    while (current !== null) {
      if (value === current.data) break;
      current = value < current.data ? current.left : current.right;
    }
    if (current === null) return undefined;
    return this._calculateHeight(current);
  }

  _calculateHeight(node) {
    if (node === null) return -1;

    const leftHeight = this._calculateHeight(node.left);
    const rightHeight = this._calculateHeight(node.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value) {
    let current = this.root;
    let edgeCount = 0;

    while (current !== null) {
      if (value === current.data) return edgeCount;
      edgeCount++;
      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return undefined;
  }

  isBalanced(node = this.root) {
    if (node === null) return true;

    const leftHeight = this._calculateHeight(node.left);
    const rightHeight = this._calculateHeight(node.right);
    const difference = Math.abs(leftHeight - rightHeight);
    return (
      difference <= 1 &&
      this.isBalanced(node.left) &&
      this.isBalanced(node.right)
    );
  }

  rebalance() {
    const currentValues = [];
    this.inOrderForEach((value) => currentValues.push(value));
    this.root = this.buildTree(currentValues);
  }
}