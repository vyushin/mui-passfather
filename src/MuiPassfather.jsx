import { default as React, useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { makeStyles, useTheme, TextField, InputAdornment, IconButton } from '@material-ui/core';
import { default as AutorenewIcon } from '@material-ui/icons/Autorenew';
import { default as VisibilityOffIcon } from '@material-ui/icons/VisibilityOff';
import { default as VisibilityIcon } from '@material-ui/icons/Visibility';
import { default as FileCopyOutlinedIcon } from '@material-ui/icons/FileCopyOutlined';
import passfather from 'passfather';
import clsx from 'clsx';
import { LOG_MESSAGE } from './constants';
import { log, omit, clipboardWrite } from './utils';

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
  input: {
    '::ms-clear': {
      display: 'none',
    },
  },
}));

const MuiPassfather = (
  {
    TextFieldProps = {},
    PassfatherOptions = {},
    VisibilityButtonProps = {},
    CopyToClipboardButtonProps = {},
    GenerateButtonProps = {},
    AutorenewIconProps = {},
    VisibilityIconProps = {},
    VisibilityOffIconProps = {},
    FileCopyOutlinedIconProps = {},
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
    renderVisibilityButton = null,
    renderCopyToClipboardButton = null,
    renderGenerateButton = null,
  }
) => {
  const theme = useTheme();
  const classes = useStyles({});
  const inputRef = useRef(null);
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
    (e) => {
      const visibledInputType = (TextFieldProps.type && TextFieldProps.type !== 'password') ? TextFieldProps.type : 'text';
      const newInputType = inputType === 'password' ? visibledInputType : 'password';
      setInputType(newInputType);
      onToggleVisibility(newInputType !== 'password');
    },
    [inputType, TextFieldProps],
  );

  const handleCopyToClipboardFailed = useCallback(
    (e) => onCopyToClipboardFailed(),
    [onCopyToClipboardFailed],
  )

  const handleCopyToClipboard = useCallback(
    (e) => clipboardWrite(inputRef.current).then(onCopyToClipboard).catch(handleCopyToClipboardFailed),
    [onCopyToClipboard, handleCopyToClipboardFailed, inputRef],
  )

  const visibilityButtonProps = useMemo(
    () => {
      const result = omit(VisibilityButtonProps, ['onClick']);
      result.onClick = (e) => {
        handleToggleVisibility(e);
        VisibilityButtonProps.onClick && VisibilityButtonProps.onClick(e);
      };
      return result;
    },
    [VisibilityButtonProps, handleToggleVisibility],
  );

  const copyToClipboardButtonProps = useMemo(
    () => {
      const result = omit(CopyToClipboardButtonProps, ['onClick']);
      result.onClick = (e) => {
        handleCopyToClipboard(e);
        CopyToClipboardButtonProps.onClick && CopyToClipboardButtonProps.onClick(e);
      };
      return result;
    },
    [CopyToClipboardButtonProps, handleCopyToClipboard],
  );

  const generateButtonProps = useMemo(
    () => {
      const result = omit(GenerateButtonProps, ['onClick']);
      result.onClick = (e) => {
        handleGenerate(e);
        GenerateButtonProps.onClick && GenerateButtonProps.onClick(e);
      };
      result.classes = {
        ...GenerateButtonProps.classes,
        root: clsx(
          {
            [classes.generateButtonRoot]: true,
            [classes.generateButtonRootRotate]: !disableGenerateButtonDuration && isAnimateGenerateButtonKey,
          },
          (GenerateButtonProps.classes && GenerateButtonProps.classes.root)
        ),
      }
      return result;
    },
    [GenerateButtonProps, handleGenerate],
  );

  return (
    <TextField
      value={valueState}
      onChange={handleChange}
      type={inputType}
      InputProps={{
        inputRef,
        endAdornment: (
          <>
            {TextFieldProps.InputProps && TextFieldProps.InputProps.endAdornment || ''}
            {isEndAdornmentVisible && (
              <InputAdornment position="end">
                {!hideVisibilityButton && (
                  !renderVisibilityButton && (
                    <IconButton {...visibilityButtonProps}>
                      {inputType === 'password'
                        ? <VisibilityOffIcon {...VisibilityOffIconProps}/>
                        : <VisibilityIcon {...VisibilityIconProps}/>
                      }
                    </IconButton>
                  )
                  ||
                  renderVisibilityButton({
                    handleToggleVisibility,
                    visibilityButtonProps,
                    VisibilityIconProps,
                    VisibilityOffIconProps,
                    isVisible: inputType !== 'password',
                  })
                )}
                {!hideCopyToClipboardButton && (
                  !renderCopyToClipboardButton && (
                    <IconButton {...copyToClipboardButtonProps}>
                      <FileCopyOutlinedIcon {...FileCopyOutlinedIconProps}/>
                    </IconButton>
                  )
                  ||
                  renderCopyToClipboardButton({
                    FileCopyOutlinedIconProps,
                    handleCopyToClipboard,
                    CopyToClipboardButtonProps: copyToClipboardButtonProps,
                    copiedValue: valueState,
                  })
                )}
                {!hideGenerateButton && (
                  !renderGenerateButton && (
                    <IconButton {...generateButtonProps}>
                      <AutorenewIcon {...AutorenewIconProps}/>
                    </IconButton>
                  )
                  ||
                  renderGenerateButton({
                    handleGenerate,
                    AutorenewIconProps,
                    GenerateButtonProps: generateButtonProps,
                  })
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
