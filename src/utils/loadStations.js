const fs = require('fs')

const stationsBlue = require('../assets/js/stationsBlue.json')
const stationsGold = require('../assets/js/stationsGold.json')
const stationsGreen = require('../assets/js/stationsGreen.json')
const stationsOrange = require('../assets/js/stationsOrange.json')
const stationsPurple = require('../assets/js/stationsPurple.json')
const stationsRed = require('../assets/js/stationsRed.json')
const stationsSilver = require('../assets/js/stationsSilver.json')
const stationsYellow = require('../assets/js/stationsYellow.json')

let stationsGraph = []

const stationExists = (station) => {
  for (let j = 0; j < stationsGraph.length; j += 1) {
    if (stationsGraph[j].stationName === station.stationName) {
      return j
    }
  }
  return -1
}

const getNeighboringStation = (index, stations, op) => {
  const indexStation = stationExists(stations[index])
  if (indexStation > -1) {
    stationsGraph[indexStation].neighboringStations.push(
      stations[index + op].id
    )
    return stationsGraph[indexStation].id
  }
  return stations[index].id
}

const loadStations = () => {
  const stationsLines = [
    stationsBlue,
    stationsGold,
    stationsGreen,
    stationsOrange,
    stationsPurple,
    stationsRed,
    stationsSilver,
    stationsYellow,
  ]

  stationsLines.forEach((stations) => {
    const lineGraph = []
    // Percorre todas as estações
    stations.forEach((station, index) => {
      const neighboringStations = []
      // Verifica quais os possíveis vizinhos
      if (index > 0) {
        // Adiciona à lista de adjacências o vizinho "de trás"
        neighboringStations.push(getNeighboringStation(index - 1, stations, 1))
      }
      if (index < stations.length - 1) {
        // Adiciona à lista de adjacências o vizinho "da frente"
        neighboringStations.push(getNeighboringStation(index + 1, stations, -1))
      }
      if (stationExists(station, stationsGraph) === -1) {
        lineGraph.push({ ...station, neighboringStations })
      }
    })
    stationsGraph = stationsGraph.concat(lineGraph)
  })

  fs.writeFile(
    './src/utils/graphs_1.json',
    JSON.stringify(stationsGraph),
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.log('Erro ao escrever JSON', err)
      } else {
        // eslint-disable-next-line no-console
        console.log('JSON escrito com sucesso')
      }
    }
  )
}

loadStations()
