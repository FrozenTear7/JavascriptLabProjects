import React, { Component } from 'react'

const {ipcRenderer} = window.require('electron')

class Files extends Component {
  constructor (props) {
    super(props)
    this.state = {
      folder: '.',
      files: null,
      selectedFiles: [],
      activeFile: null,
      newName: null
    }
  }

  componentDidMount () {
    this.getFolderFiles()
  }

  getFolderFiles = () => {
    ipcRenderer.send('requestFolder' + this.props.window, this.state.folder)
    ipcRenderer.on('requestFolderReply' + this.props.window, (event, arg) => {
      this.setState({...this.state, files: arg})
    })
  }

  copyFiles = () => {
    ipcRenderer.send('copyFiles' + this.props.window, this.state.selectedFiles)
  }

  selectFile = (file) => {
    if (this.state.selectedFiles.includes(file))
      this.setState({...this.state, selectedFiles: this.state.selectedFiles.filter(e => e !== file)})
    else
      this.setState({...this.state, selectedFiles: [...this.state.selectedFiles, file]})
  }

  deleteFile = (file) => {
    if (window.confirm('Are you sure you want to delete this file?') === true) {
      ipcRenderer.send('deleteFile' + this.props.window, this.state.folder + '/' + file)
      ipcRenderer.on('deleteFileReply' + this.props.window, (event, arg) => {
        alert(arg)
      })
    }
  }

  renameFile = () => {
    ipcRenderer.send('renameFile' + this.props.window, {old: this.state.activeFile, new: this.state.newName})
    ipcRenderer.on('renameFileReply' + this.props.window, (event, arg) => {
      alert(arg)
      this.setState({...this.state, activeFile: null})
      this.getFolderFiles()
    })
  }

  activeFile = (file) => {
    if (this.state.activeFile === file)
      this.setState({...this.state, activeFile: null})
    else
      this.setState({...this.state, activeFile: file, newName: file})
  }

  renderFolder = () => {
    if (this.state.files)
      return (
        <h3>Files:<br/><br/>
          <ul className='list-group'>{this.state.files
            .map(file => {
              if (this.state.selectedFiles.includes(file))
                return (
                  <li className='list-group-group alert-info'>
                    <button className='btn btn-danger' onClick={() => this.deleteFile(file)}>X</button>
                    <button className='btn btn-info' onClick={() => this.selectFile(file)}>S</button>
                    <button className='btn btn-info' onClick={() => this.activeFile(file)}>R</button>
                    {this.state.activeFile !== file ? file : <form>
                      <div className='form-group'>
                        <br/>
                        <input className='form-control' name='newName' value={this.state.newName}
                               onChange={this.onChangeActive}/>
                      </div>
                      <button type='button' className='btn btn-outline-success' onClick={this.renameFile}>
                        Rename
                      </button>
                      <br/><br/>
                    </form>}
                  </li>
                )
              else
                return (
                  <li className='list-group-group'>
                    <button className='btn btn-danger' onClick={() => this.deleteFile(file)}>X</button>
                    <button className='btn btn-info' onClick={() => this.selectFile(file)}>S</button>
                    <button className='btn btn-info' onClick={() => this.activeFile(file)}>R</button>
                    {this.state.activeFile !== file ? file : <form>
                      <div className='form-group'>
                        <br/>
                        <input className='form-control' name='newName' value={this.state.newName}
                               onChange={this.onChangeActive}/>
                      </div>
                      <button type='button' className='btn btn-outline-success' onClick={this.renameFile}>
                        Rename
                      </button>
                      <br/><br/>
                    </form>}
                  </li>
                )
            })}</ul>
        </h3>
      )
    else return (
      <span/>
    )
  }

  onChange = (e) => {
    this.setState({...this.state, folder: e.target.value})
  }

  onChangeActive = (e) => {
    this.setState({...this.state, newName: e.target.value})
  }

  render () {
    return (
      <div className='container'>
        <h2>Window {this.props.window}<br/><br/></h2>
        <form>
          <div className='form-group'>
            <br/>
            <input className='form-control' name='folderName'
                   placeholder='Folder name' value={this.state.folder} onChange={this.onChange}/>
          </div>
          <button type='button' className='btn btn-outline-success' onClick={this.getFolderFiles}>
            Change folder / Refresh
          </button>
          <br/><br/>
        </form>
        <h2>Folder: {this.state.folder}</h2>
        <br/><br/>
        {this.renderFolder()}
        {this.state.selectedFiles.length > 0 &&
        <button className='btn btn-outline-success' onClick={this.copyFiles}>Copy selected Files</button>}
      </div>
    )
  }
}

export default Files
