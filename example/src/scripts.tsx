import { default as React, useState, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { Theme, ThemeProvider, makeStyles } from '@material-ui/core';
import MuiPassfather from 'mui-passfather';
import theme from './theme';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
}));

const App = () => {
  const classes = useStyles({});

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <MuiPassfather
          onToggleVisibility={(isVisible) => console.log('onToggleVisibility', isVisible)}
          onCopyToClipboard={(value) => console.log('onCopyToClipboard', value)}
          onCopyToClipboardFailed={() => console.log('onCopyToClipboardFailed')}
          TextFieldProps={{
            variant: 'outlined',
            label: 'MUI Passfather',
          }}
          PassfatherOptions={{
            symbols: false,
            length: 10,
          }}/>
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<div><App /></div>, document.querySelector('#app'));
