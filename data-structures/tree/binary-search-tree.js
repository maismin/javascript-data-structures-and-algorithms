const Node = require('../node/binary-tree-node')
const Queue = require('../queue/queue')

/**
 * Class representing a binary search tree
 *
 * @class BinarySearchTree
 */
class BinarySearchTree {
  constructor() {
    this.root = null
  }

  /**
   * Print the parent before the children
   *
   * @param {node} [node=this.root]
   * @memberof BinarySearchTree
   */
  preOrder(node = this.root) {
    if (node) {
      console.log(node.data)
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  /**
   * Print the values in sorted order
   *
   * @param {node} [node=this.root]
   * @memberof BinarySearchTree
   */
  inOrder(node = this.root) {
    if (node) {
      this.inOrder(node.left)
      console.log(node.data)
      this.inOrder(node.right)
    }
  }

  /**
   * Print the parent after the children
   *
   * @param {node} [node=this.root]
   * @memberof BinarySearchTree
   */
  postOrder(node = this.root) {
    if (node) {
      this.postOrder(node.left)
      this.postOrder(node.right)
      console.log(node.data)
    }
  }

  /**
   * Traverse the tree via breath first search and returns an array of values
   *
   * @returns {*[]} visited
   * @memberof BinarySearchTree
   */
  breathFirstSearch() {
    const queue = new Queue
    const visited = []

    queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      const node = queue.dequeue()
      if (node) {
        visited.push(node.data)
        if (node.left) {
          queue.push(node.left)
        }
        if (node.right) {
          queue.push(node.right)
        }
      }
    }

    return visited
  }

  /**
   * Return the node that contains the data
   *
   * @param {*} data
   * @param {Node} [node=this.root]
   * @returns {(Node|null)}
   * @memberof BinarySearchTree
   */
  search(data, node = this.root) {
    while (node !== null && node.data !== data) {
      node = (data < node.data) ? node.left : node.right
    }

    return node
  }

  /**
   * Return the node with the minimum value
   *
   * @param {Node} [node=this.root]
   * @returns {(Node|null)}
   * @memberof BinarySearchTree
   */
  minimum(node = this.root) {
    while (node.left !== null) {
      node = node.left
    }

    return node
  }

  /**
   * Return the node with the maximum value
   *
   * @param {Node} [node=this.root]
   * @returns {(Node|null)}
   * @memberof BinarySearchTree
   */
  maximum(node = this.root) {
    while (node.right !== null) {
      node = node.right
    }

    return node
  }

  /**
   * Return the predecessor in the sorted order determined by the inorder tree walk
   *
   * @param {Node} node
   * @returns {(Node|null)}
   * @memberof BinarySearchTree
   */
  predecessor(node) {
    if (node.left !== null) {
      return this.maximum(node.left)
    }

    let p = node.parent
    let c = node

    while (p !== null && c === p.left) {
      c = p
      p = c.parent
    }

    return p
  }

  /**
   * Returns the successor in the sorted order determined by the inorder tree walk
   *
   * @param {Node} node
   * @returns {(Node|null)}
   * @memberof BinarySearchTree
   */
  successor(node) {
    if (node.right !== null) {
      return this.minimum(node.right)
    }

    let p = node.parent
    let c = node

    while (p !== null && c === p.right) {
      c = p
      p = c.parent
    }

    return p
  }

  /**
   * Add a new node to the binary search tree
   *
   * @param {Node} newNode
   * @memberof BinarySearchTree
   */
  insert(newNode) {
    let trailingNode = null
    let currentNode = this.root

    // Traverse down tree until currentNode reachs null
    while (currentNode !== null) {
      trailingNode = currentNode
      if (newNode.data < currentNode.data){
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    // If trailing node is null, then the tree only has the root
    // Otherwise append the node depending on its data
    newNode.parent = trailingNode
    if (trailingNode === null) {
      this.root = newNode
    } else if (newNode.data < trailingNode.data) {
      trailingNode.left = newNode
    } else {
      trailingNode.right = newNode
    }
  }

  /**
   * Replace the subtree rooted at node u with the subtree rooted at node v
   * Transplant does not update v's left or right, doing so is the caller's 
   * responsibilities
   *
   * @param {Node} u
   * @param {(Node|null)} v
   * @memberof BinarySearchTree
   */
  transplant(u, v) {
    if (u.parent === null) {
      this.root = v
    } else if (u === u.parent.left) {
      u.parent.left = v
    } else {
      u.parent.right = v
    }

    // v is allowed to be null
    if (v !== null) {
      v.parent = u.parent
    }
  }

  /**
   * Delete node from binary search tree
   *
   * @param {Node} node
   * @memberof BinarySearchTree
   */
  delete(node) {
    if (node.left === null) {
      // Case 1: node doesn't have a left subtree
      this.transplant(node, node.right)
    } else if (node.right === null) {
      // Case 2: node doesn't have a right subtree
      this.transplant(node, node.left)
    } else {
      // Case 3: node has both left and right subtree
      const successor = this.minimum(node.right)

      // Case 3.1: successor is not the node's right child
      //           so transplant sucessor with sucessor's right child
      //           set sucessor's right child to be node's right child
      //           this results in Case 3.2
      if (successor.parent !== node) {
        this.transplant(successor, successor.right)
        successor.right = node.right
        successor.right.parent = successor
      }

      // Case 3.2: successor is the right child of node
      this.transplant(node, successor)
      successor.left = node.left
      successor.left.parent = successor
    }
  }
}

module.exports = BinarySearchTree