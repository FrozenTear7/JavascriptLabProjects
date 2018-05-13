import React, { Component } from 'react'
import Files from './Files'

class App extends Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <Files window='1'/>
          </div>
          <div className='col-lg-6'>
            <Files window='2'/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
