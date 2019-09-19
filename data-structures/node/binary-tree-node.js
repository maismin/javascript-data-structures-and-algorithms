/**
 * Class representing a node for a binary tree
 *
 * @class BinaryTreeNode
 */
class BinaryTreeNode {
  constructor(data) {
    this.data = data
    this.parent = null
    this.left = null
    this.right = null
  }
}

module.exports = BinaryTreeNode