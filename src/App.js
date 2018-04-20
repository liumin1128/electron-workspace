import React, { Component } from 'react';
import Button from 'material-ui/Button';
import CssBaseline from 'material-ui/CssBaseline';
import { run } from './utils/common';
import Appbar from './components/appbar';
import AddDialog from './components/add';
import reduxRoot from './hoc/reduxRoot';
import styleRoot from './hoc/styleRoot';
import Tabs from './components/tabs';
// import { store, persistor } from './store';

const electron = window.require('electron');
const fs = window.require('fs');

const { remote, shell } = electron;
const { dialog, BrowserWindow } = remote;

@reduxRoot
@styleRoot
export default class App extends Component {
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
      <div>
        <CssBaseline />
        <Appbar />
        <Tabs />
        <AddDialog />
      </div>
    );
  }
}


// export default App;
