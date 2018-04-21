import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    // flexBasis: '33.33%',
    flexShrink: 0,
    marginRight: 16,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
  },
});

class ControlledExpansionPanels extends React.Component {
  state = {
    expanded: null,
  };

  handleChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  render() {
    const { classes, list } = this.props;
    const { expanded } = this.state;

    const keys = Object.keys(list.toObject());

    console.log('keys');
    console.log(keys);
    return (
      <div className={classes.root}>
        {
          keys.map((key) => {
            const { data, message } = list.get(key);
            console.log(list.get(key));
            return (<ExpansionPanel
              expanded={expanded === key}
              onChange={this.handleChange(key)}
            >
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className={classes.heading}>{message}</Typography>
                <Typography className={classes.secondaryHeading}>{key}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <pre>
                    {
                      data
                      // list.get(key).toObject().map(i => ({ i.data })).jion(' ')
                    }
                  </pre>

                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>);
          })
        }
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
