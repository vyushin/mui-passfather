const PACKAGE_NAME = 'mui-passfather';

const HELP_INFO = 'If you are experiencing difficulties to solve this problem, you can create an issue on https://github.com/vyushin/mui-passfather/issues';

const LOG_MESSAGE = [];
LOG_MESSAGE[0] = 'No errors.';
LOG_MESSAGE[1] = `Property "%s" of "%s" ignores because it is using inside ${PACKAGE_NAME}. Please pass "onChange" to ${PACKAGE_NAME}: <MuiPassfather onChange={yourHandler}/>`;
LOG_MESSAGE[2] = `Property "%s" of "%s" ignores because it is using inside ${PACKAGE_NAME}. Please pass "value" to ${PACKAGE_NAME}: <MuiPassfather value={yourValue}/>`;

export {
  PACKAGE_NAME,
  HELP_INFO,
  LOG_MESSAGE,
};
