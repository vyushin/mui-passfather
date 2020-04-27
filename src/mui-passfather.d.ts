declare module "mui-passfather" {
  import { ComponentType, ReactElement } from 'react';
  import { TextFieldProps, IconProps, IconButtonProps } from "@material-ui/core";
  import { PassfatherOptions } from 'passfather';

  export interface MuiPassfatherProps {
    TextFieldProps?: Partial<TextFieldProps>;
    PassfatherOptions?: PassfatherOptions;
    VisibilityButtonProps?: Partial<IconButtonProps>;
    CopyToClipboardButtonProps?: Partial<IconButtonProps>;
    GenerateButtonProps?: Partial<IconButtonProps>;
    AutorenewIconProps?: Partial<IconProps>;
    VisibilityIconProps?: Partial<IconProps>;
    VisibilityOffIconProps?: Partial<IconProps>;
    FileCopyOutlinedIconProps?: Partial<IconProps>;
    value?: TextFieldProps['value'];
    generateKey?: number;
    hideGenerateButton?: boolean;
    hideVisibilityButton?: boolean;
    hideCopyToClipboardButton?: boolean;
    disableGenerateButtonDuration?: boolean;
    onGenerate?: (value: string) => void;
    onChange?: TextFieldProps['onChange'];
    onCopyToClipboard?: (value: string) => void;
    onCopyToClipboardFailed?: (value: string) => void;
    onToggleVisibility?: (isVisible: boolean) => void;
  }

  const MuiPassfatherComponent: (props: MuiPassfatherProps) => ReactElement<TextFieldProps, ComponentType<TextFieldProps>>;

  export default MuiPassfatherComponent;
}
