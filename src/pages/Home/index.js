import React from 'react'

import { Icon } from '@iconify/react'
import bxCaptions from '@iconify/icons-bx/bx-captions'

const Home = () => {
  return (
    <div className='container'>
      <header className='navigation'>
        <div className='colored-box'>
        </div>
        <div className='white-box'>
        </div>
      </header>
      <div className='subway-map'>
        <Icon icon={bxCaptions} style={{ color: '#fff', fontSize: '30px' }} />
      </div>
    </div>
  )
}

export default Home
