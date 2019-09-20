const Queue = require('../queue/queue')
const PriorityQueue = require('../tree/min-binary-heap')

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
    this.weighted = weighted
    this.directed = directed
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
      this.removeEdge(vertex, adjacentVertex.name)
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
    this.adjacencyList[v1].push({ name: v2, weight })
    if (!this.directed) {
      console.log('pushed')
      this.adjacencyList[v2].push({ name: v1, weight })
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
      v => v.name !== v2
    )
    if (!this.directed) {
      this.adjacencyList[v2] = this.adjacencyList[v2].filter(
        v => v.name !== v1
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
        if (!visited.has(neighbor.name)) {
          depthFirstHelper(neighbor.name, results, visited)
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
        if (!visited.has(neighbor.name)) {
          visited.add(neighbor.name)
          stack.push(neighbor.name)
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
      const v = queue.dequeue().name
      results.push(v)
      this.adjacencyList[v].forEach(neighbor => {
        if (!visited.has(neighbor.name)) {
          visited.add(neighbor.name)
          queue.enqueue(neighbor.name)
        }
      })
    }

    return results
  }

  /**
   * Returns an array containing two maps
   * 1) distances - keeps track of the shortest distance from source to every other vertex
   * 2) predecessor - the predecessor of every vertex for shortest distance from source
   *
   * @param {*} source
   * @returns
   * @memberof Graph
   */
  _singleSourceInitialize(source) {
    const distances = {}
    const predecessors = {}

    // Set all distances to infinity and predecessors to null
    for (const v in this.adjacencyList) {
      distances[v] = Infinity
      predecessors[v] = null
    }

    // Set distance of source to zero
    distances[source] = 0

    return [distances, predecessors]
  }

  /**
   * Dijkstra's shortest path algorithm between source and destination vertex.
   * Assumes that the weights are non-negative
   *
   * @param {*} source
   * @param {*} destination
   * @returns {[]} path
   * @memberof Graph
   */
  dijkstra(source, destination) {
    const path = []
    const priorityQueue = new PriorityQueue()
    const [distances, predecessors] = this._singleSourceInitialize(source)

    // Insert all the distances for each vertex into the priority queue
    for (const v in distances) {
      priorityQueue.insert(v, distances[v])
    }

    while (priorityQueue.length) {
      const u = priorityQueue.extractMin().name
      
      this.adjacencyList[u].forEach(node => {
        const v = node.name
        const vWeight = node.weight
        const newDistance = distances[u] + vWeight

        // Updates the distances for each neighboring vertex if smaller path is found
        if (distances[v] > newDistance) {
          distances[v] = newDistance
          predecessors[v] = u

          priorityQueue.decreasePriority(priorityQueue.pointer[v], distances[v])
        }
      })
    }

    let v = destination

    while (v) {
      path.push(v)
      v = predecessors[v]
    }
    return path.reverse()
  }

  /**
   * Bellman-Ford's algorithm for finding shortest path on a weighted graph
   * that might contain negative edges. Returns false if there is a negative-
   * weight cycle that is reachable from the source. Returns true and the path
   * from source to destination otherwise.
   *
   * @param {*} source
   * @param {*} destination
   * @returns {[boolean, []]}
   * @memberof Graph
   */
  belllmanFord(source, destination) {
    const path = []
    const [distances, predecessors] = this._singleSourceInitialize(source)

    for (let i = 1; i < Object.keys(this.adjacencyList).length; i++) {
      for (let u in this.adjacencyList) {
        for (let edge of this.adjacencyList[u]) {
          const v = edge.name
          const weight = edge.weight
          const newDistance = distances[u] + weight

          if (newDistance < distances[v]) {
            distances[v] = newDistance
            predecessors[v] = u
          }
        }
      }
    }

    for (let u in this.adjacencyList) {
      for (let edge of this.adjacencyList[u]) {
        const v = edge.name
        const weight = edge.weight

        if (distances[v] > distances[u] + weight) {
          return [false, path]
        }
      }
    }
    
    let v = destination
    while (v) {
      path.push(v)
      v = predecessors[v]
    }
    return [true, path.reverse()]
  }
}

module.exports = Graph