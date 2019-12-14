
declare module "mui-passfather" {
  import { ComponentType } from 'react';
  import { TextFieldProps } from "@material-ui/core";

  export interface MuiPassfatherProps {
    TextFieldProps?: Partial<TextFieldProps>;
  }

  const MuiPassfatherComponent: (props: MuiPassfatherProps) => React.ReactElement<TextFieldProps, React.ComponentType<TextFieldProps>>;

  export default MuiPassfatherComponent;
}
