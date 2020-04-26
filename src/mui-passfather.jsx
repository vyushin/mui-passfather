import { default as React, useState, useCallback, useMemo, useEffect } from 'react';
import { makeStyles, useTheme, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { default as AutorenewIcon } from '@material-ui/icons/Autorenew';
import { default as VisibilityOffIcon } from '@material-ui/icons/VisibilityOff';
import { default as VisibilityIcon } from '@material-ui/icons/Visibility';
import { default as FileCopyOutlinedIcon } from '@material-ui/icons/FileCopyOutlined';
import passfather from 'passfather';
import clsx from 'clsx';

import { LOG_MESSAGE } from './constants';
import { log, omit } from './utils';

const useStyles = makeStyles((theme) => ({
  generateButtonRoot: {
    transform: 'rotate(90deg)',
  },
  generateButtonRootRotate: {
    transform: 'rotate(450deg)',
    transition: theme.transitions.create(
      ['transform'],
      { duration: theme.transitions.duration.shorter }, // Should be the same duration as in generate handler setTimeout
    ),
  },
}));

const MuiPassfather = (
  {
    TextFieldProps = {},
    PassfatherOptions = {},
    value = '',
    generateKey = 0,
    hideGenerateButton = false,
    hideVisibilityButton = false,
    hideCopyToClipboardButton = false,
    disableGenerateButtonDuration = false,
    onGenerate = () => {},
    onChange = () => {},
    onCopyToClipboard = () => {},
    onCopyToClipboardFailed = () => {},
    onToggleVisibility = () => {},
  }
) => {
  const theme = useTheme();
  const classes = useStyles({});
  const [isAnimateGenerateButtonKey, setAnimateGenerateButtonKey] = useState(false);
  const [inputType, setInputType] = useState('password');
  const [valueState, setValueState] = useState(value);

  const isEndAdornmentVisible = useMemo(
    () => (hideGenerateButton !== true || hideVisibilityButton !== true || hideCopyToClipboardButton !== true),
    [hideGenerateButton, hideVisibilityButton, hideCopyToClipboardButton],
  );

  useEffect(
    () => {
      if (generateKey > 0) {
        const password = passfather(PassfatherOptions);
        setValueState(password);
        onGenerate(password);
      }
    },
    [generateKey],
  );

  const textFieldProps = useMemo(
    () => {
      const excluded = ['onChange', 'value', 'InputProps', 'inputType'];
      return (
        omit(TextFieldProps, excluded, (key) => {
          key === 'onChange' && log(LOG_MESSAGE[1], 'warn', ['onChange', 'TextFieldProps']);
          key === 'value'    && log(LOG_MESSAGE[2], 'warn', ['value', 'TextFieldProps']);
        })
      );
    },
    [TextFieldProps],
  );

  const inputProps = useMemo(
    () => {
      const excluded = ['endAdornment'];
      return omit((TextFieldProps.InputProps || {}), excluded);
    }, 
    [TextFieldProps],
  );

  const handleGenerate = useCallback(
    (e) => {
      const password = passfather(PassfatherOptions);
      if (!disableGenerateButtonDuration && !isAnimateGenerateButtonKey) {
        setTimeout(() => setAnimateGenerateButtonKey(false), theme.transitions.duration.shorter); // Should be the same duration as in styles
      }
      setValueState(password);
      setAnimateGenerateButtonKey(true);
      onGenerate(password);
   },
    [disableGenerateButtonDuration, isAnimateGenerateButtonKey],
  );

  const handleChange = useCallback(
    (e) => {
      setValueState(e.currentTarget.value);
      onChange(e);
    },
    [disableGenerateButtonDuration],
  );

  const handleToggleVisibility = useCallback(
    () => {
      const visibledInputType = (TextFieldProps.type && TextFieldProps.type !== 'password') ? TextFieldProps.type : 'text';
      const newInputType = inputType === 'password' ? visibledInputType : 'password';
      setInputType(newInputType);
      onToggleVisibility(newInputType !== 'password');
    },
    [inputType, TextFieldProps],
  );

  const handleCopyToClipboard = useCallback(
    () => {
      navigator.permissions.query({ name: 'clipboard-write' })
        .then(
          (result) => {
            if (result.state === 'granted' || result.state === 'prompt') {
              navigator.clipboard.writeText(value).then(() => onCopyToClipboard(valueState));
            }
          },
          () => onCopyToClipboardFailed(),
        );
    },
    [onCopyToClipboard, onCopyToClipboardFailed, valueState],
  )

  return (
    <TextField
      value={valueState}
      onChange={handleChange}
      type={inputType}
      InputProps={{
        endAdornment: (
          <>
            {TextFieldProps.InputProps && TextFieldProps.InputProps.endAdornment || ''}
            {isEndAdornmentVisible && (
              <InputAdornment position="end">
                {!hideVisibilityButton && (
                  <IconButton onClick={handleToggleVisibility}>
                    {inputType === 'password' ? <VisibilityOffIcon/> : <VisibilityIcon/>}
                  </IconButton>
                )}
                {!hideCopyToClipboardButton && (
                  <IconButton onClick={handleCopyToClipboard}>
                    <FileCopyOutlinedIcon/>
                  </IconButton>
                )}
                {!hideGenerateButton && (
                  <IconButton
                    onClick={handleGenerate}
                    classes={{
                      root: clsx({
                        [classes.generateButtonRoot]: true,
                        [classes.generateButtonRootRotate]: !disableGenerateButtonDuration && isAnimateGenerateButtonKey,
                      }),
                    }}
                  >
                    <AutorenewIcon/>
                  </IconButton>
                )}
              </InputAdornment>
            )}
          </>
        ),
        ...inputProps,
      }}
      {...textFieldProps}/>
  )
}

export { MuiPassfather };
