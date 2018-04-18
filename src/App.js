import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dropzone from 'react-dropzone';
import pkg from '../package.json';
import './App.css';

const electron = window.require('electron');
const fs = window.require('fs');

const { remote, shell } = electron;
const { dialog, BrowserWindow } = remote;

class App extends Component {
  state = {
    list: [],
  }
  addProject(obj) {
    const { list } = this.state;
    this.setState({
      list: [...list, obj],
    });
  }
  render() {
    const { list } = this.state;
    return (
      <div className="App">
        <br />

        {
          list.map(i => (<div>
            <h1>{i.name}</h1>
            <h2>{i.path}</h2>
            <ul>
              {Object.keys(i.scripts).map(key => (<li>
                {key}: {i.scripts[key]}
              </li>))}
            </ul>
          </div>))
        }

        <Dropzone onDrop={(files) => {
          console.log(files);
          files.map(({ path, name }) => {
            console.log(path);
            const stat = fs.statSync(path);
            console.log('stat');
            console.log(stat);
            if (stat.isDirectory()) {
              const hasPkg = fs.existsSync(`${path}/package.json`);
              if (hasPkg) {
                const itemPkg = window.require(`${path}/package.json`);
                console.log('itemPkg');
                console.log(itemPkg);
                this.addProject({
                  path,
                  name: itemPkg.name || name,
                  scripts: itemPkg.scripts,
                });
              } else {
                const tip = new Notification('提示', {
                  body: '无法检测到package.json',
                });
              }
            }
          });
        }}
        >
          <p>Try dropping some files here, or click to select files to upload.</p>
        </Dropzone>

        <Button onClick={() => {
          console.log('pkg');
          const iii = 'ls ./'.split(' ');
          const [cmd, ...options] = iii;

          RunCmd(cmd, options, (result) => {
            console.log(result);
          });
          // const sss = new BrowserWindow({
          //   x: 50,
          //   y: 50,
          // });
          // new Notification('提示', {
          //   body: '打包成功',
          // });
          // shell.showItemInFolder('/Users/liumin/Desktop/Electron/WeFlow');
          // shell.openExternal('');
          // shell.openExternal('https://github.com');
          // dialog.showMessageBox({ title: '8888', message: '6666' });
          // console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }));
        }}
        >start</Button>
      </div>
    );
  }
}


function RunCmd(cmd, args, cb) {
  const { spawn } = window.require('child_process');
  const child = spawn(cmd, args);
  let result = '';
  child.stdout.on('data', (data) => {
    result += data.toString();
  });
  child.stdout.on('end', () => {
    cb(result);
  });
  child.stderr.on('data', (data) => {
    console.log(`Error: \n${data}`);
  });
  child.on('exit', (code, signal) => {
    console.log(`Exit: ${code}`);
  });
}

export default App;
