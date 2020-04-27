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
  iconBtn: {
    margin: theme.spacing(0, 1),
  },
  icon: {
    fontSize: '1rem',
  },
}));

const App = () => {
  const classes = useStyles({});

  const buttonProps = {
    size: 'small' as 'small',
    classes: { root: classes.iconBtn },
  };

  const iconProps = {
    classes: { root: classes.icon }
  }

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
          }}
          VisibilityButtonProps={buttonProps}
          CopyToClipboardButtonProps={buttonProps}
          GenerateButtonProps={buttonProps}
          AutorenewIconProps={iconProps}
          VisibilityIconProps={iconProps}
          VisibilityOffIconProps={iconProps}
          FileCopyOutlinedIconProps={iconProps}
        />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<div><App /></div>, document.querySelector('#app'));
