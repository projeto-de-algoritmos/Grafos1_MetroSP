/* eslint-disable */
const stationsGraph = require('../assets/js/stationsGraph.json')

export const getStationsList = () => {
  const ids = Object.keys(stationsGraph)
  return ids.map(
    (stationId) => {
      return {
        value: stationId,
        label: stationsGraph[stationId].stationName,
      }
    })
}
