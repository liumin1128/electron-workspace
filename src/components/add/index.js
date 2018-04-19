import React from 'react';
import { connect } from 'react-redux';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Slide from 'material-ui/transitions/Slide';
import Dropzone from 'react-dropzone';
import AddButton from '../float-button';

const fs = window.require('fs');


function Transition(props) {
  return <Slide direction="up" {...props} />;
}

@connect()
class AlertDialogSlide extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onDrop = (files) => {
    const { dispatch } = this.props;
    dispatch({ type: 'test' });
    console.log(files);
    files.map(({ path, name }) => {
      const stat = fs.statSync(path);
      if (stat.isDirectory()) {
        const hasPkg = fs.existsSync(`${path}/package.json`);
        if (hasPkg) {
          const itemPkg = window.require(`${path}/package.json`);
          const list = [{
            path,
            name: itemPkg.name || name,
            scripts: itemPkg.scripts,
          }];
          dispatch({
            type: 'project/push',
            payload: { list },
          });
        } else {
          const tip = new Notification('提示', {
            body: '无法检测到package.json',
          });
        }
      }
    });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          transition={Transition}
          keepMounted
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {'添加项目'}
          </DialogTitle>
          <DialogContent>
            <Dropzone onDrop={(files) => {
            this.onDrop(files);
            // files.map(({ path, name }) => {
            //   // console.log(path);
            //   const stat = fs.statSync(path);
            //   // console.log('stat');
            //   // console.log(stat);
            //   if (stat.isDirectory()) {
            //     const hasPkg = fs.existsSync(`${path}/package.json`);
            //     if (hasPkg) {
            //       const itemPkg = window.require(`${path}/package.json`);
            //       // console.log('itemPkg');
            //       // console.log(itemPkg);
            //       this.addProject({
            //         path,
            //         name: itemPkg.name || name,
            //         scripts: itemPkg.scripts,
            //       });
            //     } else {
            //       const tip = new Notification('提示', {
            //         body: '无法检测到package.json',
            //       });
            //     }
            //   }
            // });
          }}
            >
              <p>请拖拽文件夹到此处，或打开文件夹</p>
            </Dropzone>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AlertDialogSlide;
