import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ClearIcon from '@material-ui/icons/Clear';
import RemoveIcon from '@material-ui/icons/Remove';
import SettingsIcon from '@material-ui/icons/Settings';


const electron = window.require('electron');
const { remote, shell, ipcRenderer } = electron;

const styles = {
  root: {
    flexGrow: 1,
    '-webkit-app-region': 'drag',
    height: 56,
  },
  flex: {
    flex: 1,
  },
  icon: {
    fontSize: 16,
  },
  menuButton: {
    width: 30,
    height: 30,
  },
  menus: {
    marginLeft: -12,
    marginTop: -20,
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ boxShadow: 'none' }}>
        <Toolbar>
          <div className={classes.menus}>
            <IconButton
              onClick={() => { ipcRenderer.send('window-all-closed'); }}
              classes={{ root: classes.menuButton }}
              color="inherit"
              aria-label="Menu"
            >
              <ClearIcon className={classes.icon} />
            </IconButton>
            <IconButton
              onClick={() => { ipcRenderer.send('hide-window'); }}
              classes={{ root: classes.menuButton }}
              color="inherit"
              aria-label="Menu"
            >
              <RemoveIcon className={classes.icon} />
            </IconButton>

            <IconButton
              classes={{ root: classes.menuButton }}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon className={classes.icon} />
            </IconButton>
            <IconButton
              classes={{ root: classes.menuButton }}
              color="inherit"
              aria-label="Menu"
            >
              <SettingsIcon className={classes.icon} />
            </IconButton>
          </div>


          <Typography variant="title" color="inherit" className={classes.flex} />
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);
