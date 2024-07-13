import { createPortal } from 'react-dom';

var Portal = function Portal(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/createPortal(children, document.body);
};

export { Portal };
