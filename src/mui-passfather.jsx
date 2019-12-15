import { default as React, useState, useCallback, useMemo, useEffect } from 'react';
import { makeStyles, useTheme, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { default as AutorenewIcon } from '@material-ui/icons/Autorenew';
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

const MuiPassfather = ({
                         TextFieldProps = {},
                         PassfatherOptions = {},
                         value = '',
                         generateKey = 0,
                         hideGenerateButton = false,
                         disableGenerateButtonDuration = false,
                         onGenerate = (password) => {},
                         onChange = () => {},
}) => {
  const theme = useTheme();
  const classes = useStyles({});
  const [sKey, setKey] = useState(generateKey);
  const [isAnimateGenerateButtonKey, setAnimateGenerateButtonKey] = useState(false);
  const [sValue, setValue] = useState(value);

  useEffect(() => {
    if (sKey > 0) {
      const password = passfather(PassfatherOptions);
      setValue(password);
      onGenerate(password);
    }
  }, [sKey]);

  const textFieldProps = useMemo(() => {
    const excluded = ['onChange', 'value', 'InputProps'];
    return (
      omit(TextFieldProps, excluded, (key) => {
        key === 'onChange' && log(LOG_MESSAGE[1], 'warn', ['onChange', 'TextFieldProps']);
        key === 'value'    && log(LOG_MESSAGE[2], 'warn', ['value', 'TextFieldProps']);
      })
    );
  }, [TextFieldProps]);

  const inputProps = useMemo(() => {
    const excluded = ['endAdornment'];
    return omit((TextFieldProps.InputProps || {}), excluded);
  }, [TextFieldProps]);

  const handleGenerate = useCallback((e) => {
    const password = passfather(PassfatherOptions);
    if (!disableGenerateButtonDuration && !isAnimateGenerateButtonKey) {
      setTimeout(() => setAnimateGenerateButtonKey(false), theme.transitions.duration.shorter); // Should be the same duration as in styles
    }
    setValue(password);
    setAnimateGenerateButtonKey(true);
    onGenerate(password);
  }, [disableGenerateButtonDuration, isAnimateGenerateButtonKey]);

  const handleChange = useCallback((e) => {
    setValue(e.currentTarget.value);
    onChange(e);
  }, [disableGenerateButtonDuration]);

  return (
    <TextField
      value={sValue}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <>
            {TextFieldProps.InputProps && TextFieldProps.InputProps.endAdornment || ''}
            {hideGenerateButton === false && (
              <InputAdornment position="end">
                <IconButton onClick={handleGenerate}
                            classes={{
                              root: clsx({
                                [classes.generateButtonRoot]: true,
                                [classes.generateButtonRootRotate]: !disableGenerateButtonDuration && isAnimateGenerateButtonKey,
                              }),
                            }}>
                  <AutorenewIcon/>
                </IconButton>
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
