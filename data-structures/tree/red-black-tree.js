const RedBlackNode = require('../node/red-black-node')
const Queue = require('../queue/queue')

/**
 * Class representing a red black tree
 *
 * @class RedBlackTree
 */
class RedBlackTree {
  /**
   * Creates an instance of RedBlackTree
   * 
   * @memberof RedBlackTree
   */
  constructor() {
    this.NIL = new RedBlackNode(null, RedBlackNode.BLACK)
    this.root = this.NIL
  }

  /**
   * Prints the parent before the children
   *
   * @param {RedBlackNode} [node=this.root]
   * @memberof RedBlackTree
   */
  preOrder(node = this.root) {
    if (node !== this.NIL) {
      console.log(node.data)
      this.preOrder(node.left)
      this.preOrder(node.right)
    }
  }

  /**
   * Prints the values in sorted order
   *
   * @param {RedBlackNode} [node=this.root]
   * @memberof RedBlackTree
   */
  inOrder(node = this.root) {
    if (node !== this.NIL) {
      this.inOrder(node.left)
      console.log(node.data)
      this.inOrder(node.right)
    }
  }

  /**
   * Prints the parent after the children
   *
   * @param {*} [node=this.root]
   * @memberof RedBlackTree
   */
  postOrder(node = this.root) {
    if (node !== this.NIL) {
      this.postOrder(node.left)
      this.postOrder(node.right)
      console.log(node.data)
    }
  }

  /**
   * Traverses the tree via breath first and return an array of 
   * nodes visited
   *
   * @returns
   * @memberof RedBlackTree
   */
  breathFirstSearch() {
    const queue = new Queue
    const visited = []

    queue.enqueue(this.root)

    while (!queue.isEmpty()) {
      const node = queue.dequeue()
      if (node !== this.NIL) {
        console.log(node.data)
        visited.push(node.data)
        if (node.left) {
          queue.enqueue(node.left)
        }
        if (node.right) {
          queue.enqueue(node.right)
        }
      }
    }

    return visited
  }

  /**
   * Returns the node that contains the data
   *
   * @param {*} data
   * @param {RedBlackNode} [node=this.root]
   * @returns
   * @memberof RedBlackTree
   */
  search(data, node = this.root) {
    if (node !== this.NIL) {
      while (node !== this.NIL && node.data !== data) {
        node = (data < node.data) ? node.left : node.right
      }
    }

    return (node === this.NIL) ? null : node
  }
  
  /**
   * Returns the node with the minimum value
   *
   * @param {RedBlackNode} [node=this.root]
   * @returns {(RedBlackNode|null)}
   * @memberof RedBlackTree
   */
  minimum(node = this.root) {
    if (node !== this.NIL) {
      while (node.left !== this.NIL) {
        node = node.left
      }
    }

    return (node === this.NIL) ? null : node
  }

  /**
   * Returns the node with the maximum value
   *
   * @param {RedBlackNode} [node=this.root]
   * @returns {(RedBlackNode|null)}
   * @memberof RedBlackTree
   */
  maximum(node = this.root) {
    if (node !== this.NIL) {
      while (node.right !== this.NIL) {
        node = node.right
      }
    }

    return (node === this.NIL) ? null : node
  }

  /**
   * Local operation that rotates the node to the left.
   * Assumes that the node's right is not NIL and that the
   * root's parent is NIL
   *
   * @param {RedBlackNode} node
   * @memberof RedBlackTree
   */
  leftRotate(node) {
    let y = node.right
    // link y's left subtree with node's right subtree
    node.right = y.left
    if (y.left !== this.NIL) {
      y.left.parent = node
    }

    // link node's parent with y
    y.parent = node.parent
    if (node.parent === this.NIL) {
      this.root = y
    } else if (node === node.parent.left) {
      node.parent.left = y
    } else {
      node.parent.right = y
    }

    // put node on y's left
    y.left = node
    node.parent = y
  }

  /**
   * Local operation that rotates the node to the right.
   * Assumes that the node's left is not NIL and that the
   * root's parent is NIL
   *
   * @param {RedBlackNode} node
   * @memberof RedBlackTree
   */
  rightRotate(node) {
    let y = node.left
    // link y's right subtree with node's right subtree
    node.left = y.right
    if (y.right !== this.NIL) {
      y.right.parent = node
    }

    // link node's parent with y
    y.parent = node.parent
    if (node.parent === this.NIL) {
      this.root = y
    } else if (node === node.parent.left) {
      node.parent.left = y
    } else {
      node.parent.right = y
    }

    // put node on y's right
    y.right = node
    node.parent = y
  }

  /**
   * Inserts a new node given the key
   *
   * @param {number} key
   * @memberof RedBlackTree
   */
  insert(key) {
    const newNode = new RedBlackNode(key, RedBlackNode.RED)
    let prevNode = this.NIL
    let currNode = this.root

    while (currNode !== this.NIL) {
      prevNode = currNode
      currNode = (newNode.data < currNode.data) ? currNode.left : currNode.right
    }

    newNode.parent = prevNode
    if (prevNode === this.NIL) {
      this.root = newNode
    } else if (newNode.data < prevNode.data) {
      prevNode.left = newNode
    } else {
      prevNode.right = newNode
    }

    newNode.left = this.NIL
    newNode.right = this.NIL
    this.insertFixUp(newNode)
  }

  /**
   * Restore the red black properties of the tree after inserting a new node
   *
   * @param {*} z
   * @memberof RedBlackTree
   */
  insertFixUp(z) {
    while (z.parent.color === RedBlackNode.RED) {
      if (z.parent === z.parent.parent.left) {
        const uncle = z.parent.parent.right
        if (uncle.color === RedBlackNode.RED) {
          z.parent.color = RedBlackNode.BLACK
          uncle.color = RedBlackNode.BLACK
          z.parent.parent.color = RedBlackNode.RED
          z = z.parent.parent
        } else {
          if (z === z.parent.right) {
            z = z.parent
            this.leftRotate(z)
          }
          z.parent.color = RedBlackNode.BLACK
          z.parent.parent.color = RedBlackNode.RED
          this.rightRotate(z.parent.parent)
        }
      } else {
        const uncle = z.parent.parent.left
        if (uncle.color === RedBlackNode.RED) {
          z.parent.color = RedBlackNode.BLACK
          uncle.color = RedBlackNode.BLACK
          z.parent.parent.color = RedBlackNode.RED
          z = z.parent.parent
        } else {
          if (z === z.parent.left) {
            z = z.parent
            this.rightRotate(z)
          }
          z.parent.color = RedBlackNode.BLACK
          z.parent.parent.color = RedBlackNode.RED
          this.leftRotate(z.parent.parent)
        }
      }
    }
    this.root.color = RedBlackNode.BLACK
  }
}

module.exports = RedBlackTree