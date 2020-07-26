if (__DEV__) {
  const React = require('react');
  const whyDidYouRender = require('@welldone-software/why-did-you-render');
  whyDidYouRender(React, {
    trackAllPureComponents: true,
  });
}

import './src/locale/i18n';
import './src/navigation';
