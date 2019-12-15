# mui-passfather
[![version](https://img.shields.io/npm/v/mui-passfather.svg?style=flat-square)](https://www.npmjs.com/package/mui-passfather)
[![license](https://img.shields.io/github/license/vyushin/mui-passfather.svg?style=flat-square)](https://github.com/vyushin/mui-passfather/blob/master/LICENSE)

**mui-passfather** is [material-ui](https://material-ui.com/) text field component allowing generate strong password or random string.<br/>
To generate random string it uses [passfather](https://www.npmjs.com/package/passfather).

## Installation

###### NPM
`npm install --save mui-passfather`

###### Yarn
`yarn add mui-passfather`

## Example

```jsx harmony
// Import react and other, you know...
import MuiPassfather from 'mui-passfather';

const App = () => {
  return (
    <MuiPassfather
      TextFieldProps={{
        type: 'text',
        variant: 'outlined',
        label: 'MUI Passfather',
      }}
      PassfatherOptions={{
        symbols: false,
        length: 10,
      }}
    />
  );
};
```

Full example is located inside [example](https://github.com/vyushin/mui-passfather/blob/master/example) directory.

## Properties

|Name|Type|Default|Description
|---|---|---|---
|TextFieldProps|object|`{}`|Props applied to the [TextField](https://material-ui.com/api/text-field/#textfield-api). component.
|PassfatherOptions|object|`{}`|Passfather [options](https://www.npmjs.com/package/passfather#options).
|value|any|`''`|The value.
|generateKey|number|`0`|The key to generate password programmatically. Pass `Date.now()` every time when needs generate new password programmatically.
|hideGenerateButton|boolean|`false`|Hides generate button.
|disableGenerateButtonDuration|boolean|`false`|Disable generate button animation.
|onGenerate|function| |Callback fired when password generated.
|onChange|function| |Callback fired when the value is changed.
## Contributing
See [contributing](https://github.com/vyushin/mui-passfather/blob/master/CONTRIBUTING.md) guideline.

## License
[MIT LICENSE](https://github.com/vyushin/mui-passfather/blob/master/LICENSE)