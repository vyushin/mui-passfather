declare module "mui-passfather" {
  import { ComponentType, ReactElement, ReactNode, MouseEventHandler } from 'react';
  import { TextFieldProps, IconButtonProps, SvgIconProps } from "@material-ui/core";
  import { PassfatherOptions } from 'passfather';

  export interface MuiPassfatherProps {
    TextFieldProps?: Partial<TextFieldProps>;
    PassfatherOptions?: PassfatherOptions;
    VisibilityButtonProps?: Partial<IconButtonProps>;
    CopyToClipboardButtonProps?: Partial<IconButtonProps>;
    GenerateButtonProps?: Partial<IconButtonProps>;
    AutorenewIconProps?: Partial<SvgIconProps>;
    VisibilityIconProps?: Partial<SvgIconProps>;
    VisibilityOffIconProps?: Partial<SvgIconProps>;
    FileCopyOutlinedIconProps?: Partial<SvgIconProps>;
    value?: TextFieldProps['value'];
    generateKey?: number;
    hideGenerateButton?: boolean;
    hideVisibilityButton?: boolean;
    hideCopyToClipboardButton?: boolean;
    disableGenerateButtonDuration?: boolean;
    onGenerate?: (value: string) => void;
    onChange?: TextFieldProps['onChange'];
    onCopyToClipboard?: () => void;
    onCopyToClipboardFailed?: () => void;
    onToggleVisibility?: (isVisible: boolean) => void;
    renderVisibilityButton?: (
      args: {
        isVisible?: boolean;
        VisibilityButtonProps?: MuiPassfatherProps['VisibilityButtonProps'];
        VisibilityIconProps?: MuiPassfatherProps['VisibilityIconProps'];
        VisibilityOffIconProps?: MuiPassfatherProps['VisibilityOffIconProps'];
        handleToggleVisibility?: MouseEventHandler;
      }
    ) => ReactNode;
    renderCopyToClipboardButton?: (
      args: {
        copiedValue?: string;
        CopyToClipboardButtonProps?: MuiPassfatherProps['CopyToClipboardButtonProps'];
        FileCopyOutlinedIconProps?: MuiPassfatherProps['FileCopyOutlinedIconProps'];
        handleCopyToClipboard?: MouseEventHandler;
      }
    ) => ReactNode;
    renderGenerateButton?: (
      args: {
        handleGenerate?: MouseEventHandler;
        GenerateButtonProps?: MuiPassfatherProps['GenerateButtonProps'];
        AutorenewIconProps?: MuiPassfatherProps['AutorenewIconProps'];
      }
    ) => ReactNode;
  }

  const MuiPassfatherComponent: (props: MuiPassfatherProps) => ReactElement<TextFieldProps, ComponentType<TextFieldProps>>;

  export default MuiPassfatherComponent;
}
