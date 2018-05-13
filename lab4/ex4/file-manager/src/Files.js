import React, { Component } from 'react'

const {ipcRenderer} = window.require('electron')

class Files extends Component {
  constructor (props) {
    super(props)
    this.state = {
      folder: '.',
      files: null,
      selectedFiles: []
    }
  }

  componentDidMount () {
    this.getFolderFiles()
  }

  getFolderFiles = () => {
    ipcRenderer.send('requestFolder', this.state.folder)
    ipcRenderer.on('requestFolderReply', (event, arg) => {
      this.setState({...this.state, files: arg})
    })
  }

  selectFile = (file) => {
    if (this.state.selectedFiles.includes(file))
      this.setState({...this.state, selectedFiles: this.state.selectedFiles.filter(e => e !== file)})
    else
      this.setState({...this.state, selectedFiles: [...this.state.selectedFiles, file]})
  }

  deleteFile = (file) => {
    ipcRenderer.send('deleteFile', this.state.folder + '/' + file)
    ipcRenderer.on('deleteFileReply', (event, arg) => {
      alert(arg)
    })
  }

  renderFolder = () => {
    if (this.state.files)
      return (
        <h3>Files:<br/><br/>
          <ul className='list-group'>{this.state.files
            .map(file => {
              if (this.state.selectedFiles.includes(file))
                return (
                  <li className='list-group-group alert-info' onClick={() => this.selectFile(file)}>
                    <button className='btn btn-danger' onClick={() => this.deleteFile(file)}>X</button>
                    {file}</li>
                )
              else
                return (
                  <li className='list-group-group' onClick={() => this.selectFile(file)}>
                    <button className='btn btn-danger' onClick={() => this.deleteFile(file)}>X</button>
                    {file}</li>
                )
            })}</ul>
        </h3>
      )
    else return (
      <span/>
    )
  }

  render () {
    return (
      <div className='container'>
        <h2>Folder: {this.state.folder}</h2>
        <br/><br/>
        {this.renderFolder()}
      </div>
    )
  }
}

export default Files
