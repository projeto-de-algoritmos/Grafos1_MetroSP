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
  let path = []
  let parent = endStation.id
  while (parent !== startStation.id) {
    path.unshift(stationsGraph[parent])
    parent = parents[parent]
  }
  path.unshift(stationsGraph[parent])
  let mensagens = []
  mensagens.push(`Embarque em ${path[0].stationName} sentido à estação ${path[1].stationName}`)
  for (let i = 1; i < path.length - 1; i += 1) {
    if (path[i].lineName === 'Estação de Integração') {
      mensagens.push(`Na estação ${path[i].stationName} siga sentido à estação ${path[i + 1].stationName}`)
    }
  }
  mensagens.push(`Desembarque em ${path[path.length - 1].stationName}`)
  return mensagens
}