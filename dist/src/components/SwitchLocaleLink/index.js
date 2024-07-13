import React__default, { useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useLocationLinkProps } from '../../hooks/useLocationLinkProps.js';
import styled from 'styled-components';
import { StyledInternalLink } from '../../theme/components/index.js';
import { LOCALE_LABEL, DEFAULT_LOCALE } from '../../constants/locales.js';
import { useActiveLocale, navigatorLocale } from '../../hooks/useActiveLocale.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var Container = styled(ThemedText.DeprecatedSmall)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  opacity: ", ";\n  :hover {\n    opacity: 1;\n  }\n  margin-top: 1rem !important;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.opacity.hover;
});
var useTargetLocale = function useTargetLocale(activeLocale) {
  var browserLocale = useMemo(function () {
    return navigatorLocale();
  }, []);
  if (browserLocale && (browserLocale !== DEFAULT_LOCALE || activeLocale !== DEFAULT_LOCALE)) {
    if (activeLocale === browserLocale) {
      return DEFAULT_LOCALE;
    } else {
      return browserLocale;
    }
  }
  return null;
};
function SwitchLocaleLink() {
  var activeLocale = useActiveLocale();
  var targetLocale = useTargetLocale(activeLocale);
  var _useLocationLinkProps = useLocationLinkProps(),
    to = _useLocationLinkProps.to,
    onClick = _useLocationLinkProps.onClick;
  if (!targetLocale || !to) return null;
  return /*#__PURE__*/React__default.createElement(Container, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "XDBXHf",
    message: "Uniswap available in: <0>{0}</0>",
    values: {
      "0": LOCALE_LABEL[targetLocale]
    },
    components: {
      "0": /*#__PURE__*/React__default.createElement(StyledInternalLink, {
        onClick: onClick,
        to: to
      })
    }
  }));
}

export { SwitchLocaleLink };
