const Queue = require('../queue/queue')
const PriorityQueue = require('../tree/min-binary-heap')
const PriorityNode = require('../node/priority-node')

/**
 * Class representing a graph
 *
 * @class Graph
 */
class Graph {
  /**
   * Creates an instance of Graph
   * @param {boolean} [weighted=false]
   * @param {boolean} [directed=false]
   * @memberof Graph
   */
  constructor(weighted = false, directed = false) {
    this.adjacencyList = {}
  }

  /**
   * Add vertex
   *
   * @param {*} vertex
   * @memberof Graph
   */
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = []
    }
  }

  /**
   * Remove vertex
   *
   * @param {*} vertex
   * @memberof Graph
   */
  removeVertex(vertex) {
    for (let adjacentVertex of this.adjacencyList[vertex]) {
      this.removeEdge(vertex, adjacentVertex.node)
    }
    delete this.adjacencyList[vertex]
  }

  /**
   * Add edge
   *
   * @param {*} v1
   * @param {*} v2
   * @memberof Graph
   */
  addEdge(v1, v2, weight = 1) {
    this.adjacencyList[v1].push({ node: v2, weight })
    if (!this.directed) {
      this.adjacencyList[v2].push({ node: v1, weight })
    }
  }

  /**
   * Remove edge
   *
   * @param {*} v1
   * @param {*} v2
   * @memberof Graph
   */
  removeEdge(v1, v2) {
    this.adjacencyList[v1] = this.adjacencyList[v1].filter(
      v => v.node !== v2
    )
    if (!this.directed) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(
        v => v.node !== v1
      )
    }
  }

  /**
   * Depth first traversal of the graph via recursion
   *
   * @param {*} vertex
   * @returns
   * @memberof Graph
   */
  depthFirstRecursive(vertex) {
    const results = []
    const visited = new Set()

    const depthFirstHelper = (vertex, results, visited) => {
      results.push(vertex)
      visited.add(vertex)

      this.adjacencyList[vertex].forEach(neighbor => {
        if (!visited.has(neighbor.node)) {
          depthFirstHelper(neighbor.node, results, visited)
        }
      })
    }

    depthFirstHelper(vertex, results, visited)

    return results
  }

  /**
   * Depth first traversal via iteration
   *
   * @param {*} vertex
   * @returns
   * @memberof Graph
   */
  depthFirstIterative(vertex) {
    const results = []
    const visited = new Set(vertex)
    const stack = [vertex]

    while (stack.length) {
      const v = stack.pop()
      results.push(v)
      this.adjacencyList[v].forEach(neighbor => {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node)
          stack.push(neighbor.node)
        }
      })
    }

    return results
  }

  /**
   * Breath first traversal
   *
   * @param {*} vertex
   * @returns
   * @memberof Graph
   */
  breadthFirst(vertex) {
    const results = []
    const visited = new Set(vertex)
    const queue = new Queue()

    queue.enqueue(vertex)

    while (!queue.isEmpty()) {
      const v = queue.dequeue().data
      results.push(v)
      this.adjacencyList[v].forEach(neighbor => {
        if (!visited.has(neighbor.node)) {
          visited.add(neighbor.node)
          queue.enqueue(neighbor.node)
        }
      })
    }

    return results
  }

  /**
   * Dijkstra's shortest path algorithm between source and destination vertex.
   * Assumes that the weights are non-negative
   *
   * @param {*} source
   * @param {*} destination
   * @returns {[]}
   * @memberof Graph
   */
  dijkstra(source, destination) {
    // initialize hash tables
    // distances - keeps track of distances from source to any other vertex
    // predecessors - enables us to build the path from source to destination
    const distances = {}
    const predecessors = {}
    const priorityQueue = new PriorityQueue()
    const path = []

    // Set all distances to infinity and predecessors to null
    for (const v in this.adjacencyList) {
      distances[v] = Infinity
      predecessors[v] = null
    }

    // Set distance of source to zero
    distances[source] = 0

    // Insert all the distances for each vertex into the priority queue
    for (const v in distances) {
      priorityQueue.insert(new PriorityNode(v, distances[v]))
    }

    while (priorityQueue.length) {
      const u = priorityQueue.extractMin().data

      if (u === destination) {
        let v = destination

        while (v) {
          path.push(v)
          v = predecessors[v]
        }
        break
      }
      
      this.adjacencyList[u].forEach(node => {
        const v = node.node
        const vWeight = node.weight
        const newDistance = distances[u] + vWeight

        // Updates the distances for each neighboring vertex if smaller path is found
        if (distances[v] > newDistance) {
          distances[v] = newDistance
          predecessors[v] = u
          priorityQueue.insert(new PriorityNode(v, distances[v]))
        }
      })
    }
    
    return path.reverse()
  }
}

module.exports = Graph