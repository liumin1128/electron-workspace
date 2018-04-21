import React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import blue from 'material-ui/colors/blue';
import pink from 'material-ui/colors/pink';
import CssBaseline from 'material-ui/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  overrides: {
    MuiExpansionPanel: {
      expanded: {
        margin: 0,
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.05)',
      },
      elevation2: {
        boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.05)',
      },
    },
  //   MuiButton: {
  //     // Name of the styleSheet
  //     root: {
  //       // Name of the rule
  //       background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  //       borderRadius: 3,
  //       border: 0,
  //       color: 'white',
  //       height: 48,
  //       padding: '0 30px',
  //       boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .30)',
  //     },
  //   },
  },
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
    },
  },
});

function withRoot(Component) {
  function WithRoot(props) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
