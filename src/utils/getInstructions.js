/* eslint-disable */
const stationsGraph = require('../assets/js/stationsGraph.json')

const distances = new Array(150)
const parents = new Array(150)

const BFS = (startStation, endStation) => {
  let stations = JSON.parse(JSON.stringify(stationsGraph)) // Deep copy of graph
  const queue = []

  queue.push(stations[startStation])
  distances.fill('Infinity')
  parents.fill(-1)

  stations[startStation].visited = true
  distances[startStation] = 0

  while (queue.length > 0) {
    const currentNode = queue[0]
    queue.shift()

    if (currentNode.id === endStation) {
      return true
    }

    currentNode.neighboringStations.forEach((neigh) => {
      if (!stations[neigh].visited) {
        distances[neigh] = distances[currentNode.id] + 1
        parents[neigh] = currentNode.id

        stations[neigh].visited = true
        queue.push(stations[neigh])
      }
    })
  }

  return false
}

export const getInstructions = (startStation, endStation) => {
  const mensagens = []

  if (!BFS(startStation, endStation)) {
    mensagens.push('Rota não encontrada')
    return mensagens
  }

  const path = []
  let parent = stationsGraph[endStation].id

  while (parent !== stationsGraph[startStation].id) {
    path.unshift(stationsGraph[parent])
    parent = parents[parent]
  }
  path.unshift(stationsGraph[parent])

  mensagens.push(`Embarque em ${path[0].stationName} sentido à estação ${path[1].stationName}`)
  for (let i = 1; i < path.length - 1; i += 1) {
    if (path[i].lineName === 'Estação de Integração') {
      mensagens.push(`Na estação ${path[i].stationName} siga sentido à estação ${path[i + 1].stationName}`)
    }
  }
  mensagens.push(`Desembarque em ${path[path.length - 1].stationName}`)

  return mensagens
}
