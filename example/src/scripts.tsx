import { default as React, useState, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { Theme, ThemeProvider, makeStyles } from '@material-ui/core';
import { InputAdornment, IconButton } from '@material-ui/core';
import { default as VisibilityIcon } from '@material-ui/icons/Visibility';
import { default as VisibilityOffIcon } from '@material-ui/icons/VisibilityOff';
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
  const [inputType, setInputType] = useState<'text' | 'password'>('text');

  const handleToggleInputType = useCallback(() => {
    setInputType(prev => prev === 'text' ? 'password' : 'text');
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <MuiPassfather
          TextFieldProps={{
            type: inputType,
            variant: 'outlined',
            label: 'MUI Passfather',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleToggleInputType}>
                    {inputType === 'text' ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                  </IconButton>
                </InputAdornment>
              ),
            },
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
