declare module "mui-passfather" {
  import { ComponentType, ReactElement, MouseEventHandler } from 'react';
  import { TextFieldProps } from "@material-ui/core";
  import { PassfatherOptions } from 'passfather';

  export interface MuiPassfatherProps {

    PassfatherOptions?: PassfatherOptions;
    generateKey?: number;
    hideGenerateButton?: boolean;
    disableGenerateButtonDuration?: boolean;
    onGenerate?: MouseEventHandler<string>;

    TextFieldProps?: Partial<TextFieldProps>;
    onChange?: TextFieldProps['onChange'];
    value?: TextFieldProps['value'];

  }

  const MuiPassfatherComponent: (props: MuiPassfatherProps) => ReactElement<TextFieldProps, ComponentType<TextFieldProps>>;

  export default MuiPassfatherComponent;
}
