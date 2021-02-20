/* eslint-disable */
const stationsGraph = require('../assets/js/stationsGraph.json')
const fs = require('fs')


const getInstructions = (rootNode, searchValue) => {

  let distances = new Array(150).fill("Infinity")
  let parents = new Array(150).fill(-1)

  const queue = []
  queue.push(rootNode)
  stationsGraph[rootNode.id].visited = true
  distances[rootNode.id] = 0

  while (queue.length > 0) {
    const currentNode = queue[0]
    queue.shift()
    console.log(`Estação: ${currentNode.stationName}`)

    if (currentNode.id === searchValue) {
      console.log('Chegou')
      break
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

  let parent = searchValue.id
  while (parent !== rootNode.id) {
    console.log(stationsGraph[parent].stationName)
    parent = parents[parent]
  }

  console.log(distances[searchValue.id])

  // let json = []
  // for (let i = 0; i < parents.length; i++) {
  //   if (stationsGraph[i]) {
  //     json.push({ index: i, id: parents[i], name: stationsGraph[i].stationName })
  //   }
  // }
  // let json2 = []
  // for (let i = 0; i < distances.length; i++) {
  //   if (stationsGraph[i]) {
  //     json2.push({ index: i, id: distances[i], name: stationsGraph[i].stationName })
  //   }
  // }

  // fs.writeFile(
  //   './src/assets/js/aaaaaaa.json',
  //   JSON.stringify({
  //     json,
  //     json2
  //   }),
  //   (err) => {
  //     if (err) {
  //       // eslint-disable-next-line no-console
  //       console.log('Erro ao escrever JSON', err)
  //     } else {
  //       // eslint-disable-next-line no-console
  //       console.log('JSON escrito com sucesso')
  //     }
  //   }
  // )
}

getInstructions(stationsGraph[0], stationsGraph[26])