import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import clsx from 'clsx';
import { base, element } from './reset.css.js';
import { sprinkles } from './sprinkles.css.js';

var _excluded = ["reset"];
var atoms = function atoms(_ref) {
  var reset = _ref.reset,
    rest = _objectWithoutProperties(_ref, _excluded);
  if (!reset) return sprinkles(rest);
  var elementReset = element[reset];
  var sprinklesClasses = sprinkles(rest);
  return clsx(base, elementReset, sprinklesClasses);
};

export { atoms };
