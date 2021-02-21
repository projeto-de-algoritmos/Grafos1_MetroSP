/* eslint-disable */
const stationsGraph = require('../assets/js/stationsGraph.json')
const fs = require('fs')

let distances = new Array(150).fill("Infinity")
let parents = new Array(150).fill(-1)

const BFS = (startStation, endStation) => {
  const queue = []
  queue.push(startStation)
  stationsGraph[startStation.id].visited = true
  distances[startStation.id] = 0

  while (queue.length > 0) {
    const currentNode = queue[0]
    queue.shift()

    if (currentNode.id === endStation.id) {
      return true
    }

    currentNode.neighboringStations.forEach((neigh) => {
      if (!stationsGraph[neigh].visited) {
        distances[neigh] = distances[currentNode.id] + 1
        parents[neigh] = currentNode.id
        stationsGraph[neigh].visited = true
        queue.push(stationsGraph[neigh])
      }
    })
  }

  return false
}

const getInstructions = (startStation, endStation) => {
  BFS(startStation, endStation)
  let parent = endStation.id
  while (parent !== startStation.id) {
    console.log(stationsGraph[parent].stationName)
    parent = parents[parent]
  }
  console.log(stationsGraph[parent].stationName)
}

getInstructions(stationsGraph[0], stationsGraph[104])

