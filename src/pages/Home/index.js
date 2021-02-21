import React, { useEffect, useRef, useState } from 'react'
import { useWindowWidth, useWindowHeight } from '@react-hook/window-size'

import Select from 'react-select'
import { InlineIcon } from '@iconify/react'
import { ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader'
import { UncontrolledReactSVGPanZoom, TOOL_PAN } from 'react-svg-pan-zoom'

import bxTrain from '@iconify/icons-bx/bx-train'
import bxInfo from '@iconify/icons-bx/bx-info-circle'
import bxCaptions from '@iconify/icons-bx/bx-captions'
import bxsCircle from '@iconify/icons-bx/bxs-circle'
import pathImage from '../../assets/img/path.png'

import { getStationsList } from '../../utils/otherUtils'

const options = getStationsList()

const captions = [
  { color: '#003C86', label: 'Linha 1 - Azul' },
  { color: '#006D58', label: 'Linha 2 - Verde' },
  { color: '#ED4E17', label: 'Linha 3 - Vermelha' },
  { color: '#FCBD0F', label: 'Linha 4 - Amarela' },
  { color: '#96387F', label: 'Linha 5 - Lilás' },
  { color: '#808080', label: 'Linha 15 - Prata' },
]

const Home = () => {
  const [partida, setPartida] = useState(0)
  const [destino, setDestino] = useState(0)

  const map = useRef()
  const width = useWindowWidth() - 290
  const height = useWindowHeight()

  useEffect(() => {
    map.current.zoom(width / 2, height / 2, 2)
  }, [])

  return (
    <div className='container'>
      {/* sidebar */}
      <div className='sidebar'>
        <div className='colored-box'>
          <div className='project'>
            <InlineIcon
              icon={bxTrain}
              style={{ color: '#fff', fontSize: '25px' }}
            />
            <div className='title'>
              <h1>Metrô de SP</h1>
              <h4>São Paulo, Brasil</h4>
            </div>
          </div>
          <div className='travel'>
            <div className='travel-icon'>
              <img src={pathImage} height={70} alt='path' />
            </div>
            <div className='travel-choices'>
              <div className='choice'>
                <Select
                  className='travel_select_container'
                  classNamePrefix='travel_select'
                  placeholder='Partida'
                  options={options}
                  value={partida}
                  onChange={(option) => setPartida(option)}
                />
              </div>
              <div className='choice'>
                <Select
                  className='travel_select_container'
                  classNamePrefix='travel_select'
                  placeholder='Destino'
                  options={options}
                  value={destino}
                  onChange={(option) => setDestino(option)}
                />
              </div>
            </div>
          </div>
          <div className='travel-submit'>
            <button type='button'>Buscar</button>
          </div>
        </div>
        <div className='white-box'>
          <div className='title'>
            <InlineIcon
              icon={bxInfo}
              style={{ color: '#000', fontSize: '25px' }}
            />
            <h2>Instruções</h2>
          </div>
          <div className='content'>
            <p>
              Digite a estação de partida e de destino para receber o trajeto.
            </p>
          </div>
        </div>
        <div className='white-box'>
          <div className='title'>
            <InlineIcon
              icon={bxCaptions}
              style={{ color: '#000', fontSize: '25px' }}
            />
            <h2>Legenda</h2>
          </div>
          <div className='captions'>
            {captions.map((caption) => (
              <div className='caption' key={caption.label}>
                <div className='symbol'>
                  <InlineIcon
                    icon={bxsCircle}
                    style={{ color: caption.color, fontSize: '20px' }}
                  />
                </div>
                <div className='text'>
                  <p>{caption.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* map area */}
      <div className='map-area'>
        <ReactSvgPanZoomLoader
          src='metro-sp.svg'
          render={(content) => (
            <UncontrolledReactSVGPanZoom
              ref={map}
              className='map'
              width={width}
              height={height}
              defaultTool={TOOL_PAN}
              background='#e5e5e5'
              SVGBackground='#e5e5e5'
              customMiniature={() => null}
            >
              <svg width={width} height={height}>
                {content}
              </svg>
            </UncontrolledReactSVGPanZoom>
          )}
        />
      </div>
    </div>
  )
}

export default Home
