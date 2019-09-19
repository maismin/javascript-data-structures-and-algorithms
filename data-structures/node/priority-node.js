/**
 * Class representing a priority node
 *
 * @class PriorityNode
 */
class PriorityNode {
  /**
   * Creates an instance of PriorityNode
   * 
   * @param {*} data
   * @param {number} priority
   * @memberof PriorityNode
   */
  constructor(data, priority) {
    this.data = data
    this.priority = priority
  }
  
  /**
   * Returns the priority value of the node for comparison
   *
   * @returns
   * @memberof PriorityNode
   */
  valueOf() {
    return this.priority
  }
}

module.exports = PriorityNode