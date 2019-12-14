import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Theme, ThemeProvider, makeStyles } from '@material-ui/core';
import MuiPassfather from 'mui-passfather';
import theme from './theme';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
}));

let a = 1;

const App = () => {
  const classes = useStyles({});

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.wrapper}>
        <MuiPassfather />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<div><App /></div>, document.querySelector('#app'));
