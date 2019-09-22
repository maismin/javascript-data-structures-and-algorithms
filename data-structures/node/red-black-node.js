const BinaryTreeNode = require('./binary-tree-node')

const RED = 0
const BLACK = 1

/**
 * A class representing a red black tree node
 *
 * @class RedBlackTreeNode
 * @extends {BinaryTreeNode}
 */
class RedBlackTreeNode extends BinaryTreeNode {
  /**
   * Static const variable RED
   *
   * @readonly
   * @static
   * @memberof RedBlackTreeNode
   */
  static get RED() {
    return RED
  }

  /**
   * Static const variable BLACK
   *
   * @readonly
   * @static
   * @memberof RedBlackTreeNode
   */
  static get BLACK() {
    return BLACK
  }

  /**
   * Creates an instance of RedBlackTreeNode
   * @param {*} data
   * @param {*} color
   * @memberof RedBlackTreeNode
   */
  constructor(data, color) {
    super(data)
    this.color = color
  }
}

module.exports = RedBlackTreeNode