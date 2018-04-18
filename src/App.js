import React, { Component } from 'react';
import Button from 'material-ui/Button';
import pkg from '../package.json';
import './App.css';

const electron = window.require('electron');
const { remote, shell } = electron;
const { dialog, BrowserWindow } = remote;

class App extends Component {
  render() {
    return (
      <div className="App">
        <br />
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
