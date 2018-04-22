import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/styles/prism';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  // panel: {
  //   margin: 0,
  //   padding: 4,
  //   minHeight: 24,
  // },
  // content: {
  //   margin: 0,
  // },
  heading: {
    fontSize: theme.typography.pxToRem(14),
    flexBasis: 50,
    flexShrink: 0,
    marginRight: 16,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(14),
    color: theme.palette.text.secondary,
  },
  ExpansionPanelDetails: {
    paddingTop: 0,
  },
  code: {
    width: '100%',
    // '&>pre': {
    //   width: '100%',
    // },
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

    // console.log('keys');
    // console.log(keys);
    return (
      <div className={classes.root}>
        {
          keys.map((key) => {
            const { data, status } = list.get(key);
            // console.log(list.get(key));
            return (<ExpansionPanel
              expanded={expanded === key}
              onChange={this.handleChange(key)}
            >
              <ExpansionPanelSummary
                // className={classes.panel}
                classes={{
                  content: classes.content,
                  root: classes.panel,
                }}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography className={classes.heading}>{status}</Typography>
                <Typography className={classes.secondaryHeading}>{key}</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails
                className={classes.ExpansionPanelDetails}
              >
                <Typography className={classes.code}>
                  <SyntaxHighlighter
                    language="bash"
                    style={atomDark}
                    customStyle={{
                      borderRadius: 0,
                      margin: 0,
                      height: 300,
                      overflowY: 'scroll',
                    }}
                  >{data}</SyntaxHighlighter>
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
