import React, { useState } from 'react'

import Select from 'react-select'
import { InlineIcon } from '@iconify/react'
import bxTrain from '@iconify/icons-bx/bx-train'
import bxInfo from '@iconify/icons-bx/bx-info-circle'
import bxCaptions from '@iconify/icons-bx/bx-captions'
import mapImage from '../../assets/img/metro-sp.svg'
import pathImage from '../../assets/img/path.png'

const options = [
  { value: 1, label: 'Tucuruvi' },
  { value: 2, label: 'Parada Inglesa' },
]

const Home = () => {
  const [partida, setPartida] = useState(1)
  const [destino, setDestino] = useState(1)

  return (
    <div className='container'>
      {/* sidebar */}
      <div className='sidebar'>
        <div className='colored-box'>
          <div className='project'>
            <InlineIcon
              icon={bxTrain}
              style={{ color: '#fff', fontSize: '28px' }}
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
                  placeholder='Partida'
                  options={options}
                  value={partida}
                  onChange={(value) => setPartida(value)}
                />
              </div>
              <div className='choice'>
                <Select
                  placeholder='Destino'
                  options={options}
                  value={destino}
                  onChange={(value) => setDestino(value)}
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
              style={{ color: '#000', fontSize: '28px' }}
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
              style={{ color: '#000', fontSize: '28px' }}
            />
            <h2>Legenda</h2>
          </div>
        </div>
      </div>
      {/* sidebar end */}
      <div className='map-area'>
        <img src={mapImage} alt='map' />
      </div>
    </div>
  )
}

export default Home
