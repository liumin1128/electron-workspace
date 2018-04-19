import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Zoom from 'material-ui/transitions/Zoom';
import Button from 'material-ui/Button';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/ModeEdit';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import ProjectList from '../../view/project/list';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 2 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    backgroundColor: 'none',
    width: '100%',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
  },
});

@connect()
class FullWidthTabs extends PureComponent {
  state = {
    value: 0,
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };
  handleChangeIndex = (index) => {
    this.setState({ value: index });
  };
  render() {
    const { classes, theme, dispatch } = this.props;
    const fabs = [
      {
        color: 'primary',
        className: classes.fab,
        icon: <AddIcon />,
        onClick: () => {
          dispatch({ type: 'global/toggle', payload: { key: 'showAddModal' } });
        },
      },
      {
        color: 'secondary',
        className: classes.fab,
        icon: <EditIcon />,
      },
      {
        color: 'inherit',
        className: classNames(classes.fab, classes.fabGreen),
        icon: <UpIcon />,
      },
    ];

    const transitionDuration = {
      enter: theme.transitions.duration.enteringScreen,
      exit: theme.transitions.duration.leavingScreen,
    };

    return (
      <div className={classes.root}>
        <AppBar position="static">

          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            // indicatorColor="inherit"
            // textColor="inherit"
            fullWidth
          >
            <Tab icon={<HomeIcon />} />
            <Tab icon={<FavoriteIcon />} />
            <Tab icon={<PersonPinIcon />} />
          </Tabs>
        </AppBar>

        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <ProjectList />
          </TabContainer>
          <TabContainer dir={theme.direction}>暂未开放</TabContainer>
          <TabContainer dir={theme.direction}>暂未开放</TabContainer>
        </SwipeableViews>

        {fabs.map((fab, index) => (
          <Zoom
            key={fab.color}
            in={this.state.value === index}
            timeout={transitionDuration}
            style={{
              transitionDelay: this.state.value === index ? transitionDuration.exit : 0,
            }}
            unmountOnExit
          >
            <Button onClick={fab.onClick} variant="fab" className={fab.className} color={fab.color}>
              {fab.icon}
            </Button>
          </Zoom>
        ))}
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);
