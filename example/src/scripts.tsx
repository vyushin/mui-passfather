import { default as React, useState, useCallback } from 'react';
import * as ReactDOM from 'react-dom';
import { Theme, ThemeProvider, makeStyles, IconButton, Tooltip, Zoom } from '@material-ui/core';
import { default as FileCopyOutlinedIcon } from '@material-ui/icons/FileCopyOutlined';
import { lightGreen, blueGrey, green } from "@material-ui/core/colors";
import MuiPassfather from 'mui-passfather';
import theme from './theme';

const useStyles = makeStyles((theme: Theme) => ({
  main: {
    backgroundColor: blueGrey[50],
    alignItems: "center",
    display: "flex",
    height: "100vh",
    justifyContent: "center",
    width: "100vw"
  },
  iconBtn: {
    margin: 0
  },
  icon: {
    fontSize: "1rem"
  },
  textFieldInput: {
    backgroundColor: "white"
  },
  tooltip: {
    backgroundColor: lightGreen[700],
    color: 'white',
  },
}));

let timeoutId: number;

const App = () => {
  const classes = useStyles({});
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const buttonProps = {
    classes: { root: classes.iconBtn },
  };

  const iconProps = {
    classes: { root: classes.icon }
  }

  const handleCopyToClipboard = useCallback(
    () => {
      setTooltipOpen(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => { setTooltipOpen(false); }, 1500)
    },
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.main}>
        <MuiPassfather
          onToggleVisibility={(isVisible) => console.log('onToggleVisibility', isVisible)}
          onCopyToClipboard={handleCopyToClipboard}
          onCopyToClipboardFailed={() => console.log('onCopyToClipboardFailed')}
          TextFieldProps={{
            variant: "outlined",
            placeholder: "MUI Passfather",
            InputProps: {
              classes: { root: classes.textFieldInput }
            }
          }}
          PassfatherOptions={{
            symbols: false,
            length: 14,
          }}
          VisibilityButtonProps={buttonProps}
          CopyToClipboardButtonProps={buttonProps}
          GenerateButtonProps={buttonProps}
          AutorenewIconProps={iconProps}
          VisibilityIconProps={iconProps}
          VisibilityOffIconProps={iconProps}
          FileCopyOutlinedIconProps={iconProps}
          renderCopyToClipboardButton={({ CopyToClipboardButtonProps, FileCopyOutlinedIconProps }) => {
            return (
              <Tooltip
                disableFocusListener
                disableHoverListener
                disableTouchListener
                interactive
                classes={{ tooltip: classes.tooltip }}
                open={tooltipOpen}
                placement="top"
                title="Copied!"
                TransitionComponent={Zoom}>
                <IconButton {...CopyToClipboardButtonProps}>
                  <FileCopyOutlinedIcon {...FileCopyOutlinedIconProps}/>
                </IconButton>
              </Tooltip>
            );
          }}
        />
      </div>
    </ThemeProvider>
  );
};

ReactDOM.render(<div><App /></div>, document.querySelector('#app'));
