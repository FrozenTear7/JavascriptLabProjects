import React, { Component } from 'react'
import Files from './Files'

class App extends Component {
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-lg-6'>
            <h2>Window 1<br/><br/></h2>
            <Files/>
          </div>
          <div className='col-lg-6'>
            <h2>Window 2<br/><br/></h2>
            <Files/>
          </div>
        </div>
      </div>
    )
  }
}

export default App
